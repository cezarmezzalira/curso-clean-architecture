import Coupon from "./Coupon";

test("Deve verificar se o cupom está expirado", function () {
  const coupon = new Coupon("VALE20", 20, new Date("2020-01-01"));
  expect(coupon.isExpired()).toBe(true);
});
