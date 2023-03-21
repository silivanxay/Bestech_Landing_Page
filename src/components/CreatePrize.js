import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import url from './API-links/apiurl'
import Spinner from './uitilities/Spinner'
import { NumberFormatBase } from 'react-number-format';

const CreatePrize = () => {
    const token = localStorage.getItem('token');

    // const [Title, setTitle] = useState('')
    // const [Description, setDescription]= useState('')
    // const [Image, setImage]= useState()
    // const [Quantity, setQuantity]= useState('')
    const [formvalues, setformValues]= useState({})
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setformValues({...formvalues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false)
        setformValues(
            axios.post(url.Mainurl + url.createPrize, formvalues, {headers: { "Authorization": `Bearer ${token}` }}).then((res) => {
                setLoading(true)
                Swal.fire({
                    icon: 'success',
                    title: 'ສ້າງລາງວັນສຳເລັດ',
                    confirmButtonText: 'ເພິ່ມອີກ',
                    cancelButtonText: 'ອອກ',
                    cancelButtonColor: '#ff0000',
                    showCancelButton: true
                }).then((res) => {
                    if(res.isConfirmed) {
                        return navigate("/add-prize")
                    } else {
                        return navigate("/prize")
                    }
                })
            }).catch((err) => {
                setLoading(true)
                if(err.response.status !== 401){
                    Swal.fire({
                        icon: 'error',
                        title: 'ກະລຸນາລອງໃຫມ່ອີກຄັ້ງ',
                        cancelButtonText: 'close'
                    })
                }else{
                    alert('ໄອດີີນີ້ໝົດອາຍຸແລ້ວ ກະລຸນາລ໊ອກອີນໃໝ່')
                }
                
            })
        )
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
                                    <h3 className="card-title">ເພິ່ມລາງວັນ</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit}>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ລາງວັນທີ່</label>
                                                    <NumberFormatBase type="number" min={1} className="form-control" name='title' value={formvalues.title} onChange={handleChange} placeholder="ລາງວັນທີ່:" required/>
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຈຳນວນ</label>
                                                    <NumberFormatBase type='number' min={1} className="form-control" name='quantity' value={formvalues.quantity} onChange={handleChange} placeholder="ຈຳນວນລາງວັນ" required/>
                                                </div>
                                            </div>
                                           
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ລາຍລະອຽດລາງວັນ</label>
                                                    <textarea min={0} className="form-control" name='description' value={formvalues.description} onChange={handleChange} placeholder="ລາຍລະອຽດລາງວັນ" required/>
                                                </div>
                                            </div>

                                            
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">ເພິ່ມລາງວັນ</button>
                                        <Link to="/prize" className="btn btn-danger float-right">ອອກ</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div> : <Spinner/> }
        </div>
    )
}

export default CreatePrize