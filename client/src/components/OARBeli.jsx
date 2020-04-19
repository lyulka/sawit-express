import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Button, Table, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'


const OARBeli = () => {

    const fetchData = async function() {

        await fetch(
            "http://sawit-express.herokuapp.com/api/OARBeli/collection"
            // "http://localhost:5000/api/OARBeli/collection"
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

    // The DELETE HTTP method is used when we want to delete an existing resource in
    // the server
    const deleteOarbeli = async function(id) {
        let init = {
            method: 'DELETE',
        }

        await fetch(
            `http://sawit-express.herokuapp.com/api/OARBeli/collection/delete/${id}`,
            init
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
                        onConfirm={() => deleteOarbeli(record.key)}>
                    <a href="google.com"><DeleteOutlined /> Delete</a>
                    </Popconfirm>
                </span>
                );
            }
        },
    ]

    // Fetch oarbeli collection
    useEffect(() => { fetchData() }, []);

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