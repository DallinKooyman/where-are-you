// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { User } from "@/models/user"
import { deleteRequest, getRequest, postRequest, putRequest } from "./apiClient";

const userRoute = '/users';

export const getUsers = async (): Promise<User[]> => {
  const response = await getRequest(userRoute)
  const data = await response.json();
  return data.users;
}

export const createUser = async (name: string, password?: string): Promise<User> => {
  const response = await postRequest(userRoute, { name, password });
  const data = await response.json();
  if (response.status === 200) {
    return data.user;
  }
  throw Error(data);
}

export const getUserById = async (user: User): Promise<User> => {
  const response = await getRequest(userRoute + `/${user.id}`)
  const data = await response.json();
  return data.user;
}

export const updateUser = async (user: User): Promise<User> => {
  const response = await putRequest(userRoute + `/${user.id}`, user);
  const data = await response.json();
  return data.user;
}

export const deleteUser = async (user: User): Promise<boolean> => {
  const response = await deleteRequest(userRoute + `/${user.id}`);
  return await response.ok;
}

export const login = async (name: string, password?: string): Promise<User> => {
  const response = await postRequest(userRoute + `/login`, { name, password });
  const data = await response.json();
  if (response.status === 200) {
    return data.user;
  }
  throw Error(data);
}
