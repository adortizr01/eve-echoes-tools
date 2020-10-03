import { getSuperStickyState, setSuperStickyState } from './utils';

export class Skill {
  constructor(id, label, category, subCategory) {
    this.id = id;
    this.label = label;
    this.category = category;
    this.subCategory = subCategory;
    this.level = getSuperStickyState(0, `skill-level-${id}`);
  }

  setLevel(level) {
    this.level = level;
    setSuperStickyState(level, `skill-level-${this.id}`);
  }
}

export class ITSkill extends Skill {
  constructor(id, label, subCategory) {
    super(id, label, 'Industrial Technology', subCategory);
  }
}

export class RPSkill extends ITSkill {
  static baseSkill = 0.3;

  constructor(id, label, canReprocess, modifierFn) {
    super(id, label, 'Resource Processing');

    this.canReprocess = canReprocess;
    this.modifierCallback = modifierFn;
  }

  getReprocessModifier (ore) {
    if (this.canReprocess.indexOf(ore.label) === -1) {
      return 0;
    }

    return this.level > 0 ? this.modifierCallback(this.level, RPSkill.baseSkill) : 0;
  }
}

export class SSSkill extends Skill {
  constructor(id, label, subCategory) {
    super(id, label, 'Social Science', subCategory);
  }
}

export class PSkill extends ITSkill {
  static baseSkillMaterial = 1.50;
  static baseSkillTime = 1;

  constructor(id, label, canReprocess) {
    super(id, label, 'Production');

    this.canReprocess = canReprocess;
  }
}

export class PBasicSkill extends PSkill {
   // eslint-disable-next-line
  constructor(id, label, canReprocess) {
    super(id, label, canReprocess);
  }
}

export class PAvancedSkill extends PSkill {
   // eslint-disable-next-line
  constructor(id, label, canReprocess) {
    super(id, label, canReprocess);
  }
}

export class PExpertSkill extends PSkill {
   // eslint-disable-next-line
  constructor(id, label, canReprocess) {
    super(id, label, canReprocess);
  }
}

export class Accounting extends SSSkill {
  constructor() {
    super("ss.tr.ac", "Accounting", 'Trade');

    this.canReprocess = "";
  }
}

export class AvancedAccounting extends SSSkill {
  constructor() {
    super("ss.tr.aac", "Avanced accounting", 'Trade');

    this.canReprocess = "";
  }
}

export class ExpertAccounting extends SSSkill {
  constructor() {
    super("ss.tr.eac", "Expert accounting", 'Trade');

    this.canReprocess = "";
  }
}
