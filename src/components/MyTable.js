import axios from "axios";
import { ParseApiResponse } from "./data.js";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const MyTable = () => {
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
      let response = await axios.get(
        "https://blgrv-api.orizon.qa/api/view-reservations/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setData(ParseApiResponse(response.data));
    };
    fetchData();
  }, []);

  return (
    <>
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
                        className={`btn rounded-0 w-100 ${hour.count !== 0 ? "btn-success" : "btn-light"}`}
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
