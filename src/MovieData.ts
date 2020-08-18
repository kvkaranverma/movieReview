import { MovieType } from './MovieType.js';

export class MovieData {
    protected movieList: MovieType[] = [
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