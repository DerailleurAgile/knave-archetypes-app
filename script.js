const ARCH = {
  blade:    { name:'Blade',    stat:'STR', prompt:'fight and survive melee',        bg:'var(--blade-bg)',    border:'var(--blade-border)',    txt:'var(--blade-txt)',    mid:'var(--blade-mid)',    pill:'background:var(--blade-bg);border-color:var(--blade-border);color:var(--blade-txt)' },
  shadow:   { name:'Shadow',   stat:'DEX', prompt:'steal, deceive, disappear',      bg:'var(--shadow-bg)',   border:'var(--shadow-border)',   txt:'var(--shadow-txt)',   mid:'var(--shadow-mid)',   pill:'background:var(--shadow-bg);border-color:var(--shadow-border);color:var(--shadow-txt)' },
  wayfarer: { name:'Wayfarer', stat:'WIS', prompt:'track, hunt, navigate the wild', bg:'var(--wayfarer-bg)', border:'var(--wayfarer-border)', txt:'var(--wayfarer-txt)', mid:'var(--wayfarer-mid)', pill:'background:var(--wayfarer-bg);border-color:var(--wayfarer-border);color:var(--wayfarer-txt)' },
  sage:     { name:'Sage',     stat:'INT', prompt:'uncover secrets, brew, cast',    bg:'var(--sage-bg)',     border:'var(--sage-border)',     txt:'var(--sage-txt)',     mid:'var(--sage-mid)',     pill:'background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-txt)' },
  devoted:  { name:'Devoted',  stat:'CHA', prompt:'lead, inspire, call on patrons', bg:'var(--devoted-bg)',  border:'var(--devoted-border)',  txt:'var(--devoted-txt)',  mid:'var(--devoted-mid)',  pill:'background:var(--devoted-bg);border-color:var(--devoted-border);color:var(--devoted-txt)' },
  artisan:  { name:'Artisan',  stat:'CON', prompt:'build, endure, master a trade',  bg:'var(--artisan-bg)',  border:'var(--artisan-border)',  txt:'var(--artisan-txt)',  mid:'var(--artisan-mid)',  pill:'background:var(--artisan-bg);border-color:var(--artisan-border);color:var(--artisan-txt)' },
};

const ARCH_ORDER = ['blade','shadow','wayfarer','sage','devoted','artisan'];

