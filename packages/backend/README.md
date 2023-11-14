# klotti-backend

## Getting started

1. To setup, you'd need to install gcloud sdk through homebrew

   - By doing brew install --cask google-cloud-sdk

2. Obtain your own iam user key from the firebase-admin sdk by going through

   - `https://console.cloud.google.com/iam-admin/serviceaccounts/details/100646141339235926107/keys?authuser=0&project=klotti-app-dev`
   - From your json file, rename it to -> dev.json and add it into the root folder

## Reset DB

1. When setting up a new DB in your local env, you can use the following command to reset DB:

    - Modify .env.local file to point to your local DB
    - yarn prisma:local migrate reset
    - yarn prisma:local db push
    - yarn prisma:local db seed
