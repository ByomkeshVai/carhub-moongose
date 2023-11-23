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
    if (await User.isSingleUser(id)) {
      throw new Error("User not found");
    }
    const result = await User.findOne({ userId: id });
    if (!result) {
      throw new Error("User not found");
    }
    return {
      data: result,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch user");
  }
};

const updateUserFromDB = async (id: number, userData: TUser) => {
  try {
    if (await User.isUserExistsForUpdate(id)) {
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
    // Check if the user with the given ID exists
    if (await User.isUserExistsForUpdate(id)) {
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
    if (await User.isUserExistsForUpdate(userId)) {
      throw new Error("User not found");
    }

    const user = await User.findOne({ userId });
    if (!user) {
      throw new Error("User not found");
    }
    const orders = user.orders || [];

    return {
      data: orders,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch order");
  }
};

const calculateFromDB = async (userId: number) => {
  try {
    if (await User.isSingleUser(userId)) {
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
      data: { totalPrice: formattedTotalPrice },
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to calculate total price");
  }
};

const deleteUserFromDB = async (id: number) => {
  try {
    if ((await User.isSingleUserDelete(id))) {
      throw new Error("User not found");
    }
    const result = await User.deleteOne({ userId: id });
    if (result.deletedCount === 0) {
      throw new Error("User not found");
    }
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