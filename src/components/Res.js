import axios from 'axios';
import React from 'react'
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';



const Res = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date")
  const time = searchParams.get("time")
  const [dataRes, setDataRes] = useState([])
  const [location, setLocation] = useState()
  let url = 'https://blgrv-api.orizon.qa/api/view-reservations/?date=' + date
  if (time){
    url += "&time=" + time
  }
  useEffect(() => {
    axios.get(url, {
      headers:{
        "Authorization": "Bearer " + props.token
      }
    }).then((res)=>{
      setDataRes(res.data)
      setLocation(res.data.is_outdoor)
    })
  }, [url, props.token]);
  return (
    <div className='container'>
    {dataRes.map(((res) => {
      return (
        <div key={res.id} className="res rounded border shadow-sm bg-light p-3 my-3 d-flex flex-wrap gap-4 justify-content-between align-items-center">
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
          <strong>Location:</strong> {res.is_outdoor ? "outDoor" : "inDoor"}
        </div>
        <div className="name">
          <strong>Name:</strong> {res.name}
        </div>
        <div className="phone">
          <strong>phone:</strong> {res.phone}
        </div>
      </div>
      <div className="res_btns d-flex gap-3">
        <div className="btn btn-lg btn-danger">
          <i className="fad fa-trash-alt"></i> Delete
        </div>
        <div className="btn btn-lg btn-secondary">
        <a href={"tel:" + res.phone}>
        <i className="fas fa-phone-alt"></i> Call
        </a>
        </div>
      </div>
    </div>
      )
    }))}
    </div>
  )
}

export default Res