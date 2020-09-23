import JournalSchema from '../models/Journal';
const mongoose = Injector.resolve('mongoose');
const journalService = mongoose.model('Journal', JournalSchema);
Injector.add('journalService', journalService);

journalService.userJournals = async function (user: any) {
  return await this.find({ user }).lean();
};

export default journalService;
