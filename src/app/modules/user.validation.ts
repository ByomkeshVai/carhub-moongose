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

// export const UserSchema = z.array(
//   z.object({
//     userId: z.number(),
//     username: z.string(),
//     password: z.string(),
//     fullName: FullNameSchema,
//     age: z.number(),
//     email: z.string().email(),
//     isActive: z.boolean(),
//     hobbies: z.array(z.string()),
//     address: AddressSchema,
//     orders: z.array(OrderSchema).optional(),
//   })
// );


export default UserSchema;