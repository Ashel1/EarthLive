var today = new Date();
var time = today.getHours()
var approx=(time/3);
approx = Math.round(approx);
approx = approx*3;
time = approx + ":00:00";
console.log(time)