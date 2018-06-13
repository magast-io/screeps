var roleHarvester = require('creep.role.harvester');
var roleUpgrader = require('creep.role.upgrader');
var roleBuilder = require('creep.role.builder');

module.exports = {
  run: function() {
    //TODO: Multiple Spawns

    var spawn;
    for (var prop in Game.spawns) {
      spawn = Game.spawns[prop];
      break;
    }

    var creepRoleCounts = {};
    creepRoleCounts[roleHarvester.name] = 0;
    creepRoleCounts[roleUpgrader.name] = 0;
    creepRoleCounts[roleBuilder.name] = 0;

    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      creepRoleCounts[creep.memory.role] =
        creepRoleCounts[creep.memory.role] + 1;
      var roomMemory = creep.room.memory;
      if (!roomMemory.hasOwnProperty('creepCount')) {
        roomMemory.creepCount = 1;
      } else {
        roomMemory.creepCount = roomMemory.creepCount + 1;
      }
    }

    Memory.debug = {};
    Memory.debug.creepRoleCounts = creepRoleCounts;

    for (var roomName in Game.rooms) {
      var room = Game.rooms[roomName];
      var targetCreepCount = Math.ceil(
        room.memory.miningPositions.length * 1.5,
      );
      if (creepRoleCounts[roleHarvester.name] < Math.floor(targetCreepCount)) {
        var newName = roleHarvester.name + Game.time;
        spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
          memory: {role: roleHarvester.name},
        });
      } else if (
        creepRoleCounts[roleUpgrader.name] < Math.floor(targetCreepCount * 0.25)
      ) {
        //var newName = roleUpgrader.name + Game.time;
        //spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: { role: roleUpgrader.name }});
      } else if (creepRoleCounts[roleBuilder.name] < 1) {
        //var newName = roleBuilder.name + Game.time;
        //spawn.spawnCreep([WORK, CARRY, MOVE], newName, {memory: { role: roleBuilder.name }});
      }
    }
  },
};
