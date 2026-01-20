export function calculateWarrantyAmount(
	priceOnDuration: Record<string, number> | null | undefined,
	duration: string,
	fallbackAmount: number = 10000
): number {
	if (priceOnDuration && priceOnDuration[duration]) {
		return priceOnDuration[duration];
	}
	return fallbackAmount;
}
