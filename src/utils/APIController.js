const address = "192.168.43.117";
const port = "8080";

export default class APIController {
    static async loginPost(login, password) {
        const rawResponse = await fetch('http://' + address + ':' + port + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password})
        });
        return await rawResponse.json();
    }

    static async signupPost(login, password) {
        const rawResponse = await fetch('http://' + address + ':' + port + '/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password})
        });
        return await rawResponse.json();
    }

    static async calculatorPost(first, second, operation, token) {
        const rawResponse = await fetch('http://' + address + ':' + port + '/calculator', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({first: first, second: second, operation: operation, token: token})
        });
        return await rawResponse.json();
    }
    static async converterPost(first, second, value, token) {
        const rawResponse = await fetch('http://' + address + ':' + port + '/currency', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({first: first, second: second, value: value, token: token})
        });
        return await rawResponse.json();
    }
}