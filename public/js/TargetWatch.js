(function () {
  'use strict';
  angular.module('irn.TargetWatch', [])
    .factory('IrnTargetWatch', ['$q', function ($q) {

      // function that does the watching
      var watchFn = function () {
        var self = this;
        if (this.currentVal() !== this.targetVal) {
          // if current value unchanged or not equal to target value, keep watching
          // using $timeout here instead of setTimeout slows things down significantlly
          setTimeout(function () {
            watchFn.call(self);
          }, 100);
        } else {
          // value equal to target, resolve
          this.deferred.resolve({ newVal: this.currentVal(), oldVal: this.initVal });
        }
      };

      // constructor, an instance of this object will be created for each watch
      var Watcher = function (obj, prop, trgVal) {
        // if target properties equal from getgo, do nothing
        if (obj[prop] === trgVal) {
          return;
        }

        this.currentVal = function () {
          return obj[prop];
        };
        // starting value of the watched property
        this.initVal = this.currentVal();
        // target value
        this.targetVal = trgVal;

        this.deferred = $q.defer();
        //this.deferred.promise.then(succ, err);

        // start watching
        watchFn.call(this);
      };

      // service object
      return {
        watch: function (object, propertyName, targetValue) {
          var watcher = new Watcher(object, propertyName, targetValue);
          return watcher.deferred.promise;
        }
      };
    }]);
}());
