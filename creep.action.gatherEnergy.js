module.exports = {
  type: 'action',
  name: 'gatherEnergy',

  start: function(creep) {
    if (creep.carry.energy >= creep.carryCapacity) {
      return false;
    }

    if (creep.memory.pos == undefined) {
      var miningPositions = creep.room.memory.miningPositions;

      for (var index in miningPositions) {
        var pos = miningPositions[index];

        if (pos.claimedBy == undefined) {
          pos.claimedBy = creep.id;

          creep.memory.pos = pos;

          break;
        }
      }
    }

    if (creep.memory.pos == undefined) {
      console.log('Was unable to find target pos for harvester creep');
    }

    return creep.memory.pos != undefined;
  },

  /** @param {Creep} creep **/

  run: function(creep) {
    var source = Game.getObjectById(creep.memory.pos.source);

    var result = creep.harvest(source);

    if (result == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.memory.pos.pos.x, creep.memory.pos.pos.y, {
        visualizePathStyle: {stroke: '#ffaa00'},
      });
    }

    return !this.completed(creep);
  },

  completed: function(creep) {
    return creep.carry.energy >= creep.carryCapacity;
  },

  end: function(creep) {
    var miningPositions = creep.room.memory.miningPositions;

    for (var index in miningPositions) {
      var pos = miningPositions[index];

      if (pos.claimedBy == creep.id) {
        delete pos.claimedBy;
      }
    }

    delete creep.memory.pos;

    return true;
  },
};
