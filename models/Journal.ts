import mongoose from 'mongoose';
// import moment from 'moment';
const schemaVersion = 1; // update migration logic if changed

const JournalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
    alias: 'published',
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: true,
    alias: 'private',
  },
  journalDate: {
    type: Date,
    required: true,
  },
  locale: String,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: Number,
    default: schemaVersion,
  },
});

JournalSchema.methods.migrateIfPossible = function () {
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

JournalSchema.methods.updateJournal = function () {
  this.migrateIfPossible();
  this.updatedOn = Date.now();
};

export default JournalSchema;
