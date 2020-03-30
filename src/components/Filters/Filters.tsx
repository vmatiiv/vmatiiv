import React, { useEffect, useState, useRef } from 'react'
import {getGenres} from '../../api';
import {Redirect} from 'react-router-dom'
import {movieDiscover} from '../../api'
interface Igenres  {
    id:number,
    name:string
}
interface IFilters {
    setFilters: any,
    filters:any
    genres: Array<Igenres>
}

function Filters ({filters,setFilters,genres,back}:any) {
    const [allGenres,setAllGenres] = useState(genres);

    const [ourGenres ,setOurGenres] = useState<Igenres[]>([]);
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        setFilters({
            with_genres:ourGenres
        })
        back();

    }

    const fetch = async () => {
        const a = await movieDiscover(1,filters)
        console.log(a)
    }

    const handleGenresClick = (id:number,name:string) => {
        setAllGenres(allGenres.filter((x:any) => x.id != id))
        setOurGenres([...ourGenres,{id,name}]);
    }

    const handleOurGenresClick = (id:number,name:string) => {
        setOurGenres(ourGenres.filter(x => x.id != id))
        setAllGenres([...allGenres,{id,name}]);
    }

    const checkboxes = allGenres.map((x:any) => 
        <button key={x.id} onClick={()=>handleGenresClick(x.id,x.name)}>{x.name}</button>)

    
    const our = !!ourGenres.length && ourGenres.map((x:any) => 
        <button key={x.id} onClick={()=>handleOurGenresClick(x.id,x.name)}>{x.name}</button>)

    return (<>
    <button onClick={fetch}>click</button>
        <form onSubmit={handleSubmit}>
            <label > Actors</label>
            <input type="text"  placeholder="e.g. Tom Hardy"/>
            <div>
                {our}
            </div>
            {checkboxes}
            
            <input type="submit" value="submit"/>
        </form>
        </>
    )
}

export default Filters





