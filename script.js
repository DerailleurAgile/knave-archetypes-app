// =========================================================================
// 1. DATA DICTIONARIES & SCHEMAS (Preserved Archetype & Career Architecture)
// =========================================================================

const ARCH = {
  blade: {
    name: "Blade",
    stat: "STR",
    prompt: "fight, force, and survive melee",
    bg: "var(--blade-bg)",
    border: "var(--blade-border)",
    txt: "var(--blade-txt)",
    mid: "var(--blade-mid)",
    pill: "background:var(--blade-bg);border-color:var(--blade-border);color:var(--blade-txt)",
  },
  shadow: {
    name: "Shadow",
    stat: "DEX",
    prompt: "steal, deceive, and disappear",
    bg: "var(--shadow-bg)",
    border: "var(--shadow-border)",
    txt: "var(--shadow-txt)",
    mid: "var(--shadow-mid)",
    pill: "background:var(--shadow-bg);border-color:var(--shadow-border);color:var(--shadow-txt)",
  },
  endurer: {
    name: "Endurer",
    stat: "CON",
    prompt: "outlast, resist, and carry more",
    bg: "var(--artisan-bg)",
    border: "var(--artisan-border)",
    txt: "var(--artisan-txt)",
    mid: "var(--artisan-mid)",
    pill: "background:var(--artisan-bg);border-color:var(--artisan-border);color:var(--artisan-txt)",
  },
  sage: {
    name: "Sage",
    stat: "INT",
    prompt: "know, deduce, brew, and cast",
    bg: "var(--sage-bg)",
    border: "var(--sage-border)",
    txt: "var(--sage-txt)",
    mid: "var(--sage-mid)",
    pill: "background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-txt)",
  },
  wayfarer: {
    name: "Wayfarer",
    stat: "WIS",
    prompt: "scout, track, survive, and shoot",
    bg: "var(--wayfarer-bg)",
    border: "var(--wayfarer-border)",
    txt: "var(--wayfarer-txt)",
    mid: "var(--wayfarer-mid)",
    pill: "background:var(--wayfarer-bg);border-color:var(--wayfarer-border);color:var(--wayfarer-txt)",
  },
  devoted: {
    name: "Devoted",
    stat: "CHA",
    prompt: "lead, command, channel, and persuade",
    bg: "var(--devoted-bg)",
    border: "var(--devoted-border)",
    txt: "var(--devoted-txt)",
    mid: "var(--devoted-mid)",
    pill: "background:var(--devoted-bg);border-color:var(--devoted-border);color:var(--devoted-txt)",
  },
};

