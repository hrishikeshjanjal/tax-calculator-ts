import TaxCalculator from "../../services/TaxCalculate";

describe("TaxCalculator", () => {
  let taxCalculator: TaxCalculator;

  beforeEach(() => {
    taxCalculator = new TaxCalculator();
  });

  it("should calculate the tax and generate the receipt correctly", () => {
    taxCalculator.addItem(1, "book", 124.99, false);
    taxCalculator.addItem(1, "music CD", 149.99, false);
    taxCalculator.addItem(1, "chocolate bar", 40.85, false);

    const receipt = taxCalculator.generateReceipt();

    expect(receipt).toBe(
      "1 book: 137.49\n1 music CD: 177.49\n1 chocolate bar: 72.43\nTax: 71.58\nTotal: 387.41"
    );
  });

  it("should handle exempt items correctly", () => {
    taxCalculator.addItem(1, "book", 100.0, false);
    taxCalculator.addItem(1, "food", 200.0, false);
    taxCalculator.addItem(1, "medicine", 300.0, false);

    const receipt = taxCalculator.generateReceipt();

    expect(receipt).toBe(
      "1 book: 110.00\n1 food: 230.00\n1 medicine: 360.00\nTax: 100.00\nTotal: 700.00"
    );
  });

  it("should handle imported items correctly", () => {
    taxCalculator.addItem(1, "imported perfume", 250.0, true);
    taxCalculator.addItem(2, "imported chocolates", 50.0, true);

    const receipt = taxCalculator.generateReceipt();

    expect(receipt).toBe(
      "1 imported perfume: 287.50\n2 imported chocolates: 95.00\nTax: 127.50\nTotal: 477.50"
    );
  });

  it("should handle multiple quantities of items", () => {
    taxCalculator.addItem(3, "book", 10.0, false);

    const receipt = taxCalculator.generateReceipt();

    expect(receipt).toBe("3 book: 11.00\nTax: 3.00\nTotal: 33.00");
  });

  it("should round the tax correctly", () => {
    taxCalculator.addItem(1, "item", 12.99, false);

    const receipt = taxCalculator.generateReceipt();

    expect(receipt).toBe("1 item: 14.29\nTax: 1.30\nTotal: 14.29");
  });
});
