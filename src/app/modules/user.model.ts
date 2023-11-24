import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import { TUser, TFullName, TAddress, TOrder, UserModel } from './user.interface';
import config from '../config';

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
        required: [true, "Quantity is required"], min: 1
    },
});


// Define the schema for the user model
const UserSchema = new Schema<TUser, UserModel>({
    userId: {
        type: Number,
        required: [true, "User ID is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"], unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    fullName: {
        type: fullNameSchema,
        required: [true, "Full Name is required"]
    },
   age: {
    type: Number,
    validate: {
      validator: function (value : any) {
        return typeof value === 'number' && !isNaN(value);
      },
      message: 'Age should be a valid number',
    },
    required: [true, 'Age is required'],
    min: 0,
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
    orders: [OrdersSchema]
});




// bcrypting the password field
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;
    delete ret._id; 
    delete ret.id;
    delete ret.__v;

    const removeIds = (obj: Record<string, any>) => {
      if (obj instanceof Array) {
        obj.forEach(removeIds);
      } else if (obj && typeof obj === 'object') {
        delete obj._id;
        Object.keys(obj).forEach(key => removeIds(obj[key]));
      }
    };

    removeIds(ret);
    return ret;
  },
});



// Static method to check if a user exists by ID or username
UserSchema.statics.isUserExists = async (userId: number, username: string) => {
  const existingUser = await User.findOne({ $or: [{ userId }, { username }] });
  return existingUser;
};

// Static method to find a single user by ID
UserSchema.statics.isSingleUser = async (id: number) => {
  const singleUser = await User.findOne({ userId: id });
  return singleUser;
};


// Static method to update a user by ID
UserSchema.statics.isUserExistsForUpdate = async (id: number) => {
  const updateUser = await User.findOne({ userId: id });
  return updateUser;
};

// Static method to delete a user by ID
UserSchema.statics.isSingleUserDelete = async (id: number) => {
  const deletedUser = User.findOne({ userId: id });
  return deletedUser;
};





export const User = model<TUser, UserModel>('User', UserSchema);