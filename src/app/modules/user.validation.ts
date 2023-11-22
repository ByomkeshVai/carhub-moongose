import { z } from "zod";

const TFullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const TAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const TOrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const TUserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: TFullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: TAddressSchema,
  orders: z.array(TOrderSchema),
});

export default TUserSchema;