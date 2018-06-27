'use strict';

class Retreat {
  constructor() {}
  get [Symbol.toStringTag]() {
    return "Retreat";
  }


  setup(creep) {
    return false;
  }
  exec(creep) {}
  completed(creep) {}
  finish(creep) {}
  score(creep) { return 0; }
}

class HarvestEnergy {
  constructor() {}

  get [Symbol.toStringTag]() {
    return "HarvestEnergy";
  }

  setup(creep) {
    if (creep.memory.pos != undefined) {
      return;
    }
    //Find mining position
    let miningPos = creep.room.memory.miningPositions;
    if(miningPos == null) {
      console.warn("Unable to find Mining positions in room", creep.room);
      return false;
    }
    let avaiablePosition = miningPos.find(function(element) {
      return element.safe == true && element.claimedBy == undefined;
    });

    if(avaiablePosition == null) {
      console.log("Unable to find a avaiablePosition for creep", creep, " in room ", creep.room);
      return false;
    }

    miningPos.claimedBy = creep.id;
    creep.memory.pos = avaiablePosition;
    creep.memory.action = HarvestEnergy.name;
  }

  exec(creep) {
    let source = Game.getObjectById(creep.memory.pos.source);
    let result = creep.harvest(source);

    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.memory.pos.pos.x, creep.memory.pos.pos.y, {
        visualizePathStyle: {stroke: '#FFAA00'},
      });
    }
  }

  completed(creep) {
    return creep.carry.energy >= creep.carryCapacity;
  }

  finish(creep) {
    delete creep.memory.pos;
    let miningPos = creep.room.memory.miningPositions.find(function(element) {
      return element.claimedBy == creep.id;
    });
    if (miningPos != undefined) {
      delete miningPos.claimedBy;
    }
  }

  score(creep) {
    let result = 0;
    if (creep.memory.action == HarvestEnergy.name) {
      result += 0.5;
    }

    result += creep.carry.energy / creep.carryCapacity;
  }
}

class DropoffEnergy {
  constructor() {}
  get [Symbol.toStringTag]() {
    return "DropoffEnergy";
  }

  setup(creep) {
    if (creep.memory.pos != undefined) {
      return false;
    }
    //Find Target .. for now just pick a structure
    let targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        var needsEnergy = structure.energy < structure.energyCapacity;
        return needsEnergy;
      },
    });
    creep.memory.target = target[0].id;
    creep.memory.action = DropoffEnergy.name;
    return true;
  }

  exec(creep) {
    let result = creep.transfer(target, RESOURCE_ENERGY);
    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#FFFFFF'}});
    }
  }

  get target() {
    return Game.getObjectById(creep.memory.target);
  }

  completed(creep) {
    return creep.energy == 0 || target.energy >= target.energyCapacity;
  }

  finish(creep) {
    delete creep.memory.action;
  }

  score(creep) {
    let result = 0;
    if (creep.memory.action == DropoffEnergy) {
      result += 0.5;
    }
    result += creep.carry.energy / creep.carryCapacity;
  }
}

class UpgradeController {
  constructor() {}
  get [Symbol.toStringTag]() {
    return "UpgradeController";
  }

  setup(creep) {
    creep.memory.name = UpgradeController.name;
    return true;
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

module.exports = {UpgradeController, HarvestEnergy, DropoffEnergy, Retreat};
