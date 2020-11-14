var unirest = require("unirest");
var querystring = require("querystring");
var config = require('./config');
var Promise = require('promise/domains');

module.exports = {

	getBalance: function(addr) {
		var url = config.config.balance;
		var result = sendRequest(url, 'POST', {
			"addr": addr
		});
		return result;
	},
	// https://www.blockonomics.co/api/searchhistory
	getHistory: function(addr) {
		var url = config.config.history;
		var result = sendRequest(url, 'POST', {
			"addr": addr
		});
		return result;
	},

	getTransactionDetail: function(txId) {
		var url = config.config.transactionDetail + "?txid=" + txId;
		var result = sendRequest(url, "GET", {});
		return result;
	},

	getTransactionReceipt: function(txId, addr) {
		var url = config.config.transactionReceipt + "?txid=" + txId + "&addr=" + addr;
		var result = sendRequest(url, "GET", {});
		return result;
	},

	getAccountBalance: function(APIKEY) {
		var url = config.config.address;
		var result = sendRequest(url, "GET", {}, APIKEY);
		return result;
	},

	insertAddress: function(APIKEY, addr, tag) {
		var url = config.config.address;
		var result = sendRequest(url, "POST", {
			"addr": addr,
			"tag": tag
		}, APIKEY);
		return result;
	},

	deleteAddress: function(APIKEY, addr) {
		var url = config.config.delete_address;
		var result = sendRequest(url, "POST", {
			"addr": addr
		}, APIKEY);
		return result;
	},

	getNewAddress: function(APIKEY, reset, match_account) {
		var url = config.config.newAddress;
		if (reset == 1)
			url = url + "reset=1";

		if (match_account)
			url = ( url + ( ( reset == 1 ) ? "&": "?" ) ) + "match_account=" + match_account;

		var result = sendRequest(url, "POST", {}, APIKEY);
		return result;
	}
};

function sendRequest(fullpath, method, querystring, APIKEY) {

	var options = {
		url: config.config.hostUrl + fullpath,
		qs: querystring,
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'blockonomics',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + APIKEY
		}
	};

	return new Promise(function(resolve, reject) {
		if (method == "GET") {
			unirest.get(options.url)
				.headers(options.headers)
				.send(options.qs)
				.end(function(response) {
					resolve(response);
				});
		} else if (method == "POST") {
			unirest.post(options.url)
				.headers(options.headers)
				.send(options.qs)
				.end(function(response) {
					resolve(response);
				});
		}
  });
}
