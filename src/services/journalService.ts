import JournalSchema from '../models/Journal';
const mongoose = Injector.resolve('mongoose');
const journalService = mongoose.model('Journal', JournalSchema);
Injector.add('journalService', journalService);

journalService.userJournals = async function (userId: string) {
  return await this.find({ user: userId }).lean();
};

export default journalService;
