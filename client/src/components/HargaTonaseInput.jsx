import React from 'react';

import { Form, Input } from 'antd';

const HargaTonaseInput = ({ label, fieldName }) => {
    return (
        <Form.Item label={label} style={{marginBottom: '0'}}>
            <Form.Item name={fieldName} style={{display: 'inline-block', width: '50%'}}>
                <Input 
                    type="number"
                    prefix="Rp/tons"
                    />
            </Form.Item>
            <Form.Item name={fieldName + "Tonnage"} style={{display: 'inline-block', paddingLeft: '8px', width: '50%'}}>
                <Input 
                    type="number"
                    suffix="tons"
                    />
            </Form.Item>
        </Form.Item>
    );
};

export default HargaTonaseInput;