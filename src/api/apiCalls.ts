/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "./apiClient";
import { IMovieCardInfo, IMovieDetails } from "./apiInterface";

async function getMovieList(page_no: number):Promise<any[]> {
   
        const raw = await apiClient.get('/movie/upcoming?page=' + page_no)
        const actualdata: IMovieCardInfo[] = raw.data.results
        console.log('search',actualdata);
        
        return actualdata

}

async function searchInMovieList(name:string,page_no: number,controller:AbortController) {
    try {
        const raw = await apiClient.get('/search/movie?query='+name+'&include_adult=false&page=' + page_no,{
            signal:controller.signal
        })
        const actualdata: IMovieCardInfo[] = raw.data.results
        return actualdata
    }
    catch (error) {
        return error
    }
}

async function getMovieDetail(id: string): Promise<IMovieDetails> {
 
        const baseurl = '/movie/' + id
        const movie_details: any = (await apiClient.get(baseurl)).data
        const credits: any = (await apiClient.get(baseurl + '/credits')).data
        console.log(credits);

        const crew: any = credits.crew
        const cast: any = credits.cast

        const rawdirectors: any[] = crew.filter((crew_member: any) => {
            if (crew_member.job === "Director") {
                return crew_member;
            }
        })

        const rawactingCasts: any[] = cast.filter((cast_member: any) => {
            if (cast_member.known_for_department === 'Acting') {
                return cast_member
            }
        })

        const directors: string[] = rawdirectors.map(director => director.name)
        const actingCasts: string[] = rawactingCasts.map((cast) => cast.name)


        console.log(directors, actingCasts);

        const formattedData = {
            imgPath: movie_details.poster_path,
            title: movie_details.title,
            rating: movie_details.vote_average,
            year: movie_details.release_date.split("-")[0],
            movie_length: movie_details.runtime,
            desc: movie_details.overview,
            directors: directors,
            cast: actingCasts
        }
        return formattedData
    

}


export { getMovieList,searchInMovieList, getMovieDetail }