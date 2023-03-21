import React, { useState, useEffect, useReducer } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios';
import url from './API-links/apiurl'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { NumberFormatBase } from 'react-number-format';
import '../assets/css/loadingModal.css'

function Add_bil(props) {

    const PropsUID = props.id

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formvalues, setformValues] = useState({})
    const [candidate, setCandidate] = useState([])
    const [image, setImage] = useState()
    const [bil_number, setBil_number] = useState()
    const [bil_price, setBil_price] = useState()
    const [bil_seller, setbil_seller] = useState()
    const [loading, setLoading] = useState(1)
    const [ getLatestWeek, setgetLatestWeek ] = useState('')

    const [ LengthNumber, setLeng ] = useState(0)
    const setNumberLength = (e) => {
        setLeng(e.target.value.length)
        setBil_number(e.target.value)
    }

    let navigate = useNavigate()
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    const [ Week, setWeek ] = useState('')
    const [ Timedraw, setIimedraw ] = useState('')

    useEffect(() => {
        axios.get(url.Mainurl + url.getCandidateID + PropsUID).then((res) => {
            setCandidate(res.data)
            setLoading(0)
        }).catch((error) => {
            console.log(error)
        })

        axios.get(url.Mainurl + url.getLatestWeek).then((res) => {
            setgetLatestWeek(res.data.data)
            setWeek(res.data.data.week);
        })
        
        axios.get(url.Mainurl + url.getLatestDrawDate).then((res) => {
            setIimedraw(res.data.data)
        })
    }, [reducer])
    

    const addBil = (e) => {
        e.preventDefault()
        setLoading(1)
        axios.post(url.Mainurl + url.postBil, {
            bil_number: bil_number,
            bil_price: bil_price,
            bil_seller: bil_seller,
            candidate_id: candidate.id,
            week_id: getLatestWeek.week
        }).then((res) => {
            setLoading(0)
            Swal.fire({
                icon: 'success',
                title: 'ເພິ່ມບິນສຳເລັດ!',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ເພິ່ມບິນອີກ',
                cancelButtonText: 'ອອກ',
                showCloseButton: true,
            }).then((res) => {
                if (res.isConfirmed) {
                } else if (res.isDismissed) {
                    setShow(false)
                    return navigate("/reloadCandidate")
                } else {
                    setShow(false)
                    return navigate("/reloadCandidate")
                }
            })
        }).catch((error) => {
            setLoading(0)
            if (error.response.status == 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'ເລກບິນນີ້ຖືກເພິ່ມເຂົ້າໃນລະບົບແລ້ວ',
                    timer: 2000
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ເກີດຂໍ້ຜິດພາດ',
                    timer: 2000
                })
            }
        })
    }

    function AddWeek () {
        Swal.fire({
            title: "ທ່ານຕ້ອງການປິດງວດນີ້ ຫຼື ບໍ່?",
            text: "ເມືອເພີມງວດໃໝ່ ແລ້ວ ການເພີມບີນທັດໄປຈະເປັນບີນຂອງງວດປະຈຸບັນ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ເພິ່ມງວດ",
            cancelButtonText: "ຍົກເລີກ",
        }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 25000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })
            
            Toast.fire({
            icon: 'info',
            title: 'ກຳລັງປະເມີນຜົນ'
            })
    
            axios.post(url.Mainurl + url.postWeek)
            .then((res) => {
                axios.get(url.Mainurl + url.getLatestWeek).then(
                (response) => {
                    axios.put(url.Mainurl + url.putDrawDate + Timedraw.id).then((res) => {
                        setRedeuce()
                        Swal.fire({
                            icon: "success",
                            title: "ເພິ່ມງວດແລ້ວ!",
                        })
                    }).catch((err) => {
                        setRedeuce()
                        Swal.fire({
                            icon: "success",
                            title: "ເພິ່ມງວດແລ້ວ!",
                        })
                    })
                }
                );
            })
            .catch((err) => {
                Swal.fire({
                icon: "error",
                title: "ລອງໃຫມ່ອີກຄັ້ງ!",
                });
            });
        }
        });
    }

    return (
        <>
            <Button variant='primary' className='btn btn-sm' onClick={handleShow}>
                <i class="bi bi-cloud-download"></i> ເພິ່ມບິນ
            </Button>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                    {loading === 1 ?
                    <div className='position-lodding'>
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> : "" }
                <Modal.Header closeButton>
                    <Modal.Title>ເພິ່ມບິນ&nbsp;
                        <label className="btn bg-light btn-outline-white pt-2">ງວດປະຈຸບັນ: ( <strong className='text-danger'>{Week}</strong> ) <text className='btn-sm btn-success' onClick={AddWeek}><i class="bi bi-plus"></i> ເພີມງວດ</text></label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={addBil} method='POST' encType='multipart/form-data' className='row'>
                        <Form.Group className='col-6 renative'>
                            <Form.Label>ເລກບິນ: ຈຳນວນເລກບີນຕ້ອງມີ 16 - 19 ໂຕ / {LengthNumber}</Form.Label>
                            <div class='input-group'>
                                <NumberFormatBase name="bil_number" className='form-control' placeholder='ກະລຸນາປ້ອນເລກບິນ' minLength={16} maxLength={19} onChange={setNumberLength} required></NumberFormatBase>
                                <span className='input-group-text'> ບີນໃນງວດທີ່: ( <strong className='text-danger'>{Week}</strong> )</span>
                            </div>
                        </Form.Group>
                        <Form.Group className='col-6 mb-3'>
                            <Form.Label>ມູນຄ່າບິນ</Form.Label>
                            <NumberFormatBase name="bil_price" className='form-control' placeholder='ກະລຸນາປ້ອນມູນຄ່າບິນ' min={10000} onChange={(e) => setBil_price(e.target.value)} required></NumberFormatBase>
                        </Form.Group>
                        <Form.Group className='col-6 mb-3'>
                            <Form.Label>ລະຫັດຜູ້ຂາຍ</Form.Label>
                            <NumberFormatBase name="bil_price" className='form-control' placeholder='ລະຫັດຜູ້ຂາຍ' min={10000} onChange={(e) => setbil_seller(e.target.value)} required></NumberFormatBase>
                        </Form.Group>
                        <Form.Group className='col-6 mb-3'>
                            <Form.Label>ຊື່ຜູ້ມີສິດສຸ່ມ</Form.Label>
                            <input className='form-control' value={candidate.fullName} disabled={true}></input>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="primary" type='submit' className={`${(LengthNumber > 15 ? '' : 'btn-light')}`} disabled={((LengthNumber > 15 ? false : true))}>
                                ເພິມບິນ
                            </Button>
                            <Button variant="danger" onClick={handleClose} >
                                ປິດ
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Add_bil