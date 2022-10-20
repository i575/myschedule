#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to https://<USERNAME>.github.io/<REPO>
 git push -f git@github.com:i575/myschedule.git master:gh-pages

cd -
