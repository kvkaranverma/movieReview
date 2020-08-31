import { MovieService } from '../service/MovieService.js';

export class MovieDescription{
    private movieService: MovieService;
    constructor() {
        this.movieService = MovieService.getInstance();

        document.addEventListener('click', () => this.bindEvents(event!));

    }

    private bindEvents(evt: Event) {
        const ele = evt.target as HTMLElement;
        if(ele && ele.closest('.rating-value')) {
            this.updateRating(ele);
        }
        else if(ele && ele.closest('.movie')) {
            this.generateMovieDescriptionStructure(ele.closest('.movie')!);
        }
        else if(ele && ele.closest('#hideDescription')) {
            let movieDescription = document.getElementById('movieDescriptionContainer')! as HTMLDivElement;
            movieDescription.remove();
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
        let movieDescription = document.getElementById('movieDetailsTemplate')! as HTMLDivElement;
       
        let structure = `
                            <span id="hideDescription">
                                <i class="cross-icon fa fa-times"></i>
                            </span>
        
                            <div class="movie-description-inner-container d-flex justify-content-between">
                                <div id="movieDetails" class=" w-50" movie-index="${movieId}">
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
                                </div>
                            </div>
                        `;

        let element = document.createElement('div') as HTMLDivElement;
        element.setAttribute('id', 'movieDescriptionContainer')
        element.innerHTML = structure;
        movieDescription.appendChild(element);     
        
    }
}