import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.beforeEach(async ({ app }) => {
    await app.login.navigate();
    await app.login.performLogin('standard_user', 'secret_sauce');

    await expect(app.page).toHaveURL(/.*\/inventory.html/);

    const itemCount = await app.inventory.inventoryItems.count();
    expect(itemCount).not.toBe(0);
});
test('Add several(2)  random products to cart', async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
) => {
    const addedItems = await app.inventory.addRandomItemsToTheCart(2);
    await app.inventory.shoppingCart.click();

    const itemsFromCart = await app.shoppingCart.getCartItemInfo();
    expect(addedItems).toEqual(itemsFromCart);
});
