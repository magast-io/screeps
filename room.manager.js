module.exports = {
  /** @param Room room**/
  run: function(room) {
    const UPDATE_EVERY = 100;
    //Find all valid energy mining spots
    var memory = room.memory;
    var needsUpdate;
    if (memory.hasOwnProperty('needsUpdateAt')) {
      needsUpdate = memory.needsUpdateAt < Game.time;
    } else {
      needsUpdate = true;
      memory.needsUpdateAt = 0;
    }

    if (needsUpdate) {
      memory.needsUpdateAt = Game.time + UPDATE_EVERY;
      if (memory.miningPositions == null) {
        memory.miningPositions = [];
        var sources = room.find(FIND_SOURCES);
        for (var index in sources) {
          var source = sources[index];
          var pos = source.pos;
          for (var i = pos.x - 1; i <= pos.x + 1; i++) {
            for (var j = pos.y - 1; j <= pos.y + 1; j++) {
              var entities = room.lookAt(i, j);
              for (var z in entities) {
                var entity = entities[z];
                if (entity.type == 'terrain' && entity.terrain == 'plain') {
                  memory.miningPositions.push({pos: pos, source: source.id});
                }
              }
            }
          }
        }
      }
    }
  },
};
