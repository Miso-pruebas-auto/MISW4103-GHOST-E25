#!/bin/bash

echo "Starting Ghost"
sleep 20

npm install
npx playwright install firefox
npx playwright install-deps firefox
# npx playwright test --workers=1
npx playwright test - 'user' --workers=1 --headed
npx playwright test -g 'Falla la creación de un post sin Autor' --workers=1 --headed
npx playwright show-report --host 0.0.0.0