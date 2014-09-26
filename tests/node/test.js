var DateTimeFormat = require('../../');
var GregorianCalendar = require('gregorian-calendar');
var gregorianCalendar = new GregorianCalendar(2013,
    GregorianCalendar.JULY, 9);
var df = new DateTimeFormat('yyyy-MM-dd');
console.log(df.format(gregorianCalendar));
df = new DateTimeFormat('yy-MM-dd');
console.log(df.format(gregorianCalendar));