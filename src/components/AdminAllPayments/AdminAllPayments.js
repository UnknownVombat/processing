import React, {useState} from 'react';
import {authStorage} from "../../storages/AuthStorage";
import {applicationStorage} from "../../storages/ApplicationStorage";
import {getAdminAllApplications, getAllMethods} from "../../Requests";
import adminAuth from "../AdminAuth/AdminAuth";

const AdminAllPayments = () => {
    const key = authStorage((state) => state.key)
    let applications = applicationStorage((state) => state.applications)
    const resetApplications = applicationStorage((state) => state.resetApplications)
    const [authented, setAuth] = useState(true)
    async function onLoadPage(){
        const result = await adminAuth(key)
        const methods = await getAllMethods()
        const methodsDict = {}
        for (var method of methods['result']) {
            methodsDict[method['PaymentMethods']['id']] = method['PaymentMethods']['name']
        }
        const apps = await getAdminAllApplications(key)
        console.log(apps)
        const new_apps = apps.map((app) => {
            let data = {}
            data[app['PayApplications']['foreign_id']] = [app['PayApplications']['team_id'], app['PayApplications']['worker_id'], app['PayApplications']['amount'], app['PayApplications']['requisite'],
                methodsDict[app['PayApplications']['method_id']], app['PayApplications']['client_initials'],
                app['PayApplications']['status'], app['PayApplications']['express'], app['PayApplications']['created_at'], app['PayApplications']['closed_at']]
            return data
        })
        resetApplications(new_apps)
        setAuth(result)
        return methodsDict
    }

    window.addEventListener('load', () => {
        onLoadPage()
    })

    if (authented === true) {
        return (
            <div className='payments_apps_container'>
                <h2>Все сделки</h2>
                <div className='payments_table_container'>
                    <table>
                        <thead>
                        <tr>
                            <th>Айди заявки</th>
                            <th>Айди команды</th>
                            <th>Айди юзера</th>
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
                        {applications.map((element) => {
                            const key = Object.keys(element)
                            return (
                            <tr>
                                <th>{key}</th>
                                <th>{element[key][0]}</th>
                                <th>{element[key][1]}</th>
                                <th>{element[key][2]}</th>
                                <th>{element[key][3]}</th>
                                <th>{element[key][4]}</th>
                                <th>{element[key][5]}</th>
                                <th>{element[key][6]}</th>
                                <th>{element[key][7]}</th>
                                <th>{element[key][8]}</th>
                            </tr>
                        )})}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        window.location.href = '/admin/auth'
    }

};

export default AdminAllPayments;