module.exports = {
  type: 'action',
  name: 'dropoffEnergy',

  start: function(creep) {
    if (creep.carry.energy <= 0) {
      return false;
    }

    return true;
  },

  /** @param {Creep} creep **/

  run: function(creep) {
    var targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return;
        creep.memory.dropoff.indexOf(structure.structureType) != -1 &&
          structure.energy < structure.energyCapacity;
      },
    });

    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {
      console.log(
        'Unable to find drop location targets in room',
        creep.room.id,
        'targets',
        targets,
      );
    }

    return !this.completed(creep);
  },

  completed: function(creep) {
    return creep.carry.energy == 0;
  },

  end: function(creep) {
    return true;
  },
};
