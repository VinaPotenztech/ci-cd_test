import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: {
      type: String,
    },
    role: {
      enum: ['user', 'recruiter', 'admin'],
      default: ['user'],
    },
  },
  { timestamps: true },
);

const User = await mongoose.model('User', userSchema);
export default User;
