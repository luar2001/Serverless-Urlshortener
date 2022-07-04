import type { AWS } from '@serverless/typescript';

import urlshortenerService from '@functions/urlshortenerService';
import shortenedUrlOpener from '@functions/shortenedUrlOpener';

const serverlessConfiguration: AWS = {
  service: 'urlshortener',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', "serverless-offline", 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",

          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
          ],
          Resource: "arn:aws:dynamodb:us-east-1:*:*",
        }],
      },
    },
  },
  // import the function via paths
  functions: {urlshortenerService, shortenedUrlOpener },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      TodosTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "UrlShortenerTable",
          AttributeDefinitions: [{
            AttributeName: "shortenedUrl",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "shortenedUrl",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },

        }
      }
    }
  }

};



module.exports = serverlessConfiguration;
