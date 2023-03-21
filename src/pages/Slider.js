/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React, { useEffect, useState, useRef, useReducer } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import EditSliderModal from './EditSliderModal'
import Spinner from '../components/uitilities/Spinner'
import '../assets/css/style-event.css'
import { Button, Modal, Form } from 'react-bootstrap'

const Slider = () => {
  const token = sessionStorage.getItem('myToken')
  if(!token) {
    window.location = "/login"
  }
  const [slider, setSlider]= useState([])
  const [showModal, setshowModal] = useState(false)
  const [filteredText, setFilterText] = useState("")
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const [ reducer, setReducer ] = useReducer(x => x + 1, 0)

  useEffect(() => {
    axios.get(url.Mainurl + url.getBanner).then((res) => {
      setSlider(res.data)
      setLoading(true)
    })
  },[reducer])

  const DeleteSlider = (id) => {
   
    Swal.fire({
      title: 'ທ່ານຈະລົບຂໍ້ມູນແທ້ຫລືບໍ່?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລົບຂໍ້ມູນ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(url.Mainurl + url.deleteBanner + id).then(() => {
          setSlider(slider.filter((val) => {
            Swal.fire({
              icon:'success',
              title: 'ລົບຂໍ້ມູນສຳເລັດ!'
            })
            return val.id !== id
          }))
        }).catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'ເກີດຂໍ້ຜິດພາດ'
          })
        })
      }
    })
  }

  function reset() {
    setReducer()
    inputRef.current.value = "";
    setFilterText("")
    axios.get(url.Mainurl + url.getBanner).then((res) => {
      setSlider(res.data)
    })
  }

  const [value, setValue] = useState('')
  const [tableFiller, setTablefiller] = useState([])
  const fillterData = (e) => {
    if(e.target.value != ""){
        setValue(e.target.value);
        const fillterTable = slider.filter(o => Object.keys(o).some(k => 
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        ));
        setTablefiller([...fillterTable])
    }else{
        setValue(e.target.value);
        setSlider([...slider])
    }
  }

  const [ fileIMG, setFileIMG ] = useState('')
  function Modal_IMG (e) {
    setFileIMG(e.image)
    setModalSHow(true)
  }
  const [ ModalSHow, setModalSHow ] = useState(false)
  const ModalCloss = () => setModalSHow(false)

  return (
    <div>
      <Modal show={ModalSHow} onHide={ModalCloss} size='xl' className='user-select-none' aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body className="renative posotion-backgroup">
          <img src={url.file + fileIMG} width='100%'></img>
        </Modal.Body>
    </Modal>
    {loading === true ? <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <Link to="/add-slider" className="card-title btn btn-success float-right">ເພິ່ມ Slide</Link>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="card-header display-respone">
                  <h3 className="card-title w-100">ຮູບພາບສະໄລສ໌ ທັງຫມົດ ( <strong className='text-danger'>{slider.length}</strong> )</h3>
                  <div className="card-tools w-100">
                    <div className="input-group input-group-sm">
                      <input ref={inputRef} onChange={fillterData} type="search" name="table_search" className="form-control" placeholder="ຄົ້ນຫາດ້ວຍຊື່ຣູບພາບ..." />
                      <div className="input-group-append">
                        <button onClick={reset} type="submit" className="btn btn-default">
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body p-0">
                  <ul className='list-group group-item-event'>
                    {value.length > 0 ? tableFiller.map((item, index) => (
                      <>
                      <li className='list-group-item renative hover-event'>
                        <div className='z-index-event'>
                          <label className='absolute-event'>{item.name}</label>
                          <span className='absolute-event-right'>
                            <div class="btn-group-sm">
                              <EditSliderModal name={item.name} id={item.id} image={item.image}></EditSliderModal><br/>
                              <button class="btn-sm btn-danger Nato_sanlaos" onClick={() => DeleteSlider(item.id)}><i class="fas fa-trash"></i> ລົບຂໍ້ມູນ</button>
                            </div>
                          </span>
                          <span className='absolute-event-repone'>
                            <div className='d-block text-center'>
                              <p>{item.name}</p>
                              <div class="btn-group btn-group-sm">
                                <EditSliderModal name={item.name} id={item.id} image={item.image}></EditSliderModal>&nbsp;
                                <button class="btn-sm btn-danger Nato_sanlaos" onClick={() => DeleteSlider(item.id)}><i class="fas fa-trash"></i> ລົບຂໍ້ມູນ</button>
                              </div>
                            </div>
                          </span>
                          <img src={url.file + item.image} id='IMG_EVENT' onClick={() => Modal_IMG(item)}></img>
                        </div>
                      </li>
                      </>
                    )) : slider.map((item, index) => (
                      <>
                      <li className='list-group-item renative hover-event'>
                        <div className='z-index-event'>
                          <label className='absolute-event'>{item.name}</label>
                          <span className='absolute-event-right'>
                            <div class="btn-group-sm">
                              <EditSliderModal name={item.name} id={item.id} image={item.image}></EditSliderModal><br/>
                              <button class="btn-sm btn-danger Nato_sanlaos" onClick={() => DeleteSlider(item.id)}><i class="fas fa-trash"></i> ລົບຂໍ້ມູນ</button>
                            </div>
                          </span>
                          <span className='absolute-event-repone'>
                            <div className='d-block text-center'>
                              <p>{item.name}</p>
                              <div class="btn-group btn-group-sm">
                                <EditSliderModal name={item.name} id={item.id} image={item.image}></EditSliderModal>&nbsp;
                                <button class="btn-sm btn-danger Nato_sanlaos" onClick={() => DeleteSlider(item.id)}><i class="fas fa-trash"></i> ລົບຂໍ້ມູນ</button>
                              </div>
                            </div>
                          </span>
                          <img src={url.file + item.image} id='IMG_EVENT'  onClick={() => Modal_IMG(item)}></img>
                        </div>
                      </li>
                      </>
                    ))}
                  </ul>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </div>
    </div> : <Spinner /> }
    </div>
  )
}

export default Slider