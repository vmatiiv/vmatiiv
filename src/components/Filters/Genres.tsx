import React, { useState,useEffect } from 'react'
import {Button } from '@material-ui/core';

function Genres({genres,filters,setFilters}:any) {
    const [ourGenres ,setOurGenres] = useState(filters.with_genres);
    const [allGenres,setAllGenres] = useState(genres.filter( (x:any) => ![...ourGenres.map( (x:any) => x.id)].includes(x.id)));

    const handleGenresClick = (id:number,name:string) => {
        setAllGenres(allGenres.filter((x:any) => x.id !== id))
        setOurGenres([...ourGenres,{id,name}]);
    }

    const handleOurGenresClick = (id:number,name:string) => {
        setOurGenres(ourGenres.filter((x:any) => x.id !== id))
        setAllGenres([...allGenres,{id,name}]);
    }

    useEffect(()=>{
        setFilters({
            with_genres:ourGenres
        })
    },[ourGenres])

    const checkboxes = allGenres.map((x:any) => 
        <Button variant="outlined" color="primary" key={x.id} onClick={()=>handleGenresClick(x.id,x.name)}>{x.name}</Button>)

    
    const our = !!ourGenres.length && ourGenres.map((x:any) => 
        <Button variant="contained" color="primary" key={x.id} onClick={()=>handleOurGenresClick(x.id,x.name)}>{x.name}</Button>)


    return (
        <div>
            <div>  
                {our}
            </div>

            <div>
                {checkboxes}
            </div>
        </div>
    )
}

export default Genres
