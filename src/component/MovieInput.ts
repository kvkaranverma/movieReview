export class MovieInput {
    constructor() {
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
    }
}