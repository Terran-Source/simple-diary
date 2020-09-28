const mongoose = require('mongoose');
const moment = require('moment');
const extend = require('extend');
const he = require('he');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
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
    default: moment.utc,
  },
  updatedAt: {
    type: Date,
    default: moment.utc,
  },
  version: {
    type: Number,
    default: schemaVersion,
  },
});

JournalSchema.plugin(mongooseLeanVirtuals);
JournalSchema.set('toJSON', { virtuals: true });

JournalSchema.virtual('selectedDate')
  .get(function () {
    return moment.utc(this.journalDate).format('DD/MM/YYYY');
  })
  .set(function (value) {
    this.journalDate = moment.utc(value, 'DD/MM/YYYY', true);
  });

JournalSchema.virtual('privacy').get(function () {
  return this.isPrivate ? 'Private' : 'Public';
});

JournalSchema.virtual('saved').get(function () {
  return this.isPublished ? 'Published' : 'Draft';
});

JournalSchema.virtual('status').get(function () {
  return `${this.privacy}, ${this.saved}`;
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
  this.updatedOn = moment.utc();
};

JournalSchema.methods.toDisplayJson = function () {
  return extend(true, this.toJSON({}), {
    bodyText: he.encode(this.body, {
      useNamedReferences: true,
    }),
  });
};

export default JournalSchema;
