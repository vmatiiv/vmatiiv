import React from 'react'
import {Link} from 'react-router-dom'

interface ILink {
    title:string,
    to:string
}

function NavHOC({title,to}:ILink) {
    const path = to === '/filters' ? '/watch-later' : '/filters'
    return <Link to={location =>  `${location.pathname === '/' || location.pathname === path ? to : '/'}` }>{title}</Link>
}

export default NavHOC
