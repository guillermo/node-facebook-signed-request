var validRequest = "53umfudisP7mKhsi9nZboBg15yMZKhfQAARL9UoZtSE.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMDg5ODg4MDAsImlzc3VlZF9hdCI6MTMwODk4NTAxOCwib2F1dGhfdG9rZW4iOiIxMTExMTExMTExMTExMTF8Mi5BUUJBdHRSbExWbndxTlBaLjM2MDAuMTExMTExMTExMS4xLTExMTExMTExMTExMTExMXxUNDl3M0Jxb1pVZWd5cHJ1NTFHcmE3MGhFRDgiLCJ1c2VyIjp7ImNvdW50cnkiOiJkZSIsImxvY2FsZSI6ImVuX1VTIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjExMTExMTExMTExMTExMSJ9";

var invalidRequest1 = "umfudisP7mKhsi9nZboBg15yMZKhfQAARL9UoZtSE.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMDg5ODg4MDAsImlzc3VlZF9hdCI6MTMwODk4NTAxOCwib2F1dGhfdG9rZW4iOiIxMTExMTExMTExMTExMTF8Mi5BUUJBdHRSbExWbndxTlBaLjM2MDAuMTExMTExMTExMS4xLTExMTExMTExMTExMTExMXxUNDl3M0Jxb1pVZWd5cHJ1NTFHcmE3MGhFRDgiLCJ1c2VyIjp7ImNvdW50cnkiOiJkZSIsImxvY2FsZSI6ImVuX1VTIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjExMTExMTExMTExMTExMSJ9";

var invalidRequest2 = "53umfudisP7mKhsi9nZboBg15yMZKhfQAARL9UoZtSE.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMDg5ODg4MDAsImlzc3VlZF9hdCI6MTMwODk4NTAxOCwib2F1dGhfdG9rZW4iOiIxMTExMTExMTExMTExMTF8Mi5BUUJBdHRSbExWbndxTlBaLjM2MDAuMTExMTExMTExMS4xLTExMTExMTExMTExMTExMXxUNDl3M0Jxb1pVZWd5cHJ1NTFHcmE3MGhFRDgiLCJ1c2VyIjp7ImNvdW50cnkiOiJkZSIsImxvY2FsZSI6ImVuX1VTIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjExMTExMTExMTExMTExMSJ";


var SignedRequest = require('../lib/facebook-signed-request');

describe('parse signed requests', function(){
  beforeEach(function(){
   SignedRequest.secret = "897z956a2z7zzzzz5783z458zz3z7556";
  });

  it('parses a valid request',function(){
    var request = new SignedRequest( validRequest );
    expect(request.isValid()).toBeTruthy();
  });

  it('is not valid for requests with an invalid signature',function(){
    var request = new SignedRequest( invalidRequest1 );
    expect(request.isValid()).toBeFalsy();
    expect(request.errors.length).toEqual(2);
  });

  it('is not valid for requests with an invalid payload',function(){
    var request = new SignedRequest( invalidRequest1 );
    expect(request.isValid()).toBeFalsy();
    expect(request.errors.length).toEqual(4);
  });

  it('throws an error when the secret is invalid', function(){
    var expectedMessage = "Secret should be a String";
    expect(new SignedRequest( 'foo.bar', { secret : 2 } )).toThrow(expectedMessage);
  });

  it('throws an error when the secret is missing', function(){
    var expectedMessage =  "No secret provided. Use SignedRequest.secret= or the options object";
    SignedRequest.secret = null;
    expect(new SignedRequest( 'foo.bar' )).toThrow(expectedMessage);
  });

  it('throws an error when invalid parameters are given', function(){
    var expectedMessage = "Invalid Format. See http://developers.facebook.com/docs/authentication/signed_request/";
    expect(new SignedRequest( 'foobar' )).toThrow(exptectedMessage);
  });

  it('throws an error with scrict : true and expired oauth token', function(){
    var expectedMessage = "OAuth Token has expired";
    SignedRequest.secret = null;
    expect(new SignedRequest( validRequest , { strict : true } )).toThrow(expectedMessage);
  });
});