// 2. EXPANDED DIRECTION-SENSITIVE MATRIX OBJECT
const MATRIX = {
  // --- PURE ARCHETYPES (ROW == COL) ---
  'blade-blade':     { name:'the veteran',           desc:'All you know is the fight. Hard-won scars and harder-won lessons. You keep going when smarter people stop.',                                                                                   eg:'Jaime Lannister, Conan, the old soldier who should have died ten years ago' },
  'shadow-shadow':   { name:'the ghost',              desc:'You barely exist. False names, false faces, false trails. You are whoever you need to be, and when you are done, you were never there.',                                                          eg:'a master spy, a con artist at the peak of their game, a thief who has never been seen' },
  'wayfarer-wayfarer':{ name:'the wanderer',          desc:'The road is your home. You know every kind of country and how to read it. Civilization is where you resupply.',                                                                                  eg:'a lone wanderer, the traveler who has been everywhere once, a hermit who moves instead of staying' },
  'sage-sage':       { name:'the scholar',            desc:'Knowledge is power and you intend to have all of it. You see patterns others dismiss as noise. You are probably right, and probably insufferable.',                                               eg:'a wizard past their prime, an archivist with an agenda, a polymath who never left the tower' },
  'devoted-devoted': { name:'the true believer',      desc:'Everything you do, you do in service to something larger than yourself. This is either very noble or very dangerous. Probably both.',                                                             eg:'a zealot with good intentions, a high priest, a wandering saint, an inquisitor who is right' },
  'artisan-artisan': { name:'the tradesperson',       desc:'You are what you make. Deep expertise, patient method, and a reputation that takes decades to build. You do not brag. You do not need to.',                                                      eg:'a master craftsperson, a ship\'s engineer, a physician-surgeon, a brewer of legend' },

  // --- BLADE PRIMARY ---
  'blade-shadow':    { name:'the skirmisher',        desc:'Front-line combat mixed with dirty tactics. You use violence to create opportunities, feinting with armor before breaking bones where they lack steel.',                                          eg:'Bronn of the Blackwater, a cynical mercenary captain, an arena fighter who uses sand in the eyes' },
  'blade-wayfarer':  { name:'the frontier warden',    desc:'An iron-clad protector stationed at the boundary of the wild. You fight with military discipline but understand the terrain well enough to make it your shield.',                              eg:'Aragorn as Strider, a border-guard commander, an ironclad ranger who locks down mountain passes' },
  'blade-sage':      { name:'the war-scholar',        desc:'You fight with a mind as sharp as your blade. You study your enemies before you meet them, breaking formations through tactical geometry and calculated maneuvers.',                              eg:'the general who leads the charge, a warrior-monk who reads battle like scripture' },
  'blade-devoted':   { name:'the templar',            desc:'Your sword is consecrated to a higher cause. You are a frontline crusader who turns raw physical violence into a direct expression of holy decree or sovereign law.',                             eg:'An ironclad paladin, a holy executioner, a knight-militant bound by blood oaths' },
  'blade-artisan':   { name:'the siege engineer',     desc:'Tough, methodical, and built to break walls. You combine combat mastery with heavy materials, treating fortifications and armor as puzzles to dismantle.',                                       eg:'A sapper defending the barricade, a heavy vanguard specialist who maintains the legion’s artillery' },

  // --- SHADOW PRIMARY ---
  'shadow-blade':    { name:'the knife in the dark',  desc:'Violence is your scalpel and discretion your cloak. You do not trade blows across fields; you slip past defenses and settle fights with a single strike before vanishing.',                       eg:'Geralt of Rivia (on an ambush contract), an assassin-for-hire, a specialized syndicate cleaner' },
  'shadow-wayfarer': { name:'the smuggler',           desc:'You use the trackless wild as an escape route and transit corridor for things that shouldn\'t exist. You run contraband, evade patrols, and navigate blind.',                                     eg:'Han Solo, a back-country fence, a shadow-runner who knows the undocumented caves' },
  'shadow-sage':     { name:'the mastermind',         desc:'You trade in information, leverage, and tailored identities. No plan survives contact with you because you have bought the blue-prints and blackmailed the guards.',                               eg:'A master spy-master, a high-stakes con artist, a black-market archivist who sells secrets' },
  'shadow-devoted':  { name:'the silent hand',        desc:'You carry out the unacknowledged will of your faith or patron from the dark. You are the shadow cast by the altar, cleaning up threats your order cannot publicly notice.',                      eg:'An inquisitor\'s hidden blade, an assassin for a secret cult, a holy saboteur' },
  'shadow-artisan':  { name:'the locksmith / forger', desc:'Your craft leaves no seams. You replicate signatures, reverse-engineer secure mechanisms, and modify spaces to include hidden escapes or lethal traps.',                                        eg:'A master thief who constructs their own tools, a counterfeiter of royal seals' },

  // --- WAYFARER PRIMARY ---
  'wayfarer-blade':  { name:'the beast-slayer',       desc:'A wild survivalist who tracks down hyper-specific, dangerous quarry. You treat combat as a dangerous hunt and your targets as apex predators to trap and skin.',                                  eg:'Kraven the Hunter, a monster tracker, a deep-woods poacher who had to fight back' },
  'wayfarer-shadow': { name:'the poacher',            desc:'You stalk the woods silently to harvest what belongs to the crown. You excel at setting camouflaged snares, blending into foliage, and evading game wardens.',                                    eg:'Robin Hood, a forest outlaw, a wild-country scout who relies on camouflage over steel' },
  'wayfarer-sage':   { name:'the explorer',           desc:'You plunge into forgotten ruins driven by historical curiosity. You treat the deep wilderness as an unread library, deciphering ancient paths and terrain clues.',                               eg:'Indiana Jones, Lara Croft, a mapping specialist investigating anomalous zones' },
  'wayfarer-devoted':{ name:'the pilgrim',            desc:'You walk a long, punishing road for a higher purpose. The act of travel is your spiritual discipline; you read cosmic signs in weather and terrain shifts.',                                      eg:'A wandering ascetic, a monk seeking a remote shrine, a prophet defined by the desert' },
  'wayfarer-artisan':{ name:'the pioneer',            desc:'You build life out of raw elements. You know how to fell timber, forge makeshift tools on the trail, and raise functional homesteads or outposts out of wild muck.',                               eg:'A frontier surveyor, a mountain trapper who cuts their own cabins, a ship\'s carpenter marooned' },

  // --- SAGE PRIMARY ---
  'sage-blade':      { name:'the spellsword',         desc:'A researcher driven to pick up arms to protect their work. You view weapons as technical instruments and magic as a formulaic tool to augment physical leverage.',                                 eg:'An occult investigator, an academic duelist, a scholar who guards forbidden grimoires' },
  'sage-shadow':     { name:'the apostate scholar',   desc:'An academic who broke lines to steal forbidden secrets. You use research methods to locate closely-guarded knowledge and rogue tradecraft to safely escape with it.',                              eg:'A defrocked alchemist, an archivist selling forged lineage papers, a thief of library vaults' },
  'sage-wayfarer':   { name:'the field naturalist',   desc:'A systematizer of natural laws. You venture far from towers to catalog venomous flora, track migrations, analyze geological fractures, and document beasts.',                                    eg:'An academic cartographer, a toxicologist collecting field samples, a star-mapping astronomer' },
  'sage-devoted':    { name:'the theurgist',          desc:'You study the technical, systemic frameworks of miracles. Magic, theological decree, and systemic laws are not separate fields to you; they are the same engine.',                                 eg:'An alchemist who prays over the crucible, a scholar deciphering divine equations' },
  'sage-artisan':    { name:'the artificer',          desc:'You design what you understand. Your mind coordinates complex chemical, mechanical, and material assemblies, translating abstract theories into physical machines.',                              eg:'A clockwork builder, a designer of defensive engines, a physician who builds custom prosthetics' },

  // --- DEVOTED PRIMARY ---
  'devoted-blade':   { name:'the zealot judiciar',    desc:'Your burning faith drives you to pick up executioner’s iron. You do not wait for the army; you hunt down heresy and broken oaths personally, fueled by righteous fury.',                           eg:'An unyielding inquisitor, a religious faction enforcer, a warrior vindicating an ancient code' },
  'devoted-shadow':  { name:'the heretic champion',   desc:'A true believer driven underground by an oppressive regime. You keep a banned faith or illegal ideology alive through cells, coded messages, and midnight rites.',                                eg:'A hidden priest of a broken order, a revolutionary operating under cover of a mundane life' },
  'devoted-wayfarer':{ name:'the wild ascetic',       desc:'You have abandoned temples to find your patron in the harsh places of the world. You interpret divine will through starvation, isolation, and natural storms.',                                   eg:'A desert prophet, a hermit living in holy caves, a spiritual wanderer who speaks to storms' },
  'devoted-sage':    { name:'the monastic archivist', desc:'Keeper of institutional memory, lineages, and relics. You guard the secrets of your order within stone walls, analyzing old accounts to direct your modern flock.',                              eg:'A high church scholar, a traditionalist theologian, a guardian of ancestral records' },
  'devoted-artisan': { name:'the pastor',             desc:'You serve your community’s spirit by building its physical infrastructure. You mend bones, patch church roofs, bake holy bread, and hold small villages together.',                               eg:'A village priest-doctor, a community healer, a frontier preacher who works the fields' },

  // --- ARTISAN PRIMARY ---
  'artisan-blade':   { name:'the pit smith',          desc:'A master metalworker who tests their own experimental iron in real fights. You understand structural leverage, weight balance, and the limits of tempered steel.',                                eg:'A weapon-smith who fights to prove their work, an iron-worker defending their forge' },
  'artisan-shadow':  { name:'the infiltrator',        desc:'A skilled worker who knows exactly where architecture is fragile. You use your trade knowledge to slip through ventilation, subvert foundations, or pick high-end vaults.',                         eg:'A mason who knows the castle’s drainage vulnerabilities, a carpenter specializing in secret doors' },
  'artisan-wayfarer':{ name:'the prospector',         desc:'A material surveyor who hunts down hidden resources across rugged landscapes. You read stone faces for ore, rivers for gems, and forests for specific construction timber.',                       eg:'A gold tracker, an independent miner navigating uncharted peaks, a stone-cutter clearing routes' },
  'artisan-sage':    { name:'the master alchemist',   desc:'A practical manufacturer focused on transforming materials. You operate furnaces, brew volatile solvents, refine ores, and turn raw matter into high-utility formulas.',                           eg:'A master glassblower compounding volatile liquids, a metallurgist experimenting with alloys' },
  'artisan-devoted': { name:'the sacred mason',       desc:'You carve your faith permanently into stone. You build cathedrals, scribe runes into fortifications, and ensure that architectural geometric design anchors divine presence.',                      eg:'A master stone-cutter building massive altars, a carpenter framing sacred shrines' }
};

