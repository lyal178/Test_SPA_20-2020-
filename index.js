import "./styles.css";

const myApi = "api_key=06bcdbfe4d279f8e51fbddf9d29d724c";
const searchButt = document.getElementById("button");
const searchString = document.getElementById("str");
const movieSearchable = document.querySelector("#movieSearchable");
const url = "https://api.themoviedb.org/3/search/movie?" + myApi;
const imageUrl = "https://image.tmdb.org/t/p/w500";

function resetInput() {
  searchString.value = "";
}

function takeMovies(data) {
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSearchable.appendChild(movieBlock);
  console.log(data);
}

function search() {
  while (movieSearchable.firstChild) {
    movieSearchable.removeChild(movieSearchable.firstChild);
  }
  var value;
  if (searchString !== "") {
    value = searchString.value;
    var newUrl;
  }
  if (value === "") {
    newUrl = trandingUrl;
  } else {
    newUrl = url + "&query=" + value;
  }
  fetch(newUrl)
    .then(res => res.json())
    .then(data => {
      takeMovies(data);
    })
    .catch(error => {
      console.log(error);
    });
  console.log(value);
  resetInput();
}

searchButt.onclick = search;

function movieSection(movies) {
  return movies.map(movie => {
    if (movie.poster_path) {
      return `  <div class = "imgcontainer">
      <img class = "images" src = ${imageUrl + movie.poster_path} 
      id = ${movie.id} height = 150px> 
    <h4>${movie.original_title}</h4> </div>`;
    }
  });
}

function createMovieContainer(movies) {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");
  const movieTemplate = `
  <section class = "section">
    ${movieSection(movies)}
  </section>
  `;
  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

const trandingUrl = "https://api.themoviedb.org/3/trending/movie/week?" + myApi;

document.onclick = function(event) {
  const target = event.target;

  if (target.tagName.toLowerCase() === "img") {
    while (movieSearchable.firstChild) {
      movieSearchable.removeChild(movieSearchable.firstChild);
    }
    console.log("Event: ", event);

    const movieId = target.id;

    console.log("targeted");

    Show_movie(movieId);

    console.log(movieId);
  }
};

fetch(trandingUrl)
  .then(res => res.json())
  .then(data => {
    takeMovies(data);
  });
function Get(Url) {
  let Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", Url, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function Show_movie(movieId) {
  while (movieSearchable.firstChild) {
    movieSearchable.removeChild(movieSearchable.firstChild);
  }
  let NewnewUrl = "https://api.themoviedb.org/3/movie/" + movieId + myApi;
  let json = JSON.parse(Get(NewnewUrl));

  let img = document.createElement("img");
  img.src = "https://image.tmdb.org/t/p/w500" + json.poster_path;
  movieSearchable.appendChild(img);

  let title = document.createElement("h1");
  title.innerHTML = json.original_title;
  movieSearchable.appendChild(title);

  let description = document.createTextNode(json.overview);
  movieSearchable.appendChild(description);

  let recomendations = document.createElement("h2");
  recomendations.innerHTML = "Recommendations";
  movieSearchable.appendChild(recomendations);

  let recomendUrl =
    "https://api.themoviedb.org/3/movie/" +
    movieId +
    "/recommendations?" +
    myApi;
  let json1 = JSON.parse(Get(recomendUrl));
  console.log(json1);
  var res = json1.results[0];
  var res2 = json1.results[1];
  var res3 = json1.results[2];
  const html = `
     <div>
     <img src = ${imageUrl + res.poster_path} id = ${res.id} height = 75px>
     <p style = font-size:15px>  ${res.title} </p> 
     <img src = ${imageUrl + res2.poster_path} id = ${res2.id} height = 75px>
     <p style = font-size:15px> ${res2.title} </p>
     <img src = ${imageUrl + res3.poster_path} id = ${res3.id} height = 75px>
     <p style = font-size:15px> ${res3.title} </p>
     </div>   
     `;
  recomendations.innerHTML += html;
}
