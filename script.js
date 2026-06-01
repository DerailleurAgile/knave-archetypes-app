// =========================================================================
// 1. DATA DICTIONARIES & SCHEMAS (Preserved Archetype & Career Architecture)
// =========================================================================

const ARCH = {
  blade:    { name: 'Blade',    stat: 'STR', prompt: 'fight, force, and survive melee',           bg: 'var(--blade-bg)',    border: 'var(--blade-border)',    txt: 'var(--blade-txt)',    mid: 'var(--blade-mid)',    pill: 'background:var(--blade-bg);border-color:var(--blade-border);color:var(--blade-txt)' },
  shadow:   { name: 'Shadow',   stat: 'DEX', prompt: 'steal, deceive, and disappear',             bg: 'var(--shadow-bg)',   border: 'var(--shadow-border)',   txt: 'var(--shadow-txt)',   mid: 'var(--shadow-mid)',   pill: 'background:var(--shadow-bg);border-color:var(--shadow-border);color:var(--shadow-txt)' },
  endurer:  { name: 'Endurer',  stat: 'CON', prompt: 'outlast, resist, and carry more',           bg: 'var(--artisan-bg)',  border: 'var(--artisan-border)',  txt: 'var(--artisan-txt)',  mid: 'var(--artisan-mid)',  pill: 'background:var(--artisan-bg);border-color:var(--artisan-border);color:var(--artisan-txt)' },
  sage:     { name: 'Sage',     stat: 'INT', prompt: 'know, deduce, brew, and cast',              bg: 'var(--sage-bg)',     border: 'var(--sage-border)',     txt: 'var(--sage-txt)',     mid: 'var(--sage-mid)',     pill: 'background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-txt)' },
  wayfarer: { name: 'Wayfarer', stat: 'WIS', prompt: 'scout, track, survive, and shoot',          bg: 'var(--wayfarer-bg)', border: 'var(--wayfarer-border)', txt: 'var(--wayfarer-txt)', mid: 'var(--wayfarer-mid)', pill: 'background:var(--wayfarer-bg);border-color:var(--wayfarer-border);color:var(--wayfarer-txt)' },
  devoted:  { name: 'Devoted',  stat: 'CHA', prompt: 'lead, command, channel, and persuade',      bg: 'var(--devoted-bg)',  border: 'var(--devoted-border)',  txt: 'var(--devoted-txt)',  mid: 'var(--devoted-mid)',  pill: 'background:var(--devoted-bg);border-color:var(--devoted-border);color:var(--devoted-txt)' }
};

const ARCH_CAREERS = {
  blade:    ['Mercenary', 'Gladiator', 'Blacksmith', 'Guard', 'Slayer', 'Knight'],
  shadow:   ['Cutpurse', 'Burglar', 'Assassin', 'Smuggler', 'Spy', 'Charlatan'],
  endurer:  ['Miner', 'Laborer', 'Explorer', 'Mariner', 'Gladiator', 'Blacksmith'],
  sage:     ['Alchemist', 'Scribe', 'Apothecary', 'Astrologer', 'Hedge Wizard', 'Scholar'],
  wayfarer: ['Tracker', 'Hunter', 'Poacher', 'Guide', 'Explorer', 'Mariner'],
  devoted:  ['Inquisitor', 'Preacher', 'Cultist', 'Templar', 'Hedge Wizard', 'Scholar']
};

