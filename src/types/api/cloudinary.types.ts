/** Note: Upload to cloud api response */
export interface CloudinaryUploadApiResponse {
  public_id: string;
  url: string;
  secure_url: string;
  created_at: string;
  /** Present when the upload preset enables return_delete_token (or it is sent on upload). */
  delete_token?: string;
}

/** Normalized result for direct browser uploads */
export interface CloudinaryDirectUploadResult {
  secureUrl: string;
  publicId: string;
  deleteToken?: string;
}