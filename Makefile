# See https://github.com/jrburke/r.js/blob/master/build/example.build.js
JS_FILES = $(shell find -type f -name "*.js" | grep -v node_modules | grep -v vendor | grep -v main.min.js)

JS_BUILD_FILES = node_modules/almond/almond.js node_modules/requirejs/bin/r.js

main.min.js: $(JS_FILES) $(JS_BUILD_FILES) vendor/FileSaver.js
	./node_modules/requirejs/bin/r.js -o build.js

main: main.min.js

$(JS_BUILD_FILES): install

install: vendor/FileSaver.js
	npm install

vendor/FileSaver.js:
	wget "https://raw.githubusercontent.com/Teleborder/FileSaver.js/master/FileSaver.js" -O vendor/FileSaver.js

chkSyntax: node_modules/jshint/bin/jshint
	find -type f -regex .*js | grep -v node_modules | grep -v main.min.js | grep -v build.js | xargs ./node_modules/jshint/bin/jshint
