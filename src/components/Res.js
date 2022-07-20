import axios from "axios";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Res = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const [dataRes, setDataRes] = useState([]);
  let url = "https://blgrv-api.orizon.qa/api/view-reservations/?date=" + date;
  if (time) {
    url += "&time=" + time;
  }
  const handelDelete = (id)=>{
    axios.delete(`https://blgrv-api.orizon.qa/api/delete-reservation/${id}/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
    .then((res)=>{
      setDataRes(dataRes.filter((el)=>el.id !== id))
      console.log(res);
    })
  }
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        setDataRes(res.data);
        
      })
      .catch((err) => {
        console.log(err);
        setSearchParams("/")
      })
  }, [url, setSearchParams]);
  return (
    <div className="container">
      <a className="back-btn" href="/table">
        <i class="fas fa-angle-left"></i>
        Go Back
      </a>
      {dataRes.map((res) => {
        return (
          <div
            key={res.id}
            className="res rounded border shadow-sm bg-light p-3 my-3 d-flex flex-wrap gap-4 justify-content-between align-items-center"
          >
            <div className="res_data fs-5">
              <div className="date">
                <strong>Date:</strong> {res.date}
              </div>
              <div className="time">
                <strong>Time:</strong> {res.time}
              </div>
              <div className="num">
                <strong>Number of seats:</strong> {res.seats_number}
              </div>
              <div className="door">
                <strong>Location:</strong>{" "}
                {res.is_outdoor ? "outDoor" : "inDoor"}
              </div>
              <div className="name">
                <strong>Name:</strong> {res.name}
              </div>
              <div className="phone">
                <strong>phone:</strong> {res.phone}
              </div>
            </div>
            <div className="res_btns d-flex gap-3">
              <button
                className="delete btn btn-lg btn-danger"
                onClick={() => {
                  handelDelete(res.id);
                }}
              >
                <i className="fad fa-trash-alt"></i> Delete
              </button>
              {/* <button onClick={handelDelete()}>click</button> */}
              <a className="btn btn-lg btn-secondary" href={"tel:" + res.phone}>
                <i className="fas fa-phone-alt"></i> Call
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Res;
