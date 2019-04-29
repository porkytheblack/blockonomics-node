var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

//Global api testing (Without API Key )
var sample_addr = '3M3G7y7djcxTjqeoe6M3shBgBqEEg344uj';

//Test Transaction
var sample_txid = '82057757f17f37f18edd577656c737edf3ec7a39e54bfa7228eac7f3bda77b17'
var tx_vout = '3M3G7y7djcxTjqeoe6M3shBgBqEEg344uj';
var tx_vin = '19qwC75P8yTjhLC6iKzprKjBPo7vX1pZba';

//Test account 
var test_api_key = 'AmJ661hScLjQRhzzBYpsxoE8GNJgQlMAaBr8mccfB5Y';
var test_xpub = 'xpub6Ccyeb37i7pCfKmzv9rk2wWzmzK2D9ASZXYh2GHGcFU8N2CVP9RTPMt9FxPxaXykg3BJhiuJLSywY9P8SRgNcRP6dRuhmyTuazEmv4REGaj';
var test_addr1 = '1LuckyG4tMMZf64j6ea7JhCz7sDpk6vdcS';
var test_addr2 = '14cZMQk89mRYQkDEj8Rn25AnGoBi5H6uer';
var test_tag = 'tag123';

// you can use a global variable if tests span many files
let currentResponse = null;

afterEach(function() {
  const errorBody = currentResponse && currentResponse.body;

  if (this.currentTest.state === 'failed' && errorBody) {
    console.log(errorBody);
  }

  currentResponse = null;
});

var blockonomics = require('../blockonomics');

var processResponse = function(response){
  if(response.status == 401) {
    response.body = { 
      "status":response.status, 
      "message" : response.statusMessage 
    };
  }

  return response;
};

// UNIT test begin
describe("Get Balance", function(){
  it("Should return balance for given address.", function(done){
    var response = blockonomics.getBalance(sample_addr).then(function(response) {
      res = processResponse(response);
      // HTTP status should be 200
      currentResponse = res;
      res.status.should.equal(200);
      console.log(res.body);
      res.body.response[0].addr.should.equal(sample_addr);
      res.body.response[0].should.have.property('confirmed').which.is.a.Number();
      res.body.response[0].should.have.property('unconfirmed').which.is.a.Number();
      done();
    });
  });
});

describe("Get Transaction History", function(){
  it("Should return transaction history of given address.", function(done){
	  var response = blockonomics.getHistory(sample_addr).then(function(response) {
      res = processResponse(response);
      // HTTP status should be 200
      currentResponse = res;
      res.status.should.equal(200);
      console.log(res.body);
      res.body.should.have.property('pending');
      res.body.should.have.property('history');
      done();
    });
  });
});

describe("Get Transactoin Detatils", function(){
  it("Should return transaction details for given tx id", function(done){
	  var response = blockonomics.getTransactionDetail(sample_txid).then(function(response) {
      res = processResponse(response);
      // HTTP status should be 200
      currentResponse = res;
      res.status.should.equal(200);
      console.log(res.body);
      res.body.should.have.property('status');
      res.body.should.have.property('vout');
      res.body.should.have.property('vin');
      res.body.should.have.property('time');
      res.body.should.have.property('size');

      res.body.vout[0].address.should.equal(tx_vout);
      res.body.vin[0].address.should.equal(tx_vin);
      done();
    });
  });
});

describe("Delete Address", function(){
  it("Should delete the given address", function(done){
	  var response = blockonomics.deleteAddress(test_api_key, test_addr1).then(function(response) {
      res = processResponse(response);
      // HTTP status should be 200
      currentResponse = res;
      res.status.should.equal(200);
      console.log(res.body);
      done();
    });
  });
});

describe("Add Address", function(){
  it("Should add given address to account", function(done){
	  var response = blockonomics.insertAddress(test_api_key, test_addr1, test_tag).then(function(response) {
      res = processResponse(response);
      // HTTP status should be 200
      currentResponse = res;
      res.status.should.equal(200);
      console.log(res.body);
      done();
    });
  });
});

describe("Get Account Balance", function(){
  it("Should return account balance", function(done){
	  var response = blockonomics.getAccountBalance(test_api_key).then(function(response) {
      res = processResponse(response);
      // HTTP status should be 200
      currentResponse = res;
      res.status.should.equal(200);
      console.log(res.body);
      done();
    });
  });
});

describe("New Address", function(){
  it("Should create new address", function(done){
	  var response = blockonomics.getNewAddress(test_api_key, "", "").then(function(response) {
      res = processResponse(response);
      // HTTP status should be 200
      currentResponse = res;
      console.log(res.body);
      res.status.should.equal(200);
      done();
    });
  });
});
