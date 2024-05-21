import { $ } from '@wdio/globals'


class LoginPage {
    
    get inputUsername () { return $('#user-name'); }
    get inputPassword () { return $('#password'); }
    get loginBtn () { return $('#login-button'); }
    get xMark () { return $('.error_icon'); }
    get errorMessage () { return $('h3'); }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }

    async submit () {
        await this.loginBtn.click();
    }
}

export default new LoginPage();
