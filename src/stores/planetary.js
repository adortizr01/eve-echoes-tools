// https://github.com/dai-shi/react-hooks-global-state
import { createGlobalState } from 'react-hooks-global-state';
import { getStickyState, setStickyState } from '../utils';
import marketValues from '../MarketValues';


export const orgPlanetarys = [
     { label: 'Base Metals',         volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Base_Metals.jita },
        { label: 'Condensates',         volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Condensates.jita },
        { label: 'Condensed Alloy',     volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Condensed_Alloy.jita },
        { label: 'Construction Blocks', volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Construction_Blocks.jita },
        { label: 'Coolant',             volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Coolant.jita },
        { label: 'Crystal Compound',    volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Crystal_Compound.jita },
        { label: 'Dark Compound',       volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Dark_Compound.jita },
        { label: 'Fiber Composite',     volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Fiber_Composite.jita },
        { label: 'Gleaming Alloy',      volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Gleaming_Alloy.jita },
        { label: 'Glossy Compound',     volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Glossy_Compound.jita },
        { label: 'Heavy Metals',        volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Heavy_Metals.jita },
        { label: 'Heavy Water',         volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Heavy_Water.jita },
        { label: 'Industrial Fibers',   volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Industrial_Fibers.jita },
        { label: 'Ionic Solutions',     volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Ionic_Solutions.jita },
        { label: 'Liquid Ozone',        volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Liquid_Ozone.jita },
        { label: 'Lucent Compound',     volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Lucent_Compound.jita },
        { label: 'Lustering Alloy',     volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Lustering_Alloy.jita },
        { label: 'Motley Compound',     volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Motley_Compound.jita },
        { label: 'Nanites',             volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Nanites.jita },
        { label: 'Noble Gas',           volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Noble_Gas.jita },
        { label: 'Noble Metals',        volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Noble_Metals.jita },
        { label: 'Opulent Compound',    volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Opulent_Compound.jita },
        { label: 'Oxygen Isotopes',     volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Oxygen_Isotopes.jita },
        { label: 'Plasmoids',           volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Plasmoids.jita },
        { label: 'Polyaramids',         volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Polyaramids.jita },
        { label: 'Precious Alloy',      volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Precious_Alloy.jita },
        { label: 'Reactive Gas',        volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Reactive_Gas.jita },
        { label: 'Reactive Metals',     volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Reactive_Metals.jita },
        { label: 'Sheen Compound',      volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Sheen_Compound.jita },
        { label: 'Silicate Glass',      volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Silicate_Glass.jita },
        { label: 'Smartfab Units',      volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Smartfab_Units.jita },
        { label: 'Supertensile Plastics', volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Supertensile_Plastics.jita },
        { label: 'Suspended Plasma',    volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Suspended_Plasma.jita },
        { label: 'Toxic Metals',        volume: 0.10, checked: false, units:0, show: false  ,value: marketValues.Toxic_Metals.jita },
    
];

const initialState = {
    planetarys: getStickyState(JSON.parse(JSON.stringify(orgPlanetarys)), 'planetarys')
};

const {
    useGlobalState,
    getGlobalState,
    setGlobalState,
} = createGlobalState(initialState);

export const usePlanetarys = () => {
    const [planetarys, setPlanetarys] = useGlobalState('planetarys');

    const setPlanetaryValue = (planetary, newValue) => {
        const newPlanetarys = [...planetarys];
        for (const i in newPlanetarys) {
            if (newPlanetarys[i] === planetary) {
                const newPlanetary = { ...planetary, value: newValue };
                newPlanetarys[i] = newPlanetary;

                break
            }
        }

        setStickyState(newPlanetarys, 'planetarys');
        setPlanetarys(newPlanetarys);
    };

    const setPlanetaryUnits = (planetary, newValue) => {
        const newPlanetarys = [...planetarys];

        for (const i in newPlanetarys) {
            if (newPlanetarys[i] === planetary) {
                const newPlanetary = { ...planetary, value: newValue };

                newPlanetary.units = newValue;

                newPlanetarys[i] = newPlanetary;

                break
            }
        }

        setStickyState(newPlanetarys, 'planetarys');
        setPlanetarys(newPlanetarys);
    };

    const setBuyType = (planetary, checked) => {
        const newPlanetarys = [...planetarys];
    
        for (const i in newPlanetarys) {
          if (newPlanetarys[i] === planetary) {
            const newPlanetary = { ...planetary };
            newPlanetary.checked = checked;
            newPlanetarys[i] = newPlanetary;
            break;
          }
        }
    
        setStickyState(newPlanetarys, 'planetarys');
        setPlanetarys(newPlanetarys);
      }

    const resetPlanetaryValue = (planetary, value) => {
        const newPlanetarys = [...planetarys]

        if (value !== '' && (value * 1 === 0 || !isNaN(value))) {
            return;
        }

        for (const i in newPlanetarys) {
            if (newPlanetarys[i] === planetary) {
                const newPlanetary = { ...planetary };
                newPlanetary.value = orgPlanetarys.find(
                    orgPlanetary => orgPlanetary.label === newPlanetary.label
                ).value;
                newPlanetarys[i] = newPlanetary;

                break;
            }
        }

        setStickyState(newPlanetarys, 'planetarys');
        setPlanetarys(newPlanetarys);
    }

    const resetPlanetaryUnits = (planetary, units) => {
        const newPlanetarys = [...planetarys]

        if (units !== '' && (units * 1 === 0 || !isNaN(units))) {
            return;
        }

        for (const i in newPlanetarys) {
            if (newPlanetarys[i] === planetary) {
                const newPlanetary = { ...planetary };
                newPlanetary.units = orgPlanetarys.find(
                    orgPlanetary => orgPlanetary.label === newPlanetary.label
                ).units;
                newPlanetarys[i] = newPlanetary;

                break;
            }
        }

        setStickyState(newPlanetarys, 'planetarys');
        setPlanetarys(newPlanetarys);
    }

    const _setPlanetarys = (newPlanetarys) => {
        setPlanetaryUnits(newPlanetarys[0], newPlanetarys[0].units)
        setStickyState(newPlanetarys, 'planetarys');
        setPlanetarys(newPlanetarys);
      }
    
    return {
        setPlanetarys: _setPlanetarys,
        planetarys: planetarys,
        setPlanetaryValue,
        resetPlanetaryValue,
        setPlanetaryUnits,
        resetPlanetaryUnits,
        setBuyType
    }
}

export const getPlanetarys = () => getGlobalState('planetarys');
export const setPlanetarys = (value) => setGlobalState('planetarys', value);