// DIRECTION-SENSITIVE MATRIX — all 36 cells unique
// Key: 'PRIMARY-SECONDARY' (Row = Primary, Column = Secondary)
const MATRIX = {
  // ── DIAGONALS ────────────────────────────────────────────────────────────
  "blade-blade": {
    name: "the veteran",
    desc: "All you know is the fight. Hard-won scars and harder-won lessons. You have been hit by everything and you are still here.",
    eg: "Jaime Lannister, Conan, the old soldier who should have died ten years ago, a retired pit champion",
  },
  "shadow-shadow": {
    name: "the ghost",
    desc: "You barely exist. False names, false faces, false trails. You are whoever the moment requires, and when it is over, you were never there.",
    eg: "a master spy, a con artist at the peak of their game, a thief who has never once been seen",
  },
  "endurer-endurer": {
    name: "the survivor",
    desc: "You do not overcome hardship. You outlast it. Cold, poison, starvation, injury — you absorb everything and keep moving. You are the last one left.",
    eg: "a castaway who walked home, a prisoner who outlasted their captors, a hermit who has not been warm in a decade",
  },
  "sage-sage": {
    name: "the scholar",
    desc: "Knowledge is power and you intend to have all of it. You see patterns others dismiss as noise. You are probably right and probably insufferable about it.",
    eg: "a wizard past their prime, an archivist with an agenda, a polymath who never left the tower",
  },
  "wayfarer-wayfarer": {
    name: "the wanderer",
    desc: "The road is your home. You know every kind of country and how to read it. You do not pass through the wilderness — you live in it.",
    eg: "a lone wanderer, a scout who stopped reporting in, a hermit who moves rather than stays",
  },
  "devoted-devoted": {
    name: "the true believer",
    desc: "Everything you do, you do in service to something larger than yourself. Your patron, cause, or creed is not a tool — it is the point. This is either very noble or very dangerous.",
    eg: "a zealot with genuinely good intentions, a wandering saint, a high priest who has seen too much to doubt",
  },

  // ── BLADE PRIMARY ────────────────────────────────────────────────────────
  "blade-shadow": {
    name: "the skirmisher",
    desc: "You fight dirty. Steel and misdirection working together — feints, improvised weapons, sand in the eyes. You do not win fights cleanly; you win them decisively.",
    eg: "Bronn of the Blackwater, a cynical mercenary who fights to win, an arena fighter who has no honor and no wounds",
  },
  "blade-endurer": {
    name: "the iron wall",
    desc: "You absorb punishment that would break anyone else and keep fighting. You are not fast and not subtle — you are the last person standing at the end of a long, ugly engagement.",
    eg: "a siege anchor, a shield-bearer who holds the line, a pit fighter who just will not go down",
  },
  "blade-sage": {
    name: "the war-scholar",
    desc: "You study your enemies before you meet them. Combat is a problem with a correct solution and you work it out in advance. If you cannot, you adapt faster than they do.",
    eg: "a general who leads from the front, a warrior-monk who reads battle like scripture, a duelist who fights twice — once on paper, once in the yard",
  },
  "blade-wayfarer": {
    name: "the warden",
    desc: "You fight in the field, not on formal ground. You read terrain the way other soldiers read formations and use it as a weapon. The wild is your tactical advantage.",
    eg: "Aragorn as Strider, a border-guard who knows every pass, a ranger who has been at war with the forest for a decade",
  },
  "blade-devoted": {
    name: "the templar",
    desc: "Your sword is consecrated to a higher cause. You are a frontline crusader — violence as direct expression of holy decree, sovereign law, or ancient oath. Faith that can split armor.",
    eg: "a paladin who has made hard choices, a holy executioner, a knight-militant bound by blood oaths",
  },

  // ── SHADOW PRIMARY ───────────────────────────────────────────────────────
  "shadow-blade": {
    name: "the knife in the dark",
    desc: "You do not trade blows across a field. You slip past defenses and settle the matter with a single precise strike before anyone knows the fight has started. Violence as surgery.",
    eg: "an assassin-for-hire with a code, a syndicate cleaner, a duelist who never gives their target a fair chance",
  },
  "shadow-endurer": {
    name: "the escape artist",
    desc: "You get caught. That is part of the plan. What sets you apart is that you always get out — through pain, improvisation, and sheer refusal to stay where they put you.",
    eg: "a thief who treats prison as a revolving door, an operative who can walk away from anything, a spy who has been tortured and talked their way free",
  },
  "shadow-sage": {
    name: "the mastermind",
    desc: "You do not improvise. You prepare. Every identity is tailored, every exit pre-arranged, every guard bribed in advance. No plan survives contact with the enemy — except yours.",
    eg: "a spymaster, a high-stakes con artist who has never been caught, a black-market archivist who sells leverage",
  },
  "shadow-wayfarer": {
    name: "the outrider",
    desc: "You use terrain the way others use shadows — as cover, corridor, and escape route. You move fast and quiet through country that stops everyone else.",
    eg: "a smuggler who knows every back-road and hidden ford, a poacher who knows where the wardens sleep, a frontier scout who reports to no one",
  },
  "shadow-devoted": {
    name: "the silent hand",
    desc: "You carry out the unacknowledged will of your faith or patron from the dark. You are the shadow the altar casts. Whether your belief is genuine is between you and your god.",
    eg: "a spy for the church, an assassin for a trickster cult, a saboteur whose order cannot publicly acknowledge them",
  },

  // ── ENDURER PRIMARY ──────────────────────────────────────────────────────
  "endurer-blade": {
    name: "the juggernaut",
    desc: "You absorb the hit. Then you hit back. You are not a finesse fighter — you are a force of nature that has decided to move in one direction and has not stopped yet.",
    eg: "a berserker who cannot be put down, a wrestler who fights through broken ribs, a soldier who took three arrows and kept the wall",
  },
  "endurer-shadow": {
    name: "the feral",
    desc: "You survive by instinct and speed. Where others plan, you react. Cornered, you become unpredictable. You are difficult to catch, difficult to hold, and difficult to kill.",
    eg: "a wilderness fugitive, a street rat who grew up hard, a scout who operates too far from support to do anything but adapt",
  },
  "endurer-sage": {
    name: "the field scholar",
    desc: "You go where the knowledge is, no matter the conditions. Cold, altitude, hostile territory — you endure it because what you find there is worth it. You come back with things no one else has.",
    eg: "Indiana Jones, a field physician who works in war zones, a naturalist who winters in the mountains to study migration",
  },
  "endurer-wayfarer": {
    name: "the deepwalker",
    desc: "You go further than anyone else and you come back. Your body is built for distance and deprivation; your instincts keep you alive in places where maps run out.",
    eg: "a long-range pathfinder, an explorer who crossed the desert on foot, a diver who holds their breath too long and always surfaces",
  },
  "endurer-devoted": {
    name: "the immovable",
    desc: "Your faith is structural. It does not inspire — it anchors. You are the one the party looks to when everything is falling apart, not because you have answers, but because you have not moved.",
    eg: "a confessor who absorbed a century of other people's despair and kept going, a martyr-in-waiting who refuses to be one",
  },

  // ── SAGE PRIMARY ─────────────────────────────────────────────────────────
  "sage-blade": {
    name: "the spellsword",
    desc: "You picked up a weapon to protect your work. You see combat as a technical problem and magic as a force multiplier. You are not the strongest fighter in the room — but you are the most prepared.",
    eg: "an occult investigator, a scholar who guards forbidden grimoires with steel, an academic duelist who fights with annotations in the margins",
  },
  "sage-shadow": {
    name: "the apostate",
    desc: "You use your expertise to take things that are not yours. Research methods to locate the target; tradecraft to extract it. You are a thief who knows exactly what they are stealing and why it matters.",
    eg: "a defrocked alchemist who sells what the guild will not, an archivist who forges lineage papers, a thief of library vaults",
  },
  "sage-endurer": {
    name: "the artificer",
    desc: "You build things that last because you understand the principles behind them. Theory translated into durable physical objects — engines, instruments, fortifications, potions that actually work.",
    eg: "a clockwork engineer, a siege architect, a physician who designs their own instruments, a brewer whose recipes are documented",
  },
  "sage-wayfarer": {
    name: "the field naturalist",
    desc: "You systematize the world. You venture out of towers to catalog venomous flora, track migrations, analyze geological fractures, and document things that have no names yet.",
    eg: "an academic cartographer, a toxicologist collecting field samples, a naturalist who names the creature that tries to eat them",
  },
  "sage-devoted": {
    name: "the theurgist",
    desc: "Magic, faith, and reason are not separate fields for you. They are the same engine viewed from different angles. You study miracles the way an engineer studies a bridge — to understand the load.",
    eg: "an alchemist who prays over the crucible, a cleric who knows too much to be orthodox, Van Helsing",
  },

  // ── WAYFARER PRIMARY ─────────────────────────────────────────────────────
  "wayfarer-blade": {
    name: "the beast-slayer",
    desc: "You track dangerous quarry and close with it. You treat dangerous creatures as apex predators to study, trap, and fight on their own terms — not yours.",
    eg: "a monster hunter, a deep-woods tracker who had to learn to fight when the thing fought back, Kraven the Hunter",
  },
  "wayfarer-shadow": {
    name: "the poacher",
    desc: "You take what the crown says belongs to them. You move through the forest silently, set camouflaged snares, and disappear before the wardens know you were there.",
    eg: "Robin Hood, a forest outlaw, a grey-market trapper who sells what they catch to the wrong people",
  },
  "wayfarer-endurer": {
    name: "the pathfinder",
    desc: "You navigate extreme terrain and you survive it. Other scouts map what is safe; you map what is not, because someone has to know where the passes are before the army uses them.",
    eg: "a long-range wilderness scout, a mountain guide who has lost toes and keeps climbing, a sailor who charts the dangerous coast",
  },
  "wayfarer-sage": {
    name: "the cartographer",
    desc: "You observe the world systematically. Every hex has a theory; every creature deserves a name. You perceive things and then categorize them, because knowledge without order is noise.",
    eg: "Lara Croft, a naturalist-explorer, a geographer who maps anomalous zones and annotates what killed their predecessors",
  },
  "wayfarer-devoted": {
    name: "the oracle",
    desc: "You read the world as a text. Weather, terrain, the behavior of animals — all of it is meaningful. You perceive signs and you speak their meaning to those who will listen, or will not.",
    eg: "a seer who reads the land, a wandering prophet who is usually right, a shaman whose omens have a frustrating tendency to be correct",
  },

  // ── DEVOTED PRIMARY ───────────────────────────────────────────────────────
  "devoted-blade": {
    name: "the zealot",
    desc: "Your conviction has an edge. You do not wait for the institution to act — you pick up the iron yourself. Whether that is justice or fanaticism depends on who is asking.",
    eg: "an inquisitor who hunts personally, a religious enforcer, a warrior vindicating a broken oath in front of God",
  },
  "devoted-shadow": {
    name: "the heretic",
    desc: "You keep a banned faith alive. Cells, coded messages, midnight rites — you operate below the surface of an oppressive order and you have learned to be impossible to find.",
    eg: "a hidden priest of a destroyed order, a revolutionary whose ideology has been outlawed, John Constantine",
  },
  "devoted-endurer": {
    name: "the pastor",
    desc: "You serve your community in body as well as spirit. You mend bones, patch roofs, grow the herbs you use, and hold small villages together through things that would scatter everyone else.",
    eg: "a village priest who is also the doctor, Friar Tuck, a frontier preacher who works the fields alongside their congregation",
  },
  "devoted-sage": {
    name: "the monastic",
    desc: "You are the keeper of your order's memory. Lineages, relics, old accounts — you guard the institutional knowledge that tells your flock who they are and what they are for.",
    eg: "a high church scholar, Brother Cadfael, a theologian who has read everything and believes it",
  },
  "devoted-wayfarer": {
    name: "the pilgrim",
    desc: "You walk a long road for a higher purpose. The journey is the discipline. You have seen more of the world than most priests and more of faith than most travelers, and neither has made you stop.",
    eg: "a wandering monk, a desert prophet, a traveling healer, a palmer far from any holy land",
  },
};

