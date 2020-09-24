import UserSchema from '../models/User';
const mongoose = Injector.resolve('mongoose');
const UserService = mongoose.model('User', UserSchema);
Injector.add('UserService', UserService);

export default UserService;
