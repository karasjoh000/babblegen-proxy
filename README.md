# Babblegen Proxy
--------------

This is a proxy server that is intended to handle all text source request for the babblegen application.  
### API:
`GET {hostname}/test` - test to see if server is running.  
`GET {hostname}/twitter/{twitter_user_id}` - get tweets of `{twitter_user_id}`  
`GET {hostname}/reddit/user/{reddit_username}` - get comments of `{reddit_username}`  
`GET {hostname}/reddit/subreddit/{subreddit_name}` - get comments of `{subreddit_name}`

### Configure:  
Set client secret, client id, and refresh token in `src/sources/keys` for twitter and reddit. 