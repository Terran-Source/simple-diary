module.exports = {
  getUserId: (user) => `${user.provider}_${user.id}`,
};
