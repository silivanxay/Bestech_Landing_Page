import React from 'react'
import useFunctions from './useFunctions'
import { Button, Modal, Form } from 'react-bootstrap'

export default function Index() {

    let {
        API,
        Submit_Users,
        delusers,
        show_edit,
        load_edit,
        cancel,
        datausers,
        Edit_Users,
        changeusers,
        show,
        handleClose,
        SubChangePS,
        COUNT,
    } = useFunctions()

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title>
                        <h5>New Password</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method='POST' onSubmit={SubChangePS}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>New Password</label>
                                    <div className='input-group'>
                                        <span className='input-group-text'><i class="bi bi-asterisk"></i></span>
                                        <input type='password' className='form-control' placeholder='*******' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label>Confirm Password</label>
                                    <div className='input-group'>
                                        <span className='input-group-text'><i class="bi bi-asterisk"></i></span>
                                        <input type='password' className='form-control' placeholder='*******' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                <i class="bi bi-cloud-download"></i> Submit
                            </Button>
                            <Button variant="danger" onClick={handleClose} >
                                <i class="bi bi-x-diamond"></i> Cancel
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
            <div className="content-wrapper" id="edit">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Users</h5>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className='card'>
                                    <div className="card-header display-flex">
                                        <div className="col-md-4">
                                            <h3 className="card-title">User ( <strong className='text-danger'>{COUNT}</strong> )</h3>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="input-group input-group-sm d-flex justify-content-end">
                                                <div className="input-group-text bg-green">
                                                    <button class="accordion-button collapsed" onClick={cancel} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">ເພີມແຂວງ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion">
                                        <div id="collapseTwo" class="accordion-collapse collapse idExample" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <form method='POST' onSubmit={Submit_Users}>
                                                <div class="accordion-body row">
                                                    <div className='col-md-12 py-2'>
                                                        <span><strong>ເພີມຂໍ້ມູນຜູ້ໃຊ້ງານ</strong></span><hr />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Username</label>
                                                            <div className="input-group">
                                                                <span className='input-group-text'><i class="bi bi-person-vcard-fill"></i></span>
                                                                <input type="text" className="form-control" name='name' placeholder="......" required />
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Password</label>
                                                            <div className="input-group">
                                                                <span className='input-group-text'><i class="bi bi-asterisk"></i></span>
                                                                <input type="password" className="form-control" name='name' placeholder="********" required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">email</label>
                                                            <div className="input-group">
                                                                <span className='input-group-text'><i class="bi bi-envelope-at-fill"></i></span>
                                                                <input type="email" className="form-control" name='name' placeholder="......." required />
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Confirm Password</label>
                                                            <div className="input-group">
                                                                <span className='input-group-text'><i class="bi bi-asterisk"></i></span>
                                                                <input type="password" className="form-control" name='name' placeholder="********" required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <button type='submit' className='btn btn-sm btn-info mr-2'><i class="bi bi-cloud-download"></i> Save</button>
                                                        <button type='reset' className='btn btn-sm btn-danger'><i class="bi bi-x-diamond-fill"></i> Cancel</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div class="accordion" hidden={load_edit === true ? false : true}>
                                        <div class="accordion-collapse idExample">
                                            <form method='POST' onSubmit={Edit_Users}>
                                                <div class="accordion-body row">
                                                    <div className='col-md-12 py-2'>
                                                        <span><strong>ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ງານ</strong></span><hr />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Username</label>
                                                            <div className="input-group">
                                                                <span className='input-group-text'><i class="bi bi-person-vcard-fill"></i></span>
                                                                <input type="text" className="form-control" defaultValue={datausers.username} name='name' placeholder="......" required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">email</label>
                                                            <div className="input-group">
                                                                <span className='input-group-text'><i class="bi bi-envelope-at-fill"></i></span>
                                                                <input type="email" className="form-control" defaultValue={datausers.email} name='name' placeholder="......" required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <button type='submit' className='btn btn-sm btn-info mr-2'><i class="bi bi-cloud-download"></i> Save</button>
                                                        <button type='reset' onClick={cancel} className='btn btn-sm btn-danger'><i class="bi bi-x-diamond-fill"></i> Cancel</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="card-body table-responsive p-0">
                                        <table className="table table-hover text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>UserName</th>
                                                    <th>email</th>
                                                    <th className="col-3">ຈັດການ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {API.map((item, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.email}</td>
                                                        <td>
                                                            <div className='btn-group'>
                                                                <a href='#' className='btn btn-sm btn-primary' onClick={() => show_edit(item)}><i class="bi bi-pencil-square"></i> ແກ້ໄຂຂໍ້ມູນ</a>
                                                                <button className='btn btn-sm btn-danger' onClick={() => delusers(item)}><i class="bi bi-trash3"></i> ລົບຂໍ້ມູນ</button>
                                                                <button className='btn btn-sm btn-warning' onClick={() => changeusers(item)}><i class="bi bi-braces-asterisk"></i> ປ່ຽນລະຫັດຜ່ານ</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                                {/* /.card Proveince */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
