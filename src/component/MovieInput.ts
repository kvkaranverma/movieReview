import { MovieService } from '../service/MovieService.js';
import { MovieList } from './MovieList.js';

export class MovieInput {
    private movieService: MovieService;

    constructor() {
        this.movieService = MovieService.getInstance();

        let addMovie = <HTMLButtonElement>document.getElementById('addMovie')!;
        addMovie.addEventListener('click', () =>  {
            addMovie.setAttribute('disabled', 'true');
            this.prepareFormStructure();
        });
        
        document.addEventListener('click', () => this.addEvents(event!));
    }

    private addEvents(evt: Event) {
        let ele = evt.target as HTMLElement;
        let addMovie = document.getElementById('addMovie')! as HTMLButtonElement;
        if(ele && ele.closest('#closeMovie')) {
            ele.closest('.add-movie-template')!.remove();
            addMovie.removeAttribute('disabled');
        }
        else if(ele && ele.closest('#submitMovie')) {
            let submitMovie = document.getElementById('movieForm')! as HTMLFormElement;
            submitMovie.addEventListener('submit', (event) => {
                event.preventDefault();
                this.addNewMovie(event, submitMovie);
                ele.closest('.add-movie-template')!.remove();
                addMovie.removeAttribute('disabled');
            });
        }
    }

    private addNewMovie(event: Event, submitMovie: HTMLFormElement) {
        event.preventDefault();
        let name: string = (submitMovie.elements.namedItem('movieName')! as HTMLInputElement).value;
        
        let coverImage: string = (submitMovie.elements.namedItem('coverImage')! as HTMLInputElement).value;
        let description: string = (submitMovie.elements.namedItem('description')! as HTMLInputElement).value;
        console.log(name, coverImage, description);
        coverImage = "abc.jpg";
        let movie = this.movieService.addMovie({name, coverImage, description});
        MovieList.renderNewelyAddedMovie(movie.newMovie, movie.movieId);
    }

    private prepareFormStructure() {
        let structure = `<form id="movieForm">
                                <span id="closeMovie">Close</span>
                                <div class="form-group d-inline">
                                    <label>Name</label>
                                    <input type="text" name="movieName" class="form-control">
                                </div>
                                <div class="form-group d-inline">
                                    <label>Cover Image</label>
                                    <input type="text" name="coverImage" class="form-control">
                                </div>
                                <div class="form-group d-inline">
                                    <label>Description</label>
                                    <textarea name="description" rows="5" class="form-control"></textarea>
                                </div>
                                <input type="submit" id="submitMovie" class="btn btn-success mt-3">
                            </form>`;
                        

        let element = document.createElement('div');
        element.classList.add('add-movie-template', 'w-auto');
        element.innerHTML = structure;

        let movieTemplate = document.getElementById('addMovieForm');
        movieTemplate!.appendChild(element as HTMLElement);
    }
}