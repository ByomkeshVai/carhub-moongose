import { TOrder, TUser } from "./user.interface";
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

const updateUserFromDB = async (id: number, userData: TUser) => {
  try {
      if (await User.isUserExistsForUpdate(id)) {
        throw new Error("User not found");
    }  
    const result = await User.findOneAndUpdate({ userId: id }, userData, {
      new: true,
      runValidators: true,
    });
    return result;
  } catch (error) {
    throw new Error("User not found");
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
      success: true,
      message: "Order created successfully!",
      data: null,
    };
  } catch (error) {
    throw new Error("User not found");
  }
};


const calculateFromDB = async (userId: number) => {
    try {
        if (await User.isSingleUser(userId)) {
            throw new Error("User not found");
        }
      
        const user = await User.findOne({ userId });
        if (!user) {
            throw new Error('User not found');
        }
        const orders = user.orders || [];
        const totalPrice = orders.reduce((acc, order) => acc + (order.price || 0), 0);
        const formattedTotalPrice = totalPrice.toFixed(2);
        return {
            success: true,
            message: 'Total price calculated successfully!',
            data: { totalPrice : formattedTotalPrice },
        };

    } catch (error: any) {
        throw {
            success: false,
            message: error.description || 'Failed to calculate total price',
            error: {
                code: error.code || 500,
                description: error.description || 'Internal Server Error',
            },
        };
    };
}

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
    deleteUserFromDB,
    updateUserFromDB,
    addNewOrderFromDB,
    calculateFromDB,
}