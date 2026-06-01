const ARCH = {
  blade:    { name:'Blade',    stat:'STR', prompt:'fight, force, and survive melee',           bg:'var(--blade-bg)',    border:'var(--blade-border)',    txt:'var(--blade-txt)',    mid:'var(--blade-mid)',    pill:'background:var(--blade-bg);border-color:var(--blade-border);color:var(--blade-txt)' },
  shadow:   { name:'Shadow',   stat:'DEX', prompt:'steal, deceive, and disappear',             bg:'var(--shadow-bg)',   border:'var(--shadow-border)',   txt:'var(--shadow-txt)',   mid:'var(--shadow-mid)',   pill:'background:var(--shadow-bg);border-color:var(--shadow-border);color:var(--shadow-txt)' },
  endurer:  { name:'Endurer',  stat:'CON', prompt:'outlast, resist, and carry more',           bg:'var(--artisan-bg)',  border:'var(--artisan-border)',  txt:'var(--artisan-txt)',  mid:'var(--artisan-mid)',  pill:'background:var(--artisan-bg);border-color:var(--artisan-border);color:var(--artisan-txt)' },
  sage:     { name:'Sage',     stat:'INT', prompt:'know, deduce, brew, and cast',              bg:'var(--sage-bg)',     border:'var(--sage-border)',     txt:'var(--sage-txt)',     mid:'var(--sage-mid)',     pill:'background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-txt)' },
  wayfarer: { name:'Wayfarer', stat:'WIS', prompt:'track, perceive, and navigate the wild',   bg:'var(--wayfarer-bg)', border:'var(--wayfarer-border)', txt:'var(--wayfarer-txt)', mid:'var(--wayfarer-mid)', pill:'background:var(--wayfarer-bg);border-color:var(--wayfarer-border);color:var(--wayfarer-txt)' },
  devoted:  { name:'Devoted',  stat:'CHA', prompt:'lead, inspire, and call on higher powers',  bg:'var(--devoted-bg)',  border:'var(--devoted-border)',  txt:'var(--devoted-txt)',  mid:'var(--devoted-mid)',  pill:'background:var(--devoted-bg);border-color:var(--devoted-border);color:var(--devoted-txt)' },
};

const ARCH_ORDER = ['blade','shadow','endurer','sage','wayfarer','devoted'];

