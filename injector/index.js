let injector = function () {
  let _container = {};

  this.add = (service, instance) => {
    _container[service] = instance;
  };

  this.resolve = (serviceName) => _container[serviceName];

  this.remove = (serviceName) => delete _container[serviceName];
};

module.exports = new injector();
