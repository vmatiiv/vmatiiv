import styled from 'styled-components'
export const Navigation = styled.div<{center?:boolean,right?:boolean}>`
display:none;
@media (max-width:767px){
    height:5vh;
    display:block;
    position:relative;
    left:0;
    width:95vw;
    display:flex;
    align-items:center;
    justify-content: ${props => props.center ? "space-between" : props.right ? "flex-end" : "flex-start"};
    top:0;
    padding:0.5rem;
    border-bottom: 1px solid gray;
    }
`