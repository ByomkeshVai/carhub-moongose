import { TOrder, TUser } from "./user.interface";
import { User } from "./user.model";

const createUserDB = async (userData: TUser) => {
  try {
    if (await User.isUserExists(userData.userId, userData.username)) {
      throw new Error("User Already Exists");
    }
    const result = await User.create(userData);
    return {
      data: result,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to create user");
  }
};

const getAllUserFromDB = async () => {
  try {
    const result = await User.find();
    return {
      data: result,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch users");
  }
};


const getSingleUserFromDB = async (id: number) => {
  try {
    const userExists = await User.isSingleUser(id);
    if (!userExists) {
      throw new Error("User not found");
    }
    
    const result = await User.findOne({ userId: id });
    if (!result) {
      throw new Error("User not found");
    }
    
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch user");
  }
};

const updateUserFromDB = async (id: number, userData: TUser) => {
  try {
    const userExists = await User.isUserExistsForUpdate(id);
    if (!userExists) {
      throw new Error("User not found");
    }
    const result = await User.findOneAndUpdate({ userId: id }, userData, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      throw new Error("User not found");
    }
    return {
      data: result,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user");
  }
};

const addNewOrderFromDB = async (id: number, orderData: TOrder) => {
  try {
     const userExists = await User.isUserExistsForUpdate(id);
    if (!userExists) {
      throw new Error("User not found");
    }
    
    const fetchedUser = await User.findOne({ userId: id });
    if (!fetchedUser) {
      throw new Error("User not found");
    }
    if (fetchedUser.orders) {
      fetchedUser.orders.push(orderData);
    } else {
      fetchedUser.orders = [orderData];
    }

    await fetchedUser.save();
    return {
      data: null,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to create order");
  }
};

const getOrderFromSingleDB = async (userId: number) => {
  try {
   const userExists = await User.isUserExistsForUpdate(userId);
    if (!userExists) {
      throw new Error("User not found");
    }

    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("User not found");
    }
    const orders = user.orders || [];

    return orders
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch order");
  }
};

const calculateFromDB = async (userId: number) => {
  try {
    const userExists = await User.isSingleUser(userId);
    if (!userExists) {
      throw new Error("User not found");
    }

    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("User not found");
    }

    const orders = user.orders || [];

    const totalPrice = orders.reduce(
      (acc, order) => acc + (order.price || 0) * (order.quantity || 1),
      0
    );

    const formattedTotalPrice = totalPrice.toFixed(2);

    return {
      totalPrice: formattedTotalPrice ,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to calculate total price");
  }
};

const deleteUserFromDB = async (id: number) => {
  try {
    const userExists = await User.isSingleUserDelete(id);
    if (!userExists) {
      throw new Error("User not found");
    }

    const result = await User.deleteOne({ userId: id });
    // if (result.deletedCount === 0) {
    //   throw new Error("User not found");
    // }
    return {
      data: result,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete user");
  }
};

export const Userservice = {
  createUserDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addNewOrderFromDB,
  calculateFromDB,
  getOrderFromSingleDB,
};