// Careers bucketed by primary stat they map to in play.
// Many careers legitimately appear in two buckets (e.g. hunter = WIS for tracking + CON for exposure).
// Items are verbatim from the Knave 2e rulebook (p.5).
const ARCH_CAREERS = {
  // STR — melee, raw physical power, heavy labour, heavy craft
  blade: [
    "bandit",
    "beast tamer",
    "blacksmith",
    "butcher",
    "carpenter",
    "fence",
    "grave robber",
    "guard",
    "headsman",
    "jailer",
    "kidnapper",
    "knight",
    "mason",
    "pit fighter",
    "saboteur",
    "shipwright",
    "soldier",
    "squire",
    "thug",
    "torturer",
    "woodcutter",
  ],
  // DEX — agility, stealth, fine manual skill, sleight of hand
  shadow: [
    "acrobat",
    "actor",
    "assassin",
    "barber",
    "bookbinder",
    "burglar",
    "candlemaker",
    "charlatan",
    "cobbler",
    "coachman",
    "courtier",
    "cutpurse",
    "dyer",
    "fence",
    "gambler",
    "jester",
    "jeweler",
    "locksmith",
    "painter",
    "puppeteer",
    "rat catcher",
    "sculptor",
    "smuggler",
    "spy",
    "tailor",
    "tattooist",
    "thieftaker",
    "thug",
  ],
  // CON — endurance, hardiness, resisting exposure and deprivation
  endurer: [
    "baker",
    "beast tamer",
    "boatman",
    "brewer",
    "cook",
    "fisherman",
    "gamekeeper",
    "gardener",
    "gravedigger",
    "groom",
    "hermit",
    "hunter",
    "innkeeper",
    "miner",
    "pilgrim",
    "prospector",
    "sailor",
    "shepherd",
    "soldier",
    "trapper",
    "woodcutter",
  ],
  // INT — knowledge, cunning, arcane, calculation, craft-knowledge
  sage: [
    "alchemist",
    "antiquarian",
    "arcanist",
    "architect",
    "astrologer",
    "bookbinder",
    "folklorist",
    "herbalist",
    "investigator",
    "lawyer",
    "naturalist",
    "oracle",
    "philosopher",
    "physician",
    "playwright",
    "scribe",
  ],
  // WIS — perception, navigation, ranged attacks, foraging, reading the wild
  wayfarer: [
    "beast tamer",
    "beekeeper",
    "boatman",
    "courier",
    "explorer",
    "falconer",
    "fisherman",
    "gamekeeper",
    "herbalist",
    "hermit",
    "hunter",
    "naturalist",
    "peddler",
    "pilgrim",
    "pirate",
    "poacher",
    "prospector",
    "sailor",
    "scout",
    "shepherd",
    "trapper",
    "watchman",
  ],
  // CHA — persuasion, performance, leadership, patron blessings, initiative
  devoted: [
    "acolyte",
    "actor",
    "courtier",
    "cultist",
    "inquisitor",
    "jester",
    "knight",
    "lawyer",
    "merchant",
    "musician",
    "officer",
    "oracle",
    "orator",
    "philosopher",
    "pilgrim",
    "poet",
    "priest",
    "servant",
    "singer",
  ],
};

