import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.beforeEach(async ({ app }) => {
    await app.login.navigate();
    await app.login.performLogin('standard_user', 'secret_sauce');

    await expect(app.page).toHaveURL(/.*\/inventory.html/);

    const itemCount = await app.inventory.inventoryItems.count();
    expect(itemCount).not.toBe(0);
});
test('Add products to cart, proceed to checkout, and verify total price', async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
) => {
    const addedItems = await app.inventory.addRandomItemsToTheCart(2);
    await app.inventory.shoppingCart.click();

    const itemsFromCart = await app.shoppingCart.getCartItemInfo();
    expect(addedItems).toEqual(itemsFromCart);

    await app.shoppingCart.clickCheckout();
    await expect(app.page).toHaveURL(/.*\/checkout-step-one.html/);

    await app.checkoutStepOne.fillUserDetails('Den', 'Feshch', '090809');
    await app.checkoutStepOne.clickContinue();
    await expect(app.page).toHaveURL(/.*\/checkout-step-two.html/);

    const itemsFromCheckout = await app.checkoutStepTwo.getCartItemsInfo();
    expect(itemsFromCheckout).toEqual(
        addedItems.map(item => ({
            name: item.name,
            description: expect.any(String),
            price: item.price,
        })),
    );

    const calculatedTotalPrice = addedItems.reduce(
        (total, item) => total + parseFloat(item.price.replace('$', '').trim()),
        0
    );
    const displayedTotalPrice = await app.checkoutStepTwo.getDisplayedTotalPrice();
    expect(displayedTotalPrice).toBeCloseTo(calculatedTotalPrice, 2);

    await app.checkoutStepTwo.clickFinish();
    await expect(app.page).toHaveURL(/.*\/checkout-complete.html/);
});
