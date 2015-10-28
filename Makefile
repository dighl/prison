# See https://github.com/jrburke/r.js/blob/master/build/example.build.js
JS_FILES = $(shell find -type f -name "*.js" | grep -v node_modules | grep -v vendor | grep -v main.min.js)

main.min.js: $(JS_FILES) node_modules/requirejs/bin/r.js vendor/FileSaver.js
	./node_modules/requirejs/bin/r.js -o build.js

main: main.min.js

node_modules/requirejs/bin/r.js: install
node_modules/jshint/bin/jshint: install

install: vendor/FileSaver.js
	npm install

vendor/FileSaver.js:
	wget "https://raw.githubusercontent.com/Teleborder/FileSaver.js/master/FileSaver.js" -O vendor/FileSaver.js

chkSyntax: node_modules/jshint/bin/jshint
	find -type f -regex .*js | grep -v node_modules | grep -v main.min.js | grep -v build.js | xargs ./node_modules/jshint/bin/jshint