const CAREER_ITEMS = {
  'mercenary':    ['Halberd', 'Chainmail Coif', 'Gambeson'],
  'gladiator':    ['Trident', 'Net', 'Light Shield'],
  'blacksmith':   ['Warhammer', 'Heavy Apron (Leather)', 'Tongs & Charcoal'],
  'guard':        ['Spear', 'Crossbow', 'Lantern & Oil'],
  'slayer':       ['Greatsword', 'Trophy Trophy Head', 'Whetstone'],
  'knight':       ['Longsword', 'Kite Shield', 'Tabard'],
  'cutpurse':     ['Dagger', 'Leather Armor', 'Crowbar'],
  'burglar':      ['Lockpicks', 'Dark Cloak', '10ft String & Bell'],
  'assassin':     ['Blowgun', 'Poison (1 dose)', 'Garrote'],
  'smuggler':     ['Shortsword', 'False-bottomed Sack', 'Grappling Hook'],
  'spy':          ['Disguise Kit', 'Forged Papers', 'Signet Ring'],
  'charlatan':    ['Loaded Dice', 'Marked Cards', 'Elixir of Health (Fake)'],
  'miner':        ['Pickaxe', 'Shovel', 'Headlamp & Oil'],
  'laborer':      ['Sledgehammer', 'Heavy Gloves', 'Spikes & Pitons'],
  'explorer':     ['Compass', 'Spyglass', 'Map Cases'],
  'mariner':      ['Cutlass', 'Fishing Net', 'Tar Flask'],
  'alchemist':    ['Acid Vial', 'Flint & Steel', 'Mortar & Pestle'],
  'scribe':       ['Ink & Quills', 'Blank Parchment Rolls', 'Wax Seal Kit'],
  'apothecary':   ['Healing Herbs', 'Bandages', 'Pestle'],
  'astrologer':   ['Star Charts', 'Astrolabe', 'Chalk'],
  'hedge wizard': ['Component Pouch', 'Strange Herbs', 'Wooden Staff'],
  'scholar':      ['Ancient Tome', 'Magnifying Glass', 'Journal'],
  'tracker':      ['Longbow', 'Hunting Trap', 'Caltrops'],
  'hunter':       ['Shortbow', 'Skinning Knife', 'Animal Scent Camouflage'],
  'poacher':      ['Sling', 'Snare Wire', 'Camouflage Net'],
  'guide':        ['Walking Staff', 'Signal Horn', 'Climber\'s Kit'],
  'inquisitor':   ['Branding Iron', 'Holy Water', 'Chains'],
  'preacher':     ['Holy Symbol', 'Censer & Incense', 'Book of Hymns'],
  'cultist':      ['Sacrificial Ritual Dagger', 'Ceremonial Mask', 'Black Candles'],
  'templar':      ['Mace', 'Scale Mail', 'Reliquary Container']
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
  hasRolledProvisions: false
};

// =========================================================================
// 3. STEP NAVIGATION CORE LOGIC
// =========================================================================

window.moveStep = function(direction) {
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
  document.getElementById(`pane-step-${wizardState.currentStep}`).classList.remove('active');
  document.getElementById(`badge-step-${wizardState.currentStep}`).classList.remove('active');
  
  wizardState.currentStep = targetStep;
  
  document.getElementById(`pane-step-${wizardState.currentStep}`).classList.add('active');
  document.getElementById(`badge-step-${wizardState.currentStep}`).classList.add('active');
  
  validateStepCompletion();
};

function validateStepCompletion() {
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  
  prevBtn.disabled = (wizardState.currentStep === 1);
  let isStepValid = false;

  switch(wizardState.currentStep) {
    case 1:
      isStepValid = (wizardState.primaryArch !== null && wizardState.secondaryArch !== null);
      break;
    case 2:
      const primaryStatKey = ARCH[wizardState.primaryArch].stat;
      const allocatedToPrimary = wizardState.attributes[primaryStatKey];
      isStepValid = (wizardState.pointsToDistribute === 0 && allocatedToPrimary >= 2);
      break;
    case 3:
      isStepValid = (wizardState.selectedCareers.length === 2);
      break;
    case 4:
      isStepValid = false; // Terminal Step: Block proceeding further
      break;
  }
  
  nextBtn.disabled = !isStepValid;
  nextBtn.style.display = (wizardState.currentStep === 4) ? 'none' : 'inline-block';
}

// =========================================================================
// 4. STEP 1: MATRICES SELECTION CONTROLLERS
// =========================================================================

