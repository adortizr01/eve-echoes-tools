import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useShips } from '../../../stores/ships';
import NumberFormat from 'react-number-format';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginLeft: 12,
    marginTop: 12,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TotalVolume() {
  const classes = useStyles();
  const { currentShip } = useShips();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Total volume
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {currentShip.label}
        </Typography>
        <Typography className={classes.title} gutterBottom>
          <NumberFormat
            className="w-30 bg-white px-2 text-right rounded shadow-inner"
            value={currentShip.totalVolume}
            displayType={'text'}
            decimalScale={0}
            thousandSeparator={true}
            suffix={" m3"}
          />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Mineral:</Typography>
          <Typography paragraph>
          <NumberFormat
            className="w-30 bg-white px-2 text-right rounded shadow-inner"
            value={currentShip.totalVolumeMineral}
            displayType={'text'}
            decimalScale={0}
            thousandSeparator={true}
            suffix={" m3"}
          />
          </Typography>
          <Typography paragraph>Planetary:</Typography>
          <Typography paragraph>
          <NumberFormat
            className="w-30 bg-white px-2 text-right rounded shadow-inner"
            value={currentShip.totalVolumePlanetary}
            displayType={'text'}
            decimalScale={0}
            thousandSeparator={true}
            suffix={" m3"}
          />
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}