window.onload = function () {
    fetch("http://127.0.0.1:3000/movies/") 
        .then(async (data) => {
            const response = await data.json();
            console.log({ response }) 
            const list = document.getElementById("movies-list");
    
            response.movies.forEach(movies => {
                const movieCard = document.createElement("div")
                movieCard.style.backgroundImage = `url(${movies.poster})`;
                movieCard.className = "movie-card"
                movieCard.onclick = function() {
                    const modal = document.getElementById("modal");
                    modal.style.visibility = "visible";
                    const modalContent = document.getElementById("modal-content");
                    modalContent.innerHTML = '';

                    const movieTitle = document.createTextNode(movies.title); 
                    const movieTitleElement = document.createElement("h1");
                    movieTitleElement.appendChild(movieTitle); 
                    modalContent.appendChild(movieTitleElement);

                    const movieYear = document.createTextNode(movies.year);
                    const movieYearElement = document.createElement("h4");
                    movieYearElement.appendChild(movieYear);
                    modalContent.appendChild(movieYearElement);
                        
                    const movieSynopsis = document.createTextNode(movies.synopsis);
                    const movieSynopsisElement = document.createElement("p");
                    movieSynopsisElement.appendChild(movieSynopsis);
                    modalContent.appendChild(movieSynopsisElement); 
            };       
            list.appendChild(movieCard)
        });

      })
      .catch((error) => {
        console.log({ error });
        alert("Erro ao carregar os filmes");
      });
};

function hideModal () {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}

function onSearch() {
    const searchValue = document.getElementById("search-input").value;
    const encodedSearchValue = encodeURIComponent(searchValue);
    fetch(`http://127.0.0.1:3000/movies/srch/${encodedSearchValue}`)
      .then(async (data) => {
        const response = await data.json();
        console.log({ response });
        const list = document.getElementById("movies-list");
        list.innerHTML = "";
      })
      .catch((error) => {
        alert("Falha ao realizar busca.");
      });
}

