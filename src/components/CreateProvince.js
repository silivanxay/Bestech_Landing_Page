import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import url from './API-links/apiurl'
import Swal from 'sweetalert2'
import Spinner from "./uitilities/Spinner";

const CreateProvince = () => {
    const [formvalues, setformValues]= useState({})
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false)
        
        setformValues(
            
        )

    }

   
    return(
        <div>
        {loading === true ? <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">ເພິ່ມຂໍ້ມູນແຂວງ</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit} method="POST" encType='multipart/form-data'>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຊື່ແຂວງ</label>
                                                    <input type="text" className="form-control" name='name' onChange={(e) => setformValues(e.target.value)} placeholder="ປ້ອນຊື່ແຂວງ" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-success">ເພິ່ມແຂວງ</button>
                                        <Link to="/province" className="btn btn-danger float-right">ອອກ</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div> : <Spinner/> }
        </div>
    )
}

export default CreateProvince