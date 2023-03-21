import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from '../data'

export default function useFunctions() {

    const navigate = useNavigate()

    const [API, setAPI] = useState([])
    const [COUNT, setCount] = useState([])
    const [length, setlength] = useState(20)
    const [page, setpage] = useState(1)
    const [reducer, setRedeuce] = useReducer(x => x + 1, 0)

    const [Loadding, setLoadding] = useState(false)
    useEffect(() => {
        axios.get(url.Mainurl + url.getfooter + '?page=' + ispage).then((res) => {
            setAPI(res.data.results.reverse())
            setCount(res.data.count)
            setpage(res.data.total_pages)
            setLoadding(true)
        })
        axios.get(url.Mainurl + url.getfooter + '?page=1').then((res) => {
            setlength(res.data.results)
        })
    }, [reducer])

    function onSUbmit(e) {
        e.preventDefault()
        console.log(e)
        axios.post(url.Mainurl + url.createfooter + '/', {
            "address": e.target[4].value,
            "email": e.target[2].value,
            "instagram_url": e.target[1].value,
            "facebook_url": e.target[0].value,
            "whatsapp": e.target[3].value,
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
            navigate('/Footer')
            Toast.fire({
                icon: 'success',
                title: 'ບັນທືກຂໍ້ມູນສຳເລັດ'
            })
        })
    }

    function delfooter(e) {
        Swal.fire({
            title: 'ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ ຫຼື ບໍ່?',
            text: "ເມືອລົບແລ້ວຂໍ້ມູນຈະຖືກລົລຖາວອນ!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບຂໍ້ມູນ!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url.Mainurl + url.delfooter + e + '/').then((res) => {
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
                    setLoadding(false)
                    Toast.fire({
                        icon: 'success',
                        title: 'ລົບຂໍ້ມູນສຳເລັດ'
                    })
                })
            }
        })
    }

    function editSubmit(e) {
        e.preventDefault()
        axios.patch(url.Mainurl + url.patchfooter + e.target[5].value + '/', {
            "address": e.target[4].value,
            "email": e.target[2].value,
            "instagram_url": e.target[1].value,
            "facebook_url": e.target[0].value,
            "whatsapp": e.target[3].value,
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
                title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ'
            })
        })
    }

    function useactive(e) {
        if (e.is_active === true) {
            axios.patch(url.Mainurl + url.patchfooter + e.id + '/', {
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
                setLoadding(false)
                setRedeuce()
                Toast.fire({
                    icon: 'success',
                    title: 'ເປິດໃຊ້ງານຂໍ້ມູນສຳເລັດ'
                })
            })
        } else {
            axios.patch(url.Mainurl + url.patchfooter + e.id + '/', {
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
                setLoadding(false)
                setRedeuce()
                Toast.fire({
                    icon: 'success',
                    title: 'ປິດສະຖານະໃຊ້ງານຂໍ້ມູນສຳເລັດ'
                })
            })
        }
    }

    const [ispage, setispage] = useState(1)
    function next() {
        if (ispage < page) {
            setispage(ispage + 1)
            setRedeuce()
            setLoadding(false)
        }
    }
    function black() {
        if (ispage > 1) {
            setispage(ispage - 1)
            setRedeuce()
            setLoadding(false)
        }
    }

    let x = length.length * (ispage - 1) + 1

    return {
        API,
        delfooter,
        onSUbmit,
        editSubmit,
        useactive,
        COUNT,
        black,
        next,
        page,
        ispage,
        x,
        Loadding,
    }
}
