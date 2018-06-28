'use strict';

class RoomData {
  constructor(room) {
    this.room = room;
    this.structures = [];
    this.constructionSites = [];
  }

  addStructure(structure) {
    this.structures.push(structure);
  }

  addConstructionSite(constructionSite) {
    this.constructionSites.push(constructionSite);
  }
}

class StructureData {
  constructor(structure) {
    this.structure = structure;
  }

  get usesEnergy() {
    return this.structure.hasOwnProperty('energyCapacity');
  }

  resourceDemand(resourceType) {
    if (resourceType == RESOURCE_ENERGY) {
      if (!this.usesEnergy) return 0;
      switch (this.structure.structureType) {
        case STRUCTURE_SPAWN: 
          let wanted = 0;
          for (let key in Game.rooms) {
            let room = Game.rooms[key];
            wanted = room.memory.miningPositions.length * 2;
          }
          let total = Object.keys(Game.creeps).length;
          
          return Math.pow((wanted / total), 0.333);
        case STRUCTURE_EXTENSION: 
          return 0.4;
        case STRUCTURE_CONTROLLER:
          return 0.3;
        default:
          return 0;
      }
    }
  }
}

class ConstructionSiteData {
  constructor(site) {
    this.site = site;
  }

  get typeDemand() {
    switch (this.site.structureType) {
      case STRUCTURE_SPAWN:
        return 0;
      case STRUCTURE_EXTENSION:
        return 0.5;
      case STRUCTURE_ROAD:
        return 0.3;
      case STRUCTURE_WALL:
        return 0.6;
      case STRUCTURE_RAMPART:
        return 0.6;
      case STRUCTURE_KEEPER_LAIR:
        return 0;
      case STRUCTURE_PORTAL:
        return 0;
      case STRUCTURE_LINK:
        return 0;
      case STRUCTURE_STORAGE:
        return 0;
      case STRUCTURE_TOWER:
        return 0.7;
      case STRUCTURE_OBSERVER:
        return 0;
      case STRUCTURE_POWER_BANK:
        return 0;
      case STRUCTURE_POWER_SPAWN:
        return 0;
      case STRUCTURE_EXTRACTOR:
        return 0;
      case STRUCTURE_LAB:
        return 0;
      case STRUCTURE_TERMINAL:
        return 0;
      case STRUCTURE_CONTAINER:
        return 0;
      case STRUCTURE_NUKER:
        return 0;
      default:
        return 0;
    }
    return 0;
  }

  resourceDemand(resourceType) {
    if (resourceType != RESOURCE_ENERGY) {
      return 0;
    }
    
    let result = this.typeDemand * (1 - (this.site.progress / this.site.progressTotal));
    console.log(this.typeDemand, this.site.progress, this.site.progressTotal, result);
    return result;
  }
}

module.exports = {RoomData, StructureData, ConstructionSiteData};
