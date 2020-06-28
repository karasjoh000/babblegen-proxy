/**
 * CacheQuery - use to store text and date of query requests
 */
class CacheQuery {

    //create cache object for query request
    constructor (text, date){
        this.text = text;
        this.date = date;
    }

    //returns the text the query made
    get getText () {
        return this.text;

    }

    //returns the date when the query was made
    get getDate () {
        return this.date;
    }
}

module.exports.CacheQuery = CacheQuery;