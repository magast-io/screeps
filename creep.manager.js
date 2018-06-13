var roleHarvester = require('creep.role.harvester');
var roleUpgrader = require('creep.role.upgrader');
var roleBuilder = require('creep.role.builder');

module.exports = {
  /** @param **/
  run: function() {
    //Clean up
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    //Run
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      switch (creep.memory.role) {
        case roleHarvester.name:
          roleHarvester.run(creep);
          break;
        case roleUpgrader.name:
          roleUpgrader.run(creep);
          break;
        case roleBuilder.name:
          roleBuilder.run(creep);
          break;
      }
    }
  },
};
