'use strict';

class UpgradeController {
  constructor() {}

  setup(creep) {
    creep.memory.name = UpgradeController.name;
  }

  exec(creep) {
    let result = creep.upgradeController(creep.room.controller);
    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.constroller);
    }
  }
  completed(creep) {
    return creep.energy <= 0;
  }
  finish(creep) {
    delete creep.memory.action;
  }

  score(creep) {
    //TODO
    return 0.3;
  }
}

module.exports = UpgradeController;
