import mongoose from 'mongoose';
import getModelName from 'Utils/getModelName';
import { pluralName as userModelName } from '../user/user.model';

const { Schema } = mongoose;
const { singularName, pluralName } = getModelName('todo');

const schema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: userModelName,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'finished', 'draft'],
      default: 'draft',
    },
    finished_at: {
      type: Date,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

// Ensure virtual fields are serialised.
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  },
});

// rename name Example to singular Model
export default mongoose.models[singularName] ||
  mongoose.model(pluralName, schema);
