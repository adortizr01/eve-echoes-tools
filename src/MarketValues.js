export let lastUpdated = new Date();

const marketValues = {
  // ores
  veldspar: { jita: 0 },
  scordite: { jita: 0 },
  plagioclase: { jita: 0 },

  omber: { jita: 0 },
  kernite: { jita: 0 },
  pyroxeres: { jita: 0 },
  dark_ochre: { jita: 0 },

  gneiss: { jita: 0 },
  hemorphite: { jita: 0 },
  spodumain: { jita: 0 },

  hedbergite: { jita: 0 },
  jaspet: { jita: 0 },
  crokite: { jita: 0 },

  arkonor: { jita: 0 },
  bistot: { jita: 0 },
  mercoxit: { jita: 0 },

  // minerals
  tritanium:    { jita:    3 },// 2
  pyerite:      { jita:   37 },// 36
  mexallon:     { jita:   56 },// 55
  isogen:       { jita:  153 },// 165
  nocxium:      { jita: 2050 },// 2410
  zydrine:      { jita: 1800 },// 1500
  megacyte:     { jita: 4501 },
  morphite:     { jita: 4100 },

   // planetary
   Base_Metals:      { jita: 0 },
   Condensates:      { jita: 0 },
   Condensed_Alloy:      { jita: 0 },
   Construction_Blocks:      { jita: 0 },
   Coolant:      { jita: 0 },
   Crystal_Compound:      { jita: 0 },
   Dark_Compound:      { jita: 0 },
   Fiber_Composite:      { jita: 0 },
   Gleaming_Alloy:      { jita: 0 },
   Glossy_Compound:      { jita: 0 },
   Heavy_Metals:      { jita: 0 },
   Heavy_Water:      { jita: 0 },
   Industrial_Fibers:      { jita: 0 },
   Ionic_Solutions:      { jita: 0 },
   Liquid_Ozone:      { jita: 0 },
   Lucent_Compound:      { jita: 0 },
   Lustering_Alloy:      { jita: 0 },
   Motley_Compound:      { jita: 0 },
   Nanites:      { jita: 0 },
   Noble_Gas:      { jita: 0 },
   Noble_Metals:      { jita: 0 },
   Opulent_Compound:      { jita: 0 },
   Oxygen_Isotopes:      { jita: 0 },
   Plasmoids:      { jita: 0 },
   Polyaramids:      { jita: 0 },
   Precious_Alloy:      { jita: 0 },
   Reactive_Gas:      { jita: 0 },
   Reactive_Metals:      { jita: 0 },
   Sheen_Compound:      { jita: 0 },
   Silicate_Glass:      { jita: 0 },
   Smartfab_Units:      { jita: 0 },
   Supertensile_Plastics:      { jita: 0 },
   Suspended_Plasma:      { jita: 0 },
   Toxic_Metals:      { jita: 0 },  
};

export class MarketValues {
  static requests = [];
  static oldestValue = Math.floor(Date.now() / 1000);

  static listeners = [];

  static ready(listener) {
    MarketValues.listeners.push(listener);
  }

  static fireDoneEvent() {
    lastUpdated = new Date(MarketValues.oldestValue * 1000);

    for (const listener of MarketValues.listeners) {
      listener();
    }
  }

  static getBuyValue(id, marketKey) {
    MarketValues.requests.push(id);

    const url = `https://api.eve-echoes-market.com/market-stats/${id}`;
    fetch(url).then(
      response => response.json()
    ).then(json => {
      const value = json[json.length - 1].buy;
      const stamp = json[json.length - 1].time;
      marketValues[marketKey].jita = value;
      MarketValues.requests.splice(MarketValues.requests.indexOf(id), 1);

      if (stamp < MarketValues.oldestValue) {
        MarketValues.oldestValue = stamp;
      }

      if (MarketValues.requests.length === 0) {
        MarketValues.fireDoneEvent();
      }
    });
  }
}

export default marketValues;