const ARCH_CAREERS = {
  blade:    ['assassin','bandit','beast tamer','butcher','fence','gambler','grave robber','guard','headsman','inquisitor','jailer','kidnapper','knight','pit fighter','pirate','saboteur','soldier','squire','thug','torturer','watchman'],
  shadow:   ['acrobat','actor','assassin','bandit','burglar','charlatan','coachman','courtier','cutpurse','fence','jester','kidnapper','locksmith','puppeteer','rat catcher','smuggler','spy','thieftaker','thug'],
  wayfarer: ['beast tamer','boatman','courier','explorer','falconer','fisherman','gamekeeper','hermit','hunter','miner','naturalist','pilgrim','poacher','prospector','sailor','scout','shepherd','trapper','woodcutter'],
  sage:     ['alchemist','antiquarian','arcanist','astrologer','bookbinder','folklorist','herbalist','investigator','naturalist','oracle','philosopher','physician','playwright','architect','scribe','inquisitor'],
  devoted:  ['acolyte','actor','courtier','cultist','hermit','inquisitor','jester','knight','lawyer','merchant','musician','officer','oracle','orator','philosopher','pilgrim','poet','priest','singer'],
  artisan:  ['architect','baker','barber','beekeeper','blacksmith','bookbinder','brewer','candlemaker','carpenter','cobbler','cook','dyer','gardener','gravedigger','groom','innkeeper','mason','painter','sculptor','shipwright','tailor','tattooist','woodcutter'],
};

