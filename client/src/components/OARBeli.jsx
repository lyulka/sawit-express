import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Button, Table, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { deleteOarbeli } from '../utilities/FormPost'; 


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
                        onConfirm={() => {
                            deleteOarbeli(record.key);
                            setOarbeliArray(oarbeliArray);
                            console.log("We are trying to rerender");
                            }}>
                    <a href="google.com"><DeleteOutlined /> Delete</a>
                    </Popconfirm>
                </span>
                );
            }
        },
    ]

    // Fetch oarbeli collection
    useEffect(() => { fetchData() }, [oarbeliArray]);

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