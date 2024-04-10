import React, {useEffect, useRef, useState} from 'react';
import {authStorage} from "../../storages/AuthStorage";
import {applicationStorage} from "../../storages/ApplicationStorage";
import './Payments.css'
import PaymentRow from "./PaymentRow/PaymentRow";
import { io } from 'socket.io-client';
import {userapi} from "../../api/userApi";
import {methodsapi} from "../../api/methodsApi";
import {applicationsapi} from "../../api/applicationsApi";
import {useNavigate} from "react-router-dom";

const Payments = () => {
    const key = authStorage((state) => state.key)
    const applications = applicationStorage((state) => state.applications)
    const resetApplications = applicationStorage((state) => state.resetApplications)
    const methods = applicationStorage((state) => state.methods)
    const resetMethods = applicationStorage((state) => state.resetMethods)

    const header = {'Authorization': key}
    const {data: authData, error: authError} = userapi.useAuthQuery(header)
    const {data: methodsData, error: methodsError} = methodsapi.useMethodsQuery(header)
    const {data: applicationsData, error: applicationsError} = applicationsapi.useActiveApplicationsQuery(header)

    const [authented, setAuth] = useState(true)
    const [connected, setConnected] = useState(false)
    const [count, setCount] = useState(0)
    const socket = useRef()
    const navigate = useNavigate()
    function connect() {
        socket.current = new io('wss://proc.sunrise-dev.online/applications/ws/new_applications/' + key + '/')

        socket.current.onopen = () => {
            console.log('Я открылся')
            console.log(connected)
        }
        // socket.current.on('open', () => {
        //     console.log('Я открылся')
        // })
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
            setCount(objKey)
        }
        socket.current.onclose= () => {
            console.log('Socket закрыт')
        }
        socket.current.onerror = (event) => {
            console.log('Socket произошла ошибка')
            console.log(event)
        }
    }
    if (authData) {
        setAuth(authData['access'])
        if (authData['access']) {
            connect()
            setConnected(true)
        }
    }
    if (authError) {
        console.error(authError)
    }
    if (methodsData) {
        if (methodsData['access'] === true) {
            const methodsDict = {}
            for (var method of methodsData['result']) {
                methodsDict[method['PaymentMethods']['id']] = method['PaymentMethods']['name']
            }
            resetMethods(methodsDict)
        }
    }
    if (methodsError) {
        console.error(methodsError)
    }

    if (applicationsData) {
        const apps = applicationsData['result']
        const new_apps = apps.map((app) => {
            let data = {}
            data[app['PayApplications']['foreign_id']] = [app['PayApplications']['amount'], app['PayApplications']['requisite'],
                methods[app['PayApplications']['method_id']], app['PayApplications']['client_initials'],
                app['PayApplications']['status'], app['PayApplications']['express'], app['PayApplications']['created_at']]
            return data
        })
        resetApplications(new_apps)
    }
    if (applicationsError) {
        console.error(applicationsError)
    }
    useEffect(() => {
        console.log('rerender')
    }, [count]);
    function clickButton(el_id){
        if (el_id === 'active') {
            window.location.reload()
        } else {
            navigate('/history')
        }
    }
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
            window.location.reload()
            // window.location.href = '/payments'
        }
    } else {
        window.location.href = '/auth'
    }

};

export default Payments;