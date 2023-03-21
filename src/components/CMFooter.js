import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react'
import Spinner from "../components/uitilities/Spinner";
import { NumberFormatBase } from 'react-number-format';
import Swal from 'sweetalert2';
import url from './API-links/apiurl'

export default function CMFooter() {

  const [ ERROR, setERROR ] = useState(true)
  const [ reducer, setReducer ] = useReducer(x => x + 1, 0)
  const [ GETAPI, setAPI ] = useState([])
  useEffect(() => {
    axios.get(url.Mainurl + url.GETFOOTER).then((res) => {
      setAPI(res.data.data == undefined ? '' : res.data.data)
    })
  }, [reducer])

  const [ FB, setFB ] = useState('')
  const [ EM, setEM ] = useState('')
  const [ IG, setIG ] = useState('')
  const [ T1, setT1 ] = useState('')
  const [ T2, setT2 ] = useState('')
  const [ WA, setWA ] = useState('')

  function Submit() {
    setERROR(false)
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
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
    if(GETAPI !== undefined){
      if(GETAPI !== ''){
        axios.patch(url.Mainurl + url.PATCHFOOTER + GETAPI.id, {
          title: (T1 == '' ? GETAPI.title : T1),
          email_url: (EM == '' ? GETAPI.email_url : EM),
          ig_url: (IG == '' ? GETAPI.ig_url : IG),
          facebook_url: (FB == '' ? GETAPI.facebook_url : FB),
          whatsapp: (WA == '' ? GETAPI.whatsapp : WA),
          map_title: (T2 == '' ? GETAPI.map_title : T2),
          map_url: ''
        }).then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'ບັນທືກຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500,
            width: 350,
          })
          setERROR(true)
          setReducer()
        }).catch((err) => {
          setERROR(true)
          alert('~~ເກິດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ້ອີກຄັ້ງ!~~')
        })
      }else{
        axios.post(url.Mainurl + url.POSTFOOTER, {
          title: (T1 == '' ? GETAPI.title : T1),
          email_url: (EM == '' ? GETAPI.email_url : EM),
          ig_url: (IG == '' ? GETAPI.ig_url : IG),
          facebook_url: (FB == '' ? GETAPI.facebook_url : FB),
          whatsapp: (WA == '' ? GETAPI.whatsapp : WA),
          map_title: (T2 == '' ? GETAPI.map_title : T2),
          map_url: ''
        }).then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'ບັນທືກຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500,
            width: 350,
          })
          setERROR(true)
          setReducer()
        }).catch((err) => {
          setERROR(true)
          alert('~~ເກິດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ້ອີກຄັ້ງ!~~')
        })
      }
  }else{setERROR(true)}
  }
  
  return (
    <div>
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className='card'>
                <div className='card-header bg-success user-select-none'><h4>ຈັດການ ຂໍ້ມູນ: Footer</h4></div>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='form-group Nato_sanlaos'>
                        <label className='Nato_sanlaos'>Facebook</label>
                        <div className='input-group Nato_sanlaos'>
                          <span className='input-group-text'><i class="bi bi-facebook"></i></span>
                          <input className='form-control' defaultValue={GETAPI.facebook_url} onChange={(e) => setFB(e.target.value)} placeholder='URL:// Facebook:....'/>
                        </div>
                      </div>

                      <div className='form-group Nato_sanlaos'>
                        <label className='Nato_sanlaos'>Instagram</label>
                        <div className='input-group Nato_sanlaos'>
                          <span className='input-group-text'><i class="bi bi-instagram"></i></span>
                          <input className='form-control' defaultValue={GETAPI.ig_url} onChange={(e) => setIG(e.target.value)} placeholder='URL:// Instagram:....'/>
                        </div>
                      </div>

                      <div className='form-group Nato_sanlaos'>
                        <label className='Nato_sanlaos'>Email</label>
                        <div className='input-group Nato_sanlaos'>
                          <span className='input-group-text'><i class="bi bi-envelope-at-fill"></i></span>
                          <input type='email' className='form-control' defaultValue={GETAPI.email_url} onChange={(e) => setEM(e.target.value)} placeholder='Email:....'/>
                        </div>
                      </div>
                      
                      <div className='form-group Nato_sanlaos'>
                        <label className='Nato_sanlaos'>WhatApp</label>
                        <div className='input-group Nato_sanlaos'>
                          <span className='input-group-text'><i class="bi bi-whatsapp"></i>&nbsp;| +856</span>
                          <NumberFormatBase className='form-control' value={GETAPI.whatsapp} onChange={(e) => setWA(e.target.value)} placeholder='number 020:....'/>
                        </div>
                      </div>
                    </div> 
                    <div className='col-md-6'>
                      <div className='form-group Nato_sanlaos'>
                        <label className='Nato_sanlaos'>ຫົວຂໍ້ ກ່ຽວກັບ</label>
                        <textarea className='form-control' defaultValue={GETAPI.title} onChange={(e) => setT1(e.target.value)} placeholder='ເນື້ອໃນ:.....'></textarea>
                      </div>

                      <div className='form-group Nato_sanlaos'>
                        <label className='Nato_sanlaos'>ຫົວຂໍ້ ສະຖານທີ່ຕັ້ງ</label>
                        <textarea className='form-control' defaultValue={GETAPI.map_title} onChange={(e) => setT2(e.target.value)} placeholder='ເນື້ອໃນສະຖານທີ່ຕັ້ງ ບໍລິສັດ:.....' rows='7'></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-footer Nato_sanlaos'>
                  <button type='button' onClick={Submit} className='btn btn-sm btn-outline-success' disabled={ERROR == true ? false : true}><i class="bi bi-gear-wide-connected"></i> | ບັນທືກຂໍ້ມູນ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
