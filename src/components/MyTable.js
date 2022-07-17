import axios from "axios";
import { ParseApiResponse } from "./data.js"
import { useEffect, useState } from "react"


const MyTable = (props) => {
  const hours = ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]
  let columns = [{title: "Day", dataIndex: "date", key: "date"}]
  hours.forEach(hour => {columns.push({title: hour, dataIndex: "count", key: "hour"})})

  const [data, setData] = useState([])

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("https://blgrv-api.orizon.qa/api/view-reservations/", {
        headers: {
        'Authorization': `Bearer ${props.token}`
        }

      })        
      setData(ParseApiResponse(response.data))
    }
    fetchData()
  }, [])


  return (
    <table>
      <tr>
        <th>Day</th>
        {hours.map((hour, index) => <th key={index}>{hour}</th>)}
      </tr>
      {data.map((day, index) => {
        return (
          <tr key={index}>
            <td>{day.date}</td>
            {day.hours.map(hour => <td>{ hour.count }</td>)}
          </tr>
        )
    })}
    </table>

  )
}

export default MyTable