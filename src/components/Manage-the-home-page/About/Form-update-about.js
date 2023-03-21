import React, { useState } from 'react'
import useFunctions from './useFunctions';
import { Button, Modal, Form } from 'react-bootstrap'

export default function Form_update_about(props) {

  const item = props.item

  let {
    editSubmit,
  } = useFunctions()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [preview, setPreview] = useState('')

  return (
    <>
      <button variant='primary' className='btn btn-sm btn-outline-primary' onClick={handleShow}>
        <i class="bi bi-pencil-square"></i> | edit
      </button>
      <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>
            <h5>ຈັດການຂໍ້ມູນ About</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method='POST' onSubmit={editSubmit}>
            <input type='hidden' value={item.id} />
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group Nato_sanlaos'>
                    <label className='Nato_sanlaos'>Logo</label>
                    <div className='input-group Nato_sanlaos'>
                      <input type='file' className='form-control' onChange={(e) => setPreview(e.target.files[0])} />
                    </div>
                  </div>
                  <img className='float-left' style={{ width: 100 + '%' }} src={preview === '' ? (item.image) : URL.createObjectURL(preview)} alt='ກະລຸນາເລືອກຮູບພາບ' />
                </div>
                <div className='col-md-6'>
                  <div className='form-group Nato_sanlaos'>
                    <label className='Nato_sanlaos'>ຫົວຂໍ້</label>
                    <div className='input-group Nato_sanlaos'>
                      <input className='form-control' defaultValue={item.title} placeholder='.......' />
                    </div>
                  </div>

                  <div className='form-group Nato_sanlaos'>
                    <label className='Nato_sanlaos'>ຄຳອະທິບາຍ</label>
                    <textarea className='form-control' defaultValue={item.description} placeholder='ຄຳອະທິບາຍ:.....' rows='5'></textarea>
                  </div>
                </div>
              </div>
            </div>
            <Modal.Footer className='Nato_sanlaos'>
              <button type='submit' className='btn btn-sm btn-outline-success mr-2'><i class="bi bi-gear-wide-connected"></i> | ບັນທືກຂໍ້ມູນ</button>
              <button type='button' className='btn btn-sm btn-outline-danger' onClick={handleClose}><i class="bi bi-chevron-bar-left"></i> | ຍົກເລີກ</button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

    </>
  )
}
