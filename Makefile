# See https://github.com/jrburke/r.js/blob/master/build/example.build.js
JS_FILES = $(shell find -type f -name "*.js" | grep -v node_modules | grep -v main.min.js)

main.min.js: $(JS_FILES) node_modules/requirejs/bin/r.js
	./node_modules/requirejs/bin/r.js -o build.js

main: main.min.js

node_modules/requirejs/bin/r.js: install
node_modules/jshint/bin/jshint: install

install:
	npm install

chkSyntax: node_modules/jshint/bin/jshint
	find -type f -regex .*js | grep -v node_modules | grep -v main.min.js | grep -v build.js | xargs ./node_modules/jshint/bin/jshint
