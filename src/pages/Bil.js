import axios from 'axios'
import React, { useEffect, useState, useRef, useReducer } from 'react'
import { Link } from 'react-router-dom'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'
import '../assets/css/customPagination.css'
import LoadingSpin from 'react-loading-spin'
import { NumbericFormat, NumberFormatBase } from 'react-number-format';
import Swal from 'sweetalert2'
import EditeBill from './EditeBill'

const Candidates = () => {
    const token = sessionStorage.getItem('myToken')
    const [loading, setLoading] = useState(false)
    if(!token) {
      window.location = "/login"
    }

    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    const [showCandidates, setshowCandidates] = useState([])
    const [ Week, setWeek ] = useState('')
    const [ Timedraw, setIimedraw ] = useState('')
    useEffect(() => {
        axios.get(url.Mainurl + url.getBil).then((res) => {
            setshowCandidates(res.data.rows.reverse())
            setLoading(true)
        })
        axios.get(url.Mainurl + url.getLatestWeek).then((res) => {
            setWeek(res.data.data.week);
        }).catch((error) => {
            console.log(error.response);
        })
        axios.get(url.Mainurl + url.getLatestDrawDate).then((res) => {
            setIimedraw(res.data.data)
        })
    }, [reducer])

    const LoopQnumberDrw = [...new Set(showCandidates.map(item => item.week_id))]

    const [ LimitPage, setlimitPage ] = useState(0)
    const [ ShowPage, setShowPage ] = useState(1)
    function Next() {
        if(ShowPage === (showCandidates.slice((0), (showCandidates.filter((e) => e.is_win == false).length) / 25).length +1)){
        }else{
            setlimitPage(LimitPage +25)
            setShowPage(ShowPage +1)
        }
    }
    function Back() {
        if(LimitPage !== 0) {
            setlimitPage(LimitPage -25)
            setShowPage(ShowPage -1)
        }
    }

    const [value, setValue] = useState('')
    const [valueWeek, setvalueWeek] = useState('')
    const [tableFiller, setTablefiller] = useState([])
    const fillterData = (e) => {
        if(e.target.value != ""){
            setValue(e.target.value);
            setlimitPage(0)
            setShowPage(1)
            setvalueWeek(e.target.value);
            const fillterTable = showCandidates.filter(o => Object.keys(o).some(k => 
                String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            ) && o.is_win == false);
            setTablefiller([...fillterTable])
        }else{
            setValue(e.target.value);
            setlimitPage(0)
            setShowPage(1)
            setvalueWeek(e.target.value);
            setshowCandidates([...showCandidates])
        }
    }
    const fillterWeek = (e) => {
        if(e.target.value != ""){
            setValue(e.target.value);
            setlimitPage(0)
            setShowPage(1)
            setvalueWeek('')
            const fillterTable = showCandidates.filter(o => o.week_id == e.target.value && o.is_win == false);
            setTablefiller([...fillterTable])
        }else{
            setValue(e.target.value);
            setlimitPage(0)
            setShowPage(1)
            setvalueWeek('')
            setshowCandidates([...showCandidates])
        }
    }

    function Reset () {
        setValue('')
        setRedeuce()
        setvalueWeek('')
    }
    
    function AddWeek () {
        Swal.fire({
            title: "ທ່ານຕ້ອງການປິດງວດນີ້ ຫຼື ບໍ່?",
            text: "ເມືອເພີມງວດໃໝ່ ແລ້ວ ການເພີມບີນທັດໄປຈະເປັນບີນຂອງງວດປະຈຸບັນ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ເພິ່ມງວດ",
            cancelButtonText: "ຍົກເລີກ",
        }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 25000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })
            
            Toast.fire({
            icon: 'info',
            title: 'ກຳລັງປະເມີນຜົນ'
            })
    
            axios.post(url.Mainurl + url.postWeek)
            .then((res) => {
                axios.get(url.Mainurl + url.getLatestWeek).then(
                (response) => {
                    axios.put(url.Mainurl + url.putDrawDate + Timedraw.id).then((res) => {
                        setRedeuce()
                        Swal.fire({
                            icon: "success",
                            title: "ເພິ່ມງວດແລ້ວ!",
                        })
                    }).catch((err) => {
                        setRedeuce()
                        Swal.fire({
                            icon: "success",
                            title: "ເພິ່ມງວດແລ້ວ!",
                        })
                    })
                }
                );
            })
            .catch((err) => {
                Swal.fire({
                icon: "error",
                title: "ລອງໃຫມ່ອີກຄັ້ງ!",
                });
            });
        }
        });
    }

    function deletebil(e) {
        Swal.fire({
            title: 'ທ່ານຕ້ອງການລົບບີນນີ້ ຫຼື ບໍ່?',
            text: `ເລກບີນ: ${e.bil_number}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບຂໍ້ມູນ!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url.Mainurl + url.deletebils + e.id).then((res) => {
                    Swal.fire(
                        'ລົບຂໍ້ມູນສຳເລັດ!',
                        `ເລກບີນ: ${e.bil_number}`,
                        'success'
                    )
                    setRedeuce()
                }).catch((err) => {
                    alert('ເກີດຂໍ້ຜິດພາດກະລຸນາລອງໃໝ່ອີກຄັ້ງ!')
                    setRedeuce()
                })
            }
          })
    }

    return (
        <div>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <label className="btn-outline-white pt-2">ງວດປະຈຸບັນ: ( <strong className='text-danger'>{Week}</strong> ) <text className='btn-sm btn-success' onClick={AddWeek}><i class="bi bi-plus"></i> ເພີມງວດ</text></label>
                            <Link to="/add-candidate" className="card-title btn btn-success float-right">ເພິ່ມຜູ້ມີສິດສຸ່ມ</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className='row'>
                                        <div className='col-md-12 display-flex'>
                                            <h3 className="card-title w-100">ລາຍຊື່ແລະບິນຂອງຜູ້ມີສິດສຸ່ມ ( <strong className='text-danger'>{showCandidates.filter((e) => e.is_win == false).length}</strong> )</h3>
                                            <h3 className="card-title text-end w-100 row">
                                                <div className='col-8 input-group-sm input-group'>
                                                    <NumberFormatBase type='search' value={valueWeek} className='form-control form-search Nato_sanlaos' onChange={(e) => fillterData(e)} placeholder='ຄົ້ນຫາ: ເລກບີນ - ລະຫັດຜູ້ຂາຍ'/>&nbsp;
                                                    <select className='user-select-none form-select form-control input-group-text bg-white' value={value} onChange={(e) => fillterWeek(e)}>
                                                        <option value=''>~~ຄົ້ນຫາດ້ວຍງວດ~~</option>
                                                        {LoopQnumberDrw.map((item) => (
                                                            <option value={item}>ງວດທີ່: {item}</option>
                                                        ))}
                                                    </select>&nbsp;
                                                    <span className='input-group-text btn btn-dark' onClick={Reset}>Reset</span>
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
                                                <th>ເລກບິນ</th>
                                                <th>ມູນຄ່າໃບບິນ</th>
                                                <th>ເບີຕິດຕໍ່</th>
                                                <th>ລະຫັດຜູ້ຂາຍ</th>
                                                <th>ງວດທີ່</th>
                                                <th>ບ້ານ</th>
                                                <th>ເມືອງ</th>
                                                <th>ແຂວງ</th>
                                                <th>ຈັດການ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {value.length > 0 ? tableFiller.slice((0), (25+ LimitPage)).map((item, index) => (
                                                (LimitPage-1) < (index) ? 
                                                <tr key={index}>
                                                    <td>#{index+1}</td>
                                                    <td>{item.candidate.fullName}</td>
                                                    <td>{item.bil_number}</td>
                                                    <td>{parseInt(item?.bil_price).toLocaleString()} ກີບ</td>
                                                    <td>{item.candidate.phone}</td>
                                                    <td>{item.bil_seller}</td>
                                                    <td>{item.week_id}</td>
                                                    <td>{item.candidate.village}</td>
                                                    <td>{item.candidate.district.name}</td>
                                                    <td>{item.candidate.province.name}</td>
                                                    <td>
                                                        <EditeBill id={item.id} Gweek={item.week_id} fullname={item.candidate.fullName} bill={item.bil_number} seller={item.bil_seller} pricebil={item.bil_price} />&nbsp;
                                                        <label className='btn btn-sm btn-danger' onClick={() => deletebil(item)}><i class="bi bi-trash3-fill"></i></label>
                                                    </td>
                                                </tr>
                                                : ''
                                            ))  :
                                            showCandidates.filter((e) => e.is_win == false).slice((0), (25+ LimitPage)).map((item, index) => (
                                                (LimitPage-1) < (index) ? 
                                                <tr>
                                                    <td>#{index+1}</td>
                                                    <td>{item.candidate.fullName}</td>
                                                    <td>{item.bil_number}</td>
                                                    <td>{parseInt(item?.bil_price).toLocaleString()} ກີບ</td>
                                                    <td>{item.candidate.phone}</td>
                                                    <td>{item.bil_seller}</td>
                                                    <td>{item.week_id}</td>
                                                    <td>{item.candidate.village}</td>
                                                    <td>{item.candidate.district.name}</td>
                                                    <td>{item.candidate.province.name}</td>
                                                    <td className='input-group'>
                                                        <EditeBill id={item.id} Gweek={item.week_id} fullname={item.candidate.fullName} bill={item.bil_number} seller={item.bil_seller} pricebil={item.bil_price}/>
                                                        <label className='btn btn-sm btn-danger' onClick={() => deletebil(item)}><i class="bi bi-trash3-fill"></i> ລົບບີນ</label>
                                                    </td>
                                                </tr>
                                                : ''
                                            ))}
                                            
                                        </tbody> 
                                        {loading === true ? '' : <Spinner/>}
                                    </table> 
                                </div>
                                <div className='text-center user-select-none input-group d-flex justify-content-end pageinations'>
                                    <span className='btn-sm btn-primary input-group-text' onClick={Back}>back</span>&nbsp;
                                    <span className='bg-white input-group-text'>{ShowPage} in {(showCandidates.slice((0), (showCandidates.filter((e) => e.is_win == false).length) / 25).length +1)}</span>&nbsp;
                                    <span className='btn-sm btn-primary input-group-text' onClick={Next}>Next</span>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                    </div>

                </div>
            </div>                          
        </div> 
        </div>
    )
}

export default Candidates