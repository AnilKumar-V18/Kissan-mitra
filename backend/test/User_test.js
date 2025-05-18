var expect  = require("chai").expect;
var request = require("request");

describe("User API Testing", function(){

    global.id="";

    describe("Testing - Home Page Loading", function(){

        // var url = "http://localhost:8000/api/farmers";
        var url= "https://kisaan-portal.netlify.app/";

        it("returns status 200", function(done){
            request(url, function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done();
            })
        })
    })
    describe("Testing - SignIn", function(){
        var url = "https://kisaan-portal.herokuapp.com/api/signin";

        it("returns status http-code 200", function(done){
            request({
                url: url,
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: {email: "niraj@gmail.com", password: "niraj123"},
                json: true
            }, function(error, response, body){
                expect(response.statusCode).to.equal(200);
                done();
            })
        })

        it("New Login", function(done){
            request({
                url: url,
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: {email: "niraj@gmail.com", password: "niraj123"},
                json: true
            }, function(error, response, body){
                //console.log(body);
                expect(response.statusCode).to.equal(200);
                done();
            })
        })

    })

    describe("Testing - Sign Up", function(){
        var url = "https://kisaan-portal.herokuapp.com/api/signup";

        it("New User SignUp", function(done){
            request({
                url: url, 
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body:{name: "Tester" , email:"Test@gmail.com", password:"Test123", location:"Maharashtra", role: "0"},
                json:true,
            },function(error, response, body){
                if(response.statusCode===200){
                    //console.log(body);
                    console.log(body);
                    expect(response.statusCode).to.equal(200);
                }
                else {
                    expect(response.statusCode).to.equal(400);
                }
            })
            done();
        })
    })


    describe("Testing Existing - Farmer Details", function(){      
        it("Return Status Code - 200 Default Farmer Exists", function(done){
            var url = "https://kisaan-portal.herokuapp.com/api/farmer/6261739040865c739ed47d12";
            request({
                url: url,
                method: "GET",

            }, function(error, response, body){
                console.log(body);
                expect(response.statusCode).to.equal(200);
                done();
            })
        })

        
        it("Invalid Id - Farmer Not Found", function(done){
            var url = "https://kisaan-portal.herokuapp.com/api/farmer/60a009203abf800041dc6269";
            //console.log(url)
            request({
                url: url,
                method: "GET",

            }, function(error, response, body){
                console.log(body);
                expect(response.statusCode).to.equal(400);
                done();
            })
        })
    })

    
    // describe("update users", function(){
    //     it("returns status 200", function(done){
    //         var url = "https://backend-service-falcon2212.cloud.okteto.net/users/update/60a009203abf800041dc6269";
    //         request({
    //             url : url,
    //             method: "POST",
    //             headers: {'Content-Type': 'application/json'},
    //             body:{username:"Test100", password:"Test100", email:"Test100@gmail.com", name: "Test100", devices: ["Test", "Test1"]},
    //             json:true,
    //         },function(error, response, body){
    //             console.log(body);
    //             expect(response.statusCode).to.equal(200);
    //         })
    //         done();
    //     })

    //     /*it("update new user", function(done){
    //         var url = "https://backend-service-falcon2212.cloud.okteto.net/users/update/".concat(id);
    //         request({
    //             url : url,
    //             method: "POST",
    //             headers: {'Content-Type': 'application/json'},
    //             body:{username:"Test40", password:"Test40", email:"Test40@gmail.com", name: "Test40", devices: ["Test2", "Test40"]},
    //             json:true,
    //         },function(error, response, body){
    //             console.log(url);
    //             console.log(body);
    //             console.log(id);
    //             expect(response.statusCode).to.equal(200);
    //         })
    //         done();
    //     })*/

    // })

})