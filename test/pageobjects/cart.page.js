import { $ } from '@wdio/globals'

class CartPage {
    
    get cartProductName () { return $('.inventory_item_name'); }
    get cartProductPrice () { return $('.inventory_item_price');}
    get cartErrorMessage () { return $('#empty-cart-error-message');}
    get checkoutBtn () { return $('#checkout'); }
    get removeBtn () { return $('#remove-sauce-labs-backpack'); }

    async checkItOut () {
        await this.checkoutBtn.click();
    }

    async removeIt () {
        await this.removeBtn.click();
    }
}

export default new CartPage();