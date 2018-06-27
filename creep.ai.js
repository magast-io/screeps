var actions = require('creep.actions');

class CreepAI {
  constructor() {
    this.actions = {};
    this.actions[actions.HarvestEnergy.name] = new actions.HarvestEnergy();
    this.actions[actions.DropoffEnergy.name] = new actions.DropoffEnergy();
    this.actions[
      actions.UpgradeController.name
    ] = new actions.UpgradeController();
    this.actions[actions.Retreat.name] = new actions.Retreat();
  }

  exec(creep) {
    let current = this.actions[creep.memory.action];
    let scores = [];
    for (let key in this.actions) {
      let action = this.actions[key];
      scores.push({name: key, score: action.score(creep)});
    }

    scores.sort(function(a, b) {
      return a.score > b.score;
    });

    let next = scores[0];

    if (current != next) {
      current.finish(creep);
      next.setup(creep);
    }

    next.exec(creep);
  }
}
