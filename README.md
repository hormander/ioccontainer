IocContainer
-------------

This is a dependency injection module

## Install

```bash
npm install ioccontainer
```

## Introduction

## Example

Main file: hello-world.js

```hello-world.js
"use strict";

var ioc = require("ioccontainer");
ioc.initialize("/var/www/html/hello-world/ioc-config");

var hello = ioc.resolve("hello");
console.log(hello.getMessage());
```

Application context file: ioc-config.js

```ioc-config.js
{
	"bean" : [
		{ 
			"id": "hello", 
			"class": "/var/www/html/hello-world/hello",
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

## API

Example configuration file

```
{
	"bean" : [
		{ 
			"id": "js-class", 
			"class": "path/js-class",
			"init": "initialize",
			"set" : [
				{ "method": "setValue", "value": "My value" },
				{ "method": "setBean", "ref": "other" }
				] 
			}
	],
	{ "id": "other", "class": "path/other.js" }
}
```

For any javascript module declare a bean with:

### id 
unique id name

### class 
path of class

### initialize 
initialize method

### set 
"method": name of method for dependency injection,
using "value" for string or number or "bean" for other module declared in configuration file

## Contributors

- [Marco Murdocca aka `hormander`](https://github.com/hormander)
