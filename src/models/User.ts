import mongoose from 'mongoose';
import moment from 'moment';
const schemaVersion = 1; // update migration logic if changed

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
  version: {
    type: Number,
    default: schemaVersion,
  },
});

UserSchema.methods.migrateIfPossible = function (): void {
  while ((this.version || 0) < schemaVersion) {
    switch (this.version) {
      // each case contains migration logic towards next schemaVersion
      case 0: // e.g. contains migration logic towards next schemaVersion, i.e. 2
        this.version += 1;
        break;
      default:
        this.version = 0;
        break;
    }
  }
};

UserSchema.methods.newLogin = function (): void {
  this.migrateIfPossible();
  this.lastLoggedOn = Date.now();
};

UserSchema.methods.logout = function () {
  this.lastLoggedOn = Date.now();
  this.save();
};

UserSchema.methods.toDisplayJson = function (): Object {
  return {
    displayName: this.displayName,
    name: { firstName: this.name.firstName, lastName: this.name.lastName },
    lastLoggedOn: moment(this.lastLoggedOn).fromNow(),
    // .format('[Last logged on] dddd, Do MMM YYYY, h:mm:ss a'),
    image: this.images[0],
  };
};

export default UserSchema;
