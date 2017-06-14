By David Walsh
February 3, 2014

One of the biggest mistakes I see when looking to optimize existing code is the absence of the debounce function.  If your web app uses JavaScript to accomplish taxing tasks, a debounce function is essential to ensuring a given task doesn't fire so often that it bricks browser performance.

For those of you who don't know what a debounce function does, it limits the rate at which a function can fire. A quick example:  you have a resize listener on the window which does some element dimension calculations and (possibly)  repositions a few elements.  That isn't a heavy task in itself but being repeatedly fired after numerous resizes will really slow your site down.  Why not limit the rate at which the function can fire?

Here's the basic JavaScript debounce function (as taken from Underscore.js):

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
You'll pass the debounce function the function to execute and the fire rate limit in milliseconds.  Here's an example usage:

var myEfficientFn = debounce(function() {
	// All the taxing stuff you do
}, 250);

window.addEventListener('resize', myEfficientFn);
The function above will only fire once every quarter of a second instead of as quickly as it's triggered; an incredible performance boost in some cases.

I'm often asked what rate should be used when debouncing, and it's an impossible question to answer because it depends on the task.  The best way to know is testing different rates yourself and seeing where you notice a slowdown -- if you notice it, so will your users!

https://davidwalsh.name/javascript-debounce-function

# ------------------------------------------------------------------------------------------------------------

Demystifying Debounce in JavaScript
Posted: June 18, 2015
There are several situations in JavaScript where you want a function that is bound to an event to fire only once after a specific amount of time has passed. Functions bound to the resize and scroll events are the typical candidates. Invoking a function every time one of these events fires will significantly impact performance. Enter the JavaScript debounce function.

Debounce functions are included in many JavaScript libraries. The goal behind each implementation is to reduce overhead by preventing a function from being called several times in succession. Regardless of the library, all debounce functions are built on JavaScript’s native setTimeout function. Understanding specifically how they work can be difficult. While typically small in size, debounce functions take advantage of some pretty advanced JavaScript concepts like closures and execution queues.

Similar to my explanation of a jQuery plugin, I wrote a basic debounce function and littered it with code comments. I [try to] explain what each line of a JavaScript debounce function does. While it does require a basic understanding of scope, closures and setTimeout, hopefully it will help you to better understand how these concepts come together in a debounce function.

MDN has great documentation and examples for setTimeout. If you are unfamiliar with it, check out the MDN docs. Also, it may help to understand how JavaScript is compiled and executed (links to my post).

JavaScript Debounce Examples

The pen below shows the debounce function in action as a method on a custom object named JD. Included are two examples where functions are called that log my name to the console when the window is resized. The first function passed to the debounce method logs my last name. The second function uses the immediate argument in the debounce method and logs my first name.



WEBSITE : CODEPEN
https://codepen.io/johndugan/embed/BNwBWL?height=268&theme-id=16066&slug-hash=BNwBWL&default-tab=result&animations=run&editable=&embed-version=2&user=johndugan#result-box
Debounce in Action:
Click the Edit on CodePen link
Open the JavaScript Console
Resize the browser window



JavaScript Debounce Explanation

// Create JD Object
// ----------------
/*
    It's a good idea to attach helper methods like `debounce` to your own 
    custom object. That way, you don't pollute the global space by 
    attaching methods to the `window` object and potentially run in to
    conflicts.
*/
var JD = {};

