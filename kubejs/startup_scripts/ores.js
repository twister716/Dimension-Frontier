StartupEvents.registry('block', event => {
  // Nether Iron Ore
  event.create('dimension_frontier:nether_iron_ore')
    .texture('dimension_frontier:block/nether_iron_ore')
    .soundType('nether_ore')
    .hardness(3.0)
    .resistance(3.0)
    .requiresTool(true)
    .tagBlock(['minecraft:mineable/pickaxe', 'minecraft:needs_stone_tool'])
    .tagBoth([
      'c:ores',
      'c:ores/iron',
      'c:ores_in_ground/netherrack',
      'minecraft:iron_ores'
    ])

  // Deepslate Black Quartz Ore
  event.create('dimension_frontier:deepslate_black_quartz_ore')
    .texture('dimension_frontier:block/deepslate_black_quartz_ore')
    .soundType('deepslate')
    .hardness(4.5)
    .resistance(10.0)
    .requiresTool(true)
    .tagBlock(['minecraft:mineable/pickaxe', 'minecraft:needs_stone_tool'])
    .tagBoth([
      'c:ores',
      'c:ores/black_quartz',
      'c:ores_in_ground/deepslate',
    ])
})
