import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useFunctions from './useFunctions'

export default function Form_slide() {

    let {
        Submit,
    } = useFunctions()

    const [preview, setpreview] = useState('')

    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className='card'>
                            <div className='card-header bg-success user-select-none'><h4>ເພີມ ຂໍ້ມູນ: Slide</h4></div>
                            <form method='POST' onSubmit={Submit}>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label>ຮູບພາບສະໄລສ໌</label>
                                                <input type='file' className='form-control' onChange={(e) => setpreview(e.target.files[0])}/>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label>ຫົວຂໍ້</label>
                                                <div className='input-group'>
                                                    <span className='input-group-text'><i class="bi bi-card-heading"></i></span>
                                                    <input type='text' className='form-control' placeholder=':.......' required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-12'>
                                            <img src={preview === '' ? '' : URL.createObjectURL(preview)} id="IMG-Slide" alt='ກະລຸນາເລືອກຮູບພາບສະໄລສ໌'/>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-footer Nato_sanlaos'>
                                    <button type='submit' className='btn btn-sm btn-outline-success mr-2' ><i class="bi bi-gear-wide-connected"></i> | ບັນທືກຂໍ້ມູນ</button>
                                    <Link to='/slider' className='btn btn-sm btn-outline-danger' ><i class="bi bi-chevron-bar-left"></i> | ຍ້ອນກັບ</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
