# planets
Simple planet rendering using three.js

This project contains my attempt to solve an assignment from [this MOOC](https://www.futurelearn.com/courses/3d-graphics-web-programmers)
Additionally I wanted to try out webpack and github pages with this project..

## Development Setup

### Dependencies

* `npm install -g webpack webpack-dev-server`
* `npm install`

### Build

* `npm run dev` Creates a build in the `dist/` directory and runs the `webpack-dev-server`.
* `webpack` Creates a minified build in the `gh-pages/` directory.

(e.g. I  use `git worktree add gh-pages/ gh-pages` to check out the gh-pages branch into the `gh-pages/` directory. After running `webpack` I can
 simply `cd gh-pages` and then commit/push the build.)