// Exact starting items per career, verbatim from Knave 2e p.5.
// Keys are lowercase career names to match toggleWizardCareer's normalisation.
const CAREER_ITEMS = {
  acolyte: ["Candlestick", "Censer", "Incense"],
  acrobat: ["Flash powder", "Balls", "Lamp oil"],
  actor: ["Wig", "Makeup", "Costume"],
  alchemist: ["Acid", "Mortar & pestle", "6 vials"],
  antiquarian: ["Old coin", "Flag", "Lore book"],
  arcanist: ["Spell book", "Arcane robes", "Chalk"],
  architect: ["Plumb line", "Level", "Ruler"],
  assassin: ["Crossbow", "Garrote", "Soft boots"],
  astrologer: ["Star charts", "Almanac", "Telescope"],
  baker: ["Rolling pin", "Flour bag", "Lard block"],
  bandit: ["Mask", "Manacles", "Caltrops"],
  barber: ["Scissors", "Hair oil", "Straight razor"],
  "beast tamer": ["Whip", "Gloves", "Leash"],
  beekeeper: ["Honey", "Mask", "Smoke bomb"],
  blacksmith: ["Hammer", "Bellows", "Tongs"],
  boatman: ["10' pole", "Instrument", "Paddle"],
  bookbinder: ["Sewing kit", "Glue", "Quill & ink"],
  brewer: ["Mash paddle", "Beer keg", "Hops"],
  burglar: ["Lockpicks", "Grappling hook", "Rope"],
  butcher: ["Cleaver", "Meat hook", "Bacon"],
  candlemaker: ["10 candles", "Lamp oil", "Wax"],
  carpenter: ["Hammer", "Saw", "Box of nails"],
  charlatan: ["Costume", "Fake elixir", "Degree"],
  cobbler: ["Leather roll", "Fancy shoes", "Tacks"],
  coachman: ["Whip", "Lockbox", "Oilskin coat"],
  cook: ["Frying pan", "Salt", "Olive oil"],
  courier: ["Oilskin bag", "Local map", "Lantern"],
  courtier: ["Perfume", "Wig", "Fan"],
  cultist: ["Dagger", "Ritual robes", "Amulet"],
  cutpurse: ["Knife", "Caltrops", "Sack"],
  dyer: ["10' pole", "Dyes", "Soap"],
  explorer: ["Sextant", "Spyglass", "Crampons"],
  falconer: ["Bird cage", "Gloves", "Whistle"],
  fence: ["Short sword", "File", "Sealing wax"],
  fisherman: ["Spear", "Net", "Fishing tackle"],
  folklorist: ["Prophecy", "Bones", "Scales"],
  gambler: ["Rapier", "Card deck", "Dice"],
  gamekeeper: ["Sling", "Horn", "Rope ladder"],
  gardener: ["Sickle", "Shovel", "Shears"],
  "grave robber": ["Saw", "Crowbar", "Pulleys"],
  gravedigger: ["Shovel", "Pickaxe", "Bucket"],
  groom: ["Oats", "Horse brush", "Blanket"],
  guard: ["Halberd", "Livery", "Horn"],
  headsman: ["Axe", "Hood", "Garrote"],
  herbalist: ["Herbs", "Sickle", "Herb manual"],
  hermit: ["Staff", "Fungi", "Basket"],
  hunter: ["Tent", "Bearskin", "Bear trap"],
  innkeeper: ["Ladle", "10 candles", "Cauldron"],
  inquisitor: ["Manual", "Vestments", "Pliers"],
  investigator: ["Journal", "Manacles", "Vial"],
  jailer: ["Padlock", "10' chain", "Wine jug"],
  jester: ["Scepter", "Donkey head", "Motley"],
  jeweler: ["Pliers", "Loupe", "Tweezers"],
  kidnapper: ["Chloroform", "Manacles", "Hood"],
  knight: ["Lady's favor", "Banner", "Signet ring"],
  lawyer: ["Fancy robe", "Law book", "Certificate"],
  locksmith: ["Crowbar", "Picks", "Padlock"],
  mason: ["Chisel", "Hammer", "Chalk"],
  merchant: ["Scales", "Strongbox", "Bag of spice"],
  miner: ["Pickaxe", "Lantern", "Pet canary"],
  musician: ["3 instruments"],
  naturalist: ["Fossil", "Insect case", "Geode"],
  officer: ["Shoe polish", "Medal", "Spyglass"],
  oracle: ["Tea leaves", "Tarot deck", "Crystal"],
  orator: ["100 marbles", "Bullhorn", "Wax tablet"],
  painter: ["Linseed oil", "Pigments", "Brushes"],
  peddler: ["Bucket", "300' twine", "Mirror"],
  philosopher: ["Staff", "Lantern", "Chalk"],
  physician: ["Saw", "Scalpel", "Wine jug"],
  pilgrim: ["Staff", "Relic", "Letter of passage"],
  pirate: ["Sextant", "Cannonball", "Grappling hook"],
  "pit fighter": ["Net", "Whip", "Wine jug"],
  playwright: ["Quill & ink", "Skull", "10 candles"],
  poacher: ["Animal scent", "Bow", "20 arrows"],
  poet: ["Stationery", "Bell", "Perfume"],
  priest: ["Holy water", "10 stakes", "Prayer book"],
  prospector: ["10 iron spikes", "Pickaxe", "Pan"],
  puppeteer: ["Confetti", "Puppet", "Sewing kit"],
  "rat catcher": ["Cage", "10 rat traps", "Sack"],
  saboteur: ["Air bladder", "Crowbar", "Bomb"],
  sailor: ["Beeswax", "Pulleys", "Spyglass"],
  scout: ["Signal flags", "Black grease", "Dice"],
  scribe: ["Lamp oil", "Quill & ink", "Sealing wax"],
  sculptor: ["Chisel", "Clay", "Calipers"],
  servant: ["Sponge", "Silverware", "Poker"],
  shepherd: ["Crook", "Instrument", "Sling"],
  shipwright: ["Drill", "Hammer", "Axe"],
  singer: ["Mirror", "Makeup", "Locket"],
  smuggler: ["Pulleys", "Rope", "Makeup"],
  soldier: ["Tent", "Card deck", "Shovel"],
  spy: ["Caltrops", "Poison", "Forged papers"],
  squire: ["Torch", "Armor polish", "Trumpet"],
  tailor: ["Sewing kit", "Scissors", "Soap"],
  tattooist: ["Soot pot", "Needles", "10 candles"],
  thieftaker: ["Bear trap", "Manacles", "Torch"],
  thug: ["Poison", "Knife", "Lamp oil"],
  torturer: ["Drill", "Hourglass", "10' chain"],
  trapper: ["Bear trap", "300' twine", "Bear pelt"],
  watchman: ["Lantern", "Trumpet", "Spear"],
  woodcutter: ["Axe", "Firewood", "50' rope"],
};

