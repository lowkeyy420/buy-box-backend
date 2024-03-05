class User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  password: string;
  is_store: boolean;

  constructor(id: string,
    username: string,
    email: string,
    full_name: string,
    password: string,
    is_store: boolean) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.full_name = full_name;
    this.password = password;
    this.is_store = is_store;
  }

};

export default User;
