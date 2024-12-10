import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortProductButton = this.page.getByTestId('product-sort-container');

    inventoryItemsPrice = this.page.getByTestId('inventory-item-price');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async performProductSort(sortOption) {
        await this.sortProductButton.selectOption({ value: sortOption });
    }

    async getPrices() {
        return this.page.$$eval('.inventory_item_price', (priceElements) => 
            priceElements.map(el => parseFloat(el.textContent.replace('$', ''))));
    }
}

export const sortingOptions = {
    AZ: 'az',
    ZA: 'za',
    LOW_TO_HIGH: 'lohi',
    HIGH_TO_LOW: 'hilo'
};
