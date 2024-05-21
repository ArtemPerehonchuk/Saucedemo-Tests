import { $ } from '@wdio/globals'

class OverviewPage  {
    
    get checkoutProductName () { return $('.inventory_item_name'); }
    get checkoutProductPrice () { return $('.inventory_item_price');}
    get finishBtn () { return $('#finish'); }
   

    async finishIt () {
        await this.finishBtn.click();
    }
}

export default new OverviewPage();