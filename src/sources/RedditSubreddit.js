/**
 * RedditSubreddit - use to store, request, and retrieve subreddit comments
 */
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const async = require('async');
const {CacheQuery} = require('./CacheQuery');

class RedditSubreddit {

    //create a Map to store query requests using CacheQuery
    constructor () {
        this.cache = new Map();
    }

    //check to see if a stored query for type is more than 30 min old
    isOld (type) {
        return (((new Date()).getTime() - this.cache.get(type).getDate.getTime()) >= 1800000);
    }

    //check to see if type is stored in cache
    isInCache (type) {
        return (this.cache.get(type));
    }

    //new request to reddit api for new commnets in type subreddit
    redditSubredditRequest (type, cb) {
        let SB = new XMLHttpRequest();
        //make a request for subreddit information
        SB.addEventListener("load", reqListener);
        SB.open("GET", "https://www.reddit.com/r/"+type+"/top.json?t=all&limit=100");
        SB.send();
        function reqListener () {
            let ID = JSON.parse(this.responseText).data.children.map((value) => value.data.id);
            let total = [];

            //for each thread id recieved in subreddit info request, request for comments in the thread
            async.forEachOf(ID, function (id, index, callback) {
                let threads = new XMLHttpRequest();
                threads.addEventListener("load", function () {
                    let text = JSON.parse(this.responseText).map((value) => value.data.children)[1].map((value) => value.data.body); //get the body of comments
                    text = Array.from(text);
                    append(total, text);
                    callback();
                });
                threads.open("GET", "https://www.reddit.com/r/"+type+"/comments/"+id+".json");
                threads.send();
            }, function (err) {
                if (err) console.error(err.message);
                cb(total); //send text to callback
            });
        }

        //used to append two JSON arrays
        function append(to, from) {
            for (let i = 0; i < from.length; i++) {
                to.push(from[i]);
            }
        }

    }

    //uses redditSubredditRequest to make a new request for type and responds to "respond", and stores api response to cache
    newRequest (type, respond) {
        let store = this.cache;
        this.redditSubredditRequest(type, function (text) {
            store.set(type, new CacheQuery(Array.from(text.filter(function(val){if(val)return val})), new Date()));
            respond.json(store.get(type).getText);
        });
    }

    //retrieve type from cache
    retrieveCache(type, respond) {
        let store = this.cache;
        respond.json(store.get(type).getText);
    }

}

module.exports.RedditSubreddit = RedditSubreddit;

