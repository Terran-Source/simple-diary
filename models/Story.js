const mongoose = require('mongoose');
// const moment = require('moment');
const schemaVersion = 1; // update migration logic if changed

const StorySchema = new mongoose.Schema({
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
  status: {
    type: String,
    required: true,
    enum: ['Draft', 'Published'],
  },
  private: {
    type: Boolean,
    required: true,
    default: true,
  },
  locale: String,
  images: [String],
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: Number,
    default: schemaVersion,
  },
});

StorySchema.methods.migrateIfPossible = function () {
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

StorySchema.methods.updateStory = function () {
  this.migrateIfPossible();
  this.updatedOn = Date.now();
};

// StorySchema.methods.toDisplayJson = function () {
//   return {
//     title: this.title,
//     body: this.body,
//     updatedOn: moment(this.updatedOn).fromNow(),
//     images: this.images,
//   };
// };

module.exports = StorySchema;
