import React from 'react';
import { useState } from 'react';

import { useParams, Redirect } from 'react-router-dom'; 
import { Form, Input, Button, DatePicker, PageHeader } from 'antd';
import HargaTonaseInput from './HargaTonaseInput.jsx';
import { putEditOarbeli, postAddOarbeli } from '../utilities/FormPost';

const OARBeliInputForm = ({ action }) => {

    const urlParams = useParams();  
    const entryId = (action === "edit") ? urlParams.id : null;

    const options = (action === "edit") ?
    { // Options for Edit new OAR Beli form
        editingMessage: `You are editing entry ID: ${entryId}`,
        pageTitle: "🌴 Edit OAR Beli",
        onFinish: (values) => {
            for (const key of Object.keys(values)) {
                if (values[key] === undefined) { values[key] = 0 };
            }
    
            values.id = entryId;
            console.log(values);
            putEditOarbeli(values);
    
            setFinished(true);
        },
        onFinishFailed: (errorInfo) => {
            console.log('Failed:', errorInfo);
        },
    }
    :
    { // Options for Add new OAR Beli form
        editingMessage: false,
        pageTitle: "🌴 Add new OAR Beli",
        onFinish: (values) => {
            for (const key of Object.keys(values)) {
                if (values[key] === undefined) { values[key] = 0 };
            }
    
            console.log(values);
            postAddOarbeli(values);
    
            setFinished(true);
        },
        onFinishFailed: (errorInfo) => {
            console.log('Failed:', errorInfo);
        },
    };

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

    return (
        <div>
        { (finished) && <Redirect to="/OARBeli" /> }

        <PageHeader
            onBack={() => window.history.back()}
            title={"🌴 Add new OAR Beli"}>
        </PageHeader>

        { (options.editingMessage) && (
            <p>
                {`You are editing entry ID: ${entryId}`}
            </p>
        )}

        <Form
            name="oarbeli_form"
            onFinish={options.onFinish}
            onFinishFailed={options.onFinishFailed}
            labelCol={{ span: 4 }}
            validateMessages={validateMessages}
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

export default OARBeliInputForm;