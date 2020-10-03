import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NumberFormat from 'react-number-format';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';


// Personal imports
import { useShips } from '../../../stores/ships';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function PlanetaryRow(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  var ships = props.currentShip;

  if (ships === undefined || ships.mineral === undefined) {
    return null;
  }

  var selectedShips = ships.planetary.filter(userPlanetary => userPlanetary.units !== 0);

  return (
    <React.Fragment>
      {selectedShips.map(element => (
        <TableRow key={element.planetary.label} className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="ore">
            {element.planetary.label}
          </TableCell>
          <TableCell align="right">
            <NumberFormat
              className="w-30 bg-white px-2 text-right rounded shadow-inner"
              value={element.units}
              decimalScale={0}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>
          <TableCell align="right">
            <NumberFormat
              className="w-30 bg-white px-2 text-right rounded shadow-inner"
              value={element.totalPrice}
              decimalScale={0}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>
          <TableCell align="right">
            <NumberFormat
              className="w-30 bg-white px-2 text-right rounded shadow-inner"
              value={element.totalPriceBroker}
              decimalScale={0}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>
          <TableCell align="right">
            <NumberFormat
              className="w-30 bg-white px-2 text-right rounded shadow-inner"
              value={element.totalVolume}
              decimalScale={0}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>

        </TableRow>
      ))}
    </React.Fragment>
  );
}


export default function PlanetarysTable() {
  const { currentShip, setIndex } = useShips();

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Planetary</TableCell>
            <TableCell align="right">Units</TableCell>
            <TableCell align="right">Output</TableCell>
            <TableCell align="right">Output with broker</TableCell>
            <TableCell align="right">Total Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <PlanetaryRow
            currentShip={currentShip}
            setIndex={setIndex}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}