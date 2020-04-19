import React from 'react';
import { useState } from 'react';

import { useParams, Redirect } from 'react-router-dom'; 
import { Form, Input, Button, DatePicker, PageHeader, message } from 'antd';
import HargaTonaseInput from './HargaTonaseInput.jsx';

const OARBeliEdit = () => {

    const entryId = useParams().id;

    const [ finished, setFinished ] = useState(false);

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

    const validateMessages = {
        required: '${label} is required!',
        number: '${label} must be a positive number'
    }

    const postEditOarbeli = async function(values) {
        let init = {
            method: 'POST',
            body: JSON.stringify(values),
        }

        await fetch(
            `http://sawit-express.herokuapp.com/api/OARBeli/collection/edit/${values.id}`,
            init
        )
        .then((response) => {
            if (response.status === 200) {
                message.info("Entry edited");
            } else {
                message.info("Something went wrong when editing the entry.");
            }
        })
    }

    const onFinish = (values) => {
        for (const key of Object.keys(values)) {
            if (values[key] === undefined) { values[key] = 0 };
        }

        values.id = entryId;
        console.log(values);
        postEditOarbeli(values);

        setFinished(true);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <div>
        { (finished) && <Redirect to="/OARBeli" /> }

        <PageHeader
            onBack={() => window.history.back()}
            title={"🌴 Edit OAR Beli"}>
        </PageHeader>

        <p>
            {`You are editing entry ID: ${entryId}`}
        </p>

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
                        key={fieldLabelPair[0]}
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

export default OARBeliEdit;