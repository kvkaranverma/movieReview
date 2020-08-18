import { MovieType } from '../MovieType.js';
import { MovieService } from '../service/MovieService.js';

export class MovieList {
    private movies: MovieType[] = [];
    private movieService: MovieService;

    constructor() {
        this.movieService = MovieService.getInstance();
        this.renderMovieList();
      
    }

    private renderMovieList() {
        this.movies = this.movieService.getMovieList();
        let movieListContainer = document.getElementById('movieListContainer')!.getElementsByClassName('movie-list')[0]!;
        
        for(let counter = 0; counter < this.movies.length; counter++) {
            let movieRating = this.movieService.getReview(counter);
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

    
}