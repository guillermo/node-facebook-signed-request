var crypto = require('crypto');

var SignedRequest = function(request, options){
  this.options = options || {};
  this.request = request;
  this.errors = [];
  this.secret = this.options.secret || SignedRequest.secret;

  var splittedRequest = request.split('.', 2);
  this.encodedSignature = splittedRequest[0];
  this.encodedData = splittedRequest[1];
  this.checkForInvalidArguments();

  this.signature = this.extractRequestSignature();
  this.computedSignature = this.computeSignature();
  this.payload = this.extractRequestPayload();
  this.data = this.parseRequestPayload();
  this.validateAlgorithm();
  this.validateSignature();
  if(this.options.strict){
    this.validateTimestamp();
  }
};

SignedRequest.secret = null;

SignedRequest.encodeAndSign = function(options){
  var encodedData = SignedRequest.base64UrlEncode(JSON.stringify(data));
  var shasum = crypto.createHmac('sha256', SignedRequest.secret);
  shasum.update(encodedData);
  var signature = shasum.digest('base64');
  var encodedSignature = SignedRequest.base64UrlEncode( signature );

  return encodedSignature + '.' + encodedData;
};

SignedRequest.prototype.isValid = function (){
  return this.errors.length === 0;
};

SignedRequest.prototype.checkForInvalidArguments = function(){
  if(!this.encodedSignature || !this.encodedData){
    throw  "Invalid Format. See http://developers.facebook.com/docs/authentication/signed_request/";
  }

  if(!this.secret){
    throw "No secret provided. Use SignedRequest.secret= or the options object";
  }

  if(typeof this.secret != 'string'){
    throw "Secret should be a String";
  }
};

SignedRequest.base64UrlEncode = function (data){
 return new Buffer(data, 'utf8').toString('base64').replace('=','');
};

SignedRequest.base64UrlDecode = function( encodedString ){
  // we might need to do some padding with = here so that the length
  // so that string.length % 4 == 0
  while(encodedString.length % 4 !== 0){
    encodedString += '=';
  }
  return new Buffer(encodedString, 'base64').toString('utf-8');
};

SignedRequest.prototype.extractRequestSignature = function(){
  try {
    return SignedRequest.base64UrlDecode(this.encodedSignature);
  }
  catch (e) {
    this.errors.push('Invalid Base64 encoding for signature');
    return null;
  }
};

SignedRequest.prototype.extractRequestPayload = function(){
  try {
    return SignedRequest.base64UrlDecode(this.encodedData);
  }
  catch (e) {
    this.errors.push('Invalid Base64 encoding for data');
    return null;
  }
};
SignedRequest.prototype.parseRequestPayload = function(){
  try {
    return JSON.parse(this.payload);
  }
  catch (e) {
    this.errors.push('Invalid JSON object');
    return null;
  }
};

SignedRequest.prototype.validateAlgorithm = function(){
  if(! this.data || this.data.algorithm != 'HMAC-SHA256'){
    this.errors.push("Invalid Algorithm. Expected: HMAC-SHA256");
  }
};

SignedRequest.prototype.computeSignature = function(){
  var shasum = crypto.createHmac('sha256', this.secret);
  shasum.update(this.encodedData);
  return SignedRequest.base64UrlDecode(shasum.digest('base64'));
};

SignedRequest.prototype.validateSignature = function(){
  if(this.signature != this.computedSignature){
    var message = "Signatures did not match. \n";
    message += "Computed: " + this.computedSignature + " ";
    message += "but was " + this.signature;
    this.errors.push(message);
  }
};

SignedRequest.prototype.validateTimestamp = function(){
  var data = this.data || {};
  var timestamp = data.expires || 1308988800;
  if(timestamp <= Date.now()){
   throw 'OAuth Token has expired';
  }
};

module.exports = SignedRequest;