const CHARS = [
  { id:'conan',       name:'Conan',              source:'R.E. Howard',        genre:'sword-sorcery', archs:['blade','wayfarer'], pseudo:'the ranger', desc:'Wandering barbarian — as comfortable leading a war-band as surviving alone in the wilderness. Fights first, thinks later, survives always.', careers:{ blade:['soldier','pit fighter','bandit','guard'], wayfarer:['hunter','scout','trapper','pirate'] }, note:'STR and WIS. CON third — you need those item slots.' },
  { id:'aragorn',     name:'Aragorn',             source:'Tolkien',             genre:'fantasy',       archs:['blade','wayfarer'], pseudo:'the ranger', desc:'A king who walks as a wanderer. Trained warrior, skilled tracker, and reluctant leader who knows every corner of a dangerous world.', careers:{ blade:['soldier','knight','squire','guard'], wayfarer:['hunter','scout','herbalist','courier'] }, note:'STR and WIS split. Take herbalist — it fits perfectly and gives you the foraging advantage.' },
  { id:'geralt',      name:'Geralt',              source:'Sapkowski',           genre:'fantasy',       archs:['blade','sage'],     pseudo:'the war-scholar', desc:'A professional monster hunter who studies his quarry before he fights it. Alchemy, precise swordwork, and a deep knowledge of things that want to kill you.', careers:{ blade:['assassin','soldier','thieftaker','headsman'], sage:['alchemist','herbalist','investigator','folklorist'] }, note:'STR and INT. Alchemist gives the brewing setup; investigator gives the journal and manacles for contracts.' },
  { id:'fafhrd',      name:'Fafhrd',              source:'Leiber',              genre:'sword-sorcery', archs:['blade','shadow'],   pseudo:'the knife in the dark', desc:'Half-barbarian, half-thief, entirely unpredictable. Big enough to fight anything, charming enough to talk his way out afterward — usually.', careers:{ blade:['soldier','pirate','pit fighter','bandit'], shadow:['acrobat','gambler','actor','smuggler'] }, note:'STR primary. A point in CHA for the performer side. Fafhrd is the more openly reckless of the two.' },
  { id:'mouser',      name:'Gray Mouser',         source:'Leiber',              genre:'sword-sorcery', archs:['shadow','blade'],   pseudo:'the knife in the dark', desc:'Nimble, cunning, armed with a blade he calls Scalpel. A failed wizard\'s apprentice who redirected his education toward theft and surviving Fafhrd\'s plans.', careers:{ shadow:['cutpurse','burglar','acrobat','fence'], blade:['assassin','gambler','thug','locksmith'] }, note:'DEX primary, a point in INT for the arcane dabbling. Where Fafhrd hits hard, he hits fast.' },
  { id:'elric',       name:'Elric',               source:'Moorcock',            genre:'sword-sorcery', archs:['blade','devoted'],  pseudo:'the war-priest', desc:'Last emperor of a dying civilization, bound to a soul-drinking black sword and the chaos gods that empower it. Reluctant, doomed, magnificent.', careers:{ blade:['soldier','knight','headsman','squire'], devoted:['cultist','oracle','arcanist','philosopher'] }, note:'CHA primary — his power comes from his patron relationship, not his frail body. A point in STR keeps the sword swinging.' },
  { id:'gandalf',     name:'Gandalf',             source:'Tolkien',             genre:'fantasy',       archs:['devoted','sage'],   pseudo:'the theurgist', desc:'A wandering wizard who moves the pieces of the world without anyone quite understanding how or why. Ancient, patient, playing a very long game.', careers:{ devoted:['pilgrim','philosopher','oracle','priest'], sage:['arcanist','astrologer','folklorist','antiquarian'] }, note:'CHA and INT split. Pilgrim career is perfect — staff, relic, letter of passage. That\'s basically his whole kit.' },
  { id:'bilbo',       name:'Bilbo / Frodo',       source:'Tolkien',             genre:'fantasy',       archs:['shadow','wayfarer'],pseudo:'the outrider', desc:'An ordinary person thrust into extraordinary travel. Resourceful, quietly brave, and better at going unnoticed than anyone expects.', careers:{ shadow:['burglar','cutpurse','smuggler','courier'], wayfarer:['pilgrim','scout','hermit','courier'] }, note:'DEX and WIS. Lean into CON for wound slots — they survive by endurance, not combat prowess.' },
  { id:'indy',        name:'Indiana Jones',       source:'Spielberg / Lucas',   genre:'adventure',     archs:['sage','artisan'],   pseudo:'the artificer', desc:'A professor who sprints through tombs for a living. Deep historical knowledge, practical enough to improvise under fire, surprisingly good in a brawl.', careers:{ sage:['antiquarian','investigator','folklorist','astrologer'], artisan:['architect','carpenter','physician','mason'] }, note:'INT primary, CON secondary. Antiquarian career is him exactly — old coin, flag, lore book.' },
  { id:'lara',        name:'Lara Croft',          source:'Core Design',         genre:'adventure',     archs:['wayfarer','sage'],  pseudo:'the learned explorer', desc:'An archaeologist who operates in the field, alone, under fire. Navigates hostile terrain and hostile history with equal fluency.', careers:{ wayfarer:['explorer','hunter','prospector','scout'], sage:['antiquarian','investigator','naturalist','arcanist'] }, note:'WIS and INT. Explorer career gives sextant and spyglass — exactly right. Hunter adds tent and survival gear.' },
  { id:'robin',       name:'Robin Hood',          source:'English folklore',    genre:'fantasy',       archs:['wayfarer','shadow'],pseudo:'the outrider', desc:'An outlaw who knows the forest better than the foresters and uses that knowledge to redistribute wealth — selectively.', careers:{ wayfarer:['poacher','gamekeeper','hunter','scout'], shadow:['bandit','burglar','spy','smuggler'] }, note:'WIS primary — the bow runs on WIS in Knave. DEX second. Poacher career: animal scent, bow, 20 arrows.' },
  { id:'zorro',       name:'Zorro / d\'Artagnan', source:'McCulley / Dumas',    genre:'adventure',     archs:['shadow','blade'],   pseudo:'the knife in the dark', desc:'A duelist with a double life. Noble enough to move in court, dangerous enough to clear a room — and vain enough to leave a calling card.', careers:{ shadow:['acrobat','actor','courtier','gambler'], blade:['soldier','fence','gambler','assassin'] }, note:'DEX primary, CHA second. Courtier covers the social mask; gambler (rapier, cards, dice) covers the duel.' },
  { id:'bond',        name:'James Bond',          source:'Fleming',             genre:'thriller',      archs:['shadow','sage'],    pseudo:'the operator', desc:'A government assassin with impeccable manners and a talent for being somewhere he shouldn\'t be. Gathers intelligence, eliminates targets, orders something expensive afterward.', careers:{ shadow:['spy','assassin','courtier','smuggler'], sage:['investigator','alchemist','physician','arcanist'] }, note:'DEX and INT. Spy career (caltrops, poison, forged papers). Investigator adds the journal and manacles.' },
  { id:'odysseus',    name:'Odysseus',            source:'Homer',               genre:'myth',          archs:['shadow','devoted'], pseudo:'the faithful dissembler', desc:'The cleverest man in the room, always. Beloved of a goddess, cursed by a god, determined to get home by any means necessary. The plan always has three layers.', careers:{ shadow:['spy','orator','actor','smuggler'], devoted:['pilgrim','oracle','priest','philosopher'] }, note:'CHA and DEX — he talks and maneuvers his way through everything.' },
  { id:'vanhelsing',  name:'Van Helsing',         source:'Stoker',              genre:'horror',        archs:['devoted','sage'],   pseudo:'the theurgist', desc:'A scholar of the supernatural who has made it his business to destroy what he studies. Faith and reason are both weapons. So is a stake.', careers:{ devoted:['inquisitor','priest','pilgrim','cultist'], sage:['physician','folklorist','investigator','herbalist'] }, note:'CHA and INT. Priest career gives holy water and stakes out of the box. Physician adds the saw and scalpel.' },
  { id:'merlin',      name:'Merlin',              source:'Arthurian legend',    genre:'fantasy',       archs:['sage','devoted'],   pseudo:'the theurgist', desc:'A ancient intelligence wearing a wizard\'s disguise. Arranges the shape of kingdoms the way others arrange furniture. The magic is incidental.', careers:{ sage:['arcanist','astrologer','philosopher','antiquarian'], devoted:['oracle','priest','cultist','pilgrim'] }, note:'INT and CHA. Arcanist gives the spellbook; astrologer adds star charts and almanac. Oracle for the tarot deck.' },
  { id:'sparrow',     name:'Jack Sparrow',        source:'Disney / Verbinski',  genre:'adventure',     archs:['shadow','wayfarer'],pseudo:'the outrider', desc:'A disreputable sailor who is either the luckiest fool alive or a genius pretending to be a fool. Probably both.', careers:{ shadow:['pirate','gambler','smuggler','charlatan'], wayfarer:['sailor','boatman','explorer','scout'] }, note:'DEX and WIS. Charlatan (costume, fake elixir, degree) is too good to pass up.' },
  { id:'ripley',      name:'Ellen Ripley',        source:'Scott / Cameron',     genre:'sci-fi',        archs:['artisan','blade'],  pseudo:'the pit veteran', desc:'A working professional who survives through practical knowledge, cold-headed problem solving, and the willingness to do whatever the situation requires.', careers:{ artisan:['shipwright','carpenter','watchman','innkeeper'], blade:['soldier','guard','thieftaker','saboteur'] }, note:'CON primary — she endures. STR second. Shipwright (drill, hammer, axe) covers her technical competence.' },
  { id:'constantine', name:'John Constantine',    source:'DC / Vertigo',        genre:'horror',        archs:['shadow','devoted'], pseudo:'the faithful dissembler', desc:'Knows evil intimately — often because he caused it. Defeats it through manipulation, debt-collection, and exploiting rules that most people don\'t know exist. His faith is real but it isn\'t clean.', careers:{ shadow:['spy','charlatan','smuggler','cultist'], devoted:['priest','oracle','inquisitor','pilgrim'] }, note:'CHA primary, then split DEX and INT. Cultist career (dagger, ritual robes, amulet) is his kit exactly.' },
  { id:'cadfael',     name:'Brother Cadfael',     source:'Ellis Peters',        genre:'mystery',       archs:['devoted','sage'],   pseudo:'the theurgist', desc:'A monk who spent half his life as a soldier before finding God — and then found that God had use for a man who understand both herbalism and homicide.', careers:{ devoted:['priest','acolyte','pilgrim','philosopher'], sage:['herbalist','physician','investigator','naturalist'] }, note:'CHA and INT. Herbalist career (herbs, sickle, herb manual) is his primary toolkit.' },
  { id:'tuck',        name:'Friar Tuck',          source:'English folklore',    genre:'fantasy',       archs:['devoted','artisan'],pseudo:'the pastor', desc:'A man of God who is also a man of the people — and the ale, and the table, and the occasional brawl. Builds things, feeds people, and keeps the community standing.', careers:{ devoted:['priest','acolyte','pilgrim','hermit'], artisan:['cook','brewer','carpenter','innkeeper'] }, note:'CHA primary, CON second. Brewer (mash paddle, beer keg, hops) is him exactly. Cook adds the frying pan.' },
  { id:'melisandre',  name:'Melisandre',          source:'G.R.R. Martin',       genre:'fantasy',       archs:['devoted','devoted'],pseudo:'the true believer', careers:{ devoted:['cultist','oracle','priest','inquisitor'] }, desc:'Pure faith, pure fire, pure conviction. She serves her patron absolutely and is rewarded — or punished — in kind. No separation between what she wants and what her god wants.', note:'CHA — all three points if possible. Her patron blessings scale with CHA, and she intends to have many.' },
];

