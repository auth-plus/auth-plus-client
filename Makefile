.PHONY: clean/test
clean/test:
	sudo rm -rf coverage build .svelte-kit test-results results-e2e.xml

.PHONY: clean/node
clean/node:
	rm -rf node_modules
	rm package-lock.json

.PHONY: ci
ci:
	make clean/node
	make clean/test
	npm ci
	npm run build:check
	npm run test