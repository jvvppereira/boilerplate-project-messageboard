const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test("Creating a new thread: POST request to /api/threads/{board}", function (done) {
        chai.request(server)
            .post("/api/threads/123")
            .send({ board: "123", text:"content", delete_password:"secret" })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.board, "123");
                assert.equal(res.body.text, "content");
                assert.equal(res.body.delete_password, "secret");
                assert.exists(res.body._id);
                done();
            });
    });

    test("Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}", function (done) {
        chai.request(server)
            .get("/api/threads/123")
            .send({ board: "123", limit: 10, orderBy:'recentFirst', repliesCount: 3 })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isAtLeast(res.body.length, 1);
                assert.isAtMost(res.body.length, 10);
                res.body.forEach(thread => {
                   assert.isAtLeast(thread.replies.length, 3);
                });
                done();
            });
    });

    test("Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password", function (done) {
        done();
    });

    test("Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password", function (done) {
        done();
    });

    test("Reporting a thread: PUT request to /api/threads/{board}", function (done) {
        done();
    });

    test("Creating a new reply: POST request to /api/replies/{board}", function (done) {
        done();
    });

    test("Viewing a single thread with all replies: GET request to /api/replies/{board}", function (done) {
        done();
    });

    test("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password", function (done) {
        done();
    });

    test("Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password", function (done) {
        done();
    });
    
    test("Reporting a reply: PUT request to /api/replies/{board}", function (done) {
        done();
    });    
});
