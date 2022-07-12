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
}

const fill = (table) => {
  let today = new Date()
  let days = []
  let hours = ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]
  while (Object.keys(table).length > 0){
    let dateString = today.toLocaleDateString()
    if (dateString in table){
      hours.forEach(hour => {
        if (hour in table[dateString]){

        }else{

        }
      })

    }else{
      days.push({dateString: hours.map((hour) => {
        let hourObject = {}
        hourObject[hour] = []
        return hourObject
      })})
    }
    
    today.setDate(today.getDate() + 1)
  }

  return days
}

// let obj = convert(api_data)
// console.log(Object.keys(obj).length);
// console.log(obj)

// delete obj['08/07/2022']
// console.log(Object.keys(obj).length);
// console.log(obj)


