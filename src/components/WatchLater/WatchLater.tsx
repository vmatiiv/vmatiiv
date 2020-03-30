import React from 'react'

function WatchLater({movies,remove}:any) {
const list = movies.map((x:any) => <h4 onClick={()=>remove(x.id)} key={x.id}>{x.title}</h4> )
    return (
        <div>
            {list}
        </div>
    )
}

export default WatchLater
