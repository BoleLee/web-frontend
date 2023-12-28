export const books = new Array(100).fill(0).map((item, index) => {
  return {
    id: index + 1,
    name: `书名${index + 1}`,
    desc: `简介${index + 1}`,
    author: `作者${index + 1}`,
    publish: `2023-12-28 ${index + 1}`
  }
})
