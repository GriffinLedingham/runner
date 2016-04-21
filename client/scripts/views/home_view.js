function HomeView() {}

HomeView.dom_id    = '#home'

HomeView.prototype.render = function(){
  $('#interface').html(Framework.loadTemplate('homeTemplate'))
  this.setupBindings()
}

HomeView.prototype.destroy = function(){
  this.destroyBindings()
  $(HomeView.dom_id).remove()
}

HomeView.prototype.setupBindings = function(){

}

global.HomeView = module.exports = HomeView