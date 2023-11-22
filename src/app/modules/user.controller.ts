import { Request, Response } from "express";
import TUserSchema from "./user.validation";
import { Userservice } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const { user: UserData } =  req.body ;
        const zodParseData = TUserSchema.parse(UserData);
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


export const UserController = {
  createUser,
};