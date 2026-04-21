// Simple test helpers

const mechanics = [
  { id: 1, name: "Nairobi Garage Motors", town: "Nairobi", available: true },
  { id: 2, name: "Kisumu Roadside", town: "Kisumu", available: false },
];

function filterMechanics(term, onlyAvailable = false) {
  let list = mechanics.filter(
    (m) =>
      m.name.toLowerCase().includes(term.toLowerCase()) ||
      m.town.toLowerCase().includes(term.toLowerCase())
  );
  if (onlyAvailable) list = list.filter((m) => m.available);
  return list;
}

function isValidPhone(phone) {
  return /^\+?254\d{9}$/.test(phone) || /^\+?0?7\d{8}$/.test(phone);
}

// Jest tests
test("filterMechanics returns all when term is empty", () => {
  expect(filterMechanics("")).toEqual(mechanics);
});

test("filterMechanics only available when onlyAvailable = true", () => {
  const list = filterMechanics("", true);
  expect(list).toHaveLength(1);
  expect(list[0].available).toBe(true);
});

test("isValidPhone validates Kenyan numbers", () => {
  expect(isValidPhone("0700123456")).toBe(true);
  expect(isValidPhone("0100123456")).toBe(false);
});