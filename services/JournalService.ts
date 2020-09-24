import JournalSchema from '../models/Journal';
const mongoose = Injector.resolve('mongoose');
const JournalService = mongoose.model('Journal', JournalSchema);
Injector.add('JournalService', JournalService);

JournalService.userJournals = async function (user: any) {
  return await this.find({ user }).lean();
};

export default JournalService;
