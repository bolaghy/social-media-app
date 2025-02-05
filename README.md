﻿# social-media-app
Here are the APIs links for sending and receiving data.
--To create new user profile, send a post request to this api -> http://localhost:5000/api/users
json body example {
  "username": "young",
  "email": "young@mail.com",
  "passwordHash": "password123",
  "profile": {
    "firstName": "young",
    "lastName": "boy",
    "bio": "I am a man!",
    "profilePicture": "my picture",
    "dateOfBirth": "09/09/2000"
  }
}
--For user to create a post that include text, send a post request to ->http://localhost:5000/api/posts
json body example {
  "userId": "67a2a1a79f368587b081dac3",
  "content": "post text"
}

--For user to comment under a post , send a post request to -> http://localhost:5000/posts/67a2a6d6c24cc96fbe2beb96/comments
the postID is passed in the api, while the user is passed in the json body
json body example {
  "userId": "67a2a1a79f368587b081dac3",
  "content": "my comment"
}

--For user to comment under a post , send a post request to -> http://localhost:5000/posts/67a2a6d6c24cc96fbe2beb96/comments
the postID is passed in the api, while the user is passed in the json body
json body example {
  "userId": "67a2a1a79f368587b081dac3",
  "content": "my comment"
}

--For user to like a post , send a post request to -> http://localhost:5000/posts/67a2a6d6c24cc96fbe2beb96/like
the postID is passed in the api, while the user is passed in the json body
json body example {
  "userId": "67a2a1a79f368587b081dac3",
}

--To get all users profile, send a get request to -> http://localhost:5000/api/users
