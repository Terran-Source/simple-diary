const JournalSchema = require('../models/Journal');
const mongoose = Injector.resolve('mongoose');
const journalService = mongoose.model('Journal', JournalSchema);
Injector.add('journalService', journalService);

journalService.userJournals = async function (userId) {
  return await this.find({ user: userId }).lean();
};

module.exports = journalService;
