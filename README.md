IocContainer
-------------

This is a dependency injection module

## Install

```bash
npm install ioccontainer
```

## Example

Main file: hello-world.js

```hello-world.js
"use strict";

var ioc = require("ioccontainer");
ioc.initialize("ioc-config.json");

var hello = ioc.resolve("hello");
console.log(hello.getMessage());
```

Application context file: ioc-config.js

```ioc-config.js
{
	"bean" : [
		{ 
			"id": "hello", 
			"class": "/path/hello.js",
			"init": "initialize",
			"set" : [
				{ "method": "setMessage", "value": "Hello world !!!!" }
				] 
			}
	]

}
```

Bean file: hello.js

```hello.js
"use strict";

var message;

var Hello = function() {
	message = "";
};

Hello.prototype.initialize = function() {
};

Hello.prototype.setMessage = function(value) {
	message = value;
};

Hello.prototype.getMessage = function() {
	return message;
};

module.exports = new Hello();
```

Run

```bash
node hello-world.js
```

## API

### initialize(path-of-configuration-file)
set path of configuration file

### resolve(id-class)
retrieve class specified with id set in configuration file

## Example configuration file

```
{
	"bean" : [
		{ "id": "require", "class": "npm_module" },
		{ "id": "other", "class": "other.js" },
		{ "id": "json", "class": "file.json" },
		{ 
			"id": "mymodule", 
			"class": "module.js",
			"init": "initialize",
			"set" : [
				{ "method": "setValue", "value": "My value" },
				{ "method": "setJSON", "ref": "json" },
				{ "method": "setRequire", "ref": "require" },
				{ "method": "setBean", "ref": "other" }
				] 
			}
	]
}
```

For any javascript module declare a bean with:

### id [required]
unique id name

### class [required]
path of class

### initialize [optional]
initialize method

### set [optional]
"method": name of method for dependency injection,
using "value" for string or number or "ref" for other module declared in configuration file

## Contributors

- [Marco Murdocca aka `hormander`](https://github.com/hormander)
