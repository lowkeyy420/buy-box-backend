class User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  password: string;
  is_seller: boolean;

  constructor(id: string,
    username: string,
    email: string,
    full_name: string,
    password: string,
    is_seller: boolean) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.full_name = full_name;
    this.password = password;
    this.is_seller = is_seller;
  }

};

export default User;
