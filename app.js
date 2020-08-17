var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MovieData = /** @class */ (function () {
    function MovieData() {
        this.movieList = [
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
    return MovieData;
}());
var Movie = /** @class */ (function (_super) {
    __extends(Movie, _super);
    function Movie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Movie.prototype.getMovieList = function () {
        return this.movieList;
    };
    Movie.prototype.getMovie = function (index) {
        return this.movieList[index];
    };
    Movie.prototype.addReview = function (index, ratingIndex) {
        this.movieList[index].review[ratingIndex - 1]++;
    };
    Movie.prototype.getReview = function (index) {
        var rating = this.movieList[index].review;
        var sum = 0;
        var div = 0;
        for (var i = 0; i < 5; i++) {
            sum = sum + (i + 1) * rating[i];
            div = div + rating[i];
        }
        var avgRating = Number((sum / div).toFixed(1));
        if (isNaN(avgRating))
            avgRating = 0;
        return avgRating;
    };
    return Movie;
}(MovieData));
var App = /** @class */ (function () {
    function App() {
        this.movies = [];
        this.movie = new Movie();
        this.renderMovieList();
        this.eventBindings();
    }
    App.prototype.eventBindings = function () {
        var _this = this;
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
        movieElements.forEach(function (movie) {
            movie.addEventListener('click', function () { return _this.generateMovieDescriptionStructure(movie); });
        });
        document.addEventListener('click', function () { return _this.updateRating(event); });
    };
    App.prototype.updateRating = function (evt) {
        var ele = evt.target;
        if (ele && ele.closest('.rating-value')) {
            var selectedRating = Number(ele.closest('.rating-value').getAttribute('value'));
            var movieId = Number(ele.closest('#movieDetails').getAttribute('movie-index'));
            this.movie.addReview(movieId, selectedRating);
            var newRating = this.movie.getReview(movieId);
            document.getElementById('ratingValue').innerHTML = newRating.toString();
            document.querySelector('[movie-id="' + movieId + '"]').getElementsByClassName('rating-value')[0].innerHTML = newRating.toString();
        }
    };
    App.prototype.renderMovieList = function () {
        this.movies = this.movie.getMovieList();
        var movieListContainer = document.getElementById('movieListContainer').getElementsByClassName('movie-list')[0];
        for (var counter = 0; counter < this.movies.length; counter++) {
            var movieRating = this.movie.getReview(counter);
            movieListContainer.appendChild(this.generateMovieListStructure(counter, this.movies[counter].name, this.movies[counter].coverImage, movieRating));
        }
        console.log(this.movies);
    };
    App.prototype.generateMovieListStructure = function (movieId, movieName, image, rating) {
        var structure = "<a  class=\"movie\" movie-id=\"" + movieId + "\">\n                            <div class=\"\">\n                                <img src=\"images/" + image + "\">\n                                <p>" + movieName + "</p>\n                                <div class=\"d-flex\">\n                                    <p>Rating</p>\n                                    <p class=\"rating-value\">" + rating + "</p>\n                                </div>\n                            </div>\n                        </a>";
        var element = document.createElement('li');
        element.classList.add('movie-article');
        element.innerHTML = structure;
        return element;
    };
    App.prototype.generateMovieDescriptionStructure = function (movieElement) {
        console.log(this.movie);
        var movieId = Number(movieElement.getAttribute('movie-id'));
        var movieDetails = this.movie.getMovie(movieId);
        var movieRating = this.movie.getReview(movieId);
        var movieDescription = document.getElementById('movieDescription');
        movieDescription.classList.remove('d-none');
        var structure = "<div id=\"movieDetails\" class=\" w-50\" movie-index=\"" + movieId + "\">\n                            <div id=\"movieName\"><h2> " + movieDetails.name + " </h2></div>\n                            <div id=\"movieDetails\"><p> " + movieDetails.description + " </p></div>\n                            <div id=\"movieRating\" class=\"d-flex\">\n                                <p class=\"d-inline\">Rating: <span id=\"ratingValue\"> " + movieRating + " </span></p>\n                                <div id=\"rating\" class=\"d-inline\">\n                                    <a class=\"rating-value\" value=\"1\"><i class=\"fa fa-star\"></i></a>\n                                    <a class=\"rating-value\" value=\"2\"><i class=\"fa fa-star\"></i></a>\n                                    <a class=\"rating-value\" value=\"3\"><i class=\"fa fa-star\"></i></a>\n                                    <a class=\"rating-value\" value=\"4\"><i class=\"fa fa-star\"></i></a>\n                                    <a class=\"rating-value\" value=\"5\"><i class=\"fa fa-star\"></i></a>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"movie-image  w-50 d-flex justify-content-end\">\n                            <img src=\"images/" + movieDetails.coverImage + "\">\n                        </div>";
        var element = document.createElement('div');
        element.classList.add('d-flex', 'justify-content-between');
        element.setAttribute('id', 'movieDescriptionContainer');
        element.innerHTML = structure;
        movieDescription.appendChild(element);
    };
    return App;
}());
var app = new App();
console.log('running');
