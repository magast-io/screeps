var gather = require('creep.action.gatherEnergy');
var dropoff = require('creep.action.dropoffEnergy');

module.exports = {
  type: 'role',
  name: 'harvester',

  dropoff: [STRUCTURE_EXTENSION, STRUCTURE_SPAWN],

  actionOrder: [gather, dropoff],

  actionLookup: {
    gatherEnergy: gather,
    dropoffEnergy: dropoff,
  },

  /** @param {Creep} creep **/

  run: function(creep) {
    creep.memory.dropoff = this.dropoff;

    if (creep.memory.action == undefined) {
      for (var actionIndex in this.actionOrder) {
        var action = this.actionOrder[actionIndex];

        if (action.start(creep)) {
          action.run(creep);
        }
      }
    } else {
      var action = this.actionLookup[creep.memory.action];

      action.run(creep);

      if (action.completed(creep)) {
        action.end(creep);
      }
    }
  },
};
