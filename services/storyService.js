const StorySchema = require('../models/Story');
const mongoose = injector.resolve('mongoose');
const storyService = mongoose.model('Story', StorySchema);
injector.add('storyService', storyService);

storyService.userStories = async function (userId) {
  return await this.find({ user: userId }).lean();
};

module.exports = storyService;