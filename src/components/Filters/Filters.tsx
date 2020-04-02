import React from 'react'
import Slid from './Slid'
import Rate from './Rate';
import Genres from './Genres'
import Button from '@material-ui/core/Button'

interface Igenres  {
    id:number,
    name:string
}
interface IFilters {
    setFilters: any,
    filters:any
    genres: Array<Igenres>
}

function Filters ({filters,setFilters,getMovieThunk,genres,back}:any) {

    const onSubmit = (e:any) => {
        getMovieThunk(1,filters);
        back();
    }


    return (
        <div>

            <Genres filters={filters} setFilters={setFilters} genres={genres}/>
            <Slid filters={filters} setFilters={setFilters}/>
            <Rate filters={filters} setFilters={setFilters}/>
            <Button variant="contained" onClick={onSubmit}>Submit</Button>
        </div>
    )
}

export default Filters




