/**
 * SourceInterface - use as interface for source types twitter, reddit, and subreddit
 */
const {Tweets} = require('./sources/Tweets');
const {RedditUser} = require('./sources/RedditUser');
const {RedditSubreddit} = require('./sources/RedditSubreddit');

class SourceInterface {

    // create Source objects
    constructor () {
        this.tweets = new Tweets();
        this.redditUser = new RedditUser();
        this.redditSubreddit = new RedditSubreddit();
    }

    // respond type tweets as json
    getTweets(type, respond) {
        //if not old and exists retrieve form cache
        if (this.tweets.isInCache(type) != null && !this.tweets.isOld(type)) {
            this.tweets.retrieveCache(type, respond);
        }
        // make new request for tweets
        else {
            this.tweets.newRequest(type, respond);
        }
    }

    // respond reddit user type comments as json
    getRedditUser (type, respond) {
        // if not old and exists retrieve form cache
        if (this.redditUser.isInCache(type) != null && !this.redditUser.isOld(type)) {
            this.redditUser.retrieveCache(type, respond);
        }
        // make new request for reddit user comments
        else {
            console.log('new reddit user request');
            this.redditUser.newRequest(type, respond);
        }
    }

    // respond with subreddit type comments as json
    getRedditSubreddit (type, respond) {
        //if not old and exists retrieve form cache
        if (this.redditSubreddit.isInCache(type) != null && !this.redditSubreddit.isOld(type)) {
            this.redditSubreddit.retrieveCache(type, respond);
        }
        //make new request for reddit subreddit comments
        else {
            console.log('new reddit user request');
            this.redditSubreddit.newRequest(type, respond);
        }
    }



}

module.exports.SourceInterface = SourceInterface;