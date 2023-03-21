import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Menu from './components/Menu';
import axios from 'axios';
import Routers from './Routers/Routers';
import 'bootstrap/dist/css/bootstrap.css'
import url from '../src/components/API-links/apiurl'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../src/components/uitilities/Icon';
import Title from '../src/components/uitilities/Title'
import Swal from 'sweetalert2';
import Moment from 'moment';

function App(props) {

  const navigate = useNavigate()
  const [messageLogin, setmessage] = useState('')

  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  function LoginSubmit(e) {
    e.preventDefault()
    if (!(username == '' && password == '')) {
      setmessage('ກະລຸນາລໍຖ້າ...')
      axios.post(url.Mainurl + url.loginedUser, {
        username: username,
        password: password
      }).then((res) => {
        console.log(res)
        if (res.status == 200) {
          localStorage.setItem('token', res.data.access)
          localStorage.setItem('refresh_token', res.data.refresh)
          sessionStorage.setItem('myToken', res.data.access);
          sessionStorage.setItem('conFirmToken', res.data.access);
          sessionStorage.setItem('confirm', res.data.access + 'true');
          sessionStorage.setItem('CURDATE', Moment().format("YYYY/MM/DD H:mm:ss"))
          navigate('/')
          setusername('')
          setpassword('')
          setmessage('')
        }
      }).catch((err) => {
        setmessage('Username or password is incorrect')
      })
    } else {
      setmessage('Username or password is incorrect')
    }
  }

  const Timers = Moment(sessionStorage.getItem('CURDATE')).format('H') * 1
  useEffect(() => {
    if ((Moment(sessionStorage.getItem('CURDATE')).format('YYYY/MM/DD') !== Moment().format('YYYY/MM/DD'))) {
      setmessage('ໄອດີໝົດອາຍຸ: ' + Moment().format('DD/MM/YYYY H:mm') + ' ກະລຸນາລ໊ອກອີນໃໝ່ອີກຄັ້ງ')
    }
  }, [])

  const [checkpsshow, setshowpas] = useState(false)
  const chechshow = () => setshowpas(true)
  const checkhid = () => setshowpas(false)

  if (sessionStorage.getItem('myToken') + 'true' == sessionStorage.getItem('confirm') && sessionStorage.getItem('myToken') == sessionStorage.getItem('conFirmToken')) {
    return (
      <>
        <Header />
        <Menu />
        <Routers />
        <Footer />
      </>
    )
  } else {
    return (
      <>
        <div className='container user-select-none'>
          <div style={{ marginTop: 100 }} className='w-50 d-block mx-auto bg-white shadow p-5'>
            <Icon />
            <Title />

            <form method='POST' onSubmit={LoginSubmit}>
              <div className='form-group'>
                <label>UserName</label>
                <input type='text' className='form-control p-2' onChange={(e) => setusername(e.target.value)} placeholder='ກະລຸນາປ້ອນ UserName' required />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <div className='relative'>
                  <input type={`${checkpsshow == true ? 'text' : 'password'}`} className='form-control p-2' onChange={(e) => setpassword(e.target.value)} placeholder='ກະລຸນາປ້ອນ Password' required />
                  <span className='position-eye'>
                    <i class={`bi bi-eye-slash-fill ${checkpsshow == true ? 'd-none' : ''}`} onClick={chechshow}></i>
                    <i class={`bi bi-eye-fill ${checkpsshow == false ? 'd-none' : ''}`} onClick={checkhid}></i>
                  </span>
                </div>
              </div>
              <div className='w-100 text-center'>
                <strong className='text-danger text-end'>{messageLogin}</strong>
              </div>
              &nbsp;
              <div className='form-footer'>
                <button type='submit' className='form-control btn btn-sm btn-primary'>Login</button>
              </div>
            </form>

          </div>
        </div>


      </>
    )
  }

}

export default App;
