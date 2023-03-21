import React from 'react'
import { Link } from 'react-router-dom'
import useFunctions from './useFunctions'
import './style-about.css'
import Form_update_about from './Form-update-about'
import Skeleton_about from './Skeleton-about'

export default function About() {

    let {
        API,

        black,
        next,
        Page,
        pageN,

        delabout,
        active,
        Count,
        x,
        Loadding,
    } = useFunctions()

    return (
        <>
            <div className="content-wrapper" id="active">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header display-flex">
                                        <div className="col-md-4">
                                            <h3 className="card-title"><strong>ຂໍ້ມູນ About</strong> ( <strong className='text-danger'>{Count}</strong> )</h3>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="input-group input-group-sm d-flex justify-content-end">
                                                <div className="input-group-text bg-green">
                                                    <Link to='add-about'><i class="bi bi-plus-lg"></i> | ເພີມ About</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <nav aria-label="..." className='d-flex justify-content-start'>
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a class="page-link" href='#' onClick={black}>Black</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">{pageN} In {Page}</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href='#' onClick={next}>Next</a>
                                    </li>
                                </ul>
                            </nav>
                            {Loadding === true ?
                                <div className='row'>
                                    {API.filter((e) => e.is_active === false).map((item, index) => (
                                        <div className='col-md-6'>
                                            <div className='card card-body' style={{ backgroundColor: 'rgba(33, 116, 98, 0.103)' }}>
                                                #New {index + 1} / page {pageN}
                                                <div className='row'>
                                                    <div className='col-md-5 grid-container'>
                                                        <div class="grid-itmes grid-item-Facebook"><strong>ຫົວຂໍ້</strong>:<br /> {item.title}</div>
                                                    </div>
                                                    <div className='col-md-5 grid-container'>
                                                        <div class="grid-itmes grid-item-about"><strong>ຄຳອະທິບາຍ</strong>:<br /> {item.description} </div>
                                                    </div>
                                                    <div className='col-md-2'>
                                                        <div className='action-footer'>
                                                            <div className='display-repone-flex'>
                                                                <p><Form_update_about item={item} /> </p>
                                                                <p><button className='btn btn-sm btn-outline-danger' onClick={() => delabout(item.id)}><i class="bi bi-trash3"></i> | delete</button></p><hr />
                                                                <p><a href='#active' className='btn btn-sm btn-success' onClick={() => active(item)}><i class="bi bi-check-circle-fill"></i> | ເປິດໃຊ້ງານ</a></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {API.filter((e) => e.is_active === true).map((item, index) => (
                                        <div className='col-md-6'>
                                            <div className='card card-body'>
                                                #{x++}
                                                <div className='row'>
                                                    <div className='col-md-5 grid-container'>
                                                        <div class="grid-itmes grid-item-Facebook"><strong>ຫົວຂໍ້</strong>: {item.title}</div>
                                                        <img src={item.image} id='IMG-Title'/>
                                                    </div>
                                                    <div className='col-md-5 grid-container'>
                                                        <div class="grid-itmes grid-item-about"><strong>ຄຳອະທິບາຍ</strong>:<br /> {item.description} </div>
                                                    </div>
                                                    <div className='col-md-2'>
                                                        <div className='action-footer'>
                                                            <div className='display-repone-flex'>
                                                                <p><Form_update_about item={item} /> </p>
                                                                <p><button className='btn btn-sm btn-outline-danger' onClick={() => delabout(item.id)}><i class="bi bi-trash3"></i> | delete</button></p><hr />
                                                                <p><a href='#active' className='btn btn-sm btn-warning' onClick={() => active(item)}><i class="bi bi-slash-circle"></i> | ປິດໃຊ້ງານ</a></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                :
                                <Skeleton_about />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
