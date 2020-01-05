import { data } from './data'

export const getItems = () => {
  return Object.keys(data).map(item => ({ id: item, ...data[item] }))
}

export const parseLikes = likesDb => {
  const likes = {}
  likesDb.forEach(item => {
    likes[item._id] = item.likes
  })
  return likes
}
