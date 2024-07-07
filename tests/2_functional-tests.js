const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {


    /*
    Not working yet
    
    Failed:You can send a GET request to /api/threads/{board}. Returned will be an array of the most recent 10 bumped threads on the board with only the most recent 3 replies for each. The reported and delete_password fields will not be sent to the client.
    Failed:You can send a GET request to /api/replies/{board}?thread_id={thread_id}. Returned will be the entire thread with all its replies, also excluding the same fields from the client as the previous test.
    Failed:All 10 functional tests are complete and passing.
    
    */

    test("Creating a new thread: POST request to /api/threads/{board}", function (done) {
        const newThread = {
            board: "123",
            text: "content",
            delete_password: "secret"
        };

        chai.request(server)
            .post("/api/threads/123")
            .send(newThread)
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.board, newThread.board);
                assert.equal(res.body.text, newThread.text);
                assert.equal(res.body.delete_password, newThread.delete_password);
                assert.exists(res.body._id);
                done();
            });
    });

    //TODO
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

    //TODO
    test("Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password", function (done) {
        done();
    });

    //TODO
    test("Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password", function (done) {
        done();
    });

    //TODO
    test("Reporting a thread: PUT request to /api/threads/{board}", function (done) {
        done();
    });

    //TODO
    test("Creating a new reply: POST request to /api/replies/{board}", function (done) {
        done();
    });

    //TODO
    test("Viewing a single thread with all replies: GET request to /api/replies/{board}", function (done) {
        done();
    });

    //TODO
    test("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password", function (done) {
        done();
    });

    //TODO
    test("Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password", function (done) {
        done();
    });
    
    //TODO
    test("Reporting a reply: PUT request to /api/replies/{board}", function (done) {
        done();
    });    
});
