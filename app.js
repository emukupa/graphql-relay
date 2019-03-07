import express from 'express';
import graphqlHTTP from 'express-graphql';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import schema from './graphql/schema';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({ origin: '*', credentials: true }));

const resolver = { hello: () => 'hello World' };
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
