import { useMutation } from "@tanstack/react-query";

/** Types */
import type { CreateProductApiResponse } from "../../../types/api/index";
import { AxiosError } from "axios";

/** Note: Envorment variables */
import env from "../../../constants/loadEnv/loadEnv";

import ProductApi from "../../../api/product.api";
import BackendRequestServices from "../../../services/backendRequest.services";

/** @note: Server url. */
const BaseURL = env.SERVER_URL;

const backendRequestServices = new BackendRequestServices(BaseURL);
const productApi = new ProductApi(backendRequestServices);

/** Note: Product Document Type */

interface CreateProductPropReactStackInterface {
    imageUrls: string[];
    product: any;
}

const useCreateProduct = () => {
    return useMutation<CreateProductApiResponse,AxiosError,CreateProductPropReactStackInterface>({
        mutationFn: async ({ imageUrls, product }: CreateProductPropReactStackInterface) => {
            const [coverImage, ...rest] = imageUrls;
            const productPayload = {
                ...product,
                coverImage,
                images: rest,
            };
            const response = await productApi.CreateProduct(productPayload);
            return response;
        }
    })
}

export default useCreateProduct;