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

export { postAddOarbeli, putEditOarbeli };