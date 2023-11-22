import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData : TUser) => {
    if (await User.isUserExists(userData.userId, userData.username)) {
        throw new Error("User Already Exists on Database")
    }
    const result = User.create(userData)
    return result;
}

export const Userservice = {
    createUser,
}