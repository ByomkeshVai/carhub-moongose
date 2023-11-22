import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserDB = async (userData : TUser) => {
    if (await User.isUserExists(userData.userId, userData.username)) {
        throw new Error("User Already Exists")
    }
    const result = await User.create(userData)
    return result;
}

// const createUserDB = async (userData: TUser[]) => {
//   for (const user of userData) {
//     const userExists = await User.isUserExists(user.userId, user.username);
//     if (userExists) {
//       throw new Error("User Already Exists on Database");
//     }
//   }
//   const result = await User.create(userData);
//   return result;
// };

export const Userservice = {
    createUserDB,
}