const EMOJI_FACES = [
  ['blush', 'Bashfully'],
  ['expressionless', 'Expressionlessly'],
  ['kissing_heart', 'Lovingly'],
  ['neutral_face', 'Neutrally'],
  ['smile', 'Happily'],
  ['smiley', 'Smiley'],
  ['sunglasses', 'Cooly'],
  ['unamused', 'Unamusingly'],
  ['wink', 'Wink'],
]

// Left is default
const EMOJI_ACTIONS = [
  ['+1', 'Thumbs up', 'right'],
  ['-1', 'Thumbs down', 'right'],
  ['broken_heart', 'Heartbreak'],
  ['chart_with_upwards_trend', 'Do business'],
  ['clap', 'Clapping'],
  ['facepunch', 'Right on'],
  ['fist', 'Raise fist'],
  ['hand', 'Raised hand'],
  ['hankey', 'Poop'],
  ['hearts', 'Love'],
  ['muscle', 'Flex'],
  ['ok_hand', 'OK'],
  ['point_right', 'Pointing', 'right'],
  ['v', 'Peace'],
  ['wave', 'Waving'],
]


const getRandom = (dataset) => {
  return dataset[Math.floor(Math.random() * dataset.length)]
}

const getEmoji = (data, name) => {
  return data.find(o => o.short_name === name)
}

const remapDataToProps = (data) => {
  const get = (name => getEmoji(data, name))
  const remap = (o) => {
    const name = o[0]
    const description = o[1]
    const emoji = get(name)
    emoji.description = description
    emoji.alignment = o[2] ? 'right' : 'left'

    return emoji
  }

  return {
    faces: EMOJI_FACES.map(remap),
    actions: EMOJI_ACTIONS.map(remap)
  }
}



const el = {
  big: document.getElementById('biggy'),
  small: document.getElementById('smalls'),
  title: document.getElementById('title'),
}

const imagePath = (image) => `img/apple/64/${image}`



const render = () => {
  if (!EMOJIDATA || !EMOJIDATA.length) return

  const list = remapDataToProps(EMOJIDATA)
  const face = getRandom(list.faces)
  const action = getRandom(list.actions)

  el.big.innerHTML = `<img src="${imagePath(face.image)}">`
  el.big.classList.add(face.short_name)

  el.small.innerHTML = `<img src="${imagePath(action.image)}">`
  el.small.classList.add(`is-${action.alignment}`)
  el.small.classList.add(action.short_name)

  el.title.innerHTML = `${action.description} ${face.description}`
}


// INITIALIZE
render()
