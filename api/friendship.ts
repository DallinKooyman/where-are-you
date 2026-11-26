// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { Friendship } from "@/models/friendship";
import { deleteRequest, getRequest, postRequest, putRequest } from "./apiClient";

const friendshipRoutes = '/friendships';

export const getUserFriendships = async (params?: string): Promise<Friendship[]> => {
  const path = friendshipRoutes + params ? `/?${params}` : '';
  const response = await getRequest(path);
  const data = await response.json();
  return data.users;
};

export const createFriendship = async (body: any): Promise<Friendship> => {
  const response = await postRequest(friendshipRoutes, body);
  const data = await response.json();
  return data.friendship;
};

export const getFriendshipById = async (id: string): Promise<Friendship> => {
  const response = await getRequest(friendshipRoutes + `/${id}`);
  const data = await response.json();
  return data.friendship;
};

export const updateFriendship = async (friendship: Friendship): Promise<Friendship> => {
  const response = await putRequest(friendshipRoutes + `/${friendship.id}`, friendship.status);
  const data = await response.json();
  return data.friendship;
};

export const deleteFriendship = async (friendship: Friendship): Promise<boolean> => {
  const response = await deleteRequest(friendshipRoutes + `/${friendship.id}`);
  return await response.ok;
};
