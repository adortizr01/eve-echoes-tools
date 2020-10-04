import { getMinerals } from "./stores/minerals";
import { RPSkill } from "./SkillTypes";
import { skills } from "./stores/skills";
import { PBasicSkill, PAvancedSkill, PExpertSkill } from './SkillTypes';

const minerals = getMinerals();
const tritanium = minerals[0];
const pyerite = minerals[1];
const mexallon = minerals[2];
const isogen = minerals[3];
const nocxium = minerals[4];
const zydrine = minerals[5];
const megacyte = minerals[6];
const morphite = minerals[7];

const map = [
  {
    label: "Veldspar", reprocessesInto: [
      { mineral: tritanium, amount: 4.14 },
    ]
  },
  {
    label: "Scordite", reprocessesInto: [
      { mineral: tritanium, amount: 1.62 },
      { mineral: pyerite, amount: 1.15 },
    ]
  },
  {
    label: "Plagioclase", reprocessesInto: [
      { mineral: tritanium, amount: 0.51 },
      { mineral: pyerite, amount: 0.65 },
      { mineral: mexallon, amount: 0.97 },
    ]
  },
  {
    label: "Omber", reprocessesInto: [
      { mineral: tritanium, amount: 6 },
      { mineral: pyerite, amount: 0.76 },
      { mineral: isogen, amount: 0.55 },
    ]
  },
  {
    label: "Kernite", reprocessesInto: [
      { mineral: tritanium, amount: 2.67 },
      { mineral: mexallon, amount: 4.81 },
      { mineral: isogen, amount: 0.48 },
    ]
  },

  {
    label: "Pyroxeres", reprocessesInto: [
      { mineral: tritanium, amount: 17.55 },
      { mineral: pyerite, amount: 5.6 },
      { mineral: mexallon, amount: 2.5 },
      { mineral: nocxium, amount: 0.3 },
    ]
  },
  {
    label: "Hemorphite", reprocessesInto: [
      { mineral: tritanium, amount: 55 },
      { mineral: isogen, amount: 1.6 },
      { mineral: nocxium, amount: 0.13 },
      { mineral: zydrine, amount: 0.5 },
    ]
  },
  {
    label: "Dark Ochre", reprocessesInto: [
      { mineral: tritanium, amount: 9.6 },
      { mineral: isogen, amount: 0.56 },
      { mineral: nocxium, amount: 0.43 },
    ]
  },
  {
    label: "Gneiss", reprocessesInto: [
      { mineral: pyerite, amount: 8.8 },
      { mineral: mexallon, amount: 9.2 },
      { mineral: isogen, amount: 1.84 },
    ]
  },

  {
    label: "Jaspet", reprocessesInto: [
      { mineral: mexallon, amount: 24.61 },
      { mineral: nocxium, amount: 0.48 },
      { mineral: zydrine, amount: 0.56 },
    ]
  },
  {
    label: "Crokite", reprocessesInto: [
      { mineral: tritanium, amount: 388 },
      { mineral: nocxium, amount: 0.94 },
      { mineral: zydrine, amount: 0.96 },
    ]
  },

  {
    label: "Bistot", reprocessesInto: [
      { mineral: pyerite, amount: 61.2 },
      { mineral: zydrine, amount: 0.36 },
      { mineral: megacyte, amount: 0.79 },
    ]
  },
  {
    label: "Arkonor", reprocessesInto: [
      { mineral: tritanium, amount: 88 },
      { mineral: mexallon, amount: 10 },
      { mineral: megacyte, amount: 1.04 },
    ]
  },
  {
    label: "Mercoxit", reprocessesInto: [
      { mineral: morphite, amount: 0.6 },
    ]
  },
  {
    label: "Hedbergite", reprocessesInto: [
      { mineral: pyerite, amount: 27.31 },
      { mineral: isogen, amount: 4.58 },
      { mineral: nocxium, amount: 0.09 },
      { mineral: zydrine, amount: 0.14 },
    ]
  },
  {
    label: "Spodumain", reprocessesInto: [
      { mineral: tritanium, amount: 197 },
      { mineral: pyerite, amount: 37.4 },
      { mineral: mexallon, amount: 3.6 },
      { mineral: isogen, amount: 0.6 },
    ]
  },
];

