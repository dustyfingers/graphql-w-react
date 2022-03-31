# What is restful routing? 

### What is the general idea behind rest?
Given a collection of records on a server, there should be a uniform URL and
HTTP request method used to utilize that collection of records. What http method
do we use to create, read, edit and delete the record each time? What url does
this request get sent to?

#### A basic example of a restful api
| URL       | Method |     Operation     |
| :-------- | :----: | :---------------: |
| /posts    |  POST  | create a new post |
| /posts    |  GET   |  fetch all posts  |
| /posts/14 |  GET   |   fetch post 14   |
| /posts/15 |  PUT   |  update post 15   |
| /posts/18 | DELETE |  delete post 18   |

#### More generally:
| URL                  | Method |           Operation           |
| :------------------- | :----: | :---------------------------: |
| /<resource_name>     |  POST  |      create a new record      |
| /<resource_name>     |  GET   |       fetch all records       |
| /<resource_name>/:id |  GET   | fetch record with a given id  |
| /<resource_name>/:id |  PUT   | update record with a given id |
| /<resource_name>/:id | DELETE | delete record with a given id |

### But what if our resources have relationships with each other?

#### Por ejemplo, we have users:
| URL       | Method |          Operation          |
| :-------- | :----: | :-------------------------: |
| /users    |  POST  |      create a new user      |
| /users    |  GET   |       fetch all users       |
| /users/23 |  GET   | fetch user with a given id  |
| /users/23 |  PUT   | update user with a given id |
| /users/23 | DELETE | delete user with a given id |

#### BUT, we also have posts that have a relationship to a user
| URL                | Method |             Operation              |
| :----------------- | :----: | :--------------------------------: |
| /users/23/posts    |  POST  |     create a post for user 23      |
| /users/23/posts    |  GET   | fetch all posts created by user 23 |
| /users/23/posts/14 |  GET   |  fetch post 14 created by user 23  |
| /users/23/posts/15 |  PUT   | update post 15 created by user 23  |
| /users/23/posts/18 | DELETE | delete post 18 created by user 23  |

### With only two resources, this is okay. But what if we had several resources that are closely related? We would have to nest our routing and things get...very weird. 

### Restful apis are prone to a few problems, specifically when the data being queried is closely related:
1. making too many http requests (eg a request to /users/1/company & users/1/position for each friend of a user - data is underfetched)
2. fetching too much data at once (eg a request to /users/23/friends_with_companies_and_positions where only the friends company is used and not their position - data is overfetched)
3. lots of tightly coupled, super specific endpoints (eg /users/23/friends_with_companies_and_positions - too specific to be generally useful)

### GraphQL offers a solution to this problem.
