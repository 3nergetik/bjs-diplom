"use strics";

// Выход из личного кабинета
let logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success === true) {
            location.reload();
        } else {
            console.error(response.error);
        }
    });
}

// Получение информации о пользователе
let current = ApiConnector.current((response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.error('Ошибка профиля');
    }
});

// Получение текущих курсов валюты
let ratesBoard = new RatesBoard();

function getCurrency() {
    ApiConnector.getStocks((response) => {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        } else {
            console.error('Ошибка получения курсов валют');
        }
    });
}

getCurrency();

setInterval(getCurrency(), 60000);

// Операции с деньгами
let moneyManager = new MoneyManager();

// Пополнение баланса
moneyManager.addMoneyCallback = ((data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success === true) {
            showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен");
        } else {
            console.error("Ошибка пополнения баланса");
        }
    });
});

// Конвертирование валюты
moneyManager.conversionMoneyCallback = ((data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success === true) {
            showProfile(response.data);
            setMessage(true, "Конвертация завершена успешно");
        } else {
            console.error("Ошибка конвертации");
        }
    });
});

// Перевод валюты
moneyManager.sendMoneyCallback = ((data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success === true) {
            showProfile(response.data);
            setMessage(true, "Перевод завершен успешно");
        } else {
            console.error("Ошибка перевода");
        }
    });
});

// Работа с избранным
let favoritesWidget = new FavoritesWidget();

// Запросить начальный список избранного
ApiConnector.getFavorites = ((response) => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

// Добавление в список избранного
favoritesWidget.addUserCallback = ((data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage
        }
    });
});