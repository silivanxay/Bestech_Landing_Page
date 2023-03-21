import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from './data'

export default function useFunctions() {
    let navigate = useNavigate()

    const [API, setAPI] = useState([])
    const [Page, setPage] = useState([])
    const [reducer, setReducer] = useReducer(x => x + 1, 0)
    useEffect(() => {
        axios.get(url.Mainurl + url.getcandidate + '?page=' + nextpage).then((res) => {
            setAPI(res.data.results)
            setPage(res.data.total_pages)
        })
    }, [reducer])

    function Submit(e) {
        e.preventDefault()
        if (e.target[2, 3, 4].value !== '') {
            axios.post(url.Mainurl + url.postcandidate, {
                "full_name": e.target[1].value,
                "phone_number": e.target[0].value,
                "is_active": true,
                "province": e.target[2].value,
                "district": e.target[3].value,
                "village": e.target[4].value
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
                navigate('/Candidates_eligibility')
                Toast.fire({
                    icon: 'success',
                    title: 'ບັນທືກຂໍ້ມູນສຳເລັດ'
                })
            })
        } else {
            alert('~~ ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ ~~')
        }
    }

    function patchIDcan(e) {
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
                axios.patch(url.Mainurl + url.patchcandidate + e.id, {
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

    function Subupdate(e) {
        e.preventDefault()
        if (e.target[2, 3, 4].value !== '') {
            axios.patch(url.Mainurl + url.patchcandidate + e.target[5].value, {
                "full_name": e.target[1].value,
                "phone_number": e.target[0].value,
                "province": e.target[2].value,
                "district": e.target[3].value,
                "village": e.target[4].value
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
                navigate('/Candidates_eligibility')
                Toast.fire({
                    icon: 'success',
                    title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ'
                })
            })
        } else {
            alert('~~ ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ ~~')
        }
    }

    const [nextpage, setNextpage] = useState(1)
    function next() {
        if(nextpage < Page) {
            setNextpage(nextpage +1)
            setReducer()
        }
    }
    function black() {
        if(nextpage > 0) {
            setNextpage(nextpage -1)
            setReducer()
        }
    }

    return {
        API,
        Submit,
        patchIDcan,
        Subupdate,

        next,
        black,
        Page,
        nextpage
    }
}
