import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useFunctions from './useFunctions';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Form_about() {

    let {
        onSubmit
    } = useFunctions()

    const [preview, setPreview] = useState('')

    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className='card'>
                            <div className='card-header bg-success user-select-none'><h4>ເພີມ ຂໍ້ມູນ: About</h4></div>
                            <form method='POST' onSubmit={onSubmit}>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group Nato_sanlaos'>
                                                <label className='Nato_sanlaos'>Logo</label>
                                                <div className='input-group Nato_sanlaos'>
                                                    <input type='file' className='form-control' onChange={(e) => setPreview(e.target.files[0])}/>
                                                </div>
                                            </div>
                                            <img className='float-left' style={{ width: 100 + '%' }} src={preview === '' ? '' : URL.createObjectURL(preview)} alt='ກະລຸນາເລືອກຮູບພາບ'/>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='form-group Nato_sanlaos'>
                                                <label className='Nato_sanlaos'>ຫົວຂໍ້</label>
                                                <div className='input-group Nato_sanlaos'>
                                                    <input className='form-control' placeholder='.......' />
                                                </div>
                                            </div>

                                            <div className='form-group Nato_sanlaos'>
                                                <label className='Nato_sanlaos'>ຄຳອະທິບາຍ</label>
                                                <textarea className='form-control' placeholder='ຄຳອະທິບາຍ:.....' rows='5'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-footer Nato_sanlaos'>
                                    <button type='submit' className='btn btn-sm btn-outline-success mr-2' ><i class="bi bi-gear-wide-connected"></i> | ບັນທືກຂໍ້ມູນ</button>
                                    <Link to='/about' className='btn btn-sm btn-outline-danger' ><i class="bi bi-chevron-bar-left"></i> | ຍ້ອນກັບ</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
