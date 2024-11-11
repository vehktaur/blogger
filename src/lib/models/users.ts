import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { InferSchemaType, model, models, Schema } from 'mongoose';
import { emailPattern } from '../definitions';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      trim: true,
      lowercase: true,
      match: emailPattern,
    },
    emailVerified: {
      type: Date,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true }, // Include virtuals in object output
  },
);

userSchema.plugin(mongooseLeanVirtuals);

// Define the virtual field 'name'
userSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

// Model initialization
const Users = models.User || model('User', userSchema);

//Export user document and object types
export type User = InferSchemaType<typeof userSchema> & {
  _id: string;
  name: string;
};
export type UserDocument = ReturnType<(typeof Users)['hydrate']>;

export default Users;
