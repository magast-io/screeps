'use strict';

class Retreat {
  constructor() {}
  get [Symbol.toStringTag]() {
    return 'Retreat';
  }

  setup(creep) {
    return false;
  }
  exec(creep) {}
  completed(creep) {}
  finish(creep) {}
  score(creep) {
    return 0;
  }
}

class HarvestEnergy {
  constructor() {}

  get [Symbol.toStringTag]() {
    return 'HarvestEnergy';
  }

  setup(creep) {
    if (creep.memory.harvestPos != undefined) {
      return;
    }
    //Find mining position
    let miningPos = creep.room.memory.miningPositions;
    if (miningPos == null) {
      console.log('Unable to find Mining positions in room', creep.room);
      return false;
    }
    let index = miningPos.findIndex(function(element) {
      return element.safe == true && element.claimedBy == undefined;
    });

    if (index == -1) {
      /*console.log(
        'Unable to find a avaiablePosition for creep',
        creep,
        ' in room ',
        creep.room,
      );*/
      return false;
    }

    //console.log("Creep ", creep.id, " is climbing miningPos index ", index);
    let avaiablePosition = miningPos[index];
    creep.room.memory.miningPositions[index].claimedBy = creep.id;
    creep.memory.harvestPos = avaiablePosition;
    creep.memory.action = HarvestEnergy.name;
    return true;
  }

  exec(creep) {
    let source = Game.getObjectById(creep.memory.harvestPos.source);
    let result = creep.harvest(source);

    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(
        creep.memory.harvestPos.pos.x,
        creep.memory.harvestPos.pos.y,
        {
          visualizePathStyle: {stroke: '#FFAA00'},
        },
      );
    }
  }

  completed(creep) {
    return creep.carry.energy == creep.carryCapacity;
  }

  finish(creep) {
    delete creep.memory.harvestPos;
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
      if (this.completed(creep)) {
        return 0;
      }
      result += 0.25;
    }
    result += (1 - creep.carry.energy / creep.carryCapacity) * 0.25;
    return result;
  }
}

class DropoffEnergy {
  constructor() {}
  get [Symbol.toStringTag]() {
    return 'DropoffEnergy';
  }

  setup(creep) {
    if (creep.memory.pos != undefined) {
      return false;
    }
    let targets = [];
    for (let resource in creep.carry) {
      for (let i = 0; i < creep.room.data.structures.length; i++) {
        let structure = creep.room.data.structures[i];
        targets.push({
          id: structure.id,
          score: structure.data.resourceDemand(resource),
        });
      }

      for (let i = 0; i < creep.room.data.constructionSites.length; i++) {
        let constructionSite = creep.room.data.constructionSites[i];
        targets.push({
          id: constructionSite.id,
          score: constructionSite.data.resourceDemand(resource),
        });
      }
    }

    targets.sort(function(a, b) {
      return b.score - a.score;
    });

    creep.memory.debug.ai.targets = targets;

    creep.memory.target = targets[0].id;
    creep.memory.action = DropoffEnergy.name;
    return true;
  }

  exec(creep) {
    let target = this.target(creep);
    let result = creep.transfer(target, RESOURCE_ENERGY);
    if (result == ERR_INVALID_TARGET) {
      result = creep.build(target);
    }
    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(target, {visualizePathStyle: {stroke: '#FFFFFF'}});
    }
  }

  target(creep) {
    return Game.getObjectById(creep.memory.target);
  }

  completed(creep) {
    let target = this.target(creep);
    if (target == null) {
      return true;
    }

    let percentageComplete = 1;
    if (target.energy != undefined) {
      percentageComplete = target.energy / target.energyCapacity;
    } else if (target.progress != undefined) {
      percentageComplete = target.progress / target.progressTotal;
    }

    let result = creep.carry.energy == 0 || percentageComplete == 1;
    return result;
  }

  finish(creep) {
    delete creep.memory.action;
  }

  score(creep) {
    let result = 0;
    let mod = .25;
    if (creep.memory.action == DropoffEnergy.name) {
      if (this.completed(creep)) {
        return 0;
      }
      result += 0.5;
      mod = 0.5

    }
    result += (creep.carry.energy / creep.carryCapacity) * mod;
    return result;
  }
}

class UpgradeController {
  constructor() {}
  get [Symbol.toStringTag]() {
    return 'UpgradeController';
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
    return 0.0;
  }
}

class Repair {
  constructor() {}
  get [Symbol.toStringTag]() {
    return 'Repair';
  }

  setup(creep) {
    creep.memory.name = Repair.name;

    return true;
  }
}

module.exports = {UpgradeController, HarvestEnergy, DropoffEnergy, Retreat};
