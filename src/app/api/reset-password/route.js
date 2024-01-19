import { User } from '@/app/models/User';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, password } = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const existingUser = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, 5);
  existingUser.password = hashedPassword;
  existingUser.resetToken = undefined;
  existingUser.resetTokenExpiry = undefined;

  try {
    await existingUser.save();
    return new NextResponse("User's password is updated", { status: 200 });
  } catch (err) {
    return new NextResponse(err, { status: 400 });
  }
}
