import React, { createContext, useEffect, useState } from 'react';

import { message } from 'antd';
import moment from 'moment';

const OARBeliContext = createContext();
const OARBeliContextProvider = ({ children }) => {
    const [ oarbeliArray, setOarbeliArray ] = useState([]);

    const getEditOarbeli = (entryId, callback) => {
        console.log("getEditOarbeli: in");

        if (entryId === null) 
            return;

        const editEntry = oarbeliArray.find((entry) => entry._id === entryId);
        editEntry.date = moment(editEntry.date);
        
        callback(editEntry);
    }

    const postAddOarbeli = async (values) => {
        console.log("postAddOarbeli: in");

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
            if (response.status === 200) {
                message.info("Entry created");
            } else {
                message.info("Something went wrong when creating the entry.");
            }

            getAllOarbeli();
        })
    }

    const putEditOarbeli = async (values) => {
        console.log("putEditOarbeli: in");
        let init = {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
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
        console.log("deleteOarbeli: in");
        let init = {
            method: 'DELETE',
        }

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

    const getAllOarbeli = async () => {
        console.log("getAllOarbeli: in");

        await fetch(
            "http://sawit-express.herokuapp.com/api/OARBeli/collection"
            // "http://localhost:5000/api/OARBeli/collection"
        )
        .then((response) => {
            return response.json();
        })
        .then((array) => {
            for (const element of array) {
                element.key = element._id;
                element.date = new Date(element.date);
            }

            setOarbeliArray(array);
        });
    }

    useEffect(() => { getAllOarbeli() }, []);

    return (
        <OARBeliContext.Provider value={{
            oarbeliArray: oarbeliArray,
            setOarbeliArray: setOarbeliArray,
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