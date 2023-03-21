import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2'
import url from '../data'

export default function useFunctions() {

    const [APIPRO, setAPIPRO] = useState([])
    const [APIDIS, setAPIDIS] = useState([])
    const [APIVIL, setAPIVIL] = useState([])
    const [ProPage, setProPage] = useState(1)
    const [DisPage, setDisPage] = useState(1)
    const [VilPage, setVilPage] = useState(1)

    const [Count_vil, setCount_vil] = useState(20)
    const [Loaderror, setLerror] = useState(false)
    const [Legnth, setLegnth] = useState([])

    const [reducer, setReducer] = useReducer(x => x + 1, 0)
    useEffect(() => {
        axios.get(url.Mainurl + url.getproveince + '&page=' + nextpage_pro).then((res) => {
            setAPIPRO(res.data.results)
            setProPage(res.data.total_pages)
        })

        if (listpro === '') {
            axios.get(url.Mainurl + url.getdistrict + '&page=' + nextpage_dis).then((res) => {
                setAPIDIS(res.data.results.reverse())
            })
        } else {
            axios.get(url.Mainurl + url.getdistrict + '&page=' + nextpage_dis + '&province=' + listpro.id).then((res) => {
                setAPIDIS(res.data.results.reverse())
                setDisPage(res.data.total_pages)
            })
        }

        if (listdis === '') {
            axios.get(url.Mainurl + url.getvillage + '&page=' + nextpage_vill).then((res) => {
                setAPIVIL(res.data.results.reverse())
                setLerror(true)
                setCount_vil(res.data.count)
                setVilPage(res.data.total_pages)
            })
        } else {
            axios.get(url.Mainurl + url.getvillage + '&page=' + nextpage_vill +'&district=' + listdis.id).then((res) => {
                setAPIVIL(res.data.results.reverse())
                setLerror(true)
                setCount_vil(res.data.count)
                setVilPage(res.data.total_pages)
            })
        }

        axios.get(url.Mainurl + url.getvillage + '&page=1').then((res) => {
            setLegnth(res.data.results)
        })

    }, [reducer])

    const [meslistpro, setmslist] = useState(false)

    if (meslistpro === true) {
        setTimeout(() => {
            setmslist(false)
        }, 5000)
    }

    const [listpro, setlistpro] = useState('')
    function Dropdow_province(e) {
        setlistpro(e)
        setshowlist(false)
        setReducer()
    }

    const [listdis, setlistdis] = useState('')
    function Dropdow_district(e) {
        setlistdis(e)
        setReducer()
        setshowL_dis(false)
    }

    const [show_listpro, setshowlist] = useState(false)
    function showlist() {
        if (show_listpro == false) {
            setshowlist(true)
            setReducer()
        } else {
            setshowlist(false)
            setReducer()
        }
    }

    const [showlist_dis, setshowL_dis] = useState(false)
    function showlistDIs() {
        if (showlist_dis == false) {
            setshowL_dis(true)
            setReducer()
        } else {
            setshowL_dis(false)
            setReducer()
        }
    }

    const [nextpage_pro, setpropage] = useState(1)
    function next() {
        if (nextpage_pro < ProPage) {
            setpropage(nextpage_pro + 1)
            setReducer()
        }
    }
    function black() {
        if (nextpage_pro > 1) {
            setpropage(nextpage_pro - 1)
            setReducer()
        }
    }

    const [nextpage_dis, setpropage_dis] = useState(1)
    function next_dis() {
        if (nextpage_dis < DisPage) {
            setpropage_dis(nextpage_dis + 1)
            setReducer()
        }
    }
    function black_dis() {
        if (nextpage_dis > 1) {
            setpropage_dis(nextpage_dis - 1)
            setReducer()
        }
    }

    // Village 
    function SubVillage(e) {
        e.preventDefault()
        if (listdis !== '') {
            axios.post(url.Mainurl + url.postvillage, {
                "village": e.target[0].value,
                "is_active": true,
                "district": listdis.id
            }).then((res) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                setReducer()
                Toast.fire({
                    icon: 'success',
                    title: 'ບັນທືກຂໍ້ມູນສຳເລັດ'
                })
            })
        } else {
            alert('~~ກະລຸນາເລືອກຂໍ້ມູນເມືອງກອນບັນທືກຂໍ້ມູນ~~')
            setmslist(true)
        }
    }

    function delvillage(e) {
        Swal.fire({
            title: 'ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ ຫຼື ບໍ່?',
            text: "ເມືອລົບແລ້ວຂໍ້ມູນຈະຍັງເກັບ ແຕ່ບໍ່ສາມາດນຳມາໃຊ້ໄດ້ອີກ!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບຂໍ້ມູນ!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(url.Mainurl + url.patchvillage + e.id, {
                    "is_active": false
                }).then((res) => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    setReducer()
                    Toast.fire({
                        icon: 'success',
                        title: 'ລົບຂໍ້ມູນສຳເລັດ'
                    })
                })
            }
        })
    }

    function updateVillage(e) {
        e.preventDefault()
        if (e) {
            axios.patch(url.Mainurl + url.patchvillage + e.target[1].value, {
                "village": e.target[0].value,
                "district": listdis === '' ? e.target[2].value : listdis.id
            }).then((res) => {
                console.log(res)
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                setReducer()
                Toast.fire({
                    icon: 'success',
                    title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ'
                })
            })
        }
    }

    const [nextpage_vill, setpropage_vill] = useState(1)
    function Next_vil() {
        if (nextpage_vill < VilPage) {
            setpropage_vill(nextpage_vill + 1)
            setReducer()
            setLerror(false)
        }
    }
    function Black_vil() {
        if (nextpage_vill > 1) {
            setpropage_vill(nextpage_vill - 1)
            setReducer()
            setLerror(false)
        }
    }

    let x = Legnth.length * (nextpage_vill-1)+1

    console.log(x)


    return {
        // provine
        APIPRO,
        APIDIS,
        listpro,
        Dropdow_province,
        showlist,
        show_listpro,
        black,
        next,
        nextpage_pro,
        ProPage,
        meslistpro,

        black_dis,
        next_dis,
        DisPage,
        nextpage_dis,
        Count_vil,
        Loaderror,
        showlistDIs,
        showlist_dis,
        Dropdow_district,
        listdis,

        // Village 
        SubVillage,
        APIVIL,
        Loaderror,
        delvillage,
        updateVillage,
        Black_vil,
        Next_vil,
        VilPage,
        nextpage_vill,
        x,
    }
}
