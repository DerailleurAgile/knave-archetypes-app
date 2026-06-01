const ARCH = {
  blade:    { name:'Blade',    stat:'STR', prompt:'fight and survive melee',        bg:'var(--blade-bg)',    border:'var(--blade-border)',    txt:'var(--blade-txt)',    mid:'var(--blade-mid)',    pill:'background:var(--blade-bg);border-color:var(--blade-border);color:var(--blade-txt)' },
  shadow:   { name:'Shadow',   stat:'DEX', prompt:'steal, deceive, disappear',      bg:'var(--shadow-bg)',   border:'var(--shadow-border)',   txt:'var(--shadow-txt)',   mid:'var(--shadow-mid)',   pill:'background:var(--shadow-bg);border-color:var(--shadow-border);color:var(--shadow-txt)' },
  wayfarer: { name:'Wayfarer', stat:'WIS', prompt:'track, hunt, navigate the wild', bg:'var(--wayfarer-bg)', border:'var(--wayfarer-border)', txt:'var(--wayfarer-txt)', mid:'var(--wayfarer-mid)', pill:'background:var(--wayfarer-bg);border-color:var(--wayfarer-border);color:var(--wayfarer-txt)' },
  sage:     { name:'Sage',     stat:'INT', prompt:'uncover secrets, brew, cast',    bg:'var(--sage-bg)',     border:'var(--sage-border)',     txt:'var(--sage-txt)',     mid:'var(--sage-mid)',     pill:'background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-txt)' },
  devoted:  { name:'Devoted',  stat:'CHA', prompt:'lead, inspire, call on patrons', bg:'var(--devoted-bg)',  border:'var(--devoted-border)',  txt:'var(--devoted-txt)',  mid:'var(--devoted-mid)',  pill:'background:var(--devoted-bg);border-color:var(--devoted-border);color:var(--devoted-txt)' },
  artisan:  { name:'Artisan',  stat:'CON', prompt:'build, endure, master a trade',  bg:'var(--artisan-bg)',  border:'var(--artisan-border)',  txt:'var(--artisan-txt)',  mid:'var(--artisan-mid)',  pill:'background:var(--artisan-bg);border-color:var(--artisan-border);color:var(--artisan-txt)' },
};

const ARCH_ORDER = ['blade','shadow','wayfarer','sage','devoted','artisan'];

