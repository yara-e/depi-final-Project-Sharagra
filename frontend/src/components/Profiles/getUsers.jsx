import { useEffect, useState } from "react";

const Usefatch = () => {
    let [users, setUsers] = useState([]);

    let getData = async () => {
        fetch("http://localhost:4000/user/getUsers")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            })
    }

    getData();
    return users;
}


export default Usefatch;