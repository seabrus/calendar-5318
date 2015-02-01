# Datepicker That Doesn't Corrupt Your Data

##Prehistory
One day I needed a datepicker. My application was developed on a basis of jQuery and Bootstrap, so I looked for calendar widgets that worked under these frameworks. I tested two of such widgets and found that when initiating both of them corrupted my data (in "data-" attributes). So, I decided to develop a simple script that will be as tolerate to other code as possible.

##Calendar 5318
Calendar 5318 is that script. It's a simple datepicker and helps the user to choose a necessary date in a web form or elsewhere else on a web page.

The package includes the following files:
- index.html -- it illustrates how to add Calendar 5318 into HTML code and is the starting file for demo;
- css/*.css -- they define how the calendar looks. Please note that there are used such things as "calc", so for some browsers you have to modify this piece of CSS code (a possible solution is given as a comment);
- js/*.js -- code of the Calendar class and calendar event handlers.
 
In your HTML code don't forget to add the Bootstrap and jQuery files (see an example in index.html).

Try the demo [here](http://seabrus.github.io/calendar-5318/).
 




