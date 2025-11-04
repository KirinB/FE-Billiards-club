export interface PayloadLogin {
  usernameOrEmail: string;
  password: string;
}

export interface ResponseLogin {
  accessToken: string;
}
