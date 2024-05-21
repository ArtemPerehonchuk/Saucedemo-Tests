import { $ } from '@wdio/globals'

class CheckoutPage {

    get checkoutForm () { return $('.checkout_info'); }
    get inputFirstName () { return $('#first-name'); }
    get inputLastName () { return $('#last-name'); }
    get inputPostalCode () { return $('#postal-code'); }
    get continueBtn () { return $('#continue'); }

    async continueIt () {
        await this.continueBtn.click();
    }

    async removeIt () {
        await this.removeBtn.click();
    }

    async fillCheckoutForm(firstname, lastname, postalcode) {
        await this.inputFirstName.setValue(firstname);
        await this.inputLastName.setValue(lastname);
        await this.inputPostalCode.setValue(postalcode);
    }
}

export default new CheckoutPage();