export const useOreReprocessor = () => {

  const getOreReprocessingModifier = (ore) => {
    let modifiedSkill = RPSkill.baseSkill;

    for (const i in skills) {
      if (skills[i] instanceof RPSkill) {
        modifiedSkill += skills[i].getReprocessModifier(ore);
      }
    }

    return Math.round(modifiedSkill * 10000) / 10000;// Percentage to the second decimal
  }

  const reprocessOreByUnit = (ore, units) => {
    const mapping = map.find(entry => entry.label === ore.label);
    const skillModifier = getOreReprocessingModifier(ore);

    return mapping.reprocessesInto.map(mineralAmount => {
      return { mineral: mineralAmount.mineral, units: Math.floor(mineralAmount.amount * units * skillModifier) }
    });
  }

  const reprocessOreByVolume = (ore, volume) => {
    const mapping = map.find(entry => entry.label === ore.label);
    const skillModifier = getOreReprocessingModifier(ore);

    return mapping.reprocessesInto.map(mineralAmount => {
      return { mineral: mineralAmount.mineral, units: Math.floor(mineralAmount.amount * (volume / ore.volume) * skillModifier) }
    });
  }

  return { reprocessOreByUnit, reprocessOreByVolume, getOreReprocessingModifier };
}

export const useManufacture = () => {

  const getManufactureModifier = () => {
    let material = [];
    material[1] = 0
    material[1] = 0
    material[2] = 0
    material[3] = 0
    material[4] = 0
    material[5] = 0
    material[21] = 0
    var localSkills = skills;
    for (const i in localSkills) {
      if (localSkills[i] instanceof PBasicSkill) {
       
        switch (localSkills[i].level) {
          case 1:
            material[localSkills[i].canReprocess[0]] += 0.06;
            break;
          case 2:
            material[localSkills[i].canReprocess[0]] += 0.12;
            break;
          case 3:
            material[localSkills[i].canReprocess[0]] += 0.18;
            break;
          case 4:
            material[localSkills[i].canReprocess[0]]+= 0.24;
            break;
          case 5:
            material[localSkills[i].canReprocess[0]] += 0.3;
            break;
          default:
            break;
        }
      } else if ((localSkills[i] instanceof PAvancedSkill)) {
        switch (localSkills[i].level) {
          case 1:
            material[localSkills[i].canReprocess[0]] += 0.04;
            break;
          case 2:
            material[localSkills[i].canReprocess[0]] += 0.08;
            break;
          case 3:
            material[localSkills[i].canReprocess[0]] += 0.12;
            break;
          case 4:
            material[localSkills[i].canReprocess[0]] += 0.16;
            break;
          case 5:
            material[localSkills[i].canReprocess[0]] += 0.2;
            break;
          default:
            break;
        }
      } else if ((localSkills[i] instanceof PExpertSkill)) {
        switch (localSkills[i].level) {
          case 1:
            material[localSkills[i].canReprocess[0]] += 0.01;
            break;
          case 2:
            material[localSkills[i].canReprocess[0]] += 0.02;
            break;
          case 3:
            material[localSkills[i].canReprocess[0]] += 0.03;
            break;
          case 4:
            material[localSkills[i].canReprocess[0]] += 0.04;
            break;
          case 5:
            material[localSkills[i].canReprocess[0]] += 0.05;
            break;
          default:
            break;
        }
      }
    }

    material[1] = 1.5 - material[1];
    material[2] = 1.5 - material[2];
    material[3] = 1.5 - material[3];
    material[4] = 1.5 - material[4];
    material[5] = 1.5 - material[5];
    material[21] = 1.5 - material[21];

    return { material: material };
  }

  return { getManufactureModifier };
}
