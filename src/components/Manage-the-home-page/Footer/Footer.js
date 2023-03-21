import React from 'react'
import { Link } from 'react-router-dom'
import Form_edit_footer from './Form-edit-footer'
import Skeleton_footer from './Skeleton-footer'
import './style-footer.css'
import useFunctions from './useFunctions'

export default function Footer() {

    let {
        API,
        delfooter,
        useactive,
        COUNT,
        black,
        next,
        page,
        ispage,
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
                                            <h3 className="card-title"><strong>ຂໍ້ມູນ Footer</strong> ( <strong className='text-danger'>{COUNT}</strong> )</h3>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="input-group input-group-sm d-flex justify-content-end">
                                                <div className="input-group-text bg-green">
                                                    <Link to='add-footer'><i class="bi bi-plus-lg"></i> | ເພີມ Footer</Link>
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
                                        <a class="page-link" href="#">{ispage} In {page}</a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href='#' onClick={next}>Next</a>
                                    </li>
                                </ul>
                            </nav>


                            {Loadding == true ?
                                <div className='col-md-12'>
                                    {API.filter((e) => e.is_active === false).map((item, index) => (
                                        <div className='card card-body' style={{ backgroundColor: 'rgba(33, 116, 98, 0.103)' }}>
                                            #New {index + 1} / page {ispage}
                                            <div className='row'>
                                                <div className='col-md-5 grid-container'>
                                                    <div class="grid-itmes grid-item-Facebook"><strong className='text-blue'>Facebook URL</strong>: {item.facebook_url}</div>
                                                    <div class="grid-itmes grid-item-Instagram"><strong className='text-red'>Instagram URL</strong>: {item.instagram_url}</div>
                                                </div>
                                                <div className='col-md-5 grid-container'>
                                                    <div class="grid-item-WhatApp"><strong className='text-green'>WhatApp</strong>: {item.whatsapp}</div>
                                                    <div class="grid-item-email"><strong className='text-primary'>Email</strong>: {item.email}</div>
                                                    <div class="grid-item-address">{item.address}</div>
                                                </div>
                                                <div className='col-md-2'>
                                                    <div className='action-footer'>
                                                        <div className='display-repone-flex'>
                                                            <p><Form_edit_footer item={item} /></p>
                                                            <p><button className='btn btn-sm btn-outline-danger' onClick={() => delfooter(item.id)}><i class="bi bi-trash3"></i> | delete</button></p><hr />
                                                            <p><button className='btn btn-sm btn-success' onClick={() => useactive(item)}><i class="bi bi-check-circle-fill"></i> | ເປິດໃຊ້ງານ</button></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    }
                                    {API.filter((e) => e.is_active === true).map((item, index) => (
                                        <div className='card card-body'>
                                            #{x++}
                                            <div className='row'>
                                                <div className='col-md-5 grid-container'>
                                                    <div class="grid-itmes grid-item-Facebook"><strong className='text-blue'>Facebook URL</strong>: {item.facebook_url}</div>
                                                    <div class="grid-itmes grid-item-Instagram"><strong className='text-red'>Instagram URL</strong>: {item.instagram_url}</div>
                                                </div>
                                                <div className='col-md-5 grid-container'>
                                                    <div class="grid-item-WhatApp"><strong className='text-green'>WhatApp</strong>: {item.whatsapp}</div>
                                                    <div class="grid-item-email"><strong className='text-primary'>Email</strong>: {item.email}</div>
                                                    <div class="grid-item-address">{item.address}</div>
                                                </div>
                                                <div className='col-md-2'>
                                                    <div className='action-footer'>
                                                        <div className='display-repone-flex'>
                                                            <p><Form_edit_footer item={item} /></p>
                                                            <p><button className='btn btn-sm btn-outline-danger' onClick={() => delfooter(item.id)}><i class="bi bi-trash3"></i> | delete</button></p><hr />
                                                            <p><a href='#active' className='btn btn-sm btn-warning' onClick={() => useactive(item)}><i class="bi bi-slash-circle"></i> | ປິດໃຊ້ງານ</a></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                :
                                <div className='col-md-12'>
                                    <Skeleton_footer />
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
