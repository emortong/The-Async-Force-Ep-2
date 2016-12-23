
var content = document.getElementById('contentContainer')

var dataRequested;
function myFunction(selTag) {
    dataRequested = selTag.options[selTag.selectedIndex].text;
    dataRequested = dataRequested.toLowerCase();

    if(dataRequested !== 'person') {
      dataRequested = dataRequested+'s';
    } else {
      dataRequested = 'people';
    }
}

function requestResource() {
  var id = document.getElementById('resourceId').value;
  console.log(dataRequested, id);

  var dataReq = new XMLHttpRequest();
  dataReq.addEventListener("load", dataReqListener);
  dataReq.open("GET", `http://swapi.co/api/${dataRequested}/${id}`);
  dataReq.send();



  function dataReqListener() {
    while (content.hasChildNodes()) {
    content.removeChild(content.lastChild);
    }

    if(this.status == 404) {
      var error = document.createElement('p');
      error.style.backgroundColor = 'red';
      content.appendChild(error);
      error.innerHTML = `ERROR: fetching resource http://swapi.co/api/${dataRequested}/${id} not found`;
      return false;
    }

    var data = JSON.parse(this.responseText);
    if(dataRequested === 'people') {
      var name = document.createElement('h2');
      name.innerHTML = data.name;
      content.appendChild(name);
      var gender = document.createElement('p');
      gender.innerHTML = data.gender
      content.appendChild(gender);

      var speciesReq = new XMLHttpRequest();
      speciesReq.addEventListener("load", speciesReqListener);
      speciesReq.open("GET", data.species[0]);
      speciesReq.send();


    } else if(dataRequested === 'planets') {
      var name = document.createElement('h2');
      name.innerHTML = data.name;
      content.appendChild(name);
      var terrain = document.createElement('p');
      terrain.innerHTML = data.terrain
      content.appendChild(terrain);
      var population = document.createElement('p');
      population.innerHTML = data.population
      content.appendChild(population);

    } else if(dataRequested === 'starships') {
      var name = document.createElement('h2');
      name.innerHTML = data.name;
      content.appendChild(name);
      var manufacturer = document.createElement('p');
      manufacturer.innerHTML = data.manufacturer
      content.appendChild(manufacturer);
      var starship_class = document.createElement('p');
      starship_class.innerHTML = data.starship_class
      content.appendChild(starship_class);
    }
  }


}

function speciesReqListener() {
  var speciesData = JSON.parse(this.responseText);
  var species = document.createElement('p');
  species.innerHTML = speciesData.name;
  content.appendChild(species);
}

