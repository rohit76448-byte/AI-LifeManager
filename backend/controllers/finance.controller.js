/**
 * MONEY TRACKER & FINANCE CONTROLLER
 */

const { db, saveDatabase } = require('../config/database');

exports.getFinanceSummary = (req, res) => {
  const accounts = db.financeAccounts || [];
  const transactions = db.financeTransactions || [];
  let totalBalance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  accounts.forEach(a => { totalBalance += (a.balance || 0); });
  transactions.forEach(t => {
    if (t.type === 'income') totalIncome += t.amount;
    else if (t.type === 'expense') totalExpense += t.amount;
  });

  res.json({
    success: true,
    currency: '$',
    totalBalance: Number(totalBalance.toFixed(2)),
    monthlyIncome: Number(totalIncome.toFixed(2)),
    monthlyExpense: Number(totalExpense.toFixed(2)),
    accounts,
    recentTransactions: transactions.slice(-10)
  });
};

exports.createTransaction = (req, res) => {
  const { accountId, title, amount, type, category, notes, date, time } = req.body;

  if (!title || !amount || !type) {
    return res.status(400).json({ success: false, message: 'Title, amount, and type are required.' });
  }

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Amount must be a positive number.' });
  }

  let targetAccount = db.financeAccounts.find(a => a.id === accountId);
  if (!targetAccount) {
    targetAccount = db.financeAccounts[0]; // fallback
  }

  // Update Account Balance
  if (type === 'income') {
    targetAccount.balance += numericAmount;
  } else if (type === 'expense') {
    targetAccount.balance -= numericAmount;
  }

  const newTx = {
    id: `tx_${Date.now()}`,
    accountId: targetAccount.id,
    title: title.trim(),
    amount: numericAmount,
    type,
    category: category || 'General',
    date: date || new Date().toISOString().slice(0, 10),
    time: time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  db.financeTransactions.push(newTx);
  saveDatabase();

  res.status(201).json({
    success: true,
    message: `${type === 'income' ? 'Income' : 'Expense'} recorded successfully.`,
    transaction: newTx,
    updatedAccount: targetAccount
  });
};

exports.createAccount = (req, res) => {
  const { name, type, initialBalance } = req.body;

  if (!name || !type) {
    return res.status(400).json({ success: false, message: 'Account name and type are required.' });
  }

  const newAcc = {
    id: `acc_${Date.now()}`,
    name: name.trim(),
    type,
    balance: parseFloat(initialBalance) || 0.00,
    currency: '$',
    createdAt: new Date().toISOString()
  };

  db.financeAccounts.push(newAcc);
  saveDatabase();

  res.status(201).json({
    success: true,
    message: 'Account created successfully.',
    account: newAcc
  });
};
