import { User } from '@/app/models/User';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

export async function POST(req) {
  const { email } = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return new NextResponse("Email doesn't exist.", { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const passwordResetExpires = Date.now() + 36000000;

  await User.updateOne(
    { _id: existingUser._id },
    {
      $set: {
        resetToken: passwordResetToken,
        resetTokenExpiry: passwordResetExpires,
      },
    }
  );

  const resetUrl = `https://pizza-topia.vercel.app//reset-password/${resetToken}`;

  const body = `Reset your password by clicking on this link: ${resetUrl}`;

  const msg = {
    to: email,
    from: 'karovgose7@gmail.com',
    subject: 'Reset password',
    text: body,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail
    .send(msg)
    .then(() => {
      return new NextResponse('Reset password email is sent', { status: 200 });
    })
    .catch(async (error) => {
      await User.updateOne(
        { _id: existingUser._id },
        {
          $set: {
            resetToken: undefined,
            resetTokenExpiry: undefined,
          },
        }
      );
      return new NextResponse('Failed sending email.Please try again.', {
        status: 400,
      });
    });

  return new NextResponse('Email is sent for resetting password', {
    status: 200,
  });
}
