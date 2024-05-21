import { browser } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import OverviewPage from '../pageobjects/overview.page.js';
import CheckoutCompletePage from '../pageobjects/checkout.complete.page.js';
import { generateRandomPassword, getRandomString, getRandomNumber } from '../functions.js';


describe('Saucedemo', () => {

    it('should login with valid credentials', async () => {

        await browser.url('https://www.saucedemo.com/');
  
        await LoginPage.login('standard_user', 'secret_sauce');

        expect(await LoginPage.inputUsername.getValue()).toBe('standard_user');
        expect(await LoginPage.inputPassword.getValue()).toBe('secret_sauce');
        expect(await LoginPage.inputPassword.getAttribute('type')).toBe('password');

        await LoginPage.submit();
        await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    });

    it('should check login with invalid password', async () => {
        await browser.url('https://www.saucedemo.com/');

        const randomPassword = generateRandomPassword(10);
  
        await LoginPage.login('standard_user', randomPassword);

        expect(await LoginPage.inputUsername.getValue()).toBe('standard_user');
        expect(await LoginPage.inputPassword.getValue()).toBe(randomPassword);
        expect(await LoginPage.inputPassword.getAttribute('type')).toBe('password');

        await LoginPage.submit();

        expect(await LoginPage.xMark.isDisplayed()).toBe(true);
        expect((await LoginPage.inputUsername.getCSSProperty('border-bottom-color')).value).toBe('rgba(226,35,26,1)');
        expect(await LoginPage.errorMessage.isDisplayed()).toBe(true);
        expect(await LoginPage.errorMessage.getText()).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    it('should check login with invalid login', async () => {
        await browser.url('https://www.saucedemo.com/');

        const randomLogin = getRandomString(7);
  
        await LoginPage.login(randomLogin, 'secret_sauce');

        expect(await LoginPage.inputUsername.getValue()).toBe(randomLogin);
        expect(await LoginPage.inputPassword.getValue()).toBe('secret_sauce');
        expect(await LoginPage.inputPassword.getAttribute('type')).toBe('password');

        await LoginPage.submit();

        expect(await LoginPage.xMark.isDisplayed()).toBe(true);
        expect((await LoginPage.inputUsername.getCSSProperty('border-bottom-color')).value).toBe('rgba(226,35,26,1)');
        expect(await LoginPage.errorMessage.isDisplayed()).toBe(true);
        expect(await LoginPage.errorMessage.getText()).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    it('should logout', async () => {

        await browser.url('https://www.saucedemo.com/');
        await LoginPage.login('standard_user', 'secret_sauce');
        await LoginPage.submit();

        await InventoryPage.burgerBtn.click();

        expect(await InventoryPage.bmMenu.isDisplayed()).toBe(true);
        expect(await InventoryPage.allItems.isDisplayed()).toBe(true);
        expect(await InventoryPage.aboutItem.isDisplayed()).toBe(true);
        expect(await InventoryPage.logoutItem.isDisplayed()).toBe(true);
        expect(await InventoryPage.resetAppStateItem.isDisplayed()).toBe(true); 

        await InventoryPage.logItOut();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/');
        expect(await LoginPage.inputUsername.getValue()).toBe('');
        expect(await LoginPage.inputPassword.getValue()).toBe('');
    });

    it('should check saving the cart after logout', async () => {

        await browser.url('https://www.saucedemo.com/');
        await LoginPage.login('standard_user', 'secret_sauce');
        await LoginPage.submit();

        await InventoryPage.addItToCart();
        expect (await InventoryPage.cartBage.getText()).toBe('1');

        await InventoryPage.burgerBtn.click();

        expect(await InventoryPage.bmMenu.isDisplayed()).toBe(true);
        expect(await InventoryPage.allItems.isDisplayed()).toBe(true);
        expect(await InventoryPage.aboutItem.isDisplayed()).toBe(true);
        expect(await InventoryPage.logoutItem.isDisplayed()).toBe(true);
        expect(await InventoryPage.resetAppStateItem.isDisplayed()).toBe(true); 

        await InventoryPage.logItOut();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/');
        expect(await LoginPage.inputUsername.getValue()).toBe('');
        expect(await LoginPage.inputPassword.getValue()).toBe('');

        await LoginPage.login('standard_user', 'secret_sauce');
        await LoginPage.submit();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        expect(await InventoryPage.inventoryContainer.isDisplayed()).toBe(true);
        expect(await InventoryPage.cartIcon.isDisplayed()).toBe(true);

        await InventoryPage.goToCart();
        
        expect(await browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        expect(await InventoryPage.productName.getText()).toBe(await CartPage.cartProductName.getText());

        await CartPage.removeIt();
    });

    it('should check the sorting', async () => {

        await browser.url('https://www.saucedemo.com/');
        await LoginPage.login('standard_user', 'secret_sauce');
        await LoginPage.submit();

        await InventoryPage.productSortingDropDown();
        await InventoryPage.sortZA();

        expect(await InventoryPage.inventoryContainer.isDisplayed()).toBe(true);

        await InventoryPage.productSortingDropDown();
        await InventoryPage.sortLow();

        expect(await InventoryPage.inventoryContainer.isDisplayed()).toBe(true);

        await InventoryPage.productSortingDropDown();
        await InventoryPage.sortHigh();

        expect(await InventoryPage.inventoryContainer.isDisplayed()).toBe(true);

        await InventoryPage.productSortingDropDown();
        await InventoryPage.sortAZ();

        expect(await InventoryPage.inventoryContainer.isDisplayed()).toBe(true);
    });

    it('should check footer links', async () => {

        await browser.url('https://www.saucedemo.com/');
        await LoginPage.login('standard_user', 'secret_sauce');
        await LoginPage.submit();

        await InventoryPage.footerLinks.scrollIntoView();
        await InventoryPage.goToTwitter()
        await browser.switchWindow('https://x.com/saucelabs');
        expect(await browser).toHaveUrl('https://x.com/saucelabs');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');

        await InventoryPage.goToFacebook()
        await browser.switchWindow('https://www.facebook.com/saucelabs');
        expect(await browser).toHaveUrl('https://www.facebook.com/saucelabs');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');

        await InventoryPage.goToLinkedin()
        await browser.switchWindow('https://www.linkedin.com/company/sauce-labs/');
        expect(await browser).toHaveUrl('https://www.linkedin.com/company/sauce-labs/');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');
    });

    it('should check valid checkout', async () => {

        await browser.url('https://www.saucedemo.com/');
        await LoginPage.login('standard_user', 'secret_sauce');
        await LoginPage.submit();

        await InventoryPage.addItToCart();
        expect(await InventoryPage.cartBage.getText()).toBe('1');
        
        await InventoryPage.goToCart();
        expect(await browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        expect(await CartPage.cartProductName.getText()).toBe(await InventoryPage.productName.getText());

        await CartPage.checkItOut();
        expect(await CheckoutPage.checkoutForm.isDisplayed()).toBe(true);

        const checkoutFirstName = getRandomString(7);
        const checkoutLasttName = getRandomString(8);
        const checkoutPostalCode = getRandomNumber(5);

        await CheckoutPage.fillCheckoutForm(checkoutFirstName, checkoutLasttName, checkoutPostalCode);

        expect(await CheckoutPage.inputFirstName.getValue()).toBe(checkoutFirstName);
        expect(await CheckoutPage.inputLastName.getValue()).toBe(checkoutLasttName);
        expect(await CheckoutPage.inputPostalCode.getValue()).toBe(checkoutPostalCode);

        await CheckoutPage.continueIt();
        
        expect(await browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        expect(await InventoryPage.productName.getText()).toBe(await OverviewPage.checkoutProductName.getText());
        expect(await InventoryPage.productPrice.getText()).toBe(await OverviewPage.checkoutProductPrice.getText());

        await OverviewPage.finishIt();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        expect(await CheckoutCompletePage.thanckYouMessage.isDisplayed()).toBe(true);
        
        await CheckoutCompletePage.backToHomePage();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        expect(await InventoryPage.inventoryContainer.isDisplayed()).toBe(true);
        expect(await InventoryPage.cartIcon.getText()).toBe('');
    });

    it('should check checkout without products', async () => {

        await browser.url('https://www.saucedemo.com/');
        await LoginPage.login('standard_user', 'secret_sauce');
        await LoginPage.submit();

        await InventoryPage.goToCart();
        expect(await browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        await CartPage.checkItOut();
        expext(await CartPage.cartErrorMessage.isDisplayed()).toBe(true);

    //The test is failed due to the bug on the website.
        
    });
})

