import React, { useState } from 'react';
import {
  Wallet,
  Plus,
  Utensils,
  Bus,
  BookMarked,
  Gamepad2,
  Trash2,
  ArrowUpRight,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  Edit2,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExpenseCategory } from '../types';

const CATEGORIES: { key: ExpenseCategory; label: string; icon: React.ElementType; color: string }[] = [
  { key: 'Food/Canteen', label: 'Canteen', icon: Utensils, color: '#8B4513' },
  { key: 'Travel', label: 'Travel', icon: Bus, color: '#A39360' },
  { key: 'Tech/Books', label: 'Books & Tech', icon: BookMarked, color: '#8B4513' },
  { key: 'Impulse/Fun', label: 'Impulse / Fun', icon: Gamepad2, color: '#C2B280' },
];

export const BudgetTab: React.FC = () => {
  const {
    expenses,
    monthlyBudget,
    addExpense,
    deleteExpense,
    updateMonthlyBudget,
    progress,
  } = useApp();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food/Canteen');
  const [note, setNote] = useState('');
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudgetInput, setNewBudgetInput] = useState(monthlyBudget.toString());

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = Math.max(0, monthlyBudget - totalSpent);
  const spentPct = Math.min(100, Math.round((totalSpent / monthlyBudget) * 100));

  const impulseSpent = expenses
    .filter((e) => e.category === 'Impulse/Fun')
    .reduce((sum, e) => sum + e.amount, 0);

  const canteenSpent = expenses
    .filter((e) => e.category === 'Food/Canteen')
    .reduce((sum, e) => sum + e.amount, 0);

  const handleLogExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(amount, 10);
    if (!val || val <= 0) return;
    addExpense(val, category, note);
    setAmount('');
    setNote('');
  };

  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(newBudgetInput, 10);
    if (val && val >= 500) {
      updateMonthlyBudget(val);
      setIsEditingBudget(false);
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-coffee flex items-center gap-1.5">
            <Wallet className="text-saddle" size={18} />
            Student Budget Tracker
          </h2>
          <p className="text-[11px] text-coffee-muted">
            Track student UPI expenses & protect your monthly savings
          </p>
        </div>

        <button
          onClick={() => {
            setNewBudgetInput(monthlyBudget.toString());
            setIsEditingBudget(!isEditingBudget);
          }}
          className="p-2 rounded-xl border border-edge bg-surface text-coffee hover:text-saddle transition text-xs font-semibold flex items-center gap-1"
        >
          <Edit2 size={13} />
          <span>Limit</span>
        </button>
      </div>

      {/* Edit Budget Form */}
      {isEditingBudget && (
        <form onSubmit={handleUpdateBudget} className="p-3.5 rounded-2xl border border-edge bg-surface shadow-xs space-y-2 animate-scaleUp">
          <p className="text-xs font-bold text-coffee">Set Monthly Budget Target</p>
          <div className="flex gap-2">
            <input
              type="number"
              min="500"
              step="100"
              value={newBudgetInput}
              onChange={(e) => setNewBudgetInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl border border-edge bg-surface2 text-xs text-coffee focus:outline-none focus:border-saddle"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-xl bg-saddle text-white text-xs font-semibold shadow-xs hover:bg-saddle-hover transition"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Budget Card Overview */}
      <div className="p-4 rounded-2xl border border-edge bg-surface shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] font-semibold text-coffee-muted uppercase tracking-wider">
            Monthly Pocket Ledger
          </span>
          <span className="text-saddle font-bold text-[11px]">
            {spentPct}% Used
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold text-coffee">₹{remaining.toLocaleString()}</span>
            <span className="text-[11px] text-coffee-muted ml-1.5">left of ₹{monthlyBudget.toLocaleString()}</span>
          </div>

          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sand/30 border border-edge2 text-saddle flex items-center gap-1">
            <ShieldCheck size={11} /> On Track
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-sand/30 overflow-hidden border border-edge">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              spentPct > 90 ? 'bg-red-600' : spentPct > 70 ? 'bg-amber-600' : 'bg-saddle'
            }`}
            style={{ width: `${spentPct}%` }}
          />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2.5 rounded-xl border border-edge bg-surface2">
            <span className="text-[10px] text-coffee-muted font-medium block">Canteen Spent</span>
            <span className="text-sm font-bold text-coffee mt-0.5 block">₹{canteenSpent}</span>
          </div>

          <div className="p-2.5 rounded-xl border border-edge bg-surface2">
            <span className="text-[10px] text-coffee-muted font-medium block">Impulse / Fun</span>
            <span className="text-sm font-bold text-saddle mt-0.5 block">₹{impulseSpent}</span>
          </div>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="p-4 rounded-2xl border border-edge bg-surface shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-coffee flex items-center justify-between">
          <span>Log Student Expense</span>
          <span className="text-[10px] font-semibold text-saddle flex items-center gap-0.5">
            <Sparkles size={11} /> +5 XP Reward
          </span>
        </h3>

        <form onSubmit={handleLogExpense} className="space-y-3">
          <div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-coffee-muted">₹</span>
              <input
                type="number"
                min="1"
                required
                placeholder="Amount (e.g. 120)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-7 pr-3 py-2 rounded-xl border border-edge bg-surface2 text-xs font-semibold text-coffee placeholder-coffee-muted/50 focus:outline-none focus:border-saddle"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="grid grid-cols-2 gap-1.5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.key;
              return (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left border text-xs font-semibold transition ${
                    isSelected
                      ? 'border-saddle bg-sand/30 text-saddle shadow-xs'
                      : 'border-edge bg-surface2 text-coffee-muted hover:text-coffee'
                  }`}
                >
                  <Icon size={14} className={isSelected ? 'text-saddle' : 'text-coffee-muted'} />
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div>
            <input
              type="text"
              placeholder="Note (e.g. Canteen lunch & chai)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-edge bg-surface2 text-xs text-coffee placeholder-coffee-muted/50 focus:outline-none focus:border-saddle"
            />
          </div>

          <button
            type="submit"
            disabled={!amount}
            className="w-full py-2.5 rounded-xl bg-saddle hover:bg-saddle-hover disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Plus size={15} />
            Log UPI Expense
          </button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-coffee">Recent Expenses ({expenses.length})</h3>

        {expenses.length === 0 ? (
          <div className="p-6 rounded-2xl border border-edge bg-surface text-center">
            <p className="text-xs text-coffee-muted">No expenses recorded this month yet.</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {expenses.map((item) => {
              const catInfo = CATEGORIES.find((c) => c.key === item.category) || CATEGORIES[0];
              const Icon = catInfo.icon;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-edge bg-surface shadow-xs text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="h-8 w-8 rounded-lg bg-sand/30 text-saddle flex items-center justify-center shrink-0">
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-coffee truncate">{item.note}</p>
                      <p className="text-[10px] text-coffee-muted">
                        {item.category} • {item.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="font-bold text-coffee tabular-nums">
                      -₹{item.amount}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteExpense(item.id)}
                      title="Delete expense"
                      className="p-1 text-coffee-muted hover:text-red-600 transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
