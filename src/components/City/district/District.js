import React from 'react'
import Skeleton_table from '../Skeleton-table'
import Form_update_dis from './Form_update_dis'
import useFuncations from './useFuncations'

export default function District() {

    let {
        SubDistrict,
        refrestDis,
        APIPRO,
        APIDIS,
        Dropdow_province,
        listpro,
        showlist,
        show_listpro,
        meslistpro,

        black,
        next,
        nextpage_pro,
        ProPage,

        black_dis,
        next_dis,
        DisPage,
        nextpage_dis,
        x,

        deldis,
        Count_dis,
        Loaderror,
        ClossState,
    } = useFuncations()


    return (
        <div className="col-md-12">
            <div className='card'>
                <div className="card-header display-flex">
                    <div className="col-md-4">
                        <h3 className="card-title">ເມືອງທັງຫມົດ ( <strong className='text-danger'>{Count_dis}</strong> )</h3>
                    </div>
                    <div className="col-md-8">
                        <div className="input-group ">
                            <div className={`form-control float-right drop-event-dis ${meslistpro == true ? 'animabtn' : ''}`}>
                                <div className='w-100' onClick={showlist}><a href='#' class="page-link" style={{ paddingTop: '3px' }}>{listpro === '' ? '~~ເລືອກແຂວງ~~' : ('ແຂວງ: ' + listpro.province)}</a></div>
                                <ul class={`list-group list-group-item-province ${meslistpro == true ? 'animabtn' : ''}`} hidden={show_listpro == false ? true : false}>
                                    {APIPRO.map((item) => (
                                        <a class="page-link" href="#"><li class="list-group-item list-hover" onClick={() => Dropdow_province(item)}>ແຂວງ: {item.province}</li></a>
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
                            <div className="input-group-text btn btn-sm btn-outline-danger px-3" onClick={ClossState}>
                                <i class="bi bi-x-lg"></i>
                            </div>

                            <div className="input-group-text bg-green">
                                <button class="accordion-button collapsed" onClick={refrestDis} type="button" data-bs-toggle="collapse" data-bs-target='#collapseOne' aria-expanded="false" aria-controls="collapseTwo">ເພີມເມື່ອງ</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion">
                    <div id="collapseOne" class="accordion-collapse collapse idExample" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <form method='POST' onSubmit={SubDistrict}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">ຊື່ເມືອງ</label>
                                    <div className="input-group">
                                        <input type="search" className="form-control" name='name' placeholder="ປ້ອນຊື່ເມືອງ" required />
                                        <button type='submit' className="input-group-text btn bg-green"><i class="bi bi-plus-lg"></i> | ບັນທືກຂໍ້ມູນເມືອງ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="card-body table-responsive p-0">
                    {Loaderror == true ?
                        <table className="table table-hover text-nowrap">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ຊື່ເມືອງ</th>
                                    <th>ຊື່ແຂວງ</th>
                                    <th className="col-2">ຈັດການ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {APIDIS.map((item, index) => (
                                    <tr>
                                        <td>#{x++}</td>
                                        <td>{item.district}</td>
                                        <td>{item.province.province}</td>
                                        <td>
                                            <div className='btn-group'>
                                                <Form_update_dis items={item} />
                                                <button className='btn btn-sm btn-danger' onClick={() => deldis(item)}><i class="bi bi-trash3"></i> | ລົບຂໍ້ມູນ</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <Skeleton_table />
                    }

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

                </div>
            </div>
            {/* /.card District */}
        </div>
    )
}
