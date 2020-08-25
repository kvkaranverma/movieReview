import { MovieData } from '../MovieData.js';
import { MovieType } from '../MovieType.js';

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
        if(!this.movieList[index].review) {
            this.movieList[index].review = [0, 0, 0, 0 ,0];
        }
        this.movieList[index].review![ratingIndex - 1]++;
    }

    getReview(index: number) {
        
        let rating = this.movieList[index].review;
        if(!rating)
            return 0;

        var sum = 0;
        var div = 0;
        for(var i = 0; i < 5; i++) {
            sum = sum+ (i+1)*rating![i];
            div = div+ rating![i]
        }
        
        let avgRating =  Number((sum/div).toFixed(1));
        
        if(isNaN(avgRating))
            avgRating = 0;
        
        return avgRating;
    }

    addMovie(newMovie: MovieType) {
        this.movieList.push(newMovie);
        return {
            newMovie: this.movieList[this.movieList.length - 1],
            movieId: this.movieList.length - 1
        };
    }
}
