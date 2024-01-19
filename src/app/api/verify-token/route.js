import { User } from '@/app/models/User';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
  const { token } = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    return new NextResponse('Invalid token or has expired', {
      status: 400,
    });
  }
  return new NextResponse(JSON.stringify(user), { status: 200 });
}
