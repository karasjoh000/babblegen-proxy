/**
 * Tweets - use to request, send, store and retrieve tweets
 */
const {TwitterKey} = require('./keys/TwitterKey');
const Twitter = require('twitter');
const {CacheQuery} = require('./CacheQuery');

class Tweets {

    //create a Map to store query requests using CacheQuery
    //create a Twitter object that handles all requests to twitter api
    constructor () {
        this.twitter = new Twitter(TwitterKey);
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

    //using twitter npm package, make a request for type tweets
    twitterRequest (type, cb) {
        this.twitter.get('statuses/user_timeline', { screen_name: type, count: 3200, exclude_replies: true }, cb);
    }

    //new request for type, store new response in cache
    newRequest (type, respond) {
        let store = this.cache;
        this.twitterRequest(type, function (err, data, resposnse) {
            if (!err) {
                let tweets = data.map((value) => value.text);
                store.set(type, new CacheQuery(Array.from(tweets).filter(function(val){if(val)return val}), new Date()));
                respond.json(store.get(type).getText);
            }
            else {
                respond.json('no tweets found');
            }
        });
    }

    //retrieve type text from cache and send as json
    retrieveCache(type, respond) {
        let store = this.cache;
        respond.json(store.get(type).getText);
    }

}

module.exports.Tweets = Tweets;
