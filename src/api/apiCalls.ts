import axios from "axios";
import apiClient from "./apiClient";
import { IMovieCardInfo } from "./apiInterface";

async function getMovieList(page_no:number){
 
    try{
        const raw=await apiClient.get('/movie/upcoming?page='+page_no)
        const actualdata:IMovieCardInfo[]=raw.data.results
        return actualdata
    }
    catch(error){
        return error
    }
}

async function getMovieDetail(id: string) {
    try{
        const baseurl='/movie/'+id
        const movie_details: any = (await apiClient.get(baseurl)).data
        
        const credits: any = (await apiClient.get(baseurl+'/credit')).data
        console.log(credits);
        

        // const directors = credits.crew.filter(({ job }) => job === 'Director')
        // const director = directors.length > 0 ? directors[0] : undefined
        // data.director = director !== undefined ? director.name : undefined
        // data.cast = credits.cast.map((person) => person.name)
        // return data
        const formattedData={
            title:movie_details.title,
            rating:movie_details.vote_average,
            year:movie_details.release_date.split("-")[0],
            movie_length:movie_details.runtime,
            desc:movie_details.overview,
            directors:[],
            cast:[]
        }
        return formattedData
    }
    catch(error){
        return error
    }
}

// export const searchMovie = async (name: string, page: number) => {
//     try {
//         const endpoint = `/search/movie?query=${name}&include_adult=false&page=${page}`
//         const response = await apiClient.get(endpoint)
//         const data: IMoviesData = response.data
//         return data
//     } catch (error: any) {
//         if (axios.isAxiosError(error)) {
//             return error.response
//         } else {
//             return error;
//         }
//     }
// }


export {getMovieList,getMovieDetail}