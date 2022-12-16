import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>('saltRound'));
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this as UserDocument;
  try {
    const isMatched = await bcrypt.compare(candidatePassword, user.password);
    return isMatched;
  } catch (error) {
    return false;
  }
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;
