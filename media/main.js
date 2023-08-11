const vscode = acquireVsCodeApi()
const filterInput = document.getElementById('filterInput')
const listItems = document.querySelectorAll('.hoverable')

function filterData() {
  const filterValue = filterInput.value.toLowerCase().trim()

  listItems.forEach((item) => {
    const name = item.querySelector('.name').textContent.toLowerCase()
    const description = item
      .querySelector('.description')
      .textContent.toLowerCase()
    const gpio = item.querySelector('.publisher-name').textContent.toLowerCase()

    if (
      name.includes(filterValue) ||
      description.includes(filterValue) ||
      gpio.includes(filterValue)
    ) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}

filterInput.addEventListener('input', filterData)
