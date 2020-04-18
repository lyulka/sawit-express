import React from 'react';

import { Form, Input, Button, DatePicker, PageHeader } from 'antd';
import HargaTonaseInput from './HargaTonaseInput.jsx';

const OARBeliAdd = () => {

    const fieldAndLabelNames = [
        [ "cpo", "CPO" ],
        [ "pk", "PK" ],
        [ "cangkang", "Cangkang" ],
        [ "ring1", "Ring 1" ],
        [ "rampLuar", "Ramp Luar" ],
        [ "ptpn", "PTPN" ],
        [ "inti", "Inti" ],
        [ "plasma1", "Plasma 1" ],
        [ "plasma3", "Plasma 3" ],
        [ "hkl", "HKL" ],
        [ "hka", "HKA" ],
        [ "hkla", "HKLA" ],
        [ "ss", "SS" ]
    ]

    const onFinish = (values) => {
        for (const key of Object.keys(values)) {
            if (values[key] === undefined) { values[key] = 0 };
        }
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

            {fieldAndLabelNames.map((fieldLabelPair) => {
                return (
                    <HargaTonaseInput
                        fieldName={fieldLabelPair[0]}
                        label={fieldLabelPair[1]}
                        />
                );
            })}

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