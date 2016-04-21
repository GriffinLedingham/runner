function RunnerView() {}

RunnerView.dom_id    = '#running_view_wrapper'
RunnerView.recordedPoints = []
RunnerView.recording = false
RunnerView.lastPosition = null
RunnerView.lastPointTs = null
RunnerView.startRunTs = null
RunnerView.runDistance = null

RunnerView.prototype.render = function(){
  if(Framework.isMobile()){
    this.setupMobileBindings()
  }else{
    this.setupBindings()
  }

  this.startWatchGPS({ enableHighAccuracy: true })

  $('#app').html(Framework.loadTemplate('runningViewTemplate'))
  $('#app').append(Framework.loadTemplate('runningViewButtonsTemplate'))

  this.getLocation((position) => {
    this.map = GMaps({
      div: '#map',
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      disableDefaultUI: true
    })
    this.map.hideContextMenu()
    this.playerMarker = this.addMarker(position.coords.latitude, position.coords.longitude)
    this.playerMarker.markerId = 'player'
  })
}

RunnerView.prototype.destroy = function(){
  this.destroyBindings()
  $(RunnerView.dom_id).remove()
}

RunnerView.prototype.addMarker = function(lat, long) {
  return this.map.addMarker({
    lat: lat,
    lng: long,
  })
}

RunnerView.prototype.removePlayerMarker = function() {
  _.each(this.map.markers, (marker) => {
    if(marker.markerId == this.playerMarker.markerId){
      marker.setMap(null)
    }
  })
}

RunnerView.prototype.getLocation = function(cb){
  GMaps.geolocate({
    success: (position) => {
      cb(position)
    },
    options: {
      enableHighAccuracy: true,
      maximumAge: Infinity
    }
  })
}

RunnerView.prototype.startRecording = function() {
  this.clearRunData()
  this.recording = true
  this.startSetButtons()
}

RunnerView.prototype.stopRecording = function() {
  this.dumpRunData()
  this.recording = false
  this.stopSetButtons()
}

RunnerView.prototype.startSetButtons = function() {
  $('#start_button').addClass('hide').removeClass('inline-block')
  $('#stop_button').removeClass('hide').addClass('inline-block')
}

RunnerView.prototype.stopSetButtons = function() {
  $('#stop_button').addClass('hide').removeClass('inline-block')
  $('#start_button').removeClass('hide').addClass('inline-block')
}

RunnerView.prototype.canRecordPoint = function(position) {
  var result = true
  if(!this.recording) result = false
  if(typeof this.lastPosition != 'undefined' && this.lastPosition != null
    && typeof this.lastPointTs != 'undefined' && this.lastPointTs != null
    && (
        (
          this.getDistance([position.coords.latitude, position.coords.longitude], this.lastPosition) < GameConfig.minPointDistance
          && new Date().getTime() - this.lastPointTs < GameConfig.gpsPointWaitMax
        )
        || new Date().getTime() - this.lastPointTs < GameConfig.gpsPointWait
       )
  ) result = false
  return result
}

RunnerView.prototype.recordPoint = function(position) {
  if(!this.canRecordPoint(position)) return
  if(typeof this.recordedPoints == 'undefined') this.recordedPoints = []
  if(this.lastPosition != null) this.runDistance += this.getDistance([position.coords.latitude, position.coords.longitude], this.lastPosition)
  if(this.startRunTs == null || typeof this.startRunTs == 'undefined') this.startRunTs = position.time
  this.lastPointTs = new Date().getTime()
  var lastPosition = [0,0,0]
  if(this.lastPosition != null) lastPosition = this.lastPosition
  this.lastPosition = [position.coords.latitude, position.coords.longitude, position.time]
  this.recordedPoints.push({lat: position.coords.latitude,long: position.coords.longitude,time: new Date().getTime()})
  this.playerMarker.setPosition( new google.maps.LatLng(position.coords.latitude, position.coords.longitude) )
  this.map.panTo( new google.maps.LatLng(position.coords.latitude, position.coords.longitude) )
  this.drawPath()
  this.reportData(position, lastPosition)
}

RunnerView.prototype.getRecordedPoints = function() {
  return this.recordedPoints
}

RunnerView.prototype.clearRecordedPoints = function() {
  this.recordedPoints = []
}

RunnerView.prototype.clearRunData = function() {
  this.clearRecordedPoints()
  $('#results_text_area').remove()
  this.runDistance = 0
  this.lastPosition = null
  this.lastPointTs = null
}

