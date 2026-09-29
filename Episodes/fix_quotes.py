#!/usr/bin/env python3
"""Fix remaining nested double quote issues in the dashboard doc generator."""

with open('/sessions/magical-peaceful-mendel/mnt/Episodes/generate_dashboard_doc.py', 'r') as f:
    content = f.read()

fixes = {
    # Line 349: "No Comments View" unescaped
    '\\"Dashboard v2\\" 并带有 "No Comments View"':
    '\\"Dashboard v2\\" 并带有 \\"No Comments View\\"',

    # Line 350: check if "Recent Comments" is escaped
    '移除了 "Recent Comments"（近期评论）':
    '移除了 \\"Recent Comments\\"（近期评论）',

    # Line 351: "Achievements" unescaped? Let me check
    '"Achievements"（成就徽章）模块由双列':
    '\\"Achievements\\"（成就徽章）模块由双列',
}

for old, new in fixes.items():
    if old in content:
        content = content.replace(old, new)
        print(f'Fixed: {old[:60]}')
    else:
        print(f'NOT FOUND: {old[:60]}')

with open('/sessions/magical-peaceful-mendel/mnt/Episodes/generate_dashboard_doc.py', 'w') as f:
    f.write(content)

print('\nDone. Checking remaining lines with potential issues...')

lines = content.split('\n')
for i, line in enumerate(lines, 1):
    s = line.strip()
    if s.startswith('add_') and s.count('"') > 2:# and '\\"' not in s:
        # Check if there are unescaped quotes not at string boundaries
        print(f'  Line {i}: {s[:110]}')
