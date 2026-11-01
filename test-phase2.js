// Autonomous test script for Phase 2 Focus Chamber and Boss Battles calculations

import assert from 'node:assert';

// 1. Test XP formula: 5 XP per 5 completed minutes
function calculateSessionXp(completedMinutes) {
  return Math.floor(completedMinutes / 5) * 5;
}

assert.strictEqual(calculateSessionXp(0), 0, '0 min = 0 XP');
assert.strictEqual(calculateSessionXp(4), 0, '4 min = 0 XP');
assert.strictEqual(calculateSessionXp(5), 5, '5 min = 5 XP');
assert.strictEqual(calculateSessionXp(14), 10, '14 min = 10 XP');
assert.strictEqual(calculateSessionXp(15), 15, '15 min = 15 XP');
assert.strictEqual(calculateSessionXp(25), 25, '25 min = exactly 25 XP');
assert.strictEqual(calculateSessionXp(50), 50, '50 min = exactly 50 XP');
console.log('✓ Test 1 Passed: XP formula strictly obeys 5 XP per 5 completed minutes.');

// 2. Test Boss Damage formula: 10 HP per 5 completed minutes
function calculateSessionDamage(completedMinutes) {
  return Math.floor(completedMinutes / 5) * 10;
}

assert.strictEqual(calculateSessionDamage(25), 50, '25 min = 50 HP damage');
assert.strictEqual(calculateSessionDamage(15), 30, '15 min = 30 HP damage');
assert.strictEqual(calculateSessionDamage(50), 100, '50 min = 100 HP damage');
console.log('✓ Test 2 Passed: Boss damage calculation is consistent.');

// 3. Test Level and XP curve
function getXpRequiredForLevel(level) {
  return Math.floor(100 * Math.pow(1.22, level - 1));
}

assert.strictEqual(getXpRequiredForLevel(1), 100);
assert.strictEqual(getXpRequiredForLevel(2), 122);
assert.strictEqual(getXpRequiredForLevel(3), 148);
console.log('✓ Test 3 Passed: Level requirements curve is smooth and deterministic.');

// 4. Test Boss Readiness Algorithm (considering effort vs elapsed days, not just HP)
function calculateBossReadiness(boss) {
  const now = new Date();
  const created = new Date(boss.createdAt || now);
  const exam = new Date(boss.examDate);

  const totalTimeMs = Math.max(1000 * 60 * 60 * 24, exam.getTime() - created.getTime());
  const elapsedTimeMs = Math.max(0, now.getTime() - created.getTime());

  const actualEffort = boss.completedSessions + boss.completedTasks * 0.5;
  const targetEffort = Math.max(1, boss.plannedSessions || 10);

  const timeRatio = Math.min(1, elapsedTimeMs / totalTimeMs);
  const expectedEffort = targetEffort * timeRatio;

  const scorePct = Math.min(100, Math.round((actualEffort / targetEffort) * 100));

  if (boss.currentHp <= 0 || scorePct >= 100) {
    return { status: 'exam_ready', scorePct: Math.max(scorePct, 100) };
  }

  if (actualEffort >= expectedEffort * 1.15 || (expectedEffort <= 1 && actualEffort >= 1)) {
    return { status: 'ahead', scorePct };
  }

  if (actualEffort >= expectedEffort * 0.8) {
    return { status: 'on_track', scorePct };
  }

  return { status: 'falling_behind', scorePct };
}

// Case A: Defeated boss
const readyBoss = {
  currentHp: 0,
  totalHp: 500,
  plannedSessions: 10,
  completedSessions: 8,
  completedTasks: 4,
  createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  examDate: new Date(Date.now() + 5 * 86400000).toISOString(),
};
assert.strictEqual(calculateBossReadiness(readyBoss).status, 'exam_ready', 'Boss with 0 HP is Exam Ready');

// Case B: Ahead of schedule
const aheadBoss = {
  currentHp: 200,
  totalHp: 500,
  plannedSessions: 10,
  completedSessions: 5, // 5 sessions done halfway through
  completedTasks: 4, // 2 effort = 7 total effort vs expected 5
  createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  examDate: new Date(Date.now() + 5 * 86400000).toISOString(),
};
assert.strictEqual(calculateBossReadiness(aheadBoss).status, 'ahead', 'Boss with high effort is Ahead');

// Case C: Falling behind
const behindBoss = {
  currentHp: 480,
  totalHp: 500,
  plannedSessions: 10,
  completedSessions: 0,
  completedTasks: 0,
  createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  examDate: new Date(Date.now() + 2 * 86400000).toISOString(),
};
assert.strictEqual(calculateBossReadiness(behindBoss).status, 'falling_behind', 'No effort near deadline is Falling Behind');
console.log('✓ Test 4 Passed: Boss readiness correctly reflects actual effort vs schedule.');

// 5. Test Idempotent XP & Session Handling
const processedSessionIds = new Set();
function recordSession(id, minutes) {
  if (processedSessionIds.has(id)) {
    return { duplicate: true, xp: 0 };
  }
  processedSessionIds.add(id);
  return { duplicate: false, xp: calculateSessionXp(minutes) };
}

const s1 = recordSession('sess-101', 25);
assert.strictEqual(s1.duplicate, false);
assert.strictEqual(s1.xp, 25);

const s1Repeat = recordSession('sess-101', 25);
assert.strictEqual(s1Repeat.duplicate, true, 'Repeat session id is blocked');
assert.strictEqual(s1Repeat.xp, 0, 'No double XP awarded on duplicate');
console.log('✓ Test 5 Passed: Idempotency prevents duplicate session processing.');

console.log('\nALL 5 AUTOMATED TESTS COMPLETED SUCCESSFULLY! ✨');
