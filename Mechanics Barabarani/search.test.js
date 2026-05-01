const mechanics = require("../data/mechanics.json");

function searchMechanics(list, city) {
  return list.filter(m => m.city.toLowerCase().includes(city.toLowerCase()));
}

test("should return Nairobi garages when city = Nairobi", () => {
  const result = searchMechanics(mechanics, "nairobi");
  expect(result).not.toHaveLength(0);
  expect(result.every(m => m.city.toLowerCase().includes("nairobi"))).toBe(true);
});