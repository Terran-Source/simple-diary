const UserSchema = require('../models/User');
const mongoose = Injector.resolve('mongoose');
const userService = mongoose.model('User', UserSchema);
Injector.add('userService', userService);

module.exports = userService;