const MATRIX = {
  'blade-blade':     { name:'the veteran',           desc:'All you know is the fight. Hard-won scars and harder-won lessons. You keep going when smarter people stop.',                                                                                   eg:'Jaime Lannister, Conan, the old soldier who should have died ten years ago' },
  'blade-shadow':    { name:'the knife in the dark',  desc:'Violence is your tool and discretion your method. You strike when your target least expects it and vanish before anyone can give it a name.',                                                    eg:'Geralt of Rivia, the quiet one at the end of the bar, an assassin-for-hire with principles' },
  'blade-wayfarer':  { name:'the ranger',             desc:'Equally at home in the wild and the melee. You read the land like a map and move through it like a ghost — until the moment you don\'t.',                                                        eg:'Aragorn, Strider, the border-warden, a hunter who has fought too many things that fought back' },
  'blade-sage':      { name:'the war-scholar',        desc:'You fight with a mind as sharp as your blade. You study your enemies before you meet them — and if you can\'t, you adapt.',                                                                      eg:'Tyrion with a sword, the general who leads the charge, a warrior-monk who reads battle like scripture' },
  'blade-devoted':   { name:'the war-priest',         desc:'You serve a power greater than yourself — and demonstrate that service with iron. Faith is not passive for you.',                                                                                eg:'a Templar, a paladin who has made hard choices, a cult enforcer with genuine belief' },
  'blade-artisan':   { name:'the pit veteran',        desc:'Tough, practical, and built to last. Not glamorous — but when things break down, you are the one still standing.',                                                                               eg:'a pit fighter who makes their own weapons, a siege engineer who also defends the wall' },
  'shadow-shadow':   { name:'the ghost',              desc:'You barely exist. False names, false faces, false trails. You are whoever you need to be, and when you are done, you were never there.',                                                          eg:'a master spy, a con artist at the peak of their game, a thief who has never been seen' },
  'shadow-wayfarer': { name:'the outrider',           desc:'You move fast and quiet through terrain others find impossible — and you notice things they miss. Intelligence is your weapon before blades are drawn.',                                          eg:'a frontier scout, a smuggler who knows every back-road, a poacher who knows where the game wardens sleep' },
  'shadow-sage':     { name:'the operator',           desc:'You combine information with cunning. No plan survives contact with the enemy — but yours come close, because you thought of everything.',                                                        eg:'the face who also built the device, a poisoner who wrote the antidote, an archivist who steals secrets' },
  'shadow-devoted':  { name:'the faithful dissembler',desc:'You serve something — god, patron, cause — but from the shadows. You are the hand that works unseen. Whether your faith is genuine or not, only you know.',                                      eg:'a spy for the church, a devotee of a trickster god, an inquisitor who uses unorthodox methods' },
  'shadow-artisan':  { name:'the forger',             desc:'You make things — and make them look like other things. Locks, documents, artifacts, reputations. Your craft leaves no seams that anyone can find.',                                              eg:'a master forger, a thief who builds their own tools, a tinker who asks no questions' },
  'wayfarer-wayfarer':{ name:'the wanderer',          desc:'The road is your home. You know every kind of country and how to read it. Civilization is where you resupply.',                                                                                  eg:'a lone wanderer, the traveler who has been everywhere once, a hermit who moves instead of staying' },
  'wayfarer-sage':   { name:'the learned explorer',   desc:'You came to see the world and understand it. Every ruin has a theory. Every creature has a name — or deserves one. The wilderness is your library.',                                              eg:'Indiana Jones, Lara Croft, a naturalist who also knows how to run, a geographer who maps the unmapped' },
  'wayfarer-devoted':{ name:'the pilgrim',            desc:'You walk a long road for a higher purpose. The journey is the discipline. You have seen more of the world than most priests and more of faith than most travelers.',                               eg:'a monk far from home, a traveling healer, a wandering prophet who means it' },
  'wayfarer-artisan':{ name:'the frontier hand',      desc:'You know how to keep yourself alive in hard country — and how to build what you need to do it. Improvisation is your most-used tool.',                                                           eg:'a prospector who builds their own claim, a trapper who repairs their own traps, a ship\'s carpenter too long at sea' },
  'sage-sage':       { name:'the scholar',            desc:'Knowledge is power and you intend to have all of it. You see patterns others dismiss as noise. You are probably right, and probably insufferable.',                                               eg:'a wizard past their prime, an archivist with an agenda, a polymath who never left the tower' },
  'sage-devoted':    { name:'the theurgist',          desc:'You pursue the truth of things — including divine things. Magic, faith, and reason are not separate categories for you. They are all the same question.',                                        eg:'a cleric who studies too much, an alchemist who prays, a theologian who accidentally summoned something' },
  'sage-artisan':    { name:'the artificer',          desc:'You build what you understand, and you understand almost everything. Your workshop is wherever you happen to be. The things you make work.',                                                      eg:'Indiana Jones (the grading side), a physician-engineer, an alchemist who makes their own equipment' },
  'devoted-devoted': { name:'the true believer',      desc:'Everything you do, you do in service to something larger than yourself. This is either very noble or very dangerous. Probably both.',                                                             eg:'a zealot with good intentions, a high priest, a wandering saint, an inquisitor who is right' },
  'devoted-artisan': { name:'the pastor',             desc:'You serve your community in body as well as spirit. You build things, heal things, and hold things together. You are the reason the village is still standing.',                                  eg:'a village priest who is also the doctor, a dwarven cleric-engineer, a healer who grows the herbs they use' },
  'artisan-artisan': { name:'the tradesperson',       desc:'You are what you make. Deep expertise, patient method, and a reputation that takes decades to build. You do not brag. You do not need to.',                                                      eg:'a master craftsperson, a ship\'s engineer, a physician-surgeon, a brewer of legend' },
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
  const i = ARCH_ORDER.indexOf(a), j = ARCH_ORDER.indexOf(b);
  return i <= j ? `${a}-${b}` : `${b}-${a}`;
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
      <div class="combo-desc">Focusing on paths requiring you to <strong>${a1.prompt}</strong>. Select a Secondary Archetype parameter to secure a compound calling. Character lists are currently filtered for targets matching ${a1.name}.</div>
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
      <div class="combo-desc">Evaluating build tracks built on actions to <strong>${a2.prompt}</strong>. Select a Primary Archetype structural coordinate to intersect. Character list matches are adjusted for ${a2.name}.</div>
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
  
  if (m1 && m2) {
    return (c.archs[0] === m1 && c.archs[1] === m2) || (c.archs[0] === m2 && c.archs[1] === m1);
  }
  
  const activeAxis = m1 || m2;
  return c.archs[0] === activeAxis || c.archs[1] === activeAxis;
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
