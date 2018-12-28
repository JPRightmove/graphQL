var express = require('express');
var graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const request = require('superagent');
const fetch = require('node-fetch');
global.Headers = global.Headers || require("fetch-headers");

const port = 9009;
const baseUrl = 'http://localhost:3000'

const makeUserApiCall = async (token) => {
  console.log('makeUserApiCall ');
  const r = await fetch(
    `${baseUrl}/api/me`, 
    {
      headers: new Headers({'Authorization': token})
    })
    .then((res) => res.json())
    .then((res) => res);

  // console.log('makeUserApiCall r %o', r);
  return r;
}

// The root provides a resolver function for each API endpoint
const rootValue = {
  // console.log('rootValue res %o', res);

  user: async (req, res) => {
    // const {token} = res.locals.auth;
    const {token} = res.res.locals.auth;

    const r = await fetch(
      `${baseUrl}/api/me`, 
      {
        headers: new Headers({'Authorization': token})
      })
      .then((res) => res.json())
      .then((res) => res);
  
    console.log('rootValue: r %o', r)

    

    return await makeUserApiCall(token);
  }, 

};

const app = express();

// auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    console.error('authMiddleware: Error >> ')
    res.status(401).json({ //unauthorized token
      message: e.message
    })
  } else {
    console.log('authMiddleware: No error, have a token, setting request')
    res.locals.auth = {
      token, 
    };

    // console.log('authMiddleware: res.locals %o', res.locals);
    next();
  }
}

app.use(authMiddleware);

app.use(
  '/graphql', 
  graphqlHTTP(
    (res, req) => ({
      schema: schema,
      rootValue: rootValue,
      graphiql: true,
      // context: {
      //   token: res.locals.auth.token
      // }
    })
  )
);

app.listen(port);

console.log(`Running a GraphQL API server at localhost:${port}/graphql`);