// Debounce Method
// ---------------
/*
    Return a function, that, as long as it continues to be invoked, will
    not be triggered. The function will be called after it stops being 
    called for `wait` milliseconds. If `immediate` is passed, trigger the 
    function on the leading edge, instead of the trailing.
*/
JD.debounce = function(func, wait, immediate) {
    /*
        Declare a variable named `timeout` variable that we will later use 
        to store the *timeout ID returned by the `setTimeout` function.

        *When setTimeout is called, it retuns a numeric ID. This unique ID
        can be used in conjunction with JavaScript's `clearTimeout` method 
        to prevent the code passed in the first argument of the `setTimout`
        function from being called. Note, this prevention will only occur
        if `clearTimeout` is called before the specified number of 
        milliseconds passed in the second argument of setTimeout have been
        met.
    */
    var timeout;

    /*
        Return an anomymous function that has access to the `func`
        argument of our `debounce` method through the process of closure.
    */
    return function() {

        /*
            1) Assign `this` to a variable named `context` so that the 
               `func` argument passed to our `debounce` method can be 
               called in the proper context.

            2) Assign all *arugments passed in the `func` argument of our
               `debounce` method to a variable named `args`.

            *JavaScript natively makes all arguments passed to a function
            accessible inside of the function in an array-like variable 
            named `arguments`. Assinging `arguments` to `args` combines 
            all arguments passed in the `func` argument of our `debounce` 
            method in a single variable.
        */
        var context = this,   /* 1 */
            args = arguments; /* 2 */

        /*
            Assign an anonymous function to a variable named `later`.
            This function will be passed in the first argument of the
            `setTimeout` function below.
        */
        var later = function() {
            
            /*      
                When the `later` function is called, remove the numeric ID 
                that was assigned to it by the `setTimeout` function.

                Note, by the time the `later` function is called, the
                `setTimeout` function will have returned a numeric ID to 
                the `timeout` variable. That numeric ID is removed by 
                assiging `null` to `timeout`.
            */
            timeout = null;

            /*
                If the boolean value passed in the `immediate` argument 
                of our `debouce` method is falsy, then invoke the 
                function passed in the `func` argument of our `debouce`
                method using JavaScript's *`apply` method.

                *The `apply` method allows you to call a function in an
                explicit context. The first argument defines what `this`
                should be. The second argument is passed as an array 
                containing all the arguments that should be passed to 
                `func` when it is called. Previously, we assigned `this` 
                to the `context` variable, and we assigned all arguments 
                passed in `func` to the `args` variable.
            */
            if ( !immediate ) {
                func.apply(context, args);
            }
        };

        /*
            If the value passed in the `immediate` argument of our 
            `debounce` method is truthy and the value assigned to `timeout`
            is falsy, then assign `true` to the `callNow` variable.
            Otherwise, assign `false` to the `callNow` variable.
        */
        var callNow = immediate && !timeout;

        /*
            As long as the event that our `debounce` method is bound to is 
            still firing within the `wait` period, remove the numerical ID  
            (returned to the `timeout` vaiable by `setTimeout`) from 
            JavaScript's execution queue. This prevents the function passed 
            in the `setTimeout` function from being invoked.

            Remember, the `debounce` method is intended for use on events
            that rapidly fire, ie: a window resize or scroll. The *first* 
            time the event fires, the `timeout` variable has been declared, 
            but no value has been assigned to it - it is `undefined`. 
            Therefore, nothing is removed from JavaScript's execution queue 
            because nothing has been placed in the queue - there is nothing 
            to clear.

            Below, the `timeout` variable is assigned the numerical ID 
            returned by the `setTimeout` function. So long as *subsequent* 
            events are fired before the `wait` is met, `timeout` will be 
            cleared, resulting in the function passed in the `setTimeout` 
            function being removed from the execution queue. As soon as the 
            `wait` is met, the function passed in the `setTimeout` function 
            will execute.
        */
        clearTimeout(timeout);

        /*
            Assign a `setTimout` function to the `timeout` variable we 
            previously declared. Pass the function assigned to the `later` 
            variable to the `setTimeout` function, along with the numerical 
            value assigned to the `wait` argument in our `debounce` method. 
            If no value is passed to the `wait` argument in our `debounce` 
            method, pass a value of 200 milliseconds to the `setTimeout` 
            function.  
        */
        timeout = setTimeout(later, wait || 200);

        /*
            Typically, you want the function passed in the `func` argument
            of our `debounce` method to execute once *after* the `wait` 
            period has been met for the event that our `debounce` method is 
            bound to (the trailing side). However, if you want the function 
            to execute once *before* the event has finished (on the leading 
            side), you can pass `true` in the `immediate` argument of our 
            `debounce` method.

            If `true` is passed in the `immediate` argument of our 
            `debounce` method, the value assigned to the `callNow` variable 
            declared above will be `true` only after the *first* time the 
            event that our `debounce` method is bound to has fired.

            After the first time the event is fired, the `timeout` variable
            will contain a falsey value. Therfore, the result of the 
            expression that gets assigned to the `callNow` variable is 
            `true` and the function passed in the `func` argument of our
            `debounce` method is exected in the line of code below.

            Every subsequent time the event that our `debounce` method is 
            bound to fires within the `wait` period, the `timeout` variable 
            holds the numerical ID returned from the `setTimout` function 
            assigned to it when the previous event was fired, and the 
            `debounce` method was executed.

            This means that for all subsequent events within the `wait`
            period, the `timeout` variable holds a truthy value, and the
            result of the expression that gets assigned to the `callNow`
            variable is `false`. Therefore, the function passed in the 
            `func` argument of our `debounce` method will not be executed.  

            Lastly, when the `wait` period is met and the `later` function
            that is passed in the `setTimeout` function executes, the 
            result is that it just assigns `null` to the `timeout` 
            variable. The `func` argument passed in our `debounce` method 
            will not be executed because the `if` condition inside the 
            `later` function fails. 
        */
        if ( callNow ) { 
            func.apply(context, args);
        }
    };
};

https://codepen.io/johndugan/embed/BNwBWL?height=268&theme-id=16066&slug-hash=BNwBWL&default-tab=result&animations=run&editable=&embed-version=2&user=johndugan#result-box

https://github.com/johndugan/javascript-debounce

https://john-dugan.com/javascript-debounce/

















