export interface MovieType {
    name: string;
    coverImage: string;
    description: string;
    review: [number, number, number, number, number];
    comments: string[];
}