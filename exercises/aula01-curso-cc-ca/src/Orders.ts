export interface ItemOrder {
  description: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  cpf: string;
  items: ItemOrder[];
  savingPercentual: number;
}

export default class Orders {
  private orders: Order[] = [];

  readonly FACTOR_DIGIT_1 = 10;
  readonly FACTOR_DIGIT_2 = 11;
  readonly MAX_DIGITS_1 = 9;
  readonly MAX_DIGITS_2 = 10;

  private generateId(): string {
    return Math.floor(Math.random() * 100).toString();
  }

  private extractDigits(cpf: string): string {
    return cpf.replace(/\D/g, "");
  }

  private isInvalidLength(cpf: string): boolean {
    return cpf.length !== 11;
  }

  private isBlocked(cpf: string): boolean {
    const [digit1] = cpf;
    return cpf.split("").every((digit) => digit === digit1);
  }

  private toDigitArray(cpf: string): Array<number> {
    return [...cpf].map((digit) => parseInt(digit));
  }

  private calculateDigit(cpf: string, factor: number, max: number): number {
    let total = 0;
    for (const digit of this.toDigitArray(cpf).slice(0, max)) {
      total += digit * factor--;
    }
    return total % 11 < 2 ? 0 : 11 - (total % 11);
  }

  private getCheckDigit(cpf: string): string {
    return cpf.slice(9);
  }

  private validateCPF(cpf = ""): boolean {
    cpf = this.extractDigits(cpf);
    if (this.isInvalidLength(cpf)) return false;
    if (this.isBlocked(cpf)) return false;
    const digit1 = this.calculateDigit(
      cpf,
      this.FACTOR_DIGIT_1,
      this.MAX_DIGITS_1
    );
    const digit2 = this.calculateDigit(
      cpf,
      this.FACTOR_DIGIT_2,
      this.MAX_DIGITS_2
    );
    let calculatedCheckDigit = `${digit1}${digit2}`;
    return this.getCheckDigit(cpf) == calculatedCheckDigit;
  }

  addOrder(
    cpf: string,
    items: ItemOrder[],
    savingPercentual: number = 0
  ): Order {
    const isValidCPF = this.validateCPF(cpf);
    if (!isValidCPF) {
      throw Error("Invalid CPF");
    }
    if (!items || items.length == 0) {
      throw Error("Quantity of order items not to be 0");
    }
    const order = {
      id: this.generateId(),
      cpf,
      items,
      savingPercentual,
    } as Order;
    this.orders.push(order);
    return order;
  }
}
