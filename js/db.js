/* ============================================
   FinanceKu - Database Module (IndexedDB via Dexie.js)
   ============================================ */

const DB_NAME = 'FinanceKuDB';
const DB_VERSION = 1;

// Initialize Dexie database
const db = new Dexie(DB_NAME);

// Define schema with indexes
db.version(DB_VERSION).stores({
  users: '++id, username, role',
  incomes: '++id, user_id, tanggal, kategori, akun, nominal',
  expenses: '++id, user_id, tanggal, kategori, akun, nominal',
  categories: '++id, name, type',
  accounts: '++id, name, type'
});

// ---- Seed Default Data ----

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function seedDatabase() {
  try {
    // Seed admin user if no users exist
    const userCount = await db.users.count();
    if (userCount === 0) {
      const adminHash = await hashPassword('admin123');
      const userHash = await hashPassword('user123');

      await db.users.bulkAdd([
        { username: 'admin', password: adminHash, fullName: 'Administrator', role: 'admin', createdAt: new Date().toISOString() },
        { username: 'user', password: userHash, fullName: 'Pengguna', role: 'user', createdAt: new Date().toISOString() }
      ]);
      console.log('[DB] Default users seeded');
    }

    // Seed default categories
    const catCount = await db.categories.count();
    if (catCount === 0) {
      await db.categories.bulkAdd([
        // Income categories
        { name: 'Gaji', type: 'income', icon: 'fa-briefcase' },
        { name: 'Freelance', type: 'income', icon: 'fa-laptop-code' },
        { name: 'Investasi', type: 'income', icon: 'fa-chart-line' },
        { name: 'Bonus', type: 'income', icon: 'fa-gift' },
        { name: 'Pendapatan Lain', type: 'income', icon: 'fa-coins' },
        // Expense categories
        { name: 'Makanan & Minuman', type: 'expense', icon: 'fa-utensils' },
        { name: 'Transportasi', type: 'expense', icon: 'fa-car' },
        { name: 'Belanja', type: 'expense', icon: 'fa-shopping-bag' },
        { name: 'Tagihan', type: 'expense', icon: 'fa-file-invoice' },
        { name: 'Hiburan', type: 'expense', icon: 'fa-film' },
        { name: 'Kesehatan', type: 'expense', icon: 'fa-heartbeat' },
        { name: 'Pendidikan', type: 'expense', icon: 'fa-graduation-cap' },
        { name: 'Pengeluaran Lain', type: 'expense', icon: 'fa-ellipsis-h' }
      ]);
      console.log('[DB] Default categories seeded');
    }

    // Seed default accounts
    const accCount = await db.accounts.count();
    if (accCount === 0) {
      await db.accounts.bulkAdd([
        { name: 'Kas', type: 'cash', icon: 'fa-wallet' },
        { name: 'Bank BCA', type: 'bank', icon: 'fa-university' },
        { name: 'Bank Mandiri', type: 'bank', icon: 'fa-university' },
        { name: 'GoPay', type: 'e-wallet', icon: 'fa-mobile-alt' },
        { name: 'OVO', type: 'e-wallet', icon: 'fa-mobile-alt' },
        { name: 'Dana', type: 'e-wallet', icon: 'fa-mobile-alt' }
      ]);
      console.log('[DB] Default accounts seeded');
    }

    console.log('[DB] Database ready');
  } catch (error) {
    console.error('[DB] Seed error:', error);
  }
}

// ---- CRUD Helpers ----

