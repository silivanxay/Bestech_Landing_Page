import React from 'react'
import Skeleton_table from '../Skeleton-table'
import Form_update_village from './Form_update_village'
import useFunctions from './useFunctions'

export default function Village() {

    let {
        Loaderror,
        refrest,

        // provine
        meslistpro,
        listpro,
        showlist,
        show_listpro,
        APIPRO,
        Dropdow_province,
        black,
        next,
        nextpage_pro,
        ProPage,

        APIDIS,
        showlistDIs,
        showlist_dis,
        Dropdow_district,
        listdis,
        black_dis,
        next_dis,
        DisPage,
        nextpage_dis,

        SubVillage,
        APIVIL,
        delvillage,
        Count_vil,
        Black_vil,
        Next_vil,
        VilPage,
        nextpage_vill,
        x,
    } = useFunctions()

    return (
        <>
            <div className="col-md-12">
                <div className='card'>
                    <div className="card-header display-flex">
                        <div className="col-md-4">
                            <h3 className="card-title">ບ້ານທັງຫມົດ ( <strong className='text-danger'>{Count_vil}</strong> )</h3>
                        </div>
                        <div className="col-md-8">
                            <div className="input-group input-group-sm">
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
                                <div className={`form-control float-right drop-event-dis ${meslistpro == true ? 'animabtn' : ''}`}>
                                    <div className='w-100' onClick={showlistDIs}><a href='#' class="page-link" style={{ paddingTop: '3px' }}>{listdis === '' ? '~~ເລືອກເມືອງ~~' : ('ເມືອງ: ' + listdis.district)}</a></div>
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
                                <div className="input-group-text bg-green">
                                    <button class="accordion-button collapsed" onClick={refrest} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">ເພີມບ້ານ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion">
                        <div id="collapseTwo" class="accordion-collapse collapse idExample" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <form method='POST' onSubmit={SubVillage}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">ຊື່ບ້ານ</label>
                                        <div className="input-group">
                                            <input type="search" className="form-control" name='name' placeholder="ປ້ອນຊື່ບ້ານ" required />
                                            <button type='submit' className="input-group-text btn bg-green"><i class="bi bi-plus-lg"></i> | ບັນທືກຂໍ້ມູນບ້ານ</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="card-body table-responsive p-0">
                        {Loaderror === true ?
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>ຊື່ບ້ານ</th>
                                        <th>ຊື່ເມືອງ</th>
                                        <th>ຊື່ແຂວງ</th>
                                        <th className="col-2">ຈັດການ</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {APIVIL.map((item, index) => (
                                        <tr>
                                            <td>#{x++}</td>
                                            <td>{item.village}</td>
                                            <td>{item.district.district}</td>
                                            <td>{item.district.province.province}</td>
                                            <td>
                                                <div className='btn-group'>
                                                    <Form_update_village items={item}/>
                                                    <button type='button' className='btn btn-sm btn-danger' onClick={() => delvillage(item)}><i class="bi bi-trash3"></i> | ລົບຂໍ້ມູນ</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            :
                            <Skeleton_table />
                        }
                        <nav aria-label="..." className='px-2 pt-2 float-right'>
                            <ul class="pagination">
                                <li class="page-item">
                                    <a class="page-link" href="#black" onClick={Black_vil}>Black</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">{nextpage_vill} In {VilPage}</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#next" onClick={Next_vil}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {/* /.card Village */}
            </div>
        </>
    )
}
