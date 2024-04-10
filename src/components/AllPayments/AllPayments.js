import React, {useEffect, useState} from 'react';
import {authStorage} from "../../storages/AuthStorage";
import {applicationStorage} from "../../storages/ApplicationStorage";
import './AllPayments.css'
import AllPaymentRow from "./AllPaymentRow/AllPaymentRow";
import {userapi} from "../../api/userApi";
import {methodsapi} from "../../api/methodsApi";
import {applicationsapi} from "../../api/applicationsApi";
import {useNavigate} from "react-router-dom";

const AllPayments = () => {
    const key = authStorage((state) => state.key)
    const applications = applicationStorage((state) => state.applications)
    const resetApplications = applicationStorage((state) => state.resetApplications)
    const methods = applicationStorage((state) => state.methods)
    const resetMethods = applicationStorage((state) => state.resetMethods)

    const header = {'Authorization': key}
    const {data: authData, error: authError} = userapi.useGetAuth(header)
    const {data: methodsData, error: methodsError} = methodsapi.useGetMethods(header)
    const {data: applicationsData, error: applicationsError} = applicationsapi.useGetAllApplications(header)

    const [authented, setAuth] = useState(true)
    const navigate = useNavigate()
    if (authData) {
        setAuth(authData['access'])
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
    // async function onLoadPage(){
    //     const result = await checkAuth(key)
    //     const methods = await getAllMethods()
    //     const methodsDict = {}
    //     for (var method of methods['result']) {
    //         methodsDict[method['PaymentMethods']['id']] = method['PaymentMethods']['name']
    //     }
    //     const apps = await getAllApplications(key)
    //     // console.log(apps)
    //     const new_apps = apps.map((app) => {
    //         let data = {}
    //         data[app['PayApplications']['foreign_id']] = [app['PayApplications']['amount'], app['PayApplications']['requisite'],
    //             methodsDict[app['PayApplications']['method_id']], app['PayApplications']['client_initials'],
    //             app['PayApplications']['status'], app['PayApplications']['express'], app['PayApplications']['created_at'], app['PayApplications']['closed_at']]
    //         return data
    //     })
    //     resetApplications(new_apps)
    //     setAuth(result)
    //     return methodsDict
    // }

    useEffect(() => {

    }, [applications]);

    function clickButton(el_id){
        if (el_id === 'all') {
            window.location.reload()
        } else {
            resetApplications([])
            navigate('/payments')
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