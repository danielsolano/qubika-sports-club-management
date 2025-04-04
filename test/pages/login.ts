class LoginPage {

    get usernameInput() {
        return $('[formcontrolname="email"]');
    }

    get passwordInput() {
        return $('[formcontrolname="password"]');
    }

    get loginBtn() {
        return $('//button[contains(text(),"Autenticar")]');
    }

    async login(username: string, password: string) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginBtn.click();
    }
}

export default new LoginPage();
