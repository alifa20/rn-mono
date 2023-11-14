import { GraphQLError } from 'graphql/error/GraphQLError';

export const throwUnAuthenticate = (msg: string) => {
  throw new GraphQLError(msg, {
    extensions: {
      code: 'UNAUTHENTICATED',
      status: 401
    }
  });
};

export const throwBadRequest = (msg: string) => {
  throw new GraphQLError(msg, {
    extensions: {
      code: 'BAD_REQUEST',
      status: 400
    }
  });
};

export const throwForbidden = (msg: string) => {
  throw new GraphQLError(msg, {
    extensions: {
      code: 'FORBIDDEN',
      status: 403
    }
  });
};
