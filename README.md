# facebook signed request for node.js

node.js port of [facebook-signeded-request](https://github.com/wooga/facebook-signed-request)

## Considerdations

The API is still pretty alpha and will probably change with the next release since the Ruby implementation 
is not a really good fit for JavaScript. Especially the exception throwing part. This might be a good idea for Ruby but not for node.js, since this can
kill the whole node process.

## Installation

clone this repository and then

	var SignedRequest = require(PATH_TO_LIB + '/lib/facebook-signed-request');
  	SignedRequest.secret = "your facebook application secret";
  	var request = yourRequestObjectParamsHash['signed_request'];
  	var signedRequest = new SignedRequest( request );

  	console.log(signedRequest.isValid());
  	console.log(signedRequest.errors);

## Tests

	npm install jasmine-node
	jasmine-node spec