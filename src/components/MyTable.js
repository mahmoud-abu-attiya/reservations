import Table from 'rc-table';
const date = new Date().toDateString();
const data = [
  { name: date, one: 0, two: 70, key: 1, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 45, ten: 22, eleven: 96 },
  { name: date, one: 28, two: 70, key: 2, three: 40, four: 8, five: 0, six: 42, seven: 654, eight: 1212, nien: 45, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 70, key: 3, three: 0, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 45, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 70, key: 4, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 45, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 0, key: 5, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 0, nien: 45, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 70, key: 6, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 45, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 70, key: 7, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 0, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 70, key: 8, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 0, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 70, key: 9, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 0, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 70, key: 10, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 0, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 70, key: 11, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 0, ten: 22, eleven: 96 },
  { name: date, one: 36, two: 70, key: 12, three: 40, four: 8, five: 41, six: 42, seven: 654, eight: 1212, nien: 0, ten: 22, eleven: 96 },
];
const el = (value) => {
  let className = "btn w-100 rounded rounded-0"
  if (value < 1){
    className += " "
  }else{
    className += " btn-success"  
  }
  return  <a href="/" className={className}>{value}</a>
}
const columns = [
  {
    title: "Day",
    dataIndex: "name",
    key: "name",  
  },
  {
    title: "01:00",
    dataIndex: "one",
    key: "one",
    render: el,
  },
  {
    title: "02:00",
    dataIndex: "two",
    key: "two",
    render: el,
  },
  {
    title: "03:00",
    dataIndex: "three",
    key: "three",
    render: el,
  },
  {
    title: "04:00",
    dataIndex: "four",
    key: "four",
    render: el,
  },
  {
    title: "05:00",
    dataIndex: "five",
    key: "five",
    render: el,
  },
  {
    title: "06:00",
    dataIndex: "six",
    key: "six",
    render: el,
  },
  {
    title: "07:00",
    dataIndex: "seven",
    key: "seven",
    render: el,
  },
  {
    title: "08:00",
    dataIndex: "eight",
    key: "eight",
    render: el,
  },
  {
    title: "09:00",
    dataIndex: "nien",
    key: "nien",
    render: el,
  },
  {
    title: "10:00",
    dataIndex: "ten",
    key: "ten",
    render: el,
  },
  {
    title: "11:00",
    dataIndex: "eleven",
    key: "eleven",
    render: el,
  },
];


const myTable = () => {
  return (
    <Table columns={columns} data={data} />
  )
}

export default myTable