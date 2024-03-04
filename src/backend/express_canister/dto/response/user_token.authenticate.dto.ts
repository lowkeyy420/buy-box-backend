import User from "../../model/user";
import UserToken from "../../model/user_token";

class UserTokenResponseDTO {
    token: UserToken
    user: User

    constructor(token: UserToken, user: User) {
        {
            this.token = token,
                this.user = user
        }

    };
}
export default UserTokenResponseDTO;
