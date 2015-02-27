#What Is XTND?
XTND is a 2.8KB (1KB gzipped) library for JavaScript. You can use it to safely extend built-in JS prototypes using namespaces.

```javascript
var arr = [
	[1,2],
    [3,4]
]
var newArr = arr.xtnd().joinChildArrays();

//newArr === [1,2,3,4]

```
