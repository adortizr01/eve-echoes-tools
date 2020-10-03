import React, { useState, useReducer } from 'react';
import { lastUpdated } from '../../MarketValues';
import MineralManager from '../../components/mineral-manager';
import PlanetaryManager from '../../components/planetary-manager';
import SkillManager from '../../components/skill-manager';

import TaxesBroker from './components/taxes-broker-card';
import TaxesSales from './components/taxes-sales-card';
import TotalPrice from './components/total-price-card';
import TotalPriceTaxes from './components/total-price-taxes-card';
import NativeSelects from './views/select-ship';
import MineralsTable from './views/mineral-table';
import PlanetarysTable from './views/planetary-table';

import Grid from '@material-ui/core/Grid';


const Manufacture = () => {
    const [mineralManagerVisible, setMineralManagerVisible] = useState(false);
    const [planetaryManagerVisible, setPlanetaryManagerVisible] = useState(false);
    const [skillManagerVisible, setSkillManagerVisible] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    return (
        <div>
            <h2 className="text-4xl mb-4">Manufacture</h2>

            <p className="mb-4">The values of the ores and minerals are not updated automatically. They are updated about once a day to be based on the market buy rates of Jita, Alikara and additional nearby ITCs. If the market rates are different (or if you need to calculated base on different values, for example, a private contract), you can set your own values if you'd like. You can also set your levels of relevant skills to help calculate reprocessing results.</p>

            <p className="mb-4 p-2 bg-gray-300 font-bold">Values last updated {lastUpdated.toLocaleDateString()} {lastUpdated.toLocaleTimeString()}.</p>

            <NativeSelects className="w-full sm:w-auto bg-blue-600 text-blue-100 py-1 px-2 mr-2 mb-2 rounded hover:bg-blue-700"/>

            <Grid className="flex flex-wrap items-center pt-3 mb-3 flex-start" >
                <TotalPrice />
                <TotalPriceTaxes />
                <TaxesBroker />
                <TaxesSales />  
            </Grid>

            <div className="flex flex-wrap justify-between items-center mb-2">
                <div className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-blue-600 text-blue-100 py-1 px-2 mr-2 mb-2 rounded hover:bg-blue-700" onClick={() => setSkillManagerVisible(true)}>Manage skill levels</button>
                    <button className="w-full sm:w-auto bg-blue-600 text-blue-100 py-1 px-2 mr-2 mb-2 rounded hover:bg-blue-700" onClick={() => setMineralManagerVisible(true)}>Manage mineral values</button>
                    <button className="w-full sm:w-auto bg-blue-600 text-blue-100 py-1 px-2 rounded hover:bg-blue-700" onClick={() => setPlanetaryManagerVisible(true)}>Manage planetary values</button>
                </div>
            </div>

            <h3 className="text-2xl mb-4">Minerals</h3>
            <MineralsTable />

            <h3 className="text-2xl mb-4">Planetary</h3>
            <PlanetarysTable />


            {/* <h3 className="text-2xl mb-4">Calculated ores</h3> */}

            {planetaryManagerVisible && (
                <PlanetaryManager onClose={() => setPlanetaryManagerVisible(false)} />
            )}

            {mineralManagerVisible && (
                <MineralManager onClose={() => setMineralManagerVisible(false)} />
            )}

            {skillManagerVisible && (
                <SkillManager onClose={() => setSkillManagerVisible(false)} onUpdate={forceUpdate} />
            )}
        </div>
    );
}

export default Manufacture;

