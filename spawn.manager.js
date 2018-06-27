module.exports = {
  run: function() {
    
    let spawn;
    for (var prop in Game.spawns) {
      spawn = Game.spawns[prop];
      break;
    }

    Memory.debug = {};
    Memory.debug.creepRoleCounts = creepRoleCounts;

    for (var roomName in Game.rooms) {
      var room = Game.rooms[roomName];
      var targetCreepCount = Math.ceil(
        room.memory.miningPositions.length * 1.5,
      );
      if (creepRoleCounts[roleHarvester.name] < Math.floor(targetCreepCount)) {
        var newName = "Creep_" + Game.time;
        spawn.spawnCreep([WORK, CARRY, MOVE], newName);
      }     
    }
  },
};
