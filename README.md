# Calendar 5318
#### Datepicker That Doesn't Corrupt Your Data

###Demo
Try the demo [here](http://seabrus.github.io/calendar-5318/).

###Prehistory
One day I needed a datepicker. My application was developed on a basis of jQuery and Bootstrap, so I looked for calendar widgets that worked under these frameworks. I tested two of such widgets and found that when initiating both of them corrupted my data (in "data-" attributes). So, I decided to develop a simple script that will be as tolerate to other code as possible.

###Calendar 5318
Calendar 5318 is that script. It's a simple datepicker and helps the user to choose a necessary date in a web form or elsewhere else on a web page.

The package includes the following files:
- js/*.js -- code of the Calendar class and calendar event handlers;
- index.html -- it explains how to add Calendar 5318 into HTML code and is the starting file for demo;
- css/*.css -- they define how the calendar looks. Please note that there are used such things as "calc", so for some browsers you have to modify this piece of CSS code (a possible solution is given as a comment). Feel free to change this code as you like.

In your HTML code don't forget to add links to the jQuery and Bootstrap files (see an example in index.html).

### Class vs. Widget

This question is not about what is better. It's about why the _master_ branch contains a version on a basis of a class, while the _widget_ version is given only in the [widget](https://github.com/seabrus/calendar-5318/tree/widget) branch. The reason is explained in the prehistory: I wanted to make it as customizable as possible and gave the maximum degree of freedom for users. Therefore, the critical part of the package code -- the calendar calculation and main event handlers -- is developed as a separate class, so you should not bother about those details. All other code (.html, .css, and .js) is just to illustrate the idea and help you to understand how to use this class. So you can change that part of the package as you like.

On the other hand, if you prefer to use Calendar 5318 as a widget, just go the the [widget](https://github.com/seabrus/calendar-5318/tree/widget) branch. In that version all initiation is given in one line of code, for example:
```js
    $('input[type="text"]').calendar5318();
```

### License
MIT
