module.exports = {
  title: '学习笔记',
  description: '描述详情',
  displayAllHeaders: true,
  themeConfig: {
    sidebar: [
      '/',
      '/jsmodule',
      {
        title: 'es6',
        path: '/es6/',
        collapsable: true,
        sidebarDepth: 2,
        children: [
          '/es6/',
          '/es6/question.md',
          '/es6/es-shizhan.md',
        ]
      },
      {
        title: 'react',
        path: '/react/',
        sidebarDepth: 2,
        children: [
          '/react/',
          '/react/react-base'
        ]
      },
      {
        title: 'algorithm',
        path: '/algorithm/',
        children: [
          '/algorithm/README'
        ]
      }
    ]
  }
}