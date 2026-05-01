// Example test file (Jest)
const mechanics = require("../data/mechanics.json");

// 1. Test: search by city
function searchMechanics(list, city) {
  return list.filter(m => m.city.toLowerCase().includes(city.toLowerCase()));
}

test("should return Nairobi garages when city = Nairobi", () => {
  const result = searchMechanics(mechanics, "nairobi");
  expect(result).not.toHaveLength(0);
  expect(
    result.every(m => m.city.toLowerCase().includes("nairobi"))
  ).toBe(true);
});

// 2. Test: phone validation (your helper)
function isValidPhone(phone) {
  const regex = /^2547\d{8}$/;
  return regex.test(phone.trim());
}

test("should accept valid Kenyan phone 2547...", () => {
  expect(isValidPhone("254712345678")).toBe(true);
});

test("should reject invalid phone", () => {
  expect(isValidPhone("07123456789")).toBe(false);
});