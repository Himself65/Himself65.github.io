import moment from 'moment'

type Rutabaga = {
  name: string
  value: number
}

function rutaBagaRender (data: [number, number][], date: string): Rutabaga[] {
  const currentDate = moment(date)
  const res = []
  for (let index = 0; index < data.length; index++) {
    const [first, second] = data[index]
    currentDate.add(1, 'day')
    res.push(
      { name: currentDate.set('hour', 5).format('do-a'), value: first }
    )
    res.push(
      { name: currentDate.set('hour', 13).format('do-a'), value: second }
    )
  }
  return res;
}