RunnerView.prototype.buildPath = function() {
  var path = []

  _.each(this.recordedPoints, (point) => {
    path.push([point.lat, point.long])
  })

  return path
}

RunnerView.prototype.drawPath = function() {
  var path = this.buildPath()
  this.map.removePolylines()
  this.currentPath = this.map.drawPolyline({
    path: path,
    strokeColor: '#131540',
    strokeOpacity: 0.6,
    strokeWeight: 6
  })
}

RunnerView.prototype.startWatchGPS = function(options) {
  this.watcherId = navigator.geolocation.watchPosition(
    (position) => {
      if(this.lastPointTs == null || new Date().getTime() - this.lastPointTs > GameConfig.gpsPointWait) {
        this.recordPoint(position)
      }
    },
    (err) => {

    },
    options
  )
}

RunnerView.prototype.stopWatchGPS = function(id) {
  navigator.geolocation.clearWatch(id)
}

RunnerView.prototype.getDistance = function(pos1, pos2) {
  return calculateDistance(pos1[0], pos1[1], pos2[0], pos2[1])
}

RunnerView.prototype.startCheckPositionGPS = function() {
  this.locUpdateTimer = setInterval(() => {
    if(typeof this.map == 'undefined') return
    this.getLocation((position) => {
      this.recordPoint(position)
    })
  },GameConfig.gpsPointWait)
}

RunnerView.prototype.dumpRunData = function() {
  $('#app').append(Framework.loadTemplate('runResultsTemplate'))
  $('#results_text_area').val(JSON.stringify(this.recordedPoints))
}

RunnerView.prototype.reportData = function(position, lastPosition){
  console.log('Distance: ' + this.runDistance + 'km')
  console.log('Average Pace: ' + ((position.time - this.startRunTs)/(1000 * 60))/this.runDistance + 'min/km')
  console.log('Current Pace: ' + ((position.time - lastPosition[2])/(1000 * 60))/this.getDistance([position.coords.latitude, position.coords.longitude], lastPosition) + 'min/km')
}

RunnerView.prototype.setupBindings = function() {
  this.setupBinding({
    parent:   $(document),
    key:      'click',
    element:  '#start_button',
    callback: (e) => {
      this.startRecording()
      this.setFakeData()
    }
  })

  this.setupBinding({
    parent:   $(document),
    key:      'click',
    element:  '#stop_button',
    callback: (e) => {
      this.stopRecording()
      this.tearDownFakeData()
    }
  })
}

RunnerView.prototype.setupMobileBindings = function() {
  this.setupBinding({
    parent:   $(document),
    key:      'touchend',
    element:  '#start_button',
    callback: (e) => {
      this.startRecording()
      // this.setFakeData()
    }
  })

  this.setupBinding({
    parent:   $(document),
    key:      'touchend',
    element:  '#stop_button',
    callback: (e) => {
      this.stopRecording()
      // this.tearDownFakeData()
    }
  })
}

