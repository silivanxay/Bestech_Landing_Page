import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/imgs/logo.jpg'
import SBS from '../assets/imgs/sbs.jpg'
import Swal from 'sweetalert2'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TreeView } from '@material-ui/lab';
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios'
import url from '../components/API-links/apiurl'
import Moment from 'moment'


const Menu = (props) => {

  const location = useLocation();
  const splitLocation = location.pathname
  const token = localStorage.getItem('token')
  const refresh_token = localStorage.getItem('refresh_token')
  let navigate = useNavigate()

  const rand = () => Math.random(0).toString(36).substr(2);
  const setitem = (length) => (rand() + rand() + rand() + rand()).substr(0, length);

  function Logout() {
    Swal.fire({
      title: 'ທ່ານຈະອອກຈາກລະບົບແທ້ຫລືບໍ່?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ອອກຈາກລະບົບ',
      cancelButtonText: 'ຍົກເລີກ',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(url.Mainurl + url.logout, {
          refresh_token: refresh_token
        }).then((res) => {
          sessionStorage.setItem('confirm', token + setitem(60) + '.' + setitem(60) + 'true')
          sessionStorage.setItem('conFirmToken', token + setitem(60) + '.' + setitem(60) + 'true')
          sessionStorage.setItem('myToken', token + setitem(60) + '.' + setitem(60) + 'true')
          sessionStorage.removeItem('dt')
          localStorage.removeItem('token')
          navigate('/')
        }).catch((err) => {
          sessionStorage.setItem('confirm', token + setitem(60) + '.' + setitem(60) + 'true')
          sessionStorage.setItem('conFirmToken', token + setitem(60) + '.' + setitem(60) + 'true')
          sessionStorage.setItem('myToken', token + setitem(60) + '.' + setitem(60) + 'true')
          sessionStorage.removeItem('dt')
          localStorage.removeItem('token')
          navigate('/')
        })
      }
    })
  }

  if (splitLocation != "add-district") {
    sessionStorage.removeItem('province_id')
    sessionStorage.removeItem('input')
  }

  if (splitLocation == "/reloadRandom") {
    return navigate("/random")
  }

  if (splitLocation == "/reloadDistrict") {
    return navigate("/district")
  }

  if (splitLocation == "/reloadEvent") {
    return navigate("/event")
  }

  if (splitLocation == "/reloadPrize") {
    return navigate("/prize")
  }

  if (splitLocation == "/reloadProvince") {
    return navigate("/province")
  }

  if (splitLocation == "/reloadSlider") {
    return navigate("/slider")
  }

  if (splitLocation == "/reloadUser") {
    return navigate("/user")
  }

  if (splitLocation == "/reloadAbout") {
    return navigate("/about")
  }

  if (splitLocation == "/reloadCandidate") {
    return navigate("/Candidates_eligibility")
  }

  if (splitLocation == "/reloadSettime") {
    return navigate("/settime")
  }

  const Timers = Moment(sessionStorage.getItem('CURDATE')).format('H') * 1
  if ((Moment(sessionStorage.getItem('CURDATE')).format('YYYY/MM/DD') !== Moment().format('YYYY/MM/DD'))) {
    axios.post(url.Mainurl + url.logout, {
      refresh_token: refresh_token
    }).then((res) => {
      sessionStorage.setItem('confirm', token + setitem(60) + '.' + setitem(60) + 'true')
      sessionStorage.setItem('conFirmToken', token + setitem(60) + '.' + setitem(60) + 'true')
      sessionStorage.setItem('myToken', token + setitem(60) + '.' + setitem(60) + 'true')
      sessionStorage.removeItem('dt')
      localStorage.removeItem('token')
      navigate('/')
    })
    sessionStorage.setItem('confirm', token + setitem(60) + '.' + setitem(60) + 'true')
    sessionStorage.setItem('conFirmToken', token + setitem(60) + '.' + setitem(60) + 'true')
    sessionStorage.setItem('myToken', token + setitem(60) + '.' + setitem(60) + 'true')
    sessionStorage.removeItem('dt')
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <aside className={`position-fixed main-sidebar h-100 overflow-auto sidebar-dark-primary elevation-4 user-select-none`}>
      {/* Brand Logo */}
      <div className='nav-link-menuposition'>
        <Link to="#" className="nav-link " data-widget="pushmenu" role="button"><i className="fas fa-bars padding-border-menu" /></Link>
      </div>
      <a href="http://www.bestech.la/" target="_blank" rel="noopener noreferrer" className="brand-link text-decoration-none">
        <img src={Logo} alt="Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span className="brand-text font-weight-light">Bestech</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">

        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={SBS} alt="logo" className="img-circle elevation-2" />
          </div>
          <div className="info">
            <Link className="d-block text-decoration-none">Random Web</Link>
          </div>
        </div>

        <nav className="mt-2 ">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">



            <li className="nav-header">ເມນູທັງຫມົດ</li>
            <li className="nav-item">
              <Link to="/luckydraw" className="nav-link">
                <i className="nav-icon fas fa-heart" />
                <p>
                  ໜ້າສຸ່ມ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i class="nav-icon bi bi-person-lines-fill"></i>
                <p>
                  ຂໍ້ມູນຜູ້ທີ່ມີສິດສູ່ມແລະເລກບີນ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Candidates_eligibility" className="nav-link">
                <i className="nav-icon fa fa-users" />
                <p>
                  ຂໍ້ມູນຜູ້ມີສິດສຸ່ມ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/winner" className="nav-link">
                <i className="nav-icon fa fa-list" />
                <p>
                  ລາຍຊື່ຜູ້ຖືກລາງວັນ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settime" className="nav-link">
                <i className="nav-icon fa fa-clock" />
                <p>
                  ຈັດການເວລາສຸ່ມລາງວັນ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/prize" className="nav-link">
                <i className="nav-icon fa fa-trophy" />
                <p>
                  ລາງວັນ
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/province" className="nav-link">
                <i className="nav-icon fa fa-road " />
                <p>
                  ສ້າງແຂວງ ແລະ ສ້າງເມືອງ
                </p>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link">
                <p data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <i class="nav-icon bi bi-browser-safari"></i>
                  ຈັດການໜ້າເວັບ
                </p>
              </Link>
              <div class="collapse" id="collapseExample">
                <TreeItem nodeId="2" label={
                  <ListItem>
                    <i className="far fa-circle nav-icon text-white ps-2" />
                    <Link to="/slider" className="nav-link ps-2">

                      <p>ສະໄລສ</p>
                    </Link>
                  </ListItem>

                }>
                </TreeItem>
                <TreeItem nodeId="3" label={
                  <ListItem button component="a" href="#">
                    <i className="far fa-circle nav-icon ps-2" />
                    <Link to="/event" className="nav-link ps-2">

                      <p>ກິດຈະກຳ</p>
                    </Link>
                  </ListItem>}>
                </TreeItem>

                <TreeItem nodeId="4" label={
                  <ListItem button component="a" href="#">
                    <i className="far fa-circle nav-icon ps-2" />
                    <Link to="/about" className="nav-link ps-2">
                      <p>ກ່ຽວກັບ</p>
                    </Link>
                  </ListItem>}>
                </TreeItem>

                <TreeItem nodeId="4" label={
                  <ListItem button component="a" href="#">
                    <i className="far fa-circle nav-icon ps-2" />
                    <Link to="/Footer" className="nav-link ps-2">
                      <p>ຈັດການ Footer</p>
                    </Link>
                  </ListItem>}>
                </TreeItem>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/user" className="nav-link">
                <p data-toggle="collapse" href="#collapseExampleusers" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <i class="nav-icon bi bi-person-vcard"></i>
                  ຈັດການຜູ້ເຂົ້າໃຊ້ລະບົບ
                </p>
              </Link>
            </li>

            <li className="nav-item">
              <a onClick={Logout} className="nav-link">
                <i className="fas fa-sign-out-alt nav-icon" />
                <p>ອອກຈາກລະບົບ</p>
              </a>
            </li>

          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>

  )
}

export default Menu