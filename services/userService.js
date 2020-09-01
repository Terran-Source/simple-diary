const UserSchema = require('../models/User');
const mongoose = injector.resolve('mongoose');
const userService = mongoose.model('User', UserSchema);
injector.add('userService', userService);

module.exports = userService;
