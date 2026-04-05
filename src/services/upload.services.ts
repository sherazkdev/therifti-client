import axios, { Axios, type AxiosResponse } from "axios";
import { CLOUDINARY_CONFIGRATION } from "../configs/cloudinary/cloudinary";
import type { CloudinaryDirectUploadResult, CloudinaryUploadApiResponse } from "../types/api/cloudinary.types";


/**
 * ImageUploadService
 *
 * A service class responsible for uploading images to Cloudinary.
 * Supports:
 *
 * - Single image upload
 * - Multiple image upload
 * - Chunked upload for large files
 *
 * Designed to be reusable across the application.
*/
class ImageUploadService {
  private api:Axios;

  constructor() {
    this.api = axios.create({
      baseURL:CLOUDINARY_CONFIGRATION.uploadUrl
    })

  }

  /**
   * Deletes an unsigned/direct upload using the short-lived delete_token from the upload response.
   * Configure "Return delete token" on the unsigned upload preset (valid ~10 minutes after upload).
   */
  public async deleteByToken(token: string): Promise<void> {
    const body = new URLSearchParams();
    body.set("token", token);
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIGRATION.cloudName}/delete_by_token`;
    await axios.post(url, body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  }

  /**
   * Uploads a single image from the browser and returns URLs and optional delete_token.
   */
  public async uploadImageDirect(
    file: File,
    options?: { folder?: string; signal?: AbortSignal }
  ): Promise<CloudinaryDirectUploadResult> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_CONFIGRATION.uploadPreset);
    /**
     * Do not send return_delete_token from the client for unsigned uploads unless your
     * preset explicitly allows it — Cloudinary often responds 400. Enable "Return delete
     * token" on the preset in the dashboard instead; delete_token will then appear in the response.
     */
    if (options?.folder) {
      formData.append("folder", options.folder);
    }
    const response: AxiosResponse<CloudinaryUploadApiResponse> = await this.api.post(
      "",
      formData,
      { signal: options?.signal }
    );
    const data = response.data;
    if (!data?.secure_url) {
      throw new Error("Cloudinary upload response missing secure_url");
    }
    return {
      secureUrl: data.secure_url,
      publicId: data.public_id,
      deleteToken: data.delete_token,
    };
  }

  /**
   * Uploads a single image to Cloudinary.
   *
   * @param {File} file - Image file to upload
   * @param {string} [folder] - Optional folder name in Cloudinary
   *
   * @returns {Promise<string>} Returns the uploaded image secure URL
   */
  public async uploadImage(file: File, folder?: string): Promise<string> {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_CONFIGRATION.uploadPreset);

    if (folder) {
      formData.append("folder", folder);
    }

    const response:AxiosResponse<CloudinaryUploadApiResponse> = await this.api.post("", formData);

    return response.data.secure_url;
  }

  /**
   * Uploads multiple images sequentially.
   *
   * @param {File[]} files - Array of image files
   * @param {string} [folder] - Optional folder name
   *
   * @returns {Promise<string[]>} Returns array of uploaded image URLs
   */
  public async uploadMultipleImages(files: File[], folder?: string): Promise<string[]> {

    const urls: string[] = [];

    for (const file of files) {

      const url = await this.uploadImage(file, folder);

      urls.push(url);
    }

    return urls;
  }

  /** Best-effort cloud delete; ignores failures (e.g. expired delete_token). */
  public async tryDeleteByToken(token: string | undefined): Promise<void> {
    if (!token) return;
    try {
      await this.deleteByToken(token);
    } catch {
      /* token may be expired or preset may not return tokens */
    }
  }

}

export default ImageUploadService;