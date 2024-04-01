const base_url = 'http://127.0.0.1:8000'

export async function loginUser(login, password, ip, city) {
    const url = base_url + '/users/login'
    const data = {'login': login, 'password': password, 'ip': ip, 'city': city}
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*'}
    try {
        const response = await fetch(url, {method: 'POST', body: JSON.stringify(data), headers: headers, credentials: "include"})
        console.log(response)
        if (!response.ok){
            return false
        }
        const result = await response.json()
        return result['success'] === true;
    } catch (error) {
        console.error('Ошибка авторизации: ', error)
        return false
    }
}

export async function logoutUser() {
    const url = base_url + '/users/logout'
    try {
        const response = await fetch(url, {method: 'GET', credentials: "include"})
        console.log(response)
        if (!response.ok){
            return false
        }
        const result = await response.json()
        return result['success'] === true;
    } catch (error) {
        console.error('Ошибка выхода: ', error)
        return false
    }
}

export async function switchActive(active) {
    const url = base_url + '/users/switch_active'
    const status = {true: 'active', false: 'paused'}
    console.log(status[active])
    const data = {'status': status[active]}
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*'}
    try {
        const response = await fetch(url, {method: 'POST', body: JSON.stringify(data), headers: headers, credentials: "include"})
        console.log(response)
        if (!response.ok){
            return false
        }
        const result = await response.json()
        return result['access'] === true;
    } catch (error) {
        console.error('Ошибка авторизации: ', error)
        return false
    }
}

export async function checkAuth() {
    const url = base_url + '/users/check_auth'
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*'}
    try {
        const response = await fetch(url, {method: 'GET', headers: headers, credentials: "include"})
        console.log(response)
        if (!response.ok){
            return false
        }
        const result = await response.json()
        return result['access'] === true;
    } catch (error) {
        console.error('Ошибка авторизации: ', error)
        return false
    }
}
