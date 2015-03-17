test: node_modules
	@node_modules/.bin/mocha --require should -R spec

# After tests run this:
# kill $(ps aux | grep 'phantomjs' | awk '{print $2}')

node_modules: package.json
	@npm install

.PHONY: test