const baseUrl = 'https://norma.nomoreparties.space/api/';

export const request = (endpoint, options) => {
    const url = `${baseUrl}${endpoint}`;
    return fetch(url, options)
        .then(checkResponse)
        .then(checkSuccess);
}

const checkResponse = (response) => {
    if (response && response.ok) {
        return response.json()
    } else {
        return Promise.reject(`Error with status code ${response.status} ${response.statusText}`);
    }
}

const checkSuccess = (response) => {
    if (response && response.success) {
        return response;
    } else {
        return Promise.reject(`Response is not success ${response}`);
    }
}
