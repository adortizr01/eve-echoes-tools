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


function MineralRow(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  var ships = props.currentShip;

  if (ships === undefined || ships.mineral === undefined) {
    return null;
  }

  var selectedShips = ships.mineral.filter(userMineral => userMineral.units !== 0);

  return (
    <React.Fragment>
      {selectedShips.map(element => (
        <TableRow key={element.mineral.label} className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="ore">
            {element.mineral.label}
          </TableCell>
          <TableCell align="right">
            <NumberFormat
              className="w-30 bg-white px-2 text-right rounded shadow-inner"
              value={element.mineral.value}
              suffix={" ISK"}
              decimalScale={2}
              displayType={'text'}
              thousandSeparator={true}
            />
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
              suffix={" ISK"}
              decimalScale={0}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>
          <TableCell align="right">
            <NumberFormat
              className="w-30 bg-white px-2 text-right rounded shadow-inner"
              value={element.totalPriceBroker}
              suffix={" ISK"}
              decimalScale={0}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>
          <TableCell align="right">
            <NumberFormat
              className="w-30 bg-white px-2 text-right rounded shadow-inner"
              value={element.prop}
              decimalScale={2}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>
          <TableCell align="right">
            <NumberFormat
              className="w-30 bg-white px-2 text-right rounded shadow-inner"
              value={element.mineral.volume}
              suffix={" m3"}
              decimalScale={2}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>

          <TableCell align="right">
            <NumberFormat
              className="w-30 bg-white px-2 text-right rounded shadow-inner"
              value={element.totalVolume}
              suffix={" m3"}
              decimalScale={2}
              displayType={'text'}
              thousandSeparator={true}
            />
          </TableCell>

        </TableRow>
      ))}
    </React.Fragment>
  );
}


export default function MineralsTable() {
  const { currentShip, setIndex } = useShips();

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Mineral/Ore</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Units</TableCell>
            <TableCell align="right">Output</TableCell>
            <TableCell align="right">Output with broker</TableCell>
            <TableCell align="right">%</TableCell>
            <TableCell align="right">Volume</TableCell>
            <TableCell align="right">Total Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <MineralRow
            currentShip={currentShip}
            setIndex={setIndex}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}