import { useEffect, useState } from "react";

const Usefatch = () => {
    let [trees, setTrees] = useState([]);

    let getData = async () => {
        fetch("http://localhost:4000/tree/getTrees")
            .then((res) => res.json())
            .then((data) => {
                setTrees(data);
            })
    }

    getData();
    return trees;
}


export default Usefatch;