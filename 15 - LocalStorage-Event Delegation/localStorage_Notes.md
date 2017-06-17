To view, type 'localStorage' in browser JavaScript console
localStorage
    An object in the browser which is a list of keys/values saved to the current domain
    Only by individual computer/website/browser basis
    Able to save text to the browser & have that text available even after page reload
    Where is this localStorage data?
        Goto Chrome Dev Tools-->Menu Bar-->Application-->Local Storage-->Click on working domain-->Key of items and Value of data
    To save DOM data into localStorage, simply 'set' the data
        .setItem
        .getItem
        .removeItem
        .deleteItem (double-check this one)
        Local Storage looks like an object but actually it is only a key/value store and can only use strings in localStorage



# Console Commands
localStorage
localStorage.items // shows data as string
localStorage.getItem('items')
    localStorage.items.toString() // shows same as localStorage.items

# Change to String or object
JSON.stringify(sumElement) // changes to a string
JSON.parse(sumElement) // changes to an object