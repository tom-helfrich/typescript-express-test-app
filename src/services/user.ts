import { v4 as uuidv4 } from "uuid";
import { BaseUser, User } from "../models/user";

//In Memory Test Data
let users: User[] = [
  {
    id: "1A1DD51D-0BF2-492F-A6EC-0FBDBA3A3538",
    firstName: "Tommy",
    lastName: "Test User 1",
    userName: "tommy.testuser",
    workEmail: "tommy-test@test.com",
  },
  {
    id: "2ECDE009-FEEA-49A8-BF8E-2EAE62D72A5B",
    firstName: "Stacy",
    lastName: "Test User 2",
    userName: "stacey.testuser",
    workEmail: "stacey-test@test.com",
  },
  {
    id: "F4325302-C538-4777-8564-9F50F3CF428C",
    firstName: "Brad",
    lastName: "Test User 3",
    userName: "brad.testuser",
    workEmail: "brad-test@test.com",
  },
];

// Service methods

export const getAllUsers = async (): Promise<User[]> => users;

export const getUserById = async (id: string): Promise<User> => {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new Error("No user found");
  }

  return user;
};

export const createUser = async (newUser: BaseUser): Promise<User> => {
  const uuid = uuidv4();

  const user = {
    id: uuid,
    ...newUser,
  };

  users.push(user);

  return user;
};

export const updateUser = async (
  id: string,
  userUpdate: BaseUser
): Promise<User> => {
  let user = await getUserById(id);

  if (!user) {
    throw new Error(`No user found for ID: [${id}]`);
  }

  user = {
    id,
    ...userUpdate,
  };

  return user;
};
