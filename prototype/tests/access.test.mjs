import test from 'node:test';
import assert from 'node:assert/strict';
import { access, canAccess, homeOf, nav, roles, scopeRequests, initial } from '../data.mjs';
import { scenarios } from '../tour.mjs';

test('every role has a home screen and only known screens', () => {
  const known = new Set(nav.map(n => n.id));
  for (const role of Object.keys(roles)) {
    assert.ok(access[role]?.length, role);
    assert.ok(access[role].every(r => known.has(r)), role);
    assert.equal(homeOf(role), access[role][0]);
  }
});

test('sensitive screens are limited by role', () => {
  assert.equal(canAccess('candidate', 'attendance'), false);
  assert.equal(canAccess('employee', 'workforce'), false);
  assert.equal(canAccess('employee', 'recruitment'), false);
  assert.equal(canAccess('ops', 'attendance'), true);
  assert.deepEqual(access.candidate, ['assistant']);
});

test('every guided tour step lands on a screen its role can open', () => {
  for (const sc of scenarios) for (const st of sc.steps) assert.ok(canAccess(st.role, st.route), `${sc.id}: ${st.role} → ${st.route}`);
});

test('requests are scoped by role', () => {
  const own = scopeRequests(initial.requests, 'employee');
  assert.ok(own.length && own.every(r => r.person === roles.employee.full));
  assert.ok(scopeRequests(initial.requests, 'manager').every(r => r.stages.some(t => t.role === 'manager')));
  assert.equal(scopeRequests(initial.requests, 'ops').length, initial.requests.length);
});
