import React from 'react'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {makeStyles} from '@material-ui/styles'
interface ISliderHOC {
    title: string,
    initialValue: any,
    setFilters: any,
    min:number,
    max:number,
    slideProp:string
}
const useStyles = makeStyles({
  root:{
    width:"90%",
    marginTop:"0.5rem"

  }
})

function SliderHOC({title,initialValue,setFilters,min,max,slideProp}:ISliderHOC) {
    const [value, setValue] = React.useState(initialValue);

    const handleChange = (event:any, newValue:any) => {
      setValue(newValue);
    };
  
    const changeState = () => {
        setFilters({[slideProp]:value})
    }
    const classes = useStyles();

    return (
        <div style={{textAlign:"center"}}>
            <Typography id="range-slider" gutterBottom>
              {title}
            </Typography>

            <Slider
              className={classes.root}
              value={value}
              min={min}
              max={max}
              onBlur={changeState}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            />
        </div>
    )
}

export default SliderHOC
