function isDeepEqual(a, b, seen = new WeakMap()) {
  // Same reference shortcut
  if (a === b) return true;

  // Handle null
  if (a === null || b === null) return a === b;

  // Handle primitives
  if (typeof a !== "object" || typeof b !== "object") {
    return Object.is(a, b);
  }

  // Prevent circular reference infinite loop
  if (seen.has(a)) {
    return seen.get(a) === b;
  }
  seen.set(a, b);

  // Array vs Object check
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Same number of keys
  if (keysA.length !== keysB.length) return false;

  // Same keys + recursive value check
  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!isDeepEqual(a[key], b[key], seen)) return false;
  }

  return true;
}

// --- Test Cases ---
const profileA = { name: "Vasanth", roles: ["admin", ""], meta: { id: 1 } };
const profileB = { name: "Vasanth", roles: ["admin", ""], meta: { id: 1 } };
const profileC = { name: "Vasanth", roles: ["admin"], meta: { id: 1 } };

console.log("Test 1 (Identical):", isDeepEqual(profileA, profileB)); // Expected: true
// console.log("Test 2 (Different Roles):", isDeepEqual(profileA, profileC)); // Expected: false
// console.log("Test 3 (Nested Change):", isDeepEqual(profileA, {...profileB, meta: { id: 2 } })); // Expected: false
// console.log("Test 4 (Primitive):", isDeepEqual(10, 10)); // Expected: true