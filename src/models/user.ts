export interface BaseUser {
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  workEmail: string | null;
}

export interface User extends BaseUser {
  id: string;
}

// export interface Users {
//   [key: number]: User;
// }
