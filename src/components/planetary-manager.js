import React from 'react';
import { usePlanetarys } from '../stores/planetary';
import { useShips } from '../stores/ships';

export default ({ onClose }) => {
  const { planetarys, setPlanetaryValue, resetPlanetaryValue } = usePlanetarys();
  const { currentShip, setIndex } = useShips();

  const _onClose = () => {
    setIndex(null);
    onClose();
  }

  var findPlanetary = [];
  for (let index = 0; index < planetarys.length; index++) {
    const element = planetarys[index];
    const currentPlanetary = currentShip.planetary.find(userPlanetary => userPlanetary.planetary.label === element.label )
    if (currentPlanetary.show === true) {
      findPlanetary.push( element );
    }
  }

  return (
    <div key="planetary-manager" className="fixed z-50 flex justify-center items-center inset-0">
      <div className="fixed z-0 w-full h-full bg-gray-700 opacity-75" onClick={_onClose}></div>
      <div className="relative z-10 bg-white rounded-md overflow-hidden shadow-md w-3/4 md:w-1/2 lg:w-1/3 max-h-screen overflow-y-auto">
        <h3 className="text-xl mb-4 py-2 px-4 bg-gray-200">Planetarys</h3>
        {findPlanetary.map(planetary => (
          <div key={planetary.label} className="flex px-4">
            <div className="flex-none w-32 whitespace-no-wrap pr-4">{planetary.label}</div>
            <div className="flex-auto whitespace-no-wrap text-right py-1">
              <input
                className="w-16 bg-gray-200 rounded-sm shadow-inner text-right px-1 mr-1"
                type="text"
                value={planetary.value}
                onChange={(e) => { 
                  setPlanetaryValue(planetary, e.target.value) 
                } }
                onBlur={(e) => resetPlanetaryValue(planetary, e.target.value)}
              />
                isk/unit
              </div>
          </div>
        ))}
        <div className="flex justify-end p-4">
          <button className="bg-blue-600 text-blue-100 py-1 px-2 rounded" onClick={_onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
