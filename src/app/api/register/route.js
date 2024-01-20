import { User } from '@/app/models/User';
import mongoose from 'mongoose';

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);

  const existingUser = await User.findOne({ email: body.email });

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
