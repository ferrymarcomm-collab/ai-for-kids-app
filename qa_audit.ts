import { JILID_LIST, MODULES_DATA, INITIAL_PORTFOLIO_ITEMS, AI_SAFETY_PRINCIPLES } from '../src/data/curriculum';

console.log('=== STARTING AUTOMATED QA AUDIT ===\n');

let errorCount = 0;
function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error('❌ FAIL:', msg);
    errorCount++;
  } else {
    console.log('✅ PASS:', msg);
  }
}

// 1. JILID AUDIT
console.log('\n--- 1. JILID AUDIT ---');
assert(JILID_LIST.length === 8, `JILID_LIST length should be 8, got ${JILID_LIST.length}`);
JILID_LIST.forEach((j, index) => {
  const expectedId = index + 1;
  assert(j.id === expectedId, `Jilid ${j.id} ID matches expected ${expectedId}`);
  assert(j.moduleIds.length === 5, `Jilid ${j.id} has exactly 5 modules, got ${j.moduleIds.length}`);
  assert(!!j.badgeName && !!j.badgeIcon, `Jilid ${j.id} has badgeName and badgeIcon`);
});

// 2. MODULES AUDIT
console.log('\n--- 2. MODULES AUDIT ---');
const moduleKeys = Object.keys(MODULES_DATA).map(Number);
assert(moduleKeys.length === 40, `MODULES_DATA has exactly 40 modules, got ${moduleKeys.length}`);

const activityIds = new Set<string>();
const questionIds = new Set<string>();
let totalActivities = 0;
let totalQuizQuestions = 0;
let totalMultipleChoice = 0;
let totalProblemSolving = 0;

for (let m = 1; m <= 40; m++) {
  const mod = MODULES_DATA[m];
  assert(!!mod, `Module ${m} exists`);
  if (!mod) continue;

  assert(mod.id === m, `Module ${m} id is correct`);
  const expectedJilidId = Math.ceil(m / 5);
  assert(mod.jilidId === expectedJilidId, `Module ${m} jilidId is ${expectedJilidId}, got ${mod.jilidId}`);

  // Activities check
  assert(!!mod.activity1 && !!mod.activity2, `Module ${m} has both activity1 and activity2`);
  if (mod.activity1) {
    totalActivities++;
    assert(!activityIds.has(mod.activity1.id), `Activity ID ${mod.activity1.id} is unique`);
    activityIds.add(mod.activity1.id);
    assert(mod.activity1.steps.length > 0, `Module ${m} activity 1 has steps`);
  }
  if (mod.activity2) {
    totalActivities++;
    assert(!activityIds.has(mod.activity2.id), `Activity ID ${mod.activity2.id} is unique`);
    activityIds.add(mod.activity2.id);
    assert(mod.activity2.steps.length > 0, `Module ${m} activity 2 has steps`);
  }

  // Quiz check
  assert(mod.quizQuestions && mod.quizQuestions.length === 3, `Module ${m} has exactly 3 quiz questions, got ${mod.quizQuestions?.length}`);
  if (mod.quizQuestions) {
    mod.quizQuestions.forEach((q, qIndex) => {
      totalQuizQuestions++;
      assert(!questionIds.has(q.id), `Question ID ${q.id} in Module ${m} is unique`);
      questionIds.add(q.id);

      if (q.type === 'multiple-choice') totalMultipleChoice++;
      else if (q.type === 'problem-solving') totalProblemSolving++;
      else {
        assert(false, `Question ${q.id} has invalid type: ${q.type}`);
      }

      assert(q.options.length >= 2, `Question ${q.id} has >= 2 options (got ${q.options.length})`);
      assert(q.correctIndex >= 0 && q.correctIndex < q.options.length, `Question ${q.id} correctIndex ${q.correctIndex} is within options length ${q.options.length}`);
      assert(!!q.explanation && q.explanation.length > 0, `Question ${q.id} has explanation`);
    });
  }
}

assert(totalActivities === 80, `Total activities should be 80, got ${totalActivities}`);
assert(totalQuizQuestions === 120, `Total quiz questions should be 120, got ${totalQuizQuestions}`);
console.log(`Quiz Question Breakdown: ${totalMultipleChoice} Multiple Choice, ${totalProblemSolving} Problem Solving`);
assert(totalMultipleChoice === 80, `Total Multiple Choice should be 80, got ${totalMultipleChoice}`);
assert(totalProblemSolving === 40, `Total Problem Solving should be 40, got ${totalProblemSolving}`);

// 3. PORTFOLIO AUDIT
console.log('\n--- 3. PORTFOLIO AUDIT ---');
assert(INITIAL_PORTFOLIO_ITEMS.length === 40, `INITIAL_PORTFOLIO_ITEMS length should be 40, got ${INITIAL_PORTFOLIO_ITEMS.length}`);
const portfolioModuleIds = new Set<number>();
INITIAL_PORTFOLIO_ITEMS.forEach(p => {
  portfolioModuleIds.add(p.moduleId);
  const expectedJilid = Math.ceil(p.moduleId / 5);
  assert(p.jilidId === expectedJilid, `Portfolio ${p.id} for module ${p.moduleId} has correct jilidId ${p.jilidId}`);
  assert(p.status === 'Menunggu Validasi', `Portfolio ${p.id} starts with 'Menunggu Validasi', got ${p.status}`);
});
assert(portfolioModuleIds.size === 40, `All 40 modules are represented in initial portfolios`);

// 4. AI SAFETY AUDIT
console.log('\n--- 4. AI SAFETY AUDIT ---');
assert(AI_SAFETY_PRINCIPLES.length === 10, `AI_SAFETY_PRINCIPLES length should be 10, got ${AI_SAFETY_PRINCIPLES.length}`);
AI_SAFETY_PRINCIPLES.forEach((r, idx) => {
  assert(r.number === idx + 1, `Rule number is ${idx + 1}, got ${r.number}`);
  assert(!!r.title && !!r.description, `Rule ${r.number} has title and description`);
});

console.log('\n=== AUDIT FINISHED ===');
console.log(`Total Errors Found: ${errorCount}`);
process.exit(errorCount > 0 ? 1 : 0);
