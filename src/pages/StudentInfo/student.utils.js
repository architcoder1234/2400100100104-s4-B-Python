// ── student.utils.js ────────────────────────────────────────
// Logic for computing a student's grade status from their marks.
// Keep business logic out of the component.
// ─────────────────────────────────────────────────────────────

/** Returns grade label based on marks (0-100) */
export function getStatus(marks) {
  if (marks >= 90) return 'Excellence';
  if (marks >= 75) return 'Distinction';
  if (marks >= 60) return 'First Class';
  if (marks >= 45) return 'Second Class';
  return 'Passing';
}

/** Returns Tailwind color classes for a status badge */
export function getStatusColors(marks) {
  if (marks > 90) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
  if (marks > 80) return 'bg-indigo-500/10  text-indigo-500  border-indigo-500/20';
  return           'bg-amber-500/10  text-amber-500  border-amber-500/20';
}

export const DEFAULT_STUDENTS = [
  { id: 101, name: 'Aswin Gupta',   branch: 'Computer Science',       marks: 88, status: 'Distinction' },
  { id: 102, name: 'Surbhi Sharma', branch: 'Information Technology', marks: 92, status: 'Excellence'  },
  { id: 103, name: 'Rahul Varma',   branch: 'Electrical Engineering', marks: 74, status: 'First Class' },
  { id: 104, name: 'Priya Patel',   branch: 'Mechanical Engineering', marks: 81, status: 'First Class' },
  { id: 105, name: 'Vikram Singh',  branch: 'Civil Engineering',      marks: 68, status: 'Second Class'},
];
