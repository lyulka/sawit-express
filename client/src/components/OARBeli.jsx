import React, { useEffect, useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Button, Table, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'; 

import { OARBeliContext } from '../contexts/OARBeliContext';

const OARBeli = () => {

    const getInitialDateRange = () => {
        var date = new Date();
        var day = date.getDay();
        var startDate = new Date();

        if (date.getDay() === 0)
            startDate.setDate(date.getDate() - 7);
        else
            startDate.setDate(date.getDate() - day);

        startDate.setHours(0, 0, 0);

        var endDate = new Date(startDate.getTime());
        endDate.setDate(startDate.getDate() + 7);

        return {startDate: startDate, endDate: endDate};
    }

    const incrementWeek = () => {
        week.startDate.setDate(week.startDate.getDate() + 7);
        week.endDate.setDate(week.endDate.getDate() + 7);

        setWeek({ startDate: week.startDate, endDate: week.endDate });
    }

    const decrementWeek = () => {
        week.startDate.setDate(week.startDate.getDate() - 7);
        week.endDate.setDate(week.endDate.getDate() - 7);

        setWeek({ startDate: week.startDate, endDate: week.endDate });
    }

    // Data source and columns
    const { oarbeliArray, deleteOarbeli, getAllOarbeli } = useContext(OARBeliContext);
    const [ week, setWeek ] = useState(getInitialDateRange());
    const [ weekOarbeliArray, setWeekOarbeliArray ] = useState([]);

    useEffect(() => {
        let weekOarbeli = oarbeliArray.filter((entry) => {
            return (new Date(entry.date) >= week.startDate && new Date(entry.date) < week.endDate);
        });

        setWeekOarbeliArray(weekOarbeli);

        console.log(weekOarbeli);
    }, [oarbeliArray]);

    
    // Fetch oarbeli collection
    useEffect(() => { getAllOarbeli() }, []);

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

    return (
        <div style={{ paddingTop: '16px' }}>
            <VictoryChart
                // domainPadding will add space to each side of VictoryBar
                // to prevent it from overlapping the axis
                domainPadding={20}
            >
                <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6, 7]}
                    tickFormat={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x * 100}%`)}
                />
                <VictoryBar
                    data={oarbeliArray}
                    x="date"
                    y="oarBeli"
                />
            </VictoryChart>
            <span>
            {`Week of ${week.startDate.getDate()}/${week.startDate.getMonth()}/${week.startDate.getFullYear()}
             - ${week.endDate.getDate() - 1}/${week.endDate.getMonth()}/${week.endDate.getFullYear()}`}
             </span>
            <div>
                <Button type="link" onClick={decrementWeek}>Previous week</Button>
                <Button type="link" onClick={incrementWeek}>Next week</Button>
                <Button type="link" onClick={() => setWeek(getInitialDateRange())}>Current week</Button>
            </div>
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