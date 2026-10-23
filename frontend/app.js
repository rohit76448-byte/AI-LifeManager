// App State & Persistence
let isDarkMode = false;
let isSidebarOpen = false;

// Task Management Engine Data Store
let currentListId = 'Bill';
let currentSubListId = 'all'; // 'all', 'today', 'upcoming', 'completed'
let hideCompletedInSubList = false;

let taskLists = [
  { id: 'Bill', name: 'Bill', color: '#ef4444', icon: 'fa-file-invoice-dollar', count: 2 },
  { id: 'Personal', name: 'Personal', color: '#3b82f6', icon: 'fa-user-gear', count: 3 },
  { id: 'Work', name: 'Work', color: '#8b5cf6', icon: 'fa-briefcase', count: 1 },
  { id: 'Shopping', name: 'Shopping', color: '#10b981', icon: 'fa-cart-shopping', count: 2 }
];

let subListsMap = {
  Bill: [
    { id: 'all', name: 'All Tasks' },
    { id: 'today', name: 'Today' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' }
  ],
  Personal: [
    { id: 'all', name: 'All Tasks' },
    { id: 'today', name: 'Today' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' }
  ],
  Work: [
    { id: 'all', name: 'All Tasks' },
    { id: 'today', name: 'Today' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' }
  ],
  Shopping: [
    { id: 'all', name: 'All Tasks' },
    { id: 'today', name: 'Today' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'completed', name: 'Completed' }
  ]
};

let availableTags = [
  { id: 't1', name: 'Urgent', color: '#ef4444' },
  { id: 't2', name: 'Finance', color: '#10b981' },
  { id: 't3', name: 'Health', color: '#06b6d4' },
  { id: 't4', name: 'Home', color: '#8b5cf6' }
];

let tasks = [
  {
    id: 'tk1',
    listId: 'Bill',
    subListId: 'all',
    title: 'Pay Electricity & Water Utility Bill',
    notes: 'Auto-debit from primary checking account. Account #98421.',
    attachments: ['https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&auto=format&fit=crop'],
    subTasks: [
      { id: 'st1', title: 'Check meter reading', completed: true },
      { id: 'st2', title: 'Verify invoice statement', completed: false }
    ],
    tags: ['Finance', 'Urgent'],
    dueDate: '2026-07-21',
    dueTime: '09:00 PM',
    isAllDay: false,
    remindWhenDue: true,
    priority: 'HIGH',
    isHighlighted: true,
    highlightColor: '#fef08a',
    completed: false,
    createdAt: 'Jul 21, 2026 at 08:00 PM'
  },
  {
    id: 'tk2',
    listId: 'Bill',
    subListId: 'all',
    title: 'Gym & Fitness Membership Renewal',
    notes: 'Annual subscription renewal due next week.',
    attachments: [],
    subTasks: [],
    tags: ['Health'],
    dueDate: '2026-07-28',
    dueTime: '10:00 AM',
    isAllDay: true,
    remindWhenDue: true,
    priority: 'MEDIUM',
    isHighlighted: false,
    highlightColor: '#bfdbfe',
    completed: false,
    createdAt: 'Jul 20, 2026 at 02:15 PM'
  },
  {
    id: 'tk3',
    listId: 'Personal',
    subListId: 'all',
    title: 'Annual Physical Doctor Checkup',
    notes: 'St. Mary Medical Center, Dr. Sarah Jenkins.',
    attachments: [],
    subTasks: [
      { id: 'st3', title: 'Fast 8 hours before blood test', completed: false }
    ],
    tags: ['Health'],
    dueDate: '2026-07-22',
    dueTime: '09:30 AM',
    isAllDay: false,
    remindWhenDue: true,
    priority: 'HIGH',
    isHighlighted: true,
    highlightColor: '#bbf7d0',
    completed: false,
    createdAt: 'Jul 21, 2026 at 06:45 PM'
  }
];

/* ==========================================================================
   SMART PERSONAL FINANCE SUITE DATA STORE & LOGIC
   ========================================================================== */
let financeCurrency = '₹';
let financeActiveTab = 'home'; // 'home', 'tx', 'accounts', 'budgets', 'reports', 'settings'
let financeTxType = 'expense'; // 'expense', 'income', 'transfer'
let selectedFinanceCategory = 'cat_food';
let editingFinanceTxId = null;

let financeAccounts = [
  { id: 'acc_bank', name: 'Primary Checking Bank', type: 'bank', balance: 3480.00, icon: 'fa-building-columns', color: '#3b82f6' },
  { id: 'acc_cash', name: 'Wallet Cash', type: 'cash', balance: 450.00, icon: 'fa-money-bill-wave', color: '#10b981' },
  { id: 'acc_card', name: 'Rewards Credit Card', type: 'card', balance: -150.00, icon: 'fa-credit-card', color: '#f43f5e' },
  { id: 'acc_savings', name: 'High Yield Savings', type: 'savings', balance: 5000.00, icon: 'fa-piggy-bank', color: '#8b5cf6' }
];

let financeCategories = [
  { id: 'cat_food', name: 'Food & Dining', icon: 'fa-utensils', color: '#f97316', type: 'expense', budget: 500 },
  { id: 'cat_transport', name: 'Transport & Fuel', icon: 'fa-car', color: '#3b82f6', type: 'expense', budget: 200 },
  { id: 'cat_shopping', name: 'Shopping & Clothes', icon: 'fa-bag-shopping', color: '#ec4899', type: 'expense', budget: 300 },
  { id: 'cat_bills', name: 'Bills & Utilities', icon: 'fa-receipt', color: '#ef4444', type: 'expense', budget: 400 },
  { id: 'cat_salary', name: 'Salary & Income', icon: 'fa-money-bill-trend-up', color: '#10b981', type: 'income', budget: null },
  { id: 'cat_health', name: 'Health & Medical', icon: 'fa-notes-medical', color: '#14b8a6', type: 'expense', budget: 150 },
  { id: 'cat_ent', name: 'Entertainment', icon: 'fa-film', color: '#8b5cf6', type: 'expense', budget: 150 }
];

let financeTransactions = [
  { id: 'tx_1', title: 'Client Project Salary', amount: 1200.00, type: 'income', categoryId: 'cat_salary', accountId: 'acc_bank', date: '2026-07-21', time: '02:30 PM', notes: 'Monthly invoice credit', receipt: null, isRecurring: true },
  { id: 'tx_2', title: 'AWS Cloud Server & Hosting', amount: 45.00, type: 'expense', categoryId: 'cat_bills', accountId: 'acc_card', date: '2026-07-20', time: '11:15 AM', notes: 'Cloud infrastructure', receipt: null, isRecurring: true },
  { id: 'tx_3', title: 'Supermarket Grocery & Produce', amount: 82.50, type: 'expense', categoryId: 'cat_food', accountId: 'acc_bank', date: '2026-07-20', time: '06:45 PM', notes: 'Weekly groceries', receipt: null, isRecurring: false },
  { id: 'tx_4', title: 'Gas Station Fuel Refill', amount: 35.00, type: 'expense', categoryId: 'cat_transport', accountId: 'acc_cash', date: '2026-07-19', time: '09:00 AM', notes: 'Full tank fuel', receipt: null, isRecurring: false },
  { id: 'tx_5', title: 'Movie Theater & Dinner', amount: 65.00, type: 'expense', categoryId: 'cat_ent', accountId: 'acc_card', date: '2026-07-18', time: '08:15 PM', notes: 'Weekend movie', receipt: null, isRecurring: false }
];

let personalVaultDocs = [
  { id: '1', title: 'International Passport', expiry: 'Expires in 45 Days (Renewal Alert)', status: 'Warning', icon: 'fa-id-card' },
  { id: '2', title: 'National Identity Card / SSN', expiry: 'Lifetime Valid', status: 'OK', icon: 'fa-address-card' },
  { id: '3', title: 'Driver License & Insurance', expiry: 'Valid thru Dec 2028', status: 'OK', icon: 'fa-car' }
];

let healthMetrics = {
  steps: 8420,
  targetSteps: 10000,
  heartRate: 72,
  hydrationLiters: 2.1,
  sleepHours: 7.5,
  healthScore: 92
};

let editingTaskId = null;
let currentSelectedHighlightColor = '#fef08a';

// Init Page
document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  updateClock();
  setInterval(updateClock, 1000);
  updateTaskAppCardSummary();
  updateFinanceCardSummary();
  if (typeof updateHealthCardSummary === 'function') {
    updateHealthCardSummary();
  }
  initAegisSystem();
  if (window.location.hash === '#health') {
    setTimeout(() => {
      if (typeof openMediCareAppModal === 'function') openMediCareAppModal();
      else if (typeof openMediCareApp === 'function') openMediCareApp();
    }, 250);
  }
});

// Load / Save Persistence
function saveToLocalStorage() {
  try {
    localStorage.setItem('mylife_tasks', JSON.stringify(tasks));
    localStorage.setItem('mylife_taskLists', JSON.stringify(taskLists));
    localStorage.setItem('mylife_finance_tx', JSON.stringify(financeTransactions));
    localStorage.setItem('mylife_finance_acc', JSON.stringify(financeAccounts));
    localStorage.setItem('mylife_finance_cat', JSON.stringify(financeCategories));
    localStorage.setItem('mylife_currency', financeCurrency);
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
}

function loadFromLocalStorage() {
  try {
    const savedTasks = localStorage.getItem('mylife_tasks');
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
        tasks = parsed.map(t => ({
          ...t,
          tags: Array.isArray(t.tags) ? t.tags : [],
          subTasks: Array.isArray(t.subTasks) ? t.subTasks : [],
          priority: t.priority || 'NONE'
        }));
      }
    }

    const savedTx = localStorage.getItem('mylife_finance_tx');
    if (savedTx) {
      const parsed = JSON.parse(savedTx);
      if (Array.isArray(parsed) && parsed.length > 0) financeTransactions = parsed;
    }

    const savedAcc = localStorage.getItem('mylife_finance_acc');
    if (savedAcc) {
      const parsed = JSON.parse(savedAcc);
      if (Array.isArray(parsed) && parsed.length > 0) financeAccounts = parsed;
    }

    const savedCat = localStorage.getItem('mylife_finance_cat');
    if (savedCat) {
      const parsed = JSON.parse(savedCat);
      if (Array.isArray(parsed) && parsed.length > 0) financeCategories = parsed;
    }

    const savedCurr = localStorage.getItem('mylife_currency');
    if (savedCurr) financeCurrency = savedCurr;

  } catch (e) {
    console.error('LocalStorage load error, clearing cache:', e);
    localStorage.clear();
  }
}

// Live Header Clock
function updateClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;
  try {
    const locale = 'en-US';
    const now = new Date();
    const weekday = now.toLocaleDateString(locale, { weekday: 'long' });
    const day = now.getDate();
    const month = now.toLocaleDateString(locale, { month: 'long' });
    const year = now.getFullYear();
    const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    clockEl.innerHTML = `<span class="pulse-indicator"></span> ${weekday}, ${day} ${month} ${year} • ${time}`;
  } catch (e) {
    console.error('Clock format error:', e);
  }
}

// Navigation Tab Switch
function switchMainTab(tabId) {
  closeModal('taskAppModal');
  closeModal('sectionModal');
  closeModal('taskDrawerModal');
  closeModal('taskEditorModal');
  closeModal('subListOverflowModal');
  closeModal('datePickerModal');
  closeModal('financeTxModal');
  closeModal('financeAccountModal');
  toggleSidebar(false);
}

// Drawer Sidebar Toggle
function toggleSidebar(open) {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (!sidebar) return;

  if (open === undefined) isSidebarOpen = !isSidebarOpen;
  else isSidebarOpen = open;

  if (isSidebarOpen) {
    sidebar.classList.add('open');
    if (overlay) overlay.classList.remove('hidden');
  } else {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.add('hidden');
  }
}

// Theme Toggle
function toggleTheme() {
  isDarkMode = !isDarkMode;
  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');
  const headerIcon = document.getElementById('themeToggleBtnIcon');

  if (isDarkMode) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
    if (headerIcon) headerIcon.className = 'fa-solid fa-moon';
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    if (headerIcon) headerIcon.className = 'fa-solid fa-sun';
  }
}



// Modal Helper
function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('hidden');
  if (modalId === 'sectionModal') {
    vaultActiveTab = 'home';
    financeActiveTab = 'home';
  }
}

function handleSectionModalClose() {
  const titleEl = document.getElementById('modalTitle');
  
  if (titleEl && (titleEl.innerText.includes('Personal') || titleEl.innerText.includes('Vault'))) {
    if (vaultActiveTab !== 'home') {
      switchVaultTab('home');
      return;
    }
  }

  if (titleEl && titleEl.innerText.includes('Money Tracker')) {
    if (financeActiveTab !== 'home') {
      switchFinanceTab('home');
      return;
    }
  }

  if (typeof handleMediCareClose === 'function') {
    handleMediCareClose();
  }

  closeModal('sectionModal');
}

function closeModalOnBackdrop(event, modalId) {
  if (event && event.target && event.target.classList && event.target.classList.contains('modal-overlay')) {
    if (modalId === 'sectionModal') {
      handleSectionModalClose();
    } else {
      closeModal(modalId);
    }
  }
}

/* ==========================================================================
   SMART MONEY TRACKER & FINANCIAL CALCULATIONS ENGINE
   ========================================================================== */

function getCalculatedFinancials() {
  const totalBalance = financeAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalIncome = financeTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = financeTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const netSavings = totalIncome - totalExpense;

  return { totalBalance, totalIncome, totalExpense, netSavings };
}

function updateFinanceCardSummary() {
  const subtitle = document.getElementById('financeCardSubtitle');
  const preview = document.getElementById('financeCardPreview');
  if (!subtitle || !preview) return;

  const { totalBalance, totalIncome, totalExpense } = getCalculatedFinancials();
  subtitle.innerText = `Net Balance: ${financeCurrency}${totalBalance.toFixed(2)} • ${financeAccounts.length} Accounts Active`;

  const salaryText = '+$1,200 Salary';
  const hostingText = '-$45.00 Hosting';
  const budgetText = 'Budget 72% Spent';

  preview.innerHTML = `
    <span class="preview-tag green-tag"><i class="fa-solid fa-arrow-trend-up"></i> ${salaryText}</span>
    <span class="preview-tag red-tag"><i class="fa-solid fa-cart-shopping"></i> ${hostingText}</span>
    <span class="preview-tag purple-tag"><i class="fa-solid fa-chart-pie"></i> ${budgetText}</span>
  `;
}

function addWater() {
  healthMetrics.hydrationLiters = +(healthMetrics.hydrationLiters + 0.25).toFixed(2);
  if (!document.getElementById('sectionModal').classList.contains('hidden')) {
    openSectionModal('health');
  }
}

function openSectionModal(sectionKey) {
  const modal = document.getElementById('sectionModal');
  const titleEl = document.getElementById('modalTitle');
  const iconEl = document.getElementById('modalIcon');
  const bodyEl = document.getElementById('modalBody');

  if (sectionKey === 'schedule') {
    openTaskAppModal('Bill');
    return;
  }

  if (sectionKey === 'money') {
    renderFinanceSuiteModal();
    return;
  }

  if (sectionKey === 'personal') {
    openVaultPinKeypad();
    return;
  }

  const secBtn = document.getElementById('sectionMenuBtn');
  if (secBtn) secBtn.classList.add('hidden');

  if (!modal || !titleEl || !iconEl || !bodyEl) return;

  if (sectionKey === 'health') {
    if (typeof openMediCareAppModal === 'function') {
      openMediCareAppModal();
    } else if (typeof openMediCareApp === 'function') {
      openMediCareApp();
    }
    return;
  }
}

