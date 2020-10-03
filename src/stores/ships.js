import { createGlobalState } from 'react-hooks-global-state';
import { getStickyState, setStickyState } from '../utils';

import { useMinerals } from './minerals';
import { usePlanetarys } from './planetary';
import * as materials from '../pages/production/models/materials';
import { useManufacture } from "../OreReprocessor";
import * as shipsJson from '../pages/production/models/ships-manufacture.json';
import { useTraderFee } from '../marketUtils';
export const orgShips = [
    { label: null, id: null, mineral: null, planetary: null, totalPrice: null, buyOrder: null },
];

const initialState = {
    ships: getStickyState(JSON.parse(JSON.stringify(orgShips)), 'ships'),
    currentShip: getStickyState(JSON.parse(JSON.stringify(orgShips)), 'currentShip')
};

const {
    useGlobalState,
    getGlobalState,
    setGlobalState,
} = createGlobalState(initialState);

export const useShips = () => {
    const [ships, setShips] = useGlobalState('ships');
    const [currentShip, setCurrentShip] = useGlobalState('currentShip');

    const { broker } = useTraderFee().getTradeModifier()

    const setShipValue = (ship, newValue) => {
        const newShips = [...ships]

        for (const i in newShips) {
            if (newShips[i] === ship) {
                const newShip = { ...ship, value: newValue };
                newShips[i] = newShip;

                break
            }
        }

        setStickyState(newShips, 'ships');
        setShips(newShips);
    };

    const resetShipValue = (ship, value) => {
        const newShips = [...ships]

        if (value !== '' && (value * 1 === 0 || !isNaN(value))) {
            return;
        }

        for (const i in newShips) {
            if (newShips[i] === ship) {
                const newShip = { ...ship };
                newShip.value = orgShips.find(
                    orgShip => orgShip.label === newShip.label
                ).value;
                newShips[i] = newShip;

                break;
            }
        }

        setStickyState(newShips, 'ships');
        setShips(newShips);
    }

    const { minerals } = useMinerals();
    const { planetarys } = usePlanetarys();
    const materialsModel = materials.default;
    const shipsModel = shipsJson.default;

    const setDataByJsonMasive = (myJson) => {

        var newShips = [];
        myJson.forEach(element => {
            var newShip = _setDataByJson(element);
            newShips.push(newShip);
        });
        setStickyState(newShips, 'ships');
        setShips(newShips);
        return (newShips);
    }

    const { getManufactureModifier } = useManufacture();

    const _setDataByJson = (myJson) => {
        var newShips = { origin: myJson, label: null, id: null, mineral: [], planetary: [], totalPrice: null };

        // Label
        newShips.label = myJson.sb_titleEn;
        // ID
        newShips.id = myJson.sb_id;

        var totalMineral = 0;
        var totalPlanetary = 0;

        for (var property in myJson) {
            if (property.toString().substring(3, 5) === 'm_') {
                var materialName = materialsModel.material[property.toString().substr(3)];

                var mineral = { mineral: null, units: null, totalPrice: null, totalVolume: null };

                 // eslint-disable-next-line
                mineral.mineral = minerals.find(userMineral => userMineral.label === materialName);

                 // eslint-disable-next-line
                var skill = getManufactureModifier().material[myJson["sb_itemCategory_id"]]
                if (!isNaN(skill)) {
                    mineral.units = parseInt(myJson[property] * skill);
                } else {
                    mineral.units = myJson[property] * 1.5;
                }

                if (mineral.units > 0) {
                    mineral.show = true;
                } else {
                    mineral.show = false;
                }

                mineral.totalVolume = mineral.units * 0.01;

                mineral.totalPrice = mineral.units * mineral.mineral.value;

                mineral.totalPriceBroker = mineral.totalPrice * (1 + broker);
                
                totalMineral += mineral.totalPrice;

                newShips.mineral.push(mineral);
            } else if (property.toString().substring(3, 5) === 'p_') {
                var planetaryName = materialsModel.material[property.toString().substr(3)];

                var planetary = { planetary: null, units: null, totalPrice: null, totalVolume: null, show: false };

                 // eslint-disable-next-line
                planetary.planetary = planetarys.find(userPlanetary => userPlanetary.label.replace(/\s/g, '') === planetaryName.replace(/\s/g, ''));

                 debugger;
                skill = getManufactureModifier().material[myJson["sb_itemCategory_id"]]
                if (!isNaN(skill)) {
                    planetary.units = parseInt(myJson[property] * skill);
                } else {
                    planetary.units = myJson[property] * 1.5;
                }

                planetary.totalVolume = planetary.units * planetary.planetary.volume;

                planetary.totalPrice = planetary.units * planetary.planetary.value;

                if (planetary.units > 0) {
                    planetary.show = true;
                } else {
                    planetary.show = false;
                }

                planetary.totalPriceBroker = planetary.totalPrice * (1 + broker);

                totalPlanetary += planetary.totalPrice;

                newShips.planetary.push(planetary);
            }
        }

        newShips.mineral.timestamp = minerals.timestamp;
        newShips.totalPlanetary = totalPlanetary;
        newShips.totalMineral = totalMineral;
        newShips.totalPrice = totalPlanetary + totalMineral;

        return newShips;
    }

    const updateTask = () => {
        if (currentShip.mineral === undefined) {
            return;
        }
        if ((minerals.timestamp !== undefined && currentShip.mineral.timestamp === undefined) || (minerals.timestamp > currentShip.mineral.timestamp)) {
            var currentModel = _setDataByJson(currentShip.origin);
            setStickyState(currentModel, 'currentShip');
            setCurrentShip(currentModel);
        }
    }

    updateTask();
    
    const setIndex = (index) => {
        if (index === null) {
            if (currentShip.index === undefined) {
                return;
            }
            index = currentShip.index;
        }
        var newCurrentShip = shipsModel.find(userShips => userShips.sb_id === index);
        newCurrentShip = _setDataByJson(newCurrentShip)

        // Update model
         // eslint-disable-next-line
        var shipInModel = ships.find(userShips => userShips.id === index);
        shipInModel = newCurrentShip;

        setStickyState(ships, 'ships');
        setShips(ships);

        if (newCurrentShip === undefined) {
            return null
        }
        newCurrentShip.index = index;
        setStickyState(newCurrentShip, 'currentShip');
        setCurrentShip(newCurrentShip);
        return newCurrentShip;
    }

    return {
        ships: ships,
        currentShip,
        setIndex,
        setShipValue,
        resetShipValue,
        setDataByJsonMasive
    }
}

export const getShips = () => getGlobalState('ships');
export const setShips = (value) => setGlobalState('ships', value);
