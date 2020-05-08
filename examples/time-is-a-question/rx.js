const { from } = require('rxjs')
const { scan, flatMap } = require('rxjs/operators')
const moment = require('moment')

exports.renderRutabagas = async (data, date) => {
  const observable = from([...data]).pipe(
    scan((currentDate, item) => {
      const [first, second] = item
      return [
        { name: currentDate.set('hour', 5).format('do-a'), value: first },
        { name: currentDate.set('hour', 13).format('do-a'), value: second }
      ]
    }, moment(date)),
    flatMap(x => x)
  )
  return Promise((resolve) => {
    const res = []
    observable.subscribe({
      next: v => res.push(v),
      complete: () => resolve(res)
    })
  })
}
