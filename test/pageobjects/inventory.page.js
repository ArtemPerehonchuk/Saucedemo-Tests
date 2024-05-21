import { $ } from '@wdio/globals'

class InventoryPage {
    
    get burgerBtn () { return $('#react-burger-menu-btn'); }
    get bmMenu () { return $('.bm-menu'); }
    get allItems () { return $('#inventory_sidebar_link'); }
    get aboutItem () { return $('#about_sidebar_link'); }
    get logoutItem () { return $('#logout_sidebar_link'); }
    get resetAppStateItem () { return $('#reset_sidebar_link'); }
    get addToCartBtn () { return $('#add-to-cart-sauce-labs-backpack'); }
    get cartIcon () { return $('.shopping_cart_link'); }
    get cartBage () { return $('.shopping_cart_badge'); }
    get removeBtn () { return $('#remove-sauce-labs-backpack'); }
    get productSort () { return $('.product_sort_container'); }
    get nameAZ () { return $('[value="az"]'); }
    get nameZA () { return $('[value="za"]'); }
    get nameLow () { return $('[value="lohi"]'); }
    get nameHigh () { return $('[value="hilo"]'); }
    get productName () { return $('.inventory_item_name'); }
    get productPrice () { return $('.inventory_item_price'); }
    get inventoryContainer () { return $('#inventory_container'); }
    get footerLinks () { return $('.footer'); }
    get twitterIcon () { return $('[href="https://twitter.com/saucelabs"]'); }
    get facebookIcon () { return $('[href="https://www.facebook.com/saucelabs"]'); }
    get linkedinIcon () { return $('[href="https://www.linkedin.com/company/sauce-labs/"]'); }

    async burgerMenu () {
        await this.burgerBtn.click();
    }

    async logItOut () {
        await this.logoutItem.click();
    }

    async addItToCart () {
        await this.addToCartBtn.click();
    }

    async goToCart () {
        await this.cartIcon.click();
    }

    async removeIt () {
        await this.removeBtn.click();
    }

    async productSortingDropDown () {
        await this.productSort.click();
    }

    async sortZA () {
        await this.nameZA.click();
    }

    async sortAZ () {
        await this.nameAZ.click();
    }

    async sortLow () {
        await this.nameLow.click();
    }

    async sortHigh () {
        await this.nameHigh.click();
    }

    async goToTwitter () {
        await this.twitterIcon.click();
    }

    async goToFacebook () {
        await this.facebookIcon.click();
    }

    async goToLinkedin () {
        await this.linkedinIcon.click();
    }

}

export default new InventoryPage();






