

class Movie {

    constructor(public name: string, public coverImage: string,
        public description: string, public review: any, public comments: any) {
        
    }

}

class MovieList {
    private movie: Movie[] = [
        new Movie('The theory of everything', 'abc.jpg', 'abc', [11, 2, 3, 4, 5], ['sdbfdjf']),
        new Movie('The terminal', 'download.jpg', 'download', [0, 0, 0, 0, 0], ['sdbfdjf']),
        new Movie('Hobbs and Shaw', 'abc.jpg', 'abc', [0, 0, 0, 0, 0], ['sdbfdjf']),
        new Movie('The theory of everything', 'abc.jpg', 'abc', [0, 0, 0, 0, 0], ['sdbfdjf']),
        new Movie('The terminal', 'download.jpg', 'download', [0, 0, 0, 0, 0], ['sdbfdjf']),
        new Movie('Hobbs and Shaw', 'abc.jpg', 'abc', [0, 0, 0, 0, 0], ['sdbfdjf']),
    ];

    getMovieList() {
        return this.movie;
    }

    getMovie(index: number) {
        return this.movie[index];
    }

    addReview(index: number, ratingIndex: number) {
        
        this.movie[index].review[ratingIndex - 1]++;
    }

    getReview(index: number) {
        
        let rating = this.movie[index].review;
        var sum = 0;
        var div = 0;
        for(var i = 0; i < 5; i++) {
            sum = sum+ (i+1)*rating[i];
        
            div = div+ rating[i]
            
        }
        
        rating =  Number((sum/div).toFixed(1));
        
        if(isNaN(rating))
            rating = 0;
        
        return rating;
    }
}

class App {
    
    private movies: Movie[];
    constructor() {
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
        let _this: any = this;
        
        movieElements.forEach(function(movie) {
            movie.addEventListener('click', () => {
                
                console.log(movie);
                let movieId = Number(movie.getAttribute('movie-id'));
                let movieDetails = movieList.getMovie(movieId);
                let movieRating = movieList.getReview(movieId);
                let movieDescription = document.getElementById('movieDescription')!;
                movieDescription.classList.remove('d-none');
               
                movieDescription.appendChild(_this.generateMovieDescriptionStructure(movieId, movieDetails, movieRating));
            });
        });

        document.addEventListener('click', function(evt) {
            
            let ele = <HTMLElement>evt.target;
            if(ele && ele.closest('.rating-value')) {
                
                let selectedRating = Number(ele.closest('.rating-value')!.getAttribute('value'));
                let movieId = Number(ele.closest('#movieDetails')!.getAttribute('movie-index'));
                movieList.addReview(movieId, selectedRating);
                
                let newRating = movieList.getReview(movieId);
                document.getElementById('ratingValue')!.innerHTML = newRating.toString();
                document.querySelector('[movie-id="'+movieId+'"]')!.getElementsByClassName('rating-value')[0].innerHTML = newRating.toString();
            }
        });
        
    }

    renderMovieList() {
        this.movies = movieList.getMovieList();
        let movieListContainer = document.getElementById('movieListContainer')!.getElementsByClassName('movie-list')[0]!;
        
        for(let counter = 0; counter < this.movies.length; counter++) {
            let movieRating = movieList.getReview(counter);
            movieListContainer.appendChild(this.generateMovieListStructure(counter, this.movies[counter].name, this.movies[counter].coverImage, movieRating));
        }
        
        console.log(this.movies)
    }

    generateMovieListStructure(movieId: number, movieName: string, image: string, rating: string) {
        let structure = '<a  class="movie" movie-id="'+ movieId +'">' +
                            '<div class="">' +
                                '<img src="images/'+ image +'">' +
                                '<p>'+ movieName +'</p>' +
                                '<div class="d-flex">' +
                                    '<p>Rating</p>' +
                                    '<p class="rating-value">'+ rating +'</p>'+
                                '</div>'+
                            '</div>'+
                        '</a>';
                    
        let element = document.createElement('li');
        element.classList.add('movie-article');
        element.innerHTML = structure;
        return element;
    }

    generateMovieDescriptionStructure(movieId: number, movieDetails: Movie, movieRating: number) {
        let structure = '<div id="movieDetails" class=" w-50" movie-index = "'+ movieId +'">' +
                            '<div id="movieName"><h2>'+ movieDetails.name +'</h2></div>' +
                            '<div id="movieDetails"><p>'+ movieDetails.description +'</p></div>' +
                            '<div id="movieRating" class="d-flex">' +
                                '<p class="d-inline">Rating: <span id="ratingValue">'+ movieRating +'</span></p> '+
                                '<div id="rating" class="d-inline">' +
                                    '<a class="rating-value" value="1"><i class="fa fa-star"></i></a>' +
                                    '<a class="rating-value" value="2"><i class="fa fa-star"></i></a>' +
                                    '<a class="rating-value" value="3"><i class="fa fa-star"></i></a>' +
                                    '<a class="rating-value" value="4"><i class="fa fa-star"></i></a>' +
                                    '<a class="rating-value" value="5"><i class="fa fa-star"></i></a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="movie-image  w-50 d-flex justify-content-end">' +
                            '<img src="images/'+ movieDetails.coverImage +'">' +
                        '</div>';

        let element = document.createElement('div');
        element.classList.add('d-flex', 'justify-content-between');
        element.setAttribute('id', 'movieDescriptionContainer');
        element.innerHTML = structure;
        return element;          
    }
}

let movieList = new MovieList();
const a = new App();
console.log('running')