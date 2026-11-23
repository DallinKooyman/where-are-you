import { User } from "@/models/user"

const host = process.env.EXPO_PUBLIC_HOST_SERVER_ADDRESS;

console.log(process.env)
console.log(process.env.EXPO_PUBLIC_HOST_SERVER_ADDRESS)
console.log(host)

if (host === undefined || !host) {
  throw new Error(
    'Missing EXPO_PUBLIC_HOST_SERVER_ADDRESS. Check your .env.local file.'
  );
}

const userRoute = host + '/users';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(userRoute, {
    method: 'GET',
  })
  const data = await response.json();
  return data.users;
}

export const createUser = async (name: string, password: string): Promise<User> => {
  const response = await fetch(userRoute, {
    method: 'POST',
    body: JSON.stringify({ name, password })
  })
  const data = await response.json();
  if (response.status === 200) {
    return data.user;
  }
  throw Error(data);
}

export const getUserById = async (user: User): Promise<User> => {
  const response = await fetch(userRoute + `/${user.id}`, {
    method: 'GET',
  })
  const data = await response.json();
  return data.user;
}

export const updateUser = async (user: User): Promise<User> => {
  const response = await fetch(userRoute + `/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user)
  })
  const data = await response.json();
  return data.user;
}

export const deleteUser = async (user: User): Promise<boolean> => {
  const response = await fetch(userRoute + `/${user.id}`, {
    method: 'DELETE',
  })
  return await response.ok;
}

export const login = async (name: string, password: string): Promise<User> => {
  const response = await fetch(userRoute + `/login`, {
    method: 'POST',
    body: JSON.stringify({ name, password })
  })
  const data = await response.json();
  if (response.status === 200) {
    return data.user;
  }
  throw Error(data);
}
