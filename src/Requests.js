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
        const response = await fetch(url, {method: 'POST', body: JSON.stringify(data), headers: headers})
        console.log(response)
        if (!response.ok){
            return false
        }
        const result = await response.json()
        return {'result': result['success'], 'token': result['access_token']}
    } catch (error) {
        console.error('Ошибка авторизации: ', error)
        return false
    }
}

export async function logoutUser(key) {
    const url = base_url + '/users/logout'
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'GET', headers: headers})
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

export async function switchActive(active, key) {
    const url = base_url + '/users/switch_active'
    const status = {true: 'active', false: 'paused'}
    console.log(status[active])
    const data = {'status': status[active]}
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'POST', body: JSON.stringify(data), headers: headers})
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

export async function checkAuth(key) {
    const url = base_url + '/users/check_auth'
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'GET', headers: headers})
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

export async function getWorkers(key) {
    const url = base_url + '/users/get'
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'GET', headers: headers})
        console.log(response)
        if (!response.ok){
            return false
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка авторизации: ', error)
        return false
    }
}

export async function getMethods(key) {
    const url = base_url + '/teams/methods'
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'GET', headers: headers})
        console.log(response)
        if (!response.ok){
            return false
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка авторизации: ', error)
        return false
    }
}

export async function getAllMethods() {
    const url = base_url + '/methods/get'
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*'}
    try {
        const response = await fetch(url, {method: 'GET', headers: headers})
        console.log(response)
        if (!response.ok){
            return false
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка авторизации: ', error)
        return false
    }
}

export async function switchMethodActive(team_id, method_id, active, key) {
    const url = base_url + '/teams/method/switch_active'
    console.log(active)
    const data = {'team_id': team_id, 'method_id': method_id, 'active': !active}
    console.log(data)
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'POST', body: JSON.stringify(data), headers: headers})
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

export async function deleteSession(key, user_id) {
    const url = base_url + '/users/session'
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    const data = {'user_id': user_id}
    try {
        const response = await fetch(url, {method: 'DELETE', body: JSON.stringify(data), headers: headers})
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

export async function addNewMethod(method_id, key) {
    const url = base_url + '/teams/add_method'
    const data = {'method_id': method_id}
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'POST', body: JSON.stringify(data), headers: headers})
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

export async function addBot(bot_token, bot_name, key) {
    const url = base_url + '/users/bot'
    const data = {'bot_token': bot_token, 'bot_name': bot_name}
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'POST', body: JSON.stringify(data), headers: headers})
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

export async function getActiveApplications(key) {
    const url = base_url + '/applications/get'
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'GET', headers: headers})
        console.log(response)
        if (!response.ok){
            return false
        }
        const result = await response.json();
        return result['result']
    } catch (error) {
        console.error('Ошибка авторизации: ', error)
        return false
    }
}

export async function getAllApplications(key) {
    const url = base_url + '/applications/get/success'
    const headers = {
        'accept': 'application/json',
        'accept-encoding': 'gzip,deflate,br',
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Authorization': key}
    try {
        const response = await fetch(url, {method: 'GET', headers: headers})
        console.log(response)
        if (!response.ok){
            return false
        }
        const result = await response.json();
        return result['result']
    } catch (error) {
        console.error('Ошибка авторизации: ', error)
        return false
    }
}
