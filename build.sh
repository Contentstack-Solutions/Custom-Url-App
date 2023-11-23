# build command format is
# bash build.sh

set -e
#The above command is to fail build if any one of the below build steps fail

rm -rf to-deploy
mkdir to-deploy

#UI Build
cd ui
rm -rf build
rm -rf node_modules
npm install
npm run build
zip -r ui.zip build/
mv ui.zip ../to-deploy
cd ..