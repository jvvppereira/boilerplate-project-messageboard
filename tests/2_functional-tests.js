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
                // assert.equal(res.body.stockData.stock, "GOOG");
                done();
            });
    });
/**
    Creating a new thread: POST request to /api/threads/{board}
    Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}
    Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password
    Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password
    Reporting a thread: PUT request to /api/threads/{board}
    Creating a new reply: POST request to /api/replies/{board}
    Viewing a single thread with all replies: GET request to /api/replies/{board}
    Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password
    Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password
    Reporting a reply: PUT request to /api/replies/{board}
 */
    
});
