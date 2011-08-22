# facebook signed request for node.js

node.js port of [facebook-signeded-request](https://github.com/wooga/facebook-signed-request).
It implements the [signed request](http://developers.facebook.com/docs/authentication/signed_request/) sent by facebook to applications.

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

## Considerdations

The API is still pretty alpha and will probably change with the next release since the Ruby implementation is not a really good fit for JavaScript. Especially the exception throwing part. This might be a good idea for Ruby but not for node.js, since this can kill the whole node process. Furthermore, there is an issue with node.js crypto.digest not being able to return encodings other than binary, hex or base64. This requires to decode the base64 again and compare with facebook's signature. At least that is how facebook does it in their reference implementation. On could try to not decode their signature and compare it directly with the output of crypto.digest.


