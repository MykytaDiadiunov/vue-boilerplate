export interface Token {
  token: string;
}

export interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type TokenedUser = User & Token;
