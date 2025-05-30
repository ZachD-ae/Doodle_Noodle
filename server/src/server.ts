import express from 'express';
import db from './config/connection.js';
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
    await db();

    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req }) => {
        // Get token from authorization header, e.g. "Bearer <token>"
        let token = req.headers.authorization || '';

        if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length); // remove "Bearer " prefix
        }

        // Pass token string to getUserFromToken
        const user = getUserFromToken(token);

        return { user };
        },
    }));

    app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

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