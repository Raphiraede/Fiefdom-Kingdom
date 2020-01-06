

const state = {

  turnNumber: 1,
  randomNameGenerator: {},

  main_kingdom: {
    id: 'id',
    name: 'The League Of Dank',
    familyIds: ['ID_OF_FAMILY'],
  },

  ai_kingdoms: [
    {
      id: 'id',
      name: 'The League Of Jenk',
      idOfFamilies: ['ID_OF_ANOTHER_FAMILY'],
    },

    {
      id: 'id',
      name: 'The League Of Stank',
      idOfFamilies: ['ID_OF_ANOTHER_FAMILY']
    },
  ],

  families: {
    'ID_OF_FAMILY': {
      id: 'ID_OF_FAMILY',
      familyName: 'familyName',
      headOfFamily: 'headOfFamily',
      nobleIds: ['nobleIds'],
      attributes: 'idk'
    },

    'ID_OF_ANOTHER_FAMILY': {
      id: 'ID_OF_ANOTHER_FAMILY',
      familyName: 'familyName',
      headOfFamily: 'headOfFamily',
      nobleIds: ['nobleIds'],
      attributes: 'idk'
    }
  },

  nobles: {
    'ID_OF_NOBLE': {
      id: 'ID_OF_NOBLE',
      firstName: 'James The Swampy',
      familyName: 'BurnHammer',
      loyalty: 21,
      power: 16,
      taxLevel: 20,
      age: 40,
      deathAge: 66,
      armies: ['armyId1', 'armyId2']
    },

    'ID_OF_ANOTHER_NOBLE': {
      id: 'ID_OF_ANOTHER_NOBLE',
      firstName: 'James The Swampy',
      familyName: 'BurnHammer',
      loyalty: 80,
      power: 80,
      taxLevel: 40,
      age: 60,
      deathAge: 93,
    }
  },

  armies: {
  'ID_OF_ARMY': {
    id: 'ID_OF_ARMY',
    strength: 100,
    location: {x: 10, y:10}
  },

  gameMap: [
    [
      {
        type: 'plain',
        population: 10,
        //kingdomOwner: 'The League of Dank',
        //fiefOwner: 'ID_OF_NOBLE'
      },

      {
        type: 'plain',
        population: 10,
        //controlledBy: null,
      }
    ]
  ],

  mapOffset: {
    x: -50,
    y: 25,
  },

  tileSize: 48,

  indexes: {
    noblesToFamilies: {
      Noble_ID: 'Family_ID',
      Noble_ID_2: 'Family_ID',
    }
  }
}