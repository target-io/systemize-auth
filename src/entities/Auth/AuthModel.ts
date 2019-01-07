import { Schema, model, pluralize } from 'mongoose';

pluralize(null);

const AuthSchema = new Schema({
  _userId: Schema.Types.ObjectId,
  refreshToken: String,
  ipAddress: String,
  device: String,
  expiresAt: String,
  deleted: Boolean,
}, {
  timestamps: true
});

const AuthModel = model('Auth', AuthSchema);

export default AuthModel;