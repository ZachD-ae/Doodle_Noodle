import express from 'express';
import connectToDatabase from './config/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';

//import the apolloSever class
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

//import the two parts of a GraphQL schema
import { typeDefs, resolvers } from './schemas/index.js';
import { getUserFromToken } from './services/auth.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () => {
    await server.start();
    await connectToDatabase();

    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req }) => ({
            user: getUserFromToken(req),
          }),
    }));

    const clientDistPath = path.resolve(__dirname, '..', '..', 'client', 'dist');
    app.use(express.static(clientDistPath));

    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`🌍 Now listening on localhost:${PORT}`)
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
    });
};

//Call the async function to start the server
startApolloServer();