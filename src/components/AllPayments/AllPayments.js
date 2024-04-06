import React, {useEffect, useState} from 'react';
import {authStorage} from "../../storages/AuthStorage";
import {applicationStorage} from "../../storages/ApplicationStorage";
import {checkAuth, getAllMethods, getAllApplications} from "../../Requests";
import './AllPayments.css'
import AllPaymentRow from "./AllPaymentRow/AllPaymentRow";

const AllPayments = () => {
    const key = authStorage((state) => state.key)
    let applications = applicationStorage((state) => state.applications)
    const resetApplications = applicationStorage((state) => state.resetApplications)
    const [authented, setAuth] = useState(true)
    async function onLoadPage(){
        const result = await checkAuth(key)
        const methods = await getAllMethods()
        const methodsDict = {}
        for (var method of methods['result']) {
            methodsDict[method['PaymentMethods']['id']] = method['PaymentMethods']['name']
        }
        const apps = await getAllApplications(key)
        // console.log(apps)
        const new_apps = apps.map((app) => {
            let data = {}
            data[app['PayApplications']['foreign_id']] = [app['PayApplications']['amount'], app['PayApplications']['requisite'],
                methodsDict[app['PayApplications']['method_id']], app['PayApplications']['client_initials'],
                app['PayApplications']['status'], app['PayApplications']['express'], app['PayApplications']['created_at'], app['PayApplications']['closed_at']]
            return data
        })
        resetApplications(new_apps)
        setAuth(result)
        return methodsDict
    }

    useEffect(() => {

    }, [applications]);
    window.addEventListener('load', () => {
        onLoadPage()
    })

    function clickButton(el_id){
        if (el_id === 'all') {
            window.location.reload()
        } else {
            resetApplications([])
            window.location.href = '/payments'
        }
    }
    // }
    if (authented === true) {
        return (
            <div className='payments_apps_container'>
                <h2>Выплаты</h2>
                <div className='payments_buttons_container'>
                    <button id='active' className='payments_submit' onClick={() => clickButton('active')}>Активные</button>
                    <button id='all' className='payments_submit clicked' onClick={() => clickButton('all')}>Все</button>
                </div>
                <table>

                </table>
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
                            <th>Время закрытия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applications.map((element) => {return AllPaymentRow(element)})}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        window.location.href = '/auth'
    }

};

export default AllPayments;