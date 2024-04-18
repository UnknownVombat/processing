import React from 'react';
import styles from './PanelHeader.module.css'
import full_logo from '../../../logo/logo512.png'

const PanelHeader = () => {
    return (
        <div className={styles.title}>
            <img src={full_logo} alt='Red dota' />
        </div>
    );
};

export default PanelHeader;