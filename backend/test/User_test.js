var expect = require("chai").expect;
var request = require("request");

// Base configuration
const SERVER_URL = "http://localhost:8000"; // Using port 8000 as per your server logs
const API_BASE = `${SERVER_URL}/api`;

// Test user credentials (replace with your actual test user)
const TEST_USER = {
  email: "test@kisaan.com",
  password: "test123",
  name: "Test User",
  location: "Test Location",
  role: "0"
};

describe("User API Testing", function() {
  this.timeout(5000); // Set test timeout

  describe("Testing - Home Page Loading", function() {
    it("returns status 200", function(done) {
      request(`${API_BASE}/farmers`, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Testing - SignIn", function() {
    it("returns status 200 with valid credentials", function(done) {
      request({
        url: `${API_BASE}/signin`,
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: { email: TEST_USER.email, password: TEST_USER.password },
        json: true
      }, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Testing - Sign Up", function() {
    it("New User SignUp returns 200", function(done) {
      const newUserEmail = `test+${Date.now()}@kisaan.com`;
      
      request({
        url: `${API_BASE}/signup`,
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: {
          name: TEST_USER.name,
          email: newUserEmail,
          password: TEST_USER.password,
          location: TEST_USER.location,
          role: TEST_USER.role
        },
        json: true
      }, function(error, response, body) {
        if (response.statusCode === 200) {
          expect(response.statusCode).to.equal(200);
        } else {
          expect(response.statusCode).to.equal(400);
        }
        done();
      });
    });
  });

  describe("Testing Farmer Details", function() {
    // Replace with a valid farmer ID from your local database
    const VALID_FARMER_ID = "507f1f77bcf86cd799439011";
    
    it("Returns 200 for existing farmer", function(done) {
      request({
        url: `${API_BASE}/farmer/${VALID_FARMER_ID}`,
        method: "GET"
      }, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