const ALL_GENRES = ['all', ...new Set(CHARS.map(c => c.genre))];

let builderSel = [null, null]; // [Row = Primary Archetype, Column = Secondary Archetype]
let activeGenre = 'all';
let activeCharId = null;

function getMatrixKey(a, b) {
  return `${a}-${b}`; // Pure positional coordinates: Row (Primary) - Column (Secondary)
}

function dedupe(arr) { return [...new Set(arr)]; }
function getA(id) { return ARCH[id]; }

function makePills(list, style) {
  return list.map(n => `<span class="pill" style="${style}">${n}</span>`).join('');
}

function renderMatrix() {
  const el = document.getElementById('archetype-matrix');
  el.innerHTML = '';

  const corner = document.createElement('div');
  corner.className = 'matrix-corner';
  el.appendChild(corner);

  // Render Top Column Headers (Secondary Archetype Axis)
  ARCH_ORDER.forEach(colId => {
    const a = ARCH[colId];
    const colHdr = document.createElement('button');
    colHdr.className = `matrix-hdr-col col-${colId}`;
    colHdr.setAttribute('type', 'button');
    
    if (builderSel[1] === colId) {
      colHdr.classList.add('highlighted-x');
      colHdr.style.setProperty('--col-bg', a.bg);
      colHdr.style.setProperty('--col-border', a.border);
      colHdr.style.setProperty('--col-txt', a.txt);
    }
    
    colHdr.innerHTML = `<span>${a.name}</span><span class="stat-lbl">${a.stat}</span>`;
    
    colHdr.addEventListener('click', () => {
      activeCharId = null;
      builderSel[1] = (builderSel[1] === colId) ? null : colId;
      renderMatrix();
      renderBuilderResult();
      renderCharList();
      renderClearMatrixFilterBtn();
    });
    
    el.appendChild(colHdr);
  });

  // Render Rows (Primary Archetype Axis)
  ARCH_ORDER.forEach(rowId => {
    const rArch = ARCH[rowId];
    
    const rowHdr = document.createElement('button');
    rowHdr.className = `matrix-hdr-row row-${rowId}`;
    rowHdr.setAttribute('type', 'button');
    
    if (builderSel[0] === rowId) {
      rowHdr.classList.add('highlighted-y');
      rowHdr.style.setProperty('--col-bg', rArch.bg);
      rowHdr.style.setProperty('--col-border', rArch.border);
      rowHdr.style.setProperty('--col-txt', rArch.txt);
    }
    
    rowHdr.innerHTML = `<span>${rArch.name}</span><span class="stat-lbl">${rArch.stat}</span>`;
    
    rowHdr.addEventListener('click', () => {
      activeCharId = null;
      builderSel[0] = (builderSel[0] === rowId) ? null : rowId;
      renderMatrix();
      renderBuilderResult();
      renderCharList();
      renderClearMatrixFilterBtn();
    });
    
    el.appendChild(rowHdr);

    ARCH_ORDER.forEach(colId => {
      const cArch = ARCH[colId];
      const key = getMatrixKey(rowId, colId);
      const combo = MATRIX[key];
      
      const cell = document.createElement('button');
      cell.className = 'matrix-cell';
      cell.setAttribute('type', 'button');
      
      const isSelected = (builderSel[0] === rowId && builderSel[1] === colId);
      
      if (isSelected) {
        cell.classList.add('selected');
        cell.style.setProperty('--col-bg', rArch.bg);
        cell.style.setProperty('--col-border', rArch.border);
        cell.style.setProperty('--col-txt', rArch.txt);
      }

      cell.innerHTML = `<span class="cell-title">${combo.name.replace('the ', '')}</span>`;
      
      cell.addEventListener('click', () => {
        activeCharId = null;
        if (isSelected) {
          builderSel = [null, null];
        } else {
          builderSel = [rowId, colId];
        }
        renderMatrix();
        renderBuilderResult();
        renderCharList();
        renderClearMatrixFilterBtn();
      });
      
      el.appendChild(cell);
    });
  });
}

