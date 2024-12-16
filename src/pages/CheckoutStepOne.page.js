import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutStepOnePage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    firstNameInput = this.page.locator('#first-name');
    lastNameInput = this.page.locator('#last-name');
    postalCodeInput = this.page.locator('#postal-code');
    continueButton = this.page.locator('#continue');

    /**
     * Filling out the user form
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} postalCode
     */
    async fillUserDetails(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}
