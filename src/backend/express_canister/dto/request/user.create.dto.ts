class UserCreateRequestDTO {
  username: string;
  email: string;
  full_name: string;
  password: string;

  constructor(username: string, email: string, full_name: string, password: string) {
    this.username = username;
    this.email = email;
    this.full_name = full_name;
    this.password = password;
  }

};

export default UserCreateRequestDTO;
