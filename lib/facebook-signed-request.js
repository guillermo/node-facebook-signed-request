var SignedRequest = function(request, options){
  this.options = options || {};
  this.request = request;
  this.isValid = false;
  this.errors = [];
  this.secret = this.options.secret || SignedRequest.secret;

  var splittedRequest = request.split('.', 2);
  this.encodedSignature = splittedRequest[0];
  this.encodedData = splittedRequest[1];

  this.checkForInvalidArguments();

  this.signature = this.extractRequestSignature();
  this.computedSignaure = this.computeSignature();
  this.payload = this.extractRequestPayload();
  this.data = this.parseRequestPayload();

  this.validateAlgorithm();
  this.validateSignature();
  if(this.options.strict){
    this.validateTimestamp();
  }
};

SignedRequest.secret = null;

SignedRequest.encodeAndSign = function(options){};

SignedRequest.prototype.checkForInvalidArguments = function(){};
SignedRequest.prototype.base64UrlDecode = function( encodedString ){};
SignedRequest.prototype.extractRequestSignature = function(){};
SignedRequest.prototype.extractRequestPayload = function(){};
SignedRequest.prototype.parseRequestPayload = function(){};
SignedRequest.prototype.validateAlgorithm = function(){};
SignedRequest.prototype.computeSignature = function(){};
SignedRequest.prototype.validateSignature = function(){};
SignedRequest.prototype.validateTimestamp = function(){};

module.exports = SignedRequest;
