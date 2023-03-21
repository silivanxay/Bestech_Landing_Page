import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2'
import url from '../data'

export default function useFuncations() {

    const [APIPRO, setAPIPRO] = useState([])
    const [APIDIS, setAPIDIS] = useState([])
    const [ProPage, setProPage] = useState(1)
    const [DisPage, setDisPage] = useState(1)

    const [Legnht_dis, setLegnht_dis] = useState(20)
    const [Count_dis, setCount_dis] = useState(20)
    const [Loaderror, setLerror] = useState(false)

    const [reducer, setReducer] = useReducer(x => x + 1, 0)
    useEffect(() => {
        axios.get(url.Mainurl + url.getproveince + '&page=' + nextpage_pro).then((res) => {
            setAPIPRO(res.data.results)
            setProPage(res.data.total_pages)
        })

        if(listpro === ''){
            axios.get(url.Mainurl + url.getdistrict + '&page=' + nextpage_dis).then((res) => {
                setAPIDIS(res.data.results.reverse())
                setDisPage(res.data.total_pages)
                setCount_dis(res.data.count)
                setLerror(true)
            })
        }else{
            axios.get(url.Mainurl + url.getdistrict + '&page=' + nextpage_dis + '&province=' + listpro.id).then((res) => {
                setAPIDIS(res.data.results.reverse())
                setDisPage(res.data.total_pages)
                setCount_dis(res.data.count)
                setLerror(true)
            })
        }

        axios.get(url.Mainurl + url.getdistrict + '&page=1').then((res) => {
            setLegnht_dis(res.data.results)
        })
    }, [reducer])

    const [meslistpro, setmslist] = useState(false)
    function SubDistrict(e) {
        e.preventDefault()
        if (listpro !== '') {
            axios.post(url.Mainurl + url.createdistric, {
                "district": e.target[0].value,
                "is_active": true,
                "province": listpro.id
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
            alert('~~ກະລຸນາເລືອກຂໍ້ມູນແຂວງກອນບັນທືກຂໍ້ມູນ~~')
            setmslist(true)
        }
    }

    function deldis(e) {
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
                axios.patch(url.Mainurl + url.patchdistrict + e.id, {
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

    if (meslistpro === true) {
        setTimeout(() => {
            setmslist(false)
        }, 5000)
    }

    const [listpro, setlistpro] = useState('')
    function Dropdow_province(e) {
        setlistpro(e)
        setshowlist(false)
        setLerror(false)
        setReducer()
    }

    function ClossState() {
        setlistpro('')
        setLerror(false)
        setReducer()
    }

    const [show_listpro, setshowlist] = useState(false)
    function showlist() {
        if (show_listpro == false) {
            setshowlist(true)
        } else {
            setshowlist(false)
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
            setLerror(false)
        }
    }
    function black_dis() {
        if (nextpage_dis > 1) {
            setpropage_dis(nextpage_dis - 1)
            setReducer()
            setLerror(false)
        }
    }

    let x = Legnht_dis.length * (nextpage_dis - 1) + 1

    function editSUb(e) {
        e.preventDefault()
        if (e) {
            axios.patch(url.Mainurl + url.patchdistrict + e.target[1].value, {
                "district": e.target[0].value,
                "province": listpro === '' ? e.target[2].value : listpro.id
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

    return {
        SubDistrict,
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
        x,
        Count_dis,
        deldis,
        editSUb,
        Loaderror,
        ClossState,
    }
}
