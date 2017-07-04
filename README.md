# Chads Glass

[http://chads-glass.czaas.com/](http://chads-glass.czaas.com/)

Rebuilt this (old repos: [1](https://github.com/czaas/chad-www) [2](https://github.com/czaas/panacea-glass)) app using [hyperapp](https://github.com/hyperapp/hyperapp) which let me get away from complex structures when using react but still utilizing a virtual DOM and a simple API. 

This app pulls in the first 20 posts from Chads instagram page and displays them in a simple grid. The Modal will popup on click and allow you to browser through the individual posts.

Added inifinte scroll which does a check to make sure there are posts available to pull from and reaches out to instgram to get more if there are more, as well as a check when navigating through the popup modal. 

### Installation

```
npm install
```

### Start Dev Server 

```
npm run dev
```

### Build Prod Version

```
npm run build
```