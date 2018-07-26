windChill();
function windChill(){
    var t = 78;
    var w = Math.pow(5, 0.16);
    var f = 35.74 + 0.6215 * t - 35.75 * w + 0.4275 * t * w; 
    
    document.getElementById('chilly').innerHTML = f;
}
