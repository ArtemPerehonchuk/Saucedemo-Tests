import { browser } from '@wdio/globals'
import { $ } from '@wdio/globals'

function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
    }

function getRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz'
        let result = ''
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    function getRandomNumber(length) {
        const characters = '0123456789'
        let result = ''
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

describe('Saucedemo', () => {

    it('should login with valid credentials', async () => {
        await browser.url('https://www.saucedemo.com/');

        const inputUsername = $('#user-name');
        const inputPassword = $('#password');
        const loginBtn = $('#login-button');

        await inputUsername.setValue('standard_user')
        await inputPassword.setValue('secret_sauce');
       
        const userNameValue = await inputUsername.getValue();
        console.log(userNameValue);
        await expect(userNameValue).toBe('standard_user');
       
        const passwordValue = await inputPassword.getValue();
        console.log(passwordValue);
        await expect(passwordValue).toBe('secret_sauce');

        const passwordType = await inputPassword.getAttribute('type');
        console.log(passwordType);
        await expect(passwordType).toBe('password');
        
        await loginBtn.click();
        await browser.pause(1000);
        await expect(browser).toHaveUrl("https://www.saucedemo.com/inventory.html");
    });

    it('should check login with invalid password', async () => {
        await browser.url('https://www.saucedemo.com/');

        const inputUsername = $('#user-name');
        const inputPassword = $('#password');
        const loginBtn = $('#login-button');

        await inputUsername.setValue('standard_user');

        const randomPassword = generateRandomPassword(10);
        await inputPassword.setValue(randomPassword);

        const userNameValue = await inputUsername.getValue();
        console.log(userNameValue);
        await expect(userNameValue).toBe('standard_user');

        const passwordType = await inputPassword.getAttribute('type');
        console.log(passwordType);
        await expect(passwordType).toBe('password');
        
        await loginBtn.click();
        await browser.pause(1000);
        
        const xMar = $('.error_icon');
        const errorBorderColor = await inputUsername.getCSSProperty('border-bottom-color');
        const errorMessage = $('h3');
        const errorText = await errorMessage.getText();

        await expect(xMar).toBeDisplayed();
        await expect(errorBorderColor.value).toBe('rgba(226,35,26,1)');
        console.log(errorText);
        await expect(errorText).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    it('should check login with invalid login', async () => {
        await browser.url('https://www.saucedemo.com/');

        const inputUsername = $('#user-name');
        const inputPassword = $('#password');
        const loginBtn = $('#login-button');

        await inputUsername.setValue('standarD_user');
        await inputPassword.setValue('secret_sauce');

        const userNameValue = await inputUsername.getValue();
        console.log(userNameValue);
        await expect(userNameValue).toBe('standarD_user');

        const passwordValue = await inputPassword.getValue();
        console.log(passwordValue);
        await expect(passwordValue).toBe('secret_sauce');

        const passwordType = await inputPassword.getAttribute('type');
        console.log(passwordType);
        await expect(passwordType).toBe('password');
    
        await loginBtn.click();
        await browser.pause(1000);
    
        const xMar = $('.error_icon');
        const errorBorderColor = await inputUsername.getCSSProperty('border-bottom-color');
        const errorMessage = $('h3');
        const errorText = await errorMessage.getText();

        await expect(xMar).toBeDisplayed();
        await expect(errorBorderColor.value).toBe('rgba(226,35,26,1)');
        console.log(errorText);
        await expect(errorText).toBe('Epic sadface: Username and password do not match any user in this service');
    });

    it('should logout', async () => {
        await browser.url('https://www.saucedemo.com/');

        const inputUsername = $('#user-name');
        const inputPassword = $('#password');
        const loginBtn = $('#login-button');

        await inputUsername.setValue('standard_user');
        await inputPassword.setValue('secret_sauce');
        await loginBtn.click();

        const burgerBtn = $('#react-burger-menu-btn');
        await burgerBtn.click();
        await browser.pause(2000);

        const bmMenu = await $('.bm-menu');
        await expect(bmMenu).toBeDisplayed();
        console.log('bmMenu:', bmMenu);

        const allItems = await $('#inventory_sidebar_link');
        const about = await $('#about_sidebar_link');
        const logout = await $('#logout_sidebar_link');
        const resetAppState = await $('#reset_sidebar_link');

        await expect(allItems).toBeDisplayed();
        await expect(about).toBeDisplayed();
        await expect(logout).toBeDisplayed();
        await expect(resetAppState).toBeDisplayed();

        await logout.click();
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');

        const loginPageUsername = $('#user-name');
        const loginPagePassword = $('#password');

        await expect(loginPageUsername).toBeDisplayed();
        await expect(loginPagePassword).toBeDisplayed();

        const userNameValue = await loginPageUsername.getValue();
        const passwordValue = await loginPagePassword.getValue();

        console.log(`Username value: ${userNameValue}, Password value: ${passwordValue}`);
        await expect(userNameValue).toBe('');
        await expect(passwordValue).toBe('');
    });

    it('should check saving the cart after logout', async () => {
        await browser.url('https://www.saucedemo.com/');
    
        const inputUsername = $('#user-name');
        const inputPassword = $('#password');
        const loginBtn = $('#login-button');
    
        await inputUsername.setValue('standard_user');
        await inputPassword.setValue('secret_sauce');
        await loginBtn.click();
    
        const addToCartBtn = $('#add-to-cart-sauce-labs-backpack');
        const burgerBtn = $('#react-burger-menu-btn');
    
        await addToCartBtn.click();
        const cartIcon = $('.shopping_cart_badge');
        const removeBtn = $('#remove-sauce-labs-backpack');
    
        let cartIconValue = await cartIcon.getText();
        console.log(cartIconValue);
        await expect(cartIconValue).toBe('1');
        await expect(removeBtn).toBeDisplayed();
    
        await burgerBtn.click();
        await browser.pause(2000);
    
        const bmMenu = $('.bm-menu');
        await expect(bmMenu).toBeDisplayed();
        console.log('bmMenu:', bmMenu);
    
        const allItems = $('#inventory_sidebar_link');
        const about = $('#about_sidebar_link');
        const logout = $('#logout_sidebar_link');
        const resetAppState = $('#reset_sidebar_link');
    
        await expect(allItems).toBeDisplayed();
        await expect(about).toBeDisplayed();
        await expect(logout).toBeDisplayed();
        await expect(resetAppState).toBeDisplayed();
    
        await logout.click();
        await browser.pause(2000);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    
        const loginPageUsername = $('#user-name');
        const loginPagePassword = $('#password');
    
        await expect(loginPageUsername).toBeDisplayed();
        await expect(loginPagePassword).toBeDisplayed();
    
        const userNameValue = await loginPageUsername.getValue();
        const passwordValue = await loginPagePassword.getValue();
    
        console.log(`Username value: ${userNameValue}, Password value: ${passwordValue}`);
        await expect(userNameValue).toBe('');
        await expect(passwordValue).toBe('');
    
        await inputUsername.setValue('standard_user');
        await inputPassword.setValue('secret_sauce');
        await loginBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    
        cartIconValue = await cartIcon.getText();
        console.log(cartIconValue);
        await expect(cartIconValue).toBe('1');
    
        const cartBtn = $('.shopping_cart_link');
        await cartBtn.click();
        await browser.pause(2000);
        
        const itemName = $('.inventory_item_name');
        let itemNameValue = await itemName.getText();
        console.log(itemNameValue);
        await expect(itemNameValue).toBe('Sauce Labs Backpack');

        await removeBtn.click()
    });

    it('should check the sorting', async () => {
        await browser.url('https://www.saucedemo.com/');
        
        const inputUsername = $('#user-name');
        const inputPassword = $('#password');
        const loginBtn = $('#login-button');
        
        await inputUsername.setValue('standard_user');
        await inputPassword.setValue('secret_sauce');
        await loginBtn.click();
        
        const productSort = $('.product_sort_container');
        await productSort.waitForClickable({ timeout: 5000 });
        await productSort.click();
    
        const nameAZ = $('[value="az"]');
        const nameZA = $('[value="za"]');
        const nameLow = $('[value="lohi"]');
        const nameHigh = $('[value="hilo"]');

        await nameZA.waitForEnabled({ timeout: 5000 });
        await nameZA.click();
    
        const inventoryContainer = await $('#inventory_container');

        await inventoryContainer.waitForDisplayed({ timeout: 5000 });
        await expect(inventoryContainer).toBeDisplayed();
        
        await productSort.click();
        await nameLow.waitForEnabled({ timeout: 5000 });
        await nameLow.click();
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });
        await expect(inventoryContainer).toBeDisplayed();

        await productSort.click();
        await nameHigh.waitForEnabled({ timeout: 5000 });
        await nameHigh.click();
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });
        await expect(inventoryContainer).toBeDisplayed();

        await productSort.click();
        await nameAZ.waitForEnabled({ timeout: 5000 });
        await nameAZ.click();
        await inventoryContainer.waitForDisplayed({ timeout: 5000 });
        await expect(inventoryContainer).toBeDisplayed();
    });

    it('should check footer links', async () => {
        await browser.url('https://www.saucedemo.com/');
        
        const inputUsername = $('#user-name');
        const inputPassword = $('#password');
        const loginBtn = $('#login-button');
        
        await inputUsername.setValue('standard_user');
        await inputPassword.setValue('secret_sauce');
        await loginBtn.click();
    
        const footerLinks = $('.footer');
        await footerLinks.scrollIntoView();
    
        const twitterIcon = $('[href="https://twitter.com/saucelabs"]');
        const facebookIcon = $('[href="https://www.facebook.com/saucelabs"]');
        const linkedinIcon = $('[href="https://www.linkedin.com/company/sauce-labs/"]');
    
        await twitterIcon.click();
        await browser.switchWindow('https://x.com/saucelabs');
        await expect(browser).toHaveUrl('https://x.com/saucelabs');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');
    
        await facebookIcon.click();
        await browser.switchWindow('https://www.facebook.com/saucelabs');
        await expect(browser).toHaveUrl('https://www.facebook.com/saucelabs');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');
    
        await linkedinIcon.click();
        await browser.switchWindow('https://www.linkedin.com/company/sauce-labs/');
        await expect(browser).toHaveUrl('https://www.linkedin.com/company/sauce-labs/');
        await browser.switchWindow('https://www.saucedemo.com/inventory.html');
    });

    it('should check valid checkout', async () => {
        await browser.url('https://www.saucedemo.com/');
        
        const inputUsername = $('#user-name');
        const inputPassword = $('#password');
        const loginBtn = $('#login-button');
        
        await inputUsername.setValue('standard_user');
        await inputPassword.setValue('secret_sauce');
        await loginBtn.click();
        await browser.pause(2000)
        
    
        const addToCartBtn = $('#add-to-cart-sauce-labs-backpack');
        const cartIcon = $('.shopping_cart_badge');
        const productName = $('.inventory_item_name');
        const productPrice = $('.inventory_item_price');

        await addToCartBtn.waitForEnabled({timeout: 5000})
        await addToCartBtn.click();
        await cartIcon.waitForDisplayed();
        let cartIconValue = await cartIcon.getText();
        console.log(cartIconValue);
        await expect(cartIconValue).toBe('1');

        let productNameText = await productName.getText();
        console.log(productNameText);
        let productPriceText = await productPrice.getText();
        console.log(productPriceText);

        await cartIcon.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        const cartProductName = $('.inventory_item_name');
        let cartProductNameText = await cartProductName.getText();
        console.log(cartProductNameText);
        await expect(productNameText).toBe(cartProductNameText);

        const checkoutBtn = $('#checkout');
        await checkoutBtn.click();

        const randomFirstName = getRandomString(10);
        const randomLastName = getRandomString(10);
        const randomPostalCode = getRandomNumber(5);

        const inputFirstName = $('#first-name');
        const inputLastName = $('#last-name');
        const inputPostalCode = $('#postal-code');

        await inputFirstName.setValue(randomFirstName);
        expect(await inputFirstName.getValue()).toBe(randomFirstName);
        await inputLastName.setValue(randomLastName);
        expect(await inputLastName.getValue()).toBe(randomLastName);
        await inputPostalCode.setValue(randomPostalCode);
        expect(await inputPostalCode.getValue()).toBe(randomPostalCode);

        const continueBtn = $('#continue');
        await continueBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');

        const checkoutProductName = $('.inventory_item_name');
        const checkoutProductPrice = $('.inventory_item_price');
        let checkoutProductNameText = await checkoutProductName.getText();
        let checkoutProductPriceText = await checkoutProductPrice.getText();
        await expect(checkoutProductNameText).toBe(productNameText);
        await expect(checkoutProductPriceText).toBe(productPriceText);

        const finishBtn = $('#finish');
        await finishBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');

        const thankMessage = $('.complete-header');
        let thankMessageText = await thankMessage.getText();
        await expect(thankMessageText).toBe('Thank you for your order!');

        const backBtn = $('#back-to-products');
        await backBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        const products = $('#inventory_container');
        await expect(products).toBeDisplayed();
        const shoppingCart = $('.shopping_cart_link')
        expect(await shoppingCart.getText()).toBe('');
    });

    it('should check checkout without products', async () => {

        await browser.url('https://www.saucedemo.com/');
    
        const inputUsername = $('#user-name');
        const inputPassword = $('#password');
        const loginBtn = $('#login-button');
    
        await inputUsername.setValue('standard_user');
        await inputPassword.setValue('secret_sauce');
        await loginBtn.click();
    
        const shoppingCart = $('.shopping_cart_link');
        await shoppingCart.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
    
        const checkoutBtn = $('#checkout');
        await checkoutBtn.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
    
        const emptyCartMessage = $('#empty-cart-error-message');
        await expect(emptyCartMessage).toHaveText('Cart is empty');

    //The test is failed due to the bug on the website.
        
    });
})