function renderBuilderResult() {
  const el = document.getElementById('builder-result');
  const [id1, id2] = builderSel;
  
  if (!id1 && !id2) {
    el.innerHTML = '<p class="result-hint">Select an individual archetype header or a cross-section grid cell to view calling details. The character pool on the left will cross-filter to matches.</p>';
    return;
  }
  
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');

  if (id1 && !id2) {
    const a1 = getA(id1);
    el.innerHTML = `
      <div class="combo-name">Primary Archetype: ${a1.name} Isolated</div>
      <div class="arch-badges">
        <span class="arch-badge" style="background:${a1.bg};border-color:${a1.border};color:${a1.txt}">Primary Focus: ${a1.name} · ${a1.stat}</span>
      </div>
      <div class="combo-desc">Focusing on paths requiring you to <strong>${a1.prompt}</strong>. Select a Secondary Archetype parameter to secure a compound calling. Character lists are currently filtered for targets matching ${a1.name} as Primary.</div>
      <div class="divider"></div>
      <div><div class="col-label" style="color:${a1.txt}">${a1.name} Base Careers</div>${makePills(dedupe(ARCH_CAREERS[id1]), a1.pill)}</div>
    `;
    return;
  }

  if (!id1 && id2) {
    const a2 = getA(id2);
    el.innerHTML = `
      <div class="combo-name">Secondary Archetype: ${a2.name} Isolated</div>
      <div class="arch-badges">
        <span class="arch-badge" style="background:${a2.bg};border-color:${a2.border};color:${a2.txt}">Secondary Focus: ${a2.name} · ${a2.stat}</span>
      </div>
      <div class="combo-desc">Evaluating build tracks built on actions to <strong>${a2.prompt}</strong>. Select a Primary Archetype structural coordinate to intersect. Character list matches are adjusted for ${a2.name} as Secondary.</div>
      <div class="divider"></div>
      <div><div class="col-label" style="color:${a2.txt}">${a2.name} Base Careers</div>${makePills(dedupe(ARCH_CAREERS[id2]), a2.pill)}</div>
    `;
    return;
  }

  const key = getMatrixKey(id1, id2);
  const combo = MATRIX[key];
  const a1 = getA(id1), a2 = getA(id2);
  const same = id1 === id2;

  const c1 = dedupe(ARCH_CAREERS[id1]);
  const c2 = same ? [] : dedupe(ARCH_CAREERS[id2]);
  const shared = same ? [] : c1.filter(c => c2.includes(c));
  const only1 = c1.filter(c => !shared.includes(c));
  const only2 = c2.filter(c => !shared.includes(c));

  const badgeHTML = `
    <div class="arch-badges">
      <span class="arch-badge" style="background:${a1.bg};border-color:${a1.border};color:${a1.txt}">Primary: ${a1.name} · ${a1.stat}</span>
      ${!same ? `<span class="arch-badge" style="background:${a2.bg};border-color:${a2.border};color:${a2.txt}">Secondary: ${a2.name} · ${a2.stat}</span>` : ''}
    </div>`;

  let careersHTML;
  if (same) {
    careersHTML = `<div><div class="col-label" style="color:${a1.txt}">${a1.name} careers</div>${makePills(only1, a1.pill)}</div>`;
  } else {
    const sharedSec = shared.length ? `<div style="margin-top:.6rem"><div class="col-label">shared by both</div>${makePills(shared,'background:var(--parchment);border-color:var(--rule);color:var(--ink-faded)')}</div>` : '';
    careersHTML = `
      <div class="careers-cols">
        <div><div class="col-label" style="color:${a1.txt}">Primary: ${a1.name}</div>${makePills(only1, a1.pill)}</div>
        <div><div class="col-label" style="color:${a2.txt}">Secondary: ${a2.name}</div>${makePills(only2, a2.pill)}</div>
      </div>
      ${sharedSec}`;
  }

  const statLine = same
    ? `<p class="stat-hint">Primary stat focus: <strong>${a1.stat}</strong> — assign higher starting bonuses here.</p>`
    : `<p class="stat-hint">Primary layout sequence focus: <strong>${a1.stat}</strong> (Primary Archetype) and <strong>${a2.stat}</strong> (Secondary Archetype).</p>`;

  el.innerHTML = `
    <div class="combo-name">${combo.name}</div>
    ${badgeHTML}
    <div class="combo-desc">${combo.desc}</div>
    <div class="combo-eg">e.g. ${combo.eg}</div>
    <div class="divider"></div>
    ${statLine}
    <div class="divider"></div>
    ${careersHTML}
  `;
}

