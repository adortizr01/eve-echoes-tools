import { skills } from "./stores/skills";
import { Accounting, AvancedAccounting, ExpertAccounting } from './SkillTypes';

export const useTraderFee = () => {
    const getTradeModifier = () => {
      let broker = 0;
      let sales = 0;
  
      for (const i in skills) {
        if (skills[i] instanceof Accounting) {
          switch (skills[i].level) {
            case 1:
              broker += 0.2;
              break;
            case 2:
              broker += 0.4;
              break;
            case 3:
              broker += 0.6;
              break;
            case 4:
              broker += 0.8;
              break;
            case 5:
              broker += 1;
              sales += 1;
              break;
            default:
              break;
          }
        } else if ((skills[i] instanceof AvancedAccounting) || (skills[i] instanceof ExpertAccounting)) {
          switch (skills[i].level) {
            case 1:
              broker += 0.2;
              break;
            case 2:
              broker += 0.4;
              break;
            case 3:
              broker += 0.6;
              break;
            case 4:
              broker += 0.8;
              sales += 1;
              break;
            case 5:
              broker += 1;
              sales += 2;
              break;
            default:
              break;
          }
        }
      }
  
      broker = (8 - broker) / 100;
      sales = (15 - sales) / 100;
  
      return { broker: broker, sales: sales };
    }
  
    return { getTradeModifier };
  }