'use strict';

class DropoffEnergy {
  constructor() {}

  setup(creep) {
    if (creep.memory.pos != undefined) {
      return;
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

module.exports = DropoffEnergy;
