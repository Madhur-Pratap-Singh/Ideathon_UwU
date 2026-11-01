import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, CheckSquare, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TaskDifficulty } from '../types';

export const TaskList: React.FC = () => {
  const { tasks, toggleTask, addTask, deleteTask } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterSubject, setFilterSubject] = useState<string>('all');

  // Form states
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>('medium');

  const subjects = Array.from(new Set(tasks.map((t) => t.subject)));

  const filteredTasks = tasks.filter((t) => {
    if (filterSubject === 'all') return true;
    return t.subject === filterSubject;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;
    addTask(title.trim(), subject.trim(), difficulty);
    setTitle('');
    setSubject('');
    setDifficulty('medium');
    setIsModalOpen(false);
  };

  return (
    <section className="space-y-3">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-coffee flex items-center gap-1.5">
            <CheckSquare className="text-saddle" size={17} />
            Study Goals
          </h2>
          <p className="text-[11px] text-coffee-muted">
            {completedCount} of {tasks.length} completed
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-saddle hover:bg-saddle-hover text-white text-xs font-semibold shadow-sm transition active:scale-95"
        >
          <Plus size={14} />
          New Goal
        </button>
      </div>

      {/* Subject Filter Chips */}
      {subjects.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
          <button
            onClick={() => setFilterSubject('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition whitespace-nowrap ${
              filterSubject === 'all'
                ? 'bg-saddle text-white shadow-xs'
                : 'bg-surface border border-edge text-coffee-muted hover:text-coffee'
            }`}
          >
            All
          </button>
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setFilterSubject(s)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition whitespace-nowrap ${
                filterSubject === s
                  ? 'bg-saddle text-white shadow-xs'
                  : 'bg-surface border border-edge text-coffee-muted hover:text-coffee'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Task List Items */}
      {filteredTasks.length === 0 ? (
        <div className="p-6 rounded-2xl border border-edge bg-surface text-center">
          <p className="text-xs font-semibold text-coffee">No study tasks yet</p>
          <p className="text-[11px] text-coffee-muted mt-0.5">
            Tap "New Goal" to organize your study priorities.
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`group flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150 select-none ${
                task.completed
                  ? 'border-edge/60 bg-sand-subtle/30 opacity-60'
                  : 'border-edge bg-surface hover:border-saddle/40 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <button
                  type="button"
                  className="shrink-0 text-coffee-muted group-hover:text-saddle transition"
                >
                  {task.completed ? (
                    <CheckCircle2 size={18} className="text-saddle" />
                  ) : (
                    <Circle size={18} className="text-coffee-muted/70" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs font-semibold text-coffee leading-snug truncate ${
                      task.completed ? 'line-through text-coffee-muted' : ''
                    }`}
                  >
                    {task.title}
                  </p>

                  <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-coffee-muted">
                    <span>{task.subject}</span>
                    <span>•</span>
                    <span className="capitalize">{task.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Right side: XP Reward + Delete */}
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span
                  className={`flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-semibold tabular-nums border ${
                    task.completed
                      ? 'bg-olive-subtle text-coffee border-olive/30'
                      : 'bg-sand/30 text-saddle border-edge2'
                  }`}
                >
                  <Sparkles size={10} />
                  +{task.xpReward} XP
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                  title="Delete goal"
                  className="p-1 text-coffee-muted/60 hover:text-red-600 transition"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm p-5 rounded-2xl border border-edge bg-surface shadow-xl animate-scaleUp">
            <h3 className="text-sm font-bold text-coffee mb-1">New Study Goal</h3>
            <p className="text-[11px] text-coffee-muted mb-4">
              Add a target to stay focused and earn XP.
            </p>

            <form onSubmit={handleAddTask} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-coffee mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete 4 practice problems"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-edge bg-surface2 text-xs text-coffee placeholder-coffee-muted/50 focus:outline-none focus:border-saddle"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-coffee mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Computer Science"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-edge bg-surface2 text-xs text-coffee placeholder-coffee-muted/50 focus:outline-none focus:border-saddle"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-coffee mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as TaskDifficulty)}
                  className="w-full px-2.5 py-2 rounded-xl border border-edge bg-surface2 text-xs text-coffee focus:outline-none focus:border-saddle cursor-pointer"
                >
                  <option value="easy">Easy (+20 XP)</option>
                  <option value="medium">Medium (+50 XP)</option>
                  <option value="hard">Hard (+100 XP)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl border border-edge bg-surface2 text-xs font-medium text-coffee hover:bg-sand/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-saddle hover:bg-saddle-hover text-xs font-semibold text-white shadow-sm transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