RunnerView.prototype.setFakeData = function() {
  var data = [{"lat":49.26599975214271,"long":-123.1573370845273,"time":1461267473153},{"lat":49.26602682568996,"long":-123.1573970151349,"time":1461267475078},{"lat":49.26597577989964,"long":-123.1574178022548,"time":1461267477077},{"lat":49.26592984707026,"long":-123.1575284433767,"time":1461267481169},{"lat":49.26591643602519,"long":-123.1575576123997,"time":1461267484160},{"lat":49.26586392340182,"long":-123.1575411000505,"time":1461267491120},{"lat":49.26581769720583,"long":-123.1575243362441,"time":1461267494098},{"lat":49.26577230920015,"long":-123.1575274375483,"time":1461267497115},{"lat":49.26571568944423,"long":-123.1575387531176,"time":1461267502102},{"lat":49.26566305109231,"long":-123.1575401780411,"time":1461267507104},{"lat":49.26561724399148,"long":-123.1575431117072,"time":1461267511109},{"lat":49.26556481518714,"long":-123.1575467159256,"time":1461267515054},{"lat":49.26551355984925,"long":-123.1575447042688,"time":1461267520106},{"lat":49.2654648190823,"long":-123.1575234980538,"time":1461267526099},{"lat":49.26541666504858,"long":-123.1575280242815,"time":1461267530112},{"lat":49.26535933283089,"long":-123.1575280242815,"time":1461267534108},{"lat":49.26529948604225,"long":-123.1575302873954,"time":1461267538119},{"lat":49.2652541818556,"long":-123.1575411000505,"time":1461267541114},{"lat":49.26520221405594,"long":-123.1575527508959,"time":1461267545113},{"lat":49.2651489889708,"long":-123.1575567742094,"time":1461267550112},{"lat":49.26508641806362,"long":-123.1575692632451,"time":1461267554118},{"lat":49.26503281579284,"long":-123.1575918105647,"time":1461267557114},{"lat":49.26497280136613,"long":-123.1576040481433,"time":1461267561115},{"lat":49.264918277086,"long":-123.1576197223022,"time":1461267564115},{"lat":49.26486706365763,"long":-123.157640341784,"time":1461267566089},{"lat":49.26482096319018,"long":-123.1576327980712,"time":1461267571103},{"lat":49.26476262514411,"long":-123.1576094125613,"time":1461267575124},{"lat":49.26471065734444,"long":-123.1576050539717,"time":1461267578115},{"lat":49.26466225185363,"long":-123.1576075685426,"time":1461267582103},{"lat":49.26461250525831,"long":-123.1576269307389,"time":1461267586116},{"lat":49.26455542449771,"long":-123.157621733959,"time":1461267590113},{"lat":49.26450052303193,"long":-123.1576194708451,"time":1461267595117},{"lat":49.26445094407467,"long":-123.1576094125613,"time":1461267599103},{"lat":49.26440735817818,"long":-123.157571610178,"time":1461267604102},{"lat":49.26435044505565,"long":-123.1575801597192,"time":1461267608124},{"lat":49.26429462158053,"long":-123.157592732574,"time":1461267613114},{"lat":49.26424307287602,"long":-123.1576066465333,"time":1461267617117},{"lat":49.26419248809038,"long":-123.1576193870261,"time":1461267622115},{"lat":49.26413343758254,"long":-123.1576399226889,"time":1461267625101},{"lat":49.26407488998888,"long":-123.1576472987636,"time":1461267628098},{"lat":49.26402174872278,"long":-123.1576342229947,"time":1461267631107},{"lat":49.26396542233346,"long":-123.1576156151697,"time":1461267634121},{"lat":49.26391416699557,"long":-123.157600527744,"time":1461267637114},{"lat":49.26385700241594,"long":-123.1575978455349,"time":1461267641118},{"lat":49.2638035258737,"long":-123.157595498602,"time":1461267645091},{"lat":49.2637728481081,"long":-123.1576684211596,"time":1461267653105},{"lat":49.26377125554649,"long":-123.1577506476298,"time":1461267657102},{"lat":49.2637802660924,"long":-123.157825330387,"time":1461267661118},{"lat":49.26374573265134,"long":-123.1578956545546,"time":1461267666087},{"lat":49.26375327636419,"long":-123.1578270067676,"time":1461267712085},{"lat":49.26375214480726,"long":-123.1577551738575,"time":1461267779104},{"lat":49.26378345121561,"long":-123.1578221452638,"time":1461267790107},{"lat":49.26373014231144,"long":-123.1577813253954,"time":1461267827116},{"lat":49.26369871017454,"long":-123.1577276812151,"time":1461267836087},{"lat":49.26370399077354,"long":-123.1578012743249,"time":1461267872110},{"lat":49.26370562524466,"long":-123.1578878593847,"time":1461267892116},{"lat":49.26371098966269,"long":-123.1579701696738,"time":1461267898096},{"lat":49.26375155807404,"long":-123.1579186209693,"time":1461267922110},{"lat":49.26378102046369,"long":-123.1578852609947,"time":1461267925117},{"lat":49.26381458998589,"long":-123.1578360592231,"time":1461267929113},{"lat":49.26387079064666,"long":-123.1578428485646,"time":1461267957089},{"lat":49.26392028578488,"long":-123.1578377356037,"time":1461267961126},{"lat":49.26397707317887,"long":-123.1578165293887,"time":1461267965115},{"lat":49.26402262882261,"long":-123.1577907131269,"time":1461267969109},{"lat":49.2640738841605,"long":-123.1577782240912,"time":1461267973120},{"lat":49.26413130019723,"long":-123.1577840076044,"time":1461267978115},{"lat":49.26417953804998,"long":-123.1577771344438,"time":1461267981117},{"lat":49.26423586443929,"long":-123.157777637358,"time":1461267984104},{"lat":49.26428104289739,"long":-123.1577823312237,"time":1461267987113},{"lat":49.26433539953945,"long":-123.1577895396605,"time":1461267992115},{"lat":49.26438015890239,"long":-123.1577814930334,"time":1461267996115},{"lat":49.26443430599688,"long":-123.1577772182628,"time":1461267999125},{"lat":49.26447994545965,"long":-123.1577891205653,"time":1461268002115},{"lat":49.26452893768369,"long":-123.1577922218695,"time":1461268006114},{"lat":49.26457394850372,"long":-123.1577889529272,"time":1461268009113},{"lat":49.26462708976982,"long":-123.157806722562,"time":1461268012119},{"lat":49.26467964430271,"long":-123.1578137633606,"time":1461268015116},{"lat":49.26474108365296,"long":-123.1578192954167,"time":1461268018119},{"lat":49.26479615275679,"long":-123.1578164455697,"time":1461268021115},{"lat":49.2648453126189,"long":-123.1578024477914,"time":1461268024115},{"lat":49.26489954353242,"long":-123.1577859354421,"time":1461268028119},{"lat":49.26495390017448,"long":-123.1577737816825,"time":1461268032116},{"lat":49.26501512997715,"long":-123.1577673276171,"time":1461268036118},{"lat":49.26505988934009,"long":-123.1577503123536,"time":1461268039121},{"lat":49.26511684437214,"long":-123.1577604544565,"time":1461268043097},{"lat":49.26517191347597,"long":-123.1577363145753,"time":1461268046100},{"lat":49.26522350409,"long":-123.1577261724725,"time":1461268049120},{"lat":49.26527232867597,"long":-123.1577198860451,"time":1461268052104},{"lat":49.26532982853173,"long":-123.1577307825192,"time":1461268056120},{"lat":49.26537848547964,"long":-123.1577352249279,"time":1461268059115},{"lat":49.26542521458982,"long":-123.157727429758,"time":1461268062119},{"lat":49.26547328480451,"long":-123.1577203889593,"time":1461268065120},{"lat":49.26552148074774,"long":-123.1577239093586,"time":1461268068118},{"lat":49.26556879659115,"long":-123.1577100792184,"time":1461268071095},{"lat":49.26561850127695,"long":-123.1577032898768,"time":1461268074121},{"lat":49.26566820596276,"long":-123.1577009429439,"time":1461268077102},{"lat":49.26571434833972,"long":-123.1576883700892,"time":1461268081117},{"lat":49.26573366862653,"long":-123.1576064788952,"time":1461268086107},{"lat":49.26575386901317,"long":-123.1575331372425,"time":1461268090118},{"lat":49.26580286123721,"long":-123.1575210673019,"time":1461268093170},{"lat":49.26587159284322,"long":-123.1575169601693,"time":1461268098117},{"lat":49.26591660366325,"long":-123.1575228275016,"time":1461268101120},{"lat":49.26596337468295,"long":-123.1574990228965,"time":1461268105118},{"lat":49.26598323979346,"long":-123.1574105938181,"time":1461268109109},{"lat":49.26598449707894,"long":-123.1573323906615,"time":1461268114118},{"lat":49.26597376824288,"long":-123.1572567020759,"time":1461268119103},{"lat":49.26592242908595,"long":-123.15727019694,"time":1461268125098},{"lat":49.26587800499914,"long":-123.1573897228792,"time":1461268128103},{"lat":49.26582838413237,"long":-123.1573931594595,"time":1461268135108},{"lat":49.26602250900982,"long":-123.1572102663323,"time":1461268137107},{"lat":49.26597146321951,"long":-123.1572394353553,"time":1461268145109},{"lat":49.26599853676675,"long":-123.1572665927216,"time":1461268150115}]
  var count = 0
  this.fakeDataInterval = setInterval(()=>{
    if(typeof data[count] != 'undefined'){
      this.recordPoint({coords:{latitude: data[count]['lat'], longitude: data[count]['long']}, time: data[count]['time']})
      count++
    }
  },500)
}

RunnerView.prototype.tearDownFakeData = function() {
  clearInterval(this.fakeDataInterval)
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371 // km
  var dLat = (lat2 - lat1).toRad()
  var dLon = (lon2 - lon1).toRad()
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d
}
Number.prototype.toRad = function() {
  return this * Math.PI / 180
}

global.RunnerView = module.exports = RunnerView