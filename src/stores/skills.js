import { RPSkill, Accounting, ExpertAccounting, AvancedAccounting, PBasicSkill, PAvancedSkill, PExpertSkill } from "../SkillTypes";

export const skills = [
  new RPSkill(
    "it.rp.cop", "Common Ore Processing",
    ["Veldspar", "Plagioclase", "Scordite"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.acop", "Advanced Common Ore Processing",
    ["Veldspar", "Plagioclase", "Scordite"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.ecop", "Expert Common Ore Processing",
    ["Veldspar", "Plagioclase", "Scordite"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.uop", "Uncommon Ore Processing",
    ["Omber", "Kernite", "Pyroxeres", "Dark Ochre"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.auop", "Advanced Uncommon Ore Processing",
    ["Omber", "Kernite", "Pyroxeres", "Dark Ochre"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.euop", "Expert Uncommon Ore Processing",
    ["Omber", "Kernite", "Pyroxeres", "Dark Ochre"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.sop", "Special Ore Processing",
    ["Gneiss", "Spodumain", "Hemorphite"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.asop", "Advanced Special Ore Processing",
    ["Gneiss", "Spodumain", "Hemorphite"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.esop", "Expert Special Ore Processing",
    ["Gneiss", "Spodumain", "Hemorphite"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.rop", "Rare Ore Processing",
    ["Hedbergite", "Jaspet", "Crokite"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.arop", "Advanced Rare Ore Processing",
    ["Hedbergite", "Jaspet", "Crokite"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.erop", "Expert Rare Ore Processing",
    ["Hedbergite", "Jaspet", "Crokite"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.pop", "Precious Ore Processing",
    ["Arkonor", "Bistot", "Mercoxit"],
    (skillLevel, baseSkill) => baseSkill * (skillLevel / 10)
  ),
  new RPSkill(
    "it.rp.apop", "Advanced Precious Ore Processing",
    ["Arkonor", "Bistot", "Mercoxit"],
    (skillLevel, baseSkill) => baseSkill * ((5 + skillLevel * 5) / 100)
  ),
  new RPSkill(
    "it.rp.epop", "Expert Precious Ore Processing",
    ["Arkonor", "Bistot", "Mercoxit"],
    (skillLevel, baseSkill) => baseSkill * ((skillLevel * 5) / 100)
  ),
  new PBasicSkill(
    "it.p.fr", "Frigate Manufacture",
    ["1"]
  ),
  new PAvancedSkill(
    "it.p.afr", "Avanced Frigate Manufacture",
    ["1"]
  ),
  new PExpertSkill(
    "it.p.efr", "Expert Frigate Manufacture",
    ["1"]
  ),
  new PBasicSkill(
    "it.p.dr", "Destroyer Manufacture",
    ["2"]
  ),
  new PAvancedSkill(
    "it.p.adr", "Avanced Destroyer Manufacture",
    ["2"]
  ),
  new PExpertSkill(
    "it.p.edr", "Expert Destroyer Manufacture",
    ["2"]
  ),
  new PBasicSkill(
    "it.p.cr", "Cruiser Manufacture",
    ["3"]
  ),
  new PAvancedSkill(
    "it.p.acr", "Avanced Cruiser Manufacture",
    ["3"]
  ),
  new PExpertSkill(
    "it.p.ecr", "Expert Cruiser Manufacture",
    ["3"]
  ),
  new PBasicSkill(
    "it.p.br", "BattleCruiser Manufacture",
    ["4"]
  ),
  new PAvancedSkill(
    "it.p.abr", "Avanced BattleCruiser Manufacture",
    ["4"]
  ),
  new PExpertSkill(
    "it.p.ebr", "Expert BattleCruiser Manufacture",
    ["4"]
  ),
  new PBasicSkill(
    "it.p.is", "Industrial Ships Manufacture",
    ["21"]
  ),
  new PAvancedSkill(
    "it.p.ais", "Avanced Industrial Ships Manufacture",
    ["21"]
  ),
  new PExpertSkill(
    "it.p.eis", "Expert Industrial Ships Manufacture",
    ["21"]
  ),
  
  new Accounting(),
  new AvancedAccounting(),
  new ExpertAccounting(),
]