window.selectMatrixCoordinate = function(rowId, colId) {
  // If the selection has modified an archetype, invalidate downstream choices safely
  if (wizardState.primaryArch !== rowId || wizardState.secondaryArch !== colId) {
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

function renderMatrix() {
  const matrixGridElement = document.getElementById('archetype-matrix');
  if (!matrixGridElement) return;

  const order = ['blade', 'shadow', 'endurer', 'sage', 'wayfarer', 'devoted'];
  matrixGridElement.innerHTML = '';

  // Draw Header Spacer Cell
  const cornerLabel = document.createElement('div');
  cornerLabel.className = 'matrix-header cell-header-corner';
  cornerLabel.innerText = 'P \\ S';
  matrixGridElement.appendChild(cornerLabel);

  // Column Headers
  order.forEach(colKey => {
    const colHeader = document.createElement('div');
    colHeader.className = 'matrix-header cell-header-col';
    if (wizardState.secondaryArch === colKey) colHeader.classList.add('highlight-axis');
    colHeader.innerText = ARCH[colKey].name;
    matrixGridElement.appendChild(colHeader);
  });

  // Rows and Cells
  order.forEach(rowKey => {
    const rowHeader = document.createElement('div');
    rowHeader.className = 'matrix-header cell-header-row';
    if (wizardState.primaryArch === rowKey) rowHeader.classList.add('highlight-axis');
    rowHeader.innerText = ARCH[rowKey].name;
    matrixGridElement.appendChild(rowHeader);

    order.forEach(colKey => {
      const cell = document.createElement('div');
      cell.className = 'matrix-cell';
      
      // FIX: Inject the combined archetype label text into the cell
      const primaryName = ARCH[rowKey].name;
      const secondaryName = ARCH[colKey].name;
      cell.innerText = (rowKey === colKey) ? `Pure ${primaryName}` : `${primaryName} / ${secondaryName}`;

      const isSelectedCell = (wizardState.primaryArch === rowKey && wizardState.secondaryArch === colKey);
      if (isSelectedCell) {
        cell.classList.add('active-coordinate');
        cell.style.background = ARCH[rowKey].mid;
        cell.style.borderColor = ARCH[rowKey].border;
        cell.style.color = '#ffffff';
      } else {
        // Subtle cross-gradient logic layout styling
        cell.style.background = `linear-gradient(135deg, ${ARCH[rowKey].bg} 0%, ${ARCH[colKey].bg} 100%)`;
      }

      cell.onclick = () => selectMatrixCoordinate(rowKey, colKey);
      matrixGridElement.appendChild(cell);
    });
  });
}

function renderMatrixSelectionSummary() {
  const container = document.getElementById('matrix-selection-summary');
  if (!container) return;

  if (!wizardState.primaryArch || !wizardState.secondaryArch) {
    container.innerHTML = `<p class="result-hint">Select a cross-section on the matrix to establish your Primary and Secondary Archetypes.</p>`;
    return;
  }

  const primary = ARCH[wizardState.primaryArch];
  const secondary = ARCH[wizardState.secondaryArch];
  const isSameArchetype = wizardState.primaryArch === wizardState.secondaryArch;

  container.innerHTML = `
    <div class="arch-badges" style="margin-bottom: 12px;">
      <span class="arch-badge" style="background: ${primary.bg}; border-color: ${primary.border}; color: ${primary.txt}">
        Primary Focus: ${primary.name} (+2 or +3 to ${primary.stat})
      </span>
      <span class="arch-badge" style="background: ${secondary.bg}; border-color: ${secondary.border}; color: ${secondary.txt}">
        Secondary Focus: ${secondary.name} (Can accept leftover points to ${secondary.stat})
      </span>
    </div>
    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: var(--ink-faded);">
      Your core functional focus guides your background training: You excel at actions requiring you to <strong>${primary.prompt}</strong>. 
      ${!isSameArchetype ? `Your secondary background provides tricks allowing you to <strong>${secondary.prompt}</strong>.` : `Doubling down as a pure ${primary.name} concentrates your background paths explicitly inside their historical traditions.`}
    </p>
  `;
}

// =========================================================================
// 5. STEP 2: ATTRIBUTES ALLOCATION CONTROLLERS
// =========================================================================

function initAttributeAllocation() {
  const container = document.getElementById('stats-app');
  if (!container) return;
  container.innerHTML = '';
  
  const primaryStat = ARCH[wizardState.primaryArch].stat;
  const secondaryStat = ARCH[wizardState.secondaryArch].stat;

  Object.keys(wizardState.attributes).forEach(stat => {
    let tag = '';
    if (stat === primaryStat) tag = ' <small style="color:var(--blade-border); font-weight:bold;">(Primary: Require ≥ 2)</small>';
    else if (stat === secondaryStat) tag = ' <small style="color:var(--sage-border); font-weight:bold;">(Secondary)</small>';

    const div = document.createElement('div');
    div.className = 'stat-row';
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
  
  document.getElementById('pool-counter').textContent = wizardState.pointsToDistribute;
}

window.modifyStat = function(stat, changeAmount) {
  if (changeAmount > 0 && wizardState.pointsToDistribute === 0) return;
  if (changeAmount < 0 && wizardState.attributes[stat] === 0) return;
  
  wizardState.attributes[stat] += changeAmount;
  wizardState.pointsToDistribute -= changeAmount;
  
  document.getElementById(`val-${stat}`).textContent = wizardState.attributes[stat];
  document.getElementById('pool-counter').textContent = wizardState.pointsToDistribute;
  
  validateStepCompletion();
};

// =========================================================================
// 6. STEP 3: CAREER MAPPING SELECTION CONTROLLERS
// =========================================================================

function initCareerSelection() {
  const container = document.getElementById('career-selection-pools');
  if (!container) return;
  container.innerHTML = '';
  
  const id1 = wizardState.primaryArch;
  const id2 = wizardState.secondaryArch;
  
  const primaryPool = dedupe(ARCH_CAREERS[id1] || []);
  const secondaryPool = id1 === id2 ? [] : dedupe(ARCH_CAREERS[id2] || []);
  
  const sharedCareers = id1 === id2 ? [] : primaryPool.filter(career => secondaryPool.includes(career));
  const exclusivePrimary = primaryPool.filter(career => !sharedCareers.includes(career));
  const exclusiveSecondary = secondaryPool.filter(career => !sharedCareers.includes(career));

  let layoutHTML = `
    <div style="margin-bottom:1rem; text-align:center; font-weight:600; color:var(--blade-border)">
      Selected Careers: ${wizardState.selectedCareers.length} / 2
    </div>
    <div class="careers-cols" style="display: grid; grid-template-columns: ${id1 === id2 ? '1fr' : '1fr 1fr'}; gap: 1.5rem;">
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
        <div style="display:flex; flex-wrap:wrap; gap:6px;">${buildCareerPillElements(sharedCareers, 'background:var(--parchment-dark); border-color:var(--rule); color:var(--ink)')}</div>
      </div>
    `;
  }
  
  container.innerHTML = layoutHTML;
}

function buildCareerPillElements(careerList, pillInlineStyles) {
  return careerList.map(careerName => {
    const generalizedKey = careerName.toLowerCase().trim();
    const isSelected = wizardState.selectedCareers.includes(generalizedKey);
    const dynamicSelectionClass = isSelected ? 'selected' : '';
    
    // Explicit selection indicators matching original styler schemas
    const styleOverride = isSelected 
      ? `${pillInlineStyles}; box-shadow: inset 0 0 0 2px var(--ink); font-weight: bold; transform: scale(1.03);` 
      : pillInlineStyles;

    return `
      <span class="pill ${dynamicSelectionClass}" style="${styleOverride}; cursor:pointer; padding:6px 12px; border-radius:4px; display:inline-block; transition:all 0.15s;" 
            onclick="toggleWizardCareer('${generalizedKey}')">
        ${careerName} ${isSelected ? '✓' : ''}
      </span>
    `;
  }).join('');
}

window.toggleWizardCareer = function(careerKey) {
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
  const gearListContainer = document.getElementById('career-gear-list');
  if (!gearListContainer) return;
  
  gearListContainer.innerHTML = '';
  
  // Wipe and rebuild baseline equipment arrays based on chosen career pools
  wizardState.inventory = [];
  
  wizardState.selectedCareers.forEach(careerKey => {
    const structuralCareerItems = CAREER_ITEMS[careerKey] || [];
    structuralCareerItems.forEach(item => wizardState.inventory.push(item));
  });

  // Knave 2e Spellbook Archetype Trigger: Give a starting spellbook if INT > 0
  if (wizardState.attributes.INT > 0) {
    const explicitSpellbookItem = 'Spellbook (Contains 1 random Level-1 Spell)';
    if (!wizardState.inventory.includes(explicitSpellbookItem)) {
      wizardState.inventory.push(explicitSpellbookItem);
    }
  }

  // Render text readouts
  if (wizardState.inventory.length === 0) {
    gearListContainer.innerHTML = '<p class="step-instruction">No equipment loaded. Check upstream choices.</p>';
  } else {
    gearListContainer.innerHTML = `
      <ul style="padding-left: 1.25rem; margin: 0 0 1rem 0; line-height: 1.6; color: var(--ink-faded);">
        ${wizardState.inventory.map(item => `<li><strong>${item}</strong></li>`).join('')}
      </ul>
    `;
  }
  
  refreshInventoryDisplay();
}

window.rollStockGold = function() {
  if (wizardState.hasRolledProvisions) {
    alert('Provisions, tools, and starting coin have already been rolled for this character.');
    return;
  }

  // Knave 2e Core Rule: Roll 3d6 for baseline copper pieces
  const standardDiceRollResult = (Math.floor(Math.random() * 6) + 1) + 
                                 (Math.floor(Math.random() * 6) + 1) + 
                                 (Math.floor(Math.random() * 6) + 1);

  // Core Provision Bundle Packages
  const baselineProvisions = ['3d6 Coins (' + standardDiceRollResult + ' Copper)', '2 Rations', "50' Rope", '2 Torches'];
  
  baselineProvisions.forEach(provisionItem => {
    wizardState.inventory.push(provisionItem);
  });

  wizardState.hasRolledProvisions = true;
  initEquipmentSummary(); // Re-render text panel listings
};

function refreshInventoryDisplay() {
  const currentSlotsTracker = document.getElementById('slot-tracker');
  const maxSlotsTracker = document.getElementById('max-slots-tracker');
  const inventoryGridElement = document.getElementById('inventory-slots-grid');
  
  if (!inventoryGridElement) return;
  inventoryGridElement.innerHTML = '';
  
  // Structural Carrying Rule: Maximum safe boundary capacity calculation formula ($10 + \text{CON}$)
  const configuredMaxCarryCapacity = 10 + wizardState.attributes.CON;
  const itemsCurrentlyInInventory = wizardState.inventory.length;

  if (currentSlotsTracker) currentSlotsTracker.textContent = itemsCurrentlyInInventory;
  if (maxSlotsTracker) maxSlotsTracker.textContent = configuredMaxCarryCapacity;

  for (let slotIndex = 0; slotIndex < configuredMaxCarryCapacity; slotIndex++) {
    const itemInSlot = wizardState.inventory[slotIndex] || '— [Empty Slot] —';
    const isOccupiedSlot = !!wizardState.inventory[slotIndex];
    
    const rowDiv = document.createElement('div');
    rowDiv.className = 'inv-slot-row';
    if (!isOccupiedSlot) {
      rowDiv.style.opacity = '0.5';
      rowDiv.style.color = 'var(--ink-ghost)';
    }
    
    rowDiv.innerHTML = `
      <span>Slot ${slotIndex + 1}:</span>
      <span style="font-family: 'Crimson Text', serif; font-size: 14px;">${itemInSlot}</span>
    `;
    inventoryGridElement.appendChild(rowDiv);
  }
  
  // Visual alert feedback warnings if player scales past carry capacity barriers
  if (itemsCurrentlyInInventory > configuredMaxCarryCapacity) {
    if (currentSlotsTracker) currentSlotsTracker.style.color = 'var(--blade-border)';
    rowDiv.style.borderColor = 'var(--blade-border)';
  } else {
    if (currentSlotsTracker) currentSlotsTracker.style.color = 'inherit';
  }
}

// =========================================================================
// 8. DOCUMENT READY RUNTIME INITIALIZATION HOOKS
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderMatrix();
  validateStepCompletion();
});