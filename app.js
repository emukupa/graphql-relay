import express from 'express';
import graphqlHTTP from 'express-graphql';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import schema from './graphql/schema';
import { Friend, storage } from './in-memory-storage';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: '*', credentials: true }));

const resolver = {
  getFriends: async () => {
    const friendsObj = await storage.friends;
    const listOfFriends = await Object.keys(friendsObj).map(
      id => new Friend(id, friendsObj[id])
    );
    return listOfFriends;
  },
  getFriend: async ({ id }) => {
    return await new Friend(id, storage.friends[id]);
  },
  createFriend: async ({ input }) => {
    let id = require('crypto')
      .randomBytes(10)
      .toString('hex');
    storage.friends[id] = input;

    return await new Friend(id, input);
  },
  updateFriend: async ({ id, input }) => {
    storage.friends[id] = await { ...storage.friends[id], ...input };
    return await new Friend(id, input);
  },
  deleteFriend: async ({ id }) => {
    delete storage.friends[id];
    return true;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  })
);
routes(app);
export default app;
