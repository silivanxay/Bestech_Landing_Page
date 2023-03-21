import axios from 'axios'
import React, { useEffect, useState, useMemo, useReducer } from 'react'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'
import ReactPaginate from 'react-paginate'
import Moment from 'moment'
import LoadingSpin from 'react-loading-spin'
import { Button, Modal, Form } from 'react-bootstrap'

const Winner = (props) => {
    const token = sessionStorage.getItem('myToken')
    const [loading, setLoading] = useState(false)
    const [ Display, setError ] = useState(false)

    if (!token) {
        window.location = "/login"
    }
    const [winnerList, setwinnerList] = useState([])
    const [ reducer, setReducer ] = useReducer(x => x +1, 0)
    useEffect(() => {
        axios.get(url.Mainurl + url.getWinner).then((res) => {
            setwinnerList(res.data.data)
            setLoading(true)
            setError(true)
        }).catch((err) => {
            setLoading(false)
            setError(false)
            alert('ເກີດຂໍ້ຜິດພາດ')
        })
    }, [reducer])

    const LoopQnumberDrw = [...new Set(winnerList.map(item => item.week_id))]
    const LoopQPrice = [...new Set(winnerList.map(item => item.prize.title))]

    const [ LimitPage, setlimitPage ] = useState(0)
    const [ ShowPage, setShowPage ] = useState(1)
    function Next() {
        if(ShowPage === (winnerList.slice((0), (winnerList.length) / 25).length +1)){
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
    const [ValueA, setValueA] = useState('')
    const [ValueB, setValueB] = useState('')
    const [ValueC, setValueC] = useState('')
    const [tableFiller, setTablefiller] = useState([])
    const fillterData = (e) => {
        if(e.target.value != ""){
            setValue(e.target.value);
            setValueC(e.target.value)
            setValueA('');
            setShowPage(1)
            setlimitPage(0)
            const fillterTable = winnerList.filter(o => Object.keys(o).some(k => 
                String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
            ));
            setTablefiller([...fillterTable])
        }else{
            setValue(e.target.value);
            setlimitPage(0)
            setShowPage(1)
            setwinnerList([...winnerList])
            setValueA(false);
        }
    }

    const fillterWEEK = (e) => {
        if(e.target.value != ''){
            setValue(e.target.value);
            setValueA(e.target.value)
            setValueB('');
            setValueC('');
            setlimitPage(0)
            setShowPage(1)
            const fillterTable = winnerList.filter(o => o.week_id == e.target.value);
            setTablefiller([...fillterTable])
        }else{
            setValue(e.target.value);
            setlimitPage(0)
            setShowPage(1)
            setValueC('');
            setwinnerList([...winnerList])
            setValueB('');
        }
    }
    
    const PriceTable = (e) => {
        if(e.target.value != ''){
            setValue(e.target.value);
            setValueB(e.target.value);
            setValueA('');
            setlimitPage(0)
            setShowPage(1)
            setValueC('');
            const fillterTable = winnerList.filter(o => o.prize.title == e.target.value);
            setTablefiller([...fillterTable])
        }else{
            setValue(e.target.value);
            setlimitPage(0)
            setValueA('');
            setValueC('');
            setShowPage(1)
            setwinnerList([...winnerList])
            setValueB(false);
        }
    }

    const [ APIBil, setBil ] = useState([])
    const [ APINAME, setfullname ] = useState([])
    const [ APIbil_seller, setbil_seller ] = useState([])
    const [ APITITLE, settitle ] = useState([])
    const [ APIsetweek_id, setweek_id ] = useState([])
    const [ APIVillAGE, setvillage ] = useState([])
    const [ APIDISTRIC, setdistric ] = useState([])
    const [ APIPROVINE, setprovine ] = useState([])
    const [ APIPHONE, setphone ] = useState([])
    function ClickSHowaffter(e){
      setModalSHow(true)
      setBil(e.bil_number)
      setbil_seller(e.bil_seller)
      setweek_id(e.week_id)
      setfullname(e.fullName)
      settitle('ລາງວັນທີ່ '+e.prize.title + ' ' + e.prize.description)
      setvillage(e.village)
      setprovine(e.province)
      setdistric(e.district)
      setphone(e.phone)
    }
  
    const [ ModalSHow, setModalSHow ] = useState(false)
    const ModalCloss = () => setModalSHow(false)

    function ResetData (){
        setError(false)
        setReducer()
        setValue('')
        setValueA('');
        setValueB('');
        setValueC('');
    }

    return (
        <div>
            <Modal show={ModalSHow} onHide={ModalCloss} size='lg' aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className="renative posotion-backgroup">
                    <div className="item-position-winner">
                        <p className="text-center Nato-font-a zoom-in-zoom-out"><h2><stong>ຜູ້ໂຊກດີ</stong></h2></p>
                        <p className="text-center Nato-font-a"><h4>{APITITLE}</h4></p>
                        <p className="text-center Nato-font-a"><h4>ຜູ້ໂຊກດີ: {APINAME}</h4></p>
                        <p className="text-center Nato-font-a"><h4>ລະຫັດຜູ້ຂ່າຍ: {APIbil_seller}</h4></p>
                        <p className="text-center Nato-font-a"><h4>ງວດທີ່: {APIsetweek_id}</h4></p>
                        <p className="text-center Nato-font-a"><h4>ບີນທີ່ຖືກລາງວັນ: {APIBil}</h4></p>
                        <p className="text-center Nato-font-a"><h4>ທີ່ຢູ່ປະຈຸບັນ</h4></p>
                        <p className="text-start-post Nato-font-a"><h4>ບ້ານ: {APIVillAGE}</h4></p>
                        <p className="text-start-post Nato-font-a"><h4>ເມືອງ: {APIDISTRIC}</h4></p>
                        <p className="text-start-post Nato-font-a"><h4>ແຂວງ: {APIPROVINE}</h4></p>
                        <p className="text-start-post Nato-font-a"><h4>ເບີໂທ: {APIPHONE}</h4></p>
                    </div>
                </Modal.Body>
            </Modal>
            {loading === true ? <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className='card-header'>
                                        <div className='col-md-12 display-flex'>
                                            <h3 className="card-title w-100">ຈຳນວນຜູ້ໂຊກດີທັງຫມົດ ( <strong className='text-danger'>{winnerList.length}</strong> )</h3>
                                            <h3 className="card-title w-100 row">
                                                <div className='col-8 input-group-sm input-group'>
                                                    <input onChange={fillterData} type="search" value={ValueC} name="table_search" className="bg-white form-control input-group-text" placeholder="ຄົ້ນຫາ..."/>&nbsp;
                                                    <select min='1' onChange={fillterWEEK} value={ValueA} className="bg-white form-control float-right form-select text-center">
                                                        <option value=''>~~ເລືອກງວດ~~</option>
                                                        {LoopQnumberDrw.map((item) => (
                                                            <option value={item}>ງວດ: {item}</option>
                                                        ))}
                                                    </select>&nbsp;
                                                    <select className='bg-white input-group-text form-control select-borderclass text-center' value={ValueB} onChange={PriceTable}>
                                                        <option value=''>~~ຄົ້ນຫາດ້ວຍລາງວັນ~~</option>
                                                        {LoopQPrice.map((item) => (
                                                            <option value={item}>ລາງວັນທີ: {item}</option>
                                                        ))}
                                                    </select>
                                                    <label className="btn input-group-text" onClick={ResetData}>
                                                        <i class="bi bi-arrow-repeat"></i> Reset
                                                    </label>
                                                </div>
                                            </h3>
                                        </div>
                                    </div>
                                   
                                    {/* /.card-header */}
                                    <div className="card-body table-responsive">
                                        <table className="table table-hover text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>ຊື່ ແລະ ນາມສະກຸຸນ</th>
                                                    <th>ເລກບິນ</th>
                                                    <th>ເບີໂທ</th>
                                                    <th>ວັນ/ເດືອນ/ປີ ຖືກລາງວັນ</th>
                                                    <th>ບ້ານ</th>
                                                    <th>ເມືອງ</th>
                                                    <th>ແຂວງ</th>
                                                    <th className='text-center'>ງວດທີ່</th>
                                                    <th className='text-center'>ລາງວັນທີ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { Display == false ? '' :
                                                    value.length > 0 ? tableFiller.slice((0), (25+ LimitPage)).map((item, index) => (
                                                        (LimitPage-1) < (index) ? 
                                                        <tr onClick={(e) => ClickSHowaffter(item)}>
                                                            <td>{index+1}</td>
                                                            <td>{item.fullName}</td>
                                                            <td>{item.bil_number}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{Moment(item.createdAt).format("DD/MM/yyyy H:ss")}</td>
                                                            <td>{item.village}</td>
                                                            <td>{item.district}</td>
                                                            <td>{item.province}</td>
                                                            <td className='text-center'>{item.week_id}</td>
                                                            <td className='text-center'>ລາງວັນທີ {item.prize.title + ' ' + item.prize.description}</td>
                                                        </tr> : ''
                                                    ))
                                                    :
                                                    winnerList.slice((0), (25+ LimitPage)).map((item, index) => (
                                                        (LimitPage-1) < (index) ? 
                                                        <tr onClick={(e) => ClickSHowaffter(item)}>
                                                            <td>{index+1}</td>
                                                            <td>{item.fullName}</td>
                                                            <td>{item.bil_number}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{Moment(item.createdAt).format("DD/MM/yyyy H:ss")}</td>
                                                            <td>{item.village}</td>
                                                            <td>{item.district}</td>
                                                            <td>{item.province}</td>
                                                            <td className='text-center'>{item.week_id}</td>
                                                            <td className='text-center'>ລາງວັນທີ {item.prize.title + ' ' + item.prize.description}</td>
                                                        </tr> : ''
                                                    ))
                                                }
                                                
                                            </tbody>
                                        </table>
                                        {Display == false ? <div className="lodding-number-bill w-100 p-5">
                                            <div className="text-center">
                                            <div class="spinner-border p-4" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            <p className="Nato_sanlaos">Internet Server</p>
                                            </div>
                                        </div> : '' }
                                         <div className='text-center input-group d-flex justify-content-end pageinations'>
                                            <span className='btn-sm btn-primary input-group-text' onClick={Back}>back</span>&nbsp;
                                            <span className='bg-white input-group-text'>{ShowPage} in {(winnerList.slice((0), (winnerList.length) / 25).length +1)}</span>&nbsp;
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

export default Winner