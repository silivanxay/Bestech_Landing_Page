import React from 'react'
import useFuncations from './useFuncations'
import Skeleton_table from '../Skeleton-table'

export default function Province() {

    let {
        setformValues,
        SubProvine,
        refrest,
        GETAPI,
        delprovice,
        proLegn,
        editprovice,
        loadedit,
        cancel_pro,
        Byidpro,
        setBypro,
        EditProvine,

        Nextpro,
        Blackpro,
        proPage,
        proPageN,

        Loaderror,
        xpro,

    } = useFuncations()


    return (
        <div className="col-md-12">
            <div className='card'>
                <div className="card-header display-flex">
                    <div className="col-md-4">
                        <h3 className="card-title">ແຂວງທັງຫມົດ ( <strong className='text-danger'>{proLegn}</strong> )</h3>
                    </div>
                    <div className="col-md-8">
                        <div className="input-group input-group-sm">
                            <input type="text" name="table_search" className="form-control float-right" placeholder="ຄົ້ນຫາດ້ວຍຊື່ແຂວງ..." />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-default">
                                    <i className="fas fa-search" />
                                </button>
                            </div>
                            <div className="input-group-text bg-green">
                                <button class="accordion-button collapsed" onClick={refrest} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">ເພີມແຂວງ</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion">
                    <div id="collapseTwo" class="accordion-collapse collapse idExample" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">ຊື່ແຂວງ</label>
                                <div className="input-group">
                                    <input type="search" className="form-control" name='name' onChange={(e) => setformValues(e.target.value)} placeholder="ປ້ອນຊື່ແຂວງ" required />
                                    <span className="input-group-text btn bg-green" onClick={SubProvine}><i class="bi bi-plus-lg"></i> | ບັນທືກຂໍ້ມູນແຂວງ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-100 card-body' hidden={loadedit == true ? false : true}>
                    <div class="accordion-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">ແກ້ໄຂຊື່ແຂວງ</label>
                            <div className="input-group">
                                <input type="search" id='inputedite' value={Byidpro.province} className="form-control" name='name' onChange={(e) => setBypro(e.target.value)} placeholder="ປ້ອນຊື່ແຂວງ" required />
                                <span className="input-group-text btn bg-green" onClick={EditProvine}><i class="bi bi-plus-lg"></i> | ບັນທືກ</span>
                                <span className="input-group-text btn bg-danger" onClick={cancel_pro}>Cancel</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body table-responsive p-0">
                    {Loaderror === true ?
                        <table className="table table-hover text-nowrap">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ຊື່ແຂວງ</th>
                                    <th className="text-center">ຈັດການ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {GETAPI.map((item, index) => (
                                    <tr key={index}>
                                        <td>#{xpro++}</td>
                                        <td>{item.province}</td>
                                        <td className="text-center">
                                            <div className='btn-group'>
                                                <a href='#edit' onClick={() => editprovice(item)}><label for='inputedite' className='btn btn-sm btn-primary'><i class="bi bi-pencil-square"></i> ແກ້ໄຂຂໍ້ມູນ</label></a>
                                                <label for='inputedite' className='btn btn-sm btn-danger' onClick={() => delprovice(item.id)}><i class="bi bi-trash3-fill"></i> ລົບຂໍ້ມູນ</label>
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
                                <a class="page-link" href="#black" onClick={Blackpro}>Black</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">{proPageN} In {proPage}</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#next" onClick={Nextpro}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* /.card Proveince */}
        </div>
    )
}
