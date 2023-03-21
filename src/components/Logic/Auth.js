import React, {useState} from 'react'
import url from '../API-links/apiurl'
import axios from 'axios'
import AOS from "aos";
import { Navigate, useNavigate } from 'react-router-dom';
import "aos/dist/aos.css";

function Auth() {
  const [checkCorrectAccount, setCheckCorrectAccount] = useState()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState()
  const pressEnterLogin = (username, password) => {
    setLoading(true)
    axios.post(url.Mainurl + url.loginedUser, {
      username: username,
      password: password,
    }).then((res) => {
      if (res.status == 200) {
        console.log(res.data)
        const token = res.data.accessToken
        setRole(res.data.roles)
        const confirmToken = res.data.accessToken
        sessionStorage.setItem('myToken', token);
        sessionStorage.setItem('conFirmToken', confirmToken);
        setLoading(false)
        setCheckCorrectAccount("");
        if (token) {
          window.location = "/"
          // return navigate("/reloadRandom");
        }
      }
    }
    ).catch((err) => {
      setLoading(false)
      setCheckCorrectAccount("ການເຊື່ອມຕໍ່ມີບັນຫາ")
      console.log(err)
      if (!err.response) {
      } else if (err.response.status == 404) {
        setCheckCorrectAccount("Username ບໍ່ຖືກຕ້ອງ")
      } else if (err.response.status == 401) {
        setCheckCorrectAccount("Password ບໍ່ຖືກຕ້ອງ")
      }
    })
  }
  
  const clickLogin = (username, password) => {
    setLoading(true)
    axios.post(url.Mainurl + url.loginedUser, {
      username: username,
      password: password,
    }).then((res) => {
      if (res.status == 200) {
        const token = res.data.accessToken
        setRole(res.data.roles)
        const confirmToken = res.data.accessToken
        sessionStorage.setItem('myToken', token);
        sessionStorage.setItem('myToken', token);
        sessionStorage.setItem('conFirmToken', confirmToken);
        setLoading(false)
        setCheckCorrectAccount("");
        if (token) {
          window.location = "/"
          // return navigate("/reloadRandom");
        }
      }
    }
    ).catch((err) => {
      setLoading(false)
      setCheckCorrectAccount("ການເຊື່ອມຕໍ່ມີບັນຫາ")
      console.log(err)
      if (!err.response) {
      } else if (err.response.status == 404) {
        setCheckCorrectAccount("Username ບໍ່ຖືກຕ້ອງ")
      } else if (err.response.status == 401) {
        setCheckCorrectAccount("Password ບໍ່ຖືກຕ້ອງ")
      }
    })
    }
    
  return (
    {
      checkCorrectAccount, loading, role, pressEnterLogin, clickLogin
    }
  )
}

export default Auth