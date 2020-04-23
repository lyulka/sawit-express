import { message } from 'antd';

// The PUT HTTP method is used when we want to edit an existing resource in the
// server.
const putEditOarbeli = async function(values) {
    let init = {
        method: 'PUT',
        body: JSON.stringify(values),
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

const getEditOarbeli = function(entryId) {
    let init = {
        method: 'GET',
    }

    await fetch(
        `http://sawit-express.herokuapp.com/api/OARBeli/entry/${entryId}`,
        init
    )
    .then((response) => {
        return response.json();
    }).then((response) => {
        return response;
    })
}

// The POST HTTP method is used when we want to create a new resource in the
// server
const postAddOarbeli = async function(values) {
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
            message.info("New entry created");
        } else {
            message.info("Something went wrong when creating the entry.");
        }
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

export { postAddOarbeli, putEditOarbeli, deleteOarbeli };