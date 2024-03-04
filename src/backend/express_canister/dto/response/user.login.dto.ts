class UserLoginResponsetDTO {
    token: string

    constructor(token: string, password: string) {
        this.token = token;
    }

};

export default UserLoginResponsetDTO;
