import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import useFuncations from './useFuncations';

export default function Form_update_dis(props) {

    const item = props.items

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let {
        APIPRO,
        Dropdow_province,
        listpro,
        showlist,
        show_listpro,
        meslistpro,

        black,
        next,
        nextpage_pro,
        ProPage,

        editSUb,
       
    } = useFuncations()

    return (
        <>
            <button className='btn btn-sm btn-primary' onClick={handleShow}>
                <i class="bi bi-pencil-square"></i> | ແກ້ໄຂ
            </button>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton>
                    <Modal.Title>ແກ້ໄຂຂໍ້ມູນເມື່ອງ </Modal.Title>
                </Modal.Header>
                <form method='POST' onSubmit={editSUb}>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label htmlFor="exampleInputEmail1">ຊື່ເມືອງ</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" defaultValue={item.district} name='name' placeholder="ປ້ອນຊື່ເມືອງ" required />
                                    <input type="hidden" value={item.id}/>
                                    <input type="hidden" value={item.province.id}/>
                                </div>
                            </div>
                            <div className='col-md-6'>
                            <label htmlFor="exampleInputEmail1">ເລືອກແຂວງ</label>
                            <div className={`form-control float-right drop-event-dis ${meslistpro == true ? 'animabtn' : ''}`}>
                                <div className='w-100' onClick={showlist}> {listpro === '' ? ('ແຂວງ: '+item.province.id) : ('ແຂວງ: ' + listpro.province)}</div>
                                <ul class={`list-group list-group-item-province ${meslistpro == true ? 'animabtn' : ''}`} hidden={show_listpro == false ? true : false}>
                                    {APIPRO.map((item) => (
                                        <li class="list-group-item list-hover" onClick={() => Dropdow_province(item)}><a class="page-link" href="#">ແຂວງ: {item.province}</a></li>
                                    ))}
                                    <nav aria-label="..." className='px-2 pt-2 float-right list-group-item'>
                                        <ul class="pagination">
                                            <li class="page-item">
                                                <a class="page-link" href="#" onClick={black}>Black</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">{nextpage_pro} In {ProPage}</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#" onClick={next}>Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='submit' className='btn btn-sm btn-success'> <i class="bi bi-cloud-download"></i> ເພິມບິນ </button>
                        <button type='button' className='btn btn-sm btn-danger' onClick={handleClose} > <i class="bi bi-x-diamond-fill"></i> Cancel </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
