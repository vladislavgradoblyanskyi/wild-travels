export type UserRegister = {
  name: string;
  email: string;
  password: string;
};
export type UserLogin = {
  email: string;
  password: string;
};
export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};
