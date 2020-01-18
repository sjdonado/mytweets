const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  userId: {
    type: Number,
    unique: true,
    required: [true, 'UserId required'],
  },
  name: String,
  screenName: String,
  avatar: String,
  banner: String,
  description: String,
  location: String,
};

const userSchema = new Schema(fields, {
  timestamps: true,
});

userSchema.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  // eslint-disable-next-line dot-notation
  delete doc['__v'];
  delete doc.createdAt;
  delete doc.updatedAt;
  return doc;
};

userSchema.methods.getId = function getId() {
  const doc = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  return doc._id.toString();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
