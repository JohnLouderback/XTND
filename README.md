#XTND v0.1.0
##What Is XTND?
XTND (pronounced as "extend" or "ex-tee-en-dee") is a 2.8KB (1KB gzipped) extension for JavaScript. You can use it to safely extend built-in JS prototypes in your projects using namespaces.

```javascript
var arr = [
	[1,2],
    [3,4]
]

var newArr = arr.xtnd().joinChildArrays();

//newArr === [1,2,3,4]

```

##Isn't Extending Built-In Prototypes Bad?
It can be, if you're not careful. There in lies the point behind XTND. You can safely extend the built-in JS prototypes and XTND takes care of the implementation of the new methods so that nothing damaging or unexpected will occur. Best yet, you can control the logic to do this through configuration.

##Using XTND and XTND Plugins
If you're on the client side - include XTND and any XTND plugins in your HTML.
```html
<script src="js/xtnd.min.js"></script>
<script src="js/plugins/xtnd-xtnd.js"></script>
```
Next, initialize XTND before attempting to use it. You can also pass an object of options here as well.
```javascript
XTND();
```
Finally, use your plugins where ever you you.
```javascript
var arr = ["John", "Joe", "Bob"];

if (arr.xtnd().hasValue( "Joe" )) {
	console.log( "We have a Joe!" );
} else {
	console.log( "It's a no go on the Joe =(" )
}
```
You probably noticed the method **"xtnd"** used on our array in the example above. In XTND you use the name of the namespace to switch namespaces. So, when I want to use the **"xtnd"** namespace (**"xtnd"** is the default included plugin) I call the method **"xtnd"** to switch to it. Once you switch, the methods exist in the prototype until the next switch. This means that we can chain methods from that same namespace without calling the namespace method over and over again.


