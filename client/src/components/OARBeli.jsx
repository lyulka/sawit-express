import React from 'react';

import OARBeliAdd from './OARBeliAdd';
import { Route } from 'react-router-dom';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons'


const OARBeli = () => {
    return (
        <div style={{ paddingTop: '16px' }}>
            <Button 
                type="dashed" 
                style={{ width: '100%' }}
                icon={<PlusOutlined />}
                href='/OARBeli/add'>
                Add OAR Beli
            </Button>
            <Table>

            </Table>
        </div>
    )
};

export default OARBeli;