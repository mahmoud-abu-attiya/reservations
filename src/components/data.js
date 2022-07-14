let api_data = [
  {
    "id": 1,
    "date": "08/07/2022",
    "time": "06:00 PM",
    "name": "Mahmoud",
    "phone": "+201020384108",
    "is_outdoor": true,
    "seats_number": 7,
    "created_at": "2022-07-09T17:03:43.522806+03:00"
  },
  {
    "id": 1,
    "date": "08/07/2022",
    "time": "05:00 PM",
    "name": "Mahmoud",
    "phone": "+201020384108",
    "is_outdoor": true,
    "seats_number": 7,
    "created_at": "2022-07-09T17:03:43.522806+03:00"
  },
  {
    "id": 2,
    "date": "08/10/2022",
    "time": "06:00 PM",
    "name": "Ahmed",
    "phone": "+201020384108",
    "is_outdoor": true,
    "seats_number": 7,
    "created_at": "2022-07-09T17:25:54.333763+03:00"
  },
  {
    "id": 3,
    "date": "10/10/2022",
    "time": "05:00 PM",
    "name": "أنا",
    "phone": "أنا",
    "is_outdoor": true,
    "seats_number": 5,
    "created_at": "2022-07-10T23:44:21.051567+03:00"
  },
  {
    "id": 4,
    "date": "11/12/2022",
    "time": "01:00 PM",
    "name": "ahmed",
    "phone": "234",
    "is_outdoor": false,
    "seats_number": 5,
    "created_at": "2022-07-12T02:19:44.447697+03:00"
  },
  {
    "id": 5,
    "date": "11/12/2022",
    "time": "01:00 PM",
    "name": "ahmed",
    "phone": "234",
    "is_outdoor": false,
    "seats_number": 5,
    "created_at": "2022-07-12T02:19:51.385459+03:00"
  },
  {
    "id": 6,
    "date": "11/12/2022",
    "time": "01:00 PM",
    "name": "ahmed",
    "phone": "234",
    "is_outdoor": false,
    "seats_number": 5,
    "created_at": "2022-07-12T02:19:55.661317+03:00"
  },
  {
    "id": 7,
    "date": "11/12/2022",
    "time": "02:00 PM",
    "name": "ahmed",
    "phone": "234",
    "is_outdoor": false,
    "seats_number": 5,
    "created_at": "2022-07-12T02:20:03.709025+03:00"
  },
  {
    "id": 8,
    "date": "11/12/2022",
    "time": "02:00 PM",
    "name": "ahmed",
    "phone": "234",
    "is_outdoor": false,
    "seats_number": 5,
    "created_at": "2022-07-12T02:20:11.718240+03:00"
  },
  {
    "id": 9,
    "date": "12/12/2022",
    "time": "02:00 PM",
    "name": "ahmed",
    "phone": "234",
    "is_outdoor": false,
    "seats_number": 5,
    "created_at": "2022-07-12T02:20:23.145692+03:00"
  }
]


const convert = (data) => {
  // data is an array of objects with each object has attributes: id, date, time, name, phone, is_outdoor, seats_number, created_at
  let table = {}
  data.forEach(re => {
    if (re.date in table){
      if (re.time in table[re.date]){
        table[re.date][re.time].push(re)
      }else{
        table[re.date][re.time] = [re]
      }
    }else{
      let dateObject = {}
      dateObject[re.time] = [re]
      table[re.date] = dateObject
    }
  });
  return table
  // return an object with keys as dates and values as arrays with objects with keys as hours and values objects with attributes: id, date, time, name, phone, is_outdoor, seats_number, created_at
  // example of return value:
  // {
  //   "2020-07-09": {
  //     "06:00 PM": [
  //       {
  //         "id": 1,
  //         "date": "2020-07-09",
  //         "time": "06:00 PM",
  //         "name": "Mahmoud",
  //         "phone": "+2011111111",
  //         "is_outdoor": true,
  //         "seats_number": 7,
  //         "created_at": "2020-07-09T17:03:43.522806+03:00"
  //       }
  //     ],
  //     "05:00 PM": [
  //       {
  //         "id": 1,
  //         "date": "2020-07-09",
  //         "time": "05:00 PM",
  //         "name": "Mahmoud",
  //         "phone": "+20111111111",
  //         "is_outdoor": true,
  //         "seats_number": 7,
  //         "created_at": "2020-07-09T17:03:43.522806+03:00"
  //       }
  //     ]
  //   },
  //   "2020-07-10": {
  //     "06:00 PM": [
  //       {
  //         "id": 2,
  //         "date": "2020-07-10",
  //         "time": "06:00 PM",
  //         "name": "Ahmed",
  //         "phone": "+2011111111",
  //         "is_outdoor": true,
  //         "seats_number": 7,
  //         "created_at": "2020-07-09T17:25:54.333763+03:00"
  //       }
  //     ]
  //   }
  // }
}

const fill = (table) => {
  // expectina and object like this
  // object = {
  //   "22/07/2022": {
  //     '06:00 PM': []
  //   }
  // }
  let dates = Object.keys(table)
  dates = dates.map(date => {
    const [day, month, year] = date.split('/')
    return new Date(year, +month-1, day)
  })
  let start = new Date(Math.min(...dates))
  let end = new Date(Math.max(...dates))
  let current = start
  let days = []
  let hours = ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]
  // the target array 
  // days = [
  //   {date: "22/07/22", hours: [{hour: "03:00 PM", reservations: [{name: "ahmed", phone: "234", is_outdoor: false, seats_number: 5}]}]},
  // ]
  while (current <= end){
    let dateString = current.toLocaleDateString("en-IE", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    // day is an object with keys as hours and values are arrays of reservations objects
    let day = {
      date: dateString,
      hours: []
    } 
    if (dateString in table){
      console.log("we have reservations for this date", dateString)
      hours.forEach(hour => {
        if (hour in table[dateString]){
          day.hours.push({
            hour: hour,
            reservations: table[dateString][hour],
            count: table[dateString][hour].length
          })
        }else{
          day.hours.push({
            hour: hour,
            reservations: [],
            count: 0
          })
        }
      })
    }else{
      hours.forEach(hour => {
        day.hours.push({
          hour: hour,
          reservations: [],
          count: 0
        })
      })
    }
    days.push(day)

    current.setDate(current.getDate() + 1)
  }
  return days
}

const ParseApiResponse = (data) => {
  return fill(convert(data))
}

export {ParseApiResponse, api_data}
