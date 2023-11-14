import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
const path = require('path');

const envName = process.env.NODE_ENV || 'development';
const dotEnvPath = path.resolve(__dirname, '../..', `.env.${envName}`);

dotenv.config({
  path: dotEnvPath
});

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_API,
  documents: [
    '.src/**/*{ts,tsx,graphql,gql}',
    './src/graphql/**/*{ts,tsx,graphql,gql}'
  ],
  generates: {
    './src/__graphql__/generated.ts': {
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
