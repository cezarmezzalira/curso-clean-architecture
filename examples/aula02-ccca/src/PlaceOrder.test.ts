import PlaceOrder from "./PlaceOrder";

test("Deve fazer um pedido", function () {
  const input = {
    cpf: "073.655.699-05",
    items: [
      { description: "Camiseta", price: 50, quantity: 1 },
      { description: "Tenis", price: 150, quantity: 1 },
      { description: "Meia", price: 20, quantity: 2 },
    ],
    coupon: "VALE20",
  };

  const placeOrder = new PlaceOrder();
  const output = placeOrder.execute(input);
  expect(output.total).toBe(192);
});