function renderCharFilters() {
  const el = document.getElementById('char-filters');
  el.innerHTML = '';
  ALL_GENRES.forEach(g => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (activeGenre === g ? ' active' : '');
    btn.textContent = g === 'all' ? 'all' : g;
    btn.onclick = () => { activeGenre = g; renderCharFilters(); renderCharList(); };
    el.appendChild(btn);
  });
}

function renderClearMatrixFilterBtn() {
  const container = document.getElementById('clear-matrix-filter-container');
  container.innerHTML = '';
  
  if (builderSel[0] || builderSel[1]) {
    const btn = document.createElement('button');
    btn.className = 'clear-filter-btn';
    btn.textContent = '✕ Reset Matrix';
    btn.onclick = () => {
      builderSel = [null, null];
      activeCharId = null;
      renderMatrix();
      renderBuilderResult();
      renderCharList();
      document.getElementById('char-result').innerHTML = '<p class="char-result-hint">Select an iconic character profile to trace their archetype mappings and load their structural matrix footprint.</p>';
      renderClearMatrixFilterBtn();
    };
    container.appendChild(btn);
  }
}

function characterMatchesMatrixFilter(c) {
  const [m1, m2] = builderSel;
  if (!m1 && !m2) return true;
  
  // Both axes selected: strict positional match
  if (m1 && m2) {
    return c.archs[0] === m1 && c.archs[1] === m2;
  }
  
  // Only Primary axis selected
  if (m1) {
    return c.archs[0] === m1;
  }
  
  // Only Secondary axis selected
  if (m2) {
    return c.archs[1] === m2;
  }
  
  return true;
}

