import React, { useState, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import url from './API-links/apiurl'
import Swal from 'sweetalert2'
import Select from 'react-select'
import Spinner from './uitilities/Spinner'
import { NumberFormatBase } from 'react-number-format'
import { useParams } from 'react-router-dom'

function CreateBil() {
    let {id} = useParams();

    const [image, setImage] = useState()
    const [bil, setBil] = useState()
    const [amount, setAmount] = useState()
    const [bill_seller, setbill_seller] = useState()
    const [loading, setLoading] = useState(false)
    const [ getLatestWeek, setgetLatestWeek ] = useState('')

    const [ LengthNumber, setLeng ] = useState(0)
    const setNumberLength = (e) => {
        setLeng(e.target.value.length)
        setBil(e.target.value)
    }

    let convertAmount = parseInt(amount);

    const fullName = sessionStorage.getItem('fullName')
    const province_id = sessionStorage.getItem('Province_id')
    const district_id = sessionStorage.getItem('district_id')
    const village_name = sessionStorage.getItem('village')
    const phone_number = sessionStorage.getItem('phone')
    const checkInput = sessionStorage.getItem('checkInput')

    
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    const [ Week, setWeek ] = useState('')
    const [ Timedraw, setIimedraw ] = useState('')
    const [ ResUID, setResid ] = useState('')

    useEffect(() => {
        if (sessionStorage.getItem('Input') !== "false") {
            axios.put(url.Mainurl + url.putCandidate + id, {
                fullName: fullName,
                province_id: province_id,
                district_id: district_id,
                village: village_name,
                phone: phone_number
            }).then(res => {
                setLoading(true)
            }).catch((err) => {
                setLoading(true)
                console.log(err.message)
            })
        } else {
            axios.post(url.Mainurl + url.postCandidate, {
                fullName: fullName,
                province_id: province_id,
                district_id: district_id,
                village: village_name,
                phone: phone_number
            }).then(res => {
                setLoading(true)
                setResid(res.data.id)
            }).catch((err) => {
                setLoading(true)
                console.log(err.message)
            })
        }
    }, [])
    
    useEffect(() => {
        axios.get(url.Mainurl + url.getLatestWeek).then((res) => {
            setgetLatestWeek(res.data.data)
            setWeek(res.data.data.week);
        })

        axios.get(url.Mainurl + url.getLatestDrawDate).then((res) => {
            setIimedraw(res.data.data)
        })
    }, [reducer])

    let navigate = useNavigate()
    if (!checkInput) {
        return navigate("/")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false)
        setLoading(false)
        axios.post(url.Mainurl + url.postBil, {
            bil_number: bil,
            bil_price: convertAmount,
            bil_seller: bill_seller,
            candidate_id: id == 'none' ? ResUID : id,
            week_id: getLatestWeek.week
        }).then(res => {
            setLoading(true)
            Swal.fire({
                icon: 'success',
                title: 'ເພິ່ມບິນສຳເລັດ!',
                showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ເພິ່ມບິນອີກ',
                    cancelButtonText: 'ອອກ',
                    showCloseButton: true,
            }).then((result) => {
                if(result.isDismissed) {
                    sessionStorage.removeItem('fullName')
                    sessionStorage.removeItem('Province_id')
                    sessionStorage.removeItem('district_id')
                    sessionStorage.removeItem('village')
                    sessionStorage.removeItem('phone')
                    sessionStorage.removeItem('checkInput')

                    return navigate("/")
                } else if (result.isConfirmed) {
                    if(id === "none") {
                        return navigate(`/add-bil/none`)
                    } else {
                        return navigate(`/add-bil/${id}`)
                    }
                } else {
                    localStorage.removeItem('fullName')
                    localStorage.removeItem('Province_id')
                    localStorage.removeItem('district_id')
                    localStorage.removeItem('village')
                    localStorage.removeItem('phone')
                    localStorage.removeItem('checkInput')
                }
            })
        }).catch((err) => {
            setLoading(true)
            if(err.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'ບິນນີ້ຖືກເພິ່ມແລ້ວ',
                    cancelButtonText: 'close',
                    timer: 2000
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ເກີດຂໍ້ຜິດພາດ',
                    cancelButtonText: 'close',
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
        <div>
        {loading === true ? <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title pt-2">ເພິ່ມບິນ</h3>&nbsp;&nbsp;&nbsp;
                                    <label className="btn bg-white btn-outline-white pt-2">ງວດປະຈຸບັນ: ( <strong className='text-danger'>{Week}</strong> ) <text className='btn-sm btn-success' onClick={AddWeek}><i class="bi bi-plus"></i> ເພີມງວດ</text></label>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit} method="POST" encType='multipart/form-data'>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເລກບິນ <span className='text-warning'>( ໝາຍເຫດ: ເລກບິນຕ້ອງມີຈຳນວນ 16 - 19 ໂຕ ) / {LengthNumber}</span></label>
                                                    <div className='input-group'>
                                                        <NumberFormatBase onChange={setNumberLength} minLength={16} maxLength={19} className="form-control" placeholder="ເລກບີນ" required/>
                                                        <span className='input-group-text'> ບີນໃນງວດທີ່: ( <strong className='text-danger'>{Week}</strong> )</span>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ລະຫັດຜູ້ຂາຍ</label>
                                                    <NumberFormatBase className="form-control" onChange={(e) => setbill_seller(e.target.value)} placeholder="ລະຫັດຜູ້ຂາຍ:....." required/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຈຳນວນມູນຄ່າບິນ</label>
                                                    <NumberFormatBase onChange={e => setAmount(e.target.value)} className="form-control" placeholder="ມູນຄ່າບີນ" min={10000} required/>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຊື່ຜູ້ມີສິດສຸ່ມ</label>
                                                    <input value={checkInput ? fullName : ""} className='form-control' disabled />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className={`btn float-right ${(LengthNumber > 15 ? 'btn-success' : '')}`} disabled={(LengthNumber > 15 ? false : true)}>ເພິ່ມຂໍ້ມູນ</button>
                                        <Link to="/add-candidate" className="btn btn-danger">ຍ້ອນກັບ</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div> : <Spinner/>} 
        </div>
    )
}

export default CreateBil