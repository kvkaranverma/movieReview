var Movie = /** @class */ (function () {
    function Movie(name, coverImage, description, review, comments) {
        this.name = name;
        this.coverImage = coverImage;
        this.description = description;
        this.review = review;
        this.comments = comments;
    }
    return Movie;
}());
var MovieList = /** @class */ (function () {
    function MovieList() {
        this.movie = [
            new Movie('The theory of everything', 'abc.jpg', 'abc', [11, 2, 3, 4, 5], ['sdbfdjf']),
            new Movie('The terminal', 'download.jpg', 'download', [0, 0, 0, 0, 0], ['sdbfdjf']),
            new Movie('Hobbs and Shaw', 'abc.jpg', 'abc', [0, 0, 0, 0, 0], ['sdbfdjf']),
            new Movie('The theory of everything', 'abc.jpg', 'abc', [0, 0, 0, 0, 0], ['sdbfdjf']),
            new Movie('The terminal', 'download.jpg', 'download', [0, 0, 0, 0, 0], ['sdbfdjf']),
            new Movie('Hobbs and Shaw', 'abc.jpg', 'abc', [0, 0, 0, 0, 0], ['sdbfdjf']),
        ];
    }
    MovieList.prototype.getMovieList = function () {
        return this.movie;
    };
    MovieList.prototype.getMovie = function (index) {
        return this.movie[index];
    };
    MovieList.prototype.addReview = function (index, ratingIndex) {
        this.movie[index].review[ratingIndex - 1]++;
    };
    MovieList.prototype.getReview = function (index) {
        var rating = this.movie[index].review;
        var sum = 0;
        var div = 0;
        for (var i = 0; i < 5; i++) {
            sum = sum + (i + 1) * rating[i];
            div = div + rating[i];
        }
        rating = Number((sum / div).toFixed(1));
        if (isNaN(rating))
            rating = 0;
        return rating;
    };
    return MovieList;
}());
var App = /** @class */ (function () {
    function App() {
        this.renderMovieList();
        this.eventBindings();
    }
    App.prototype.eventBindings = function () {
        var addMovie = document.getElementById('addMovie');
        addMovie.addEventListener('click', function () {
            var addMovieTemplate = document.getElementsByClassName('add-movie-template')[0];
            addMovieTemplate.classList.remove('d-none');
        });
        var closeMovieButton = document.getElementById('close-movie');
        closeMovieButton.addEventListener('click', function () {
            var addMovieTemplate = document.getElementsByClassName('add-movie-template')[0];
            addMovieTemplate.classList.add('d-none');
        });
        var closeDescription = document.getElementById('hideDescription');
        closeDescription.addEventListener('click', function () {
            var movieDescriptionContainer = document.getElementById('movieDescriptionContainer');
            movieDescriptionContainer.remove();
            var movieDescription = document.getElementById('movieDescription');
            movieDescription.classList.add('d-none');
        });
        var movieElements = document.querySelectorAll('.movie');
        var _this = this;
        movieElements.forEach(function (movie) {
            movie.addEventListener('click', function () {
                console.log(movie);
                var movieId = Number(movie.getAttribute('movie-id'));
                var movieDetails = movieList.getMovie(movieId);
                var movieRating = movieList.getReview(movieId);
                var movieDescription = document.getElementById('movieDescription');
                movieDescription.classList.remove('d-none');
                movieDescription.appendChild(_this.generateMovieDescriptionStructure(movieId, movieDetails, movieRating));
            });
        });
        document.addEventListener('click', function (evt) {
            var ele = evt.target;
            if (ele && ele.closest('.rating-value')) {
                var selectedRating = Number(ele.closest('.rating-value').getAttribute('value'));
                var movieId = Number(ele.closest('#movieDetails').getAttribute('movie-index'));
                movieList.addReview(movieId, selectedRating);
                var newRating = movieList.getReview(movieId);
                document.getElementById('ratingValue').innerHTML = newRating.toString();
                document.querySelector('[movie-id="' + movieId + '"]').getElementsByClassName('rating-value')[0].innerHTML = newRating.toString();
            }
        });
    };
    App.prototype.renderMovieList = function () {
        this.movies = movieList.getMovieList();
        var movieListContainer = document.getElementById('movieListContainer').getElementsByClassName('movie-list')[0];
        for (var counter = 0; counter < this.movies.length; counter++) {
            var movieRating = movieList.getReview(counter);
            movieListContainer.appendChild(this.generateMovieListStructure(counter, this.movies[counter].name, this.movies[counter].coverImage, movieRating));
        }
        console.log(this.movies);
    };
    App.prototype.generateMovieListStructure = function (movieId, movieName, image, rating) {
        var structure = '<a  class="movie" movie-id="' + movieId + '">' +
            '<div class="">' +
            '<img src="images/' + image + '">' +
            '<p>' + movieName + '</p>' +
            '<div class="d-flex">' +
            '<p>Rating</p>' +
            '<p class="rating-value">' + rating + '</p>' +
            '</div>' +
            '</div>' +
            '</a>';
        var element = document.createElement('li');
        element.classList.add('movie-article');
        element.innerHTML = structure;
        return element;
    };
    App.prototype.generateMovieDescriptionStructure = function (movieId, movieDetails, movieRating) {
        var structure = '<div id="movieDetails" class=" w-50" movie-index = "' + movieId + '">' +
            '<div id="movieName"><h2>' + movieDetails.name + '</h2></div>' +
            '<div id="movieDetails"><p>' + movieDetails.description + '</p></div>' +
            '<div id="movieRating" class="d-flex">' +
            '<p class="d-inline">Rating: <span id="ratingValue">' + movieRating + '</span></p> ' +
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
            '<img src="images/' + movieDetails.coverImage + '">' +
            '</div>';
        var element = document.createElement('div');
        element.classList.add('d-flex', 'justify-content-between');
        element.setAttribute('id', 'movieDescriptionContainer');
        element.innerHTML = structure;
        return element;
    };
    return App;
}());
var movieList = new MovieList();
var a = new App();
console.log('running');
