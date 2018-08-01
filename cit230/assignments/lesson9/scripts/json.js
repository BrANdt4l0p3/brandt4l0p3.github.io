var header = document.querySelector('header');
var section = document.querySelector('section');
var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    var cityInfo = request.response;
    
    doStuff(cityInfo);
}

function doStuff(jsonObj) {
    var towns = jsonObj['towns'];
    
    document.getElementById('nameOne').innerHTML = towns[0].name;
    document.getElementById('nameTwo').innerHTML = towns[1].name;
    document.getElementById('nameThree').innerHTML = towns[3].name;
    
    document.getElementById('mottoOne').innerHTML = towns[0].motto;
    document.getElementById('mottoTwo').innerHTML = towns[1].motto;
    document.getElementById('mottoThree').innerHTML = towns[3].motto;
    
    document.getElementById('yearOne').innerHTML = "Year founded: " + towns[0].yearFounded;
    document.getElementById('yearTwo').innerHTML = "Year founded: " + towns[1].yearFounded;
    document.getElementById('yearThree').innerHTML = "Year founded: " + towns[3].yearFounded;
    
    document.getElementById('popOne').innerHTML = "Curent population: " + towns[0].currentPopulation;
    document.getElementById('popTwo').innerHTML = "Curent population: " + towns[1].currentPopulation;
    document.getElementById('popThree').innerHTML = "Curent population: " + towns[3].currentPopulation;
    
    document.getElementById('rainOne').innerHTML = "Average rainfall: " + towns[0].averageRainfall + " In.";
    document.getElementById('rainTwo').innerHTML = "Average rainfall: " + towns[1].averageRainfall + " In.";
    document.getElementById('rainThree').innerHTML = "Average rainfall: " + towns[3].averageRainfall + " In.";
}
function populateHeader(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['squadName'];
    header.appendChild(myH1);
    var myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(myPara);
}

function showHeroes(jsonObj) {
    var heroes = jsonObj['members'];

    for (var i = 0; i < heroes.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myPara1 = document.createElement('p');
        var myPara2 = document.createElement('p');
        var myPara3 = document.createElement('p');
        var myList = document.createElement('ul');

        myH2.textContent = heroes[i].name;
        myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
        myPara2.textContent = 'Age: ' + heroes[i].age;
        myPara3.textContent = 'Superpowers:';

        var superPowers = heroes[i].powers;
        for (var j = 0; j < superPowers.length; j++) {
            var listItem = document.createElement('li');
            listItem.textContent = superPowers[j];
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);
        section.appendChild(myArticle);
    }
}