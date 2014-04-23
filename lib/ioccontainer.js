"use strict";

var fs = require("fs");
var path = require("path");
var root;

var IocContainer = function() {
  	this.subscriber = [];
};

IocContainer.prototype.initialize = function(value) {
	root = path.dirname(require.main.filename);

	if (fs.existsSync(path.resolve(value))) {
		value = path.resolve(value);
	} else if (fs.existsSync(root + "/" + value)) {
		value = root + "/" + value;
	} 
	var config = require(value);

	for(var i = 0; i < config.bean.length; i++) {
		this.register(config.bean[i]);
	}

	/*	
	console.log("IocContainer initialize");
	 */
};

IocContainer.prototype.register = function(value) {
	try {
		if (this.subscriber[value.id]) return;

		var o = {
			started: false,
			path: value.class,
			class: null,
			ref: value.set,
			initialize: value.init
		};
		this.subscriber[value.id] = o;		
	} catch (e) {
		console.log(e.message);
	}
};

IocContainer.prototype.injection = function(value) {
	if (value.ref) {
		var ref = value.ref;
		var obj = value.class;
		
		for (var i = 0; i < ref.length; i++) {
			var o = ref[i].bean ? this.resolve(ref[i].bean) : ref[i].value;
			if (typeof obj[ref[i].method] == "function") {
				obj[ref[i].method](o);
			} else {
				console.log(ref[i].bean + "::" + ref[i].method + " not found!");	
			}
		}
		
		if (value.initialize) {
			obj[value.initialize]();
		}
	}
};

IocContainer.prototype.resolve = function(name) {
	try {
		if (this.subscriber[name]) {			
			var o = this.subscriber[name];
			if (!o.started) {
				o.started = true;	
				
				var value;
				if (fs.existsSync(path.resolve(o.path))) {
					value = path.resolve(o.path);
				} else if (fs.existsSync(root + "/" + o.path)) {
					value = root + "/" + o.path;
				} else {
					value = o.path;
				}
				var r = require(value);
				o.class = r;
				
				this.injection(o);
			} 
			
			return o.class;
		}
		
		return null;

	} catch (e) {
		console.log(e.message);
	}	
};


module.exports = new IocContainer();
