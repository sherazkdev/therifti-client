import axios, { Axios, type AxiosResponse } from "axios";
import { CLOUDINARY_CONFIGRATION } from "../configs/cloudinary/cloudinary";


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

    const response:AxiosResponse = await this.api.post<AxiosResponse>("", formData);

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

}

export default ImageUploadService;