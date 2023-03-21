/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React, { useEffect, useState, useRef, useReducer } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Spinner from '../components/uitilities/Spinner'
import { EditEventModal } from './EditEventModal'
import { Modal, Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import '../assets/css/customPagination.css'
import '../../src/assets/css/table.css'
import '../../src/assets/css/style-event-slide.css'

const Event = () => {
  const token = sessionStorage.getItem('myToken')
  if (!token) {
    window.location = "/login"
  }
  const [loading, setLoading] = useState(false)
  const [showEvent, setshowEvent] = useState([])
  const [showModal, setshowModal] = useState(false)
  const [ reducer, setReducer ] = useReducer(x => x +1, 0)

  useEffect(() => {
      axios.get(url.Mainurl + url.getEvent).then((res) => {
        setshowEvent(res.data.rows.reverse())
        setLoading(true)
      }).catch((err) => {
        console.log(err)
      })
  }, [reducer])

  const deleteEvent = (id) => {
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
        axios.delete(url.Mainurl + url.deleteEvent + id).then(() => {
          Swal.fire(
            'ລົບຂໍ້ມູນສຳເລັດ!',
            'ເມືອລົບແລ້ວຈະບໍ່ສາມາດກູ້ຂໍ້ມູນຄືນໃດ້!',
            'success'
          )
          setReducer()
          setModal(false)
        }).catch(() => {
          setReducer()
          setModal(false)
          alert('ເກີດຂໍ້ຜິດພາດ')
        })
      }
    })
  }

  const [value, setValue] = useState('')
  const [tableFiller, setTablefiller] = useState([])
  const fillterData = (e) => {
    if(e.target.value != ''){
        setValue(e.target.value);
        const fillterTable = showEvent.filter(o => Object.keys(o).some(k => 
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        ));
        setTablefiller([...fillterTable])
    }else{
        setValue(e.target.value);
        setshowEvent([...showEvent])
    }
}

  function Reset() {
    setReducer()
    setValue('')
  }

  const [ ModalEvent , setModal ] = useState(false)
  const ModalClose = () => setModal(false)
  const [ ItemM, setItemM ] = useState('')
  function eventClick (item) {
    setItemM(item)
    setModal(true)
  }

  return (
    <div>
      <Modal show={ModalEvent} onHide={ModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
            <Modal.Title className='Nato_sanlaos'><strong className='Nato_sanlaos'>ລາຍລະອຽດກິດຈະກຳ:</strong> {ItemM.sub_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex'>
            <div className='col-md-6'>
              <img src={url.file + ItemM.image} style={{width: 100+'%'}}/>
            </div>
            <div className='col-md-6 p-3'>
              <h5 className='text-center'>ຫົວຂໍ້ຫລັກ: {ItemM.sub_title}</h5><hr/>
              <p>ຫົວຂໍ້ຍ່ອຍ: <span>{ItemM.title}</span></p>
              <p>ເບີໂທຕິດຕໍ່: <span>{ItemM.phone}</span></p>
              <p>ສະຖານທີ່ຈັດກິດຈະກຳ: <span>{ItemM.address}</span></p>
              <p>ລາຍລະອຽດ: <span>{ItemM.description}</span></p>
              <hr/>
              <p>ວັນເລີ່ມກິດຈະກຳ: <span>{ItemM.start_date}</span></p>
              <p>ວັນສິ້ນສຸດກິດຈະກຳ: <span>{ItemM.end_date}</span></p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <EditEventModal id={ItemM.id} showModal={showModal} setshowModal={setshowModal} />
          <Button variant="danger" type='button' onClick={() => deleteEvent(ItemM.id)}>
            <i class="bi bi-trash3-fill"></i> ລົບຂໍ້ມູນ 
          </Button>
        </Modal.Footer>
      </Modal>
      {loading === true ? <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header display-respone">
                    <h3 className="card-title pt-2 w-100">ຂໍ້ມູນກິດຈະກຳທັງຫມົດ ( <strong className='text-danger'>{showEvent.length}</strong> )</h3>
                    <div className="card-tools w-100">
                      <div className="input-group pt-2 input-group-sm">
                        <input type="search" name="table_search" onChange={fillterData} className="form-control" placeholder="ຄົ້ນຫາດ້ວຍຫົວຂໍ້ຫລັກ..." />
                        <div className="input-group-append">
                          <button type='button' onClick={Reset} className="btn btn-default">
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  {/* /.card-header */}
                  <div className="card-body table-responsive p-0">
                      <div className='display-card-event'>
                        <Link to="/add-event" className='btn card card-event'>
                          <div className='plus-event'>
                            <span className='span-renative-event'>
                              <i class="bi bi-plus-lg icon-event"></i><br/>
                              <p className='title-event'></p>
                            </span>
                            <span className='span-absolute-event'>
                              <i class="bi bi-plus-lg icon-event"></i><br/>
                              <p className='title-event Nato_sanlaos'>ເພີມຂໍ້ມູນ</p>
                            </span>
                          </div>
                        </Link>

                        {value.length > 0 ? tableFiller.map((item, index) => (
                          <div className='card card-event' onClick={() => eventClick(item)}>
                            <div className='card-IMG-Event'>
                              <img src={url.file + item.image} id='IMG-Event'/>
                            </div>
                            <div className='hover-absolute-event'>
                              <text className='btn text-white'>
                                <p>ຫົວຂໍ້ຫລັກ: {item.sub_title}</p>
                                <p className='title-hover-event'>
                                  <hr/>
                                  <p>ຫົວຂໍ້ຍ່ອຍ: {item.title}</p>
                                  <p>ສະຖານທີ່ຈັດກິດຈະກຳ: {item.address}</p>
                                  <p>ເບີໂທຕິດຕໍ່: {item.phone}</p>
                                  <p>ລາຍລະອຽດ: {item.description}</p>
                                  <hr/>
                                  <p>ວັນເລີ່ມກິດຈະກຳ: {item.start_date}</p>
                                  <p>ວັນສິ້ນສຸດກິດຈະກຳ: {item.end_date}</p>
                                </p>
                              </text>
                            </div>
                          </div>
                        )) : showEvent.map((item, index) => (
                          <div className='card card-event' onClick={() => eventClick(item)}>
                            <div className='card-IMG-Event'>
                              <img src={url.file + item.image} id='IMG-Event'/>
                            </div>
                            <div className='hover-absolute-event'>
                              <text className='btn text-white'>
                                <p>ຫົວຂໍ້ຫລັກ: {item.sub_title}</p>
                                <p className='title-hover-event'>
                                  <hr/>
                                  <p>ຫົວຂໍ້ຍ່ອຍ: {item.title}</p>
                                  <p>ສະຖານທີ່ຈັດກິດຈະກຳ: {item.address}</p>
                                  <p>ເບີໂທຕິດຕໍ່: {item.phone}</p>
                                  <p>ລາຍລະອຽດ: {item.description}</p>
                                  <hr/>
                                  <p>ວັນເລີ່ມກິດຈະກຳ: {item.start_date}</p>
                                  <p>ວັນສິ້ນສຸດກິດຈະກຳ: {item.end_date}</p>
                                </p>
                              </text>
                            </div>
                          </div>
                        ))}
                      </div>
                  </div>

                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </div>
      </div> : <Spinner />}
    </div>
  )
}

export default Event