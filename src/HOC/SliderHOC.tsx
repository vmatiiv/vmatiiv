import React from 'react'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

interface ISliderHOC {
    title: string,
    initialValue: any,
    setFilters: any,
    min:number,
    max:number,
    slideProp:string
}

function SliderHOC({title,initialValue,setFilters,min,max,slideProp}:ISliderHOC) {
    const [value, setValue] = React.useState(initialValue);

    const handleChange = (event:any, newValue:any) => {
      setValue(newValue);
    };
  
    const changeState = () => {
        
        setFilters({[slideProp]:value})
    }

    return (
        <div>
            <Typography id="range-slider" gutterBottom>
              {title}
            </Typography>

            <Slider
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
