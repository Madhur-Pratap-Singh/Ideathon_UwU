import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  FileText,
  Dumbbell,
  ExternalLink,
  Check,
  Plus,
  RefreshCw,
  Clock,
  Sparkles,
  X,
  Youtube,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ResourceType, LearnResource } from '../types';
import { generateAllResources } from '../lib/storage';

const TYPE_FILTERS: { id: ResourceType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'video', label: 'Videos' },
  { id: 'article', label: 'Articles' },
  { id: 'course', label: 'Courses' },
  { id: 'exercise', label: 'Practice' },
];

const TYPE_ICONS: Record<ResourceType, React.ElementType> = {
  video: Play,
  article: FileText,
  course: BookOpen,
  exercise: Dumbbell,
};

export const LearnTab: React.FC = () => {
  const {
    topics,
    completedResourceIds,
    completeResource,
    addTopic,
    removeTopic,
  } = useApp();

  const [selectedTopic, setSelectedTopic] = useState<string | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const [newTopicInput, setNewTopicInput] = useState<string>('');
  const [isAddingTopic, setIsAddingTopic] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Generate resources for all active topics
  const allResources: LearnResource[] = generateAllResources(topics);

  const filteredResources = allResources.filter((res) => {
    const matchesTopic = selectedTopic === 'all' || res.topic.toLowerCase() === selectedTopic.toLowerCase();
    const matchesType = selectedType === 'all' || res.type === selectedType;
    return matchesTopic && matchesType;
  });

  const completedCount = allResources.filter((r) => completedResourceIds.includes(r.id)).length;

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicInput.trim()) return;
    addTopic(newTopicInput.trim());
    setSelectedTopic(newTopicInput.trim());
    setNewTopicInput('');
    setIsAddingTopic(false);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="space-y-4 animate-fadeIn pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-coffee flex items-center gap-1.5">
            <BookOpen className="text-saddle" size={18} />
            Learn Mode
          </h2>
          <p className="text-[11px] text-coffee-muted">
            Recommended YouTube videos & web sources for your topics
          </p>
        </div>

        <button
          onClick={handleRefresh}
          title="Refresh recommendations"
          className="p-2 rounded-xl border border-edge bg-surface text-coffee hover:text-saddle transition active:scale-95"
        >
          <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-saddle' : ''} />
        </button>
      </div>

      {/* Progress & XP Banner */}
      <div className="p-3.5 rounded-2xl border border-edge bg-surface flex items-center gap-3 shadow-xs">
        <div className="h-10 w-10 rounded-xl bg-sand/30 border border-edge2 flex items-center justify-center text-saddle shrink-0">
          <Sparkles size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-coffee">
            {completedCount} of {allResources.length} resources completed
          </p>
          <p className="text-[10px] text-coffee-muted">
            Earn <span className="font-semibold text-saddle">+15 XP</span> each time you study a recommended source
          </p>
        </div>
      </div>

      {/* Add New Topic & Topic Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-coffee-muted uppercase tracking-wider">
            Study Topics
          </span>
          <button
            onClick={() => setIsAddingTopic(!isAddingTopic)}
            className="text-[11px] font-semibold text-saddle hover:underline flex items-center gap-1"
          >
            <Plus size={13} /> Add Topic
          </button>
        </div>

        {/* Add Topic Input Form */}
        {isAddingTopic && (
          <form onSubmit={handleAddTopic} className="flex gap-1.5 animate-fadeIn">
            <div className="relative flex-1">
              <input
                type="text"
                autoFocus
                placeholder="e.g. Dynamic Programming, Virtual Memory..."
                value={newTopicInput}
                onChange={(e) => setNewTopicInput(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-edge bg-surface text-xs text-coffee placeholder-coffee-muted/50 focus:outline-none focus:border-saddle"
              />
              <Search size={13} className="absolute left-2.5 top-2.5 text-coffee-muted/60" />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-saddle text-white text-xs font-semibold shadow-xs hover:bg-saddle-hover transition"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddingTopic(false)}
              className="p-1.5 rounded-xl border border-edge bg-surface text-coffee-muted hover:text-coffee"
            >
              <X size={14} />
            </button>
          </form>
        )}

        {/* Topic Horizontal Scrollable Pills */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition whitespace-nowrap ${
              selectedTopic === 'all'
                ? 'bg-saddle text-white shadow-xs'
                : 'bg-surface border border-edge text-coffee-muted hover:text-coffee'
            }`}
          >
            All Topics ({topics.length})
          </button>

          {topics.map((t) => (
            <div
              key={t}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition whitespace-nowrap border ${
                selectedTopic.toLowerCase() === t.toLowerCase()
                  ? 'bg-saddle text-white border-saddle shadow-xs'
                  : 'bg-surface border-edge text-coffee-muted hover:text-coffee'
              }`}
            >
              <button
                onClick={() => setSelectedTopic(t)}
                className="focus:outline-none"
              >
                {t}
              </button>
              {topics.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTopic(t);
                    if (selectedTopic.toLowerCase() === t.toLowerCase()) {
                      setSelectedTopic('all');
                    }
                  }}
                  className="hover:opacity-75 ml-0.5"
                  title="Remove topic"
                >
                  <X size={11} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resource Type Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-thin pb-0.5">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedType(f.id)}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition whitespace-nowrap ${
              selectedType === f.id
                ? 'bg-sand/40 border border-edge2 text-saddle'
                : 'bg-surface border border-edge text-coffee-muted hover:text-coffee'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Resource Cards Feed */}
      {filteredResources.length === 0 ? (
        <div className="p-6 rounded-2xl border border-edge bg-surface text-center">
          <BookOpen size={24} className="mx-auto text-coffee-muted/40 mb-1" />
          <p className="text-xs font-semibold text-coffee">No resources found</p>
          <p className="text-[11px] text-coffee-muted mt-0.5">
            Add a study topic above or adjust your filter.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredResources.map((res) => {
            const Icon = TYPE_ICONS[res.type] || BookOpen;
            const isDone = completedResourceIds.includes(res.id);

            return (
              <div
                key={res.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isDone
                    ? 'border-edge/60 bg-sand-subtle/30 opacity-70'
                    : 'border-edge bg-surface shadow-xs hover:border-saddle/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Thumbnail / Icon Badge */}
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      res.type === 'video'
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : res.type === 'exercise'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : res.type === 'course'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-sand/30 text-saddle border-edge2'
                    }`}
                  >
                    {res.source === 'YouTube' ? (
                      <Youtube size={18} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-coffee leading-snug">
                      {res.title}
                    </p>

                    <div className="flex items-center gap-2 mt-1 text-[10px] text-coffee-muted">
                      <span className="font-semibold text-saddle">{res.topic}</span>
                      <span>•</span>
                      <span>{res.source}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Clock size={10} /> {res.time}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-2.5">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-edge bg-surface2 text-[11px] font-semibold text-coffee hover:bg-sand/25 transition"
                      >
                        <ExternalLink size={12} />
                        Open
                      </a>

                      {!isDone ? (
                        <button
                          onClick={() => completeResource(res.id, res.xpReward)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-saddle hover:bg-saddle-hover text-[11px] font-semibold text-white shadow-xs transition active:scale-95"
                        >
                          <Check size={12} />
                          +{res.xpReward} XP
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-olive-subtle border border-olive/30 text-[11px] font-semibold text-coffee">
                          <Check size={12} strokeWidth={2.5} /> Studied
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
