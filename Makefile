install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm run test

test-watch: 
	npm run test-watch

test-coverage: 
	npm run test -- --coverage --coverageProvider=v8

.PHONY: gendiff