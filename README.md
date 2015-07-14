## calendar-5318 - 0.1.4 (07/2015)

In this version event listeners on calendar images and calendar Divs are added to the elements in the "this.each()" loop, rather than for general jQuery selections like $('.calendar-img').

As a result, you can place calendars both on the page and modal dialogs which are opened and destroyed later without adding new event listeners to the calendars that already exist on the page. In other words, if you have several calendars on a page that are initialized by
```js
    $('input[type="date"]').calendar5318();
```
and then open a modal dialog with its own calendar on the `input[type="date"]` element, that new calendar initialization would NOT change anything in the existing calendars.

#Wrapping Divs
Sometimes the calendar icon could be placed out of the input. In this case just add a wrapping `<div>` to the input with width that is equal the width of the input itself.  

