# Mytweets
> Fetch 100 of my most recent tweets using OAuth1.0
<div align="center">
  <a href="https://my-tweets.herokuapp.com">
    <img src="/banner.jpg" alt="Mytweets" width="100%" />
  </a>
</div>

## Api routes

| Prefix Verb/header      | Roles                    | URI Pattern                      | Params
| :-----------------------| :------------------------| :--------------------------------|:--------------------
| GET                     | PUBLIC                   | /api/oauth_request               | None
| POST                    | Authenticated user       | /api/connect                     | None
| GET                     | Authenticated user       | /api/tweets                      | None
| POST                    | Authenticated user       | /api/disconnect                  | None


## Development setup

* Go to server folder `cd server`
* Create a Twitter app https://developer.twitter.com
* Set `OAUTH_CALLBACK` `OAUTH_CONSUMER_KEY` `OAUTH_CONSUMER_SECRET` in docker-compose.yml
* Run the server (debug mode) running on localhost:4000
```
    docker-compose up --build
```
* Go to client folder `cd client`
* Install dependencies `npm install`
* Run the client running on localhost:3000
```
    npm start
```

## Production setup

* Server
```
    docker build -t mytweets
    docker run -p 3000:3000 mytweets_container mytweets
```
* Client
```
   npm run build 
```