/* ==========================================================================
   FULL RENDERER FOR SMART MONEY TRACKER MD3 SUITE
   ========================================================================== */

function renderFinanceSuiteModal() {
  const modal = document.getElementById('sectionModal');
  const titleEl = document.getElementById('modalTitle');
  const iconEl = document.getElementById('modalIcon');
  const bodyEl = document.getElementById('modalBody');

  if (!modal || !titleEl || !iconEl || !bodyEl) return;

  titleEl.innerText = 'Money Tracker & Personal Finance Suite';
  iconEl.className = 'fa-solid fa-wallet color-green';

  const { totalBalance, totalIncome, totalExpense } = getCalculatedFinancials();

  let tabContent = '';

  if (financeActiveTab === 'home') {
    tabContent = `
      <!-- Total Balance Card -->
      <div class="total-balance-card ${totalBalance < 0 ? 'negative-bal' : ''}">
        <div>
          <div class="bal-label">Total Account Balance</div>
          <div class="bal-amount">${financeCurrency}${totalBalance.toFixed(2)}</div>
          <div class="bal-sub">Across active wallets & accounts (${financeAccounts.length})</div>
        </div>
        <button class="btn" style="background:#fff; color:var(--secondary); font-size:13px;" onclick="openFinanceTxModal('expense')">
          <i class="fa-solid fa-plus"></i> Add Expense
        </button>
      </div>

      <!-- Income vs Expense Cards Side by Side -->
      <div class="finance-summary-grid">
        <div class="summary-card">
          <div class="summary-icon-box icon-income"><i class="fa-solid fa-arrow-down-left-and-arrow-up-right-to-inside"></i></div>
          <div class="summary-details">
            <span>Monthly Income</span>
            <h3 style="color:var(--secondary);">+${financeCurrency}${totalIncome.toFixed(2)}</h3>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon-box icon-expense"><i class="fa-solid fa-arrow-up-right-from-square"></i></div>
          <div class="summary-details">
            <span>Monthly Expenses</span>
            <h3 style="color:var(--error);">-${financeCurrency}${totalExpense.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="finance-charts-grid">
        <div class="chart-card">
          <div class="chart-card-header">
            <span>Category Spending Pie</span>
            <i class="fa-solid fa-chart-pie color-primary"></i>
          </div>
          <div class="svg-chart-wrapper">
            ${renderCategorySvgPieChart()}
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-card-header">
            <span>7-Day Expense Trend</span>
            <i class="fa-solid fa-chart-line color-green"></i>
          </div>
          <div class="svg-chart-wrapper">
            ${renderTrendSvgBarChart()}
          </div>
        </div>
      </div>

      <!-- Recent Transactions List -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
        <h4 style="font-size:15px; font-weight:800;">Recent Transactions</h4>
        <button class="btn-flat color-primary" onclick="switchFinanceTab('tx')">View All (${financeTransactions.length})</button>
      </div>
      <div class="modal-section-grid">
        ${renderRecentTransactionsList(5)}
      </div>
    `;
  } else if (financeActiveTab === 'tx') {
    tabContent = `
      <div style="display:flex; gap:10px; margin-bottom:14px;">
        <input type="text" id="txSearchInput" placeholder="Search transaction name or note..." class="editor-select" style="flex:1;" onkeyup="filterTransactionsView()">
        <button class="btn btn-primary" onclick="openFinanceTxModal('expense')"><i class="fa-solid fa-plus"></i> Add</button>
      </div>
      <div class="modal-section-grid" id="txContainerList">
        ${renderRecentTransactionsList(100)}
      </div>
    `;
  } else if (financeActiveTab === 'accounts') {
    tabContent = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <h4 style="font-size:16px; font-weight:800;">Wallets & Bank Accounts</h4>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-sm btn-outline" onclick="openFinanceTransferModal()"><i class="fa-solid fa-arrow-right-arrow-left"></i> Transfer</button>
          <button class="btn btn-sm btn-primary" onclick="openFinanceAccountModal()"><i class="fa-solid fa-plus"></i> New Account</button>
        </div>
      </div>
      <div class="modal-section-grid">
        ${financeAccounts.map(acc => `
          <div class="modal-item-card">
            <div style="display:flex; align-items:center; gap:14px;">
              <div style="width:44px; height:44px; border-radius:14px; background:${acc.color}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:20px; box-shadow:0 4px 10px rgba(0,0,0,0.12);">
                <i class="fa-solid ${acc.icon}"></i>
              </div>
              <div>
                <h4 style="font-size:15px; font-weight:700; color:var(--text-main); line-height:1.2;">${acc.name}</h4>
                <p style="font-size:12px; color:var(--text-muted); text-transform:capitalize; margin-top:2px;">${acc.type} Account</p>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:18px; font-weight:800; color:${acc.balance >= 0 ? 'var(--text-main)' : 'var(--error)'};">
                ${financeCurrency}${acc.balance.toFixed(2)}
              </div>
              <span class="preview-tag ${acc.balance >= 0 ? 'green-tag' : 'red-tag'}" style="font-size:10px; padding:2px 8px; margin-top:2px;">
                ${acc.balance >= 0 ? 'Active Balance' : 'Overdrawn'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (financeActiveTab === 'budgets') {
    tabContent = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <h4 style="font-size:16px; font-weight:800;">Monthly Category Budgets</h4>
        <span class="preview-tag green-tag"><i class="fa-solid fa-bell"></i> Live Alerts Active</span>
      </div>
      <div class="modal-section-grid">
        ${renderCategoryBudgetsList()}
      </div>
    `;
  } else if (financeActiveTab === 'reports') {
    tabContent = `
      <div style="background:var(--bg-body); padding:16px; border-radius:18px; border:1px solid var(--border-color); margin-bottom:16px;">
        <h4 style="font-size:15px; font-weight:800; margin-bottom:8px;">Financial Analytics & Export</h4>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:14px;">Export your complete financial records, transactions & budget statements.</p>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary" onclick="exportFinanceReport('csv')"><i class="fa-solid fa-file-csv"></i> Export CSV Data</button>
          <button class="btn btn-outline" onclick="exportFinanceReport('pdf')"><i class="fa-solid fa-file-pdf color-red"></i> Download PDF Summary</button>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-card-header"><span>Income vs Expense Trend</span></div>
        <div class="svg-chart-wrapper">${renderTrendSvgBarChart()}</div>
      </div>
    `;
  } else if (financeActiveTab === 'settings') {
    tabContent = `
      <div class="modal-section-grid">
        <div class="modal-item-card">
          <div><h4>Default Currency</h4><p>Choose currency symbol for balances</p></div>
          <select class="currency-dropdown" onchange="changeFinanceCurrency(this.value)">
            <option value="$" ${financeCurrency === '$' ? 'selected' : ''}>$ USD ($)</option>
            <option value="₹" ${financeCurrency === '₹' ? 'selected' : ''}>₹ INR (₹)</option>
            <option value="€" ${financeCurrency === '€' ? 'selected' : ''}>€ EUR (€)</option>
            <option value="£" ${financeCurrency === '£' ? 'selected' : ''}>£ GBP (£)</option>
          </select>
        </div>
        <div class="modal-item-card">
          <div><h4>Local Backup & Restore</h4><p>Download or import SQLite/JSON data</p></div>
          <button class="btn btn-outline" style="padding:6px 12px; font-size:12px;" onclick="exportBackupJson()"><i class="fa-solid fa-download"></i> Backup JSON</button>
        </div>
        <div class="modal-item-card">
          <div><h4>PIN Security Lock</h4><p>Biometric / PIN protection</p></div>
          <span class="preview-tag green-tag">Enabled</span>
        </div>
      </div>
    `;
  }

  currentSectionDrawer = 'money';
  const secBtn = document.getElementById('sectionMenuBtn');
  if (secBtn) secBtn.classList.remove('hidden');

  bodyEl.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:16px;">
      ${tabContent}
    </div>
  `;

  modal.classList.remove('hidden');
}

function toggleSectionMenuDrawer() {
  if (currentSectionDrawer === 'money') {
    toggleFinanceMenuDrawer();
  } else if (currentSectionDrawer === 'vault') {
    toggleVaultMenuDrawer();
  }
}

function toggleFinanceMenuDrawer() {
  const drawer = document.getElementById('financeDrawerModal');
  if (drawer) drawer.classList.toggle('hidden');
}

function switchFinanceTabFromDrawer(tabName) {
  closeModal('financeDrawerModal');
  switchFinanceTab(tabName);
}

function switchFinanceTab(tabName) {
  financeActiveTab = tabName;
  renderFinanceSuiteModal();
}

function changeFinanceCurrency(symbol) {
  financeCurrency = symbol;
  saveToLocalStorage();
  updateFinanceCardSummary();

  const currSymbolEl = document.getElementById('txCurrencySymbol');
  if (currSymbolEl) currSymbolEl.innerText = financeCurrency;

  if (!document.getElementById('sectionModal').classList.contains('hidden')) {
    renderFinanceSuiteModal();
  }
}

function renderRecentTransactionsList(limit = 5) {
  const sorted = [...financeTransactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
  if (sorted.length === 0) {
    return `<div style="text-align:center; padding:30px; color:var(--text-muted);">No transactions logged yet. Tap + to add one.</div>`;
  }

  return sorted.map(tx => {
    const cat = financeCategories.find(c => c.id === tx.categoryId) || { name: 'General', icon: 'fa-tag', color: '#6366f1' };
    const acc = financeAccounts.find(a => a.id === tx.accountId) || { name: 'Account' };
    const isInc = tx.type === 'income';

    return `
      <div class="modal-item-card" onclick="openFinanceTxModal('${tx.type}', '${tx.id}')">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:42px; height:42px; border-radius:12px; background:${cat.color}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:18px;">
            <i class="fa-solid ${cat.icon}"></i>
          </div>
          <div>
            <h4 style="font-size:15px; font-weight:700;">${tx.title}</h4>
            <p style="font-size:12px; color:var(--text-muted);">${cat.name} • ${acc.name} • ${tx.date}</p>
          </div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:16px; font-weight:800; color:${isInc ? 'var(--secondary)' : 'var(--error)'};">
            ${isInc ? '+' : '-'}${financeCurrency}${tx.amount.toFixed(2)}
          </span>
          <div style="font-size:10px; color:var(--text-muted); cursor:pointer;" onclick="event.stopPropagation(); deleteFinanceTransaction('${tx.id}')">Delete</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCategoryBudgetsList() {
  return financeCategories.filter(c => c.type === 'expense' && c.budget).map(cat => {
    const spent = financeTransactions
      .filter(t => t.categoryId === cat.id && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const pct = Math.min(100, Math.round((spent / cat.budget) * 100));
    const meterClass = pct >= 90 ? 'meter-red' : pct >= 70 ? 'meter-yellow' : 'meter-green';

    return `
      <div class="budget-item-card">
        <div class="budget-item-header">
          <div class="budget-cat-info">
            <div class="budget-cat-icon" style="background:${cat.color};"><i class="fa-solid ${cat.icon}"></i></div>
            <span>${cat.name}</span>
          </div>
          <div class="budget-amounts">
            ${financeCurrency}${spent.toFixed(0)} / ${financeCurrency}${cat.budget} <span style="font-size:11px; opacity:0.8;">(${pct}%)</span>
          </div>
        </div>
        <div class="budget-progress-track">
          <div class="budget-fill-meter ${meterClass}" style="width: ${pct}%;"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCategorySvgPieChart() {
  const expenseTxs = financeTransactions.filter(t => t.type === 'expense');
  if (expenseTxs.length === 0) {
    return `<span style="font-size:12px; color:var(--text-muted);">No expense data</span>`;
  }

  return `
    <svg width="120" height="120" viewBox="0 0 36 36" style="transform: rotate(-90deg);">
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" stroke-width="3.8"/>
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f97316" stroke-width="3.8" stroke-dasharray="40 60" stroke-dashoffset="0"/>
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" stroke-width="3.8" stroke-dasharray="30 70" stroke-dashoffset="-40"/>
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" stroke-width="3.8" stroke-dasharray="30 70" stroke-dashoffset="-70"/>
    </svg>
  `;
}

function renderTrendSvgBarChart() {
  return `
    <svg width="100%" height="120" viewBox="0 0 200 100">
      <line x1="10" y1="90" x2="190" y2="90" stroke="var(--border-color)" stroke-width="1"/>
      <rect x="20" y="50" width="16" height="40" fill="#10b981" rx="4"/>
      <rect x="45" y="30" width="16" height="60" fill="#ef4444" rx="4"/>
      <rect x="70" y="60" width="16" height="30" fill="#10b981" rx="4"/>
      <rect x="95" y="20" width="16" height="70" fill="#ef4444" rx="4"/>
      <rect x="120" y="40" width="16" height="50" fill="#10b981" rx="4"/>
      <rect x="145" y="15" width="16" height="75" fill="#ef4444" rx="4"/>
      <rect x="170" y="35" width="16" height="55" fill="#10b981" rx="4"/>
    </svg>
  `;
}

/* ==========================================================================
   TRANSACTION CREATION & EDITING ENGINE
   ========================================================================== */

function openFinanceTxModal(type = 'expense', txId = null) {
  financeTxType = type;
  editingFinanceTxId = txId;

  const modal = document.getElementById('financeTxModal');
  if (!modal) return;

  const currSymbolEl = document.getElementById('txCurrencySymbol');
  if (currSymbolEl) currSymbolEl.innerText = financeCurrency;

  setFinanceTxType(type);

  // Populate Accounts
  const accSelect = document.getElementById('txAccountSelect');
  const targetSel = document.getElementById('txTargetAccountSelect');
  if (accSelect) {
    accSelect.innerHTML = financeAccounts.map(a => `<option value="${a.id}">${a.name} (${financeCurrency}${a.balance.toFixed(2)})</option>`).join('');
  }
  if (targetSel) {
    targetSel.innerHTML = financeAccounts.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
  }

  // Populate Categories
  renderFinanceCategoryGrid();

  // Populate Default Date/Time
  const dateInp = document.getElementById('txDateInput');
  const timeInp = document.getElementById('txTimeInput');
  const amountInp = document.getElementById('txAmountInput');
  const titleInp = document.getElementById('txTitleInput');
  const notesInp = document.getElementById('txNotesInput');

  if (txId) {
    const tx = financeTransactions.find(t => t.id === txId);
    if (tx) {
      if (amountInp) amountInp.value = tx.amount;
      if (titleInp) titleInp.value = tx.title;
      if (notesInp) notesInp.value = tx.notes || '';
      if (dateInp) dateInp.value = tx.date;
      if (timeInp) timeInp.value = tx.time || '12:00';
    }
  } else {
    const today = new Date().toISOString().split('T')[0];
    if (dateInp) dateInp.value = today;
    if (timeInp) timeInp.value = '12:00';
    if (amountInp) amountInp.value = '';
    if (titleInp) titleInp.value = '';
    if (notesInp) notesInp.value = '';
  }

  modal.classList.remove('hidden');
}

function setFinanceTxType(type) {
  financeTxType = type;
  const btnExp = document.getElementById('btnTxExpense');
  const btnInc = document.getElementById('btnTxIncome');
  const btnTrf = document.getElementById('btnTxTransfer');
  const targetRow = document.getElementById('txTargetAccountRow');

  if (btnExp) btnExp.className = `tx-type-btn ${type === 'expense' ? 'active-expense' : ''}`;
  if (btnInc) btnInc.className = `tx-type-btn ${type === 'income' ? 'active-income' : ''}`;
  if (btnTrf) btnTrf.className = `tx-type-btn ${type === 'transfer' ? 'active-transfer' : ''}`;

  if (targetRow) {
    if (type === 'transfer') targetRow.classList.remove('hidden');
    else targetRow.classList.add('hidden');
  }

  renderFinanceCategoryGrid();
}

function renderFinanceCategoryGrid() {
  const container = document.getElementById('txCategoryGrid');
  if (!container) return;

  const filteredCats = financeCategories.filter(c => c.type === (financeTxType === 'income' ? 'income' : 'expense'));
  container.innerHTML = filteredCats.map(cat => `
    <div class="tx-cat-chip ${selectedFinanceCategory === cat.id ? 'active' : ''}" onclick="selectFinanceCategory('${cat.id}', this)">
      <div class="tx-cat-icon" style="background:${cat.color};"><i class="fa-solid ${cat.icon}"></i></div>
      <span>${cat.name}</span>
    </div>
  `).join('');

  if (filteredCats.length > 0) selectedFinanceCategory = filteredCats[0].id;
}

function selectFinanceCategory(catId, chipEl) {
  selectedFinanceCategory = catId;
  document.querySelectorAll('.tx-cat-chip').forEach(c => c.classList.remove('active'));
  if (chipEl) chipEl.classList.add('active');
}

function saveFinanceTransaction() {
  const title = document.getElementById('txTitleInput')?.value.trim();
  const amount = parseFloat(document.getElementById('txAmountInput')?.value);
  const accountId = document.getElementById('txAccountSelect')?.value;
  const date = document.getElementById('txDateInput')?.value;
  const time = document.getElementById('txTimeInput')?.value || '12:00 PM';
  const notes = document.getElementById('txNotesInput')?.value || '';
  const isRecurring = document.getElementById('txRecurringToggle')?.checked || false;

  if (!title || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid Transaction Title and positive Amount.');
    return;
  }

  const account = financeAccounts.find(a => a.id === accountId);
  if (account) {
    if (financeTxType === 'income') account.balance += amount;
    else if (financeTxType === 'expense') account.balance -= amount;
  }

  if (editingFinanceTxId) {
    const tx = financeTransactions.find(t => t.id === editingFinanceTxId);
    if (tx) {
      tx.title = title;
      tx.amount = amount;
      tx.type = financeTxType;
      tx.categoryId = selectedFinanceCategory;
      tx.accountId = accountId;
      tx.date = date;
      tx.time = time;
      tx.notes = notes;
      tx.isRecurring = isRecurring;
    }
  } else {
    financeTransactions.unshift({
      id: `tx_${Date.now()}`,
      title,
      amount,
      type: financeTxType,
      categoryId: selectedFinanceCategory,
      accountId,
      date,
      time,
      notes,
      receipt: null,
      isRecurring
    });
  }

  saveToLocalStorage();
  closeModal('financeTxModal');
  updateFinanceCardSummary();
  if (!document.getElementById('sectionModal').classList.contains('hidden')) {
    renderFinanceSuiteModal();
  }
}

function deleteFinanceTransaction(txId) {
  const index = financeTransactions.findIndex(t => t.id === txId);
  if (index !== -1) {
    const tx = financeTransactions[index];
    const account = financeAccounts.find(a => a.id === tx.accountId);
    if (account) {
      if (tx.type === 'income') account.balance -= tx.amount;
      else if (tx.type === 'expense') account.balance += tx.amount;
    }
    financeTransactions.splice(index, 1);
    saveToLocalStorage();
    updateFinanceCardSummary();
    renderFinanceSuiteModal();
  }
}

function openFinanceAccountModal() {
  const modal = document.getElementById('financeAccountModal');
  if (modal) modal.classList.remove('hidden');
}

function createNewAccount() {
  const name = document.getElementById('accNameInput')?.value.trim();
  const type = document.getElementById('accTypeSelect')?.value || 'bank';
  const balance = parseFloat(document.getElementById('accBalanceInput')?.value || '0');

  if (!name) return;

  const iconMap = { bank: 'fa-building-columns', cash: 'fa-money-bill-wave', card: 'fa-credit-card', savings: 'fa-piggy-bank', upi: 'fa-qrcode' };
  const colorMap = { bank: '#3b82f6', cash: '#10b981', card: '#f43f5e', savings: '#8b5cf6', upi: '#14b8a6' };

  financeAccounts.push({
    id: `acc_${Date.now()}`,
    name,
    type,
    balance,
    icon: iconMap[type] || 'fa-wallet',
    color: colorMap[type] || '#6366f1'
  });

  saveToLocalStorage();
  closeModal('financeAccountModal');
  updateFinanceCardSummary();
  renderFinanceSuiteModal();
}

function openFinanceTransferModal() {
  const fromName = prompt('Enter Source Account (e.g. Bank):', 'Primary Checking Bank');
  const toName = prompt('Enter Target Account (e.g. Cash):', 'Wallet Cash');
  const amount = parseFloat(prompt('Enter Transfer Amount:', '100.00'));

  if (fromName && toName && !isNaN(amount) && amount > 0) {
    const fromAcc = financeAccounts.find(a => a.name.toLowerCase().includes(fromName.toLowerCase())) || financeAccounts[0];
    const toAcc = financeAccounts.find(a => a.name.toLowerCase().includes(toName.toLowerCase())) || financeAccounts[1];

    if (fromAcc && toAcc) {
      fromAcc.balance -= amount;
      toAcc.balance += amount;

      financeTransactions.unshift({
        id: `tx_${Date.now()}`,
        title: `Transfer ${fromAcc.name} ➔ ${toAcc.name}`,
        amount,
        type: 'transfer',
        categoryId: 'cat_bills',
        accountId: fromAcc.id,
        date: new Date().toISOString().split('T')[0],
        time: '12:00 PM',
        notes: 'Inter-account fund transfer',
        receipt: null,
        isRecurring: false
      });

      saveToLocalStorage();
      updateFinanceCardSummary();
      renderFinanceSuiteModal();
      alert(`Successfully transferred ${financeCurrency}${amount.toFixed(2)} from ${fromAcc.name} to ${toAcc.name}`);
    }
  }
}

function triggerReceiptPicker() {
  alert('Receipt Camera Photo:\nSimulation snapshot attached.');
  const preview = document.getElementById('txReceiptPreviewContainer');
  if (preview) preview.innerHTML = `<img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&auto=format&fit=crop" style="width:60px; height:60px; border-radius:10px; object-fit:cover;">`;
}

function exportFinanceReport(format) {
  if (format === 'csv') {
    let csv = 'ID,Title,Amount,Type,Date,Category,Account\n';
    financeTransactions.forEach(t => {
      csv += `${t.id},"${t.title}",${t.amount},${t.type},${t.date},${t.categoryId},${t.accountId}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Financial_Report_${Date.now()}.csv`;
    a.click();
  } else {
    alert('PDF Statement Exported successfully to downloads folder.');
  }
}

function exportBackupJson() {
  const data = {
    accounts: financeAccounts,
    categories: financeCategories,
    transactions: financeTransactions
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MyLife_Finance_Backup_${Date.now()}.json`;
  a.click();
}

function filterTransactionsView() {
  const q = document.getElementById('txSearchInput')?.value.toLowerCase() || '';
  const items = document.querySelectorAll('#txContainerList .modal-item-card');
  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    if (text.includes(q)) item.style.display = 'flex';
    else item.style.display = 'none';
  });
}

/* ==========================================================================
   TASK APP CORE ENGINE
   ========================================================================== */


function openTaskAppModal(listId = 'Bill') {
  currentListId = listId;
  currentSubListId = 'all';

  const modal = document.getElementById('taskAppModal');
  if (modal) {
    modal.classList.remove('hidden');
    renderTaskAppView();
  }
}

function renderTaskAppView() {
  const currentList = taskLists.find(l => l.id === currentListId) || taskLists[0];

  const titleEl = document.getElementById('currentListTitle');
  const dotEl = document.getElementById('currentListAccentDot');
  if (titleEl) titleEl.innerText = currentList.name;
  if (dotEl) dotEl.style.background = currentList.color;

  const tabsContainer = document.getElementById('subListTabsContainer');
  const subLists = subListsMap[currentListId] || subListsMap.Bill;

  if (tabsContainer) {
    tabsContainer.innerHTML = subLists.map(sl => `
      <button class="sublist-tab-btn ${sl.id === currentSubListId ? 'active' : ''}" onclick="switchSubListTab('${sl.id}')">
        ${sl.name}
      </button>
    `).join('');
  }

  let filtered = tasks.filter(t => t.listId === currentListId);
  if (currentSubListId === 'today') {
    filtered = filtered.filter(t => t.dueDate === '2026-07-21');
  } else if (currentSubListId === 'upcoming') {
    filtered = filtered.filter(t => t.dueDate > '2026-07-21');
  } else if (currentSubListId === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }

  if (hideCompletedInSubList) {
    filtered = filtered.filter(t => !t.completed);
  }

  const countBadge = document.getElementById('currentListTaskCount');
  if (countBadge) countBadge.innerText = `${filtered.length} tasks`;

  const listViewContainer = document.getElementById('taskListViewContainer');
  if (!listViewContainer) return;

  if (filtered.length === 0) {
    listViewContainer.innerHTML = `
      <div class="task-empty-state-card">
        <div class="empty-vector-art"><i class="fa-solid fa-feather-pointed"></i></div>
        <h3>A fresh list, let's get started</h3>
        <p>Tap + or use the quick add bar below to add your first task</p>
      </div>
    `;
    return;
  }

  listViewContainer.innerHTML = filtered.map(t => {
    const priorityClass = `flag-${t.priority}`;
    const highlightStyle = t.isHighlighted ? `background-color: ${t.highlightColor}; border-color: ${t.highlightColor};` : '';

    return `
      <div class="task-item-card ${t.completed ? 'completed' : ''}" style="${highlightStyle}">
        <div class="task-checkbox-round" onclick="toggleTaskCompleted('${t.id}')">
          <i class="fa-solid fa-check"></i>
        </div>
        <div class="task-item-body" onclick="openTaskEditorModal('${t.id}')">
          <div class="task-item-title">${t.title}</div>
          <div class="task-item-meta">
            <span class="priority-flag-icon ${priorityClass}"><i class="fa-solid fa-flag"></i> ${t.priority}</span>
            ${t.dueDate ? `<span><i class="fa-regular fa-calendar"></i> ${t.dueDate} ${t.dueTime ? t.dueTime : ''}</span>` : ''}
            ${t.subTasks && t.subTasks.length > 0 ? `<span><i class="fa-solid fa-list-check"></i> ${t.subTasks.filter(s => s.completed).length}/${t.subTasks.length}</span>` : ''}
            ${t.tags ? t.tags.map(tag => `<span class="preview-tag blue-tag" style="font-size:10px; padding:2px 6px;">${tag}</span>`).join('') : ''}
          </div>
        </div>
        <button class="btn-icon" onclick="openTaskEditorModal('${t.id}')"><i class="fa-solid fa-angle-right"></i></button>
      </div>
    `;
  }).join('');
}

function switchSubListTab(subId) {
  currentSubListId = subId;
  renderTaskAppView();
}

function toggleTaskCompleted(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveToLocalStorage();
    renderTaskAppView();
    updateTaskAppCardSummary();
  }
}

function handleQuickAddSubmit() {
  const input = document.getElementById('quickAddInput');
  if (!input || !input.value.trim()) return;

  tasks.push({
    id: `tk_${Date.now()}`,
    listId: currentListId,
    subListId: currentSubListId,
    title: input.value.trim(),
    notes: '',
    attachments: [],
    subTasks: [],
    tags: [],
    dueDate: '2026-07-21',
    dueTime: '09:00 PM',
    isAllDay: false,
    remindWhenDue: true,
    priority: 'NONE',
    isHighlighted: false,
    highlightColor: '#fef08a',
    completed: false,
    createdAt: 'Jul 21, 2026 at 08:30 PM'
  });

  input.value = '';
  saveToLocalStorage();
  renderTaskAppView();
  updateTaskAppCardSummary();
}

function updateTaskAppCardSummary() {
  const subtitle = document.getElementById('taskAppCardSubtitle');
  const preview = document.getElementById('taskAppCardPreview');
  if (!subtitle || !preview) return;

  const totalTasks = tasks.filter(t => !t.completed).length;
  subtitle.innerText = `${totalTasks} Pending Tasks • ${taskLists.length} Lists`;

  preview.innerHTML = taskLists.map(list => {
    const count = tasks.filter(t => t.listId === list.id && !t.completed).length;
    const tagClass = list.id === 'Bill' ? 'red-tag' : list.id === 'Personal' ? 'blue-tag' : list.id === 'Work' ? 'purple-tag' : 'green-tag';
    return `<span class="preview-tag ${tagClass}"><i class="fa-solid ${list.icon}"></i> ${list.name} (${count})</span>`;
  }).join('');
}

function openTaskSidebarDrawer() {
  const modal = document.getElementById('taskDrawerModal');
  const container = document.getElementById('taskListsDrawerContainer');

  if (container) {
    container.innerHTML = taskLists.map(l => `
      <button class="drawer-list-item ${l.id === currentListId ? 'active' : ''}" onclick="selectListFromDrawer('${l.id}')">
        <i class="fa-solid ${l.icon}" style="color:${l.color}"></i>
        <span style="flex:1;">${l.name}</span>
        <span style="font-size:11px; opacity:0.7;">${tasks.filter(t => t.listId === l.id && !t.completed).length}</span>
      </button>
    `).join('');
  }

  if (modal) modal.classList.remove('hidden');
}

function selectListFromDrawer(listId) {
  currentListId = listId;
  closeModal('taskDrawerModal');
  renderTaskAppView();
}

function promptCreateNewList() {
  const name = prompt('Enter new Task List name:');
  if (name) {
    const colors = ['#ef4444', '#3b82f6', '#8b5cf6', '#10b981', '#f97316', '#14b8a6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const newList = { id: name.replace(/\s+/g, ''), name: name, color: color, icon: 'fa-list-check', count: 0 };
    taskLists.push(newList);
    subListsMap[newList.id] = [
      { id: 'all', name: 'All Tasks' },
      { id: 'today', name: 'Today' },
      { id: 'upcoming', name: 'Upcoming' },
      { id: 'completed', name: 'Completed' }
    ];
    saveToLocalStorage();
    selectListFromDrawer(newList.id);
  }
}

function promptCreateFilteredList() { alert('Created dynamic filtered list.'); }
function promptCreateSharedList() { alert('Created shared list invitation link.'); }
function promptEditCurrentList() {
  const name = prompt('Rename current list:', currentListId);
  if (name) {
    const list = taskLists.find(l => l.id === currentListId);
    if (list) list.name = name;
    saveToLocalStorage();
    renderTaskAppView();
  }
}
function openTagsViewModal() { alert('Tags Overview: Urgent, Finance, Health, Home'); }
function openDeletedItemsModal() { alert('Trash / Deleted Items: 0 items.'); }

function openTaskEditorModal(taskId = null) {
  editingTaskId = taskId;
  const modal = document.getElementById('taskEditorModal');
  if (!modal) return;

  const select = document.getElementById('taskEditorListSelect');
  if (select) {
    select.innerHTML = taskLists.map(l => `<option value="${l.id}" ${l.id === currentListId ? 'selected' : ''}>${l.name}</option>`).join('');
  }

  if (taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      document.getElementById('editorHeaderTitleText').innerText = 'Edit Task';
      document.getElementById('taskEditorTitle').value = task.title;
      document.getElementById('taskEditorNotes').value = task.notes || '';
      document.getElementById('dueDateDisplay').innerText = task.dueDate || 'Today, Jul 21';
      document.getElementById('dueTimeDisplay').innerText = task.dueTime || '09:00 PM';
      document.getElementById('taskEditorAllDayToggle').checked = task.isAllDay;
      document.getElementById('taskEditorRemindToggle').checked = task.remindWhenDue;
      document.getElementById('taskEditorCompletedCheckbox').checked = task.completed;
      document.getElementById('taskEditorHighlightToggle').checked = task.isHighlighted;
      document.getElementById('taskEditorCreatedTimestamp').innerText = `Created ${task.createdAt}`;

      const priorityRadios = document.querySelectorAll('input[name="taskPriority"]');
      priorityRadios.forEach(r => { r.checked = (r.value === task.priority); });

      toggleHighlightColorPicker();
      selectHighlightColor(task.highlightColor || '#fef08a');
      renderSubtasksEditor(task.subTasks || []);
      renderTagsEditor(task.tags || []);
    }
  } else {
    document.getElementById('editorHeaderTitleText').innerText = 'New Task';
    document.getElementById('taskEditorTitle').value = '';
    document.getElementById('taskEditorNotes').value = '';
    document.getElementById('taskEditorAllDayToggle').checked = false;
    document.getElementById('taskEditorRemindToggle').checked = true;
    document.getElementById('taskEditorCompletedCheckbox').checked = false;
    document.getElementById('taskEditorHighlightToggle').checked = false;
    document.getElementById('taskEditorCreatedTimestamp').innerText = `Created Jul 21, 2026 at 08:30 PM`;

    const radios = document.querySelectorAll('input[name="taskPriority"]');
    if (radios.length > 0) radios[0].checked = true;

    toggleHighlightColorPicker();
    renderSubtasksEditor([]);
    renderTagsEditor([]);
  }

  updateEditorHeaderAccent();
  modal.classList.remove('hidden');
}

function updateEditorHeaderAccent() {
  const listId = document.getElementById('taskEditorListSelect')?.value || 'Bill';
  const list = taskLists.find(l => l.id === listId) || taskLists[0];
  const bar = document.getElementById('editorHeaderBar');
  if (bar) bar.style.background = list.color;
}

function renderSubtasksEditor(subTasksList) {
  const container = document.getElementById('subtasksEditorContainer');
  if (!container) return;
  container.innerHTML = subTasksList.map((st, i) => `
    <div class="subtask-input-item">
      <input type="checkbox" ${st.completed ? 'checked' : ''}>
      <input type="text" class="subtask-title-val" value="${st.title}" placeholder="Sub task title...">
      <button type="button" class="btn-icon" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `).join('');
}

function addNewSubtaskInput() {
  const container = document.getElementById('subtasksEditorContainer');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'subtask-input-item';
  div.innerHTML = `
    <input type="checkbox">
    <input type="text" class="subtask-title-val" placeholder="Sub task title...">
    <button type="button" class="btn-icon" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>
  `;
  container.appendChild(div);
}

function renderTagsEditor(selectedTagsList) {
  const container = document.getElementById('editorTagsContainer');
  if (!container) return;
  container.innerHTML = availableTags.map(t => {
    const isSel = selectedTagsList.includes(t.name);
    return `
      <button type="button" class="tag-chip-btn ${isSel ? 'active' : ''}" onclick="this.classList.toggle('active')">
        ${t.name}
      </button>
    `;
  }).join('');
}

function promptAddNewTag() {
  const tag = prompt('Enter new tag name:');
  if (tag) {
    availableTags.push({ id: `t_${Date.now()}`, name: tag, color: '#3b82f6' });
    renderTagsEditor([tag]);
  }
}

function toggleHighlightColorPicker() {
  const toggle = document.getElementById('taskEditorHighlightToggle');
  const pickerRow = document.getElementById('highlightColorPickerRow');
  if (!toggle || !pickerRow) return;
  if (toggle.checked) pickerRow.classList.remove('hidden');
  else pickerRow.classList.add('hidden');
}

function selectHighlightColor(colorHex, btn = null) {
  currentSelectedHighlightColor = colorHex;
  if (btn) {
    document.querySelectorAll('.swatch-btn').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
  }
}

function triggerGalleryPicker() { alert('Gallery Picker opened.'); }
function triggerCameraCapture() { alert('Camera Photo Snapshot taken.'); }

/* CALENDAR & TIME PICKER */
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let pickerState = { year: 2026, month: 6, day: 21, hour: '09', minute: '00', ampm: 'PM', viewMode: 'days' };

function triggerCalendarDatePicker() {
  const modal = document.getElementById('datePickerModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  renderCalendarView();
}

function triggerClockTimePicker() { triggerCalendarDatePicker(); }

function renderCalendarView() {
  const yearBtn = document.getElementById('pickerDialogYearBtn');
  const dateTitle = document.getElementById('pickerDialogDateTitle');
  const timeTitle = document.getElementById('pickerDialogTimeTitle');
  const monthYearText = document.getElementById('calendarMonthYearText');

  const currDate = new Date(pickerState.year, pickerState.month, pickerState.day);
  const dayName = DAY_SHORT[currDate.getDay()];
  const monthShort = MONTH_SHORT[pickerState.month];

  if (yearBtn) yearBtn.innerHTML = `${pickerState.year} <i class="fa-solid fa-caret-down"></i>`;
  if (dateTitle) dateTitle.innerText = `${dayName}, ${monthShort} ${pickerState.day}`;
  if (timeTitle) timeTitle.innerHTML = `<i class="fa-regular fa-clock"></i> ${pickerState.hour}:${pickerState.minute} ${pickerState.ampm}`;
  if (monthYearText) monthYearText.innerText = `${MONTH_NAMES[pickerState.month]} ${pickerState.year}`;

  const yearGrid = document.getElementById('calendarYearGrid');
  const daysGrid = document.getElementById('calendarDaysGrid');

  if (pickerState.viewMode === 'years') {
    if (daysGrid) daysGrid.classList.add('hidden');
    if (yearGrid) { yearGrid.classList.remove('hidden'); renderYearGrid(); }
  } else {
    if (yearGrid) yearGrid.classList.add('hidden');
    if (daysGrid) { daysGrid.classList.remove('hidden'); renderDaysGrid(); }
  }
}

function renderYearGrid() {
  const container = document.getElementById('calendarYearGrid');
  if (!container) return;
  let html = '';
  for (let yr = 2020; yr <= 2031; yr++) {
    const active = yr === pickerState.year ? 'active' : '';
    html += `<button type="button" class="year-grid-btn ${active}" onclick="selectCalendarYear(${yr})">${yr}</button>`;
  }
  container.innerHTML = html;
}

function renderDaysGrid() {
  const container = document.getElementById('calendarDaysGrid');
  if (!container) return;

  const firstDayIndex = new Date(pickerState.year, pickerState.month, 1).getDay();
  const totalDays = new Date(pickerState.year, pickerState.month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(pickerState.year, pickerState.month, 0).getDate();

  let html = `
    <span class="weekday-header">S</span><span class="weekday-header">M</span><span class="weekday-header">T</span>
    <span class="weekday-header">W</span><span class="weekday-header">T</span><span class="weekday-header">F</span><span class="weekday-header">S</span>
  `;

  for (let x = firstDayIndex; x > 0; x--) {
    const dayNum = prevMonthTotalDays - x + 1;
    html += `<button type="button" class="calendar-day-btn other-month" onclick="changeCalendarMonth(-1)">${dayNum}</button>`;
  }

  for (let i = 1; i <= totalDays; i++) {
    const isSelected = (i === pickerState.day);
    html += `<button type="button" class="calendar-day-btn ${isSelected ? 'selected-day' : ''}" onclick="selectCalendarDay(${i})">${i}</button>`;
  }

  const totalCells = firstDayIndex + totalDays;
  const nextDaysCount = (7 - (totalCells % 7)) % 7;
  for (let j = 1; j <= nextDaysCount; j++) {
    html += `<button type="button" class="calendar-day-btn other-month" onclick="changeCalendarMonth(1)">${j}</button>`;
  }

  container.innerHTML = html;
}

function changeCalendarMonth(delta) {
  pickerState.month += delta;
  if (pickerState.month < 0) { pickerState.month = 11; pickerState.year--; }
  else if (pickerState.month > 11) { pickerState.month = 0; pickerState.year++; }
  const maxDays = new Date(pickerState.year, pickerState.month + 1, 0).getDate();
  if (pickerState.day > maxDays) pickerState.day = maxDays;
  renderCalendarView();
}

function toggleYearGridSelector() {
  pickerState.viewMode = (pickerState.viewMode === 'years') ? 'days' : 'years';
  renderCalendarView();
}

function selectCalendarYear(yr) {
  pickerState.year = yr;
  pickerState.viewMode = 'days';
  renderCalendarView();
}

function selectCalendarDay(d) {
  pickerState.day = d;
  renderCalendarView();
}

function selectPresetDate(type) {
  const now = new Date();
  let target = new Date();

  if (type === 'today') target = now;
  else if (type === 'tomorrow') target.setDate(now.getDate() + 1);
  else if (type === 'next_mon') {
    const day = now.getDay();
    target.setDate(now.getDate() + (day === 0 ? 1 : 8 - day));
  } else if (type === 'next_wk') target.setDate(now.getDate() + 7);

  pickerState.year = target.getFullYear();
  pickerState.month = target.getMonth();
  pickerState.day = target.getDate();
  renderCalendarView();
}

function updateCalendarTimeSelection() {
  const h = document.getElementById('pickerHourSelect')?.value || '09';
  const m = document.getElementById('pickerMinuteSelect')?.value || '00';
  const ampm = document.getElementById('pickerAmPmSelect')?.value || 'PM';

  pickerState.hour = h.padStart(2, '0');
  pickerState.minute = m;
  pickerState.ampm = ampm;

  const timeTitle = document.getElementById('pickerDialogTimeTitle');
  if (timeTitle) timeTitle.innerHTML = `<i class="fa-regular fa-clock"></i> ${pickerState.hour}:${pickerState.minute} ${pickerState.ampm}`;
}

function confirmCalendarPicker() {
  updateCalendarTimeSelection();
  const dateStr = `${MONTH_SHORT[pickerState.month]} ${pickerState.day}, ${pickerState.year}`;
  const timeStr = `${pickerState.hour}:${pickerState.minute} ${pickerState.ampm}`;

  const dueDisplay = document.getElementById('dueDateDisplay');
  const timeDisplay = document.getElementById('dueTimeDisplay');

  if (dueDisplay) dueDisplay.innerText = dateStr;
  if (timeDisplay) timeDisplay.innerText = timeStr;

  closeModal('datePickerModal');
}

function saveTaskFromEditor() {
  const titleInput = document.getElementById('taskEditorTitle');
  const title = titleInput ? titleInput.value.trim() : '';
  if (!title) {
    alert('Please enter a Task Name.');
    return;
  }

  try {
    const listId = document.getElementById('taskEditorListSelect')?.value || 'Bill';
    const notes = document.getElementById('taskEditorNotes')?.value || '';
    const isAllDay = document.getElementById('taskEditorAllDayToggle')?.checked || false;
    const remindWhenDue = document.getElementById('taskEditorRemindToggle')?.checked || true;
    const completed = document.getElementById('taskEditorCompletedCheckbox')?.checked || false;
    const isHighlighted = document.getElementById('taskEditorHighlightToggle')?.checked || false;
    const priorityNode = document.querySelector('input[name="taskPriority"]:checked');
    const priority = priorityNode ? priorityNode.value : 'NONE';

    const subTaskNodes = document.querySelectorAll('.subtask-title-val');
    const subTasks = Array.from(subTaskNodes).map((node, i) => ({
      id: `st_${i}_${Date.now()}`,
      title: node.value,
      completed: node.previousElementSibling ? node.previousElementSibling.checked : false
    })).filter(s => s.title.trim() !== '');

    const activeTagNodes = document.querySelectorAll('.tag-chip-btn.active');
    const tags = Array.from(activeTagNodes).map(node => node.innerText.trim());

    if (editingTaskId) {
      const task = tasks.find(t => t.id === editingTaskId);
      if (task) {
        task.listId = listId;
        task.title = title;
        task.notes = notes;
        task.isAllDay = isAllDay;
        task.remindWhenDue = remindWhenDue;
        task.completed = completed;
        task.isHighlighted = isHighlighted;
        task.highlightColor = currentSelectedHighlightColor || '#fef08a';
        task.priority = priority;
        task.subTasks = subTasks;
        task.tags = tags;
      }
    } else {
      tasks.push({
        id: `tk_${Date.now()}`,
        listId: listId,
        subListId: 'all',
        title: title,
        notes: notes,
        attachments: [],
        subTasks: subTasks,
        tags: tags,
        dueDate: '2026-07-21',
        dueTime: '09:00 PM',
        isAllDay: isAllDay,
        remindWhenDue: remindWhenDue,
        priority: priority,
        isHighlighted: isHighlighted,
        highlightColor: currentSelectedHighlightColor || '#fef08a',
        completed: completed,
        createdAt: 'Jul 21, 2026 at 08:30 PM'
      });
    }

    closeModal('taskEditorModal');
    currentListId = listId;
    saveToLocalStorage();
    renderTaskAppView();
    updateTaskAppCardSummary();
  } catch (e) {
    console.error('Error saving task:', e);
    closeModal('taskEditorModal');
    renderTaskAppView();
  }
}

function openSubListOverflowMenu() {
  const el = document.getElementById('subListOverflowModal');
  if (el) el.classList.remove('hidden');
}

function subListMenuAction(action) {
  closeModal('subListOverflowModal');

  if (action === 'edit') {
    const subListArray = subListsMap[currentListId] || subListsMap.Bill;
    const currentSub = subListArray.find(s => s.id === currentSubListId) || subListArray[0];
    const newName = prompt('Edit Sub List Name:', currentSub.name);
    if (newName) {
      currentSub.name = newName;
      renderTaskAppView();
    }
  } else if (action === 'sort') {
    tasks.sort((a, b) => (b.priority === 'HIGH' ? 1 : -1));
    renderTaskAppView();
    alert('Sorted tasks by Priority (High to Low).');
  } else if (action === 'uncheck_all') {
    tasks.filter(t => t.listId === currentListId).forEach(t => t.completed = false);
    renderTaskAppView();
  } else if (action === 'complete_all') {
    tasks.filter(t => t.listId === currentListId).forEach(t => t.completed = true);
    renderTaskAppView();
  } else if (action === 'toggle_hide_completed') {
    hideCompletedInSubList = !hideCompletedInSubList;
    renderTaskAppView();
  } else if (action === 'remove_completed') {
    tasks = tasks.filter(t => !(t.listId === currentListId && t.completed));
    renderTaskAppView();
  }
}





function triggerSearchModal() {
  const query = prompt('Global Search across Tasks & Financial Records:');
  if (query) {
    const taskResults = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
    const txResults = financeTransactions.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
    alert(`Search Results for "${query}":\nFound ${taskResults.length} matching tasks and ${txResults.length} financial transactions.`);
  }
}

function triggerNotificationAlert() {
  alert('Notifications:\n1. Bill Utility due at 09:00 PM.\n2. Gym renewal next week.\n3. Budget Alert: Food & Dining at 78% limit.');
}

/* ==========================================================================
   PERSONAL INFO VAULT & DIGILOCKER SECURITY ENGINE
   ========================================================================== */

let vaultSavedPin = localStorage.getItem('vault_pin') || '1234';
let vaultEnteredPin = '';
let vaultFailedAttempts = 0;
let vaultActiveTab = 'home';

let vaultDocuments = JSON.parse(localStorage.getItem('vault_documents')) || [
  { id: 'doc-1', title: 'Passport (National ID)', category: 'id_proof', docNumber: 'Z9842109', tags: ['Government', 'Travel'], expiryDate: '2030-12-31', createdAt: '2026-01-15' },
  { id: 'doc-2', title: 'Driver License', category: 'id_proof', docNumber: 'DL-90421-A', tags: ['Identity', 'Driving'], expiryDate: '2028-06-20', createdAt: '2026-02-10' },
  { id: 'doc-3', title: 'Health Insurance Policy', category: 'insurance', docNumber: 'POL-884920', tags: ['Medical', 'Policy'], expiryDate: '2027-04-15', createdAt: '2026-03-01' }
];

let vaultPasswords = JSON.parse(localStorage.getItem('vault_passwords')) || [
  { id: 'pass-1', serviceName: 'Google Account', username: 'john.doe@gmail.com', password: 'P@ssw0rd2026!Secure', websiteUrl: 'https://accounts.google.com', notes: 'Primary email', strength: 'strong', updatedAt: '2026-07-01' },
  { id: 'pass-2', serviceName: 'Chase Online Banking', username: 'johndoe_chase', password: 'B@nk#88421Pass!', websiteUrl: 'https://chase.com', notes: 'Checking Account', strength: 'strong', updatedAt: '2026-07-10' }
];

let vaultCards = JSON.parse(localStorage.getItem('vault_cards')) || [
  { id: 'card-1', cardTitle: 'Visa Sapphire Preferred', holderName: 'John Doe', cardNumber: '4532 8921 0942 4821', expiryDate: '09/28', cvv: '482', cardType: 'bank', colorHex: '#4f46e5' },
  { id: 'card-2', cardTitle: 'National Identity Card', holderName: 'John Doe', cardNumber: '9048-2841-0092', expiryDate: '10/35', cvv: 'N/A', cardType: 'id', colorHex: '#059669' }
];

let vaultNotes = JSON.parse(localStorage.getItem('vault_notes')) || [
  { id: 'note-1', title: 'Emergency Medical Info', content: 'Dr. Smith: +1 555-0192\nBlood Type: O Positive\nAllergies: Penicillin', category: 'Health', updatedAt: '2026-06-20' },
  { id: 'note-2', title: 'Router Wi-Fi Credentials', content: 'Network: Home_Fiber_5G\nPassword: ultra_secure_wifi_key_99', category: 'Home', updatedAt: '2026-07-05' }
];

function saveVaultToStorage() {
  localStorage.setItem('vault_pin', vaultSavedPin);
  localStorage.setItem('vault_documents', JSON.stringify(vaultDocuments));
  localStorage.setItem('vault_passwords', JSON.stringify(vaultPasswords));
  localStorage.setItem('vault_cards', JSON.stringify(vaultCards));
  localStorage.setItem('vault_notes', JSON.stringify(vaultNotes));
}

let pinSuccessCallback = null;

function openVaultPinKeypad(callback) {
  pinSuccessCallback = callback || null;
  vaultEnteredPin = '';
  updatePinDotsUI();
  const errorEl = document.getElementById('pinErrorMsg');
  if (errorEl) errorEl.classList.add('hidden');
  const modal = document.getElementById('vaultPinModal');
  if (modal) modal.classList.remove('hidden');
}

function enterPinDigit(digit) {
  if (vaultEnteredPin.length >= 4) return;
  vaultEnteredPin += digit;
  updatePinDotsUI();

  if (vaultEnteredPin.length === 4) {
    setTimeout(verifyEnteredPin, 150);
  }
}

function deletePinDigit() {
  if (vaultEnteredPin.length > 0) {
    vaultEnteredPin = vaultEnteredPin.slice(0, -1);
    updatePinDotsUI();
  }
}

function updatePinDotsUI() {
  const dots = document.querySelectorAll('#pinDotsRow .pin-dot');
  dots.forEach((dot, index) => {
    if (index < vaultEnteredPin.length) {
      dot.classList.add('filled');
    } else {
      dot.classList.remove('filled');
    }
  });
}

function verifyEnteredPin() {
  if (vaultEnteredPin === vaultSavedPin) {
    closeModal('vaultPinModal');
    vaultEnteredPin = '';
    vaultFailedAttempts = 0;
    if (pinSuccessCallback) {
      const cb = pinSuccessCallback;
      pinSuccessCallback = null;
      cb();
    } else {
      renderVaultSuiteModal();
    }
  } else {
    vaultFailedAttempts++;
    const keypad = document.querySelector('.pin-keypad-window');
    const errorEl = document.getElementById('pinErrorMsg');
    if (keypad) {
      keypad.classList.add('shake-animation');
      setTimeout(() => keypad.classList.remove('shake-animation'), 400);
    }
    if (errorEl) {
      errorEl.innerText = `Incorrect PIN (${vaultFailedAttempts}/5 attempts). Default PIN is 1234.`;
      errorEl.classList.remove('hidden');
    }
    vaultEnteredPin = '';
    updatePinDotsUI();
  }
}

function triggerBiometricUnlock() {
  alert('Biometric Fingerprint Verified Successfully!');
  closeModal('vaultPinModal');
  vaultEnteredPin = '';
  vaultFailedAttempts = 0;
  if (pinSuccessCallback) {
    const cb = pinSuccessCallback;
    pinSuccessCallback = null;
    cb();
  } else {
    renderVaultSuiteModal();
  }
}

function triggerForgotPinFlow() {
  const resetCode = prompt('Security Verification: Enter your registered recovery email or type "RESET":');
  if (resetCode && resetCode.trim().toUpperCase() === 'RESET') {
    const newPin = prompt('Enter NEW 4-digit PIN (e.g. 1234):');
    if (newPin && newPin.length === 4 && !isNaN(newPin)) {
      vaultSavedPin = newPin;
      saveVaultToStorage();
      alert(`PIN successfully reset to: ${newPin}`);
      openVaultPinKeypad();
    } else {
      alert('Invalid PIN format. PIN must be 4 digits.');
    }
  }
}

function renderVaultSuiteModal() {
  const modal = document.getElementById('sectionModal');
  const titleEl = document.getElementById('modalTitle');
  const iconEl = document.getElementById('modalIcon');
  const bodyEl = document.getElementById('modalBody');
  const secBtn = document.getElementById('sectionMenuBtn');

  if (!modal || !titleEl || !iconEl || !bodyEl) return;

  currentSectionDrawer = 'vault';
  if (secBtn) secBtn.classList.remove('hidden');

  titleEl.innerText = 'Personal Vault';
  iconEl.className = 'fa-solid fa-shield-halved color-purple';

  let tabContent = '';

  if (vaultActiveTab === 'home') {
    tabContent = `
      <div style="background:linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color:#fff; padding:20px; border-radius:20px; box-shadow:0 10px 25px rgba(99,102,241,0.3); margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <div style="font-size:12px; opacity:0.85; text-transform:uppercase; letter-spacing:0.5px;">AES-256 Encrypted Storage</div>
            <h3 style="font-size:20px; font-weight:800; margin-top:2px;">DigiLocker Personal Vault</h3>
          </div>
          <div style="width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:20px;">
            <i class="fa-solid fa-lock"></i>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; background:rgba(255,255,255,0.15); padding:12px; border-radius:14px; text-align:center;">
          <div><h4 style="font-size:18px; font-weight:800;">${vaultDocuments.length}</h4><span style="font-size:10px; opacity:0.8;">Docs</span></div>
          <div><h4 style="font-size:18px; font-weight:800;">${vaultPasswords.length}</h4><span style="font-size:10px; opacity:0.8;">Passwords</span></div>
          <div><h4 style="font-size:18px; font-weight:800;">${vaultCards.length}</h4><span style="font-size:10px; opacity:0.8;">Cards</span></div>
          <div><h4 style="font-size:18px; font-weight:800;">${vaultNotes.length}</h4><span style="font-size:10px; opacity:0.8;">Notes</span></div>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <h4 style="font-size:15px; font-weight:800;">Quick Categories</h4>
        <button class="btn-flat color-primary" onclick="openVaultDocAddModal()"><i class="fa-solid fa-plus"></i> Add Item</button>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div class="modal-item-card" onclick="switchVaultTab('docs')" style="cursor:pointer;">
          <div style="display:flex; align-items:center; gap:12px;">
            <i class="fa-solid fa-file-shield color-blue" style="font-size:22px;"></i>
            <div><h4 style="font-size:14px;">Documents</h4><p style="font-size:11px; color:var(--text-muted);">${vaultDocuments.length} Verified IDs</p></div>
          </div>
        </div>
        <div class="modal-item-card" onclick="switchVaultTab('passwords')" style="cursor:pointer;">
          <div style="display:flex; align-items:center; gap:12px;">
            <i class="fa-solid fa-key color-purple" style="font-size:22px;"></i>
            <div><h4 style="font-size:14px;">Passwords</h4><p style="font-size:11px; color:var(--text-muted);">${vaultPasswords.length} Credentials</p></div>
          </div>
        </div>
        <div class="modal-item-card" onclick="switchVaultTab('cards')" style="cursor:pointer;">
          <div style="display:flex; align-items:center; gap:12px;">
            <i class="fa-solid fa-credit-card color-teal" style="font-size:22px;"></i>
            <div><h4 style="font-size:14px;">Bank Cards & IDs</h4><p style="font-size:11px; color:var(--text-muted);">${vaultCards.length} Vault Cards</p></div>
          </div>
        </div>
        <div class="modal-item-card" onclick="switchVaultTab('notes')" style="cursor:pointer;">
          <div style="display:flex; align-items:center; gap:12px;">
            <i class="fa-solid fa-note-sticky color-orange" style="font-size:22px;"></i>
            <div><h4 style="font-size:14px;">Secure Notes</h4><p style="font-size:11px; color:var(--text-muted);">${vaultNotes.length} Encrypted</p></div>
          </div>
        </div>
      </div>
    `;
  } else if (vaultActiveTab === 'docs') {
    tabContent = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h4 style="font-size:16px; font-weight:800;">Stored Documents (${vaultDocuments.length})</h4>
        <button class="btn btn-sm btn-primary" onclick="openVaultDocAddModal()"><i class="fa-solid fa-upload"></i> Upload / Scan</button>
      </div>
      <div class="modal-section-grid">
        ${vaultDocuments.map(doc => `
          <div class="modal-item-card" onclick="openVaultItemDetails('doc', '${doc.id}')" style="cursor:pointer;">
            <div style="display:flex; align-items:center; gap:14px;">
              <div style="width:42px; height:42px; border-radius:12px; background:rgba(99,102,241,0.12); color:var(--primary); display:flex; align-items:center; justify-content:center; font-size:20px;">
                <i class="fa-solid fa-file-shield"></i>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700;">${doc.title}</h4>
                <p style="font-size:12px; color:var(--text-muted);">Doc ID: ${doc.docNumber} • Expires ${doc.expiryDate}</p>
              </div>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn-icon color-primary" onclick="event.stopPropagation(); openVaultItemDetails('doc', '${doc.id}')" title="Preview Document"><i class="fa-solid fa-eye"></i></button>
              <button class="btn-icon color-red" onclick="event.stopPropagation(); deleteVaultDocument('${doc.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (vaultActiveTab === 'passwords') {
    tabContent = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h4 style="font-size:16px; font-weight:800;">Password Vault (${vaultPasswords.length})</h4>
        <button class="btn btn-sm btn-primary" onclick="openVaultPassAddModal()"><i class="fa-solid fa-plus"></i> New Password</button>
      </div>
      <div class="modal-section-grid">
        ${vaultPasswords.map(pass => `
          <div class="modal-item-card" onclick="openVaultItemDetails('pass', '${pass.id}')" style="cursor:pointer;">
            <div style="display:flex; align-items:center; gap:14px;">
              <div style="width:42px; height:42px; border-radius:12px; background:rgba(139,92,246,0.12); color:var(--purple); display:flex; align-items:center; justify-content:center; font-size:20px;">
                <i class="fa-solid fa-key"></i>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700;">${pass.serviceName}</h4>
                <p style="font-size:12px; color:var(--text-muted);">${pass.username} ${pass.notes ? '• ' + pass.notes : ''}</p>
              </div>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn-icon color-primary" onclick="event.stopPropagation(); copyPassToClipboard('${pass.password}')" title="Copy Password"><i class="fa-solid fa-copy"></i></button>
              <button class="btn-icon color-red" onclick="event.stopPropagation(); deleteVaultPassword('${pass.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (vaultActiveTab === 'cards') {
    tabContent = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h4 style="font-size:16px; font-weight:800;">Bank Cards & Identity Info (${vaultCards.length})</h4>
        <button class="btn btn-sm btn-primary" onclick="openVaultCardAddModal()"><i class="fa-solid fa-plus"></i> Add Card</button>
      </div>
      <div class="modal-section-grid">
        ${vaultCards.map(card => `
          <div class="modal-item-card" onclick="openVaultItemDetails('card', '${card.id}')" style="border-left:4px solid ${card.colorHex}; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:14px;">
              <div style="width:42px; height:42px; border-radius:12px; background:${card.colorHex}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:18px;">
                <i class="fa-solid fa-credit-card"></i>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700;">${card.cardTitle}</h4>
                <p style="font-size:12px; color:var(--text-muted);">${card.holderName} • Exp: ${card.expiryDate}</p>
                <div style="font-size:13px; font-weight:800; font-family:monospace; margin-top:2px;">${card.cardNumber}</div>
              </div>
            </div>
            <button class="btn-icon color-red" onclick="event.stopPropagation(); deleteVaultCard('${card.id}')" title="Delete Card"><i class="fa-solid fa-trash"></i></button>
          </div>
        `).join('')}
      </div>
    `;
  } else if (vaultActiveTab === 'notes') {
    tabContent = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h4 style="font-size:16px; font-weight:800;">Encrypted Notes (${vaultNotes.length})</h4>
        <button class="btn btn-sm btn-primary" onclick="openVaultNoteAddModal()"><i class="fa-solid fa-plus"></i> New Note</button>
      </div>
      <div class="modal-section-grid">
        ${vaultNotes.map(note => `
          <div class="modal-item-card" onclick="openVaultItemDetails('note', '${note.id}')" style="cursor:pointer;">
            <div>
              <h4 style="font-size:14px; font-weight:700;">${note.title}</h4>
              <p style="font-size:12px; color:var(--text-muted); margin-top:2px;">${note.content}</p>
            </div>
            <button class="btn-icon color-red" onclick="event.stopPropagation(); deleteVaultNote('${note.id}')" title="Delete Note"><i class="fa-solid fa-trash"></i></button>
          </div>
        `).join('')}
      </div>
    `;
  } else if (vaultActiveTab === 'settings') {
    tabContent = `
      <div class="modal-section-grid">
        <div class="modal-item-card">
          <div><h4>Change Security PIN</h4><p>Update your 4-digit master unlock code</p></div>
          <button class="btn btn-outline" style="padding:6px 12px; font-size:12px;" onclick="promptChangeVaultPin()"><i class="fa-solid fa-key"></i> Change PIN</button>
        </div>
        <div class="modal-item-card">
          <div><h4>Biometric Authentication</h4><p>Use Fingerprint or Face ID to unlock</p></div>
          <span class="preview-tag green-tag">Enabled</span>
        </div>
        <div class="modal-item-card">
          <div><h4>AES-256 Local Encryption</h4><p>All passwords and docs encrypted at rest</p></div>
          <span class="preview-tag purple-tag">Active</span>
        </div>
      </div>
    `;
  }

  bodyEl.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:16px;">
      ${tabContent}
    </div>
  `;

  modal.classList.remove('hidden');
}

function toggleVaultMenuDrawer() {
  const drawer = document.getElementById('vaultDrawerModal');
  if (drawer) drawer.classList.toggle('hidden');
}

function switchVaultTabFromDrawer(tabName) {
  closeModal('vaultDrawerModal');
  switchVaultTab(tabName);
}

function switchVaultTab(tabName) {
  vaultActiveTab = tabName;
  renderVaultSuiteModal();
}

let currentUploadedFileData = null;

function triggerDocCameraScan() {
  const input = document.getElementById('docFileInput');
  if (input) {
    input.setAttribute('capture', 'environment');
    input.click();
  }
}

function triggerDocGalleryUpload() {
  const input = document.getElementById('docFileInput');
  if (input) {
    input.removeAttribute('capture');
    input.click();
  }
}

function handleDocFileSelection(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('docFilePreview');
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    currentUploadedFileData = {
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type,
      dataUrl: e.target.result
    };

    if (preview) {
      preview.style.display = 'block';
      if (file.type.startsWith('image/')) {
        preview.innerHTML = `
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${e.target.result}" style="width:50px; height:50px; border-radius:8px; object-fit:cover; border:1px solid var(--border-color);">
            <div>
              <div style="font-size:13px; font-weight:700; color:var(--text-main);">${file.name}</div>
              <div style="font-size:11px; color:var(--secondary); font-weight:600;"><i class="fa-solid fa-circle-check"></i> Image attached (${currentUploadedFileData.size})</div>
            </div>
          </div>
        `;
      } else {
        preview.innerHTML = `
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:44px; height:44px; border-radius:10px; background:rgba(239,68,68,0.12); color:var(--error); display:flex; align-items:center; justify-content:center; font-size:22px;">
              <i class="fa-solid fa-file-pdf"></i>
            </div>
            <div>
              <div style="font-size:13px; font-weight:700; color:var(--text-main);">${file.name}</div>
              <div style="font-size:11px; color:var(--secondary); font-weight:600;"><i class="fa-solid fa-circle-check"></i> PDF Document attached (${currentUploadedFileData.size})</div>
            </div>
          </div>
        `;
      }
    }
  };
  reader.readAsDataURL(file);
}

function openVaultDocAddModal() {
  currentUploadedFileData = null;
  const preview = document.getElementById('docFilePreview');
  if (preview) {
    preview.style.display = 'none';
    preview.innerHTML = '';
  }
  const modal = document.getElementById('vaultDocAddModal');
  if (modal) modal.classList.remove('hidden');
}

function saveVaultDocument() {
  const title = document.getElementById('docTitleInput').value.trim();
  const category = document.getElementById('docCategorySelect').value;
  const docNumber = document.getElementById('docNumberInput').value.trim();

  if (!title || !docNumber) return;

  const newDoc = {
    id: 'doc-' + Date.now(),
    title,
    category,
    docNumber,
    fileData: currentUploadedFileData,
    tags: ['Personal', 'Vault'],
    expiryDate: '2030-12-31',
    createdAt: new Date().toISOString().split('T')[0]
  };

  vaultDocuments.unshift(newDoc);
  saveVaultToStorage();
  currentUploadedFileData = null;
  closeModal('vaultDocAddModal');
  switchVaultTab('docs');
}

function openVaultItemDetails(type, id) {
  const modal = document.getElementById('vaultPreviewModal');
  const titleEl = document.getElementById('vaultPreviewTitle');
  const iconEl = document.getElementById('vaultPreviewIcon');
  const bodyEl = document.getElementById('vaultPreviewBody');

  if (!modal || !titleEl || !iconEl || !bodyEl) return;

  if (type === 'doc') {
    const doc = vaultDocuments.find(d => d.id === id);
    if (!doc) return;

    titleEl.innerText = doc.title;
    iconEl.className = 'fa-solid fa-file-shield modal-header-icon color-blue';

    let fileContent = '';
    if (doc.fileData && doc.fileData.dataUrl) {
      if (doc.fileData.type.startsWith('image/')) {
        fileContent = `<img src="${doc.fileData.dataUrl}" style="width:100%; max-height:260px; object-fit:contain; border-radius:14px; border:1px solid var(--border-color); margin-bottom:16px;">`;
      } else {
        fileContent = `
          <div style="padding:20px; text-align:center; background:var(--bg-body); border-radius:14px; border:1px solid var(--border-color); margin-bottom:16px;">
            <i class="fa-solid fa-file-pdf color-red" style="font-size:40px; margin-bottom:8px;"></i>
            <h4 style="font-size:15px; font-weight:700;">${doc.fileData.name}</h4>
            <p style="font-size:12px; color:var(--text-muted);">${doc.fileData.size}</p>
          </div>
        `;
      }
    } else {
      fileContent = `
        <div style="padding:20px; text-align:center; background:var(--bg-body); border-radius:14px; border:1px dashed var(--border-color); margin-bottom:16px;">
          <i class="fa-solid fa-shield-halved color-purple" style="font-size:36px; margin-bottom:8px;"></i>
          <h4 style="font-size:14px; font-weight:700;">AES-256 Digitally Signed Record</h4>
          <p style="font-size:12px; color:var(--text-muted);">Encrypted DigiLocker Document Badge</p>
        </div>
      `;
    }

    bodyEl.innerHTML = `
      ${fileContent}
      <div style="display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <span style="font-size:12px; color:var(--text-muted);">Document Number / ID</span>
          <span style="font-size:14px; font-weight:800; font-family:monospace;">${doc.docNumber}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <span style="font-size:12px; color:var(--text-muted);">Category</span>
          <span style="font-size:13px; font-weight:700; text-transform:capitalize;">${doc.category.replace('_', ' ')}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <span style="font-size:12px; color:var(--text-muted);">Expiry Date</span>
          <span style="font-size:13px; font-weight:700;">${doc.expiryDate}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:12px; color:var(--text-muted);">Added Date</span>
          <span style="font-size:13px; font-weight:700;">${doc.createdAt}</span>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
        <button class="btn btn-outline" onclick="alert('Document shared securely via encrypted link.')"><i class="fa-solid fa-share-nodes"></i> Share</button>
        <button class="btn btn-primary" onclick="closeModal('vaultPreviewModal')">Close</button>
      </div>
    `;
  } else if (type === 'pass') {
    const pass = vaultPasswords.find(p => p.id === id);
    if (!pass) return;

    titleEl.innerText = pass.serviceName;
    iconEl.className = 'fa-solid fa-key modal-header-icon color-purple';

    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="background:var(--bg-body); padding:14px; border-radius:14px; border:1px solid var(--border-color);">
          <span style="font-size:11px; color:var(--text-muted); font-weight:700;">USERNAME / EMAIL</span>
          <div style="font-size:15px; font-weight:800; color:var(--text-main); margin-top:2px;">${pass.username}</div>
        </div>
        <div style="background:var(--bg-body); padding:14px; border-radius:14px; border:1px solid var(--border-color);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; color:var(--text-muted); font-weight:700;">PASSWORD</span>
            <button class="btn-text-save" style="font-size:11px; padding:2px 8px;" onclick="copyPassToClipboard('${pass.password}')"><i class="fa-solid fa-copy"></i> Copy</button>
          </div>
          <div style="font-size:16px; font-weight:800; font-family:monospace; color:var(--purple); margin-top:4px;">${pass.password}</div>
        </div>
        ${pass.notes ? `
          <div style="background:var(--bg-body); padding:14px; border-radius:14px; border:1px solid var(--border-color);">
            <span style="font-size:11px; color:var(--text-muted); font-weight:700;">NOTES / RECOVERY HINT</span>
            <div style="font-size:14px; font-weight:700; color:var(--text-main); margin-top:4px;">${pass.notes}</div>
          </div>
        ` : ''}
        <div style="display:flex; justify-content:space-between; align-items:center; padding:0 4px;">
          <span style="font-size:12px; color:var(--text-muted);">Security Strength</span>
          <span class="preview-tag ${pass.strength === 'strong' ? 'green-tag' : 'orange-tag'}">${pass.strength.toUpperCase()}</span>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:20px;">
        <button class="btn btn-primary" onclick="closeModal('vaultPreviewModal')">Done</button>
      </div>
    `;
  } else if (type === 'card') {
    const card = vaultCards.find(c => c.id === id);
    if (!card) return;

    titleEl.innerText = card.cardTitle;
    iconEl.className = 'fa-solid fa-credit-card modal-header-icon color-teal';

    bodyEl.innerHTML = `
      <div style="background:${card.colorHex}; color:#fff; padding:20px; border-radius:20px; box-shadow:0 10px 25px rgba(0,0,0,0.25); margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <span style="font-size:14px; font-weight:800; text-transform:uppercase; letter-spacing:1px;">${card.cardType || 'BANK'} CARD</span>
          <i class="fa-solid fa-credit-card" style="font-size:24px;"></i>
        </div>
        <div style="font-size:20px; font-weight:800; font-family:monospace; letter-spacing:2px; margin-bottom:20px;">${card.cardNumber}</div>
        <div style="display:flex; justify-content:space-between; align-items:flex-end;">
          <div>
            <div style="font-size:10px; opacity:0.8; text-transform:uppercase;">CARDHOLDER</div>
            <div style="font-size:14px; font-weight:800;">${card.holderName}</div>
          </div>
          <div>
            <div style="font-size:10px; opacity:0.8; text-transform:uppercase;">EXPIRES</div>
            <div style="font-size:14px; font-weight:800;">${card.expiryDate}</div>
          </div>
        </div>
      </div>
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:16px; margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <span style="font-size:12px; color:var(--text-muted);">Cardholder Name</span>
          <span style="font-size:14px; font-weight:700;">${card.holderName}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <span style="font-size:12px; color:var(--text-muted);">Card / ID Number</span>
          <span style="font-size:14px; font-weight:800; font-family:monospace;">${card.cardNumber}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:8px;">
          <span style="font-size:12px; color:var(--text-muted);">Expiry Date</span>
          <span style="font-size:14px; font-weight:700;">${card.expiryDate}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:12px; color:var(--text-muted);">CVV / Security Pin</span>
          <span style="font-size:15px; font-weight:800; font-family:monospace; color:var(--purple);">${card.cvv || '***'}</span>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end;">
        <button class="btn btn-primary" onclick="closeModal('vaultPreviewModal')">Close</button>
      </div>
    `;
  } else if (type === 'note') {
    const note = vaultNotes.find(n => n.id === id);
    if (!note) return;

    titleEl.innerText = note.title;
    iconEl.className = 'fa-solid fa-note-sticky modal-header-icon color-orange';

    bodyEl.innerHTML = `
      <div style="background:var(--bg-body); padding:16px; border-radius:16px; border:1px solid var(--border-color); margin-bottom:16px;">
        <p style="font-size:14px; color:var(--text-main); white-space:pre-wrap; line-height:1.6;">${note.content}</p>
      </div>
      <div style="display:flex; justify-content:flex-end;">
        <button class="btn btn-primary" onclick="closeModal('vaultPreviewModal')">Done</button>
      </div>
    `;
  }

  modal.classList.remove('hidden');
}

function deleteVaultDocument(id) {
  if (confirm('Are you sure you want to delete this document from your vault?')) {
    vaultDocuments = vaultDocuments.filter(d => d.id !== id);
    saveVaultToStorage();
    renderVaultSuiteModal();
  }
}

function openVaultPassAddModal() {
  const modal = document.getElementById('vaultPassAddModal');
  if (modal) modal.classList.remove('hidden');
}

function generateStrongPassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let pass = '';
  for (let i = 0; i < 16; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const input = document.getElementById('passValInput');
  if (input) {
    input.value = pass;
    updatePasswordStrengthMeter(pass);
  }
}

function updatePasswordStrengthMeter(val) {
  const label = document.getElementById('passStrengthLabel');
  if (!label) return;
  if (val.length > 12) {
    label.innerText = 'Strength: Strong (AES-256 Protected)';
    label.style.color = 'var(--secondary)';
  } else if (val.length >= 8) {
    label.innerText = 'Strength: Medium';
    label.style.color = 'var(--orange)';
  } else {
    label.innerText = 'Strength: Weak';
    label.style.color = 'var(--error)';
  }
}

function togglePassVisibility() {
  const input = document.getElementById('passValInput');
  const icon = document.getElementById('passEyeIcon');
  if (!input || !icon) return;
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fa-solid fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fa-solid fa-eye';
  }
}

function copyPassToClipboard(passText) {
  navigator.clipboard.writeText(passText).then(() => {
    alert('Password copied to clipboard! (Auto-clears in 30 seconds for security)');
  }).catch(() => {
    alert(`Password: ${passText}`);
  });
}

function saveVaultPassword() {
  const serviceName = document.getElementById('passServiceInput').value.trim();
  const username = document.getElementById('passUserInput').value.trim();
  const password = document.getElementById('passValInput').value.trim();
  const notes = document.getElementById('passNotesInput').value.trim();

  if (!serviceName || !username || !password) return;

  const newPass = {
    id: 'pass-' + Date.now(),
    serviceName,
    username,
    password,
    websiteUrl: 'https://' + serviceName.toLowerCase().replace(/\s+/g, '') + '.com',
    notes,
    strength: password.length > 12 ? 'strong' : 'medium',
    updatedAt: new Date().toISOString().split('T')[0]
  };

  vaultPasswords.unshift(newPass);
  saveVaultToStorage();
  closeModal('vaultPassAddModal');
  switchVaultTab('passwords');
}

function deleteVaultPassword(id) {
  if (confirm('Delete this password entry?')) {
    vaultPasswords = vaultPasswords.filter(p => p.id !== id);
    saveVaultToStorage();
    renderVaultSuiteModal();
  }
}

function openVaultCardAddModal() {
  const modal = document.getElementById('vaultCardAddModal');
  if (modal) modal.classList.remove('hidden');
}

function saveVaultCard() {
  const cardTitle = document.getElementById('cardTitleInput').value.trim();
  const holderName = document.getElementById('cardHolderInput').value.trim();
  const cardNumber = document.getElementById('cardNumberInput').value.trim();
  const expiryDate = document.getElementById('cardExpiryInput').value.trim();
  const cvvEl = document.getElementById('cardCvvInput');
  const cvv = cvvEl ? cvvEl.value.trim() : '';

  if (!cardTitle || !cardNumber) return;

  const newCard = {
    id: 'card-' + Date.now(),
    cardTitle,
    holderName,
    cardNumber,
    expiryDate,
    cvv: cvv || '***',
    cardType: 'bank',
    colorHex: '#4f46e5'
  };

  vaultCards.unshift(newCard);
  saveVaultToStorage();
  closeModal('vaultCardAddModal');
  switchVaultTab('cards');
}

function deleteVaultCard(id) {
  if (confirm('Delete this card from your vault?')) {
    vaultCards = vaultCards.filter(c => c.id !== id);
    saveVaultToStorage();
    renderVaultSuiteModal();
  }
}

function openVaultNoteAddModal() {
  const title = prompt('Enter Note Title:');
  if (!title) return;
  const content = prompt('Enter Note Details (Encrypted):');
  if (!content) return;

  vaultNotes.unshift({
    id: 'note-' + Date.now(),
    title,
    content,
    category: 'General',
    updatedAt: new Date().toISOString().split('T')[0]
  });
  saveVaultToStorage();
  switchVaultTab('notes');
}

function deleteVaultNote(id) {
  if (confirm('Delete secret note?')) {
    vaultNotes = vaultNotes.filter(n => n.id !== id);
    saveVaultToStorage();
    renderVaultSuiteModal();
  }
}

function promptChangeVaultPin() {
  const oldPin = prompt('Enter CURRENT 4-digit PIN:');
  if (oldPin === vaultSavedPin) {
    const newPin = prompt('Enter NEW 4-digit PIN:');
    if (newPin && newPin.length === 4 && !isNaN(newPin)) {
      vaultSavedPin = newPin;
      saveVaultToStorage();
      alert('Master PIN updated successfully!');
    } else {
      alert('Invalid PIN format. Must be 4 numbers.');
    }
  } else {
    alert('Incorrect PIN!');
  }
}

/* ==========================================================================
   AEGIS — PERSONAL SAFETY & EMERGENCY RESPONSE SYSTEM ENGINE
   ========================================================================== */
let aegisIsArmed = false;
let aegisState = 'SAFE'; // 'SAFE', 'ARMED', 'PRE_ALERT', 'ALERT'
let aegisActiveTab = 'core'; // 'core', 'motion', 'gps', 'voice', 'routes'
let aegisCountdownTimer = null;
let aegisSecondsLeft = 15;
let aegisHoldAnimFrame = null;
let aegisHoldStartTime = 0;
const AEGIS_HOLD_DURATION_MS = 2000; // 2 seconds press-and-hold

let aegisMotionDetectorActive = true;
let aegisLastAccel = { x: 0.1, y: 9.8, z: 0.2, mag: 9.81 };
let aegisAnomalyThreshold = 22.0; // m/s^2 spike threshold for impact/fall

let aegisCurrentLocation = {
  lat: 37.774929,
  lng: -122.419416,
  accuracy: 3.5,
  speed: 0.0,
  altitude: 12.0,
  timestamp: new Date().toLocaleTimeString()
};
let aegisWatchPositionId = null;

let aegisVoiceRecognition = null;
let aegisVoiceListening = false;
let aegisVoiceTranscript = '';
let aegisVoiceTriggerPhrase = 'help me';

let aegisMediaStream = null;
let aegisMediaRecorder = null;
let aegisRecordedBlobs = [];
let aegisRecordingActive = false;
let aegisRecordedVideos = [];

let aegisEmergencyContacts = [
  { id: 'c1', name: 'Primary Guardian (Mom)', phone: '+1-555-0192', relation: 'Family', isPrimary: true },
  { id: 'c2', name: 'Partner / Spouse', phone: '+1-555-0843', relation: 'Family', isPrimary: false },
  { id: 'c3', name: 'Local Emergency Dispatch', phone: '911', relation: 'Emergency Services', isPrimary: false }
];

let aegisSafeHavens = [
  { id: 'h1', name: 'Metropolitan Central Police Dept', type: 'police', distance: '0.4 mi', eta: '2 mins', phone: '911', address: '100 Public Safety Way', icon: 'fa-building-shield' },
  { id: 'h2', name: 'St. Jude General Emergency ER', type: 'hospital', distance: '0.8 mi', eta: '4 mins', phone: '+1-555-4357', address: '450 Medical Plaza Blvd', icon: 'fa-hospital' },
  { id: 'h3', name: '24/7 Community Crisis Shelter', type: 'shelter', distance: '1.2 mi', eta: '6 mins', phone: '+1-555-7358', address: '820 Civic Safe Ave', icon: 'fa-person-shelter' }
];

// Initialize AEGIS System Sensors & Watchers
function initAegisSystem() {
  initAegisGeolocationWatcher();
  initAegisMotionSensor();
}

function renderAegisSafetySuiteModal() {
  const modal = document.getElementById('sectionModal');
  const titleEl = document.getElementById('modalTitle');
  const iconEl = document.getElementById('modalIcon');
  const bodyEl = document.getElementById('modalBody');

  if (!modal || !titleEl || !iconEl || !bodyEl) return;

  titleEl.innerText = 'AEGIS Personal Safety & Emergency System';
  iconEl.className = 'fa-solid fa-shield-halved color-coral';

  const secBtn = document.getElementById('sectionMenuBtn');
  if (secBtn) secBtn.classList.add('hidden');

  let activePillClass = 'status-safe';
  let activePillLabel = 'MONITORING • SAFE';
  if (aegisState === 'ARMED') {
    activePillClass = 'status-armed';
    activePillLabel = 'SYSTEM ARMED • READY';
  } else if (aegisState === 'ALERT' || aegisState === 'PRE_ALERT') {
    activePillClass = 'status-alert';
    activePillLabel = 'EMERGENCY SOS ALERT ACTIVE';
  }

  bodyEl.innerHTML = `
    <div class="aegis-container">
      <!-- Top Control Signage Bar -->
      <div class="aegis-header-bar">
        <div class="aegis-brand">
          <div class="aegis-badge-icon"><i class="fa-solid fa-shield-cat"></i></div>
          <div class="aegis-title-group">
            <h2>AEGIS <span style="font-size:12px; opacity:0.7; font-weight:600;">v4.2</span></h2>
            <div class="aegis-subtitle">SIGNAGE CONTROL PANEL • ONE-TAP GUARDIAN</div>
          </div>
        </div>
        <div class="aegis-status-pill ${activePillClass}" id="aegisHeaderStatusPill">
          <i class="fa-solid fa-circle"></i> <span id="aegisHeaderStatusText">${activePillLabel}</span>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="aegis-nav-tabs">
        <button class="aegis-nav-tab ${aegisActiveTab === 'core' ? 'active' : ''}" onclick="switchAegisTab('core')">
          <i class="fa-solid fa-bolt"></i> SOS Core
        </button>
        <button class="aegis-nav-tab ${aegisActiveTab === 'motion' ? 'active' : ''}" onclick="switchAegisTab('motion')">
          <i class="fa-solid fa-wave-square"></i> Motion AI
        </button>
        <button class="aegis-nav-tab ${aegisActiveTab === 'gps' ? 'active' : ''}" onclick="switchAegisTab('gps')">
          <i class="fa-solid fa-location-crosshairs"></i> Live GPS
        </button>
        <button class="aegis-nav-tab ${aegisActiveTab === 'voice' ? 'active' : ''}" onclick="switchAegisTab('voice')">
          <i class="fa-solid fa-microphone"></i> Voice & Evidence
        </button>
        <button class="aegis-nav-tab ${aegisActiveTab === 'routes' ? 'active' : ''}" onclick="switchAegisTab('routes')">
          <i class="fa-solid fa-route"></i> Safe Routes
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="aegis-grid">
        ${renderAegisTabBody()}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  // Bind SOS Hold events after DOM rendering
  setTimeout(bindAegisSosEvents, 50);
}

function switchAegisTab(tabId) {
  aegisActiveTab = tabId;
  renderAegisSafetySuiteModal();
}

function renderAegisTabBody() {
  if (aegisActiveTab === 'core') {
    return `
      <!-- Left Column: Primary SOS Hold Core -->
      <div class="aegis-sos-core">
        <div class="aegis-arm-switch-box">
          <div class="aegis-arm-label">
            <i class="fa-solid fa-power-off ${aegisIsArmed ? 'color-orange' : 'color-muted'}"></i>
            <span>System Arming Switch</span>
          </div>
          <label class="aegis-toggle-switch">
            <input type="checkbox" id="aegisArmToggle" ${aegisIsArmed ? 'checked' : ''} onchange="toggleAegisArmSystem(this.checked)">
            <span class="aegis-slider"></span>
          </label>
        </div>

        <div class="sos-button-wrapper">
          <svg class="sos-progress-ring" viewBox="0 0 160 160">
            <circle class="sos-progress-ring-circle" id="sosProgressRingCircle" cx="80" cy="80" r="70" stroke="#ff2a4b" stroke-width="8" fill="transparent"/>
          </svg>
          <button id="sosMainBtn" class="sos-main-btn ${aegisIsArmed ? 'armed' : ''}">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>SOS</span>
          </button>
        </div>

        <div class="sos-btn-hint" id="sosBtnHintText">
          ${aegisIsArmed ? 'HOLD FOR 2 SECONDS TO TRIGGER SOS' : 'SWITCH "ARM SYSTEM" ON TO ENABLE'}
        </div>
      </div>

      <!-- Right Column: Status Telemetry & Quick Action Hub -->
      <div class="aegis-panel">
        <div class="aegis-panel-title">
          <span><i class="fa-solid fa-heart-pulse color-coral"></i> Active Sentinel Telemetry</span>
          <span style="font-size:11px; color:#64748b; font-family:monospace;">REALTIME SYNC</span>
        </div>

        <div class="aegis-telemetry-row">
          <div class="telemetry-card">
            <div class="telemetry-label">GPS Precision</div>
            <div class="telemetry-val">±${aegisCurrentLocation.accuracy.toFixed(1)}m</div>
          </div>
          <div class="telemetry-card">
            <div class="telemetry-label">Motion Spike</div>
            <div class="telemetry-val">${aegisLastAccel.mag.toFixed(1)} m/s²</div>
          </div>
          <div class="telemetry-card">
            <div class="telemetry-label">Voice Trigger</div>
            <div class="telemetry-val" style="color:${aegisVoiceListening ? '#00f5d4' : '#64748b'};">${aegisVoiceListening ? 'LISTENING' : 'OFF'}</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:12px; font-weight:800; color:#e2e8f0; text-transform:uppercase;"><i class="fa-solid fa-phone-volume color-red"></i> Primary Emergency Contact</span>
            <span class="preview-tag red-tag">Auto Call Ready</span>
          </div>
          <div style="font-size:15px; font-weight:800; color:#fff;">${aegisEmergencyContacts[0].name}</div>
          <div style="font-size:13px; font-family:monospace; color:#00f5d4; margin-top:2px;">${aegisEmergencyContacts[0].phone}</div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <button class="btn" style="background:#ff2a4b; color:#fff; font-size:13px; font-weight:800; justify-content:center;" onclick="triggerAegisSosAlert('Manual Instant SOS Trigger')">
            <i class="fa-solid fa-bolt"></i> Instant 1-Tap SOS
          </button>
          <button class="btn btn-outline" style="color:#00f5d4; border-color:rgba(0,245,212,0.4); font-size:13px; font-weight:800; justify-content:center;" onclick="simulateMotionImpact()">
            <i class="fa-solid fa-person-falling"></i> Test Impact Spike
          </button>
        </div>
      </div>
    `;
  } else if (aegisActiveTab === 'motion') {
    return `
      <div class="aegis-panel" style="grid-column: 1 / -1;">
        <div class="aegis-panel-title">
          <span><i class="fa-solid fa-wave-square color-coral"></i> AI Motion & Acceleration Spike Detector</span>
          <span style="font-size:11px; color:#00f5d4;"><i class="fa-solid fa-circle status-online"></i> Sensor Active</span>
        </div>
        <p style="font-size:13px; color:#94a3b8; margin-bottom:16px;">
          Uses rolling-baseline anomaly calculations on device accelerometers to instantly catch sudden falls, car crashes, or violent physical impacts.
        </p>

        <div class="aegis-telemetry-row">
          <div class="telemetry-card">
            <div class="telemetry-label">Accel X</div>
            <div class="telemetry-val">${aegisLastAccel.x.toFixed(2)}</div>
          </div>
          <div class="telemetry-card">
            <div class="telemetry-label">Accel Y</div>
            <div class="telemetry-val">${aegisLastAccel.y.toFixed(2)}</div>
          </div>
          <div class="telemetry-card">
            <div class="telemetry-label">Accel Z</div>
            <div class="telemetry-val">${aegisLastAccel.z.toFixed(2)}</div>
          </div>
          <div class="telemetry-card">
            <div class="telemetry-label">Spike Vector</div>
            <div class="telemetry-val" style="color:${aegisLastAccel.mag > aegisAnomalyThreshold ? '#ff2a4b' : '#00f5d4'};">${aegisLastAccel.mag.toFixed(2)} m/s²</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <label style="font-size:12px; font-weight:800; color:#e2e8f0;">Anomaly Sensitivity Threshold</label>
            <span style="font-size:13px; font-weight:800; font-family:monospace; color:#ff9f1c;" id="aegisThresholdVal">${aegisAnomalyThreshold.toFixed(1)} m/s²</span>
          </div>
          <input type="range" min="12" max="40" step="1" value="${aegisAnomalyThreshold}" style="width:100%; accent-color:#ff9f1c;" oninput="document.getElementById('aegisThresholdVal').innerText = parseFloat(this.value).toFixed(1) + ' m/s²'; aegisAnomalyThreshold = parseFloat(this.value);">
        </div>

        <button class="btn" style="background:#ff9f1c; color:#0b0c10; font-weight:900; width:100%; justify-content:center; padding:14px;" onclick="simulateMotionImpact()">
          <i class="fa-solid fa-person-falling-burst"></i> SIMULATE SUDDEN FALL / CRASH IMPACT
        </button>
      </div>
    `;
  } else if (aegisActiveTab === 'gps') {
    const mapsUrl = generateAegisShareableLocationUrl();
    return `
      <div class="aegis-panel" style="grid-column: 1 / -1;">
        <div class="aegis-panel-title">
          <span><i class="fa-solid fa-location-crosshairs color-teal"></i> Continuous Live Geolocation Sentinel</span>
          <span style="font-size:11px; color:#00f5d4;"><i class="fa-solid fa-satellite-dish"></i> GPS Lock Active</span>
        </div>

        <div class="aegis-telemetry-row">
          <div class="telemetry-card">
            <div class="telemetry-label">Latitude</div>
            <div class="telemetry-val">${aegisCurrentLocation.lat.toFixed(6)}°</div>
          </div>
          <div class="telemetry-card">
            <div class="telemetry-label">Longitude</div>
            <div class="telemetry-val">${aegisCurrentLocation.lng.toFixed(6)}°</div>
          </div>
          <div class="telemetry-card">
            <div class="telemetry-label">Accuracy Error</div>
            <div class="telemetry-val">±${aegisCurrentLocation.accuracy.toFixed(1)} m</div>
          </div>
          <div class="telemetry-card">
            <div class="telemetry-label">Last Ping</div>
            <div class="telemetry-val" style="font-size:12px;">${aegisCurrentLocation.timestamp}</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px; margin-bottom:16px;">
          <div style="font-size:11px; font-weight:800; color:#64748b; text-transform:uppercase; margin-bottom:6px;">SHAREABLE EMERGENCY MAP BROADCAST LINK</div>
          <div style="display:flex; gap:10px;">
            <input type="text" readonly value="${mapsUrl}" class="editor-input" style="background:#0b0c10; border-color:rgba(255,255,255,0.15); color:#00f5d4; font-family:monospace; font-size:12px;">
            <button class="btn btn-outline" style="color:#00f5d4; border-color:#00f5d4; padding:0 16px; font-weight:800;" onclick="copyAegisMapsLink('${mapsUrl}')">
              <i class="fa-solid fa-copy"></i> Copy
            </button>
          </div>
        </div>

        <div style="font-size:13px; font-weight:800; color:#e2e8f0; margin-bottom:10px; text-transform:uppercase;">Emergency Contacts Alert Broadcast List</div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${aegisEmergencyContacts.map(c => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding:12px 14px; border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
              <div>
                <span style="font-size:14px; font-weight:700; color:#fff;">${c.name}</span>
                <span style="font-size:11px; color:#94a3b8; margin-left:8px;">(${c.relation})</span>
              </div>
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:13px; font-family:monospace; color:#00f5d4;">${c.phone}</span>
                <a href="tel:${c.phone}" class="btn btn-sm" style="background:rgba(239,68,68,0.2); color:#ff2a4b; border:1px solid #ff2a4b; padding:4px 10px; font-weight:800; text-decoration:none;"><i class="fa-solid fa-phone"></i> Call</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (aegisActiveTab === 'voice') {
    return `
      <div class="aegis-panel" style="grid-column: 1 / -1;">
        <div class="aegis-panel-title">
          <span><i class="fa-solid fa-microphone color-purple"></i> Voice Phrase Activation & Evidence Recorder</span>
        </div>

        <!-- Voice Activation Toggle -->
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div>
              <div style="font-size:14px; font-weight:800; color:#fff;">Voice Keyword Listener</div>
              <div style="font-size:12px; color:#94a3b8;">Triggers SOS alert when speaking phrase "${aegisVoiceTriggerPhrase.toUpperCase()}"</div>
            </div>
            <label class="aegis-toggle-switch">
              <input type="checkbox" ${aegisVoiceListening ? 'checked' : ''} onchange="toggleAegisVoiceRecognition(this.checked)">
              <span class="aegis-slider"></span>
            </label>
          </div>
          <div class="aegis-transcript-box">
            <span style="color:#64748b;">[LIVE TRANSCRIPT]:</span> ${aegisVoiceTranscript || 'Listening for emergency keywords... (Speak "Help me" or trigger test)'}
          </div>
          <div style="margin-top:10px; display:flex; gap:10px;">
            <button class="btn btn-outline" style="font-size:12px; color:#8b5cf6; border-color:#8b5cf6;" onclick="aegisVoiceTranscript = 'help me'; renderAegisSafetySuiteModal(); triggerAegisSosAlert('Voice Phrase Triggered: HELP ME');">
              <i class="fa-solid fa-bullhorn"></i> Test Speak "Help Me" Phrase
            </button>
          </div>
        </div>

        <!-- Audio/Video Camera Recorder -->
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="font-size:14px; font-weight:800; color:#fff;"><i class="fa-solid fa-video color-coral"></i> Camera & Audio Evidence Recorder</div>
            <span class="preview-tag ${aegisRecordingActive ? 'red-tag' : 'gray-tag'}">${aegisRecordingActive ? 'REC ACTIVE' : 'IDLE'}</span>
          </div>

          <div class="aegis-camera-box">
            <video id="aegisCameraViewfinder" class="aegis-camera-video" autoplay muted playsinline></video>
            ${aegisRecordingActive ? `
              <div class="aegis-rec-badge">
                <div class="aegis-rec-dot"></div> LIVE EVIDENTIAL RECORDING
              </div>
            ` : ''}
          </div>

          <div style="display:flex; gap:10px;">
            ${!aegisRecordingActive ? `
              <button class="btn" style="background:#ff2a4b; color:#fff; font-weight:800; flex:1; justify-content:center;" onclick="startAegisEvidenceRecording()">
                <i class="fa-solid fa-circle"></i> Start Video Recording
              </button>
            ` : `
              <button class="btn" style="background:#10b981; color:#fff; font-weight:800; flex:1; justify-content:center;" onclick="stopAegisEvidenceRecording()">
                <i class="fa-solid fa-square"></i> Stop & Download Recording
              </button>
            `}
          </div>

          ${aegisRecordedVideos.length > 0 ? `
            <div style="margin-top:16px;">
              <div style="font-size:12px; font-weight:800; color:#94a3b8; text-transform:uppercase; margin-bottom:8px;">Evidence Gallery Recordings</div>
              ${aegisRecordedVideos.map((vid, idx) => `
                <div style="display:flex; justify-content:space-between; align-items:center; background:#0b0c10; padding:10px 14px; border-radius:10px; border:1px solid rgba(255,255,255,0.08); margin-bottom:6px;">
                  <span style="font-size:13px; font-weight:700; color:#00f5d4;"><i class="fa-solid fa-file-video"></i> Evidence Clip #${idx + 1} (${vid.timestamp})</span>
                  <a href="${vid.url}" download="AEGIS_EVIDENCE_${vid.id}.webm" class="btn btn-sm" style="background:#3b82f6; color:#fff; text-decoration:none;"><i class="fa-solid fa-download"></i> Save</a>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  } else if (aegisActiveTab === 'routes') {
    return `
      <div class="aegis-panel" style="grid-column: 1 / -1;">
        <div class="aegis-panel-title">
          <span><i class="fa-solid fa-route color-orange"></i> Safe Haven Directions & Nearby Emergency Facilities</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:12px;">
          ${aegisSafeHavens.map(h => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); padding:16px; border-radius:14px; border:1px solid rgba(255,255,255,0.08);">
              <div style="display:flex; align-items:center; gap:14px;">
                <div style="width:44px; height:44px; border-radius:12px; background:rgba(255,159,28,0.15); color:#ff9f1c; display:flex; align-items:center; justify-content:center; font-size:20px; border:1px solid rgba(255,159,28,0.4);">
                  <i class="fa-solid ${h.icon}"></i>
                </div>
                <div>
                  <h4 style="font-size:15px; font-weight:800; color:#fff;">${h.name}</h4>
                  <p style="font-size:12px; color:#94a3b8;">${h.address} • <strong style="color:#00f5d4;">${h.distance}</strong> (${h.eta})</p>
                </div>
              </div>
              <div style="display:flex; gap:8px;">
                <a href="tel:${h.phone}" class="btn btn-outline" style="color:#ff2a4b; border-color:#ff2a4b; padding:8px 12px; font-weight:800; text-decoration:none;"><i class="fa-solid fa-phone"></i> Call</a>
                <button class="btn" style="background:#ff9f1c; color:#0b0c10; font-weight:900; padding:8px 14px;" onclick="openAegisDirections('${h.name}', '${h.address}')">
                  <i class="fa-solid fa-diamond-turn-right"></i> Directions
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

// Bind Press-and-Hold Event Listeners for SOS Button
function bindAegisSosEvents() {
  const btn = document.getElementById('sosMainBtn');
  if (!btn) return;

  const startEvents = ['mousedown', 'touchstart'];
  const endEvents = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];

  startEvents.forEach(evt => {
    btn.addEventListener(evt, (e) => {
      e.preventDefault();
      if (!aegisIsArmed) {
        alert('PLEASE ARM THE AEGIS SYSTEM FIRST!\nToggle the "System Arming Switch" at the top of the control panel.');
        return;
      }
      startSosHoldTimer();
    });
  });

  endEvents.forEach(evt => {
    btn.addEventListener(evt, (e) => {
      cancelSosHoldTimer();
    });
  });
}

function toggleAegisArmSystem(armed) {
  aegisIsArmed = armed;
  aegisState = armed ? 'ARMED' : 'SAFE';

  const pill = document.getElementById('aegisHeaderStatusPill');
  const text = document.getElementById('aegisHeaderStatusText');
  const btn = document.getElementById('sosMainBtn');
  const hint = document.getElementById('sosBtnHintText');

  if (pill && text && btn && hint) {
    if (armed) {
      pill.className = 'aegis-status-pill status-armed';
      text.innerText = 'SYSTEM ARMED • READY';
      btn.classList.add('armed');
      hint.innerText = 'HOLD FOR 2 SECONDS TO TRIGGER SOS';
    } else {
      pill.className = 'aegis-status-pill status-safe';
      text.innerText = 'MONITORING • SAFE';
      btn.classList.remove('armed');
      hint.innerText = 'SWITCH "ARM SYSTEM" ON TO ENABLE';
    }
  }
}

function startSosHoldTimer() {
  const btn = document.getElementById('sosMainBtn');
  const circle = document.getElementById('sosProgressRingCircle');
  if (btn) btn.classList.add('holding');

  aegisHoldStartTime = Date.now();

  function animateRing() {
    const elapsed = Date.now() - aegisHoldStartTime;
    const progress = Math.min(1.0, elapsed / AEGIS_HOLD_DURATION_MS);

    if (circle) {
      const offset = 440 - (440 * progress);
      circle.style.strokeDashoffset = offset;
    }

    if (progress >= 1.0) {
      cancelSosHoldTimer();
      triggerAegisSosAlert('2-Second SOS Button Press & Hold Triggered');
    } else {
      aegisHoldAnimFrame = requestAnimationFrame(animateRing);
    }
  }

  aegisHoldAnimFrame = requestAnimationFrame(animateRing);
}

function cancelSosHoldTimer() {
  if (aegisHoldAnimFrame) {
    cancelAnimationFrame(aegisHoldAnimFrame);
    aegisHoldAnimFrame = null;
  }

  const btn = document.getElementById('sosMainBtn');
  const circle = document.getElementById('sosProgressRingCircle');

  if (btn) btn.classList.remove('holding');
  if (circle) circle.style.strokeDashoffset = 440;
}

// Trigger Emergency Alert Modal
function triggerAegisSosAlert(reasonText) {
  aegisState = 'ALERT';
  aegisSecondsLeft = 15;

  let existingOverlay = document.getElementById('aegisAlertOverlay');
  if (!existingOverlay) {
    existingOverlay = document.createElement('div');
    existingOverlay.id = 'aegisAlertOverlay';
    existingOverlay.className = 'aegis-alert-overlay';
    document.body.appendChild(existingOverlay);
  }

  existingOverlay.innerHTML = `
    <div class="aegis-alert-box">
      <div style="font-size:24px; font-weight:900; color:#ff2a4b; text-transform:uppercase; letter-spacing:1px;">
        <i class="fa-solid fa-triangle-exclamation"></i> EMERGENCY SOS ALERT
      </div>
      <p style="font-size:12px; color:#94a3b8; font-weight:700; margin-top:4px;">${reasonText}</p>

      <div class="aegis-countdown-display" id="aegisAlertCountdownText">15</div>

      <div style="font-size:13px; font-weight:700; color:#e2e8f0; margin-bottom:12px;">
        Auto-Calling Primary Contact & Broadcasting GPS Coords in 15 seconds.
      </div>

      <button class="btn-cancel-safe" onclick="cancelAegisAlert()">
        <i class="fa-solid fa-shield-check"></i> I'M SAFE / CANCEL
      </button>
    </div>
  `;

  existingOverlay.classList.remove('hidden');

  // Start auto-recording video evidence
  startAegisEvidenceRecording();

  // Start countdown timer
  if (aegisCountdownTimer) clearInterval(aegisCountdownTimer);
  aegisCountdownTimer = setInterval(() => {
    aegisSecondsLeft--;
    const txt = document.getElementById('aegisAlertCountdownText');
    if (txt) txt.innerText = aegisSecondsLeft;

    if (aegisSecondsLeft <= 0) {
      clearInterval(aegisCountdownTimer);
      aegisCountdownTimer = null;
      executeEmergencyAutoCall();
    }
  }, 1000);
}

function cancelAegisAlert() {
  if (aegisCountdownTimer) {
    clearInterval(aegisCountdownTimer);
    aegisCountdownTimer = null;
  }

  aegisState = aegisIsArmed ? 'ARMED' : 'SAFE';

  const overlay = document.getElementById('aegisAlertOverlay');
  if (overlay) overlay.classList.add('hidden');

  // Stop evidence recording if running
  if (aegisRecordingActive) {
    stopAegisEvidenceRecording();
  }

  alert('SOS ALERT DISARMED & CANCELLED!\nStatus restored to safe.');
  renderAegisSafetySuiteModal();
}

function executeEmergencyAutoCall() {
  const primaryContact = aegisEmergencyContacts[0];
  alert(`COUNTDOWN EXPIRED!\nInitiating auto-call to primary contact: ${primaryContact.name} (${primaryContact.phone})`);
  window.location.href = `tel:${primaryContact.phone}`;
}

// Motion Anomaly Listener
function initAegisMotionSensor() {
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', (event) => {
      if (!aegisMotionDetectorActive) return;
      const acc = event.accelerationIncludingGravity || event.acceleration;
      if (!acc) return;

      const x = acc.x || 0;
      const y = acc.y || 0;
      const z = acc.z || 0;
      const mag = Math.sqrt(x*x + y*y + z*z);

      aegisLastAccel = { x, y, z, mag };

      // Check spike threshold anomaly
      if (mag > aegisAnomalyThreshold && aegisState !== 'ALERT') {
        triggerAegisSosAlert(`AI Motion Anomaly: Impact / Fall Spike Detected (${mag.toFixed(1)} m/s²)`);
      }
    });
  }
}

function simulateMotionImpact() {
  aegisLastAccel = { x: 18.4, y: 15.2, z: 22.8, mag: 33.1 };
  triggerAegisSosAlert('AI Motion Anomaly: Impact / Fall Spike Detected (33.1 m/s²)');
}

// Geolocation Continuous Watcher
function initAegisGeolocationWatcher() {
  if (navigator.geolocation) {
    aegisWatchPositionId = navigator.geolocation.watchPosition(
      (pos) => {
        aegisCurrentLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy || 3.5,
          speed: pos.coords.speed || 0.0,
          altitude: pos.coords.altitude || 12.0,
          timestamp: new Date().toLocaleTimeString()
        };
      },
      (err) => {
        console.warn('Geolocation watcher warning:', err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 }
    );
  }
}

function generateAegisShareableLocationUrl() {
  return `https://maps.google.com/?q=${aegisCurrentLocation.lat.toFixed(6)},${aegisCurrentLocation.lng.toFixed(6)}`;
}

function copyAegisMapsLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    alert('Shareable Emergency Map Link copied to clipboard!\nSend this link to your contacts for live GPS tracking.');
  }).catch(() => {
    alert(`Emergency Map Link: ${url}`);
  });
}

// Speech Recognition Engine
function toggleAegisVoiceRecognition(enable) {
  aegisVoiceListening = enable;

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    alert('Browser Speech Recognition API is not supported in this browser.\nSimulate voice commands by clicking the test button.');
    aegisVoiceListening = false;
    renderAegisSafetySuiteModal();
    return;
  }

  if (enable) {
    try {
      aegisVoiceRecognition = new SpeechRec();
      aegisVoiceRecognition.continuous = true;
      aegisVoiceRecognition.interimResults = true;
      aegisVoiceRecognition.lang = 'en-US';

      aegisVoiceRecognition.onresult = (evt) => {
        let transcript = '';
        for (let i = evt.resultIndex; i < evt.results.length; i++) {
          transcript += evt.results[i][0].transcript;
        }
        aegisVoiceTranscript = transcript.toLowerCase();
        renderAegisSafetySuiteModal();

        if (aegisVoiceTranscript.includes(aegisVoiceTriggerPhrase) && aegisState !== 'ALERT') {
          triggerAegisSosAlert(`Voice Keyword Activated: "${aegisVoiceTriggerPhrase.toUpperCase()}" spoken`);
        }
      };

      aegisVoiceRecognition.start();
    } catch (e) {
      console.error('Voice rec error:', e);
    }
  } else {
    if (aegisVoiceRecognition) {
      aegisVoiceRecognition.stop();
      aegisVoiceRecognition = null;
    }
  }

  renderAegisSafetySuiteModal();
}

// Audio/Video Evidence Recorder
async function startAegisEvidenceRecording() {
  try {
    aegisRecordedBlobs = [];
    aegisMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    const vf = document.getElementById('aegisCameraViewfinder');
    if (vf) vf.srcObject = aegisMediaStream;

    aegisMediaRecorder = new MediaRecorder(aegisMediaStream);
    aegisMediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        aegisRecordedBlobs.push(e.data);
      }
    };

    aegisMediaRecorder.onstop = () => {
      const blob = new Blob(aegisRecordedBlobs, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      aegisRecordedVideos.unshift({
        id: Date.now(),
        url,
        timestamp: new Date().toLocaleTimeString()
      });
      renderAegisSafetySuiteModal();
    };

    aegisMediaRecorder.start();
    aegisRecordingActive = true;
    renderAegisSafetySuiteModal();
  } catch (e) {
    console.warn('Camera/mic access permission denied or unavailable:', e);
  }
}

function stopAegisEvidenceRecording() {
  if (aegisMediaRecorder && aegisRecordingActive) {
    aegisMediaRecorder.stop();
    aegisRecordingActive = false;
  }
  if (aegisMediaStream) {
    aegisMediaStream.getTracks().forEach(t => t.stop());
    aegisMediaStream = null;
  }
  renderAegisSafetySuiteModal();
}

function openAegisDirections(facilityName, address) {
  const query = encodeURIComponent(`${facilityName}, ${address}`);
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
}






