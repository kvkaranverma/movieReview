import { MovieData } from '../MovieData.js';

export class MovieService extends MovieData {

    private static instance: MovieService;

    private constructor() {
        super();
    }

    static getInstance() {
        if(MovieService.instance) {
            return MovieService.instance;
        }

        MovieService.instance = new MovieService();
        return MovieService.instance;
    }

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