const DB = {
  // Users
  async getUser(username) {
    return await db.users.where('username').equals(username).first();
  },

  async addUser(userData) {
    return await db.users.add(userData);
  },

  async getAllUsers() {
    return await db.users.toArray();
  },

  // Incomes
  async getIncomes(userId, filters = {}) {
    let collection = db.incomes.where('user_id').equals(userId);
    let results = await collection.toArray();
    return applyDateFilters(results, filters);
  },

  async getAllIncomes(filters = {}) {
    let results = await db.incomes.toArray();
    return applyDateFilters(results, filters);
  },

  async addIncome(data) {
    return await db.incomes.add(data);
  },

  async updateIncome(id, data) {
    return await db.incomes.update(id, data);
  },

  async deleteIncome(id) {
    return await db.incomes.delete(id);
  },

  async getIncomeById(id) {
    return await db.incomes.get(id);
  },

  // Expenses
  async getExpenses(userId, filters = {}) {
    let collection = db.expenses.where('user_id').equals(userId);
    let results = await collection.toArray();
    return applyDateFilters(results, filters);
  },

  async getAllExpenses(filters = {}) {
    let results = await db.expenses.toArray();
    return applyDateFilters(results, filters);
  },

  async addExpense(data) {
    return await db.expenses.add(data);
  },

  async updateExpense(id, data) {
    return await db.expenses.update(id, data);
  },

  async deleteExpense(id) {
    return await db.expenses.delete(id);
  },

  async getExpenseById(id) {
    return await db.expenses.get(id);
  },

  // Categories
  async getCategories(type = null) {
    if (type) {
      return await db.categories.where('type').equals(type).toArray();
    }
    return await db.categories.toArray();
  },

  async addCategory(data) {
    return await db.categories.add(data);
  },

  async updateCategory(id, data) {
    return await db.categories.update(id, data);
  },

  async deleteCategory(id) {
    return await db.categories.delete(id);
  },

  async getCategoryById(id) {
    return await db.categories.get(id);
  },

  // Accounts
  async getAccounts() {
    return await db.accounts.toArray();
  },

  async addAccount(data) {
    return await db.accounts.add(data);
  },

  async updateAccount(id, data) {
    return await db.accounts.update(id, data);
  },

  async deleteAccount(id) {
    return await db.accounts.delete(id);
  },

  async getAccountById(id) {
    return await db.accounts.get(id);
  },

  // Backup & Restore
  async exportAllData() {
    const users = await db.users.toArray();
    const incomes = await db.incomes.toArray();
    const expenses = await db.expenses.toArray();
    const categories = await db.categories.toArray();
    const accounts = await db.accounts.toArray();

    return {
      version: DB_VERSION,
      exportDate: new Date().toISOString(),
      appName: 'FinanceKu',
      data: { users, incomes, expenses, categories, accounts }
    };
  },

  async importAllData(jsonData) {
    if (!jsonData || !jsonData.data) {
      throw new Error('Format data tidak valid');
    }

    const { users, incomes, expenses, categories, accounts } = jsonData.data;

    await db.transaction('rw', [db.users, db.incomes, db.expenses, db.categories, db.accounts], async () => {
      // Clear all existing data
      await db.users.clear();
      await db.incomes.clear();
      await db.expenses.clear();
      await db.categories.clear();
      await db.accounts.clear();

      // Import new data
      if (users && users.length) await db.users.bulkAdd(users);
      if (incomes && incomes.length) await db.incomes.bulkAdd(incomes);
      if (expenses && expenses.length) await db.expenses.bulkAdd(expenses);
      if (categories && categories.length) await db.categories.bulkAdd(categories);
      if (accounts && accounts.length) await db.accounts.bulkAdd(accounts);
    });

    return true;
  },

  // Dashboard aggregation
  async getDashboardData(userId, year, month) {
    const incomes = await this.getIncomes(userId);
    const expenses = await this.getExpenses(userId);

    const totalIncome = incomes.reduce((sum, i) => sum + Number(i.nominal), 0);
    const totalExpense = expenses.reduce((sum, e) => sum + Number(e.nominal), 0);
    const balance = totalIncome - totalExpense;

    // Monthly breakdown for charts
    const monthlyIncome = {};
    const monthlyExpense = {};
    
    // Category Breakdown & Advanced Analytics
    const expensesByCategory = {};
    const currentYearExpenses = [];

    incomes.forEach(item => {
      const d = new Date(item.tanggal);
      const itemYear = d.getFullYear();
      const itemMonth = d.getMonth();
      if (year && itemYear !== year) return;
      const key = `${itemYear}-${String(itemMonth + 1).padStart(2, '0')}`;
      monthlyIncome[key] = (monthlyIncome[key] || 0) + Number(item.nominal);
    });

    expenses.forEach(item => {
      const d = new Date(item.tanggal);
      const itemYear = d.getFullYear();
      const itemMonth = d.getMonth();
      if (year && itemYear !== year) return;
      
      const nominal = Number(item.nominal);
      const key = `${itemYear}-${String(itemMonth + 1).padStart(2, '0')}`;
      monthlyExpense[key] = (monthlyExpense[key] || 0) + nominal;
      
      // Group by category
      if (item.kategori) {
        expensesByCategory[item.kategori] = (expensesByCategory[item.kategori] || 0) + nominal;
      }
      
      // Store to get top 5 later
      currentYearExpenses.push(item);
    });
    
    // Get top 5 expenses by nominal
    currentYearExpenses.sort((a, b) => Number(b.nominal) - Number(a.nominal));
    const topExpenses = currentYearExpenses.slice(0, 5);

    return { totalIncome, totalExpense, balance, monthlyIncome, monthlyExpense, expensesByCategory, topExpenses };
  }
};

// ---- Date Filter Helper ----
function applyDateFilters(results, filters) {
  if (!filters) return results;

  let filtered = results;

  if (filters.startDate) {
    filtered = filtered.filter(r => r.tanggal >= filters.startDate);
  }
  if (filters.endDate) {
    filtered = filtered.filter(r => r.tanggal <= filters.endDate);
  }
  if (filters.month !== undefined && filters.month !== '' && filters.year) {
    filtered = filtered.filter(r => {
      const d = new Date(r.tanggal);
      return d.getMonth() === Number(filters.month) && d.getFullYear() === Number(filters.year);
    });
  } else if (filters.year) {
    filtered = filtered.filter(r => {
      const d = new Date(r.tanggal);
      return d.getFullYear() === Number(filters.year);
    });
  }

  // Sort by date descending
  filtered.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  return filtered;
}
