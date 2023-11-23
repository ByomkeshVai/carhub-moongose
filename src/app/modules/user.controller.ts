import { Request, Response } from 'express';
import UserSchema from './user.validation';
import { Userservice } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
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
      message: 'User Already Exists',
      error: {
        code: 404,
        description: 'User Already Exists',
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await Userservice.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { userId } = req.params;
    const userIdNumber = parseInt(userId, 10);
    const result = await Userservice.updateUserFromDB(userIdNumber, userData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { userId } = req.params;
    const userIdNumber = parseInt(userId, 10);
    await Userservice.addNewOrderFromDB(userIdNumber, orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = parseInt(userId, 10);

    const result = await Userservice.getOrderFromSingleDB(userIdNumber);
    res.status(200).json({
      data: result,
    });
  }catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

const calculatePrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = parseInt(userId, 10);
    const result = await Userservice.calculateFromDB(userIdNumber);

    res.status(200).json({
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addOrder,
  calculatePrice,
  getSingleOrder,
};