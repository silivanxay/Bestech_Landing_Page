import React, { useState, createContext } from "react";
import "./style.css";
import useLuckyDraw from "./useLuckyDraw";
import useCounter from "../Logic/useCounter";
import CountdownTimer from "../CountdownTimer";
import { Button, Modal, Form } from 'react-bootstrap'
import Spinner from '../uitilities/Spinner'

const LuckyDraw = () => {
  let {
    row1,
    row2,
    row3,
    row4,
    row5,
    row6,
    row7,
    row8,
    row9,
    row10,
    row11,
    row12,
    row13,
    row14,
    row15,
    row16,
    row17,
    row18,
    row19,
    play,
    showWinner,
    addWeek,
    prize,
    showWeek,
    setPriceSL,
    INterNet,
    Display,
    GETAPIWINNER,
    show,
    handleClose,
    Response,
    SLprice,
    WINNERSHOW,
    ReducerReset,
    MAX,
    MIN,
    ALLPLUS,
    dbMIN,
  } = useLuckyDraw();

  let {
    status,
  } = useCounter()
  const [PrizeID, setPrizeID] = useState()

  const [ SHOWHIDE, setSHOwhide ] = useState(-30)
  function SHow(){
    setSHOwhide(0)
  }
  function Hide(){
    setSHOwhide(-30)
  }

  const [ FS, setFullscreen ] = useState(false)
  function FullScreen () {
    setFullscreen(true)
  }
  function NONEScreen () {
    setFullscreen(false)
  }

  const [ APIBil, setBil ] = useState([])
  const [ APINAME, setfullname ] = useState([])
  const [ APIbil_seller, setbil_seller ] = useState([])
  const [ APIsetweek_id, setweek_id ] = useState([])
  const [ APITITLE, settitle ] = useState([])
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

  return (
    <>
    {/* Modal SHowWInner */}
    <Modal show={show} onHide={handleClose} className='user-select-none' aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="renative posotion-backgroup">
          <div className="backgroup-winner-oc"></div>
          <div className="item-position-winner">
            <p className="text-center Nato-font-a zoom-in-zoom-out"><h2><stong class='Nato_sanlaos'>ຜູ້ໂຊກດີ</stong></h2></p>
            <p className="text-center Nato-font-a"><h4>ລາງວັນທີ່ {WINNERSHOW.title} {WINNERSHOW.description}</h4></p>
            <p className="text-center Nato-font-a"><h4>ຜູ້ໂຊກດີ: {Response == '' ? '' : Response.candidate.fullName}</h4></p>
            {/* <p className="text-center Nato-font-a"><h4>ລະຫັດຜູ້ຂ່າຍ: {Response.bil_seller}</h4></p> */}
            <p className="text-center Nato-font-a"><h4>ງວດທີ່: {showWeek == undefined ? 'undefined' : showWeek}</h4></p>
            <p className="text-center Nato-font-a"><h4>ບີນທີ່ຖືກລາງວັນ: {Response.bil_number}</h4></p>
            <p className="text-center Nato-font-a"><h4>ທີ່ຢູ່ປະຈຸບັນ</h4></p>
            <p className="text-start-post Nato-font-a"><h4>ບ້ານ: {Response == '' ? '' : Response.candidate.village}</h4></p>
            <p className="text-start-post Nato-font-a"><h4>ເມືອງ: {Response == '' ? '' : Response.candidate.district.name}</h4></p>
            <p className="text-start-post Nato-font-a"><h4>ແຂວງ: {Response == '' ? '' : Response.candidate.province.name}</h4></p>
            <p className="text-start-post Nato-font-a"><h4>ເບີໂທ: {Response == '' ? '' : Response.candidate.phone}</h4></p>
          </div>
        </Modal.Body>
    </Modal>

    <Modal show={ModalSHow} onHide={ModalCloss} className='user-select-none' aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body className="renative posotion-backgroup">
          <div className="backgroup-winner-oc"></div>
            <div className="item-position-winner">
              <p className="text-center Nato-font-a zoom-in-zoom-out"><h2><stong class='Nato_sanlaos'>ຜູ້ໂຊກດີ</stong></h2></p>
              <p className="text-center Nato-font-a"><h4>{APITITLE}</h4></p>
              <p className="text-center Nato-font-a"><h4>ຜູ້ໂຊກດີ: {APINAME}</h4></p>
              {/* <p className="text-center Nato-font-a"><h4>ລະຫັດຜູ້ຂ່າຍ: {APIbil_seller}</h4></p> */}
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
    {/* Modal SHowWInner */}

    <div className="content-wrapper renative display-flex user-select-none">

      {/* Lottery Lucky Draw Number */}
      

      <div className="container-fluid">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
              <CountdownTimer />
              <div className="fullSlot">
                <h1 className="casinoName">Lottery Lucky Draw Number</h1>
                <h1 className="price">Lucky Draw</h1>
                <div className="slot padding-slote">
                  <div className="draw">{row1()}</div>
                  <div className="draw">{row2()}</div>
                  <div className="draw">{row3()}</div>
                  <div className="draw">{row4()}</div>
                  <div className="draw">{row5()}</div>
                  <div className="draw">{row6()}</div>
                  <div className="draw">{row7()}</div>
                  <div className="draw">{row8()}</div>
                  <div className="draw">{row9()}</div>
                  <div className="draw">{row10()}</div>
                  <div className="draw">{row11()}</div>
                  <div className="draw">{row12()}</div>
                  <div className="draw">{row13()}</div>
                  <div className="draw">{row14()}</div>
                  <div className="draw">{row15()}</div>
                  <div className="draw">{row16()}</div>
                  <div className="draw">{row17()}</div>
                  <div className="draw">{row18()}</div>
                  <div className="draw">{row19()}</div>
                </div>
                <h1 className="text-white pt-4">ຜູ້ໂຊກດີ</h1>
                <h1 className="price">{showWinner()}</h1>
                <div className="slotFoot row">
                  <div className="col-md-6">

                      <div className="input-group group-hidden-info">
                        <span className={`input-group-text colums-weekMAX ${ALLPLUS == '' ? '' : (ALLPLUS == 'false' ? 'MAX-BG' : '')}`} onClick={MAX}><text className={ALLPLUS == '' ? 'Nato_sanlaos' : (ALLPLUS == 'false' ? 'SpinnerBIC' : 'Nato_sanlaos')}>ສຸ່ມຄັ້ງໃຫຍ້</text>&nbsp;  <text className={`Nato_sanlaos ${ALLPLUS == '' ? 'd-none' : (ALLPLUS == 'false' ? '' : 'd-none')}`}> | ງວດສຸ່ມ {(showWeek == undefined ? 0 : showWeek)}</text></span>
                        <span className={`input-group-text colums-weekMIN ${ALLPLUS == '' ? '' : (ALLPLUS == true ? 'MIN-BG' : '')}`} onClick={MIN} onDoubleClick={dbMIN}><text className={ALLPLUS == '' ? 'Nato_sanlaos' : (ALLPLUS == true ? 'SpinnerBIC' : 'Nato_sanlaos')}>ສຸ່ມປະຈຳງວດ : {(showWeek == undefined ? 0 : showWeek)}</text></span>
                        {/* <span className={`input-group-text colums-weekMIN`} onClick={MIN}>ສຸ່ມປະຈຳງວດ</span> */}

                        {/* <span className={`betInput input-group-text form-control ${ALLPLUS == '' ? '' : (ALLPLUS == true ? 'input-absolute' : 'input-absolute-none')}`} readOnly>{showWeek == undefined ? 0 : showWeek}</span> */}
                        {/* <span className={`btn btn-primary input-group-text ${ALLPLUS == '' ? '' : (ALLPLUS == true ? 'input-absolute' : 'input-absolute-none')}`} onClick={(e) => {addWeek()}}>+ ເພີມງວດ</span> */}
                      </div>
                       
                  </div>
                  
                  <div className="col-md-6">
                    <div className="input-group">
                      <select className="betInput form-control" onChange={(e) => {setPriceSL(e.target.value)}}>
                        <option selected="" value={PrizeID === null ? "" : PrizeID}>
                          {PrizeID == null ? "--ກະລຸນາເລືອກລາງວັນ--" : `ລາງວັນ ${prize.filter((e) => e.id == PrizeID).map((e) => e.title)}`}{" "}
                        </option>
                        {prize.filter((e) => e.p_status == true).map((e, index) => (
                          <option key={index} value={e.id}>ລາງວັນທີ {e.title} {e.description}</option>
                        ))}
                      </select>
                      {ALLPLUS == true ? SHOWHIDE == 0 ?
                        <span className="btn bg-light input-group-text Nato_sanlaos display-respone-none" onClick={Hide}><i class="bi bi-chevron-double-right"></i> | ປິດລາຍຊື່</span>
                        :
                        <span className="btn bg-light input-group-text Nato_sanlaos display-respone-none" onClick={SHow}><i class="bi bi-chevron-double-left"></i> | ສະແດງລາຍຊື່</span>
                      :''}
                    </div>
                  </div>
                  
                  <div className="col-md-12 pt-4">
                    {status == 'active' ? 
                      <button className={`${showWeek == undefined ? 'spinButtonNONE' : (Display == false ? 'spinButtonNONE' : 'spinButton')}` } onClick={() => {play();}} disabled={showWeek == undefined ? true : (Display == false ? true : false)}>ກົດປຸ່ມເພືອເລີມສຸ່ມ</button> :
                      <button className='spinButtonNONE'>ຢູ່ໃນລະຫວ່າງ Count down</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Lottery Lucky Draw Number */}

      {/* List SHOW WINNER  */}
      <div className={`listshow-UserWinner Nato_sanlaos fullscreen-usershow marginRight`} style={{marginRight: SHOWHIDE +'%'}}>
        <h2 class="accordion-header  border-FULLWINNER" id="panelsStayOpen-headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
            {FS == true ?
              <span className='btn form-control' onClick={NONEScreen}><i class="bi bi-chevron-double-down"></i></span>
              :
              <span className='btn form-control' onClick={FullScreen}><i class="bi bi-chevron-double-up"></i></span>
            }
          </button>
        </h2>&nbsp;
        <p className="text-center font-size-sanlaos Nato_sanlaos">ລາຍຊື່ຜູ້ໂຊກດີໃນງວດທີ່</p>
        <p className="text-center font-size-sanlaos Nato_sanlaos"><strong>( {(showWeek == undefined ? 0 : showWeek)} )</strong></p>
        <span className='btn form-control border-FULLWINNER' onClick={ReducerReset}><i class="bi bi-arrow-repeat"></i> | ResetData</span> <hr/>
        <label className="text-center Nato_sanlaos font-size-sanlaosA">ລາຍຊື່ຜູ້ໂຊກດີ ລວມ: {GETAPIWINNER.filter((e) => e.week_id == (showWeek == undefined ? 0 : showWeek)).length} ຈຳນວນ</label>
        <ul class="list-group Nato_sanlaos">
          {GETAPIWINNER.filter((e) => e.week_id == (showWeek == undefined ? 0 : showWeek)).map((item, index) => (
            (index+1) == (GETAPIWINNER.filter((e) => e.week_id == (showWeek == undefined ? 0 : showWeek)).length) ?
            <li class="list-group-item Nato_sanlaos list-group-item-show" style={{backgroundColor: 'aliceblue'}} onClick={(e) => ClickSHowaffter(item)}><strong className="Nato_sanlaos">ລ່າສຸດ: #{index+1}</strong> | {item.fullName} | {item.prize.title} | ເລກບີນ: {item.bil_number} </li>
            :''
          ))}
        </ul>
        &nbsp;
        <ul class="list-group Nato_sanlaos list-overflow">
          {GETAPIWINNER.filter((e) => e.week_id == (showWeek == undefined ? 0 : showWeek)).map((item, index) => (
            <li class="list-group-item Nato_sanlaos list-group-item-show hover" onClick={(e) => ClickSHowaffter(item)}><strong className="Nato_sanlaos">ລາງວັນຄັ້ງທີ່: #{index+1}</strong> | {item.fullName} | {item.prize.title} | ເລກບີນ: {item.bil_number} </li>
          ))}
        </ul>
      </div>
      {/* List SHOW WINNER  */}

    </div>
    {INterNet == false ? 
      <Spinner />
      : ''
    }
    </>
  );
};

export default LuckyDraw;
