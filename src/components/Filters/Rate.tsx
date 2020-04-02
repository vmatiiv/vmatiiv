import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  

  
function Rate({filters,setFilters}:any) {
    const classes = useStyles();
    const [value, setValue] = React.useState(filters.rate);

    const handleChange = (event:any, newValue:any) => {
      setValue(newValue);

    };
  
    const up = (e:any) => {
        setFilters({rate:value})
    }
    return (
      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Rating
        </Typography>
        
        <Slider
          value={value}
          min={0}
          max={10}
          step={0.1}
          onChange={handleChange}
          onBlur={up}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"

        />
      </div>
    );
  }
export default Rate
