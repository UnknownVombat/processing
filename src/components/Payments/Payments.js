import React, {useEffect, useRef, useState} from 'react';
import {authStorage} from "../../storages/AuthStorage";
import {applicationStorage} from "../../storages/ApplicationStorage";
import {checkAuth, getActiveApplications, getAllMethods} from "../../Requests";
import './Payments.css'
import PaymentRow from "./PaymentRow/PaymentRow";

const Payments = () => {
    const key = authStorage((state) => state.key)
    const applications = applicationStorage((state) => state.applications)
    const resetApplications = applicationStorage((state) => state.resetApplications)
    const [authented, setAuth] = useState(true)
    const [connected, setConnected] = useState(false)
    const [count, setCount] = useState(0)
    const [methods, setMethods] = useState({})
    const socket = useRef()
    function connect() {
        socket.current = new WebSocket('wss://proc.sunrise-dev.online/applications/ws/new_applications/' + key)

        socket.current.onopen = () => {
            console.log('Я открылся')
        }
        socket.current.onmessage = (message) => {
            console.log('Получил сообщение')
            const data = JSON.parse(message.data)
            const objKey = data['foreign_id']
            const obgArray = [data['amount'], data['requisite'], methods[data['method_id']], data['client_initials'],
                data['status'], data['express'], data['created_at']]
            let chunk = {}
            chunk[objKey] = obgArray
            applications.unshift(chunk)
            resetApplications(applications)
            setCount(count + 1)
            console.log('Need rerender')
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = (event) => {
            console.log('Socket произошла ошибка')
            console.log(event)
        }
    }
    async function onLoadPage(){
        const result = await checkAuth(key)
        const methods = await getAllMethods()
        const methodsDict = {}
        for (var method of methods['result']) {
            methodsDict[method['PaymentMethods']['id']] = method['PaymentMethods']['name']
        }
        setMethods(methodsDict)
        const apps = await getActiveApplications(key)
        const new_apps = apps.map((app) => {
            let data = {}
            data[app['PayApplications']['foreign_id']] = [app['PayApplications']['amount'], app['PayApplications']['requisite'],
                methodsDict[app['PayApplications']['method_id']], app['PayApplications']['client_initials'],
                app['PayApplications']['status'], app['PayApplications']['express'], app['PayApplications']['created_at']]
            return data
        })
        resetApplications(new_apps)
        setAuth(result)
        if (connected === false) {
            connect()
            setConnected(true)
        }
        return methodsDict
    }

    useEffect(() => {
        console.log('rerender')
    }, [applications, resetApplications, count]);
    window.addEventListener('load', () => {
        onLoadPage()
    })

    function clickButton(el_id){
        if (el_id === 'active') {
            window.location.reload()
        } else {
            window.location.href = '/history'
        }
    }
    // }
    if (authented === true) {
        try {
            return (
                <div className='payments_apps_container'>
                    <h2>Выплаты</h2>
                    <div className='payments_buttons_container'>
                        <button id='active' className='payments_submit clicked' onClick={() => clickButton('active')}>Активные</button>
                        <button id='all' className='payments_submit' onClick={() => clickButton('all')}>Все</button>
                    </div>
                    <div className='payments_table_container'>
                        <table>
                            <thead>
                            <tr>
                                <th>Айди заявки</th>
                                <th>Сумма</th>
                                <th>Реквизиты</th>
                                <th>Метод</th>
                                <th>ФИО</th>
                                <th>Статус</th>
                                <th>Время создания</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {applications.map((element) => {return PaymentRow(element, key)})}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } catch (e) {
            alert(e)
            // window.location.reload()
            // window.location.href = '/payments'
        }
    } else {
        window.location.href = '/auth'
    }

};

export default Payments;