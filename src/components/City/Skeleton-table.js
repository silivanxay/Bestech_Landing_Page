import React from 'react'

export default function Skeleton_table() {
    return (
        <table className="table table-hover text-nowrap placeholder-glow">
            <thead>
                <tr>
                    <th>
                        <span class="item-border placeholder col-5 p-2 px-3"></span>
                    </th>
                    <th>
                        <span class="item-border placeholder col-5 p-2 px-3"></span>
                    </th>
                    <th>
                        <span class="item-border placeholder col-5 p-2 px-3"></span>
                    </th>
                    <th>
                        <span class="item-border placeholder col-5 p-2 px-3"></span>
                    </th>
                    <th className='col-2 text-center'>
                        <span class="item-border placeholder col-5 p-2 px-3"></span>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th>
                        <span class="item-border placeholder col-12 p-2 px-3"></span>
                    </th>
                    <th>
                        <span class="item-border placeholder col-12 p-2 px-3"></span>
                    </th>
                    <th>
                        <span class="item-border placeholder col-12 p-2 px-3"></span>
                    </th>
                    <th>
                        <span class="item-border placeholder col-12 p-2 px-3"></span>
                    </th>
                    <th className='text-center'>
                        <span class="item-border placeholder col-5 p-2 px-3 mr-2"></span>
                        <span class="item-border placeholder col-5 p-2 px-3"></span>
                    </th>
                </tr>
                <tr>
                    <th>
                        <span class="item-border placeholder col-12 p-2 px-3"></span>
                    </th>
                    <th>
                        <span class="item-border placeholder col-12 p-2 px-3"></span>
                    </th>
                    <th>
                        <span class="item-border placeholder col-12 p-2 px-3"></span>
                    </th>
                    <th>
                        <span class="item-border placeholder col-12 p-2 px-3"></span>
                    </th>
                    <th className='text-center'>
                        <span class="item-border placeholder col-5 p-2 px-3 mr-2"></span>
                        <span class="item-border placeholder col-5 p-2 px-3"></span>
                    </th>
                </tr>
            </tbody>
        </table>
    )
}
