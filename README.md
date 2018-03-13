# jq-superlight
Its a super lightweight library, that simulates some basic functions of jQuery.

Supports IE10+  

This library was created to demonstrate how simple it is to replace jQuery without
long workarounds.

# API

## Basics

### Selectors

As in jQuery, its possible to select a set of DOM elements, using CSS3 compatible
css selectors.

#### Example

```
var body = $('body')
var someElements = $('ul.menu > li') // Jqsl {0: li, 1: li ... }
```

## Set methods

### .each(Function)

Loops over each item in the result set just like [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) does.

```
$('ul.menu > li').each(function (item) {
  // ... item is a DOM node
})
```

### .map(Function)

Similarly to the `.each()` method, this loops over a set of nodes, and returns an array of modifications.

```
var changes = $('ul.menu > li').each(function (item) {
  $(item).html('changing the content, because evil.')
})
```

### .slice([begin[, end]])

Returns a subset of matches, similarly to [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).


### .get([index])

Returns a single element at the provided index

## DOM manipulation

### .append(DOMNode|Jqsl)

Appends an element to the currently selected element.

```
$('body').append($('<div>Hello</div>'))
```

### .appendTo(DOMNode|Jqsl|String)

Appends the currently selected element to a target element.

```
$('<div>So fun!</div>').appendTo('body')
```

### .remove()

Removes a set of elements.

```
$('.to-be-removed').remove()
```

### .html(content)

Sets the html content of an element.

```
$('.an-element').html('this is a random <b>content</b>')
```

## Event handling

### .on

Registers an event listener to selected elements.

```
$('a').on('click', function () {
  alert('Alerts are going to be deprecated')
})
```

### .off

Removes listeners for an event from selected elements.


```
$('a').off('click')
```

### .trigger

Triggers event for selected elements.

```
$('a').trigger('click')
```
