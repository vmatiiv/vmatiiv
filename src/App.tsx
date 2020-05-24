import React, {   useEffect, useState} from 'react';
import WatchLater from './components/WatchLater/WatchLaterContainer'
import FiltersContainer from './components/Filters/FiltersContainer'
import MovieCardContainer from './components/MovieCard/MovieListContainer'
import {useSpring} from 'react-spring'
import styled from 'styled-components';
import {AsideContant,MobileView} from './animations'
import { Navigation } from './styles';
import ListIcon from '@material-ui/icons/List';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';

const Navigationn = styled.div`
  display:flex;
  padding:0.5rem;
  justify-content:space-around;
  align-items:center;
  height:5%;
  background:linear-gradient(262deg, #ff7854, #fd267d);
`

const Wrapper = styled.div` 
  display:grid;
  position:relative;
  height:100vh;
  min-width:100%;
  grid-template-columns:1fr;
  @media (min-width:${props => props.theme.media.md}){
    grid-template-columns:1fr 2.5fr;
    grid-template-rows:auto 1fr;
  }

`
const Aside = styled.aside`
  position:relative;
  @media (min-width:${props => props.theme.media.md}){
      border-right: 1px solid black;
      height:100vh;
      display:block
  }


`


const Main = styled.div`
  position:relative;
  height:95vh;
  /* grid-area: main; */
  order:2;
  display:flex;
  flex-direction:column;
  padding:0 0.5rem;
  width:100vw;
  background-color: ${props => props.theme.colors.mainBackground};
  justify-content:center;
  align-items:center;
  @media (min-width:${props => props.theme.media.md}){
    width:100%;
   }
`


function App({getGenresThunk}:any) {
  const [clear,setClear] = useState("-100vw");
  const [active,setActive] = useState(true)
  const [size,setSize] = useState(window.innerWidth);



  useEffect(()=>{
    const resize = ()=>{
      setSize(window.innerWidth)
    }
    window.addEventListener('resize',()=>resize())
    return window.removeEventListener('resize',()=>resize())
  },[size])

  const handleFiltersShow = () =>{
    setActive(false)
  }

  const handleWatchLaterShow = () => {
    setActive(true)
  }
  const transfer = useSpring({
    transform: `translateX(${clear})`,
  })
  const listTranslate = useSpring({
    transform: `translateX(${active ? '0%' : '-50%'})`,
  })
  return (
    <Wrapper>
          {size >= 768 && 
          <>
            <Aside>
              <Navigationn> 
                <h1 onClick={handleWatchLaterShow}>Watch Later</h1>
                <h1 onClick={handleFiltersShow}>Filters</h1>
              </Navigationn>
              <AsideContant style={listTranslate}>
                <WatchLater/>
                <FiltersContainer/>
              </AsideContant>
            </Aside> 
            <Main> 
                <MovieCardContainer/> 
            </Main>
          </>}

          {size < 768 &&
          <MobileView style={transfer} onClick={handleFiltersShow}>
                <WatchLater setClear={setClear}/>
            <Main> 
              <Navigation center>
                <ListIcon onClick={()=>setClear("0vw")}/>
                <MovieFilterIcon onClick={()=> setClear("-200vw")}/>
              </Navigation>
              <MovieCardContainer /> 
            </Main>
              <FiltersContainer setClear={setClear}/>

          </MobileView>}
    </Wrapper >
  );
}

export default React.memo(App)
