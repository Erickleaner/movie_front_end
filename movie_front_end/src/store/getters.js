const getters = {
  role: state => state.user.role,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,

  //
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,

  //permission_routes
  permission_routes: state => state.permission.routes,
}

export default getters;
