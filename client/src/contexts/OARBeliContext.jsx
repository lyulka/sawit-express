import React, { createContext, useEffect, useState } from 'react';

import { message } from 'antd';
import moment from 'moment';

const OARBeliContext = createContext();
const OARBeliContextProvider = ({ children }) => {

  const [ oarbelis, setOarbelis ] = useState({});

  const getEditOarbeli = (entryId, callback) => {
    if (entryId === null) 
      return Promise.resolve();
    else {
      return new Promise((resolve, reject) => {
        const editEntry = oarbelis[entryId]
        editEntry.date = moment(editEntry.date);

        resolve(editEntry);
      })
    }
  }

  const getAllOarbeli = async () => {
    console.log('getAllOarbeli: in')
    await fetch(
      "http://sawit-express.herokuapp.com/api/OARBeli/collection"
      // "http://localhost:5000/api/OARBeli/collection"
    )
    .then((response) => {
      return response.json();
    })
    .then((array) => {
      var newOarbeli = {};

      array.forEach(element => {
        newOarbeli[element._id] = {...element, key: element._id, date: moment(element.date)}
      })

      console.log('newOarbeli', newOarbeli);

      setOarbelis(newOarbeli);
    });
  }

  const postAddOarbeli = async (values) => {
    let init = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      },
    }

    await fetch(
      "http://sawit-express.herokuapp.com/api/OARBeli/collection/create",
      // "http://localhost:5000/api/OARBeli/collection/create",
      init
    )
    .then((response) => {
      return response.json();
    })
    .then((addedOarbeli) => {
      setOarbelis({ ...oarbelis, [addedOarbeli._id]: addedOarbeli })
    })
  }

  const putEditOarbeli = async (values) => {
    let init = {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    await fetch(
      `http://sawit-express.herokuapp.com/api/OARBeli/collection/edit/${values.id}`,
      // `http://localhost:5000/api/OARBeli/collection/edit/${values.id}`,
      init
    )
    .then((response) => {
      if (response.status === 200) {
        message.info("Entry edited");
      } else {
        message.info("Something went wrong when editing the entry.");
      }
    });
  }

  const deleteOarbeli = async (id) => {
    const init = { method: 'DELETE' }

    await fetch(
      `http://sawit-express.herokuapp.com/api/OARBeli/collection/delete/${id}`,
      // `http://localhost:5000/api/OARBeli/collection/delete/${id}`,
      init
    )
    .then((response) => {
      console.log("deleting complete");
      if (response.status === 200)
        message.info(`Entry deleted`);
      else
        message.info(`Something went wrong when deleting the entry created on ${response.deletedDate}.`);

      getAllOarbeli();
    });
  }
  
  useEffect(() => getAllOarbeli, []);
  
  return (
    <OARBeliContext.Provider value={{
      oarbelis: oarbelis,
      setOarbeliArray: setOarbelis,
      getEditOarbeli: getEditOarbeli,
      postAddOarbeli: postAddOarbeli,
      putEditOarbeli: putEditOarbeli,
      deleteOarbeli: deleteOarbeli,
      getAllOarbeli: getAllOarbeli }}>
      {children}
    </OARBeliContext.Provider>
  );
}

export { OARBeliContext, OARBeliContextProvider };