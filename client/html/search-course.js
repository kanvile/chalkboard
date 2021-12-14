import { getCourseByName } from './fetchers.js'
import { onClick } from './common.js'

onClick(document.querySelector('.btn'), async () => {
  const name = document['search-course'].search.value
  const res = await getCourseByName(name)

  if (res) {
    addRow(res)
  }
})

function addRow(obj) {
  const row = `<tr scope="row" class="test-row-${obj.id}">
               <td>${obj.name}</td>
               <td>${obj.identifier}</td>
               <td>${obj.description}</td>
               <td>${obj.capacity}</td>
               <td>${obj.available}</td>
              </tr>`

  document.querySelector('#table-body').innerHTML = row
}
