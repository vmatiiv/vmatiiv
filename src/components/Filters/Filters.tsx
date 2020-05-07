import React, { useState } from 'react'
import Genres from './Genres'
import Button from '@material-ui/core/Button'
import SliderHOC from '../../HOC/SliderHOC';
import {Redirect} from 'react-router-dom'
import styled from 'styled-components';
interface Igenres  {
    id:number,
    name:string
}

interface IFilters {
    blocklist:Array<number>,
    setFilters:any,
    getMovieThunk:any,
    genres:Igenres,
    filters:any
}

const Wraper = styled.div`
    z-index:2;
    background-color:white;
    height:95vh;
    @media (max-width:500px){
      position:absolute;
      top:0;
      right:0;
      width:100vw;
  }
`

const Pad = styled.div`
    padding:1rem;
`
function Filters ({blocklist,filters,setFilters,getMovieThunk,genres}:IFilters) {
    
    const [submitted,setSubmitted] = useState(false)
    const onSubmit = (e:any) => {
        if(navigator.onLine) getMovieThunk(blocklist,1,filters);
        setSubmitted(true)
    }

    return (
        <Wraper>
            <Pad>
            {submitted && <Redirect to="/" />}
            <Genres filters={filters} setFilters={setFilters} genres={genres}/>
            <SliderHOC title={'Years Range'} slideProp={'years'} setFilters={setFilters} max={new Date().getFullYear()} min={1900} initialValue={[Math.min(...filters.years), Math.max(...filters.years)]}/>
            <SliderHOC  title={'Rate'} slideProp={'rate'} setFilters={setFilters} max={10} min={0} initialValue={filters.rate}/>
            <Button variant="contained" onClick={onSubmit}>Submit</Button>
            </Pad>
        </Wraper>
    )
}

export default Filters




