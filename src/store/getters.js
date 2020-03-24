const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  allData: state => state.user.allData,
  max: state => 0,
  total: state => 0,
  moreArr: state => '',
  arr: state => [{name: '01', tivk: false}, {name: '02', tivk: false}, {name: '03', tivk: false}, {name: '04', tivk: false}, {name: '05', tivk: false}, {name: '06', tivk: false}, {name: '07', tivk: false}, {name: '08', tivk: false}, {name: '09', tivk: false}, {name: '10', tivk: false}, {name: '01', tivk: false}, {name: '11', tivk: false}]
}
export default getters
