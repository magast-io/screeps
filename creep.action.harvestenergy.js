'use strict';

class HarvestEnergy {
  constructor() {}

  setup(creep) {
    if (creep.memory.pos != undefined) {
      return;
    }
    //Find mining position
    let miningPos = creep.room.memory.miningPositions;
    let avaiablePosition = roomPositions.find(function(element) {
      return element.safe == true && element.claimedBy == undefined;
    });

    miningPos.claimedBy = creep.id;
    creep.memory.pos = pos;
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

module.exports = HarvestEnergy;
