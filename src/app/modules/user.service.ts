import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserDB = async (userData : TUser) => {
    if (await User.isUserExists(userData.userId, userData.username)) {
        throw new Error("User Already Exists")
    }
    const result = await User.create(userData)
    return result;
}

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id : number) => {
  if (await User.isSingleUser(id)) {
        throw new Error("User not found");
    }

    const result = await User.findOne({userId : id});
    return result;

};


const deleteUserFromDB = async (id: number) => {
     if ((await User.isSingleUserDelete(id))) {
    throw new Error("User not found");
  }
    const result = await User.deleteOne({ userId: id });
    if (result.deletedCount === 0) {
        throw new Error('User not found');
    }
    return result;
}

export const Userservice = {
    createUserDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserFromDB
}