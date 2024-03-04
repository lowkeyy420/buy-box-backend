class UserCreateResponsetDTO {
    token: string
    data: string;

    constructor(token: string, data: string) {
        this.token = token;
        this.data = data;
    }

};

export default UserCreateResponsetDTO;
