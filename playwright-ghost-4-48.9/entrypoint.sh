#!/bin/bash
npm install
npx playwright install firefox
npx playwright install-deps firefox
npx playwright test --workers=1
npx playwright show-report --host 0.0.0.0