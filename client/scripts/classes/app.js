function App() {}

App.prototype.init = function(){
  Framework.initTemplates()
  this.currentView = Router.loadView('runner')
}

global.App = module.exports = App