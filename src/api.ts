import axios, { AxiosRequestConfig } from 'axios';

const movies = axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    params:{
        api_key:'bd87ff8d929ed7f2f13744c7415fc43a'
    }

})
movies.interceptors.request.use( (config:AxiosRequestConfig)  => {
    config.params = {
     api_key:'bd87ff8d929ed7f2f13744c7415fc43a',
      ...config.params,
    };
    return config;
  });


export const getMovies = (page:number,region:string) => {
    return movies.get('popular',{params:{page:page,region:region}})

}

export const getGenres = () => {
    return movies.get(`genre/movie/list`)
}


export const getUpcomingMovies = (page:number) => {
    return movies.get('upcoming',{params:{page:page,}})
}

export const getMovieDetails = (id:number) => {
    return movies.get(`${id}`)
}

export const getMovieVideos = (id:number) => {
    return movies.get(`${id}/videos`)
}


export const getCredits = (id:number) => {
    return movies.get(`${id}/credits`)
}

interface Idata {
    "release_date.gte"?: string,
    "release_date.lte"?: string,
    sortBy ?: string,
    with_people?: string,
    "runtume.gte" ?: number,
    "runtime.lte" ?:number,
    with_genres? : string,
}
export const movieDiscover = (page?:number,data?:Idata) => {
    console.log(data);
    return movies.get(`discover/movie`,{params:{...data,page}})
}