import PlaceOrder from "./PlaceOrder";
import PlaceOrderInput from "./PlaceOrderInput";

test("Deve fazer um pedido", function () {
  const input = new PlaceOrderInput({
    cpf: "073.655.699-05",
    items: [
      { description: "Camiseta", price: 50, quantity: 1 },
      { description: "Tenis", price: 150, quantity: 1 },
      { description: "Meia", price: 20, quantity: 2 },
    ],
    coupon: "VALE20",
  });

  const placeOrder = new PlaceOrder();
  const output = placeOrder.execute(input);
  expect(output.total).toBe(192);
});

test("Deve fazer um pedido", function () {
  const input = new PlaceOrderInput({
    cpf: "073.655.699-05",
    items: [
      { description: "Camiseta", price: 50, quantity: 1 },
      { description: "Tenis", price: 150, quantity: 1 },
      { description: "Meia", price: 20, quantity: 2 },
    ],
    coupon: "VALE20_EXPIRED",
  });

  const placeOrder = new PlaceOrder();
  const output = placeOrder.execute(input);
  expect(output.total).toBe(240);
});
