import axios from 'axios'
import React, { useEffect, useState, useRef, useReducer } from 'react'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'
import { NumericFormat, NumberFormatBase } from 'react-number-format';
import '../assets/css/customPagination.css'
import Swal from 'sweetalert2'
import EditCandidates_eligibility from './EditCandidates_eligibility'
import Add_bil from '../components/Add-bil'
import List_bin from './Modal-BIN/List_bin';

const Candidates_eligibility = () => {

    const [loading, setLoading] = useState(false)
    const token = sessionStorage.getItem('myToken')
    if (!token) {
        window.location = "/login"
    }

    const [ GETAPICAN, setAPI ] = useState([])
    const [ reducer, setRedeuce ] = useReducer(x => x + 1, 0)
    const [ Display, setDisplay ] = useState(false)
    const [ Week, setWeek ] = useState('')
    const [ Timedraw, setIimedraw ] = useState('')
    
    useEffect(() => {
        axios.get(url.Mainurl + url.getCandidate).then((res) => {
            setAPI(res.data.rows.reverse())
            setDisplay(true)
        }).catch((err) => {setDisplay(undefined)})

        axios.get(url.Mainurl + url.getLatestWeek).then((res) => {
            setWeek(res.data.data.week);
        }).catch((error) => {
            console.log(error.response);
        });
        axios.get(url.Mainurl + url.getLatestDrawDate).then((res) => {
            setIimedraw(res.data.data)
        })
    }, [reducer])

    const LoopQProvine = [...new Set(GETAPICAN.map(item => item.province.name))]

    const [ LimitPage, setlimitPage ] = useState(0)
    const [ ShowPage, setShowPage ] = useState(1)
    function Next() {
        if(ShowPage === (GETAPICAN.slice((0), (GETAPICAN.length) / 25).length +1)){
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
    const [ Resetvalue, setREValue ] = useState('')
    const [tableFiller, setTablefiller] = useState([])
    const fillterData = (e) => {
        if(e.target.value != ''){
            setValue(e.target.value);
            setShowPage(1)
            setlimitPage(0)
            setREValue(e.target.value);
            const fillterTable = GETAPICAN.filter((o) => Object.keys(o).some(k => 
                String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            ));
            setTablefiller([...fillterTable])
        }else{
            setREValue(e.target.value);
            setShowPage(1)
            setlimitPage(0)
            setValue(e.target.value);
            setAPI([...GETAPICAN])
        }
    }
    const fillterprovine = (e) => {
        if(e.target.value != ''){
            setValue(e.target.value);
            setShowPage(1)
            setlimitPage(0)
            setREValue('')
            const fillterTable = GETAPICAN.filter((o) => o.province.name == e.target.value);
            setTablefiller([...fillterTable])
        }else{
            setREValue('')
            setShowPage(1)
            setlimitPage(0)
            setValue(e.target.value);
            setAPI([...GETAPICAN])
        }
    }

    function Reset(){
        setREValue('')
        setRedeuce()
        setDisplay(false)
        setValue('')
    }

    function Delete(id) {
        Swal.fire({
            title: 'ລົບຂໍ້ມູນຜູ້ມີສິດສຸມ?',
            text: "ທ່ານຈະບໍ່ສາມາດນຳກັບຄືນມາໄດ້!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບຂໍ້ມູນ!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url.Mainurl + url.deleteCandidate + id).then(() => {
                    Swal.fire(
                        'ລົບຂໍ້ມູນສຳເລັດ!',
                        'ໄຟລ໌ຂອງທ່ານໄດ້ຖືກລຶບແລ້ວ.',
                        'success'
                    )
                    setRedeuce()
                })
            }
        })
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
            timer: 3000,
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

    return (
        <div>
            {Display === true ? <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className='card card-header'>
                            <label className="btn-outline-white pt-2">ງວດປະຈຸບັນ: ( <strong className='text-danger'>{Week}</strong> ) <text className='btn-sm btn-success' onClick={AddWeek}><i class="bi bi-plus"></i> ເພີມງວດ</text></label>
                        </div>&nbsp;
                        <div className="row">
                            <div>
                            <div className="card">
                                <div className="card-header">
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <h3 className="card-title">ລາຍຊື່ຜູ້ມີສິດສຸ່ມລວມ ( <strong className='text-danger'>{GETAPICAN.length}</strong> )</h3>
                                        </div>
                                        <div className="col-md-6 form-group input-group-sm">
                                            <div className='input-group input-group-sm'>
                                            <input type='search' className='form-control form-search Nato_sanlaos' value={Resetvalue} onChange={(e) => fillterData(e)} placeholder='ຄົ້ນຫາ: ເລກບີນ - ລະຫັດຜູ້ຂາຍ'/>&nbsp;
                                            <select className='user-select-none form-select form-control input-group-text bg-white' value={value} onChange={fillterprovine}>
                                                <option value=''>~~ຄົ້ນຫາດ້ວຍແຂວງ~~</option>
                                                {LoopQProvine.map((item) => (
                                                    <option value={item}>{item}</option>
                                                ))}
                                            </select>&nbsp;
                                            <span className='btn input-group-text' onClick={Reset}>Reset</span>
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
                                                <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                                                <th>ເບີຕິດຕໍ່</th>
                                                <th>ບ້ານ</th>
                                                <th>ເມືອງ</th>
                                                <th>ແຂວງ</th>
                                                <th>ຈັດການ</th>
                                            </tr>
                                        </thead>

                                        <tbody className='w-100'>

                                            {Display == false ? '' : value.length > 0 ? tableFiller.slice((0), (25+ LimitPage)).map((item, index) => (
                                                (LimitPage-1) < (index) ? 
                                                <tr>
                                                    <td>#{index+1}</td>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.village}</td>
                                                    <td>{item.district.name}</td>
                                                    <td>{item.province.name}</td>
                                                    <td className='col-1'>
                                                        <List_bin phone={item.phone} fullname={item.fullName} village={item.village} district={item.district == null ? '' : item.district.name} province={item.province == null ? '' : item.province.name}/>
                                                        <Add_bil id={item.id} />&nbsp;
                                                        <EditCandidates_eligibility id={item.id} />&nbsp;
                                                        <a className='btn btn-sm btn-danger' onClick={(e) => Delete(item.id)}><i class="fa fa-trash"></i></a>
                                                    </td>
                                                </tr> : ''
                                            ))  :
                                            GETAPICAN.slice((0), (25+ LimitPage)).map((item, index) => (
                                                (LimitPage-1) < (index) ? 
                                                <tr>
                                                    <td>#{index+1}</td>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.village}</td>
                                                    <td>{item.district.name}</td>
                                                    <td>{item.province.name}</td>
                                                    <td className='col-1'>
                                                        <List_bin phone={item.phone} fullname={item.fullName} village={item.village} district={item.district == null ? '' : item.district.name} province={item.province == null ? '' : item.province.name}/>
                                                        <Add_bil id={item.id} />&nbsp;
                                                        <EditCandidates_eligibility id={item.id} />&nbsp;
                                                        <a className='btn btn-sm btn-danger' onClick={(e) => Delete(item.id)}><i class="fa fa-trash"></i></a>
                                                    </td>
                                                </tr> : ''
                                            )) }&nbsp;

                                            {Display == false ? 
                                                <>
                                                    <tr>
                                                        <td colSpan={9} className='td_load_extreme_title'></td>
                                                    </tr>&nbsp;
                                                    <tr>
                                                        <td colSpan={9} className='td_load_extreme_title'></td>
                                                    </tr>&nbsp;
                                                    <tr>
                                                        <td colSpan={9} className='td_load_extreme_title'></td>
                                                    </tr>
                                                </>
                                            : GETAPICAN.length == 0 ? 
                                            <tr>
                                                <td colSpan={9}>
                                                <div className="lodding-number-bill w-100">
                                                    <div className="text-center">
                                                        <p className="Nato_sanlaos">ບໍ່ມີຂໍ້ມູນລາຍຊື່ຜູ້ມີສິດສຸ່ມ</p>
                                                    </div>
                                                </div>
                                                </td>
                                            </tr> : '' }
                                        </tbody>

                                    </table>
                                    
                                    <div className='text-center input-group d-flex d-flex justify-content-end' style={{paddingBottom: 2+'%', paddingRight: 2+'%'}}>
                                        <span className='btn-sm btn-primary input-group-text' onClick={Back}>back</span>&nbsp;
                                        <span className='bg-white input-group-text'>{ShowPage} in {(GETAPICAN.slice((0), (GETAPICAN.length) / 25).length +1)}</span>&nbsp;
                                        <span className='btn-sm btn-primary input-group-text' onClick={Next}>Next</span>
                                    </div>
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

export default Candidates_eligibility