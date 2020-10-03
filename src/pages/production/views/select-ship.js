import React from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import * as ships from '../models/ships-manufacture.json';
import { useShips } from '../../../stores/ships';

const changeSelect = async (shipsModel, newInputValue, setIndex, setDataByJsonMasive) => {
    if (newInputValue === null) {
      return;
    }
    setIndex(newInputValue.value);
}

export default function SelectShips() {
    const shipsModel = ships.default;
    const { setIndex , setDataByJsonMasive} = useShips();
    let index = 0;
    let selectableShips = [];
    shipsModel.forEach(element => {
        let selectableShip = {
            value: null,
            label: null
        };
        selectableShip.label = element.sb_titleEn;
        selectableShip.value = element.sb_id;
        selectableShips[index] = selectableShip; 
        index++;
    });

    return (
      <Autocomplete
        id="combo-box-demo"
        options={selectableShips}
        getOptionLabel={(option) => option.label}
        style={{ width: 300 }}
        onChange={(event, newInputValue) => {
            changeSelect(shipsModel, newInputValue, setIndex, setDataByJsonMasive);
          }}
        renderInput={(params) => <TextField {...params} label="Selectable Ships" variant="outlined" />}
      />
    );
  }