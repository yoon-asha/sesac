const inputText = document.querySelector('.input-text')
const addButton = document.querySelector('.add-button')
const list = document.querySelector('.list')
const likeButtons = document.querySelectorAll('.like')

const addItem = () => {
  if (inputText.value.trim() === '') return
  const like = document.createElement('span')
  like.classList.add('like')

  const likeIcon = document.createElement('span')
  likeIcon.classList.add('material-icons')
  likeIcon.innerText = 'favorite_border'
  like.appendChild(likeIcon)

  const item = document.createElement('span')
  item.innerText = inputText.value
  item.classList.add('item')

  const manage = document.createElement('span')
  manage.classList.add('manage')

  const checkIcon = document.createElement('span')
  checkIcon.classList.add('material-icons', 'check')
  checkIcon.innerText = 'check'
  manage.appendChild(checkIcon)

  const clearIcon = document.createElement('span')
  clearIcon.classList.add('material-icons', 'clear')
  clearIcon.innerText = 'clear'
  manage.appendChild(clearIcon)

  // like event
  like.addEventListener('click', (e) => {
    const target = e.target
    const text =
      target.innerText === 'favorite' ? 'favorite_border' : 'favorite'

    target.innerText = text
  })
  // check event
  checkIcon.addEventListener('click', (e) => {
    const target = e.target.parentNode.parentNode
    target.classList.add('done')
  })
  // clear event
  clearIcon.addEventListener('click', (e) => {
    const target = e.target.parentNode.parentNode
    list.removeChild(target)
  })

  const li = document.createElement('li')
  li.appendChild(like)
  li.appendChild(item)
  li.appendChild(manage)
  list.appendChild(li)

  inputText.value = ''
  inputText.focus()
}

inputText.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) addItem()
})

addButton.addEventListener('click', addItem)
