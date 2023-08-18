interface IMovieCardInfo {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean
    vote_average: number,
    vote_count: number,
}
interface IMovieDetails{
    imgPath:string,
    title:string,
    rating:number,
    year:number,
    movie_length:number,
    desc:string,
    directors:string[],
    cast:string[]
}

export type{IMovieCardInfo,IMovieDetails}