const StorySchema = require('../models/Story');
const mongoose = injector.resolve('mongoose');
const storyService = mongoose.model('Story', StorySchema);
injector.add('storyService', storyService);

module.exports = storyService;
