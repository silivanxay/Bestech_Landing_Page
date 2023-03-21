import React from 'react'

export default function Skeleton_about() {
    return (
        <div className='row'>
            <div className='col-md-6'>
                <div className='card card-body'>
                    <span class="item-border  placeholder" style={{ width: '30px' }}></span>
                    <div className='row'>
                        <div className='col-md-5 grid-container placeholder-glow'>
                            <span class="item-border  placeholder w-100"></span>
                        </div>
                        <div className='col-md-5 grid-container placeholder-glow'>
                            <span class="item-border  placeholder w-100"></span>
                        </div>
                        <div className='col-md-2'>
                            <div className='action-footer'>
                                <div className='placeholder-glow display-repone-flex'>
                                    <span class="item-border placeholder col-12 p-2 px-3"></span>
                                    <span class="item-border  placeholder col-12 p-2 px-3"></span>
                                    <span class="item-border  placeholder col-12 p-2 px-3"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
