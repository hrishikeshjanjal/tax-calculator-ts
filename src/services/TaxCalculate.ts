import { Product } from "../models/product";

class TaxCalculator {
  private readonly BASIC_TAX_RATE: number = 0.1; // 10%
  private readonly IMPORT_DUTY_RATE: number = 0.05; // 5%
  private readonly ROUNDING_FACTOR: number = 0.05;

  private shoppingCart: Product[] = [];

  public addItem(
    quantity: number,
    name: string,
    price: number,
    isImported: boolean
  ): void {
    const product: Product = {
      quantity,
      name,
      price,
      isImported,
    };
    this.shoppingCart.push(product);
  }

  public calculateTax(product: Product): number {
    let tax: number = 0;
    if (!this.isExempt(product.name)) {
      tax += product.price * this.BASIC_TAX_RATE;
    }
    if (product.isImported) {
      tax += product.price * this.IMPORT_DUTY_RATE;
    }
    return this.roundTax(tax);
  }

  public roundTax(tax: number): number {
    return Math.ceil(tax / this.ROUNDING_FACTOR) * this.ROUNDING_FACTOR;
  }

  private isExempt(itemName: string): boolean {
    const exemptCategories: string[] = ["Books", "Food", "Medicines"];
    return exemptCategories.includes(itemName);
  }

  public generateReceipt(): string {
    let receipt: string = "";
    let totalTax: number = 0;
    let totalCost: number = 0;

    for (const product of this.shoppingCart) {
      const itemTax: number = this.calculateTax(product);
      const itemPriceWithTax: number = product.price + itemTax;
      const itemTotalPrice: number = itemPriceWithTax * product.quantity;

      receipt += `${product.quantity} ${
        product.name
      }: ${itemPriceWithTax.toFixed(2)}\n`;
      totalTax += itemTax * product.quantity;
      totalCost += itemTotalPrice;
    }

    receipt += `Tax: ${totalTax.toFixed(2)}\n`;
    receipt += `Total: ${totalCost.toFixed(2)}`;

    return receipt;
  }
}

export default TaxCalculator;
