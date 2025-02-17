import { Schema, model } from 'mongoose';

import { USER_STATUS, USER_STATUS_DB_ENUM } from '../../constants/enum';
import { generateHash } from '../../utils/bcrypt';

import type { UserDbDoc } from '../../schemas/user/user.schema';
import type { Model } from 'mongoose';

const userSchema = new Schema<UserDbDoc>(
  {
    role: {
      type: Schema.Types.ObjectId,
      ref: 'role',
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
    status: {
      type: String,
      default: USER_STATUS.INACTIVE,
      enum: USER_STATUS_DB_ENUM,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// hash the password before saving to database
userSchema.pre('save', async function savePassword(next) {
  if (!this.isModified()) {
    next();
  }
  const hash = await generateHash(this.password);
  this.password = hash;
});

//  converting schema to model
export const UserModel: Model<UserDbDoc> = model('user', userSchema);
