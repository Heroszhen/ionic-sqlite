#! /bin/bash
#build

# ionic build --prod
# ionic capacitor add android
# ionic capacitor open android

npm run build --prod
npx cap add android
npx cap open android