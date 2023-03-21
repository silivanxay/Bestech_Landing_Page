import React from 'react'
import { Link } from 'react-router-dom'
import useFunctions from './useFunctions'
import './style-slide.css'
import { height } from '@mui/system'
import Update_slide from './Update-slide'

export default function Slide() {

    let {
        API,
        delslide,

        next,
        black,
        pageN,
        Page,
        Count,
    } = useFunctions()

    return (
        <div className="content-wrapper" id="active">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header display-flex">
                            <div className="col-md-4">
                                <h3 className="card-title"><strong>ຂໍ້ມູນ Slide</strong> ( <strong className='text-danger'>{Count}</strong> )</h3>
                            </div>
                            <div className="col-md-8">
                                <div className="input-group input-group-sm d-flex justify-content-end">
                                    <div className="input-group-text bg-green">
                                        <Link to='add-slide'><i class="bi bi-plus-lg"></i> | ເພີມ Slide</Link>
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
                    {API.map((item, index) => (
                        <div className='card relative' style={{ overflow: 'hidden' }}>
                            <span className='active-title-img-left'>{item.title}</span>
                            <span className='active-title-img-right'>
                                <div>
                                    <Update_slide items={item} /><br />
                                    <button type='button' className='btn btn-sm btn-danger mt-2' onClick={() => delslide(item)}><i class="bi bi-trash3"></i> | ລົບຂໍ້ມູນ</button>
                                </div>
                            </span>
                            <img src={item.image} id="IMG-Slide-loop" alt='IMG' height={item.image == undefined ? 100 : ''} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
