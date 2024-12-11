import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { sortingOptions } from '../pages/Inventory.page';

test.beforeEach(async ({ app }) => {
    await app.login.navigate();
    await app.login.performLogin('standard_user', 'secret_sauce');

    await expect(app.page).toHaveURL(/.*\/inventory.html/);

    const itemCount = await app.inventory.inventoryItems.count();
    expect(itemCount).not.toBe(0);
});

test.describe('Saucedemo tests for sorting products on invertory page', () => {
    test('Sorting products by name A-Z', async ({ app }) => {
        const productNamesBeforeSort = await app.inventory.inventoryItems.allTextContents();
        await app.inventory.performProductSort(sortingOptions.AZ);

        const productNamesAfterSortAZ = await app.inventory.inventoryItems.allTextContents();
        const sortedNamesAZ = [...productNamesBeforeSort].sort();
        expect(productNamesAfterSortAZ).toEqual(sortedNamesAZ);
    });

    test('Sorting products by name Z-A', async ({ app }) => {
        const productNamesBeforeSort = await app.inventory.inventoryItems.allTextContents();
        await app.inventory.performProductSort(sortingOptions.ZA);

        const productNamesAfterSortZA = await app.inventory.inventoryItems.allTextContents();
        const sortedNamesZA = [...productNamesBeforeSort].sort().reverse();
        expect(productNamesAfterSortZA).toEqual(sortedNamesZA);
    });

    test('Sorting products by price Low to High', async ({ app }) => {
        const pricesBeforeSort = await app.inventory.getPrices();
        await app.inventory.performProductSort((sortingOptions.LOW_TO_HIGH));

        const pricesAfterSort = await app.inventory.getPrices();
        const sortedPrices = [...pricesBeforeSort].sort((a, b) => a - b);
        expect(pricesAfterSort).toEqual(sortedPrices);
    });

    test('Sorting products by price High to Low', async ({ app }) => {
        const pricesBeforeSort = await app.inventory.getPrices();
        await app.inventory.performProductSort(sortingOptions.HIGH_TO_LOW);

        const pricesAfterSort = await app.inventory.getPrices();
        const sortedPrices = [...pricesBeforeSort].sort((a, b) => b - a);
        expect(pricesAfterSort).toEqual(sortedPrices);
    });
});
