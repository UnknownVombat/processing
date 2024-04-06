import React from 'react';

const AllPaymentRow = (element) => {
    const key = Object.keys(element)
    // const style = {true: styles.row_true, false: null}
    return (
        <tr>
            <th>{key}</th>
            <th>{element[key][0]}</th>
            <th>{element[key][1]}</th>
            <th>{element[key][2]}</th>
            <th>{element[key][3]}</th>
            <th>{element[key][4]}</th>
            <th>{element[key][6]}</th>
            <th>{element[key][7]}</th>
        </tr>
    );
};

export default AllPaymentRow;