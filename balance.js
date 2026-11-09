const entries = {
  "Beggar": {
    "name": "Beggar",
    "maxXp": 50,
    "income": 5,
    "requirements": {},
    "group": "Common work",
    "tile": 0
  },
  "Farmer": {
    "name": "Farmer",
    "maxXp": 100,
    "income": 9,
    "requirements": {
      "Beggar": 10
    },
    "group": "Common work",
    "tile": 1
  },
  "Fisherman": {
    "name": "Fisherman",
    "maxXp": 200,
    "income": 15,
    "requirements": {
      "Farmer": 10
    },
    "group": "Common work",
    "tile": 2
  },
  "Miner": {
    "name": "Miner",
    "maxXp": 400,
    "income": 40,
    "requirements": {
      "Strength": 10,
      "Fisherman": 10
    },
    "group": "Common work",
    "tile": 3
  },
  "Blacksmith": {
    "name": "Blacksmith",
    "maxXp": 800,
    "income": 80,
    "requirements": {
      "Strength": 30,
      "Miner": 10
    },
    "group": "Common work",
    "tile": 4
  },
  "Merchant": {
    "name": "Merchant",
    "maxXp": 1600,
    "income": 150,
    "requirements": {
      "Bargaining": 50,
      "Blacksmith": 10
    },
    "group": "Common work",
    "tile": 5
  },
  "Squire": {
    "name": "Squire",
    "maxXp": 100,
    "income": 5,
    "requirements": {
      "Strength": 5
    },
    "group": "Military",
    "tile": 6
  },
  "Footman": {
    "name": "Footman",
    "maxXp": 1000,
    "income": 50,
    "requirements": {
      "Strength": 20,
      "Squire": 10
    },
    "group": "Military",
    "tile": 7
  },
  "Veteran footman": {
    "name": "Veteran footman",
    "shortname": "Veteran F.",
    "maxXp": 10000,
    "income": 120,
    "requirements": {
      "Battle tactics": 40,
      "Footman": 10
    },
    "group": "Military",
    "tile": 8
  },
  "Knight": {
    "name": "Knight",
    "maxXp": 100000,
    "income": 300,
    "requirements": {
      "Strength": 100,
      "Veteran footman": 10
    },
    "group": "Military",
    "tile": 9
  },
  "Veteran knight": {
    "name": "Veteran knight",
    "shortname": "Veteran K.",
    "maxXp": 1000000,
    "income": 1000,
    "requirements": {
      "Battle tactics": 150,
      "Knight": 10
    },
    "group": "Military",
    "tile": 10
  },
  "Elite knight": {
    "name": "Elite knight",
    "maxXp": 7500000,
    "income": 3000,
    "requirements": {
      "Strength": 300,
      "Veteran knight": 10
    },
    "group": "Military",
    "tile": 11
  },
  "Holy knight": {
    "name": "Holy knight",
    "maxXp": 40000000,
    "income": 15000,
    "requirements": {
      "Mana control": 500,
      "Elite knight": 10
    },
    "group": "Military",
    "tile": 12
  },
  "Legendary knight": {
    "name": "Legendary knight",
    "shortname": "Legendary K.",
    "maxXp": 150000000,
    "income": 50000,
    "requirements": {
      "Mana control": 1000,
      "Battle tactics": 1000
    },
    "group": "Military",
    "tile": 13
  },
  "Student": {
    "name": "Student",
    "maxXp": 100000,
    "income": 100,
    "requirements": {
      "Concentration": 200,
      "Meditation": 200
    },
    "group": "The Arcane Association",
    "tile": 14
  },
  "Apprentice mage": {
    "name": "Apprentice mage",
    "shortname": "Apprentice",
    "maxXp": 1000000,
    "income": 1000,
    "requirements": {
      "Mana control": 400,
      "Student": 10
    },
    "group": "The Arcane Association",
    "tile": 15
  },
  "Mage": {
    "name": "Mage",
    "maxXp": 10000000,
    "income": 7500,
    "requirements": {
      "Mana control": 700,
      "Apprentice mage": 10
    },
    "group": "The Arcane Association",
    "tile": 16
  },
  "Wizard": {
    "name": "Wizard",
    "maxXp": 100000000,
    "income": 50000,
    "requirements": {
      "Mana control": 1000,
      "Mage": 10
    },
    "group": "The Arcane Association",
    "tile": 17
  },
  "Master wizard": {
    "name": "Master wizard",
    "shortname": "Master W.",
    "maxXp": 10000000000.0,
    "income": 250000,
    "requirements": {
      "Mana control": 1500,
      "Wizard": 10
    },
    "group": "The Arcane Association",
    "tile": 18
  },
  "Chairman": {
    "name": "Chairman",
    "maxXp": 1000000000000.0,
    "income": 1000000,
    "requirements": {
      "Mana control": 2000,
      "Master wizard": 10
    },
    "group": "The Arcane Association",
    "tile": 19
  },
  "Concentration": {
    "name": "Concentration",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Skill xp",
    "requirements": {},
    "group": "Fundamentals",
    "tile": 20
  },
  "Productivity": {
    "name": "Productivity",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Job xp",
    "requirements": {
      "Concentration": 5
    },
    "group": "Fundamentals",
    "tile": 21
  },
  "Bargaining": {
    "name": "Bargaining",
    "maxXp": 100,
    "effect": -0.01,
    "description": "Expenses",
    "requirements": {
      "Concentration": 20
    },
    "group": "Fundamentals",
    "tile": 22
  },
  "Meditation": {
    "name": "Meditation",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Happiness",
    "requirements": {
      "Concentration": 30,
      "Productivity": 20
    },
    "group": "Fundamentals",
    "tile": 23
  },
  "Strength": {
    "name": "Strength",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Military pay",
    "requirements": {},
    "group": "Combat",
    "tile": 24
  },
  "Battle tactics": {
    "name": "Battle tactics",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Military xp",
    "requirements": {
      "Concentration": 20
    },
    "group": "Combat",
    "tile": 25
  },
  "Muscle memory": {
    "name": "Muscle memory",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Strength xp",
    "requirements": {
      "Concentration": 30,
      "Strength": 30
    },
    "group": "Combat",
    "tile": 26
  },
  "Mana control": {
    "name": "Mana control",
    "maxXp": 100,
    "effect": 0.01,
    "description": "T.A.A. xp",
    "requirements": {
      "Concentration": 200,
      "Meditation": 200
    },
    "group": "Magic",
    "tile": 27
  },
  "Immortality": {
    "name": "Immortality",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Longer lifespan",
    "requirements": {
      "Apprentice mage": 10
    },
    "group": "Magic",
    "tile": 28
  },
  "Time warping": {
    "name": "Time warping",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Gamespeed",
    "requirements": {
      "Mage": 10
    },
    "group": "Magic",
    "tile": 29
  },
  "Super immortality": {
    "name": "Super immortality",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Longer lifespan",
    "requirements": {
      "Chairman": 120
    },
    "group": "Magic",
    "tile": 30
  },
  "Dark influence": {
    "name": "Dark influence",
    "maxXp": 100,
    "effect": 0.01,
    "description": "All xp",
    "requirements": {
      "Evil": 1
    },
    "group": "Dark magic",
    "tile": 31
  },
  "Intimidation": {
    "name": "Intimidation",
    "maxXp": 100,
    "effect": -0.01,
    "description": "Expenses",
    "requirements": {
      "Evil": 1,
      "Dark influence": 20
    },
    "group": "Dark magic",
    "tile": 32
  },
  "Evil control": {
    "name": "Evil control",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Evil Lvl. at rebirth",
    "isPlusDescription": true,
    "requirements": {
      "Evil": 1,
      "Intimidation": 20
    },
    "group": "Dark magic",
    "tile": 33
  },
  "Demon training": {
    "name": "Demon training",
    "maxXp": 100,
    "effect": 0.01,
    "description": "All xp",
    "requirements": {
      "Evil": 25,
      "Evil control": 20
    },
    "group": "Dark magic",
    "tile": 34
  },
  "Blood meditation": {
    "name": "Blood meditation",
    "maxXp": 100,
    "effect": 0.1,
    "description": "Evil Lvl. at rebirth",
    "isPlusDescription": true,
    "requirements": {
      "Evil": 75,
      "Evil control": 200
    },
    "group": "Dark magic",
    "tile": 35
  },
  "Demon's wealth": {
    "name": "Demon's wealth",
    "maxXp": 100,
    "effect": 0.002,
    "description": "Job pay",
    "requirements": {
      "Evil": 400,
      "Blood meditation": 200
    },
    "group": "Dark magic",
    "tile": 36
  },
  "Divine Blessing": {
    "name": "Divine Blessing",
    "maxXp": 100,
    "effect": 0.01,
    "description": "All xp",
    "requirements": {
      "Angelic": 1
    },
    "group": "Light magic",
    "tile": 37
  },
  "Healing Aura": {
    "name": "Healing Aura",
    "maxXp": 100,
    "effect": -0.01,
    "description": "Expenses",
    "requirements": {
      "Angelic": 1,
      "Divine Blessing": 20
    },
    "group": "Light magic",
    "tile": 38
  },
  "Pure Heart": {
    "name": "Pure Heart",
    "maxXp": 100,
    "effect": 0.01,
    "description": "Angelic Lvl. at rebirth",
    "isPlusDescription": true,
    "requirements": {
      "Angelic": 1,
      "Healing Aura": 20
    },
    "group": "Light magic",
    "tile": 39
  },
  "Angel's Guidance": {
    "name": "Angel's Guidance",
    "maxXp": 100,
    "effect": 0.01,
    "description": "All xp",
    "requirements": {
      "Angelic": 25,
      "Pure Heart": 20
    },
    "group": "Light magic",
    "tile": 40
  },
  "Spiritual Meditation": {
    "name": "Spiritual Meditation",
    "maxXp": 100,
    "effect": 0.1,
    "description": "Angelic Lvl. at rebirth",
    "isPlusDescription": true,
    "requirements": {
      "Angelic": 75,
      "Pure Heart": 200
    },
    "group": "Light magic",
    "tile": 41
  },
  "Bountiful Grace": {
    "name": "Bountiful Grace",
    "maxXp": 100,
    "effect": 0.002,
    "description": "Job pay",
    "requirements": {
      "Angelic": 400,
      "Spiritual Meditation": 200
    },
    "group": "Light magic",
    "tile": 42
  },
  "Homeless": {
    "name": "Homeless",
    "expense": 0,
    "effect": 1,
    "requirements": {},
    "group": "Properties",
    "tile": 43
  },
  "Tent": {
    "name": "Tent",
    "expense": 15,
    "effect": 1.4,
    "requirements": {},
    "group": "Properties",
    "tile": 44
  },
  "Wooden hut": {
    "name": "Wooden hut",
    "expense": 100,
    "effect": 2,
    "requirements": {
      "Coins": 10000
    },
    "group": "Properties",
    "tile": 45
  },
  "Cottage": {
    "name": "Cottage",
    "expense": 750,
    "effect": 3.5,
    "requirements": {
      "Coins": 75000
    },
    "group": "Properties",
    "tile": 46
  },
  "House": {
    "name": "House",
    "expense": 3000,
    "effect": 6,
    "requirements": {
      "Coins": 300000
    },
    "group": "Properties",
    "tile": 47
  },
  "Large house": {
    "name": "Large house",
    "expense": 25000,
    "effect": 12,
    "requirements": {
      "Coins": 2500000
    },
    "group": "Properties",
    "tile": 48
  },
  "Small palace": {
    "name": "Small palace",
    "expense": 300000,
    "effect": 25,
    "requirements": {
      "Coins": 30000000
    },
    "group": "Properties",
    "tile": 49
  },
  "Grand palace": {
    "name": "Grand palace",
    "expense": 5000000,
    "effect": 60,
    "requirements": {
      "Coins": 500000000
    },
    "group": "Properties",
    "tile": 50
  },
  "Mansion": {
    "name": "Mansion",
    "expense": 30000000,
    "effect": 180,
    "requirements": {
      "Coins": 3000000000
    },
    "group": "Properties",
    "tile": 51
  },
  "Book": {
    "name": "Book",
    "expense": 10,
    "effect": 1.5,
    "description": "Skill xp",
    "requirements": {},
    "group": "Misc",
    "tile": 52
  },
  "Dumbbells": {
    "name": "Dumbbells",
    "expense": 50,
    "effect": 1.5,
    "description": "Strength xp",
    "requirements": {
      "Coins": 5000
    },
    "group": "Misc",
    "tile": 53
  },
  "Personal squire": {
    "name": "Personal squire",
    "expense": 200,
    "effect": 2,
    "description": "Job xp",
    "requirements": {
      "Coins": 20000
    },
    "group": "Misc",
    "tile": 54
  },
  "Steel longsword": {
    "name": "Steel longsword",
    "expense": 1000,
    "effect": 2,
    "description": "Military xp",
    "requirements": {
      "Coins": 100000
    },
    "group": "Misc",
    "tile": 55
  },
  "Butler": {
    "name": "Butler",
    "expense": 7500,
    "effect": 1.5,
    "description": "Happiness",
    "requirements": {
      "Coins": 750000
    },
    "group": "Misc",
    "tile": 56
  },
  "Sapphire charm": {
    "name": "Sapphire charm",
    "expense": 50000,
    "effect": 3,
    "description": "Magic xp",
    "requirements": {
      "Coins": 5000000
    },
    "group": "Misc",
    "tile": 57
  },
  "Study desk": {
    "name": "Study desk",
    "expense": 1000000,
    "effect": 2,
    "description": "Skill xp",
    "requirements": {
      "Coins": 100000000
    },
    "group": "Misc",
    "tile": 58
  },
  "Library": {
    "name": "Library",
    "expense": 10000000,
    "effect": 1.5,
    "description": "Skill xp",
    "requirements": {
      "Coins": 1000000000
    },
    "group": "Misc",
    "tile": 59
  }
};
const artIndex = {
  "avatar_isabella_120_angelic": 60,
  "avatar_isabella_120_evil": 61,
  "avatar_isabella_14": 62,
  "avatar_isabella_14_angelic": 63,
  "avatar_isabella_14_evil": 64,
  "avatar_isabella_30": 65,
  "avatar_isabella_30_angelic": 66,
  "avatar_isabella_30_evil": 67,
  "avatar_isabella_45": 68,
  "avatar_isabella_45_angelic": 69,
  "avatar_isabella_45_evil": 70,
  "avatar_isabella_60": 71,
  "avatar_isabella_60_angelic": 72,
  "avatar_isabella_60_evil": 73,
  "avatar_isabella_dead": 74,
  "avatar_isabella_dead_angelic": 75,
  "avatar_isabella_dead_evil": 76,
  "avatar_magnus_120_angelic": 77,
  "avatar_magnus_120_evil": 78,
  "avatar_magnus_14": 79,
  "avatar_magnus_14_angelic": 80,
  "avatar_magnus_14_evil": 81,
  "avatar_magnus_30": 82,
  "avatar_magnus_30_angelic": 83,
  "avatar_magnus_30_evil": 84,
  "avatar_magnus_45": 85,
  "avatar_magnus_45_angelic": 86,
  "avatar_magnus_45_evil": 87,
  "avatar_magnus_60": 88,
  "avatar_magnus_60_angelic": 89,
  "avatar_magnus_60_evil": 90,
  "avatar_magnus_dead": 91,
  "avatar_magnus_dead_angelic": 92,
  "avatar_magnus_dead_evil": 93,
  "endgame": 94,
  "icons_amulet_200_angelic_transparent": 95,
  "icons_amulet_200_evil": 96,
  "icons_amulet_200_evil_transparent": 97,
  "icons_amulet_25": 98,
  "icons_amulet_45": 99,
  "icons_amulet_65": 100,
  "icons_amulet_65_transparent": 101,
  "icons_amulet_broken_angelic": 102,
  "icons_amulet_broken_evil": 103,
  "icons_angelicorb": 104,
  "icons_evilorb": 105
};
const atlasRows = 11;
