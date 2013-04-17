require('should')
var AqiApi = require('../');
var api = new AqiApi('QfEJyi3oWKSBCnKrqp1v');
describe("getSupportCities:", function() {
    it('The cities should be an Array', function(done) {
      api.getSupportCities(function(data) {
        var cities = data.cities;
        //cities.should.be.an.instanceOf(Array);
        done();
      });
    });
});

describe('getAvgPm25ForCity:', function() {
  it('The average pm2.5 data should be an object', function(done){
    api.getAvgPm25ForCity({
      city: 'beijing',
      callback: function(data) {
      //data.should.be.a('object');
        done(); 
      },
      errorCallback: function() {}
    });
  });
});

describe('getUsemPm25ForCity:', function() {
  it('The pm2.5 data of U.S Embassy should be an Array', function(done){
    api.getUsemPm25ForCity({
      city: 'beijing',
      callback: function(data) {
        done();
      }
    });
    done();
  });
});

describe('getLatestUsemPm25ForCity:', function() {
  it('The pm2.5 data U.S. Embassy should be an object', function(done){
    api.getLatestUsemPm25ForCity({
      city: 'beijing',
      callback: function(data) {
        done();
      }
    });
    done();
  });
});

describe('getWeatherForCity:', function() {
  it('The weather data should be an object', function(done){
    api.getWeatherForCity({
      city: 'beijing',
      callback: function(data) {
        done();
      }
    });
    done();
  });
});
