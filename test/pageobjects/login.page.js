
class loginPage {
    
    get inputUsername () { return $('#user-name'); }
    get inputPassword () { return $('#password'); }
    get loginBtn () { return $('#login-button'); }
    get xMark () { return $('.error_icon'); }
    get errorMessage () { return $('h3'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }

    async submit () {
        await this.loginBtn.click();
    }
}

export default new loginPage();
