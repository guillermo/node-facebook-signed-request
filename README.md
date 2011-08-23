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

The API is still pretty alpha and will probably change with the next release since the Ruby implementation is not a really good fit for JavaScript for the following reasons:

* No callbacks. Some parts are CPU intensive (SHA-256, HMAC, base64) and
  therefore might block the reactor. A solution with callbacks is
preferrred (I've started the work on that and it will soon be finished)
* The exception throwing part: This might be a good idea for (non evented) Ruby but not for node.js, since this can kill the whole node process when the errors are not handled. There is a lot of data transformation going on (sha-256, base64, HMAC, JSON), so errors will be common. I prefer an approach that returns an error in the callback as soon as it has found one.
* node.js crypto.digest does not return encodings other than binary, hex or base64. This requires to decode the base64 again and compare with facebook's signature. At least that is how facebook does it in their reference implementation. One could try to not decode their signature and compare it directly with the output of crypto.digest. At this point, I don't see why this should not work but I'll have to try it in the wild first


