import React, { useEffect, useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Button, Table, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { VictoryBar } from 'victory'; 

import { OARBeliContext } from '../contexts/OARBeliContext';

const OARBeli = () => {

    // Data source and columns
    const { refetch, oarbeliArray, deleteOarbeli, getAllOarbeli } = useContext(OARBeliContext);

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
                            }}>
                    <a href="google.com"><DeleteOutlined /> Delete</a>
                    </Popconfirm>
                </span>
                );
            }
        },
    ]

    // Fetch oarbeli collection
    useEffect(() => { getAllOarbeli() }, []);

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