export default `
  type Subscription {
    voteHappened: Int
  }

  type PollOption {
    id: Int!
    text: String!
    votes: Int!
    pollId: Int!
  }

  type Poll {
    id: Int!
    name: String!,
    options: [PollOption!]!
  }

  type User {
    id: Int!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    refreshToken: String!
  }

  type Error {
    field: String!
    message: String!
  }

  type PollResponse {
    ok: Boolean!
    errors: [Error!]
    poll: Poll
  }

  type RegisterResponse {
    ok: Boolean!
    errors: [Error!]
    user: User
  }

  type LoginResponse {
    ok: Boolean!
    errors: [Error!]
    authPayload: AuthPayload
  }

  type Query {
    poll(id: Int!): Poll
    allPolls: [Poll!]!
  }

  type Mutation {
    vote(pollOptionId: Int!): Boolean!
    createPoll(name: String!, options: [String!]!): PollResponse!
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
