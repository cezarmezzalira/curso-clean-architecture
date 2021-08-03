export default class Cpf {
  value: string;

  constructor(value: string) {
    if (!this.validateCPF(value)) throw new Error("Invalid CPF");
    this.value = value;
  }

  readonly FACTOR_DIGIT_1 = 10;
  readonly FACTOR_DIGIT_2 = 11;
  readonly MAX_DIGITS_1 = 9;
  readonly MAX_DIGITS_2 = 10;

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
}
