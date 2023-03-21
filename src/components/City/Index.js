import React, { useState } from 'react'
import useFuncations from './province/useFuncations'
import useFuncations_dis from './district/useFuncations'
import useFuncations_vil from './village/useFunctions'
import './provice.css'
import Province from './province/Province'
import District from './district/District'
import Village from './village/Village'

const Index = () => {
    let {
        proLegn,
    } = useFuncations()

    let {
        Count_dis,
    } = useFuncations_dis()

    let {
        Count_vil,
    } = useFuncations_vil()


    const [paget, setpagetrue] = useState('province')
    function pagetrue(e) {
        setpagetrue(e)
    }

    return (
        <>
            <div className="content-wrapper" id="edit">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h2>ຂໍ້ມູນ ບ້ານ,ເມືອງ,ແຂວງ ທັ້ງໝົດ</h2>
                                    </div>
                                    <ul class="nav nav-tabs pt-2 px-2">
                                        <li class="nav-item">
                                            <button class={`nav-link ${paget == 'province' ? 'active' : ''}`} onClick={() => pagetrue('province')}>ຂໍ້ມູນແຂວງ ( <strong className='text-danger'>{proLegn}</strong> )</button>
                                        </li>
                                        <li class="nav-item">
                                            <button class={`nav-link ${paget == 'district' ? 'active' : ''}`} onClick={() => pagetrue('district')}>ຂໍ້ມູນເມືອງ ( <strong className='text-danger'>{Count_dis}</strong> )</button>
                                        </li>
                                        <li class="nav-item">
                                            <button class={`nav-link ${paget == 'village' ? 'active' : ''}`} onClick={() => pagetrue('village')}>ຂໍ້ມູນບ້ານ ( <strong className='text-danger'>{Count_vil}</strong> )</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {paget === 'province' ? <Province/> : ''}
                            {paget === 'district' ? <District/> : ''}
                            {paget === 'village' ? <Village/> : ''}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index