import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  

function Slid({filters,setFilters}) {
    const classes = useStyles();
    const maxYear = new Date().getFullYear()
    const [value, setValue] = React.useState([Math.min(...filters.years), Math.max(...filters.years)]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const changeState = () => {
      setFilters({years:value})

    }
    return (
      <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Years range
        </Typography>
        
        <Slider
          value={value}
          min={1900}
          max={maxYear}
          onBlur={changeState}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      </div>
    );
  }
export default Slid