function renderCharList() {
  const el = document.getElementById('char-list');
  el.innerHTML = '';
  
  let list = activeGenre === 'all' ? CHARS : CHARS.filter(c => c.genre === activeGenre);
  
  const hasMatrixFilter = (builderSel[0] || builderSel[1]);
  const isDrivenByCharacter = activeCharId !== null;

  if (!isDrivenByCharacter && hasMatrixFilter) {
    list = list.filter(characterMatchesMatrixFilter);
  }

  if (list.length === 0) {
    el.innerHTML = '<div class="char-result-hint">No inspirations match this precise matrix focus.</div>';
    return;
  }

  list.forEach(c => {
    const a1 = getA(c.archs[0]);
    const a2 = getA(c.archs[1]);
    const isActive = activeCharId === c.id;
    const item = document.createElement('button');
    item.className = 'char-item' + (isActive ? ' active' : '');
    
    if (isActive) {
      item.style.setProperty('--col-bg', a1.bg);
      item.style.setProperty('--col-border', a1.border);
    }
    
    const archLabel = c.archs[0] === c.archs[1] ? a1.name : `${a1.name} + ${a2.name}`;
    item.innerHTML = `
      <div>
        <div class="char-item-name">${c.name}</div>
        <div class="char-item-source">${c.source}</div>
      </div>
      <span class="char-item-arch" style="background:${a1.bg};border-color:${a1.border};color:${a1.txt}">${archLabel}</span>
    `;
    
    item.onclick = () => { 
      if (isActive) {
        activeCharId = null; 
        builderSel = [null, null];
        document.getElementById('char-result').innerHTML = '<p class="char-result-hint">Select an iconic character profile to trace their archetype mappings and load their structural matrix footprint.</p>';
      } else {
        activeCharId = c.id; 
        renderCharResult(c);
        builderSel = [c.archs[0], c.archs[1]];
      }
      
      renderCharList(); 
      renderMatrix();
      renderBuilderResult();
      renderClearMatrixFilterBtn();
    };
    el.appendChild(item);
  });
}

function renderCharResult(c) {
  const el = document.getElementById('char-result');
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');

  const a1 = getA(c.archs[0]), a2 = getA(c.archs[1]);
  const same = c.archs[0] === c.archs[1];
  
  const all1 = (c.careers && c.careers[c.archs[0]]) ? c.careers[c.archs[0]] : (c.careers ? Object.values(c.careers).flat() : []);
  const all2 = (!same && c.careers && c.careers[c.archs[1]]) ? c.careers[c.archs[1]] : [];
  
  const shared = all1.filter(x => all2.includes(x));
  const only1 = all1.filter(x => !shared.includes(x));
  const only2 = all2.filter(x => !shared.includes(x));

  let careersHTML;
  if (same || !all2.length) {
    careersHTML = `<div><div class="col-label" style="color:${a1.txt}">${a1.name} careers</div>${makePills(dedupe(all1), a1.pill)}</div>`;
  } else {
    const sharedSec = shared.length ? `<div style="margin-top:.6rem"><div class="col-label">shared</div>${makePills(shared,'background:var(--parchment);border-color:var(--rule);color:var(--ink-faded)')}</div>` : '';
    careersHTML = `
      <div class="careers-cols">
        <div><div class="col-label" style="color:${a1.txt}">Primary: ${a1.name}</div>${makePills(only1, a1.pill)}</div>
        <div><div class="col-label" style="color:${a2.txt}">Secondary: ${a2.name}</div>${makePills(only2, a2.pill)}</div>
      </div>
      ${sharedSec}`;
  }

  el.innerHTML = `
    <div class="char-r-name">${c.name}</div>
    <div class="char-r-source">${c.source} — <em>${c.pseudo || 'Hero'}</em></div>
    <div class="arch-badges">
      <span class="arch-badge" style="background:${a1.bg};border-color:${a1.border};color:${a1.txt}">Primary: ${a1.name}</span>
      ${!same ? `<span class="arch-badge" style="background:${a2.bg};border-color:${a2.border};color:${a2.txt}">Secondary: ${a2.name}</span>` : ''}
    </div>
    <div class="char-r-desc">${c.desc}</div>
    <div class="divider"></div>
    <div class="col-label" style="margin-bottom:6px">Best-fit kits & careers</div>
    ${careersHTML}
    ${c.note ? `<div class="char-r-note">${c.note}</div>` : ''}
  `;
}

renderMatrix();
renderBuilderResult();
renderCharFilters();
renderCharList();
renderClearMatrixFilterBtn();