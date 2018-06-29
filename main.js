var creepManager = require('creep.manager');
var roomManager = require('room.manager');
var spawnManager = require('spawn.manager');
var Data = require('room.data');

module.exports.loop = function() {
  let tower = Game.getObjectById("5b367fec04e9a20734ba9d64");
  
  if(tower) {
    let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
      tower.attack(closestHostile);
    }
    
    let test = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => {
        if(structure.structureType == STRUCTURE_WALL) {
          return structure.hits < 300000;
        }
        return structure.hits < structure.hitsMax;
      }
    });
    if(test) {
      tower.repair(test);
    }

  }

  for (let key in Game.rooms) {
    let room = Game.rooms[key];
    room.data = new Data.RoomData(room);
  }

  for (let key in Game.structures) {
    let structure = Game.structures[key];
    structure.data = new Data.StructureData(structure);
    structure.room.data.addStructure(structure);
  }

  for (let key in Game.constructionSites) {
    let site = Game.constructionSites[key];
    site.data = new Data.ConstructionSiteData(site);
    site.room.data.addConstructionSite(site);
  }

  for (let name in Game.rooms) {
    var room = Game.rooms[name];
    roomManager.exec(room);
  }
  creepManager.run();
  spawnManager.run();
};
