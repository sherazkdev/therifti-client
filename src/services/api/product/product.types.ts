/** Create Product ApiResponse */
export interface CreateProductApiResponse {
    success:boolean,
    statusCode:number,
    message:string,
    data:[]
}

export interface ProductApiImplmentsInterface {
    CreateProduct:(product:unknown) => Promise<CreateProductApiResponse>;
}
