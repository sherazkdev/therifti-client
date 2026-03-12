import { useMutation } from "@tanstack/react-query";

/** Types */
import type { CreateProductApiResponse } from "../../../types/api/index";
import { AxiosError } from "axios";

/** Note: Envorment variables */
import env from "../../../constants/loadEnv/loadEnv";

import ProductApi from "../../../api/product.api";
import ImageUploadService from "../../../services/upload.services";
import BackendRequestServices from "../../../services/backendRequest.services";

/** @note: Server url. */
const BaseURL = env.SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const productApi = new ProductApi(backendRequestServices);
const imageUploadServices = new ImageUploadService();

/** Note: Product Document Type */

interface CreateProductPropReactStackInterface {
    images:File[],
    product:any
}

const useCreateProduct = () => {
    return useMutation<CreateProductApiResponse,AxiosError,CreateProductPropReactStackInterface>({
        mutationFn: async ({images,product}:CreateProductPropReactStackInterface) => {
            const ImageUploadResponse = await imageUploadServices.uploadMultipleImages(images);
            /** Note: Splice Cover Image and images */
            let coverImage = ImageUploadResponse.splice(0,1)[0];
            let uploadedProductImages = ImageUploadResponse;

            const productPayload = {
                ...product,
                coverImage,
                images:uploadedProductImages
            };
            const response = await productApi.CreateProduct(productPayload);
            return response;
        }
    })
}

export default useCreateProduct;