import test from 'node:test';
import assert from 'node:assert/strict';
import { freshState, transition, workdays, restoreState } from '../model.mjs';

test('leave counts weekdays, rejects reversed dates and invalid dates', () => {
  assert.equal(workdays('2026-11-13', '2026-11-16'), 2);
  assert.throws(() => workdays('2026-11-18', '2026-11-16'));
  assert.throws(() => workdays('2026-02-30', '2026-03-01'));
});
test('leave is reserved on submission, only deducted once after manager approval', () => {
  const original = freshState();
  const submitted = transition(original, { type: 'leave', role: 'employee', start: '2026-11-16', end: '2026-11-17', reason: 'Việc gia đình' });
  assert.equal(submitted.leaveBalance, original.leaveBalance);
  const request = submitted.requests[0];
  assert.equal(request.days, 2);
  assert.throws(() => transition(submitted, { type: 'request-step', role: 'employee', id: request.id }));
  const approved = transition(submitted, { type: 'request-step', role: 'manager', id: request.id });
  assert.equal(approved.leaveBalance, original.leaveBalance - 2);
  assert.throws(() => transition(approved, { type: 'request-step', role: 'manager', id: request.id }));
  assert.equal(original.requests.length + 1, submitted.requests.length);
});
test('leave rejects overlapping requests and insufficient remaining balance', () => {
  const s = transition(freshState(), { type: 'leave', role: 'employee', start: '2026-11-16', end: '2026-11-17', reason: 'Nghỉ phép' });
  assert.throws(() => transition(s, { type: 'leave', role: 'employee', start: '2026-11-17', end: '2026-11-18', reason: 'Trùng lịch' }));
  assert.throws(() => transition(s, { type: 'leave', role: 'employee', start: '2026-11-18', end: '2026-12-10', reason: 'Quá số dư' }));
});
test('rejection requires a reason and cannot approve the same request later', () => {
  const s = freshState();
  assert.throws(() => transition(s, { type: 'request-reject', role: 'manager', id: 'RQ-1042', reason: '' }));
  const next = transition(s, { type: 'request-reject', role: 'manager', id: 'RQ-1042', reason: 'Cần bổ sung thông số' });
  assert.equal(next.requests.find(x => x.id === 'RQ-1042').status, 'rejected');
  assert.throws(() => transition(next, { type: 'request-step', role: 'manager', id: 'RQ-1042' }));
});
test('skill inference needs employee consent then manager verification', () => {
  const s = freshState();
  assert.throws(() => transition(s, { type: 'skill-verify', role: 'manager', id: 'sk-4' }));
  const accepted = transition(s, { type: 'skill-accept', role: 'employee', id: 'sk-4' });
  assert.equal(accepted.skills.find(x => x.id === 'sk-4').status, 'pending');
  const verified = transition(accepted, { type: 'skill-verify', role: 'manager', id: 'sk-4' });
  assert.equal(verified.skills.find(x => x.id === 'sk-4').status, 'verified');
});
test('staffing cannot skip employee consent or manager release before BU approval', () => {
  let s = transition(freshState(), { type: 'staff-propose', role: 'hrbp', id: 'EMP-028' });
  assert.throws(() => transition(s, { type: 'staff-next', role: 'bu' }));
  s = transition(s, { type: 'staff-next', role: 'employee' });
  s = transition(s, { type: 'staff-next', role: 'manager' });
  s = transition(s, { type: 'staff-next', role: 'bu' });
  assert.equal(s.staffing.stage, 3);
  assert.equal(s.staffing.allocated, false);
  s = transition(s, { type: 'staff-next', role: 'hrbp' });
  assert.equal(s.staffing.allocated, true);
});
test('staffing excludes unavailable people and preserves refusal without reallocating', () => {
  assert.throws(() => transition(freshState(), { type: 'staff-propose', role: 'hrbp', id: 'EMP-057' }));
  const s = transition(freshState(), { type: 'staff-propose', role: 'hrbp', id: 'EMP-028' });
  const refused = transition(s, { type: 'staff-decline', role: 'employee', reason: 'Chưa phù hợp nguyện vọng' });
  assert.equal(refused.staffing.status, 'declined');
  assert.equal(refused.staffing.allocated, false);
});
test('attendance corrections require HR vận hành and evidence, with an audit event', () => {
  const s = freshState();
  assert.throws(() => transition(s, { type: 'attendance-approve', role: 'hrbp', id: 'AT-031' }));
  assert.throws(() => transition(s, { type: 'attendance-approve', role: 'ops', id: 'AT-032' }));
  const next = transition(s, { type: 'attendance-approve', role: 'ops', id: 'AT-031' });
  assert.equal(next.attendance.find(x => x.id === 'AT-031').status, 'done');
  assert.equal(next.audit.length, s.audit.length + 1);
});
test('offboarding cannot close until every checklist item is complete', () => {
  assert.throws(() => transition(freshState(), { type: 'offboard-close', role: 'ops' }));
  let s = freshState();
  for (const item of s.offboarding.items.filter(x => !x.done)) s = transition(s, { type: 'offboard-check', role: item.role, id: item.id });
  assert.equal(transition(s, { type: 'offboard-close', role: 'ops' }).offboarding.closed, true);
});
test('saved-state version and shape checks reject incompatible fixtures', () => {
  assert.equal(restoreState('{broken').version, freshState().version);
  assert.deepEqual(restoreState(JSON.stringify({ version: 999 })), freshState());
  assert.deepEqual(restoreState(JSON.stringify({ version: 1, requests: [] })), freshState());
  const s = transition(freshState(), { type: 'interest', role: 'employee', id: 'job-1' });
  assert.deepEqual(restoreState(JSON.stringify(s)), s);
});

test('restructuring redeploys first; layoff needs legal review, approval, then offboarding', () => {
  const s0 = freshState();
  assert.throws(() => transition(s0, { type: 'rs-review', role: 'hrbp', id: 'RS-1', checked: 'on' }), /không còn phương án/);
  assert.throws(() => transition(s0, { type: 'rs-review', role: 'hrbp', id: 'RS-3' }), /pháp chế/);
  const reviewed = transition(s0, { type: 'rs-review', role: 'hrbp', id: 'RS-3', checked: 'on' });
  assert.throws(() => transition(reviewed, { type: 'rs-approve', role: 'hrbp', id: 'RS-3' }));
  assert.throws(() => transition(reviewed, { type: 'rs-approve', role: 'bu', id: 'RS-3' }), /những người còn lại/);
  const placed = transition(transition(reviewed, { type: 'rs-redeploy', role: 'hrbp', id: 'RS-1' }), { type: 'rs-reskill', role: 'hrbp', id: 'RS-2' });
  assert.throws(() => transition(placed, { type: 'rs-exit', role: 'ops', id: 'RS-3' }), /phê duyệt/);
  const approved = transition(placed, { type: 'rs-approve', role: 'bu', id: 'RS-3' });
  const done = transition(approved, { type: 'rs-exit', role: 'ops', id: 'RS-3' });
  assert.deepEqual(done.restructure.map(x => x.status), ['redeployed', 'reskill', 'exit']);
  const returned = transition(reviewed, { type: 'rs-return', role: 'bu', id: 'RS-3', reason: 'Xem thêm khối khác' });
  assert.equal(returned.restructure[2].status, 'open');
});
