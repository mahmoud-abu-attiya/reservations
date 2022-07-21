import axios from "axios";
import { ParseApiResponse } from "./data.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyTable = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 7
    )
  );
  const hours = [
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];
  let columns = [{ title: "Day", dataIndex: "date", key: "date" }];
  hours.forEach((hour) => {
    columns.push({ title: hour, dataIndex: "count", key: "hour" });
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios
        .get(
          `https://belgravia.qa/api/view-reservations/?
        date_gt=${startDate.toLocaleDateString("en-IE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
        &date_lt=${endDate.toLocaleDateString("en-IE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
        .catch((err) => {
          console.log(err);
          Cookies.remove("token");
          props.cookies(false);
        });
      setData(ParseApiResponse(response.data));
    };
    fetchData();
  }, [startDate, endDate, props]);

  return (
    <>
      <div className="filter d-flex justify-content-evenly">
        <div className="date">
          <h4>Start date</h4>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            id="date"
            />
        </div>
        <div className="date">
            <h4>End date</h4>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            id="date"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="bg-secondary">Day</th>
            {hours.map((hour, index) => (
              <th className="bg-secondary" key={index}>
                {hour}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((day, index) => {
            return (
              <tr key={index}>
                <td>
                  <a
                    className="btn btn-primary rounded-0 w-100"
                    href={`/reservations?date=${encodeURIComponent(day.date)}`}
                  >
                    {day.date}
                  </a>
                </td>
                {day.hours.map((hour, index) => {
                  return (
                    <td key={index}>
                      <a
                        className={`btn rounded-0 w-100 ${
                          hour.count !== 0 ? "btn-success" : "btn-light"
                        }`}
                        href={
                          hour.count === 0
                            ? "javascript:alert('There is no resrvations here !')"
                            : `/reservations?date=${encodeURIComponent(
                                day.date
                              )}&time=${encodeURIComponent(hour.hour)}`
                        }
                      >
                        {hour.count}
                      </a>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MyTable;
