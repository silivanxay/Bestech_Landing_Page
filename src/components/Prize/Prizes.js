import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import url from "./data";
import Spinner from "../uitilities/Spinner";
import Swal from "sweetalert2";
import Add_prize from "./Add-prize";

const Prizes = () => {

  const [showPrize, setshowPrize] = useState([]);
  const [reducer, setReducer] = useReducer(x => x + 1, 0)

  useEffect(() => {
    axios.get(url.Mainurl + url.getPrize).then((res) => {
      setshowPrize(res.data.results);
    }).catch((err) => {
      if (err.response.status === 401) {
        alert('~~ໄອດີໝົດອາຍຸແລ້ວ ກະລຸນາ Login ໃໝ່ອີກຄັ້ງ~~')
      }
    });
  }, [reducer]);

  function setActivefalse(event) {
    Swal.fire({
      title: 'ທ່ານຕ້ອງການປິດສະຖານະນີ້ ຫຼື ບໍ່?',
      text: "ເມືອປິດແລ້ວຂໍ້ມູນຈະຍັງເກັບ ແຕ່ບໍ່ສາມາດນຳມາໃຊ້ໄດ້ອີກ!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ປິດສະຖານະ!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(url.Mainurl + url.patchprice + event, {
          is_active: false
        }).then((res) => {
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
          setReducer()
          Toast.fire({
            icon: 'success',
            title: 'ປິດສະຖານະສຳເລັດ'
          })
        })
      }
    })

  }

  function refresh() {
    setReducer()
  }

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <span className="card-title float-right"><Add_prize /></span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header display-respone">
                    <h3 className="card-title w-100">ລາງວັນທັງຫມົດ ( <strong className='text-danger'>{showPrize.length}</strong> )&nbsp;
                      <span className="btn btn-sm btn-outline-primary" onClick={refresh}>refresh data</span>
                    </h3>
                    {/* <div className="card-tools w-100">
                        <div className="input-group input-group-sm pt-2">
                          <input type="text" name="table_search" className="form-control" placeholder="ຄົ້ນຫາ..."/>
                          <div className="input-group-append">
                            <button type="submit" className="btn btn-default">
                              <i className="fas fa-search" />
                            </button>
                          </div>
                        </div>
                      </div> */}
                  </div>
                  {/* /.card-header */}
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th className="col-1">ລາງວັນທີ</th>
                          <th>ລາຍລະອຽດ</th>
                          <th>ຈຳນວນ</th>
                          <th className="col-2">ສະຖານະນຳໃຊ້</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showPrize.filter((e) => e.is_active === true).map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.prize_type?.prize_type}</td>
                            <td>{item.prize} {item.detail}</td>
                            <td>{item.quantity}</td>
                            <td><span className="btn btn-sm btn-danger" onClick={() => setActivefalse(item.id)}>ປິດໃຊ້ງານ</span> </td>
                          </tr>
                        ))}
                      </tbody>

                    </table>
                    {showPrize.length === 0 ? (
                      <h1 className="text-center mt-5">ບໍ່ມີຂໍ້ມູນ</h1>
                    ) : ''}
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
  );
};

export default Prizes;
