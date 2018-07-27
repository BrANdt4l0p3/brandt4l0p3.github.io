getFullDate();
function getFullDate() {
    var fullDate = theDay();    
    document.getElementById("currentdate").innerHTML = fullDate;
}

function theDay() {
    var d = new Date();
    d.getDate();
    return d;
}