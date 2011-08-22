var validRequest = "53umfudisP7mKhsi9nZboBg15yMZKhfQAARL9UoZtSE.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMDg5ODg4MDAsImlzc3VlZF9hdCI6MTMwODk4NTAxOCwib2F1dGhfdG9rZW4iOiIxMTExMTExMTExMTExMTF8Mi5BUUJBdHRSbExWbndxTlBaLjM2MDAuMTExMTExMTExMS4xLTExMTExMTExMTExMTExMXxUNDl3M0Jxb1pVZWd5cHJ1NTFHcmE3MGhFRDgiLCJ1c2VyIjp7ImNvdW50cnkiOiJkZSIsImxvY2FsZSI6ImVuX1VTIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjExMTExMTExMTExMTExMSJ9";

var invalidRequest1 = "umfudisP7mKhsi9nZboBg15yMZKhfQAARL9UoZtSE.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMDg5ODg4MDAsImlzc3VlZF9hdCI6MTMwODk4NTAxOCwib2F1dGhfdG9rZW4iOiIxMTExMTExMTExMTExMTF8Mi5BUUJBdHRSbExWbndxTlBaLjM2MDAuMTExMTExMTExMS4xLTExMTExMTExMTExMTExMXxUNDl3M0Jxb1pVZWd5cHJ1NTFHcmE3MGhFRDgiLCJ1c2VyIjp7ImNvdW50cnkiOiJkZSIsImxvY2FsZSI6ImVuX1VTIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjExMTExMTExMTExMTExMSJ9";

var invalidRequest2 = "53umfudisP7mKhsi9nZboBg15yMZKhfQAARL9UoZtSE.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMDg5ODg4MDAsImlzc3VlZF9hdCI6MTMwODk4NTAxOCwib2F1dGhfdG9rZW4iOiIxMTExMTExMTExMTExMTF8Mi5BUUJBdHRSbExWbndxTlBaLjM2MDAuMTExMTExMTExMS4xLTExMTExMTExMTExMTExMXxUNDl3M0Jxb1pVZWd5cHJ1NTFHcmE3MGhFRDgiLCJ1c2VyIjp7ImNvdW50cnkiOiJkZSIsImxvY2FsZSI6ImVuX1VTIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjExMTExMTExMTExMTExMSJ";


var SignedRequest = require('../lib/facebook-signed-request');

describe('parse signed requests', function(){
  beforeEach(function(){
   SignedRequest.secret = "897z956a2z7zzzzz5783z458zz3z7556";
  });

  it('parses a valid request',function(){
    new SignedRequest( validRequest ).parse(function(request){
      expect(request.isValid()).toBeTruthy();
    });
  });

  //it('is not valid for requests with an invalid signature',function(){
    //var request = new SignedRequest( invalidRequest1 );
    //expect(request.isValid()).toBeFalsy();
    //expect(request.errors.length).toEqual(1);
    //expect(request.errors[0]).toMatch("Signatures did not match");
  //});

  //it('is not valid for requests with an invalid payload',function(){
    //var request = new SignedRequest( invalidRequest2 );
    //expect(request.isValid()).toBeFalsy();
    //expect(request.errors[0]).toMatch("Invalid JSON object");
    //expect(request.errors[1]).toMatch("Invalid Algorithm");
    //expect(request.errors[2]).toMatch("Signatures did not match");
  //});

  //it('throws an error when the secret is invalid', function(){
    //var expectedMessage = "Secret should be a String";
    //var fn = function(){
      //return new SignedRequest( 'foo.bar', { secret : 2 } );
    //};
    //expect(fn).toThrow(expectedMessage);
  //});

  //it('throws an error when the secret is missing', function(){
    //var expectedMessage =  "No secret provided. Use SignedRequest.secret= or the options object";
    //SignedRequest.secret = null;
    //var fn = function(){
      //return new SignedRequest( 'foo.bar' );
    //};
    //expect(fn).toThrow(expectedMessage);
  //});

  //it('throws an error when invalid parameters are given', function(){
    //var expectedMessage = "Invalid Format. See http://developers.facebook.com/docs/authentication/signed_request/";
    //var fn = function(){
      //return new SignedRequest( 'foobar' );
    //};
    //expect(fn).toThrow(expectedMessage);
  //});

  //it('throws an error with scrict : true and expired oauth token', function(){
    //var expectedMessage = "OAuth Token has expired";
    //var fn = function(){
      //return new SignedRequest( validRequest , { strict : true } );
    //};
    //expect(fn).toThrow(expectedMessage);
  //});
});

