import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from '../data'

export default function useFunctions() {

  const navigate = useNavigate()

  const [API, setAPI] = useState([])
  const [Count, setCount] = useState(0)
  const [Page, setPage] = useState(1)
  const [reducer, setReducer] = useReducer(x => x + 1, 0)

  const [Lenght, setLenght] = useState([])
  const [Loadding, setLoad] = useState(false)
  useEffect(() => {
    axios.get(url.Mainurl + url.getabout + '?page=' + pageN).then((res) => {
      setAPI(res.data.results)
      setPage(res.data.total_pages)
      setCount(res.data.count)
      setLoad(true)
    })
    axios.get(url.Mainurl + url.getabout + '?page=1').then((res) => {
      setLenght(res.data.results)
    })

  }, [reducer])

  function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', e.target[0].files[0])
    formData.append('title', e.target[1].value)
    formData.append('description', e.target[2].value)
    formData.append('is_active', true)
    axios.post(url.Mainurl + url.createabout, formData).then((res) => {
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
      navigate('/about')
      Toast.fire({
        icon: 'success',
        title: 'ບັນທືກຂໍ້ມູນສຳເລັດ'
      })
    })
  }

  function delabout(e) {
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
        axios.delete(url.Mainurl + url.delabout + e).then((res) => {
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
          setLoad(false)
          Toast.fire({
            icon: 'success',
            title: 'ລົບຂໍ້ມູນສຳເລັດ'
          })
        })
      }
    })
  }

  function active(e) {
    axios.patch(url.Mainurl + url.patchabout + e.id, {
      is_active: e.is_active === true ? false : true
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
      setLoad(false)
      Toast.fire({
        icon: 'success',
        title: 'ເປິດໃຊ້ງານຂໍ້ມູນສຳເລັດ'
      })
    })

  }

  function editSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', e.target[1].files[0])
    formData.append('title', e.target[2].value)
    formData.append('description', e.target[3].value)

    axios.patch(url.Mainurl + url.patchabout + e.target[0].value, (
      e.target[1].value === '' ?
        {
          "title": e.target[2].value,
          "description": e.target[3].value,
        } :
        formData
    )).then((res) => {
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

  const [pageN, setpageN] = useState(1)
  function next() {
    if (pageN < Page) {
      setpageN(pageN + 1)
      setLoad(false)
      setReducer()
    }
  }

  function black() {
    if (pageN > 1) {
      setpageN(pageN - 1)
      setLoad(false)
      setReducer()
    }
  }

  let x = Lenght.length * (pageN - 1) + 1

  return {
    API,
    onSubmit,
    delabout,
    active,
    Count,
    editSubmit,

    next,
    black,
    pageN,
    Page,
    x,
    Loadding,
  }
}
