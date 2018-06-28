class RoomManager {
  static exec(room) {
    const UPDATE_EVERY = 100;

    let memory = room.memory;
    let needsUpdate;
    if (memory.hasOwnProperty('needsUpdateAt')) {
      needsUpdate = memory.needsUpdateAt < Game.time;
    } else {
      needsUpdate = true;
      memory.needsUpdateAt = 0;
    }

    if (needsUpdate) {
      memory.needsUpdateAt = Game.time + UPDATE_EVERY;
      if (memory.miningPositions == null) {
        RoomManager.findMiningPos(room);
      }

      RoomManager.checkMiningPosSafety(room);
      RoomManager.clearDeadCreeps(room);
    }
  }

  static findMiningPos(room) {
    let memory = room.memory;
    memory.miningPositions = [];
    let sources = room.find(FIND_SOURCES);
    for (let index in sources) {
      var source = sources[index];
      var pos = source.pos;
      for (let i = pos.x - 1; i <= pos.x + 1; i++) {
        for (let j = pos.y - 1; j <= pos.y + 1; j++) {
          var entities = room.lookAt(i, j);
          for (let z in entities) {
            var entity = entities[z];
            if (entity.type == 'terrain' && entity.terrain == 'plain') {
              memory.miningPositions.push({
                pos: pos,
                source: source.id,
                safe: false,
              });
            }
          }
        }
      }
    }
  }

  static checkMiningPosSafety(room) {
    let memory = room.memory;
    //Check if mining positions are safe
    for (var i = 0; i < memory.miningPositions.length; i++) {
      let coords = memory.miningPositions[i].pos;
      let pos = room.getPositionAt(coords.x, coords.y);
      let hostile = pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      let result = hostile == null || !hostile.pos.inRangeTo(pos, 5);
      memory.miningPositions[i].safe = result;
    }
  }

  static clearDeadCreeps(room) {
    let memory = room.memory;

    for (let i = 0; i < memory.miningPositions.length; i++) {
      let miningPos = memory.miningPositions[i];
      if (miningPos.hasOwnProperty('claimedBy')) {
        let creepId = miningPos.hasOwnProperty('claimedBy');
        if (!Game.creeps.hasOwnProperty(creepId)) {
          console.log('Removing claim for deleted creep', creepId);
          delete miningPos.claimedBy;
        }
      }
    }
  }
}

module.exports = RoomManager;
