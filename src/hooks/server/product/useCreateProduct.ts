import { useMutation } from "@tanstack/react-query";

/** Types */

import type { CreateProductApiResponse } from "../../../services/api/product/product.types";
import { AxiosError } from "axios";

/** Note: Envorment variables */
import env from "../../../constants/loadEnv/loadEnv";

import ProductServices from "../../../services/api/product/product.api"; 
import ImageUploadService from "../../../services/imageUpload.services";
import BackendRequestMethods from "../../../services/BackendRequestMethods/BackendRequestMethods";
import type { ApiError } from "../../../types/api/apiError";

/** @note: Server url. */
const BaseURL = env.SERVER_URL;

const requestMethods = new BackendRequestMethods(BaseURL);
const productServices = new ProductServices(requestMethods);
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
            const response = await productServices.CreateProduct(productPayload);
            return response;
        }
    })
}

export default useCreateProduct;