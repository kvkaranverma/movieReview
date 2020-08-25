import { MovieService } from '../service/MovieService.js';
import { MovieList } from './MovieList.js';

export class MovieInput {
    private movieService: MovieService;

    constructor() {
        this.movieService = MovieService.getInstance();

        let addMovie = <HTMLButtonElement>document.getElementById('addMovie')!;
        addMovie.addEventListener('click', function() {
            let addMovieTemplate = document.getElementsByClassName('add-movie-template')[0];
            addMovieTemplate.classList.remove('d-none');
        });

        let closeMovieButton = <HTMLButtonElement>document.getElementById('close-movie')!;
        closeMovieButton.addEventListener('click', function() {
            let addMovieTemplate = document.getElementsByClassName('add-movie-template')[0];
            addMovieTemplate.classList.add('d-none');
        });
        
        let submitMovie = <HTMLFormElement>document.getElementById('movieForm')!;
        submitMovie.addEventListener('submit', () => this.addNewMovie(event!, submitMovie));
    }

    private addNewMovie(event: Event, submitMovie: HTMLFormElement) {
        event.preventDefault();
        let name: string = (<HTMLInputElement>submitMovie.elements.namedItem('movieName'))!.value;
        
        let coverImage: string = (<HTMLInputElement>submitMovie.elements.namedItem('coverImage'))!.value;
        let description: string = (<HTMLInputElement>submitMovie.elements.namedItem('description'))!.value;
        console.log(name, coverImage, description);
        coverImage = "abc.jpg";
        let movie = this.movieService.addMovie({name, coverImage, description});
        MovieList.renderNewelyAddedMovie(movie.newMovie, movie.movieId);
    }
}