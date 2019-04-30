# blockonomics-node
Nodejs Library for blockonomics

### Installation

```
npm install blocknomics

```

### Instance

```
var blockonomics = require('blockonomics');
```
### Usage

```
blockonomics.method(<args>).then(function(response) {
		//Results here
	});
```

### Methods
Refer to the [Blockonomics API](https://www.blockonomics.co/views/api.html) to know about each output and explanation
```
getBalance(address)
getHistory(address)
getTransactionDetail(txid)
getTransactionReceipt(txid, address)
getBalance(APIKEY)
insertAddress(APIKEY, addr, tag)
deleteAddress(APIKEY, addr)
getNewAddress(APIKEY, reset, match_account)
```

### Development

Feel free to fork from [blockonomics-node](https://github.com/blockonomics/blockonomics-node)

### Issues

https://github.com/blockonomics/blockonomics-node/issues

### Running test cases
##### Global Package
$ blockonomics-run-tests
##### Local cloned repo 
$ npm test

