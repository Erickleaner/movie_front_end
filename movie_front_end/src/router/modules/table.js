import Layout from '@/layout'

export const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/user-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'user-table',
      component: () => import('@/views/table/userTable'),
      name: 'UserTable',
      meta: { title: 'User Table' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/movieTable'),
      name: 'MovieTable',
      meta: { title: 'Movie Table' }
    }
  ]
}
