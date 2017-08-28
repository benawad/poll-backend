# Pages

* Login
  * email, password
  * redirect to create poll
* Register
  * username, email, password
  * redirect to login
* All Polls
  * list of all polls
* Create Poll (Auth)
  * name, options
  * redirect to polls results
* Vote on Poll
  * select option
  * redirect to results
* Poll results

# Concepts used

* Ant design
* PostgreSQL
* Sequelize
* GraphQL
* GraphQL server
* Query Batching
* Authentication
* Subscriptions - Real time
* Pagination
* Deploying to production (Heroku)

# DB models and GraphQL types

* User
  * id
  * username
  * email
  * password
* Poll
  * id
  * name
  * options
  * creator
* PollOption
  * id
  * text
  * votes