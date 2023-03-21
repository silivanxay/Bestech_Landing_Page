import axios from 'axios'
import url from '../data'
import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2'

const useFuncations = () => {

    const [reducer, setRedeuce] = useReducer(x => x + 1, 0)
    const [GETAPI, setAPI] = useState([])
    const [proLegn, setproL] = useState('')
    const [proPage, setproPage] = useState(1)
    const [proPageN, setproPageN] = useState(1)

    const [Loaderror, setLerror] = useState(false)
    const [Legnth, setLegnth] = useState([])

    useEffect(() => {
        axios.get(url.Mainurl + url.getproveince + '&page=' + proPageN).then((res) => {
            setAPI(res.data.results.reverse())
            setproL(res.data.count)
            setproPage(res.data.total_pages)
            setLerror(true)
        })

        axios.get(url.Mainurl + url.getproveince + '&page=1').then((res) => {
            setLegnth(res.data.results)
        })

    }, [reducer])

    const [Input, setformValues] = useState('')
    function SubProvine() {
        setRedeuce()
        if (Input !== '') {
            axios.post(url.Mainurl + url.createprovence, {
                "province": Input,
                "is_active": true
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
                setRedeuce()
                Toast.fire({
                    icon: 'success',
                    title: 'ບັນທືກຂໍ້ມູນສຳເລັດ'
                })
            })
        }
    }

    const [loadedit, setledit] = useState(false)
    const [Byidpro, setBypro] = useState([])
    const [EIDPRO, setEIDP] = useState([])
    function editprovice(e) {
        setledit(true)
        setBypro(e)
        setEIDP(e)
    }
    function EditProvine() {
        setRedeuce()
        if (Byidpro !== '') {
            axios.patch(url.Mainurl + url.patchprovince + EIDPRO.id + '/', {
                province: Byidpro,
                is_active: true,
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
                setRedeuce()
                Toast.fire({
                    icon: 'success',
                    title: 'ປ່ຽນແປ່ງຂໍ້ມູນສຳເລັດ'
                })
            })
        }
    }

    function cancel_pro() {
        setledit(false)
    }

    const [AlertD, setAlert] = useState(false)
    function refrest() {
        setRedeuce()
    }

    if (AlertD === true) {
        setTimeout(() => {
            setAlert(null)
        }, 5000)
    }

    function delprovice(e) {
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
                axios.patch(url.Mainurl + url.patchprovince + e + '/', {
                    is_active: false
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
                    setRedeuce()
                    Toast.fire({
                        icon: 'success',
                        title: 'ລົບຂໍ້ມູນສຳເລັດ'
                    })
                })
            }
        })
    }

    function Nextpro() {
        if (proPageN < proPage) {
            setproPageN(proPageN + 1)
            setRedeuce()
            setLerror(false)
        }
    }
    function Blackpro() {
        if (proPageN > 1) {
            setproPageN(proPageN - 1)
            setRedeuce()
            setLerror(false)
        }
    }

    let xpro = Legnth.length *(proPageN-1)+1

    return {
        setformValues,
        SubProvine,
        refrest,
        GETAPI,
        delprovice,
        proLegn,
        editprovice,
        loadedit,
        cancel_pro,
        Byidpro,
        setBypro,
        EditProvine,

        Nextpro,
        Blackpro,
        proPage,
        proPageN,

        Loaderror,
        xpro,
    }
}

export default useFuncations