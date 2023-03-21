import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import useFuncations from './useFunctions';

export default function Form_update_village(props) {

    const item = props.items

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let {

        // provine
        meslistpro,

        APIDIS,
        showlistDIs,
        showlist_dis,
        Dropdow_district,
        listdis,
        black_dis,
        next_dis,
        DisPage,
        nextpage_dis,

       
        updateVillage,
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
                <form method='POST' onSubmit={updateVillage}>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-md-6'>
                                <label htmlFor="exampleInputEmail1">ຊື່ບ້ານ</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" defaultValue={item.village} name='name' placeholder="ປ້ອນຊື່ບ້ານ" required />
                                    <input type="hidden" value={item.id} />
                                    <input type="hidden" value={item.district.id} />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <label>ເລືອກເມືອງ</label>
                                <div className={`form-control float-right drop-event-dis ${meslistpro == true ? 'animabtn' : ''}`}>
                                    <div className='w-100' onClick={showlistDIs}><a href='#' class="page-link" style={{ paddingTop: '3px' }}>{listdis === '' ? item.district.district : ('ເມືອງ: ' + listdis.district)}</a></div>
                                    <ul class={`list-group list-group-item-province ${meslistpro == true ? 'animabtn' : ''}`} hidden={showlist_dis == false ? true : false}>
                                        {APIDIS.map((item) => (
                                            <a class="page-link" href="#"><li class="list-group-item list-hover" onClick={() => Dropdow_district(item)}>ເມືອງ: {item.district}</li></a>
                                        ))}
                                        <nav aria-label="..." className='px-2 pt-2 float-right list-group-item'>
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#" onClick={black_dis}>Black</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#">{nextpage_dis} In {DisPage}</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#" onClick={next_dis}>Next</a>
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
