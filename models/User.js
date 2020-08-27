const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  providerId: {
    type: String,
    required: true,
    index: true,
  },
  provider: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    enum: ['google'],
  },
  displayName: {
    type: String,
    required: true,
    index: true,
  },
  userName: String,
  name: {
    firstName: String,
    lastName: String,
    middleName: String,
  },
  locale: String,
  emails: [String],
  images: [String],
  joinedOn: {
    type: Date,
    default: Date.now,
  },
  lastLoggedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = (/*Mongoose */ conn) => conn.model('User', UserSchema);
