import axios from "axios";
import { ParseApiResponse } from "./data.js"
import { useEffect, useState } from "react"


const MyTable = () => {
  const hours = ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]
  let columns = [{title: "Day", dataIndex: "date", key: "date"}]
  hours.forEach(hour => {columns.push({title: hour, dataIndex: "count", key: "hour"})})

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://127.0.0.1:8000/api/view-reservations/", {
        headers: {
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3ODMwNzkyLCJpYXQiOjE2NTc4MzA0OTIsImp0aSI6IjA3MmU5ODY5NjQ2MDQ3OTY4YzQ3NTE2ZGU0OWE3NTVhIiwidXNlcl9pZCI6MX0.lu-d2Lw3ZTrYvpGWpq3_k6wV7Mu80R3G-pvPii7aOaY`
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