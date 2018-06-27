var creepManager = require('creep.manager');
var roomManager = require('room.manager');
var spawnManager = require('spawn.manager');

module.exports.loop = function () {

  var tower = Game.getObjectById('abc456b58bb9512f50d2ca92');
  
  if(tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax
    });
    if(closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
      tower.attack(closestHostile);
    }
  }

  for(var name in Game.rooms)
  {
    var room = Game.rooms[name];
    roomManager.exec(room);
  }
  creepManager.run();
  spawnManager.run();
}

