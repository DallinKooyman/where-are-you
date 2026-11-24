// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { Friendship } from "@/models/friendship";

const host = process.env.EXPO_PUBLIC_HOST_SERVER_ADDRESS;

console.log(process.env)
console.log(process.env.EXPO_PUBLIC_HOST_SERVER_ADDRESS)
console.log(host)

if (host === undefined || !host) {
  throw new Error(
    'Missing EXPO_PUBLIC_HOST_SERVER_ADDRESS. Check your .env.local file.'
  );
}

const friendshipRoutes = host + '/friendships';

export const getUserFriendships = async (params?: string): Promise<Friendship[]> => {
  const path = friendshipRoutes + params ? `/?${params}` : '';
  const response = await fetch(path, {
    method: 'GET',
  })
  const data = await response.json();
  return data.users;
}

export const createFriendship = async (body: any): Promise<Friendship> => {
  const response = await fetch(friendshipRoutes, {
    method: 'POST',
    body: JSON.stringify(body)
  })
  const data = await response.json();
  return data.friendship;
}

export const getFriendshipById = async (id: string): Promise<Friendship> => {
  const response = await fetch(friendshipRoutes + `/${id}`, {
    method: 'GET',
  })
  const data = await response.json();
  return data.friendship;
}

export const updateFriendship = async (friendship: Friendship): Promise<Friendship> => {
  const response = await fetch(friendshipRoutes + `/${friendship.id}`, {
    method: 'PUT',
    body: JSON.stringify(friendship.status)
  })
  const data = await response.json();
  return data.friendship;
}

export const deleteFriendship = async (friendship: Friendship): Promise<boolean> => {
  const response = await fetch(friendshipRoutes + `/${friendship.id}`, {
    method: 'DELETE',
  })
  return await response.ok;
}
