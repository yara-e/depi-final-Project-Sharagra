import { useEffect, useState } from "react";

const Usefatch = () => {
    let [orders, setOrders] = useState([]);

    let getData = async () => {
        fetch("http://localhost:4000/order/getOrders")
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            })
    }

    getData();
    return orders;
}


export default Usefatch;