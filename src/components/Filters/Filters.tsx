import React, { useState } from 'react'
import Genres from './Genres'
import Button from '@material-ui/core/Button'
import SliderHOC from '../../HOC/SliderHOC';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import styled from 'styled-components';
import { Navigation } from '../../styles';
interface Igenres  {
    id:number,
    name:string
}

interface IFilters {
    blocklist:Array<number>,
    setClear:any,
    setFilters:any,
    getMovieThunk:any,
    genres:Igenres,
    filters:any,
}

const Wraper = styled.div`
    z-index:2;
    order:3;
    background-color:white;
    width:50%;
    height:95vh;
    @media (max-width:${props => props.theme.media.md}){
        background-color: ${props => props.theme.colors.mainBackground};
      width:100vw;
        height:100vh;
   }
`

const Pad = styled.div`
    padding:1rem 0.5rem;
`
function Filters ({blocklist,setClear,filters,setFilters,getMovieThunk,genres}:IFilters) {
    
    const [submitted,setSubmitted] = useState(false)
    const onSubmit = (e:any) => {
        if(navigator.onLine) getMovieThunk(blocklist,1,filters);
        setSubmitted(true)
        try{
            setClear("-100vw");
        }catch{}
    }

    return (
        <Wraper>
            <Navigation>
                <ViewCarouselIcon onClick={()=>setClear("-100vw")}/>
            </Navigation>
            <Pad>
                <Genres filters={filters} setFilters={setFilters} genres={genres}/>
                <SliderHOC title={'Years Range'} slideProp={'years'} setFilters={setFilters} max={new Date().getFullYear()} min={1900} initialValue={[Math.min(...filters.years), Math.max(...filters.years)]}/>
                <SliderHOC  title={'Rate'} slideProp={'rate'} setFilters={setFilters} max={10} min={0} initialValue={filters.rate}/>
                <Button variant="contained" onClick={onSubmit}>Submit</Button>
            </Pad>
        </Wraper>
    )
}

export default Filters




