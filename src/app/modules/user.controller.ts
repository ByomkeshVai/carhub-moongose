import { Request, Response } from "express";
import UserSchema  from "./user.validation";
import { Userservice } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const user  =  req.body ;
        const zodParseData = UserSchema.parse(user);
        const result = await Userservice.createUserDB(zodParseData); 

        res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: result,
        });
    } catch (error: any) {
        res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        error: error,
        });
    }
}


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await Userservice.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const userIdNumber = parseInt(userId, 10);
        const result = await Userservice.getSingleUserFromDB(userIdNumber);

        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
      
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: err,
        });
    }
}

const updateUser = async (req: Request, res: Response) => {
  try {
      const userData = req.body;
    const {userId}  = req.params;
    const userIdNumber = parseInt(userId, 10);
    const result = await Userservice.updateUserFromDB(userIdNumber, userData)

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}




const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const userIdNumber = parseInt(userId, 10);
        await Userservice.deleteUserFromDB(userIdNumber);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    } catch (err: any) {
        if (err.message === 'User not found') {
            res.status(404).json({
                success: false,
                message: 'User not found',
                error: null,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: err,
            });
        }
    }
};


export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};