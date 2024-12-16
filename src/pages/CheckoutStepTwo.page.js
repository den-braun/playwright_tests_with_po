import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutStepTwoPage extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    cartItems = this.page.locator('.cart_item');
    itemNameLocator = '.inventory_item_name';
    itemDescriptionLocator = '.inventory_item_desc';
    itemPriceLocator = '.inventory_item_price';
    totalPriceLocator = this.page.locator('.summary_total_label');
    finishButton = this.page.locator('#finish');

    /**
     * Get information about all products
     * @returns {Promise<Array<{ name: string, description: string, price: string }>>}
     */
    async getCartItemsInfo() {
        const cartItemCount = await this.cartItems.count();
        const cartItems = [];

        for (let i = 0; i < cartItemCount; i++) {
            const name = await this.cartItems.nth(i).locator(this.itemNameLocator).innerText();
            const description = await this.cartItems.nth(i).locator(this.itemDescriptionLocator).innerText();
            const price = await this.cartItems.nth(i).locator(this.itemPriceLocator).innerText();
            cartItems.push({ name, description, price });
        }

        return cartItems;
    }

    /**
     * Get the total cost displayed
     * @returns {Promise<number>}
     */
    async getDisplayedTotalPrice() {
        const totalPriceText = await this.totalPriceLocator.innerText();
        return parseFloat(totalPriceText.replace('Total: $', '').trim());
    }

    async clickFinish() {
        await this.finishButton.click();
    }
}
