// import { join, resolve } from 'path';

import * as dotenv from 'dotenv'; // Load the environment variables
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-cloud-functions';

// import { loadSchemaSync } from '@graphql-tools/load';
// import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { rootTypeDefs, rootResolvers } from './schema';
import { prismaService } from './prisma';
import { authService } from './auth';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});

export type Context = {
  prisma: PrismaClient;
  userId: string | undefined;
};

// Sadly, with our nodejs 16, it wouldn't delete the previous cache https://github.com/GoogleCloudPlatform/buildpacks/issues/175#issuecomment-1030519240, until sometime

const server = new ApolloServer({
  typeDefs: rootTypeDefs,
  // typeDefs: loadSchemaSync(
  //   join(__dirname, '../../src/__generated__/schema.graphql'),
  //   {
  //     loaders: [new GraphQLFileLoader()]
  //   }
  // ),
  resolvers: rootResolvers,
  context: async ({
    req
  }: {
    req: Request;
    res: Response;
  }): Promise<Context> => {
    // @ts-ignore: TODO: fix types
    const token = req.headers.authorization;
    const validatedUser = await authService.validateUserTokenExist(token);

    return {
      userId: validatedUser?.id,
      prisma: prismaService.client
    };
  }
});

export const graphql = server.createHandler();
