import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : process.env.NODE_ENV === 'development'
      ? '.env.development'
      : '.env.local'
});

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_API,
  documents: ['./app/**/*{ts,tsx,graphql,gql}'],
  generates: {
    './app/__graphql__/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
        enumsAsConst: true,
        strictScalars: true,
        scalars: {
          DateTime: 'Date'
        }
      }
    }
  },
  hooks: {
    afterOneFileWrite: 'prettier --write'
  }
};

export default config;
