import React from 'react'
import Genres from './Genres'
import Button from '@material-ui/core/Button'
import SliderHOC from '../../HOC/SliderHOC';

interface Igenres  {
    id:number,
    name:string
}
interface IFilters {
    setFilters: any,
    filters:any
    genres: Array<Igenres>
}

function Filters ({filters,setFilters,getMovieThunk,genres}:any) {
    const onSubmit = (e:any) => {
        getMovieThunk(1,filters);
    }


    return (
        <div>
            <Genres filters={filters} setFilters={setFilters} genres={genres}/>
            <SliderHOC title={'Years Range'} slideProp={'years'} setFilters={setFilters} max={new Date().getFullYear()} min={1900} initialValue={[Math.min(...filters.years), Math.max(...filters.years)]}/>
            <SliderHOC  title={'Rate'} slideProp={'rate'} setFilters={setFilters} max={10} min={0} initialValue={filters.rate}/>
            <Button variant="contained" onClick={onSubmit}>Submit</Button>
        </div>
    )
}

export default Filters




