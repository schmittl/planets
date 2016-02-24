# planets
Simple planet rendering using three.js

This project contains my attempt to solve an assignment from [this MOOC](https://www.futurelearn.com/courses/3d-graphics-web-programmers)
Additionally I wanted to further explore the three.js API and try out webpack, github pages, ES6 etc...
Thus the code is very messy, don't judge.

## Development Setup

### Dependencies

* `npm install -g webpack webpack-dev-server` (optional?)
* `npm install`

### Build

* `npm run dev` Runs `webpack-dev-server`.
* `npm run build` Runs `webpack` to create a minified build in the `gh-pages/` directory.

(e.g. I  use `git worktree add gh-pages/ gh-pages` to check out the gh-pages branch into the `gh-pages/` directory. After running `webpack` I can
 simply `cd gh-pages` and then commit/push the build.)
