import { Schema, model, Error } from "mongoose";
import { TUser, TFullName, TAddress, TOrder, UserModel } from './user.interface';

// Define the schema for Fullname model
const fullNameSchema = new Schema<TFullName>({
    firstName: {
        type: String, 
        required: [true, "First Name is required"] },
    lastName: {
        type: String, 
        required: [true, "Last Name is required"] },
});

// Define the schema for the address model
const AddressSchema = new Schema<TAddress>({
    street: {
        type: String, 
        required: [true, "Street is required"] },
    city: {
        type: String, 
        required: [true, "City is required"] },
    country: {
        type: String, 
        required: [true, "Country is required"] },
});

// Define the schema for the order model
const OrdersSchema = new Schema<TOrder>({
    productName: {
        type: String, 
        required: [true, "Product Name is required"] },
    price: {
        type: Number, 
        required: [true, "Price is required"], min: 0 },
    quantity: {
        type: Number, 
        required: [true, "Quantity is required"], min: 1 },
});

// Define the schema for the user model
const UserSchema = new Schema<TUser>({
    userId: {
        type: Number,
        required: [true, "User ID is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"], unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        maxlength: [20, 'Password can not be more than 20 characters'],
    },
    fullName: {
        type: fullNameSchema,
        required: [true, "Full Name is required"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"], min: 0
    },
    email: {
        type: String, 
        required: [true, "Email is required"] },
    isActive: {
        type: Boolean, 
        default: true,
        required: [true, "isActive is required"] },
    hobbies: {
        type: [String], 
        required: [true, "Hobbies are required"] },
    address: {
        type: AddressSchema,
        required: [true, "Address is required"],
    },
    orders: [OrdersSchema],
});

// Definingg a static method
UserSchema.statics.isUserExists = async (id: number, username: string ) => {
    try {
        const exixtstingUser = await User.findOne({ $or: [{ userId: id }, { username }] });
        return exixtstingUser;
    } catch (error: any) {
        throw new Error(`Error while checking if user exists: ${error.message}`);
    }
};

export const User = model<TUser, UserModel>('User', UserSchema);