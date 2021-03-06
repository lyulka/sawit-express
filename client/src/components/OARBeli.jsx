import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory'; 
import { OARBeliContext } from '../contexts/OARBeliContext';
import moment from 'moment';

export default function OARBeli() {
    const { oarbelis, deleteOarbeli, getAllOarbeli } = useContext(OARBeliContext);
    const [ week, setWeek ] = useState(getInitialDateRange());
    const [ weekOarbeliArray, setWeekOarbeliArray ] = useState([]);

    const getInitialDateRange = () => {
        var date = moment()
        var day = date.day();
        var startDate = moment()

        if (date.day() === 0)
            startDate.date(date.date() - 7);
        else
            startDate.date(date.date() - day);

        startDate.hours(0); 
        startDate.minutes(0); 
        startDate.seconds(0);

        var endDate = moment(startDate);
        endDate.date(startDate.date() + 7);

        return {
          startDate: startDate, 
          endDate: endDate
        };
    }

    const incrementWeek = () => {
        week.startDate.date(week.startDate.date() + 7);
        week.endDate.date(week.endDate.date() + 7);

        setWeek({ startDate: week.startDate, endDate: week.endDate });
    }

    const decrementWeek = () => {
        week.startDate.date(week.startDate.date() - 7);
        week.endDate.date(week.endDate.date() - 7);

        setWeek({ startDate: week.startDate, endDate: week.endDate });
    }

    const getWeekOarbeli = () => {
        var relevantOarbeliArray = Object.values(oarbelis).filter((entry) => {
          return (entry.date >= week.startDate && entry.date < week.endDate);
      });

      var weekOarbeli = [];

      relevantOarbeliArray.forEach(entry => {
          weekOarbeli[entry.date.day()] = entry;
      })

      for (let i = 0; i <= 6; i++) {
          if (weekOarbeli[i] == null) {
              let dummyMoment = moment(week.startDate);
              dummyMoment.date(week.startDate.date() + i);
              weekOarbeli[i] = { date: dummyMoment, oarBeli: 0};
          }
      }

      setWeekOarbeliArray(weekOarbeli);
    }

    useEffect(() => { 
      getAllOarbeli() 
    }, 
    []);

    useEffect(() => {
      getWeekOarbeli();
    }, [week, oarbelis]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: date => moment(date).format('DD/MM/YYYY'),
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
                      <Link to={`OARBeli/edit/${record.key}`}>
                        <EditOutlined />
                        {' '}
                        Edit /
                        {' '}
                      </Link>
                      <Popconfirm 
                        title={"Are you sure you want to delete this entry?"} 
                        okText={"Yes"} 
                        cancelText={"No"}
                        onConfirm={() => {
                          deleteOarbeli(record.key);
                      }}
                      >
                        <a href="google.com">
                          <DeleteOutlined /> 
                          Delete
                        </a>
                      </Popconfirm>
                  </span>
                );
            }
        },
    ]

    return (
        <div 
          style={{ 
            paddingTop: '16px' 
          }}
        >
            <VictoryChart
                domainPadding={20}
                theme={VictoryTheme}
                scale={{ x: "time" }}
            >

                <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6, 7]}
                    tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                />

                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x * 100}%`)}
                />

                <VictoryBar
                    data={weekOarbeliArray}
                    y="oarBeli"
                />

            </VictoryChart>

            <span>
              {`Week of ${week.startDate.date()}/${week.startDate.month() + 1}/${week.startDate.year()}
              - ${week.endDate.date() - 1}/${week.endDate.month() + 1}/${week.endDate.year()}`}
             </span>

            <div>
                <Button 
                  type="link" 
                  onClick={decrementWeek}
                >
                  <ArrowLeftOutlined />
                  Previous week
                </Button>
                <Button 
                  type="link" 
                  onClick={incrementWeek}
                >
                  Next week
                  <ArrowRightOutlined />
                </Button>
                <Button 
                  type="link"
                 onClick={() => setWeek(getInitialDateRange())}
                >
                  Current week
                </Button>
            </div>

            <Button 
                type="dashed" 
                style={{ width: '100%', marginTop: '16px', marginBottom: '8px' }}
                icon={<PlusOutlined />}>
                <Link to='/OARBeli/add'>
                  Add OAR Beli
                </Link>
            </Button>

            <Table 
              dataSource={Object.values(oarbelis)} 
              columns={columns}
            />

        </div>
    );
};