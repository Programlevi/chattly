const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const userService = require("./Services/userService");
const dataLoaders = require("./graphql/dataLoaders");

const app = express();

app.enable("trust proxy");

// app.use(cors());
// app.options('*', cors());

app.use(cookieParser());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: async connectionParams => {
      const user = await userService.verifyUser(connectionParams.token);
      if (!user) {
        throw new AuthenticationError("Please login again");
      }
      return {
        user,
      };
    },
  },
  context: async ({ req, res, connection }) => {
    let context = {
      loaders: {
        messageAuthorLoader: dataLoaders.messageAuthorLoader(),
      },
    };

    if (connection) {
      context = { ...context, user: connection.context.user };
    } else {
      const user = await userService.verifyUser(req.cookies.jwt);
      context = { ...context, req, res, user };
    }

    return context;
  },
  formatError(err) {
    console.log(err.extensions);
    return err;
  },
});

apolloServer.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: "https://chattly.netlify.app/",
  },
});

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

module.exports = { httpServer, apolloServer };
