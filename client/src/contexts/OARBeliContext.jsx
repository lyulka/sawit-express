import React from 'react';

import { message } from 'antd';
import moment from 'moment';

const OARBeliContext = React.createContext();
class OARBeliContextProvider extends React.Component {
    state = {
        oarbeliArray: [],
    }

    setOarbeli = (array) => {
        this.setState({ oarbeliArray: array });
    }

    refetchOarbeli = () => {
        this.getAllOarbeli();
    }

    getEditOarbeli = async (entryId, callback) => {
        console.log("getEditOarbeli: in");

        // Will be called if OARBeliInputForm rendered is of the Edit variant.
        if (entryId === null) {
            return;
        }


        let init = {
            method: 'GET',
        }

        await fetch(
            `http://sawit-express.herokuapp.com/api/OARBeli/collection/entry/${entryId}`,
            // `http://localhost:5000/api/OARBeli/collection/entry/${entryId}`,
            init
        )
        .then((response) => {
            return response.json();
        }).then((json) => {
            json.date = moment(json.date);
            callback(json);
        })
    }

    postAddOarbeli = async (values) => {
        console.log("postAddOarbeli: in");

        let init = {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            },
        }
    
        // This entire expression immediately returns a resolved promise with value
        // undefined; but the API still runs in the background and pushes the attached
        // callbacks 
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

            this.refetchOarbeli();
        })
    }

    // The PUT HTTP method is used when we want to edit an existing resource in the
    // server.
    putEditOarbeli = async (values) => {
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
        })
    }

    deleteOarbeli = async (id) => {
        let init = {
            method: 'DELETE',
        }
    
        await fetch(
            `http://sawit-express.herokuapp.com/api/OARBeli/collection/delete/${id}`,
            // `http://localhost:5000/api/OARBeli/collection/delete/${id}`,
            init
        )
        .then((response) => {
            if (response.status === 200) {
                message.info(`Entry deleted`);
            } else {
                message.info(`Something went wrong when deleting the entry created on ${response.deletedDate}.`);
            }

            this.refetchOarbeli();
        }) 
    }

    getAllOarbeli = async () => {
        console.log('getAllOarbeli: in');

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

            this.setOarbeli(array);
        })
    }

    // Initialize the oarbeliArray on mount.
    componentDidMount() {
        this.refetchOarbeli();
    }

    render() {
        return (
            <OARBeliContext.Provider value={{
                ...this.state, 
                setOarbeli: this.setOarbeli, 
                refetchOarbeli: this.refetchOarbeli, 
                getEditOarbeli: this.getEditOarbeli,
                postAddOarbeli: this.postAddOarbeli,
                putEditOarbeli: this.putEditOarbeli,
                deleteOarbeli: this.deleteOarbeli,
                getAllOarbeli: this.getAllOarbeli }}>
                {this.props.children}
            </OARBeliContext.Provider>
        );
    }

}

export { OARBeliContext, OARBeliContextProvider };