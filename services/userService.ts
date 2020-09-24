import UserSchema from '../models/User';
const mongoose = Injector.resolve('mongoose');
const userService = mongoose.model('User', UserSchema);
Injector.add('userService', userService);

export default userService;
