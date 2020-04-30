import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';

import { useParams, Redirect } from 'react-router-dom'; 
import { Form, Input, Button, DatePicker, PageHeader } from 'antd';

import { OARBeliContext } from '../contexts/OARBeliContext'; 
import HargaTonaseInput from './HargaTonaseInput.jsx';

const OARBeliInputForm = ({ action }) => {
    const urlParams = useParams();  
    const entryId = (action === "edit") ? urlParams.id : null;
    const formRef = useRef(null);

    const { putEditOarbeli, postAddOarbeli, getEditOarbeli } = useContext(OARBeliContext);

    useEffect(() => {
        getEditOarbeli(entryId, formRef.current.setFieldsValue)
    }, 
    []);

    const options = (action === "edit") ?
    { // Options for Edit new OAR Beli form
        editingMessage: `You are editing entry ID: ${entryId}`,
        pageHeader: "🌴 Edit OAR Beli",
        onFinish: (values) => {
            for (const key of Object.keys(values)) {
                if (values[key] === undefined) { values[key] = 0 };
            }
    
            values.id = entryId;
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
        pageHeader: "🌴 Add new OAR Beli",
        onFinish: (values) => {
            for (const key of Object.keys(values)) {
                if (values[key] === undefined) { values[key] = 0 };
            }
            
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

    return (
        <div>
        { (finished) && <Redirect to="/OARBeli" /> }

        <PageHeader
            onBack={() => window.history.back()}
            title={options.pageHeader}>
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
            ref={formRef}
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
                name="kosOlah">
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