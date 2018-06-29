module.exports = {
  run: function() {
    
    let spawn;
    for (var prop in Game.spawns) {
      spawn = Game.spawns[prop];
      break;
    }

    Memory.debug = {};
    let counter = {};

    for (let creepName in Game.creeps) {
      let creep = Game.creeps[creepName];
      if(creep.room == undefined) {
        continue;
      }
      let name = creep.room.name
      if(counter[name] == undefined) {
        counter[name] = 0;
      }
      counter[name] = counter[name] + 1;
    }

    for (var roomName in Game.rooms) {
      let room = Game.rooms[roomName];
      let targetCreepCount = 10;
      if(room.memory.miningPositions != undefined) {
        let targetCreepCount = Math.ceil(
          room.memory.miningPositions.length * 1.5
        );
      }

      let numOfCreeps = 0;
      if(counter[name] != undefined) {
        numOfCreeps = counter[name];
      }

      if(numOfCreeps < targetCreepCount) {
        //Build Worker
        let newName = "Creep_" + Game.time;
        
        spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], newName);
      }
    }
  },
};
