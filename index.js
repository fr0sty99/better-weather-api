require("dotenv").config();

import { ApolloServer } from "apollo-server";
import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server is running at ${url}! `);
});
