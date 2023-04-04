import { createContext, useEffect, useState } from "react";
import Index_Blog from "./News";
import Blog from "./Blog";
import axios from "axios";
import { db_news } from "../../util/data";

export const Message_data = createContext(null);

function News() {
    const [API, setAPI] = useState([])
    useEffect(() => {
        axios.get(db_news).then((res) => {
            setAPI(res.data.reverse())
        })
    }, [])

    const [message, setMessage] = useState();
    const [Status, setStatus] = useState(false);
    const [Items, setItems] = useState([])
    const [Display, setDisplay] = useState(false)

    console.log('Status && Display', Status, Display)

    return (
        <Message_data.Provider value={{API, message, setMessage, Status, setStatus, Items, setItems, Display, setDisplay }}>
            <Index_Blog API={API}/>
            <Blog API={API}/>
        </Message_data.Provider>
    );
}



export default News;
