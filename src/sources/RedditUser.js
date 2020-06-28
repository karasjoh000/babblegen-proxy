/**
 * RedditUser - use to retrieve, store, request, and send comments for reddit user.
 */

const {RedditKey} = require('./keys/RedditKey');
const snoowrap = require('snoowrap');
const {CacheQuery} = require('./CacheQuery');

class RedditUser {

    //create a Map to store query requests using CacheQuery
    //make a snoowrap object that is used for reddit user api requests
    constructor () {
        this.reddit = new snoowrap(RedditKey);
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

    //using snoowrap npm package, make a new request for type user comments
    redditUserRequest (type, cb) {
        this.reddit.getUser(type).getOverview().then(cb);
    }

    //make a new request for type reddit user, store reults in cache, send as json
    newRequest (type, respond) {
        let store = this.cache;
        this.redditUserRequest(type, function (userinfo, err) {
            if (!err) {
                let userComments = Array.from(userinfo.map((value) => value.body).filter(function(val){if(val)return val}));
                store.set(type, new CacheQuery(userComments, new Date()));
                respond.json(store.get(type).getText); //send the comments
            }
            else {
                respond.json("error: no such user");
            }
        });
    }

    //retieve type from cache and send as json
    retrieveCache(type, respond) {
        let store = this.cache;
        respond.json(store.get(type).getText);
    }

}

module.exports.RedditUser = RedditUser;