// Helper Utility to clear duplicates safely
function dedupe(array) {
  return [...new Set(array)];
}

// =========================================================================
// 2. UNIFIED WIZARD ENGINE STATE ARCHITECTURE
// =========================================================================

let wizardState = {
  currentStep: 1,
  primaryArch: null,
  secondaryArch: null,
  attributes: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
  pointsToDistribute: 3,
  selectedCareers: [],
  inventory: [],
  hasRolledProvisions: false,
};

// =========================================================================
// 3. STEP NAVIGATION CORE LOGIC
// =========================================================================

window.moveStep = function (direction) {
  const targetStep = wizardState.currentStep + direction;
  if (targetStep < 1 || targetStep > 4) return;

  // Downstream data evaluation/seeding hooks
  if (wizardState.currentStep === 1 && direction === 1) {
    initAttributeAllocation();
  } else if (wizardState.currentStep === 2 && direction === 1) {
    initCareerSelection();
  } else if (wizardState.currentStep === 3 && direction === 1) {
    initEquipmentSummary();
  }

  // Update visual visibility tokens
  document
    .getElementById(`pane-step-${wizardState.currentStep}`)
    .classList.remove("active");
  document
    .getElementById(`badge-step-${wizardState.currentStep}`)
    .classList.remove("active");

  wizardState.currentStep = targetStep;

  document
    .getElementById(`pane-step-${wizardState.currentStep}`)
    .classList.add("active");
  document
    .getElementById(`badge-step-${wizardState.currentStep}`)
    .classList.add("active");

  validateStepCompletion();
};

function validateStepCompletion() {
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  prevBtn.disabled = wizardState.currentStep === 1;
  let isStepValid = false;

  switch (wizardState.currentStep) {
    case 1:
      isStepValid =
        wizardState.primaryArch !== null && wizardState.secondaryArch !== null;
      break;
    case 2: {
      const primaryStatKey = ARCH[wizardState.primaryArch].stat;
      const allocatedToPrimary = wizardState.attributes[primaryStatKey];
      isStepValid =
        wizardState.pointsToDistribute === 0 && allocatedToPrimary >= 2;
      break;
    }
    case 3:
      isStepValid = wizardState.selectedCareers.length === 2;
      break;
    case 4:
      isStepValid = false; // Terminal Step: Block proceeding further
      break;
  }

  nextBtn.disabled = !isStepValid;
  nextBtn.style.display =
    wizardState.currentStep === 4 ? "none" : "inline-block";
}

// =========================================================================
// 4. STEP 1: MATRICES SELECTION CONTROLLERS
// =========================================================================

window.selectMatrixCoordinate = function (rowId, colId) {
  // If the selection has modified an archetype, invalidate downstream choices safely
  if (
    wizardState.primaryArch !== rowId ||
    wizardState.secondaryArch !== colId
  ) {
    wizardState.primaryArch = rowId;
    wizardState.secondaryArch = colId;

    // Reset structural state downstream
    wizardState.attributes = { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 };
    wizardState.pointsToDistribute = 3;
    wizardState.selectedCareers = [];
    wizardState.inventory = [];
    wizardState.hasRolledProvisions = false;
  }

  renderMatrix();
  renderMatrixSelectionSummary();
  validateStepCompletion();
};

function updateTooltipPosition(e) {
  const tooltip = document.getElementById('matrix-tooltip');
  if (tooltip.style.display !== 'block') return;

  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  
  // Define offset (distance from cursor)
  const offset = 15;
  
  // Calculate potential X and Y
  let newX = e.clientX + offset;
  let newY = e.clientY + offset;

  // Check Right Boundary
  if (newX + tooltipWidth > window.innerWidth) {
    newX = e.clientX - tooltipWidth - offset;
  }

  // Check Bottom Boundary
  if (newY + tooltipHeight > window.innerHeight) {
    newY = e.clientY - tooltipHeight - offset;
  }

  tooltip.style.left = newX + 'px';
  tooltip.style.top = newY + 'px';
}

