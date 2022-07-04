# instructions to run the Urlshortener service

run: `serverless offline`

Api key will be in the console when running `serverless offline` 

Database is stored in memory and will be deleted on shutdown! 

I created the project using one of the base templates
`serverless create --template aws-nodejs-typescript`

I also added serverless offline so that one can call it from postman.

I used a file called envFilesSubstitute.ts under libs to store "environment variables" (ran out of time to find a better way)

I used npm to install serverless but yarn during the creation of the project so if you have a hard time starting it. try installing serverless globally with npm?

I ran out of time to also do the optional tasks, but I had a plan for them.  