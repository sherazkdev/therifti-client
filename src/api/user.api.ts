import BackendRequestServices from "../services/backendRequest.services";
import type { UpdateUserProfileApiResponse, UpdateUserProfileInterface } from "../types/api/user.types";

class UserApi {
    private apiServices: BackendRequestServices;

    constructor(apiServices: BackendRequestServices){
        this.apiServices = apiServices;
    };

    public async UpdateUserProfile(profileObj:UpdateUserProfileInterface):Promise<UpdateUserProfileApiResponse> {
        const response = await this.apiServices.Post<UpdateUserProfileApiResponse>("/users/update-profile",profileObj);
        return response;
    };
}

export default UserApi;