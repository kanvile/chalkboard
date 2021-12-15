import { getCourseByName } from './fetchers.js'
import { onClick } from './common.js'

onClick(document.querySelector('.btn'), async () => {
  const name = document['search-course'].search.value

  const res = await getCourseByName(name)

  if (res) {
    document.querySelector('#table-body').innerHTML = `
    <tr scope="row">
      <td>${res.name}</td>
      <td>${res.identifier}</td>
      <td>${res.description}</td>
      <td>${res.capacity}</td>
      <td>${res.available}</td>
    </tr>`
  }
})
