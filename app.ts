interface MovieType {
    name: string;
    coverImage: string;
    description: string;
    review: [number, number, number, number, number];
    comments: string[];
}

class MovieData {
    protected movieList: MovieType[] = [
        {
            name: 'The theory of everything',
            coverImage: 'abc.jpg',
            description: 'abc',
            review: [11, 2, 3, 4, 5],
            comments: ['sdbfdjf']
        },
        {
            name: 'The terminal',
            coverImage: 'abc.jpg',
            description: 'abc',
            review: [11, 32, 3, 4, 5],
            comments: ['sdbfdjf']
        },
        {
            name: 'Hobbs and Shaw',
            coverImage: 'download.jpg',
            description: 'abc',
            review: [11, 2, 33, 4, 5],
            comments: ['sdbfdjf']
        },
        {
            name: 'The Dark Knight',
            coverImage: 'download.jpg',
            description: 'abc',
            review: [11, 2, 3, 4, 500],
            comments: ['sdbfdjf']
        }

    ];
}

class Movie extends MovieData {

    getMovieList() {
        return this.movieList;
    }

    getMovie(index: number) {
        return this.movieList[index];
    }

    addReview(index: number, ratingIndex: number) {
        
        this.movieList[index].review[ratingIndex - 1]++;
    }

    getReview(index: number) {
        
        let rating = this.movieList[index].review;
        var sum = 0;
        var div = 0;
        for(var i = 0; i < 5; i++) {
            sum = sum+ (i+1)*rating[i];
        
            div = div+ rating[i]
            
        }
        
        let avgRating =  Number((sum/div).toFixed(1));
        
        if(isNaN(avgRating))
            avgRating = 0;
        
        return avgRating;
    }
}

class App {
    
    private movies: MovieType[] = [];
    private movie: Movie;
    constructor() {
        this.movie = new Movie();
        this.renderMovieList();
        this.eventBindings();
    }

    eventBindings() {
        let addMovie = document.getElementById('addMovie')!;
        addMovie.addEventListener('click', function() {
            let addMovieTemplate = document.getElementsByClassName('add-movie-template')[0];
            addMovieTemplate.classList.remove('d-none');
        });

        let closeMovieButton = document.getElementById('close-movie')!;
        closeMovieButton.addEventListener('click', function() {
            let addMovieTemplate = document.getElementsByClassName('add-movie-template')[0];
            addMovieTemplate.classList.add('d-none');
        });

        let closeDescription = document.getElementById('hideDescription')!;
        closeDescription.addEventListener('click', function() {
            let movieDescriptionContainer = document.getElementById('movieDescriptionContainer')!;
            movieDescriptionContainer.remove();
            
            let movieDescription = document.getElementById('movieDescription')!;
            movieDescription.classList.add('d-none');
        });

        let movieElements = document.querySelectorAll('.movie')!;
        movieElements.forEach((movie) => {
            movie.addEventListener('click', () => this.generateMovieDescriptionStructure(movie));
         });
      

        document.addEventListener('click', () => this.updateRating(event!));
        
    }

    private updateRating(evt: Event) {
        let ele = <HTMLElement>evt.target;
        if(ele && ele.closest('.rating-value')) {
            
            let selectedRating = Number(ele.closest('.rating-value')!.getAttribute('value'));
            let movieId = Number(ele.closest('#movieDetails')!.getAttribute('movie-index'));
            this.movie.addReview(movieId, selectedRating);
            
            let newRating = this.movie.getReview(movieId);
            document.getElementById('ratingValue')!.innerHTML = newRating.toString();
            document.querySelector('[movie-id="'+movieId+'"]')!.getElementsByClassName('rating-value')[0].innerHTML = newRating.toString();
        }
    }

    private renderMovieList() {
        this.movies = this.movie.getMovieList();
        let movieListContainer = document.getElementById('movieListContainer')!.getElementsByClassName('movie-list')[0]!;
        
        for(let counter = 0; counter < this.movies.length; counter++) {
            let movieRating = this.movie.getReview(counter);
            movieListContainer.appendChild(this.generateMovieListStructure(counter, this.movies[counter].name, this.movies[counter].coverImage, movieRating));
        }
        
        console.log(this.movies)
    }

    private generateMovieListStructure(movieId: number, movieName: string, image: string, rating: number) {
        let structure = `<a  class="movie" movie-id="${movieId}">
                            <div class="">
                                <img src="images/${image}">
                                <p>${movieName}</p>
                                <div class="d-flex">
                                    <p>Rating</p>
                                    <p class="rating-value">${rating}</p>
                                </div>
                            </div>
                        </a>`;
                    
        let element = document.createElement('li');
        element.classList.add('movie-article');
        element.innerHTML = structure;
        return element;
    }

    private generateMovieDescriptionStructure(movieElement: Element ) {
        
        console.log(this.movie);
        let movieId = Number(movieElement.getAttribute('movie-id'));
        let movieDetails = this.movie.getMovie(movieId);
        let movieRating = this.movie.getReview(movieId);
        let movieDescription = document.getElementById('movieDescription')!;
        movieDescription.classList.remove('d-none');
         
        
        let structure = `<div id="movieDetails" class=" w-50" movie-index="${movieId}">
                            <div id="movieName"><h2> ${movieDetails.name} </h2></div>
                            <div id="movieDetails"><p> ${movieDetails.description} </p></div>
                            <div id="movieRating" class="d-flex">
                                <p class="d-inline">Rating: <span id="ratingValue"> ${movieRating} </span></p>
                                <div id="rating" class="d-inline">
                                    <a class="rating-value" value="1"><i class="fa fa-star"></i></a>
                                    <a class="rating-value" value="2"><i class="fa fa-star"></i></a>
                                    <a class="rating-value" value="3"><i class="fa fa-star"></i></a>
                                    <a class="rating-value" value="4"><i class="fa fa-star"></i></a>
                                    <a class="rating-value" value="5"><i class="fa fa-star"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="movie-image  w-50 d-flex justify-content-end">
                            <img src="images/${movieDetails.coverImage}">
                        </div>`;

        let element = document.createElement('div');
        element.classList.add('d-flex', 'justify-content-between');
        element.setAttribute('id', 'movieDescriptionContainer');
        element.innerHTML = structure;
        movieDescription.appendChild(element);     
        
    }
}

const app = new App();
console.log('running');