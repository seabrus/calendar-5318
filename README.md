## calendar-5318 - 0.1.4 (07/2015)

In this calendar version event listeners on calendar images and calendar `divs` are added to the elements in the `this.each()` loop, rather than for general jQuery selections like `$(".calendar-img")`.

As a result, you can place calendars both on the page and modal dialogs which are opened and destroyed later and those modals would not add new event listeners to the calendars that already exist on the page. 
In other words, if you have several calendars on a page that are initialized by
```js
    $('input[type="date"]').calendar5318();
```
and then open a modal dialog with its own calendar on the `input[type="date"]` element (don't forget to restrict the jQuery selection by the modal dialog HTML nodes only), that new calendar initialization would NOT change a number of event listeners in the existing calendars and would not duplicate them.

##Wrapping `divs`
In this version the in-built wrapping `div` is flexible (responsive) rather than fixed. This could result in that for inline inputs the calendar icon could be placed out of the input. if this is the case, just add a wrapping `<div>` to the input with a width that is equal to the width of the input itself or/and with the style `display: inline-block`.

