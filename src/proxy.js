/**
 * Proxy server for babblegen to handle all api requests for text sources
 */
const express = require("express");
const cors = require('cors');
const {SourceInterface} = require('./SourceInterface');
const app = new express();
const sources = new SourceInterface();

// This is required to make requests from the browser.
app.use(cors());

// bind the app to listen for connections on a specified port
let port = process.env.PORT || 3000;
app.listen(port);

// Render some console log output
console.log("Listening on port " + port);


//Test to see if server is running
app.get('/test', function (request, respond) {
    respond.json("THE BABBLEGEN HAS HEARD YOU...")
});

//respond with tweets from user type
app.get('/twitter/:type', function (request, respond) {
    sources.getTweets(request.params.type, respond);
});

//repond with comments from reddit user type
app.get('/reddit/user/:type', function (request, respond) {
    sources.getRedditUser(request.params.type, respond);
});

//respond with comments from subreddit type
app.get('/reddit/subreddit/:type' , function(request, respond) {
    sources.getRedditSubreddit(request.params.type, respond);
});