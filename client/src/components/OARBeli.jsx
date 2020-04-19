import React, { useEffect, useState } from 'react';

import OARBeliAdd from './OARBeliAdd';
import { Route, Link } from 'react-router-dom';
import { Button, Table, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, StepForwardOutlined } from '@ant-design/icons'


const OARBeli = () => {

    const fetchData = async function() {

        await fetch(
            "http://localhost:5000/api/OARBeli/collection"
        )
        .then((response) => {
            return response.json();
        })
        .then((array) => {
            for (const element of array)
                element.key = element._id;

            setOarbeliArray(array);
        })
    }

    const postDeleteOarbeli = async function(id) {
        let options = {
            method: 'POST',
        }

        await fetch(
            `http://localhost:5000/api/OARBeli/collection/delete/${id}`,
            options
        )
        .then((response) => {
            if (response.status === 200) {
                message.info(`The entry created on ${response.deletedDate} was successfully deleted.`);
            } else {
                message.info(`Something went wrong when deleting the entry created on ${response.deletedDate}.`);
            }
        })
    }

    // Data source and columns
    const [ oarbeliArray, setOarbeliArray ] = useState([]);
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: date => (new Date(date)).toDateString()
        },
        {
            title: 'OAR Beli',
            dataIndex: 'oarBeli',
            key: 'oarbeli',
            render: fraction => `${fraction * 100}%`
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return (
                <span>
                    <Link to={`OARBeli/edit/${record.key}`}><EditOutlined /> Edit / </Link>
                    <Popconfirm 
                        title={"Are you sure you want to delete this entry?"} 
                        okText={"Yes"} 
                        cancelText={"No"}
                        onConfirm={() => postDeleteOarbeli(record.key)}>
                       <a href="#"><DeleteOutlined /> Delete</a>
                    </Popconfirm>
                </span>
                );
            }
        },
    ]

    // Fetch oarbeli collection
    useEffect(fetchData, []);

    return (
        <div style={{ paddingTop: '16px' }}>
            <Button 
                type="dashed" 
                style={{ width: '100%' }}
                icon={<PlusOutlined />}>
                <Link to='/OARBeli/add'>Add OAR Beli</Link>
            </Button>
            <Table dataSource={oarbeliArray} columns={columns}/>
        </div>
    );
};

export default OARBeli;