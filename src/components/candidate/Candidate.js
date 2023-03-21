import React from 'react'
import { Link } from 'react-router-dom'
import Update_candidate from './Update-candidate'
import useFunctions from './useFunctions'

export default function Candidate() {

    let {
        API,
        patchIDcan,

        next,
        black,
        Page,
        nextpage
    } = useFunctions()

    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <label className="btn-outline-white pt-2">ຂໍ້ມູນລາຍຊື່ຜູ້ມີສິດສຸ່ມ </label>
                                <Link to="/add-candidate" className="card-title btn btn-success float-right">ເພິ່ມຜູ້ມີສິດສຸ່ມ</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className='row'>
                                            <div className='col-md-12 display-flex'>
                                                <h3 className="card-title w-100">ລາຍຊື່ຜູ້ມີສິດສຸ່ມ </h3>
                                                <h3 className="card-title text-end w-100 row">
                                                    <div className='col-8 input-group-sm input-group'>
                                                        {/* <NumberFormatBase type='search' value={valueWeek} className='form-control form-search Nato_sanlaos' onChange={(e) => fillterData(e)} placeholder='ຄົ້ນຫາ: ເລກບີນ - ລະຫັດຜູ້ຂາຍ' />&nbsp;
                                                        <select className='user-select-none form-select form-control input-group-text bg-white' value={value} onChange={(e) => fillterWeek(e)}>
                                                            <option value=''>~~ຄົ້ນຫາດ້ວຍງວດ~~</option>
                                                            {LoopQnumberDrw.map((item) => (
                                                                <option value={item}>ງວດທີ່: {item}</option>
                                                            ))}
                                                        </select>&nbsp;
                                                        <span className='input-group-text btn btn-dark' onClick={Reset}>Reset</span> */}
                                                    </div>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-header */}

                                    <div className="card-body table-responsive p-0">
                                        <table className="table table-hover text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                                                    <th>ເບີຕິດຕໍ່</th>
                                                    <th>ບ້ານ</th>
                                                    <th>ເມືອງ</th>
                                                    <th>ແຂວງ</th>
                                                    <th className='col-2'>ຈັດການ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {API.filter((e) => e.is_active === true).map((item, index) => (
                                                    <tr>
                                                        <td>#{index + 1}</td>
                                                        <td>{item.full_name}</td>
                                                        <td>+856 {item.phone_number}</td>
                                                        <td>{item.province?.province}</td>
                                                        <td>{item.district?.district}</td>
                                                        <td>{item.village?.village}</td>
                                                        <td>
                                                            <div className='btn-group'>
                                                                <Update_candidate items={item} />
                                                                <button className='btn btn-sm btn-danger' onClick={() => patchIDcan(item)}><i class="bi bi-trash3-fill"></i> | ລົບຂໍ້ມູນ</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <nav aria-label="..." className='px-5 pt-3 float-right list-group-item'>
                                            <ul class="pagination">
                                                <li class="page-item">
                                                    <a class="page-link" href="#" onClick={black}>Black</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#">{nextpage} In {Page}</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#" onClick={next}>Next</a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