// DIRECTION-SENSITIVE MATRIX — all 36 cells unique
// Key: 'PRIMARY-SECONDARY' (Row = Primary, Column = Secondary)
const MATRIX = {

  // ── DIAGONALS ────────────────────────────────────────────────────────────
  'blade-blade':       { name:'the veteran',          desc:'All you know is the fight. Hard-won scars and harder-won lessons. You have been hit by everything and you are still here.',                                                                       eg:'Jaime Lannister, Conan, the old soldier who should have died ten years ago, a retired pit champion' },
  'shadow-shadow':     { name:'the ghost',             desc:'You barely exist. False names, false faces, false trails. You are whoever the moment requires, and when it is over, you were never there.',                                                       eg:'a master spy, a con artist at the peak of their game, a thief who has never once been seen' },
  'endurer-endurer':   { name:'the survivor',          desc:'You do not overcome hardship. You outlast it. Cold, poison, starvation, injury — you absorb everything and keep moving. You are the last one left.',                                             eg:'a castaway who walked home, a prisoner who outlasted their captors, a hermit who has not been warm in a decade' },
  'sage-sage':         { name:'the scholar',           desc:'Knowledge is power and you intend to have all of it. You see patterns others dismiss as noise. You are probably right and probably insufferable about it.',                                        eg:'a wizard past their prime, an archivist with an agenda, a polymath who never left the tower' },
  'wayfarer-wayfarer': { name:'the wanderer',          desc:'The road is your home. You know every kind of country and how to read it. You do not pass through the wilderness — you live in it.',                                                               eg:'a lone wanderer, a scout who stopped reporting in, a hermit who moves rather than stays' },
  'devoted-devoted':   { name:'the true believer',     desc:'Everything you do, you do in service to something larger than yourself. Your patron, cause, or creed is not a tool — it is the point. This is either very noble or very dangerous.',              eg:'a zealot with genuinely good intentions, a wandering saint, a high priest who has seen too much to doubt' },

  // ── BLADE PRIMARY ────────────────────────────────────────────────────────
  'blade-shadow':      { name:'the skirmisher',        desc:'You fight dirty. Steel and misdirection working together — feints, improvised weapons, sand in the eyes. You do not win fights cleanly; you win them decisively.',                                eg:'Bronn of the Blackwater, a cynical mercenary who fights to win, an arena fighter who has no honor and no wounds' },
  'blade-endurer':     { name:'the iron wall',         desc:'You absorb punishment that would break anyone else and keep fighting. You are not fast and not subtle — you are the last person standing at the end of a long, ugly engagement.',                  eg:'a siege anchor, a shield-bearer who holds the line, a pit fighter who just will not go down' },
  'blade-sage':        { name:'the war-scholar',       desc:'You study your enemies before you meet them. Combat is a problem with a correct solution and you work it out in advance. If you cannot, you adapt faster than they do.',                           eg:'a general who leads from the front, a warrior-monk who reads battle like scripture, a duelist who fights twice — once on paper, once in the yard' },
  'blade-wayfarer':    { name:'the warden',            desc:'You fight in the field, not on formal ground. You read terrain the way other soldiers read formations and use it as a weapon. The wild is your tactical advantage.',                               eg:'Aragorn as Strider, a border-guard who knows every pass, a ranger who has been at war with the forest for a decade' },
  'blade-devoted':     { name:'the templar',           desc:'Your sword is consecrated to a higher cause. You are a frontline crusader — violence as direct expression of holy decree, sovereign law, or ancient oath. Faith that can split armor.',            eg:'a paladin who has made hard choices, a holy executioner, a knight-militant bound by blood oaths' },

  // ── SHADOW PRIMARY ───────────────────────────────────────────────────────
  'shadow-blade':      { name:'the knife in the dark', desc:'You do not trade blows across a field. You slip past defenses and settle the matter with a single precise strike before anyone knows the fight has started. Violence as surgery.',                 eg:'an assassin-for-hire with a code, a syndicate cleaner, a duelist who never gives their target a fair chance' },
  'shadow-endurer':    { name:'the escape artist',     desc:'You get caught. That is part of the plan. What sets you apart is that you always get out — through pain, improvisation, and sheer refusal to stay where they put you.',                            eg:'a thief who treats prison as a revolving door, an operative who can walk away from anything, a spy who has been tortured and talked their way free' },
  'shadow-sage':       { name:'the mastermind',        desc:'You do not improvise. You prepare. Every identity is tailored, every exit pre-arranged, every guard bribed in advance. No plan survives contact with the enemy — except yours.',                   eg:'a spymaster, a high-stakes con artist who has never been caught, a black-market archivist who sells leverage' },
  'shadow-wayfarer':   { name:'the outrider',          desc:'You use terrain the way others use shadows — as cover, corridor, and escape route. You move fast and quiet through country that stops everyone else.',                                             eg:'a smuggler who knows every back-road and hidden ford, a poacher who knows where the wardens sleep, a frontier scout who reports to no one' },
  'shadow-devoted':    { name:'the silent hand',       desc:'You carry out the unacknowledged will of your faith or patron from the dark. You are the shadow the altar casts. Whether your belief is genuine is between you and your god.',                     eg:'a spy for the church, an assassin for a trickster cult, a saboteur whose order cannot publicly acknowledge them' },

  // ── ENDURER PRIMARY ──────────────────────────────────────────────────────
  'endurer-blade':     { name:'the juggernaut',        desc:'You absorb the hit. Then you hit back. You are not a finesse fighter — you are a force of nature that has decided to move in one direction and has not stopped yet.',                               eg:'a berserker who cannot be put down, a wrestler who fights through broken ribs, a soldier who took three arrows and kept the wall' },
  'endurer-shadow':    { name:'the feral',             desc:'You survive by instinct and speed. Where others plan, you react. Cornered, you become unpredictable. You are difficult to catch, difficult to hold, and difficult to kill.',                       eg:'a wilderness fugitive, a street rat who grew up hard, a scout who operates too far from support to do anything but adapt' },
  'endurer-sage':      { name:'the field scholar',     desc:'You go where the knowledge is, no matter the conditions. Cold, altitude, hostile territory — you endure it because what you find there is worth it. You come back with things no one else has.',    eg:'Indiana Jones, a field physician who works in war zones, a naturalist who winters in the mountains to study migration' },
  'endurer-wayfarer':  { name:'the deepwalker',        desc:'You go further than anyone else and you come back. Your body is built for distance and deprivation; your instincts keep you alive in places where maps run out.',                                   eg:'a long-range pathfinder, an explorer who crossed the desert on foot, a diver who holds their breath too long and always surfaces' },
  'endurer-devoted':   { name:'the immovable',         desc:'Your faith is structural. It does not inspire — it anchors. You are the one the party looks to when everything is falling apart, not because you have answers, but because you have not moved.',    eg:'a confessor who absorbed a century of other people\'s despair and kept going, a martyr-in-waiting who refuses to be one' },

  // ── SAGE PRIMARY ─────────────────────────────────────────────────────────
  'sage-blade':        { name:'the spellsword',        desc:'You picked up a weapon to protect your work. You see combat as a technical problem and magic as a force multiplier. You are not the strongest fighter in the room — but you are the most prepared.',  eg:'an occult investigator, a scholar who guards forbidden grimoires with steel, an academic duelist who fights with annotations in the margins' },
  'sage-shadow':       { name:'the apostate',          desc:'You use your expertise to take things that are not yours. Research methods to locate the target; tradecraft to extract it. You are a thief who knows exactly what they are stealing and why it matters.', eg:'a defrocked alchemist who sells what the guild will not, an archivist who forges lineage papers, a thief of library vaults' },
  'sage-endurer':      { name:'the artificer',         desc:'You build things that last because you understand the principles behind them. Theory translated into durable physical objects — engines, instruments, fortifications, potions that actually work.',     eg:'a clockwork engineer, a siege architect, a physician who designs their own instruments, a brewer whose recipes are documented' },
  'sage-wayfarer':     { name:'the field naturalist',  desc:'You systematize the world. You venture out of towers to catalog venomous flora, track migrations, analyze geological fractures, and document things that have no names yet.',                         eg:'an academic cartographer, a toxicologist collecting field samples, a naturalist who names the creature that tries to eat them' },
  'sage-devoted':      { name:'the theurgist',         desc:'Magic, faith, and reason are not separate fields for you. They are the same engine viewed from different angles. You study miracles the way an engineer studies a bridge — to understand the load.',    eg:'an alchemist who prays over the crucible, a cleric who knows too much to be orthodox, Van Helsing' },

  // ── WAYFARER PRIMARY ─────────────────────────────────────────────────────
  'wayfarer-blade':    { name:'the beast-slayer',      desc:'You track dangerous quarry and close with it. You treat dangerous creatures as apex predators to study, trap, and fight on their own terms — not yours.',                                           eg:'a monster hunter, a deep-woods tracker who had to learn to fight when the thing fought back, Kraven the Hunter' },
  'wayfarer-shadow':   { name:'the poacher',           desc:'You take what the crown says belongs to them. You move through the forest silently, set camouflaged snares, and disappear before the wardens know you were there.',                                  eg:'Robin Hood, a forest outlaw, a grey-market trapper who sells what they catch to the wrong people' },
  'wayfarer-endurer':  { name:'the pathfinder',        desc:'You navigate extreme terrain and you survive it. Other scouts map what is safe; you map what is not, because someone has to know where the passes are before the army uses them.',                    eg:'a long-range wilderness scout, a mountain guide who has lost toes and keeps climbing, a sailor who charts the dangerous coast' },
  'wayfarer-sage':     { name:'the cartographer',      desc:'You observe the world systematically. Every hex has a theory; every creature deserves a name. You perceive things and then categorize them, because knowledge without order is noise.',               eg:'Lara Croft, a naturalist-explorer, a geographer who maps anomalous zones and annotates what killed their predecessors' },
  'wayfarer-devoted':  { name:'the oracle',            desc:'You read the world as a text. Weather, terrain, the behavior of animals — all of it is meaningful. You perceive signs and you speak their meaning to those who will listen, or will not.',            eg:'a seer who reads the land, a wandering prophet who is usually right, a shaman whose omens have a frustrating tendency to be correct' },

  // ── DEVOTED PRIMARY ───────────────────────────────────────────────────────
  'devoted-blade':     { name:'the zealot',            desc:'Your conviction has an edge. You do not wait for the institution to act — you pick up the iron yourself. Whether that is justice or fanaticism depends on who is asking.',                           eg:'an inquisitor who hunts personally, a religious enforcer, a warrior vindicating a broken oath in front of God' },
  'devoted-shadow':    { name:'the heretic',           desc:'You keep a banned faith alive. Cells, coded messages, midnight rites — you operate below the surface of an oppressive order and you have learned to be impossible to find.',                         eg:'a hidden priest of a destroyed order, a revolutionary whose ideology has been outlawed, John Constantine' },
  'devoted-endurer':   { name:'the pastor',            desc:'You serve your community in body as well as spirit. You mend bones, patch roofs, grow the herbs you use, and hold small villages together through things that would scatter everyone else.',           eg:'a village priest who is also the doctor, Friar Tuck, a frontier preacher who works the fields alongside their congregation' },
  'devoted-sage':      { name:'the monastic',          desc:'You are the keeper of your order\'s memory. Lineages, relics, old accounts — you guard the institutional knowledge that tells your flock who they are and what they are for.',                        eg:'a high church scholar, Brother Cadfael, a theologian who has read everything and believes it' },
  'devoted-wayfarer':  { name:'the pilgrim',           desc:'You walk a long road for a higher purpose. The journey is the discipline. You have seen more of the world than most priests and more of faith than most travelers, and neither has made you stop.',    eg:'a wandering monk, a desert prophet, a traveling healer, a palmer far from any holy land' },
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
  { id:'indy',        name:'Indiana Jones',       source:'Spielberg / Lucas',   genre:'adventure',     archs:['sage','artisan'],   pseudo:'the artificer', desc:'A professor who sprints through tombs for a living. Deep historical knowledge, practical enough to improvise under fire, surprisingly good in a brawl.', careers:{ sage:['antiquarian','investigator','folklorist','astrologer'], artisan:['architect','carpenter','physician','mason'] }, note:'INT primary — both archetypes run on it. STR second; he punches a lot of Nazis. CON third for the item slots to carry all those artifacts.' },
  { id:'lara',        name:'Lara Croft',          source:'Core Design',         genre:'adventure',     archs:['wayfarer','sage'],  pseudo:'the learned explorer', desc:'An archaeologist who operates in the field, alone, under fire. Navigates hostile terrain and hostile history with equal fluency.', careers:{ wayfarer:['explorer','hunter','prospector','scout'], sage:['antiquarian','investigator','naturalist','arcanist'] }, note:'WIS and INT. Explorer career gives sextant and spyglass — exactly right. Hunter adds tent and survival gear.' },
  { id:'robin',       name:'Robin Hood',          source:'English folklore',    genre:'fantasy',       archs:['wayfarer','shadow'],pseudo:'the outrider', desc:'An outlaw who knows the forest better than the foresters and uses that knowledge to redistribute wealth — selectively.', careers:{ wayfarer:['poacher','gamekeeper','hunter','scout'], shadow:['bandit','burglar','spy','smuggler'] }, note:'WIS primary — the bow runs on WIS in Knave. DEX second. Poacher career: animal scent, bow, 20 arrows.' },
  { id:'zorro',       name:'Zorro / d\'Artagnan', source:'McCulley / Dumas',    genre:'adventure',     archs:['shadow','blade'],   pseudo:'the knife in the dark', desc:'A duelist with a double life. Noble enough to move in court, dangerous enough to clear a room — and vain enough to leave a calling card.', careers:{ shadow:['acrobat','actor','courtier','gambler'], blade:['soldier','fence','gambler','assassin'] }, note:'DEX primary, CHA second. Courtier covers the social mask; gambler (rapier, cards, dice) covers the duel.' },
  { id:'bond',        name:'James Bond',          source:'Fleming',             genre:'thriller',      archs:['shadow','sage'],    pseudo:'the operator', desc:'A government assassin with impeccable manners and a talent for being somewhere he shouldn\'t be. Gathers intelligence, eliminates targets, orders something expensive afterward.', careers:{ shadow:['spy','assassin','courtier','smuggler'], sage:['investigator','alchemist','physician','arcanist'] }, note:'DEX and INT. Spy career (caltrops, poison, forged papers). Investigator adds the journal and manacles.' },
  { id:'odysseus',    name:'Odysseus',            source:'Homer',               genre:'myth',          archs:['shadow','devoted'], pseudo:'the faithful dissembler', desc:'The cleverest man in the room, always. Beloved of a goddess, cursed by a god, determined to get home by any means necessary. The plan always has three layers.', careers:{ shadow:['spy','orator','actor','smuggler'], devoted:['pilgrim','oracle','priest','philosopher'] }, note:'CHA and DEX — he talks and maneuvers his way through everything.' },
  { id:'vanhelsing',  name:'Van Helsing',         source:'Stoker',              genre:'horror',        archs:['devoted','sage'],   pseudo:'the theurgist', desc:'A scholar of the supernatural who has made it his business to destroy what he studies. Faith and reason are both weapons. So is a stake.', careers:{ devoted:['inquisitor','priest','pilgrim','cultist'], sage:['physician','folklorist','investigator','herbalist'] }, note:'CHA and INT. Priest career gives holy water and stakes out of the box. Physician adds the saw and scalpel.' },
  { id:'merlin',      name:'Merlin',              source:'Arthurian legend',    genre:'fantasy',       archs:['sage','devoted'],   pseudo:'the theurgist', desc:'A ancient intelligence wearing a wizard\'s disguise. Arranges the shape of kingdoms the way others arrange furniture. The magic is incidental.', careers:{ sage:['arcanist','astrologer','philosopher','antiquarian'], devoted:['oracle','priest','cultist','pilgrim'] }, note:'INT and CHA. Arcanist gives the spellbook; astrologer adds star charts and almanac. Oracle for the tarot deck.' },
  { id:'sparrow',     name:'Jack Sparrow',        source:'Disney / Verbinski',  genre:'adventure',     archs:['shadow','wayfarer'],pseudo:'the outrider', desc:'A disreputable sailor who is either the luckiest fool alive or a genius pretending to be a fool. Probably both.', careers:{ shadow:['pirate','gambler','smuggler','charlatan'], wayfarer:['sailor','boatman','explorer','scout'] }, note:'DEX and WIS. Charlatan (costume, fake elixir, degree) is too good to pass up.' },
  { id:'ripley',      name:'Ellen Ripley',        source:'Scott / Cameron',     genre:'sci-fi',        archs:['artisan','blade'],  pseudo:'the pit veteran', desc:'A working professional who survives through practical knowledge, cold-headed problem solving, and the willingness to do whatever the situation requires.', careers:{ artisan:['shipwright','carpenter','watchman','innkeeper'], blade:['soldier','guard','thieftaker','saboteur'] }, note:'INT and STR — the shipwright kit is her technical competence, soldier and saboteur cover the rest. CON third for the extra wound slots she always needs.' },
  { id:'constantine', name:'John Constantine',    source:'DC / Vertigo',        genre:'horror',        archs:['shadow','devoted'], pseudo:'the faithful dissembler', desc:'Knows evil intimately — often because he caused it. Defeats it through manipulation, debt-collection, and exploiting rules that most people don\'t know exist. His faith is real but it isn\'t clean.', careers:{ shadow:['spy','charlatan','smuggler','cultist'], devoted:['priest','oracle','inquisitor','pilgrim'] }, note:'CHA primary, then split DEX and INT. Cultist career (dagger, ritual robes, amulet) is his kit exactly.' },
  { id:'cadfael',     name:'Brother Cadfael',     source:'Ellis Peters',        genre:'mystery',       archs:['devoted','sage'],   pseudo:'the theurgist', desc:'A monk who spent half his life as a soldier before finding God — and then found that God had use for a man who understand both herbalism and homicide.', careers:{ devoted:['priest','acolyte','pilgrim','philosopher'], sage:['herbalist','physician','investigator','naturalist'] }, note:'CHA and INT. Herbalist career (herbs, sickle, herb manual) is his primary toolkit.' },
  { id:'tuck',        name:'Friar Tuck',          source:'English folklore',    genre:'fantasy',       archs:['devoted','artisan'],pseudo:'the pastor', desc:'A man of God who is also a man of the people — and the ale, and the table, and the occasional brawl. Builds things, feeds people, and keeps the community standing.', careers:{ devoted:['priest','acolyte','pilgrim','hermit'], artisan:['cook','brewer','carpenter','innkeeper'] }, note:'CHA primary, INT second — the brewer and cook careers run on knowing your craft. CON third; he takes a lot of hits for a man of the cloth.' },
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
      <p class="stat-hint" style="margin-top:.75rem">⚠ CON benefits every archetype equally — it governs item slots and wound capacity. Prioritise it after your primary stat.</p>
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
      <p class="stat-hint" style="margin-top:.75rem">⚠ CON benefits every archetype equally — it governs item slots and wound capacity. Prioritise it after your primary stat.</p>
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
    ? `<p class="stat-hint">Primary stat focus: <strong>${a1.stat}</strong> — assign higher starting bonuses here. CON benefits every archetype — prioritise it after your primary stat.</p>`
    : `<p class="stat-hint">Primary focus: <strong>${a1.stat}</strong> · Secondary focus: <strong>${a2.stat}</strong>. CON benefits every archetype — prioritise it after these two.</p>`;

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