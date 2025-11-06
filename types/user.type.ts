export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  role: Role;
  createdAt: string;
};

export type Role = "ADMIN" | "STAFF";

export interface ParamsGetListUser {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "name" | "email" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface ResponseGetListUser {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface IPayloadUpdateUser {
  name: string;
  email: string;
  username: string;
  role: Role;
}

export interface IResponseUpdateUser {
  user: User;
}

export type UserCreatePayload = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: Role;
};

export type UserCreateResponse = {
  user: User;
};
