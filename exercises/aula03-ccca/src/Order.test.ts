import Coupon from "./Coupon";
import Order from "./Order";

test("Não deve criar um pedido com CPF inválido", function () {
  const cpf = "111.111.111-11";
  expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
});

test("Deve criar um pedido com 3 itens", function () {
  const cpf = "073.655.699-05";
  const order = new Order(cpf);
  order.addItem("Camiseta", 50, 1);
  order.addItem("Tenis", 150, 1);
  order.addItem("Meia", 20, 2);
  const total = order.getTotal();
  expect(total).toBe(240);
});

test("Deve criar um pedido com cupom de desconto", function () {
  const cpf = "073.655.699-05";
  const order = new Order(cpf);
  order.addItem("Camiseta", 50, 1);
  order.addItem("Tenis", 150, 1);
  order.addItem("Meia", 20, 2);
  order.addCoupon(new Coupon("VALE20", 20, new Date("2021-10-10")));
  const total = order.getTotal();
  expect(total).toBe(192);
});
