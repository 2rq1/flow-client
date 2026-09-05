// Flow Client Modules Database - 100% Extracted from Flow Client Java Source
const FLOW_CATEGORIES = [
  { id: 'COMBAT', name: 'Combat', icon: 'swords', description: 'Advanced PvP, crystal speed & combat assistance' },
  { id: 'RENDER', name: 'Render', icon: 'eye', description: 'World visualizers, ESPs, tracers & chams' },
  { id: 'MISC', name: 'Misc', icon: 'sparkles', description: 'Movement, automation, utility & stealth helpers' },
  { id: 'DONUT', name: 'Donut', icon: 'zap', description: 'Specialized DonutSMP base hunting & exploit suite' },
  { id: 'CLIENT', name: 'Client', icon: 'sliders', description: 'HUD customization, Spotify sync & config manager' }
];

const FLOW_MODULES = [
  // ==================== COMBAT ====================
  {
    name: 'Auto Totem',
    key: 'AUTOTOTEM',
    category: 'COMBAT',
    description: 'Automatically switches totems into offhand with smart health threshold & double-hand protection',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Health Threshold', value: 16.0, min: 1.0, max: 20.0, step: 0.5 },
      { type: 'boolean', name: 'Smart Swap', value: true },
      { type: 'boolean', name: 'Double Hand Mode', value: true },
      { type: 'number', name: 'Swap Delay (ms)', value: 0.0, min: 0.0, max: 150.0, step: 10.0 },
      { type: 'boolean', name: 'Strict Anticheat', value: false },
      { type: 'boolean', name: 'GrimAC Bypass', value: true }
    ]
  },
  {
    name: 'AutoDoubleHand',
    key: 'AUTODOUBLEHAND',
    category: 'COMBAT',
    description: 'Equips a totem in offhand automatically whenever engaging in combat or holding weapons',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Weapon Trigger', value: true },
      { type: 'boolean', name: 'Crystal Trigger', value: true },
      { type: 'number', name: 'Delay (ms)', value: 20.0, min: 0.0, max: 100.0, step: 5.0 }
    ]
  },
  {
    name: 'Auto Anchor',
    key: 'AUTOANCHOR',
    category: 'COMBAT',
    description: 'High-speed Respawn Anchor placer, glowstone charger and detonator with anti-self damage',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Placing Speed (ms)', value: 15.0, min: 0.0, max: 200.0, step: 5.0 },
      { type: 'number', name: 'Max Self Damage', value: 6.0, min: 0.0, max: 20.0, step: 1.0 },
      { type: 'boolean', name: 'Auto Switch', value: true },
      { type: 'boolean', name: 'Predict Movement', value: true }
    ]
  },
  {
    name: 'Auto Crystal',
    key: 'AUTOCRYSTAL',
    category: 'COMBAT',
    description: 'Blistering fast End Crystal placing and breaking engine with intelligent target raycasting',
    enabled: false,
    keybind: 'C',
    settings: [
      { type: 'number', name: 'Place Delay', value: 0.0, min: 0.0, max: 100.0, step: 5.0 },
      { type: 'number', name: 'Break Delay', value: 0.0, min: 0.0, max: 100.0, step: 5.0 },
      { type: 'number', name: 'Target Range', value: 5.2, min: 3.0, max: 6.0, step: 0.1 },
      { type: 'number', name: 'Min Enemy Damage', value: 8.5, min: 1.0, max: 20.0, step: 0.5 },
      { type: 'number', name: 'Max Self Damage', value: 5.0, min: 0.0, max: 15.0, step: 0.5 },
      { type: 'boolean', name: 'Anti Suicide', value: true },
      { type: 'boolean', name: 'Sequential Break', value: true },
      { type: 'boolean', name: 'Raytrace Check', value: true }
    ]
  },
  {
    name: 'AutoClicker',
    key: 'AUTOCLICKER',
    category: 'COMBAT',
    description: 'Humanized left and right auto clicker with randomized jitter and legit CPS curve distributions',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Min CPS', value: 12.0, min: 1.0, max: 20.0, step: 0.5 },
      { type: 'number', name: 'Max CPS', value: 16.5, min: 1.0, max: 24.0, step: 0.5 },
      { type: 'boolean', name: 'Random Jitter', value: true },
      { type: 'boolean', name: 'Only Weapons', value: true },
      { type: 'boolean', name: 'Break Blocks Check', value: true }
    ]
  },
  {
    name: 'TriggerBot',
    key: 'TRIGGERBOT',
    category: 'COMBAT',
    description: 'Automatically strikes opponents the microsecond your crosshair aligns with their hitbox',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Hit Delay (ms)', value: 50.0, min: 0.0, max: 300.0, step: 10.0 },
      { type: 'number', name: 'Reach Limit', value: 3.8, min: 3.0, max: 5.0, step: 0.1 },
      { type: 'boolean', name: 'Criticals Sync', value: true },
      { type: 'boolean', name: 'Weapon Only', value: true }
    ]
  },
  {
    name: 'Aim Assist',
    key: 'AIMASSIST',
    category: 'COMBAT',
    description: 'Subtle, humanized crosshair magnetic pull towards opponent heads with smooth Bezier interpolation',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Horizontal Speed', value: 3.5, min: 0.5, max: 10.0, step: 0.5 },
      { type: 'number', name: 'Vertical Speed', value: 2.0, min: 0.5, max: 10.0, step: 0.5 },
      { type: 'number', name: 'FOV Radius', value: 65.0, min: 10.0, max: 180.0, step: 5.0 },
      { type: 'boolean', name: 'Lock On Target', value: false },
      { type: 'boolean', name: 'Ignore Invisibles', value: false }
    ]
  },
  {
    name: 'Hitbox',
    key: 'HITBOX',
    category: 'COMBAT',
    description: 'Expands opponent entity collision hitboxes slightly for ultra-reliable sword & crystal hits',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Hitbox Expansion', value: 0.25, min: 0.0, max: 1.5, step: 0.05 },
      { type: 'boolean', name: 'Show Hitbox Boxes', value: false }
    ]
  },

  // ==================== RENDER ====================
  {
    name: 'Block ESP',
    key: 'BLOCKESP',
    category: 'RENDER',
    description: 'Highlights custom chosen blocks through solid walls with outline and fill shaders',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Scan Radius', value: 48.0, min: 8.0, max: 128.0, step: 8.0 },
      { type: 'color', name: 'Color', value: 0x38BDF8 },
      { type: 'boolean', name: 'Tracers', value: false },
      { type: 'boolean', name: 'Show Nametags', value: true }
    ]
  },
  {
    name: 'Geode ESP',
    key: 'GEODEESP',
    category: 'RENDER',
    description: 'Locates Amethyst Geodes, budding amethyst blocks, and crystal clusters under terrain',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Budding Only', value: true },
      { type: 'color', name: 'Color', value: 0xA855F7 },
      { type: 'boolean', name: 'Tracers', value: false }
    ]
  },
  {
    name: 'Storage ESP',
    key: 'STORAGEESP',
    category: 'RENDER',
    description: 'Highlights all chests, trapped chests, shulker boxes, barrels, and ender chests through walls',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Chests', value: true },
      { type: 'boolean', name: 'Shulkers', value: true },
      { type: 'boolean', name: 'Barrels', value: true },
      { type: 'boolean', name: 'Ender Chests', value: true },
      { type: 'boolean', name: 'Tracers', value: false },
      { type: 'number', name: 'Scan Range', value: 128.0, min: 16.0, max: 1024.0, step: 16.0 },
      { type: 'color', name: 'Chest Color', value: 0xFBBF24 },
      { type: 'color', name: 'Shulker Color', value: 0xF472B6 },
      { type: 'color', name: 'Barrel Color', value: 0x8B4513 },
      { type: 'color', name: 'EnderChest Color', value: 0x38BDF8 }
    ]
  },
  {
    name: 'Spawner ESP',
    key: 'SPAWNERESP',
    category: 'RENDER',
    description: 'Locates mob spawners with 3D chams, beacon beams, distance nametags, and sound alerts',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Chams', value: true },
      { type: 'boolean', name: 'Beacon Beam', value: true },
      { type: 'boolean', name: 'Tracers', value: true },
      { type: 'boolean', name: 'Name Tags', value: true },
      { type: 'boolean', name: 'Notifications', value: true },
      { type: 'number', name: 'Range', value: 64.0, min: 16.0, max: 128.0, step: 8.0 },
      { type: 'color', name: 'Color', value: 0xFF9900 }
    ]
  },
  {
    name: 'Player ESP',
    key: 'PLAYERESP',
    category: 'RENDER',
    description: 'Highlights nearby players and entities with glowing outlines, bounding boxes, and tracers',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Chams', value: true },
      { type: 'boolean', name: 'Tracers', value: true },
      { type: 'boolean', name: 'Include All Mobs', value: false },
      { type: 'number', name: 'Opacity', value: 0.9, min: 0.1, max: 1.0, step: 0.05 },
      { type: 'color', name: 'Player Color', value: 0x00E5FF },
      { type: 'color', name: 'Mob Color', value: 0x10B981 }
    ]
  },
  {
    name: 'Hole ESP',
    key: 'HOLEESP',
    category: 'RENDER',
    description: 'Highlights 1x1 obsidian and unbreakable bedrock holes for strategic Crystal PvP positioning',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Radius', value: 8.0, min: 4.0, max: 24.0, step: 2.0 },
      { type: 'color', name: 'Bedrock Color', value: 0x10B981 },
      { type: 'color', name: 'Obsidian Color', value: 0xEF4444 }
    ]
  },
  {
    name: 'Pearl ESP',
    key: 'PEARLESP',
    category: 'RENDER',
    description: 'Highlights flying Ender Pearls in mid-air and traces exact predicted landing positions',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Tracers', value: true },
      { type: 'color', name: 'Pearl Color', value: 0x8B5CF6 }
    ]
  },
  {
    name: 'Item ESP',
    key: 'ITEMESP',
    category: 'RENDER',
    description: 'Highlights all dropped ground loot, enchanted gear, and item stacks through obstacles',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'color', name: 'Color', value: 0xFFFF00 }
    ]
  },
  {
    name: 'Mob ESP',
    key: 'MOBESP',
    category: 'RENDER',
    description: 'Renders bounding boxes and glowing silhouettes on hostile and passive entities',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'color', name: 'Hostile Color', value: 0xFF2222 }
    ]
  },
  {
    name: 'Breadcrumbs',
    key: 'BREADCRUMBS',
    category: 'RENDER',
    description: 'Leaves a smooth luminous 3D trail tracing the path you have traveled',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Trail Length', value: 100.0, min: 20.0, max: 500.0, step: 20.0 },
      { type: 'color', name: 'Trail Color', value: 0x38BDF8 }
    ]
  },
  {
    name: 'Fullbright',
    key: 'FULLBRIGHT',
    category: 'RENDER',
    description: 'Provides permanent maximum night vision gamma without needing potions',
    enabled: true,
    keybind: 'B',
    settings: [
      { type: 'number', name: 'Gamma Multiplier', value: 15.0, min: 1.0, max: 20.0, step: 1.0 }
    ]
  },
  {
    name: 'NoRender',
    key: 'NORENDER',
    category: 'RENDER',
    description: 'Disables screen shake, rain, thunderstorm, blinding darkness, fire overlay, and explosion dust',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Rain', value: true },
      { type: 'boolean', name: 'Thunderstorm', value: true },
      { type: 'boolean', name: 'Clouds', value: true },
      { type: 'boolean', name: 'Fire Overlay', value: true },
      { type: 'boolean', name: 'Blindness & Darkness', value: true },
      { type: 'boolean', name: 'Totem Animation', value: false },
      { type: 'boolean', name: 'Explosion Smoke / Dust', value: true }
    ]
  },
  {
    name: 'Freecam',
    key: 'FREECAM',
    category: 'RENDER',
    description: 'Detaches camera from player body to freely scout through underground caverns & bases',
    enabled: false,
    keybind: 'U',
    settings: [
      { type: 'number', name: 'Flight Speed', value: 1.5, min: 0.2, max: 5.0, step: 0.1 },
      { type: 'boolean', name: 'Freeze Player Movement', value: true }
    ]
  },
  {
    name: 'Target HUD',
    key: 'TARGETHUD',
    category: 'RENDER',
    description: 'Displays a glassmorphic HUD showing the targeted enemy\'s health bar, ping, distance, and armor durability',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'X', value: 400.0, min: 0.0, max: 1920.0, step: 10.0 },
      { type: 'number', name: 'Y', value: 300.0, min: 0.0, max: 1080.0, step: 10.0 }
    ]
  },

  // ==================== MISC ====================
  {
    name: 'Scaffold',
    key: 'SCAFFOLD',
    category: 'MISC',
    description: 'Bridges blocks under your feet automatically with sprint support and tower modes',
    enabled: false,
    keybind: 'X',
    settings: [
      { type: 'boolean', name: 'Sprint Scaffold', value: true },
      { type: 'boolean', name: 'Tower Mode', value: true },
      { type: 'boolean', name: 'Down Scaffold', value: false },
      { type: 'number', name: 'Place Delay (ms)', value: 0.0, min: 0.0, max: 100.0, step: 5.0 }
    ]
  },
  {
    name: 'SafeWalk',
    key: 'SAFEWALK',
    category: 'MISC',
    description: 'Prevents player from walking or slipping off edge blocks over lethal drops and lava',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Sneak at Edge', value: true }
    ]
  },
  {
    name: 'Auto Sprint',
    key: 'AUTOSPRINT',
    category: 'MISC',
    description: 'Keeps sprinting active continuously whenever moving forward',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Omni Sprint', value: true }
    ]
  },
  {
    name: 'AutoArmor',
    key: 'AUTOARMOR',
    category: 'MISC',
    description: 'Automatically analyzes inventory and equips the highest protection armor pieces',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Equip Delay (ms)', value: 60.0, min: 0.0, max: 200.0, step: 10.0 },
      { type: 'boolean', name: 'Prefer Elytra', value: false }
    ]
  },
  {
    name: 'NameProtect',
    key: 'NAMEPROTECT',
    category: 'MISC',
    description: 'Replaces your real Minecraft gamertag and friends\' names locally with custom aliases for streaming',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'string', name: 'Fake Name', value: 'FlowUser' },
      { type: 'boolean', name: 'Protect Friends', value: true }
    ]
  },
  {
    name: 'Fast Place',
    key: 'FASTPLACE',
    category: 'MISC',
    description: 'Removes the 4-tick right-click delay for lightning fast block and item placement',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Tick Delay', value: 0.0, min: 0.0, max: 3.0, step: 1.0 },
      { type: 'boolean', name: 'Blocks Only', value: false },
      { type: 'boolean', name: 'Projectiles Only', value: false }
    ]
  },
  {
    name: 'Fast Ladder',
    key: 'FASTLADDER',
    category: 'MISC',
    description: 'Climbs up and down ladders and vines at multiplied velocity',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Ascend Speed', value: 2.2, min: 1.0, max: 5.0, step: 0.2 }
    ]
  },
  {
    name: 'Key Pearl',
    key: 'KEYPEARL',
    category: 'MISC',
    description: 'Instantly throws an ender pearl on hotkey press without manual hotbar swapping',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Silent Hotbar Swap', value: true }
    ]
  },
  {
    name: 'ElytraFly',
    key: 'ELYTRAFLY',
    category: 'MISC',
    description: 'Glide effortlessly through the air with pitch-independent velocity and firework bypass',
    enabled: false,
    keybind: 'R',
    settings: [
      { type: 'number', name: 'Horizontal Speed', value: 2.5, min: 0.5, max: 8.0, step: 0.5 },
      { type: 'number', name: 'Vertical Speed', value: 1.2, min: 0.2, max: 4.0, step: 0.2 },
      { type: 'boolean', name: 'Infinite Glide', value: true },
      { type: 'boolean', name: 'Anti Crash', value: true }
    ]
  },
  {
    name: 'Weather Alert',
    key: 'WEATHERALERT',
    category: 'MISC',
    description: 'Sends instant alerts right before rain or thunderstorms hit so you can use Riptide trident',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Chat Alert', value: true },
      { type: 'boolean', name: 'Sound Alert', value: true }
    ]
  },
  {
    name: 'Auto Tool',
    key: 'AUTOTOOL',
    category: 'MISC',
    description: 'Automatically switches to the fastest tool in hotbar before breaking any block',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Switch Back to Weapon', value: true },
      { type: 'boolean', name: 'Save Tool Durability', value: true }
    ]
  },
  {
    name: 'Auto Mine',
    key: 'AUTOMINE',
    category: 'MISC',
    description: 'Keeps breaking target blocks continuously without holding down left mouse click',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Packet Mining', value: false }
    ]
  },
  {
    name: 'Auto Eat',
    key: 'AUTOEAT',
    category: 'MISC',
    description: 'Automatically pauses and eats food from offhand/hotbar when hunger falls below threshold',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Hunger Threshold', value: 14.0, min: 6.0, max: 19.0, step: 1.0 },
      { type: 'boolean', name: 'Prefer Golden Apples', value: true }
    ]
  },
  {
    name: 'Auto Steal',
    key: 'AUTOSTEAL',
    category: 'MISC',
    description: 'Instantly dumps valuable items from chests and shulkers into inventory upon opening',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Slot Delay (ms)', value: 25.0, min: 0.0, max: 150.0, step: 5.0 },
      { type: 'boolean', name: 'Valuables Only', value: true },
      { type: 'boolean', name: 'Auto Close', value: true }
    ]
  },
  {
    name: 'Auto Web',
    key: 'AUTOWEB',
    category: 'MISC',
    description: 'Instantly places cobwebs at targeted opponent\'s feet to trap them in crystal combat',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Placement Range', value: 4.5, min: 2.0, max: 6.0, step: 0.5 }
    ]
  },
  {
    name: 'Coords Snapper',
    key: 'COORDSSNAPPER',
    category: 'MISC',
    description: 'Copies current coordinates, dimension, and compass heading to clipboard on hotkey',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Send to Party Chat', value: false },
      { type: 'boolean', name: 'Include Nether Link', value: true }
    ]
  },
  {
    name: 'Swing Speed',
    key: 'SWINGSPEED',
    category: 'MISC',
    description: 'Modifies hand animation swing speed for satisfying fluid visual feedback',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Speed Multiplier', value: 1.5, min: 0.2, max: 3.0, step: 0.1 }
    ]
  },

  // ==================== DONUT (DONUTSMP SUITE) ====================
  {
    name: 'Sus Chunk Finder',
    key: 'SUSCHUNKFINDER',
    category: 'DONUT',
    description: 'Multi-signal intelligent chunk scanner pinpointing underground bases, stashes, rotated deepslate & obsidian vaults',
    enabled: true,
    keybind: 'NONE',
    highlight: true,
    settings: [
      { type: 'number', name: 'Sim Distance', value: 4.0, min: 1.0, max: 32.0, step: 1.0 },
      { type: 'number', name: 'Sensitivity', value: 5.0, min: 1.0, max: 20.0, step: 1.0 },
      { type: 'boolean', name: 'Tracers', value: true },
      { type: 'boolean', name: 'Nametags', value: true },
      { type: 'boolean', name: 'Notification', value: true },
      { type: 'color', name: 'Color', value: 0x0078FF },
      { type: 'boolean', name: 'Underground Containers', value: true },
      { type: 'boolean', name: 'Armor Stands & Frames', value: true },
      { type: 'boolean', name: 'Workstations & Beds', value: true },
      { type: 'boolean', name: 'Obsidian & Portals', value: true },
      { type: 'boolean', name: 'Rotated Deepslate', value: true },
      { type: 'boolean', name: 'Redstone Machinery', value: true },
      { type: 'boolean', name: 'Underground Lights', value: true },
      { type: 'boolean', name: 'Villagers & Tamed Mobs', value: true },
      { type: 'boolean', name: 'Multi-Geode Hubs', value: true },
      { type: 'number', name: 'Min Geode Mass', value: 260.0, min: 150.0, max: 800.0, step: 20.0 },
      { type: 'boolean', name: 'Kelp Farms', value: false },
      { type: 'boolean', name: 'Cave Vines', value: false },
      { type: 'boolean', name: 'Vines', value: false },
      { type: 'boolean', name: 'Bamboo', value: false },
      { type: 'boolean', name: 'Bee Nests', value: false }
    ]
  },
  {
    name: 'Staff Detector',
    key: 'STAFFDETECTOR',
    category: 'DONUT',
    description: 'Detects staff members joining, spectating in vanish, or switching gamemodes with auto-disconnect safety',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Auto Disconnect', value: false },
      { type: 'boolean', name: 'Audio Alarm', value: true },
      { type: 'boolean', name: 'Vanish Detection', value: true },
      { type: 'boolean', name: 'Log to Discord', value: false }
    ]
  },
  {
    name: 'Stash Finder',
    key: 'STASHFINDER',
    category: 'DONUT',
    description: 'Flags dense clusters of chests, shulker boxes, and hoppers indicating major player stashes',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Min Containers', value: 12.0, min: 4.0, max: 64.0, step: 2.0 },
      { type: 'number', name: 'Scan Radius', value: 128.0, min: 32.0, max: 512.0, step: 16.0 },
      { type: 'boolean', name: 'Tracer to Stash', value: true },
      { type: 'boolean', name: 'Log Coordinates', value: true }
    ]
  },
  {
    name: 'Netherite Finder',
    key: 'NETHERITEFINDER',
    category: 'DONUT',
    description: 'Highlights unmined Ancient Debris blocks in the Nether with box outlines and tracer lines',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Scan Radius', value: 64.0, min: 16.0, max: 128.0, step: 8.0 },
      { type: 'color', name: 'Color', value: 0x8B5A2B },
      { type: 'boolean', name: 'Tracers', value: true }
    ]
  },
  {
    name: 'Shulker Dropper',
    key: 'SHULKERDROPPER',
    category: 'DONUT',
    description: 'Rapidly dumps shulker box contents onto ground for instantaneous stash looting during raids',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'number', name: 'Drop Speed (ms)', value: 10.0, min: 0.0, max: 100.0, step: 5.0 }
    ]
  },
  {
    name: 'Redstone ESP',
    key: 'REDSTONEESP',
    category: 'DONUT',
    description: 'Highlights underground observers, pistons, repeaters, and redstone clocks used in hidden bases',
    enabled: false,
    keybind: 'NONE',
    settings: [
      { type: 'color', name: 'Color', value: 0xFF2222 },
      { type: 'boolean', name: 'Tracers', value: false }
    ]
  },

  // ==================== CLIENT ====================
  {
    name: 'Flow+',
    key: 'FLOWPLUS',
    category: 'CLIENT',
    description: 'Customizable persistent in-game HUD overlay displaying Watermark, FPS, Ping, Biome, and Coords',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Watermark', value: true },
      { type: 'boolean', name: 'FPS & Ping', value: true },
      { type: 'boolean', name: 'Coordinates', value: true },
      { type: 'boolean', name: 'Nether Coords', value: false },
      { type: 'boolean', name: 'Real Time', value: true },
      { type: 'boolean', name: 'Biome & Facing', value: true },
      { type: 'boolean', name: 'Radar', value: false }
    ]
  },
  {
    name: 'HUD',
    key: 'HUD',
    category: 'CLIENT',
    description: 'Renders the live animated active module list with customizable color gradients and font styling',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Rainbow Gradient', value: false },
      { type: 'color', name: 'Accent Color', value: 0x38BDF8 },
      { type: 'boolean', name: 'Show Suffixes', value: true },
      { type: 'boolean', name: 'Sound on Toggle', value: true }
    ]
  },
  {
    name: 'Spotify HUD',
    key: 'SPOTIFYHUD',
    category: 'CLIENT',
    description: 'Displays your currently playing Spotify track with album art and interactive media controls',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Spotify Icon', value: true },
      { type: 'color', name: 'Accent Color', value: 0x1DB954 }
    ]
  },
  {
    name: 'DiscordRPC',
    key: 'DISCORDRPC',
    category: 'CLIENT',
    description: 'Displays "Playing Flow Client 1.21.11" with the elegant wave banner on your Discord profile',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Show Server / World', value: true },
      { type: 'boolean', name: 'Show Elapsed Time', value: true }
    ]
  },
  {
    name: 'Friends & Configs',
    key: 'CONFIGSYSTEM',
    category: 'CLIENT',
    description: 'Quickly save, load, and manage client configuration profiles and bypass presets',
    enabled: true,
    keybind: 'NONE',
    settings: [
      { type: 'boolean', name: 'Auto Save on Close', value: true },
      { type: 'button', name: 'Save Default Config' },
      { type: 'button', name: 'Load Default Config' }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FLOW_CATEGORIES, FLOW_MODULES };
}
