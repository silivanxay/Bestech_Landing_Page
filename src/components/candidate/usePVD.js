import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import url from './data'

export default function usePVD() {


    const [province, setprovince] = useState([])
    const [Pagepro, setPagepro] = useState(1)

    const [district, setdistrict] = useState([])
    const [Pagedis, setPagedis] = useState(1)

    const [village, setvillage] = useState([])
    const [Pagevil, setPagevil] = useState(1)

    const [reducer, setReducer] = useReducer(x => x + 1, 0)
    useEffect(() => {
        axios.get(url.Mainurl + url.getproveince + '&page=' + nextpage_pro).then((res) => {
            setprovince(res.data.results)
            setPagepro(res.data.total_pages)
        })

        if (listpro === '') {

        } else {
            axios.get(url.Mainurl + url.getdistrict + '&province=' + listpro.id + '&page=' + nextpage_dis).then((res) => {
                setdistrict(res.data.results)
                setPagedis(res.data.total_pages)
            })

            axios.get(url.Mainurl + url.getvillage + '&district=' + listdis.id + '&page=' + nextpage_vil).then((res) => {
                setvillage(res.data.results)
                setPagevil(res.data.total_pages)
            })
        }
    }, [reducer])

    const [listpro, setLpro] = useState('')
    function Dropdow_province(e) {
        setLpro(e)
        setListpro(false)
        setShowL_vil(false)
        setReducer()
    }

    const [show_listpro, setListpro] = useState(false)
    function showlist() {
        setShowL_vil(false)
        if (show_listpro === false) {
            setListpro(true)
        } else {
            setListpro(false)
        }
    }

    const [nextpage_pro, setnext_pro] = useState(1)
    function nextpro() {
        if (nextpage_pro < Pagepro) {
            setnext_pro(nextpage_pro + 1)
            setReducer()
        }
    }
    function backpro() {
        if (nextpage_pro > 1) {
            setnext_pro(nextpage_pro - 1)
            setReducer()
        }
    }

    // Distric

    const [listdis, setLdist] = useState('')
    function Dropdow_distric(e) {
        setLdist(e)
        setReducer()
        setShowL_dis(false)
    }
    const [show_listdis, setShowL_dis] = useState(false)
    function showlist_dis() {
        if (show_listdis === false) {
            setShowL_dis(true)
        } else {
            setShowL_dis(false)
        }
    }

    const [nextpage_dis, setNext_dis] = useState(1)
    function nextdis() {
        if (nextpage_dis < Pagedis) {
            setNext_dis(nextpage_dis + 1)
            setReducer()
        }
    }

    function backdis() {
        if (nextpage_dis > 1) {
            setNext_dis(nextpage_dis - 1)
            setReducer()
        }
    }

    // village
    const [listvil, setLvil] = useState('')
    function Dropdow_village(e) {
        setLvil(e)
        setReducer()
        setShowL_vil(false)
    }
    const [show_listvil, setShowL_vil] = useState(false)
    function showlist_vil() {
        if (show_listvil === false) {
            setShowL_vil(true)
        } else {
            setShowL_vil(false)
        }
    }

    const [nextpage_vil, setNpage_vil] = useState(1)
    function nextvil() {
        if (nextpage_vil < Pagevil) {
            setNpage_vil(nextpage_vil + 1)
            setReducer()
        }
    }
    function backvil() {
        if (nextpage_vil > 1) {
            setNpage_vil(nextpage_vil - 1)
            setReducer()
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setLvil('')
        setLdist('')
        setLpro('')
        setReducer()
    };
    const handleShow = () => {
        setShow(true)
        setLvil('')
        setLdist('')
        setLpro('')
        setReducer()
    };

    return {
        // province
        province,
        Dropdow_province,
        showlist,
        listpro,
        show_listpro,
        nextpro,
        backpro,
        nextpage_pro,
        Pagepro,

        // district
        district,
        showlist_dis,
        Dropdow_distric,
        listdis,
        show_listdis,
        nextdis,
        backdis,
        Pagedis,
        nextpage_dis,

        // village
        village,
        showlist_vil,
        listvil,
        show_listvil,
        Dropdow_village,
        nextvil,
        backvil,
        nextpage_vil,
        Pagevil,

        handleClose,
        handleShow,
        show,
    }
}
