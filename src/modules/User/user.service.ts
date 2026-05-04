import { TUser } from './user.interface';

// In a real project, replace this with Prisma / Mongoose DB calls
const users: TUser[] = [];

const createUserIntoDB = async (payload: TUser): Promise<TUser> => {
  // e.g. await prisma.user.create({ data: payload });
  users.push(payload);
  return payload;
};

const getAllUsersFromDB = async (): Promise<TUser[]> => {
  // e.g. return await prisma.user.findMany();
  return users;
};

const getSingleUserFromDB = async (id: string): Promise<TUser | undefined> => {
  // e.g. return await prisma.user.findUnique({ where: { id } });
  return users.find((u) => u.id === id);
};

const updateUserIntoDB = async (
  id: string,
  payload: Partial<TUser>
): Promise<TUser | undefined> => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...payload };
    return users[index];
  }
  return undefined;
};

const deleteUserFromDB = async (id: string): Promise<boolean> => {
  const index = users.findIndex((u) => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
