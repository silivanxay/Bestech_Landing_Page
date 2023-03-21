import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import url from '../components/API-links/apiurl'
import EditProvinceModal from './EditProvinceModal';
import Spinner from "../components/uitilities/Spinner";
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2'

const Province = () => {
  const [ShowModal, setShowModal] = useState(false)
  const token = sessionStorage.getItem('myToken')
  if (!token) {
    window.location = "/login"
  }
  const [Province, setProvince] = useState([])
  const [ getDistrict, setDistrict ] = useState([])
  const [loading, setLoading] = useState(false)
  const [functionDistrice, setFunctionDistice] = useState(0)
  const [ reducer, setReducer ] = useReducer(x => x +1, 0)

  useEffect(() => {
    axios.get(url.Mainurl + url.getProvince).then((res) => {
      setProvince(res.data.reverse())
      setLoading(true)
    })
    if(functionDistrice !== false){
      axios.get(url.Mainurl + url.getDistrict).then((res) => {
        setDistrict(res.data)
      })
    }
  }, [reducer])

  const deleteProvince = (id) => {
    Swal.fire({
        title: 'ທ່ານຈະລົບຂໍ້ມູນແຂວງ ຫຼື່ ບໍ່?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ລົບຂໍ້ມູນ',
        cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(url.Mainurl + url.deleteProvince + id).then(() => {
              Swal.fire({
                icon: 'success',
                title: 'ລົບຂໍ້ມູນແລ້ວ!',
              })
              setReducer()
            }).catch(() => {
                alert('ເກີດຂໍ້ຜິດພາດ')
            })
        }
    })
  }

  // POST Province 
  const [formvalues, setformValues]= useState('')
  function SubProvine () {
    if(formvalues !== ''){
      axios.post(url.Mainurl + url.postProvince, {name: formvalues}, { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
        setLoading(true)
        Swal.fire({
          icon: 'success',
          title: 'ເພີມຂໍ້ມູນແຂວງສຳເລັດ!',
        })
        setReducer()
      }).catch(() => {
          setLoading(true)
          Swal.fire({
              icon: 'error',
              title: 'ກະລຸນາລອງໃຫທ່ອີກຄັ້ງ',
              cancelButtonText: 'close'
          })
      })
    }else{
      alert('~~ກະລຸນາປ້ອນຊື່ແຂວງ~~')
    }
  }

  // District 
  const [ ConfrimEdit, setConfirmEdit ] = useState('')
  const [ ValueDistrict, setValueDistrice ] = useState('')
  const [ Showmapprovine, setShowmapprovine ] = useState('')
  const Click_list_Distric = (e) => {
    setFunctionDistice(e.id)
    setShowmapprovine(e.name)
    setReducer()
    setConfirmEdit('')
  }

  function SubDistrice () {
    if(ValueDistrict !== ''){
      axios.post(url.Mainurl + url.postDistrict + functionDistrice , {
        name: ValueDistrict
      }).then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'ເພີມຂໍ້ມູນເມືອງສຳເລັດ!',
        })
        setReducer()
      })
    }
  }
  function deleteDistrict (id) {
    Swal.fire({
      title: 'ທ່ານຈະລົບຂໍ້ມູນເມືອງ ຫຼື່ ບໍ່?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລົບຂໍ້ມູນ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(url.Mainurl + url.deleteDistrict + id).then(() => {
              Swal.fire({
                icon: 'success',
                title: 'ລົບຂໍ້ມູນແລ້ວ!',
              })
              setReducer()
            }).catch(() => {
                alert('ເກີດຂໍ້ຜິດພາດ')
            })
        }
    })
  }

  const [value, setValue] = useState('')
  const [tableFiller, setTablefiller] = useState([])
  const fillterData = (e) => {
    if(e.target.value != ""){
        setValue(e.target.value);
        const fillterTable = Province.filter(o => Object.keys(o).some(k => 
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        ));
        setTablefiller([...fillterTable])
    }else{
        setValue(e.target.value);
        setProvince([...Province])
    }
  }

  const [valueA, setValueA] = useState('')
  const [tableFillerA, setTablefillerA] = useState([])
  const fillterDataA = (e) => {
    if(e.target.value != ""){
        setValueA(e.target.value);
        const fillterTableSS = getDistrict.filter(o => Object.keys(o).some(k => 
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        ) && o.provinceId == functionDistrice);
        setTablefillerA([...fillterTableSS])
    }else{
        setValueA(e.target.value);
        setDistrict([...getDistrict])
    }
  }

  const [ EditDistric, setEditDistrice ] = useState('')
  const [ EditUIDDistric, setEditUIDDistrice ] = useState('')
  function SubEditDistric (e){
    console.log(e.id+' / ' + (EditDistric == '' ? e.name : EditDistric) +' / ' + (EditUIDDistric == '' ? e.provinceId : EditUIDDistric))
    axios.put(url.Mainurl + url.putDistrict + e.id, {
      name: (EditDistric == '' ? e.name : EditDistric),
      provinceId: (EditUIDDistric == '' ? e.provinceId : EditUIDDistric)
    }).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'ປ່ຽນແປງຂໍ້ມູນເມືອງສຳເລັດ!',
      })
      setReducer()
    })
  }

  function resetStats (e) {
    setEditUIDDistrice('')
    setEditDistrice('')
    setConfirmEdit(e.id)
  }

  return (
    <div>
      {loading === true ? <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header user-select-none">
                    <h4><strong>ຂໍ້ມູນແຂວງ ແລະ ຂໍ້ມູນເມືອງ</strong></h4>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header display-flex">
                    <div className="col-md-4">
                      <h3 className="card-title">ແຂວງທັງຫມົດ ( <strong className='text-danger'>{Province.length}</strong> )</h3>
                    </div>
                    <div className="col-md-8">
                      <div className="input-group input-group-sm">
                        <input onChange={fillterData} type="text" name="table_search" className="form-control float-right" placeholder="ຄົ້ນຫາດ້ວຍຊື່ແຂວງ..." />
                        <div className="input-group-append">
                          <button type="submit" className="btn btn-default">
                            <i className="fas fa-search" />
                          </button>
                        </div>
                        <div className="input-group-text bg-green">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">ເພີມແຂວງ</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion" id="accordionExample">
                    <div id="collapseTwo" class="accordion-collapse collapse idExample" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">ຊື່ແຂວງ</label>
                          <div className="input-group">
                            <input type="search" className="form-control" name='name' onChange={(e) => setformValues(e.target.value)} placeholder="ປ້ອນຊື່ແຂວງ" required/>
                            <span className="input-group-text btn bg-green" onClick={SubProvine}><i class="bi bi-plus-lg"></i> | ບັນທືກຂໍ້ມູນແຂວງ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>ຊື່ແຂວງ</th>
                          <th className="text-center">ຈັດການ</th>
                          <th className="text-center col-1">ສະແດງຂໍ້ມູນແຂວງ</th>
                        </tr>
                      </thead>

                      <tbody>
                        {value.length > 0 ? tableFiller.map((item, index) => (
                          <tr>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td class="text-center py-0 align-middle">
                              <div class="btn-group btn-sm">
                                <EditProvinceModal id={item.id} ShowModal={ShowModal} setShowModal={setShowModal}></EditProvinceModal>&nbsp;
                                <button onClick={() => deleteProvince(item.id)} class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                              </div>
                            </td>
                            <td className="text-center">
                              <span className={`btn btn-sm ${functionDistrice == item.id ? 'btn-success' : 'btn-outline-success'}`} onClick={(e) => Click_list_Distric(item)}>List | <i class="bi bi-caret-right-fill"></i></span>
                            </td>
                          </tr>
                        )) : Province.map((item, index) => (
                          <tr>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td class="text-center py-0 align-middle">
                              <div class="btn-group btn-sm">
                                <EditProvinceModal id={item.id} ShowModal={ShowModal} setShowModal={setShowModal}></EditProvinceModal>&nbsp;
                                <button onClick={() => deleteProvince(item.id)} class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                              </div>
                            </td>
                            <td className="text-center">
                              <span className={`btn btn-sm ${functionDistrice == item.id ? 'btn-success' : 'btn-outline-success'}`} onClick={(e) => Click_list_Distric(item)}>ເມືອງ | <i class="bi bi-caret-right-fill"></i></span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {Province.length === 0 ? <h1 className='text-center my-3'>ບໍ່ມີຂໍ້ມູນ</h1> : ""}
                  </div>


                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>

              {/* District  */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header display-flex">
                    <div className="col-md-4">
                      <h3 className="card-title">ເມືອງທັງຫມົດ ( <strong className='text-danger'>{getDistrict.filter((e) => e.provinceId == functionDistrice).length}</strong> )</h3>
                    </div>
                    <div className="col-md-8">
                      <div className="input-group input-group-sm">
                        <input type="text" onChange={fillterDataA} name="table_search" className="form-control" placeholder="ຄົ້ນຫາດ້ວຍຊື່ເມືອງ..." disabled={functionDistrice == 0 ? getDistrict.filter((e) => e.provinceId == functionDistrice).length == 0 ? true : false : false}/>
                        <div className="input-group-append">
                          <button type="submit" className="btn btn-default">
                            <i className="fas fa-search" />
                          </button>
                        </div>
                        <div className="input-group-text bg-green">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" disabled={functionDistrice == 0 ? getDistrict.filter((e) => e.provinceId == functionDistrice).length == 0 ? true : false : false}>ເພີມເມືອງ</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion" id="accordionExample">
                    <div id="collapseThree" class="accordion-collapse collapse idExample" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">ຊື່ເມືອງ | {Showmapprovine}</label>
                          <div className="input-group">
                            <input type="search" className="form-control" name='name' onChange={(e) => setValueDistrice(e.target.value)} placeholder="ປ້ອນຊື່ເມືອງ" required/>
                            <span className="input-group-text btn bg-green" onClick={SubDistrice}><i class="bi bi-plus-lg"></i> | ບັນທືກຂໍ້ມູນເມືອງ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body table-responsive p-0">
                  <div class="accordion" id="accordionExample">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>ຊື່ເມືອງ</th>
                          <th>ຊື່ແຂວງ</th>
                          <th className="text-center">ຈັດການ</th>
                        </tr>
                      </thead>

                      <tbody>
                        {valueA.length > 0 ? tableFillerA.map((item, index) => (
                          <>
                            <tr>
                              <td>{index+1}</td>
                              <td>{item.name}</td>
                              <td>{Showmapprovine}</td>
                              <td class="text-center py-0 align-middle">
                                <div class="btn-group btn-sm">
                                  <button class="btn btn-sm btn-primary" onClick={() => resetStats(item)} type="button" data-bs-toggle="collapse" data-bs-target={`#updateThree${index+1}`} aria-expanded="false" aria-controls={`updateThree${index+1}`}><i className='fas fa-edit'>ແກ້ໄຂ</i></button>&nbsp;
                                  <button onClick={() => deleteDistrict(item.id)} class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan='4'>
                                <div id={`updateThree${index+1}`} class={`accordion-collapse ${ConfrimEdit == item.id ? 'collapse-colmun' : 'collapse'} collape-component`} aria-labelledby={`headingTwo${index+1}`} data-bs-parent="#accordionExample">
                                  <div class="accordion-body">
                                    <div className="form-group">
                                      <div className="input-group">
                                        <span className="input-group-text">{index+1}</span>
                                        <input type="search" className="form-control" name='name' defaultValue={item.name} onChange={(e) => setEditDistrice(e.target.value)} placeholder="ປ້ອນຊື່ເມືອງ" required/>
                                        <select className="form-control form-select input-group-text bg-white" onChange={(e) => setEditUIDDistrice(e.target.value)} required>
                                          <option value={functionDistrice}>{Showmapprovine}</option>
                                          {Province.map((item, index) => (
                                            <option value={item.id}>{item.name}</option>
                                          ))}
                                        </select>
                                        <span className="input-group-text btn bg-green" onClick={(e) => SubEditDistric(item)}><i class="bi bi-plus-lg"></i> | ບັນທືກ</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        )) : getDistrict.filter((e) => e.provinceId == functionDistrice).map((item, index) => (
                          <>
                            <tr>
                              <td>{index+1}</td>
                              <td>{item.name}</td>
                              <td>{Showmapprovine}</td>
                              <td class="text-center py-0 align-middle">
                                <div class="btn-group btn-sm">
                                  <button class="btn btn-sm btn-primary" onClick={() => resetStats(item)} type="button" data-bs-toggle="collapse" data-bs-target={`#updateThree${index+1}`} aria-expanded="false" aria-controls={`updateThree${index+1}`}><i className='fas fa-edit'>ແກ້ໄຂ</i></button>&nbsp;
                                  <button onClick={() => deleteDistrict(item.id)} class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button>
                                </div>
                              </td>
                            </tr>
                            <tr className={ConfrimEdit == item.id ? 'collapse-inline' : 'collapse-inline'}>
                              <td colSpan='4'>
                                <div id={`updateThree${index+1}`} class={`accordion-collapse ${ConfrimEdit == item.id ? 'collapse-colmun' : 'collapse'} collape-component`} aria-labelledby={`headingTwo${index+1}`} data-bs-parent="#accordionExample">
                                  <div class="accordion-body">
                                    <div className="form-group">
                                      <div className="input-group">
                                        <span className="input-group-text">{index+1}</span>
                                        <input type="search" className="form-control" name='name' defaultValue={item.name} onChange={(e) => setEditDistrice(e.target.value)} placeholder="ປ້ອນຊື່ເມືອງ" required/>
                                        <select className="form-control form-select input-group-text bg-white" onChange={(e) => setEditUIDDistrice(e.target.value)} required>
                                          <option value={functionDistrice}>{Showmapprovine}</option>
                                          {Province.map((item, index) => (
                                            <option value={item.id}>{item.name}</option>
                                          ))}
                                        </select>
                                        <span className="input-group-text btn bg-green" onClick={(e) => SubEditDistric(item)}><i class="bi bi-plus-lg"></i> | ບັນທືກ</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                    </div>
                    {getDistrict.filter((e) => e.provinceId == functionDistrice).length == 0 ? <h1 className='text-center my-3'>ບໍ່ມີຂໍ້ມູນ {Showmapprovine}</h1> : ''}
                  </div>

                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>

            </div>
          </div>
        </div>
      </div> : <Spinner />}
    </div>
  )
}

export default Province