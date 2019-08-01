const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: { type: String, required: true },
  login: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  created: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  let user = this;
  if (!user.isModified('password')) return next();

  user.password = await bcrypt.hash(user.password, 10);
  return next();
});

module.exports = mongoose.model('User', UserSchema);
