var Actions = require('creep.actions');

class CreepAI {
  constructor() {
    this.actions = {};
    this.actions[Actions.HarvestEnergy.name] = new Actions.HarvestEnergy();
    this.actions[Actions.DropoffEnergy.name] = new Actions.DropoffEnergy();
    this.actions[Actions.UpgradeController.name] = new Actions.UpgradeController();
    this.actions[Actions.Retreat.name] = new Actions.Retreat();
  }

  exec(creep) {
    let current = this.actions[creep.memory.action];
    let scores = [];
    for (let key in this.actions) {
      let action = this.actions[key];
      scores.push({name: key, score: action.score(creep)});
    }

    scores.sort(function(a, b) {
      return a.score < b.score;
    });

    let next = this.actions[scores[0].name];

    if (current != next) {
      if(current != null) {
        current.finish(creep);
      }
      if(!next.setup(creep)) {
        return;
      }
    }

    next.exec(creep);
  }
}

module.exports = CreepAI;
