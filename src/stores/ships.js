import { createGlobalState } from 'react-hooks-global-state';
import { getStickyState, setStickyState } from '../utils';

import { useMinerals } from './minerals';
import { usePlanetarys } from './planetary';
import * as materials from '../pages/production/models/materials';
import { useManufacture } from "../OreReprocessor";
import * as shipsJson from '../pages/production/models/ships-manufacture.json';
import { useTraderFee } from '../marketUtils';
import * as externalData from '../models/externalItems.json';

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
    const { info, items } = externalData.default;

    async function getData(url) {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            // cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    async function _setBlueprintPriceMasive(newCurrentShip) {
        // Blueprint
        var item = items.find(userItem => userItem.name === newCurrentShip.label + ' Blueprint');
        if (item === null || item === undefined) {
            return;
        }

        const data = await getData(info.accessPoint + item.item_id);
        var length = data.length - 1;
        var lastData = data[length];
        if (lastData.sell === null) {
            newCurrentShip.blueprintPrice = 0;
            newCurrentShip.blueprintVolume = 0;
        } else {
            newCurrentShip.blueprintPrice = lastData.sell;
            newCurrentShip.blueprintVolume = lastData.volume;
        }

        newCurrentShip.totalPrice = newCurrentShip.totalPlanetary + newCurrentShip.totalMineral + parseInt(newCurrentShip.build) + parseInt(newCurrentShip.blueprintPrice);

        // Sell price
        item = items.find(userItem => userItem.name === newCurrentShip.label);
        if (item === null || item === undefined) {
            return;
        }

        const data2 = await getData(info.accessPoint + item.item_id);
        length = data2.length - 1;
        lastData = data2[length];
        if (lastData.sell === null) {
            newCurrentShip.api_currentBuy = 0;
            newCurrentShip.api_currentSell = 0;
            newCurrentShip.api_Buy = 0;
            newCurrentShip.api_Sell = 0;
            newCurrentShip.api_currentVolume = 0;
        } else {
            newCurrentShip.api_currentBuy = lastData.highest_buy;
            newCurrentShip.api_currentSell = lastData.lowest_sell;
            newCurrentShip.api_Buy = lastData.buy;
            newCurrentShip.api_Sell = lastData.sell;
            newCurrentShip.api_currentVolume = lastData.volume;
        }

        return newCurrentShip;
    }

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

    async function setDataByJsonMasive(myJson) {

        var newShips = [];
        for (let index = 0; index < myJson.length; index++) {
            const element = myJson[index];
            var newShip = await _setDataByJson(element);
            newShips.push(newShip);
        };

        setStickyState(newShips, 'ships');
        setShips(newShips);
        return (newShips);
    }

    const { getManufactureModifier } = useManufacture();

    async function _setDataByJson(myJson) {
        var newShips = { origin: myJson, label: null, id: null, mineral: [], planetary: [], totalPrice: null };

        // Label
        newShips.label = myJson.sb_titleEn;
        // ID
        newShips.id = myJson.sb_id;

        var totalMineral = 0;
        var totalPlanetary = 0;
        var totalVolumeMineral = 0;
        var totalVolumePlanetary = 0;

        for (var property in myJson) {
            if (property.toString().substring(3, 5) === 'm_') {
                var materialName = materialsModel.material[property.toString().substr(3)];

                var mineral = { mineral: null, units: null, totalPrice: null, totalVolume: null };

                // eslint-disable-next-line
                mineral.mineral = minerals.find(userMineral => userMineral.label === materialName);

                // eslint-disable-next-line
                var skill = getManufactureModifier().material[myJson["sb_itemCategory_id"]]
                if ((!isNaN(skill)) && skill !== 0) {
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
                totalVolumeMineral += mineral.totalVolume;

                mineral.totalPrice = mineral.units * mineral.mineral.value;

                mineral.totalPriceBroker = mineral.totalPrice * (1 + broker);

                totalMineral += mineral.totalPrice;

                newShips.mineral.push(mineral);
            } else if (property.toString().substring(3, 5) === 'p_') {
                var planetaryName = materialsModel.material[property.toString().substr(3)];

                var planetary = { planetary: null, units: null, totalPrice: null, totalVolume: null, show: false };

                // eslint-disable-next-line
                planetary.planetary = planetarys.find(userPlanetary => userPlanetary.label.replace(/\s/g, '') === planetaryName.replace(/\s/g, ''));

                skill = getManufactureModifier().material[myJson["sb_itemCategory_id"]]
                if ((!isNaN(skill)) && skill !== 0) {
                    planetary.units = parseInt(myJson[property] * skill);
                } else {
                    planetary.units = myJson[property] * 1.5;
                }

                planetary.totalVolume = planetary.units * planetary.planetary.volume;
                totalVolumePlanetary += planetary.totalVolume;

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

        // Calcule proportion
        for (let index = 0; index < newShips.mineral.length; index++) {
            const element = newShips.mineral[index];
            element.prop = element.totalPrice / totalMineral * 100;
        }

        for (let index = 0; index < newShips.planetary.length; index++) {
            const element = newShips.planetary[index];
            element.prop = element.totalPrice / totalPlanetary * 100;
        }

        // Build
        newShips.build = myJson["sb_isk_build"];

        newShips.mineral.timestamp = minerals.timestamp;
        newShips.totalPlanetary = totalPlanetary;
        newShips.totalMineral = totalMineral;
        newShips.totalVolumeMineral = totalVolumeMineral;
        newShips.totalVolumePlanetary = totalVolumePlanetary;
        newShips.totalVolume = totalVolumeMineral + totalVolumePlanetary;
        newShips.totalPrice = totalPlanetary + totalMineral + parseInt(newShips.build);

        // Blueprint
        newShips = await _setBlueprintPriceMasive(newShips);

        return newShips;
    }

    async function setIndex (index) {
        if (index === null) {
            if (currentShip.index === undefined) {
                return;
            }
            index = currentShip.index;
        }
        var newCurrentShip = shipsModel.find(userShips => userShips.sb_id === index);
        newCurrentShip = await _setDataByJson(newCurrentShip)

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
