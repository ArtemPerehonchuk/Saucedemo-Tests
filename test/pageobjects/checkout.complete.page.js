
class checkoutCompletePage  {
    
    get thanckYouMessage () { return $('.complete-header'); }
    get backHomeBtn () { return $('#back-to-products');}

    async backToHomePage () {
        await this.backHomeBtn.click();
    }
}

export default new checkoutCompletePage();