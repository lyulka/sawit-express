import React, { useEffect, useState } from 'react';

import OARBeliAdd from './OARBeliAdd';
import { Route, Link } from 'react-router-dom';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons'


const OARBeli = () => {
    const [ tempData, setTempData ] = useState('uninitialized'); 
    const [ oarbeliCollection, setOarbeliCollection ] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         await fetch(
    //             "https://hn.algolia.com/api/v1/search?query=redux"
    //         )
    //         .then((response) => {
    //             return response.text();
    //         }).then((text) => {
    //             setTempData(text);
    //         })
    //     }
    //     fetchData();
    // }, [])

    return (
        <div style={{ paddingTop: '16px' }}>
            <Button 
                type="dashed" 
                style={{ width: '100%' }}
                icon={<PlusOutlined />}>
                <Link to='/OARBeli/add'>Add OAR Beli</Link>
            </Button>
            <Table>

            </Table>
        </div>
    )
};

export default OARBeli;