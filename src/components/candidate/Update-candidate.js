import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import useFunctions from './useFunctions';
import usePVD from './usePVD';

export default function Update_candidate(props) {

    let item = props.items

    let {
        // province
        province,
        Dropdow_province,
        showlist,
        listpro,
        show_listpro,
        nextpro,
        backpro,
        nextpage_pro,
        Pagepro,

        // district
        district,
        showlist_dis,
        Dropdow_distric,
        listdis,
        show_listdis,
        nextdis,
        backdis,
        Pagedis,
        nextpage_dis,

        // village
        village,
        showlist_vil,
        listvil,
        show_listvil,
        Dropdow_village,
        nextvil,
        backvil,
        nextpage_vil,
        Pagevil,

        handleClose,
        handleShow,
        show,
    } = usePVD()

    let {
        Subupdate,
    } = useFunctions()


    return (
        <>
            <button className='btn btn-sm btn-primary' onClick={handleShow}><i class="bi bi-pencil-square"></i> | ແກ້ໄຂ</button>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>
                        <h5>ຈັດການ ຂໍ້ມູນຜູ້ມີສິດສຸ່ມ</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method='POST' onSubmit={Subupdate}>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <label>ເບີໂທ</label>
                                <div className='input-group relative'>
                                    <NumericFormat className='input-number856' defaultValue={item.phone_number} placeholder=':.........' required />
                                    <span className='number856'>+856</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>ຊື່ ແລະ ນາມສະກຸນ</label>
                                        <div className='input-group'>
                                            <input type='text' className='form-control' defaultValue={item.full_name} placeholder=':.........' required />
                                            <input type='' value={listpro === '' ? item.province : listpro.id} />
                                            <input type='' value={listdis === '' ? (listpro !== '' ? '' : item.district) : listdis.id} />
                                            <input type='' value={listvil === '' ? (listpro !== '' ? '' : item.village) : listvil.id} />
                                            <input type='hidden' value={item.id} />
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label>ເມືອງ</label>
                                        <div className='input-group'>
                                            <div className={`form-control float-right drop-event-dis`}>
                                                <div className='w-100' onClick={showlist_dis}><a href='#' class="page-link" style={{ paddingTop: '3px' }}>{listdis === '' ? (listpro !== '' ? '~~ກະລຸນາເລືອກເມືອງ~~' : item.district) : ('ເມືອງ: ' + listdis.district)}</a></div>
                                                <ul class={`list-group list-group-item-province`} hidden={show_listdis == false ? true : false}>
                                                    {listpro === '' ? <a class="page-link" href="#" onClick={showlist}><li class="list-group-item list-hover">~~ ກະລຸນາເລືອກແຂວງກອນ ~~</li></a> :
                                                    district.map((item) => (
                                                        <a class="page-link" href="#"><li class="list-group-item list-hover" onClick={() => Dropdow_distric(item)}>ເມືອງ: {item.district}</li></a>
                                                    ))}
                                                    <nav aria-label="..." className='px-2 pt-2 float-right list-group-item'>
                                                        <ul class="pagination">
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" onClick={backdis}>Black</a>
                                                            </li>
                                                            <li class="page-item">
                                                                <a class="page-link" href="#">{nextpage_dis} In {Pagedis}</a>
                                                            </li>
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" onClick={nextdis}>Next</a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>ແຂວງ</label>
                                        <div className='input-group'>
                                            <div className={`form-control float-right drop-event-dis`}>
                                                <div className='w-100' onClick={showlist}><a href='#' class="page-link" style={{ paddingTop: '3px' }}>{listpro === '' ? item.province : ('ແຂວງ: ' + listpro.province)}</a></div>
                                                <ul class={`list-group list-group-item-province`} hidden={show_listpro == false ? true : false}>
                                                    {province.map((item) => (
                                                        <a class="page-link" href="#"><li class="list-group-item list-hover" onClick={() => Dropdow_province(item)}>ແຂວງ: {item.province}</li></a>
                                                    ))}
                                                    <nav aria-label="..." className='px-2 pt-2 float-right list-group-item'>
                                                        <ul class="pagination">
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" onClick={backpro}>Black</a>
                                                            </li>
                                                            <li class="page-item">
                                                                <a class="page-link" href="#">{nextpage_pro} In {Pagepro}</a>
                                                            </li>
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" onClick={nextpro}>Next</a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label>ບ້ານ</label>
                                        <div className='input-group'>
                                            <div className={`form-control float-right drop-event-dis`}>
                                                <div className='w-100' onClick={showlist_vil}><a href='#' class="page-link" style={{ paddingTop: '3px' }}>{listvil === '' ? (listpro !== '' ? '~~ກະລຸນາເລືອກບ້ານ~~' : item.village) : ('ບ້ານ: ' + listvil.village)}</a></div>
                                                <ul class={`list-group list-group-item-province`} hidden={show_listvil == false ? true : false}>
                                                    {village.map((item) => (
                                                        <a class="page-link" href="#"><li class="list-group-item list-hover" onClick={() => Dropdow_village(item)}>ບ້ານ: {item.village}</li></a>
                                                    ))}
                                                    {listdis === '' ? <a class="page-link" href="#" onClick={showlist}><li class="list-group-item list-hover">~~ ກະລຸນາເລືອກເມືອງກອນ ~~</li></a> : ''}
                                                    {listdis === '' ? '' : (village.length > 0 ? '' : <a class="page-link" href="#"><li class="list-group-item list-hover">~~ ບໍ່ມີຂໍ້ມູນບ້ານໃນ ເມືອງ: {listdis.district} ~~</li></a>)}
                                                    <nav aria-label="..." className='px-2 pt-2 float-right list-group-item'>
                                                        <ul class="pagination">
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" onClick={backvil}>Black</a>
                                                            </li>
                                                            <li class="page-item">
                                                                <a class="page-link" href="#">{nextpage_vil} In {Pagevil}</a>
                                                            </li>
                                                            <li class="page-item">
                                                                <a class="page-link" href="#" onClick={nextvil}>Next</a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal.Footer>
                            <button type='submit' className='btn btn-sm btn-outline-success mr-2'><i class="bi bi-cloud-download"></i> | Submit</button>
                            <button type='button' onClick={handleClose} className='btn btn-sm btn-outline-danger'><i class="bi bi-arrow-bar-left"></i> | Cancel</button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
