import db from "@/config/db";
//import { AddonRepository } from "@/modules/addon/repository";
import addon from "@/modules/addon/schema";
const AVAILABLE_ADDONS = await db.select().from(addon);
export interface AddonItem {
	name: string;
	price: number;
	selected: boolean;
}
export function calculateAddonTotal(addons: AddonItem[]): number {
	return addons
		.filter(addon => addon.selected)
		.reduce((total, addon) => total + addon.price, 0);
}

export function getAddonsWithSelection(selectedNames: string[]): AddonItem[] {
	return AVAILABLE_ADDONS.map(addon => ({
		name: addon.name,
		price: addon.price,
		selected: selectedNames.includes(addon.name) // select true only when the addon is in the addon table 
	}));
}

export function calculateWarrantyTotal(baseAmount: number, addons: AddonItem[]): number {
	const addonTotal = calculateAddonTotal(addons);
	return baseAmount + addonTotal;
}

export function formatAddonsForResponse(addons: AddonItem[]) {
	const selected = addons.filter(a => a.selected);
	const notSelected = addons.filter(a => !a.selected);

	return {
		selected: selected.map(a => ({ name: a.name, price: a.price })),
		notSelected: notSelected.map(a => ({ name: a.name, price: a.price })),
		selectedCount: selected.length,
		totalAddonPrice: calculateAddonTotal(addons)
	};
}
