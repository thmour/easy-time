Easy time
===========================

Tiny tool to deal with time conversions.

```js
require('easy-time')()
//default
expire_time  =  (5).minutes
expire_time  ==  5 //true
expire_time  === 5 //false
+expire_time === 5 //true

token = jwt.sign(user, secret, { expiresInMinutes: expire_time })
key = user.email + '_token'
redis.set(key, token)
redis.expires(key, expire_time.to_seconds)

//functional
timeout = to_milliseconds(minutes(2))
setTimeout(function () {
	console.log(to_seconds(timeout) + ' seconds have passed');
}, timeout);
```

To install with npm use:
```
$ npm install easy-time
```

Then import with:
> Node

```js
require('easy-time')(options)
//or
require('easy-time/functional')(options)
```

>Web

```html
<script id='easy-time' src="easy-time.web.min.js" table="msecs secs mins" singular="true"></script>
```

## Options

### Singular
- singular : `Boolean`
- default : `false`

Includes singular version of getters

##### Example:
```js
require('easy-time')({singular:true});

console.log((1).hour.to_seconds);
```
### Table
- table : `Array<String>`
- default : `['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'months', 'years']`

Include units starting from milliseconds going to the next unit each time.
Weeks, centuries and greater units than centuries are excluded by default.
You can give your own names if you find the originals redundant.

##### Example:
```js
require('easy-time')({table:['msec', 'sec', 'min']});

console.log(12..min.to_msec);
```