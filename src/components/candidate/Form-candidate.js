import React from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import './style-candidate.css'
import useFunctions from './useFunctions';
import usePVD from './usePVD';

export default function Form_candidate() {

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
        Pagevil
    } = usePVD()

    let {
        Submit,
    } = useFunctions()

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className='card'>
                        <div className='card-header bg-success'><label className="btn-outline-white pt-2">ເພີມຂໍ້ມູນຜູ້ມີສິດສຸ່ມ</label></div>
                        <div className='card-body'>
                            <form method='POST' onSubmit={Submit}>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>ເບີໂທ</label>
                                        <div className='input-group relative'>
                                            <NumericFormat className='input-number856' placeholder=':.........' required/>
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
                                                    <input type='text' className='form-control' placeholder=':.........' required/>
                                                    <input type='hidden' value={listpro.id}/>
                                                    <input type='hidden' value={listdis.id}/>
                                                    <input type='hidden' value={listvil.id}/>
                                                </div>
                                            </div>

                                            <div className='form-group'>
                                                <label>ເມືອງ</label>
                                                <div className='input-group'>
                                                    <div className={`form-control float-right drop-event-dis`}>
                                                        <div className='w-100' onClick={showlist_dis}><a href='#' class="page-link" style={{ paddingTop: '3px' }}>{listdis === '' ? '~~ເລືອກເມືອງ~~' : ('ເມືອງ: ' + listdis.district)}</a></div>
                                                        <ul class={`list-group list-group-item-province`} hidden={show_listdis == false ? true : false}>
                                                            {district.map((item) => (
                                                                <a class="page-link" href="#"><li class="list-group-item list-hover" onClick={() => Dropdow_distric(item)}>ເມືອງ: {item.district}</li></a>
                                                            ))}
                                                            {listpro === '' ? <a class="page-link" href="#" onClick={showlist}><li class="list-group-item list-hover">~~ ກະລຸນາເລືອກແຂວງກອນ ~~</li></a> : ''}
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
                                                        <div className='w-100' onClick={showlist}><a href='#' class="page-link" style={{ paddingTop: '3px' }}>{listpro === '' ? '~~ເລືອກແຂວງ~~' : ('ແຂວງ: ' + listpro.province)}</a></div>
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
                                                        <div className='w-100' onClick={showlist_vil}><a href='#' class="page-link" style={{ paddingTop: '3px' }}>{listvil === '' ? '~~ເລືອກບ້ານ~~' : ('ບ້ານ: ' + listvil.village)}</a></div>
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
                                <div className='col-md-12'>
                                    <div className='group-footer'>
                                        <button type='submit' className='btn btn-sm btn-outline-success mr-2'><i class="bi bi-cloud-download"></i> | Submit</button>
                                        <Link to='/Candidates_eligibility' className='btn btn-sm btn-outline-danger'><i class="bi bi-arrow-bar-left"></i> | Cancel</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
