import { z } from "zod";

// Define Zod validation schema for FullName
export const FullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

// Define Zod validation schema for Address
export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

// Define Zod validation schema for Orders
export const OrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Define Zod validation schema for User
export const UserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: FullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressSchema,
  orders: z.array(OrderSchema).optional(),
});

// Define Zod validation schema for User
export const UpdateUserSchema = z.object({
  userId: z.number().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  fullName: FullNameSchema.optional(),
  age: z.number().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: AddressSchema.optional(),
  orders: z.array(OrderSchema).optional().optional(),
});



export const userValidation = {
  UserSchema,
  UpdateUserSchema,
};