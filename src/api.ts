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
    return movies.get(`movie/${id}`)
}

export const getMovieVideos = (id:number) => {
    return movies.get(`movie/${id}/videos`)
}


export const getCredits = (id:number) => {
    return movies.get(`movie/${id}/credits`)
}

interface Idata {
    years: [],
    rate:number
    with_genres? : any,
}

export const movieDiscover = (page?:number,data?:Idata) => {
    const dateGte = (data && data.years && Math.min(...data.years)+'-01-01' );
    const dateLte = (data && data.years && Math.max(...data.years)+'-12-31' );
    const rate = (data && data.rate );
    const with_genres =  (data && data.with_genres && data?.with_genres.map( (x:any) => x.id).join(',')) || ''
    return movies.get(`discover/movie`,{params:
        {...data,
            page,
            with_genres,
            "primary_release_date.gte": dateGte,
            "primary_release_date.lte": dateLte,
            "vote_average.gte": rate,
            "sort_by":"popularity.desc"
        }})
}