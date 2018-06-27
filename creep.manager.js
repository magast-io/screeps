var CreepAI = require('creep.ai');

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
    let ai = new CreepAI();
    for (var name in Game.creeps) {
      var creep = Game.creeps[name];
      ai.exec(creep);
    }
  },
};
