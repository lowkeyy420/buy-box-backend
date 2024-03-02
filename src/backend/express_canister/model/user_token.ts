class UserToken {
  token: string;
  user_id: string;
  expiration: number;

  constructor(
    token: string,
    user_id: string,
    expiration: number,
  ) {
    this.token = token;
    this.user_id = user_id;
    this.expiration = expiration;
  }

};

export default UserToken;
