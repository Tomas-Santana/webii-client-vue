export type CalculatorModuleType = {
    CalculatorClass: {
        sum(a: number, b: number): Promise<number>;
        subtract(a: number, b: number): Promise<number>;
        multiply(a: number, b: number): Promise<number>;
        divide(a: number, b: number): Promise<number>;
    }
};