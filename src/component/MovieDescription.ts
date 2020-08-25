import { MovieService } from '../service/MovieService.js';

export class MovieDescription{
    private movieService: MovieService;
    constructor() {
        this.movieService = MovieService.getInstance();

        document.addEventListener('click', () => this.bindEvents(event!));

        let closeDescription = <HTMLButtonElement>document.getElementById('hideDescription')!;
        closeDescription.addEventListener('click', function() {
            let movieDescriptionContainer = document.getElementById('movieDescriptionContainer')!;
            movieDescriptionContainer.remove();
            
            let movieDescription = <HTMLDivElement>document.getElementById('movieDescription')!;
            movieDescription.classList.add('d-none');
        });
    }

    private bindEvents(evt: Event) {
        let ele = <HTMLElement>evt.target;
        if(ele && ele.closest('.rating-value')) {
            this.updateRating(ele);
        }
        else if(ele && ele.closest('.movie')) {
            this.generateMovieDescriptionStructure(ele.closest('.movie')!);
        }
    }

    private updateRating(ele: HTMLElement) {
      
        let selectedRating = Number(ele.closest('.rating-value')!.getAttribute('value'));
        let movieId = Number(ele.closest('#movieDetails')!.getAttribute('movie-index'));
        this.movieService.addReview(movieId, selectedRating);
        
        let newRating = this.movieService.getReview(movieId);
        document.getElementById('ratingValue')!.innerHTML = newRating.toString();
        document.querySelector('[movie-id="'+movieId+'"]')! .getElementsByClassName('rating-value')[0].innerHTML = newRating.toString();
       
    }

    private generateMovieDescriptionStructure(movieElement: Element ) {
        
        console.log(this.movieService);
        let movieId = Number(movieElement.getAttribute('movie-id'));
        let movieDetails = this.movieService.getMovie(movieId);
        let movieRating = this.movieService.getReview(movieId);
        let movieDescription = <HTMLDivElement>document.getElementById('movieDescription')!;
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

        let element = <HTMLDivElement>document.createElement('div');
        element.classList.add('d-flex', 'justify-content-between');
        element.setAttribute('id', 'movieDescriptionContainer');
        element.innerHTML = structure;
        movieDescription.appendChild(element);     
        
    }
}