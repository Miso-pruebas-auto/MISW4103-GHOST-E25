#!/bin/bash
npm install
npx playwright install firefox
npx playwright install-deps firefox
npx playwright test 'user'
npx playwright test --trace on
npx playwright show-report --host 0.0.0.0