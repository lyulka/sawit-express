import React from 'react';

import { Form, Input, Button, DatePicker, PageHeader } from 'antd';
import HargaTonaseInput from './HargaTonaseInput.jsx';

const OARBeliAdd = () => {

    const onFinish = (values) => {
        for (const key of Object.keys(values)) {
            if (values[key] === undefined) { values[key] = 0 };
        }

        console.log('Success:', values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <div>

        <PageHeader
            onBack={() => window.history.back()}
            title="🌴 Add new OAR Beli">
        </PageHeader>

        <Form
            name="oarbeli_form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{ span: 4 }}
        >
            <Form.Item name={'date'} label={'Date'}>
                <DatePicker style={{width: '100%'}}/>
            </Form.Item>

            <HargaTonaseInput
                label="CPO"
                fieldName="cpo"
            />

            <HargaTonaseInput
                label="PK"
                fieldName="pk"
            />

            <HargaTonaseInput
                label="Cangkang"
                fieldName="cangkang"
            />

            <HargaTonaseInput
                label="Harga beli"
                fieldName="hargabeli"
            />

            <HargaTonaseInput
                label="Supplier"
                fieldName="supplier"
            />
            <HargaTonaseInput
                label="Ramp luar"
                fieldName="rampluar"
            />

            <HargaTonaseInput
                label="PTPN"
                fieldName="ptpn"
            />

            <HargaTonaseInput
                label="Inti"
                fieldName="inti"
            />

            <HargaTonaseInput
                label="Plasma 1"
                fieldName="plasma1"
            />

            <HargaTonaseInput
                label="Plasma 3"
                fieldName="plasma3"
            />
            <HargaTonaseInput
                label="HKL"
                fieldName="hkl"
            />

            <HargaTonaseInput
                label="HKA"
                fieldName="hka"
            />
            <HargaTonaseInput
                label="SS"
                fieldName="ss"
            />

            <Form.Item
                label="Kos Olah"
                name="kosolah">
                <Input
                    type="number"
                    suffix="Rp/kg"
                />

            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{float: 'right'}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default OARBeliAdd;