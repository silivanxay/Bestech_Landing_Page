import axios from 'axios'
import React, { useState } from 'react'
import {Modal, Button,Form} from 'react-bootstrap'
import { NumberFormatBase } from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'

export default function EditUsers(props) {
    let navigate = useNavigate()
    const token = sessionStorage.getItem('myToken')

    const [ loading, setloading ] = useState(false)

    const [ fullname, setfullname ] = useState('')
    const [ phone, setphone ] = useState('')
    const [ username, setusername ] = useState('')
    const [ Password, setPassword ] = useState('')
    const [ ConPassword, setConPassword ] = useState('')
    async function SaveSubmit () {
        if((Password.length == 0) && ConPassword.length == 0 ){
            setloading(true)
            axios.put(url.Mainurl + url.updateUser + props.id, {
                fullname: fullname == '' ? props.fullname : fullname,
                username: username == '' ? props.username : username,
                phone: phone == '' ? props.phone : phone
            }).then((res) => {
                console.log(res.data)
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'ແກ້ໄຂສຳເລັດ!!',
                    confirmButtonText: 'OK!'
                })
            })
        }else{
            if((Password == ConPassword)){
                if(Password !== ''){
                    axios.put(url.Mainurl + url.Changpasword, {
                        username: props.username,
                        password: Password
                    }, { headers: { "Authorization": `Bearer ${token}` } })
                }
                setloading(true)
                axios.put(url.Mainurl + url.updateUser + props.id, {
                    fullname: fullname == '' ? props.fullname : fullname,
                    username: username == '' ? props.username : username,
                    phone: phone == '' ? props.phone : phone
                }).then((res) => {
                    console.log(res.data)
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂສຳເລັດ!!',
                        confirmButtonText: 'OK!'
                    })
                })
            }else{
                alert('ລະຫັດຜ່ານບໍ່ຕົງກັນ')
                setPassword('')
                setConPassword('') 
            }
        }
    }

    function ResetPassword () {
        setPassword('')
        setConPassword('')
    }

    const [Check, setCheck] = useState(false);

    const [ show, setshow ] = useState(false)
    const handleShow = () => setshow(true)
    const handleClose = () => setshow(false)
    return(
        <>
        <Button variant='primary' onClick={handleShow}>
            <i className='fas fa-edit'>ແກ້ໄຂ</i>
        </Button>
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" >
            {loading == true ?
                <div className='position-lodding'>
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> : "" 
            }
            <Modal.Header closeButton>
                <Modal.Title><i class="bi bi-person-vcard-fill"></i> ແກ້ໄຂຂໍ້ມູນ USERS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form method='put'>
                    <div className='form-group'>
                        <label>Fullname</label>
                        <div className='input-group'>
                            <span className='input-group-text'><i class="bi bi-person-vcard"></i></span>
                            <input type='text' className='form-control' defaultValue={props.fullname} onChange={(e) => setfullname(e.target.value)} placeholder='ກະລຸນາປ້ອນຊື່:....'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Phone</label>
                        <div className='input-group'>
                            <span className='input-group-text'><i class="bi bi-telephone-plus-fill"></i></span>
                            <NumberFormatBase type='text' className='form-control' defaultValue={props.phone} onChange={(e) => setphone(e.target.value)} placeholder='ກະລຸນາປ້ອນເບີໂທ:....'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>UserName</label>
                        <div className='input-group'>
                            <span className='input-group-text'><i class="bi bi-person-fill-gear"></i></span>
                            <input type='text' className='form-control' defaultValue={props.username} onChange={(e) => setusername(e.target.value)} placeholder='ກະລຸນາປ້ອນ UserName:....'/>
                        </div>
                    </div>
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" onClick={ResetPassword} data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Chang Pasword
                            </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <div className='form-group'>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-hash"></i></span>
                                            <input type={Check == true ? 'text' : 'password'} className='form-control' value={Password} onChange={(e) => setPassword(e.target.value)} placeholder='New Pasword:....'/>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='input-group'>
                                            <span className='input-group-text'><i class="bi bi-hash"></i></span>
                                            <input type={Check == true ? 'text' : 'password'} className='form-control' value={ConPassword} onChange={(e) => setConPassword(e.target.value)} placeholder='Confirm Pasword:....'/>
                                        </div>
                                    </div>
                                    <input type='checkbox' id='ShowPassword' value='show'  onChange={(e) => setCheck(e.target.checked) }/> &nbsp;<label for='ShowPassword' className='user-select-none'>ສະແດງລະຫັດຜ່ານ</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </form>
                <Modal.Footer>
                    <Button variant="primary" type='submit' onClick={SaveSubmit}> ແກ້ໄຂ </Button>
                    <Button variant="danger" onClick={handleClose}> ປິດ </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
        </>
    )
}
