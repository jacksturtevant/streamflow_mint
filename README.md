# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the Project

### Running Locally

First, download the repository and run `yarn install`.
From here, you will need to path a small bug between `cipher` and `create-react-app`.
In `node_modules/cipher-base/package.json`, add these lines to the end of the JSON. This will prevent annoying, non-breaking typescript errors from popping up.

```
  "browser": {
    "stream": false
  }
```

From here, you should be able to start the project with `yarn start`, which will open this project on `localhost:3000`.

### Testing Locally

Simply run `npm test` to run the test suite in `App.test.tsx`.

## Key Decisions

Most of the key decisions outlined below boil down to making a working project in the given timeframe.
With each decision, I outline why I decided to do this, and what I would have done given infinite time.

### Token List Intructions
Unfortunately, given how Solana handles adding new tokens to their registry, it is impossible to add purely through the UI. 
That is, unless you want huge security vulnerabilities in your app.
To be able to (potentially) do this, you would need to grant the FE app permission to edit local files, which is something you never want to do.
This is because you need to 
- fork then clone the token list repo
- copy in your new token logo asset
- modify the token list json

Even if there was a way to do this in Javascript (I found none), I would not do that. 
Either, you would subject your app to security vulnerabilties by creating and modifying files in the app, or subject the user to the same problem by directly modifying their files.

So, I decided to keep the actual listing functionality outside of the app, and instead walk the user through the exact steps for listing the token. 
The most difficult part, modifying the token list and pushing this code, is all handled automatically in the script generated for the user. 
I feel this solution is satisfactory. 
Especially given that DexLab's token mint assumes the use has already created and submitted this PR, with no instructions to help the user.