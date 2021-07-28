import Orders, { ItemOrder } from "./Orders";

test.only("Should create not create an Order with invalid CPF", function () {
  const orders = new Orders();
  const cpf = "07365569903";
  const items = [] as ItemOrder[];

  expect(orders.addOrder(cpf, items)).toThrowError("Invalid CPF");
});

test("Should create an Order with 3 items", function () {
  const orders = new Orders();
  const cpf = "07365569905";
  const items = [
    {
      description: "Item 01",
      price: 10,
      quantity: 2,
    },
    {
      description: "Item 01",
      price: 10,
      quantity: 1,
    },
    {
      description: "Item 01",
      price: 10,
      quantity: 2,
    },
  ] as ItemOrder[];

  const order = orders.addOrder(cpf, items);
  expect(order).toEqual(
    expect.objectContaining({
      items,
    })
  );
});

test("Should create an Order with rebate percentual value on subtotal", function () {
  const orders = new Orders();
  const cpf = "07365569905";
  const items = [
    {
      description: "Item 01",
      price: 10,
      quantity: 2,
    },
    {
      description: "Item 01",
      price: 10,
      quantity: 1,
    },
  ] as ItemOrder[];

  const savingPercentual = 10;
  const order = orders.addOrder(cpf, items, savingPercentual);
  // const orderSubtotalWithSavings = orders.getSubTotalWithSavings(order.id);

  // expect(orderSubtotalWithSavings).toEqual(27);
});
