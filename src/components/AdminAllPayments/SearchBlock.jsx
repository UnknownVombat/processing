import React from 'react';
import { adminFilterStorage } from '../../storages/FilterStorage';
import styles from './SearchBlock.module.css'

function SearchBlock() {
    const { searchText } = adminFilterStorage;

    const showPaid = adminFilterStorage((state) => state.showPaid)
    const showCanceled = adminFilterStorage((state) => state.showCanceled)
    const showPending = adminFilterStorage((state) => state.showPending)

    const setSearchText = adminFilterStorage((state) => state.setSearchText)
    const setShowPaid = adminFilterStorage((state) => state.setShowPaid)
    const setShowPending = adminFilterStorage((state) => state.setShowPending)
    const setShowCanceled = adminFilterStorage((state) => state.setShowCanceled)

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchText(value);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'showPaid') {
            setShowPaid(checked);
        } else if (name === 'showPending') {
            setShowPending(checked);
        } else if (name === 'showCanceled') {
            setShowCanceled(checked);
        }
    };

    return (
        <div className={styles.block}>
            <input 
                type="text" 
                name="searchText" 
                value={searchText} 
                onChange={handleInputChange} 
                placeholder="ID, Реквизиты или сумма..."
                className={styles.input}
            />
            <label>
                <input 
                    type="checkbox" 
                    name="showPaid" 
                    checked={showPaid} 
                    onChange={handleCheckboxChange} 
                />
                Оплаченные
            </label>
            <label>
                <input 
                    type="checkbox" 
                    name="showPending" 
                    checked={showPending} 
                    onChange={handleCheckboxChange} 
                />
                В ожидании
            </label>
            <label>
                <input 
                    type="checkbox" 
                    name="showCanceled" 
                    checked={showCanceled} 
                    onChange={handleCheckboxChange} 
                />
                Отмененные
            </label>
        </div>
    );
}

export default SearchBlock;
