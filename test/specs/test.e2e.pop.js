import { browser } from '@wdio/globals'
import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';
import overviewPage from '../pageobjects/overview.page.js';
import checkoutCompletePage from '../pageobjects/checkout.complete.page.js';
import { generateRandomPassword, getRandomString, getRandomNumber } from '../functions.js';


describe('Saucedemo', () => {

    it('should login with valid credentials', async () => {

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        expect(await loginPage.inputUsername.getValue()).toBe('standard_user');
        expect(await loginPage.inputPassword.getValue()).toBe('secret_sauce');
        expect(await loginPage.inputPassword.getAttribute('type')).toBe('password');

        await loginPage.submit();
        await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    });

    it('should check login with invalid password', async () => {
        await loginPage.open();

        const randomPassword = generateRandomPassword(10);
  
        await loginPage.login('standard_user', randomPassword);

        expect(await loginPage.inputUsername.getValue()).toBe('standard_user');
        expect(await loginPage.inputPassword.getValue()).toBe(randomPassword);
        expect(await loginPage.inputPassword.getAttribute('type')).toBe('password');

        await loginPage.submit();

        expect(await loginPage.xMark.isDisplayed()).toBe(true);
        expect((await loginPage.inputUsername.getCSSProperty('border-bottom-color')).value).toBe('rgba(226,35,26,1)');
        expect(await loginPage.errorMessage.isDisplayed()).toBe(true);
        expect(await loginPage.errorMessage.getText()).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    it('should check login with invalid login', async () => {
        await loginPage.open();

        const randomLogin = getRandomString(7);
  
        await loginPage.login(randomLogin, 'secret_sauce');

        expect(await loginPage.inputUsername.getValue()).toBe(randomLogin);
        expect(await loginPage.inputPassword.getValue()).toBe('secret_sauce');
        expect(await loginPage.inputPassword.getAttribute('type')).toBe('password');

        await loginPage.submit();

        expect(await loginPage.xMark.isDisplayed()).toBe(true);
        expect((await loginPage.inputUsername.getCSSProperty('border-bottom-color')).value).toBe('rgba(226,35,26,1)');
        expect(await loginPage.errorMessage.isDisplayed()).toBe(true);
        expect(await loginPage.errorMessage.getText()).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    it('should logout', async () => {

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.submit();

        await inventoryPage.burgerBtn.click();

        expect(await inventoryPage.bmMenu.isDisplayed()).toBe(true);
        expect(await inventoryPage.allItems.isDisplayed()).toBe(true);
        expect(await inventoryPage.aboutItem.isDisplayed()).toBe(true);
        expect(await inventoryPage.logoutItem.isDisplayed()).toBe(true);
        expect(await inventoryPage.resetAppStateItem.isDisplayed()).toBe(true); 

        await inventoryPage.logItOut();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/');
        expect(await loginPage.inputUsername.getValue()).toBe('');
        expect(await loginPage.inputPassword.getValue()).toBe('');
    });

    it('should check saving the cart after logout', async () => {

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.submit();

        await inventoryPage.addItToCart();
        expect (await inventoryPage.cartBage.getText()).toBe('1');

        await inventoryPage.burgerBtn.click();

        expect(await inventoryPage.bmMenu.isDisplayed()).toBe(true);
        expect(await inventoryPage.allItems.isDisplayed()).toBe(true);
        expect(await inventoryPage.aboutItem.isDisplayed()).toBe(true);
        expect(await inventoryPage.logoutItem.isDisplayed()).toBe(true);
        expect(await inventoryPage.resetAppStateItem.isDisplayed()).toBe(true); 

        await inventoryPage.logItOut();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/');
        expect(await loginPage.inputUsername.getValue()).toBe('');
        expect(await loginPage.inputPassword.getValue()).toBe('');

        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.submit();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        expect(await inventoryPage.inventoryContainer.isDisplayed()).toBe(true);
        expect(await inventoryPage.cartIcon.isDisplayed()).toBe(true);

        await inventoryPage.goToCart();
        
        expect(await browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        expect(await inventoryPage.productName.getText()).toBe(await cartPage.cartProductName.getText());

        await cartPage.removeIt();
    });

    it('should check the sorting', async () => {

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.submit();

        await inventoryPage.productSortingDropDown();
        await inventoryPage.sortZA();

        expect(await inventoryPage.inventoryContainer.isDisplayed()).toBe(true);

        await inventoryPage.productSortingDropDown();
        await inventoryPage.sortLow();

        expect(await inventoryPage.inventoryContainer.isDisplayed()).toBe(true);

        await inventoryPage.productSortingDropDown();
        await inventoryPage.sortHigh();

        expect(await inventoryPage.inventoryContainer.isDisplayed()).toBe(true);

        await inventoryPage.productSortingDropDown();
        await inventoryPage.sortAZ();

        expect(await inventoryPage.inventoryContainer.isDisplayed()).toBe(true);
    });

    it('should check footer links', async () => {

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.submit();

        await inventoryPage.footerLinks.scrollIntoView();
        await inventoryPage.goToTwitter()
        await browser.switchWindow('https://x.com/saucelabs');
        expect(await browser).toHaveUrl('https://x.com/saucelabs');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');

        await inventoryPage.goToFacebook()
        await browser.switchWindow('https://www.facebook.com/saucelabs');
        expect(await browser).toHaveUrl('https://www.facebook.com/saucelabs');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');

        await inventoryPage.goToLinkedin()
        await browser.switchWindow('https://www.linkedin.com/company/sauce-labs/');
        expect(await browser).toHaveUrl('https://www.linkedin.com/company/sauce-labs/');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');
    });

    it('should check valid checkout', async () => {

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.submit();

        await inventoryPage.addItToCart();
        expect(await inventoryPage.cartBage.getText()).toBe('1');
        
        await inventoryPage.goToCart();
        expect(await browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        expect(await cartPage.cartProductName.getText()).toBe(await inventoryPage.productName.getText());

        await cartPage.checkItOut();
        expect(await checkoutPage.checkoutForm.isDisplayed()).toBe(true);

        const checkoutFirstName = getRandomString(7);
        const checkoutLasttName = getRandomString(8);
        const checkoutPostalCode = getRandomNumber(5);

        await checkoutPage.fillCheckoutForm(checkoutFirstName, checkoutLasttName, checkoutPostalCode);

        expect(await checkoutPage.inputFirstName.getValue()).toBe(checkoutFirstName);
        expect(await checkoutPage.inputLastName.getValue()).toBe(checkoutLasttName);
        expect(await checkoutPage.inputPostalCode.getValue()).toBe(checkoutPostalCode);

        await checkoutPage.continueIt();
        
        expect(await browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        expect(await inventoryPage.productName.getText()).toBe(await overviewPage.checkoutProductName.getText());
        expect(await inventoryPage.productPrice.getText()).toBe(await overviewPage.checkoutProductPrice.getText());

        await overviewPage.finishIt();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        expect(await checkoutCompletePage.thanckYouMessage.isDisplayed()).toBe(true);
        
        await checkoutCompletePage.backToHomePage();

        expect(await browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        expect(await inventoryPage.inventoryContainer.isDisplayed()).toBe(true);
        expect(await inventoryPage.cartIcon.getText()).toBe('');
    });

    it('should check checkout without products', async () => {

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.submit();

        await inventoryPage.goToCart();
        expect(await browser).toHaveUrl('https://www.saucedemo.com/cart.html');

        await cartPage.checkItOut();
        expect(await cartPage.cartErrorMessage.isDisplayed()).toBe(true);

    //The test is failed due to the bug on the website.
        
    });
})

