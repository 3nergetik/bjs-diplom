"use strics";

let userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success === true) {
            location.reload;
        } else {
            userForm.setLoginErrorMessage('Ошибка авторизации');
        }
    });
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success === true) {
            userForm.id = response.id;
            location.reload();
        } else {
            userForm.setRegisterErrorMessage('Ошибка регистрации');
        }
    });
}