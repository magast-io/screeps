var HarvestEnergy = require('creep.action.harvestenergy');
var DropoffEnergy = require('creep.action.dropoffenergy');
var Retreat = require('creep.action.retreat');
var UpgradeController = require('creep.action.upgradecontroller');

class CreepAI {
  constructor() {
    this.actions = {};
    this.actions[HarvestEnergy.name] = new HarvestEnergy();
    this.actions[DropoffEnergy.name] = new DropoffEnergy();
    this.actions[UpgradeController.name] = new UpgradeController();
    this.actions[Retreat.name] = new Retreat();
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

module.exports = CreepAI;