function renderMatrix() {
  const matrixGridElement = document.getElementById("archetype-matrix");
  if (!matrixGridElement) return;

  const order = ["blade", "shadow", "endurer", "sage", "wayfarer", "devoted"];
  matrixGridElement.innerHTML = "";

  // Read selection state from wizardState (single source of truth)
  const primaryId = wizardState.primaryArch;
  const secondaryId = wizardState.secondaryArch;

  // Corner Spacer Cell
  const cornerLabel = document.createElement("div");
  cornerLabel.className = "matrix-corner";
  // cornerLabel.innerText = 'P \\ S';
  matrixGridElement.appendChild(cornerLabel);

  // Column Headers (Secondary Axis)
  order.forEach((colKey) => {
    const colHeader = document.createElement("div");
    colHeader.className = "matrix-hdr-col";
    if (secondaryId === colKey) {
      colHeader.classList.add("highlighted-x");
      colHeader.style.setProperty("--col-bg", ARCH[colKey].bg);
      colHeader.style.setProperty("--col-border", ARCH[colKey].border);
      colHeader.style.setProperty("--col-txt", ARCH[colKey].txt);
    }
    colHeader.innerHTML = `${ARCH[colKey].name}<span class="stat-lbl">${ARCH[colKey].stat}</span>`;
    colHeader.onclick = () => {
      if (wizardState.primaryArch)
        selectMatrixCoordinate(wizardState.primaryArch, colKey);
    };
    matrixGridElement.appendChild(colHeader);
  });

  // Rows
  order.forEach((rowKey) => {
    // Row Header (Primary Axis)
    const rowHeader = document.createElement("div");
    rowHeader.className = "matrix-hdr-row";
    if (primaryId === rowKey) {
      rowHeader.classList.add("highlighted-y");
      rowHeader.style.setProperty("--col-bg", ARCH[rowKey].bg);
      rowHeader.style.setProperty("--col-border", ARCH[rowKey].border);
      rowHeader.style.setProperty("--col-txt", ARCH[rowKey].txt);
    }
    rowHeader.innerHTML = `${ARCH[rowKey].name}<span class="stat-lbl">${ARCH[rowKey].stat}</span>`;
    rowHeader.onclick = () => {
      if (wizardState.secondaryArch)
        selectMatrixCoordinate(rowKey, wizardState.secondaryArch);
    };
    matrixGridElement.appendChild(rowHeader);

    // Matrix Intersections
    order.forEach((colKey) => {
      const cell = document.createElement("div");
      cell.className = "matrix-cell";

      // Look up direction-sensitive keys (e.g. 'blade-shadow' vs 'shadow-blade')
      const cellKey = `${rowKey}-${colKey}`;
      const coordinateData = MATRIX[cellKey];

      // tooltip handlers
      cell.addEventListener("mouseover", (e) => {
        if (!coordinateData) return;
        const tooltip = document.getElementById("matrix-tooltip");

        // Update content
        tooltip.innerHTML = `
            <div class="combo-name">${coordinateData.name}</div>
            <div class="combo-desc">${coordinateData.desc}</div>
            ${coordinateData.eg ? `<div class="combo-eg">Inspiration: ${coordinateData.eg}</div>` : ''}
        `;

        // Position tooltip
        tooltip.style.display = "block";
        updateTooltipPosition(e);
      });

      cell.addEventListener('mousemove', (e) => {
        updateTooltipPosition(e);
      });

      cell.addEventListener("mouseout", () => {
        document.getElementById("matrix-tooltip").style.display = "none";
      });

      if (coordinateData) {
        cell.innerHTML = `<span class="cell-title">${coordinateData.name}</span>`;
      } else {
        cell.innerHTML = "";
      }

      const isSelectedCell = primaryId === rowKey && secondaryId === colKey;
      if (isSelectedCell) {
        cell.classList.add("selected");
        cell.style.setProperty("--col-bg", ARCH[rowKey].bg);
        cell.style.setProperty("--col-border", ARCH[rowKey].border);
        cell.style.setProperty("--col-txt", ARCH[rowKey].txt);
        cell.style.background = ARCH[rowKey].mid;
        // cell.style.background = `linear-gradient(135deg, ${ARCH[rowKey].bg}, ${ARCH[colKey].bg})`;
        // cell.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
        cell.style.borderColor = ARCH[rowKey].border;
        cell.style.color = "var(--ink)";
        // cell.style.color = ARCH[rowKey].txt;
      } else {
        cell.style.background = "";
      }

      cell.onclick = () => selectMatrixCoordinate(rowKey, colKey);

      matrixGridElement.appendChild(cell);
    });
  });
}

function renderMatrixSelectionSummary() {
  const container = document.getElementById("matrix-selection-summary");
  if (!container) return;

  if (!wizardState.primaryArch || !wizardState.secondaryArch) {
    container.innerHTML = `<p class="result-hint">Select a cross-section on the matrix to establish your Primary and Secondary Archetypes.</p>`;
    return;
  }

  const primary = ARCH[wizardState.primaryArch];
  const secondary = ARCH[wizardState.secondaryArch];
  const isSameArchetype = wizardState.primaryArch === wizardState.secondaryArch;

  // Derive direction-sensitive key lookups matching your schema (e.g. 'blade-shadow')
  const matrixKey = `${wizardState.primaryArch}-${wizardState.secondaryArch}`;
  const callingData = MATRIX[matrixKey] || {
    name: "Unknown Calling",
    desc: "...",
    eg: "",
  };

  container.innerHTML = `
    <!-- Top Configuration Layout Badges -->
    <div class="arch-badges" style="margin-bottom: 16px;">
      <span class="arch-badge" style="background: ${primary.bg}; border-color: ${primary.border}; color: ${primary.txt}">
        Primary Focus: ${primary.name} (+2 or +3 to ${primary.stat})
      </span>
      <span class="arch-badge" style="background: ${secondary.bg}; border-color: ${secondary.border}; color: ${secondary.txt}">
        Secondary Focus: ${secondary.name}
      </span>
    </div>

    <!-- The Result-Box Card UI styling structure -->
    <div class="result-box flash">
      <div class="combo-name">${callingData.name}</div>
      <div class="combo-desc">${callingData.desc}</div>
      ${callingData.eg ? `<div class="combo-eg">Inspiration: ${callingData.eg}</div>` : ""}
    </div>

    <!-- System Prompt Context Readout Footer -->
    <p style="margin-top: 16px; font-size: 14px; line-height: 1.5; color: var(--ink-faded);">
      Your core functional focus guides your background training: You excel at actions requiring you to <strong>${primary.prompt}</strong>. 
      ${!isSameArchetype ? `Your secondary background provides tricks allowing you to <strong>${secondary.prompt}</strong>.` : `Doubling down as a pure ${primary.name} concentrates your background paths explicitly inside their historical traditions.`}
    </p>
  `;
}

