var expect  = require("chai").expect;
var request = require("request");

describe("Vegetables API Testing", function(){

    global.id="";

    describe("Testing - Vegetables Details Fetch", function(){
        var url = "https://kisaan-portal.herokuapp.com/api/vegetables";

        it("returns status http-code 200", function(done){
            request({
                url: url,
                method: "GET",

            }, function(error, response, body){
                //console.log(body);
                //console.log(response.statusCode);
                expect(response.statusCode).to.equal(200);
                done();
            })
        })

    })

    describe("Testing Existing - Vegetable Details", function(){      
        it("Return Status Code - 200 Default Farmer Exists", function(done){
            var url = "https://kisaan-portal.herokuapp.com/api/vegetables/6261a71b45c5fc794964dc53";
            request({
                url: url,
                method: "GET",

            }, function(error, response, body){
                console.log(body);
                //console.log(response.statusCode);
                expect(response.statusCode).to.equal(200);
                done();
            })
        })

    })


})