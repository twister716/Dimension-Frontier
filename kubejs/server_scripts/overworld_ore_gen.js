ServerEvents.registry('neoforge:biome_modifier', event => {
    event.create('dimension_frontier:add_overworld_ores', 'add_features')
        .biomes('#minecraft:is_overworld')
        .step('underground_ores')
        .features('#dimension_frontier:worldgen/overworld_ores')
})


    // Tin
ServerEvents.registry('worldgen/configured_feature', event => {
    event.create('dimension_frontier:ore_tin', 'ore')
        .size(12)
        .target({
            target: { predicate_type: 'minecraft:tag_match', tag: 'minecraft:stone_ore_replaceables' },
            state: 'alltheores:tin_ore'
        })
        .target({
            target: { predicate_type: 'minecraft:tag_match', tag: 'minecraft:deepslate_ore_replaceables' },
            state: 'alltheores:deepslate_tin_ore'
        })
        .withPlacement(placement => {
            placement.tag('dimension_frontier:worldgen/overworld_ores')
                .modifiers(m => {
                    m.minecraft
                        .count(10)
                        .inSquare()
                        .triangleHeightRange(-64, 196)
                        .biome()
                })
        })

    // Silver
    event.create('dimension_frontier:ore_silver', 'ore')
        .size(7)
        .target({
            target: { predicate_type: 'minecraft:tag_match', tag: 'minecraft:stone_ore_replaceables' },
            state: 'alltheores:silver_ore'
        })
        .target({
            target: { predicate_type: 'minecraft:tag_match', tag: 'minecraft:deepslate_ore_replaceables' },
            state: 'alltheores:deepslate_silver_ore'
        })
        .withPlacement(placement => {
            placement.tag('dimension_frontier:worldgen/overworld_ores')
                .modifiers(m => {
                    m.minecraft
                        .count(6)
                        .inSquare()
                        .triangleHeightRange(-92, 32)
                        .biome()
                })
        })

    // Black Quartz
    event.create('dimension_frontier:ore_deepslate_black_quartz', 'ore')
        .size(8)
        .target({
            target: { predicate_type: 'minecraft:tag_match', tag: 'minecraft:stone_ore_replaceables' },
            state: 'actuallyadditions:black_quartz_ore'
        })
        .target({
            target: { predicate_type: 'minecraft:tag_match', tag: 'minecraft:deepslate_ore_replaceables' },
            state: 'dimension_frontier:deepslate_black_quartz_ore'
        })
        .withPlacement(placement => {
            placement.tag('dimension_frontier:worldgen/overworld_ores')
                .modifiers(m => {
                    m.minecraft
                        .count(6)
                        .inSquare()
                        .triangleHeightRange(-48, 48)
                        .biome()
                })
        })
})