// =========================================================================
// 5. STEP 2: ATTRIBUTES ALLOCATION CONTROLLERS
// =========================================================================

function initAttributeAllocation() {
  const container = document.getElementById("stats-app");
  if (!container) return;
  container.innerHTML = "";

  const primaryStat = ARCH[wizardState.primaryArch].stat;
  const secondaryStat = ARCH[wizardState.secondaryArch].stat;
  const isSameArch = wizardState.primaryArch === wizardState.secondaryArch;

  Object.keys(wizardState.attributes).forEach((stat) => {
    let tag = "";
    if (stat === primaryStat) {
      tag =
        ' <small style="color:var(--blade-border); font-weight:bold;">(Primary — assign ≥ 2)</small>';
    } else if (stat === secondaryStat && !isSameArch) {
      tag =
        ' <small style="color:var(--sage-border); font-weight:bold;">(Secondary)</small>';
    }

    const div = document.createElement("div");
    div.className = "stat-row";
    div.innerHTML = `
      <div class="stat-name-tag">${stat}${tag}</div>
      <div class="stat-ctrls">
        <button type="button" class="stat-btn" onclick="modifyStat('${stat}', -1)">-</button>
        <span id="val-${stat}" style="font-weight:600; width:20px; text-align:center; font-size:16px;">${wizardState.attributes[stat]}</span>
        <button type="button" class="stat-btn" onclick="modifyStat('${stat}', 1)">+</button>
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById("pool-counter").textContent =
    wizardState.pointsToDistribute;
}

window.modifyStat = function (stat, changeAmount) {
  if (changeAmount > 0 && wizardState.pointsToDistribute === 0) return;
  if (changeAmount < 0 && wizardState.attributes[stat] === 0) return;

  wizardState.attributes[stat] += changeAmount;
  wizardState.pointsToDistribute -= changeAmount;

  document.getElementById(`val-${stat}`).textContent =
    wizardState.attributes[stat];
  document.getElementById("pool-counter").textContent =
    wizardState.pointsToDistribute;

  validateStepCompletion();
};

// =========================================================================
// 6. STEP 3: CAREER MAPPING SELECTION CONTROLLERS
// =========================================================================

function initCareerSelection() {
  const container = document.getElementById("career-selection-pools");
  if (!container) return;
  container.innerHTML = "";

  const id1 = wizardState.primaryArch;
  const id2 = wizardState.secondaryArch;

  const primaryPool = dedupe(ARCH_CAREERS[id1] || []);
  const secondaryPool = id1 === id2 ? [] : dedupe(ARCH_CAREERS[id2] || []);

  const sharedCareers =
    id1 === id2
      ? []
      : primaryPool.filter((career) => secondaryPool.includes(career));
  const exclusivePrimary = primaryPool.filter(
    (career) => !sharedCareers.includes(career),
  );
  const exclusiveSecondary = secondaryPool.filter(
    (career) => !sharedCareers.includes(career),
  );

  let layoutHTML = `
    <div style="margin-bottom:1rem; text-align:center; font-weight:600; color:var(--blade-border)">
      Selected Careers: ${wizardState.selectedCareers.length} / 2
    </div>
    <div class="careers-cols" style="display: grid; grid-template-columns: ${id1 === id2 ? "1fr" : "1fr 1fr"}; gap: 1.5rem;">
      <div>
        <div class="col-label" style="color:${ARCH[id1].txt}; border-bottom: 1px solid var(--rule); margin-bottom: 0.5rem; font-weight: 600;">
          ${ARCH[id1].name} Career Path List
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">${buildCareerPillElements(exclusivePrimary, ARCH[id1].pill)}</div>
      </div>
  `;

  if (id1 !== id2) {
    layoutHTML += `
      <div>
        <div class="col-label" style="color:${ARCH[id2].txt}; border-bottom: 1px solid var(--rule); margin-bottom: 0.5rem; font-weight: 600;">
          ${ARCH[id2].name} Career Path List
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">${buildCareerPillElements(exclusiveSecondary, ARCH[id2].pill)}</div>
      </div>
    `;
  }

  layoutHTML += `</div>`;

  if (sharedCareers.length) {
    layoutHTML += `
      <div style="margin-top:1.5rem">
        <div class="col-label" style="color:var(--ink); border-bottom: 1px solid var(--rule); margin-bottom: 0.5rem; font-weight: 600;">
          Shared Dynamic Intersections
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">${buildCareerPillElements(sharedCareers, "background:var(--parchment-dark); border-color:var(--rule); color:var(--ink)")}</div>
      </div>
    `;
  }

  container.innerHTML = layoutHTML;
}

function buildCareerPillElements(careerList, pillInlineStyles) {
  return careerList
    .map((careerName) => {
      const generalizedKey = careerName.toLowerCase().trim();
      const isSelected = wizardState.selectedCareers.includes(generalizedKey);
      const dynamicSelectionClass = isSelected ? "selected" : "";

      // Explicit selection indicators matching original styler schemas
      const styleOverride = isSelected
        ? `${pillInlineStyles}; box-shadow: inset 0 0 0 2px var(--ink); font-weight: bold; transform: scale(1.03);`
        : pillInlineStyles;

      return `
      <span class="pill ${dynamicSelectionClass}" style="${styleOverride}; cursor:pointer; padding:6px 12px; border-radius:4px; display:inline-block; transition:all 0.15s;" 
            onclick="toggleWizardCareer('${generalizedKey}')">
        ${careerName} ${isSelected ? "✓" : ""}
      </span>
    `;
    })
    .join("");
}

window.toggleWizardCareer = function (careerKey) {
  const index = wizardState.selectedCareers.indexOf(careerKey);

  if (index > -1) {
    wizardState.selectedCareers.splice(index, 1);
  } else {
    // Structural Rule: Maximum boundary cap at 2 careers
    if (wizardState.selectedCareers.length >= 2) return;
    wizardState.selectedCareers.push(careerKey);
  }

  initCareerSelection();
  validateStepCompletion();
};

// =========================================================================
// 7. STEP 4: EQUIPMENT ENGINE & CHARACTER SHEET SUMMARY
// =========================================================================

function initEquipmentSummary() {
  const gearListContainer = document.getElementById("career-gear-list");
  if (!gearListContainer) return;

  gearListContainer.innerHTML = "";

  // Wipe and rebuild baseline equipment arrays based on chosen career pools
  wizardState.inventory = [];

  wizardState.selectedCareers.forEach((careerKey) => {
    const structuralCareerItems = CAREER_ITEMS[careerKey] || [];
    structuralCareerItems.forEach((item) => wizardState.inventory.push(item));
  });

  // Knave 2e Spellbook Archetype Trigger: Give a starting spellbook if INT > 0
  if (wizardState.attributes.INT > 0) {
    const explicitSpellbookItem = "Spellbook (Contains 1 random Level-1 Spell)";
    if (!wizardState.inventory.includes(explicitSpellbookItem)) {
      wizardState.inventory.push(explicitSpellbookItem);
    }
  }

  // Render text readouts
  if (wizardState.inventory.length === 0) {
    gearListContainer.innerHTML =
      '<p class="step-instruction">No equipment loaded. Check upstream choices.</p>';
  } else {
    gearListContainer.innerHTML = `
      <ul style="padding-left: 1.25rem; margin: 0 0 1rem 0; line-height: 1.6; color: var(--ink-faded);">
        ${wizardState.inventory.map((item) => `<li><strong>${item}</strong></li>`).join("")}
      </ul>
    `;
  }

  refreshInventoryDisplay();
}

window.rollStockGold = function () {
  if (wizardState.hasRolledProvisions) {
    alert(
      "Provisions and starting coin have already been rolled for this character.",
    );
    return;
  }

  const roll =
    Math.floor(Math.random() * 6) +
    1 +
    (Math.floor(Math.random() * 6) + 1) +
    (Math.floor(Math.random() * 6) + 1);

  // Per Knave 2e: 3d6×10 coins, 2 rations, 50' rope, 2 torches
  const provisions = [
    `${roll * 10} Coins (${roll}×10c)`,
    "2 Rations",
    "50' Rope",
    "2 Torches",
  ];

  provisions.forEach((item) => wizardState.inventory.push(item));
  wizardState.hasRolledProvisions = true;

  // Re-render gear list without resetting inventory
  const gearListContainer = document.getElementById("career-gear-list");
  if (gearListContainer) {
    gearListContainer.innerHTML = `
      <ul style="padding-left: 1.25rem; margin: 0 0 1rem 0; line-height: 1.6; color: var(--ink-faded);">
        ${wizardState.inventory.map((item) => `<li><strong>${item}</strong></li>`).join("")}
      </ul>
    `;
  }
  refreshInventoryDisplay();
};

function refreshInventoryDisplay() {
  const currentSlotsTracker = document.getElementById("slot-tracker");
  const maxSlotsTracker = document.getElementById("max-slots-tracker");
  const inventoryGridElement = document.getElementById("inventory-slots-grid");

  if (!inventoryGridElement) return;
  inventoryGridElement.innerHTML = "";

  // Structural Carrying Rule: Maximum safe boundary capacity calculation formula ($10 + \text{CON}$)
  const configuredMaxCarryCapacity = 10 + wizardState.attributes.CON;
  const itemsCurrentlyInInventory = wizardState.inventory.length;

  if (currentSlotsTracker)
    currentSlotsTracker.textContent = itemsCurrentlyInInventory;
  if (maxSlotsTracker) maxSlotsTracker.textContent = configuredMaxCarryCapacity;

  for (let slotIndex = 0; slotIndex < configuredMaxCarryCapacity; slotIndex++) {
    const itemInSlot = wizardState.inventory[slotIndex] || "— [Empty Slot] —";
    const isOccupiedSlot = !!wizardState.inventory[slotIndex];

    const rowDiv = document.createElement("div");
    rowDiv.className = "inv-slot-row";
    if (!isOccupiedSlot) {
      rowDiv.style.opacity = "0.5";
      rowDiv.style.color = "var(--ink-ghost)";
    }

    rowDiv.innerHTML = `
      <span>Slot ${slotIndex + 1}:</span>
      <span style="font-family: 'Crimson Text', serif; font-size: 14px;">${itemInSlot}</span>
    `;
    inventoryGridElement.appendChild(rowDiv);
  }

  // Visual alert if inventory exceeds carry capacity
  if (itemsCurrentlyInInventory > configuredMaxCarryCapacity) {
    if (currentSlotsTracker)
      currentSlotsTracker.style.color = "var(--blade-border)";
  } else {
    if (currentSlotsTracker) currentSlotsTracker.style.color = "inherit";
  }
}

// =========================================================================
// 8. DOCUMENT READY RUNTIME INITIALIZATION HOOKS
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  renderMatrix();
  validateStepCompletion();
});
