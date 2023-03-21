import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2'
import url from './data'

export default function useFunctions() {

  const [API, setAPI] = useState([])
  const [COUNT, setCount] = useState([])
  const [reducer, setRedeuce] = useReducer(x => x + 1, 0)
  useEffect(() => {
    axios.get(url.Mainurl + url.getusers).then((res) => {
      setAPI(res.data.results)
      setCount(res.data.count)
    })
  }, [reducer])

  function Submit_Users(e) {
    e.preventDefault()
    if (e.target[1].value === e.target[3].value) {
      axios.post(url.Mainurl + url.poostusers, {
        "username": e.target[0].value,
        "email": e.target[2].value,
        "password": e.target[1].value,
        "is_active": true,
        "is_staff": true
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
    } else {
      alert('ລະຫັດຜ່ານບໍ່ຕົງກັນ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ!')
    }
  }

  function delusers(e) {
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
        axios.patch(url.Mainurl + url.patchusers + e.id, {
          "is_staff": false,
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

  function Edit_Users(e) {
    e.preventDefault()
    if (e.target[0].value && e.target[1].value !== '') {
      axios.patch(url.Mainurl + url.patchusers + datausers.id, {
        "username": e.target[0].value,
        "email": e.target[1].value,
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
  }

  const [load_edit, setLoad_edit] = useState(false)
  const [datausers, setdata] = useState([])
  function show_edit(e) {
    setRedeuce()
    setdata(e)
    setLoad_edit(true)
  }

  function cancel() {
    setRedeuce()
    setLoad_edit(false)
  }

  const [message, setMes] = useState('')
  const [confirm_ps, setConfirmps] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  async function changeusers(e) {
    setMes(e)
    const { value: Confirm_password } = await Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: 18,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    })
    if (Confirm_password !== '') {
      setConfirmps(Confirm_password)
      axios.post(url.Mainurl + url.loginedUser, {
        username: e.username,
        password: Confirm_password
      }).then((res) => {
        setShow(true);
      }).catch((err) => {
        Swal.fire(`The password is incorrect. Please try again!`)
      })
    }
  }

  const token = localStorage.getItem('token')
  function SubChangePS(e) {
    e.preventDefault()
    if (e.target[0].value === e.target[1].value) {
      axios.put(url.Mainurl + url.putchangeps + message.id, {
        "old_password": confirm_ps,
        "password": e.target[0].value,
        "confirm_password": e.target[1].value
      },{headers: {
          Accept: "application/json",
  
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
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
          title: 'ປ່ຽນລະຫັດຜ່ານສຳເລັດ!'
        })
      })
    } else {
      alert('ລະຫັດຜ່ານບໍ່ຕົງກັນ!')
    }
  }

  return {
    API,
    Submit_Users,
    delusers,
    show_edit,
    load_edit,
    cancel,
    datausers,
    setdata,
    Edit_Users,
    changeusers,
    show,
    handleClose,
    SubChangePS,
    COUNT,
  }
}
