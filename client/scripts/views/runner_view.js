function RunnerView() {}

RunnerView.dom_id    = '#running_view_wrapper'
RunnerView.recordedPoints = []
RunnerView.recording = false
RunnerView.lastPosition = null
RunnerView.lastPointTs = null
RunnerView.startRunTs = null
RunnerView.runDistance = null
RunnerView.lastPaceTs = null
RunnerView.lastPacePoint = null

var fakeRunData = [
  [{"lat":49.26599975214271,"long":-123.1573370845273,"time":1461267473153},{"lat":49.26602682568996,"long":-123.1573970151349,"time":1461267475078},{"lat":49.26597577989964,"long":-123.1574178022548,"time":1461267477077},{"lat":49.26592984707026,"long":-123.1575284433767,"time":1461267481169},{"lat":49.26591643602519,"long":-123.1575576123997,"time":1461267484160},{"lat":49.26586392340182,"long":-123.1575411000505,"time":1461267491120},{"lat":49.26581769720583,"long":-123.1575243362441,"time":1461267494098},{"lat":49.26577230920015,"long":-123.1575274375483,"time":1461267497115},{"lat":49.26571568944423,"long":-123.1575387531176,"time":1461267502102},{"lat":49.26566305109231,"long":-123.1575401780411,"time":1461267507104},{"lat":49.26561724399148,"long":-123.1575431117072,"time":1461267511109},{"lat":49.26556481518714,"long":-123.1575467159256,"time":1461267515054},{"lat":49.26551355984925,"long":-123.1575447042688,"time":1461267520106},{"lat":49.2654648190823,"long":-123.1575234980538,"time":1461267526099},{"lat":49.26541666504858,"long":-123.1575280242815,"time":1461267530112},{"lat":49.26535933283089,"long":-123.1575280242815,"time":1461267534108},{"lat":49.26529948604225,"long":-123.1575302873954,"time":1461267538119},{"lat":49.2652541818556,"long":-123.1575411000505,"time":1461267541114},{"lat":49.26520221405594,"long":-123.1575527508959,"time":1461267545113},{"lat":49.2651489889708,"long":-123.1575567742094,"time":1461267550112},{"lat":49.26508641806362,"long":-123.1575692632451,"time":1461267554118},{"lat":49.26503281579284,"long":-123.1575918105647,"time":1461267557114},{"lat":49.26497280136613,"long":-123.1576040481433,"time":1461267561115},{"lat":49.264918277086,"long":-123.1576197223022,"time":1461267564115},{"lat":49.26486706365763,"long":-123.157640341784,"time":1461267566089},{"lat":49.26482096319018,"long":-123.1576327980712,"time":1461267571103},{"lat":49.26476262514411,"long":-123.1576094125613,"time":1461267575124},{"lat":49.26471065734444,"long":-123.1576050539717,"time":1461267578115},{"lat":49.26466225185363,"long":-123.1576075685426,"time":1461267582103},{"lat":49.26461250525831,"long":-123.1576269307389,"time":1461267586116},{"lat":49.26455542449771,"long":-123.157621733959,"time":1461267590113},{"lat":49.26450052303193,"long":-123.1576194708451,"time":1461267595117},{"lat":49.26445094407467,"long":-123.1576094125613,"time":1461267599103},{"lat":49.26440735817818,"long":-123.157571610178,"time":1461267604102},{"lat":49.26435044505565,"long":-123.1575801597192,"time":1461267608124},{"lat":49.26429462158053,"long":-123.157592732574,"time":1461267613114},{"lat":49.26424307287602,"long":-123.1576066465333,"time":1461267617117},{"lat":49.26419248809038,"long":-123.1576193870261,"time":1461267622115},{"lat":49.26413343758254,"long":-123.1576399226889,"time":1461267625101},{"lat":49.26407488998888,"long":-123.1576472987636,"time":1461267628098},{"lat":49.26402174872278,"long":-123.1576342229947,"time":1461267631107},{"lat":49.26396542233346,"long":-123.1576156151697,"time":1461267634121},{"lat":49.26391416699557,"long":-123.157600527744,"time":1461267637114},{"lat":49.26385700241594,"long":-123.1575978455349,"time":1461267641118},{"lat":49.2638035258737,"long":-123.157595498602,"time":1461267645091},{"lat":49.2637728481081,"long":-123.1576684211596,"time":1461267653105},{"lat":49.26377125554649,"long":-123.1577506476298,"time":1461267657102},{"lat":49.2637802660924,"long":-123.157825330387,"time":1461267661118},{"lat":49.26374573265134,"long":-123.1578956545546,"time":1461267666087},{"lat":49.26375327636419,"long":-123.1578270067676,"time":1461267712085},{"lat":49.26375214480726,"long":-123.1577551738575,"time":1461267779104},{"lat":49.26378345121561,"long":-123.1578221452638,"time":1461267790107},{"lat":49.26373014231144,"long":-123.1577813253954,"time":1461267827116},{"lat":49.26369871017454,"long":-123.1577276812151,"time":1461267836087},{"lat":49.26370399077354,"long":-123.1578012743249,"time":1461267872110},{"lat":49.26370562524466,"long":-123.1578878593847,"time":1461267892116},{"lat":49.26371098966269,"long":-123.1579701696738,"time":1461267898096},{"lat":49.26375155807404,"long":-123.1579186209693,"time":1461267922110},{"lat":49.26378102046369,"long":-123.1578852609947,"time":1461267925117},{"lat":49.26381458998589,"long":-123.1578360592231,"time":1461267929113},{"lat":49.26387079064666,"long":-123.1578428485646,"time":1461267957089},{"lat":49.26392028578488,"long":-123.1578377356037,"time":1461267961126},{"lat":49.26397707317887,"long":-123.1578165293887,"time":1461267965115},{"lat":49.26402262882261,"long":-123.1577907131269,"time":1461267969109},{"lat":49.2640738841605,"long":-123.1577782240912,"time":1461267973120},{"lat":49.26413130019723,"long":-123.1577840076044,"time":1461267978115},{"lat":49.26417953804998,"long":-123.1577771344438,"time":1461267981117},{"lat":49.26423586443929,"long":-123.157777637358,"time":1461267984104},{"lat":49.26428104289739,"long":-123.1577823312237,"time":1461267987113},{"lat":49.26433539953945,"long":-123.1577895396605,"time":1461267992115},{"lat":49.26438015890239,"long":-123.1577814930334,"time":1461267996115},{"lat":49.26443430599688,"long":-123.1577772182628,"time":1461267999125},{"lat":49.26447994545965,"long":-123.1577891205653,"time":1461268002115},{"lat":49.26452893768369,"long":-123.1577922218695,"time":1461268006114},{"lat":49.26457394850372,"long":-123.1577889529272,"time":1461268009113},{"lat":49.26462708976982,"long":-123.157806722562,"time":1461268012119},{"lat":49.26467964430271,"long":-123.1578137633606,"time":1461268015116},{"lat":49.26474108365296,"long":-123.1578192954167,"time":1461268018119},{"lat":49.26479615275679,"long":-123.1578164455697,"time":1461268021115},{"lat":49.2648453126189,"long":-123.1578024477914,"time":1461268024115},{"lat":49.26489954353242,"long":-123.1577859354421,"time":1461268028119},{"lat":49.26495390017448,"long":-123.1577737816825,"time":1461268032116},{"lat":49.26501512997715,"long":-123.1577673276171,"time":1461268036118},{"lat":49.26505988934009,"long":-123.1577503123536,"time":1461268039121},{"lat":49.26511684437214,"long":-123.1577604544565,"time":1461268043097},{"lat":49.26517191347597,"long":-123.1577363145753,"time":1461268046100},{"lat":49.26522350409,"long":-123.1577261724725,"time":1461268049120},{"lat":49.26527232867597,"long":-123.1577198860451,"time":1461268052104},{"lat":49.26532982853173,"long":-123.1577307825192,"time":1461268056120},{"lat":49.26537848547964,"long":-123.1577352249279,"time":1461268059115},{"lat":49.26542521458982,"long":-123.157727429758,"time":1461268062119},{"lat":49.26547328480451,"long":-123.1577203889593,"time":1461268065120},{"lat":49.26552148074774,"long":-123.1577239093586,"time":1461268068118},{"lat":49.26556879659115,"long":-123.1577100792184,"time":1461268071095},{"lat":49.26561850127695,"long":-123.1577032898768,"time":1461268074121},{"lat":49.26566820596276,"long":-123.1577009429439,"time":1461268077102},{"lat":49.26571434833972,"long":-123.1576883700892,"time":1461268081117},{"lat":49.26573366862653,"long":-123.1576064788952,"time":1461268086107},{"lat":49.26575386901317,"long":-123.1575331372425,"time":1461268090118},{"lat":49.26580286123721,"long":-123.1575210673019,"time":1461268093170},{"lat":49.26587159284322,"long":-123.1575169601693,"time":1461268098117},{"lat":49.26591660366325,"long":-123.1575228275016,"time":1461268101120},{"lat":49.26596337468295,"long":-123.1574990228965,"time":1461268105118},{"lat":49.26598323979346,"long":-123.1574105938181,"time":1461268109109},{"lat":49.26598449707894,"long":-123.1573323906615,"time":1461268114118},{"lat":49.26597376824288,"long":-123.1572567020759,"time":1461268119103},{"lat":49.26592242908595,"long":-123.15727019694,"time":1461268125098},{"lat":49.26587800499914,"long":-123.1573897228792,"time":1461268128103},{"lat":49.26582838413237,"long":-123.1573931594595,"time":1461268135108},{"lat":49.26602250900982,"long":-123.1572102663323,"time":1461268137107},{"lat":49.26597146321951,"long":-123.1572394353553,"time":1461268145109},{"lat":49.26599853676675,"long":-123.1572665927216,"time":1461268150115}],
  [{"lat":49.26730598793296,"long":-123.1575628929987,"time":1461275141089},{"lat":49.267270406754,"long":-123.1575179659977,"time":1461275145078},{"lat":49.26722686276702,"long":-123.1574770623102,"time":1461275150109},{"lat":49.26717204512028,"long":-123.1574782357767,"time":1461275155090},{"lat":49.26712250807254,"long":-123.1574942452117,"time":1461275160068},{"lat":49.2670716718298,"long":-123.1575015374675,"time":1461275165059},{"lat":49.26701622554032,"long":-123.1574960892304,"time":1461275169084},{"lat":49.26695893523215,"long":-123.1575078238949,"time":1461275173089},{"lat":49.26689992663382,"long":-123.1575069857046,"time":1461275177084},{"lat":49.26684695300577,"long":-123.1574908924505,"time":1461275181073},{"lat":49.26679066852598,"long":-123.1574776490435,"time":1461275185093},{"lat":49.26673132465152,"long":-123.1574779843196,"time":1461275189090},{"lat":49.26668400880812,"long":-123.1574650761887,"time":1461275192090},{"lat":49.26663296301781,"long":-123.15745803539,"time":1461275195088},{"lat":49.2665790254709,"long":-123.1574595441326,"time":1461275198092},{"lat":49.26653099716572,"long":-123.1574592088565,"time":1461275201088},{"lat":49.26648141820846,"long":-123.1574573648378,"time":1461275204092},{"lat":49.26642718729494,"long":-123.1574607175991,"time":1461275208090},{"lat":49.26638230220346,"long":-123.1574722846254,"time":1461275211101},{"lat":49.26632304214804,"long":-123.1574877073273,"time":1461275215121},{"lat":49.2662750976619,"long":-123.1575073209807,"time":1461275219119},{"lat":49.26622019619612,"long":-123.1575145294174,"time":1461275223091},{"lat":49.26617271271466,"long":-123.15751343977,"time":1461275227075},{"lat":49.26612883345155,"long":-123.1574951672211,"time":1461275231100},{"lat":49.26606588535873,"long":-123.1574887131556,"time":1461275234087},{"lat":49.2660187371534,"long":-123.1574792416051,"time":1461275238081},{"lat":49.26599652510999,"long":-123.1574013737246,"time":1461275242079},{"lat":49.26599489063887,"long":-123.1573324744805,"time":1461275246096},{"lat":49.2659563757938,"long":-123.1572912355169,"time":1461275252094},{"lat":49.26596572161584,"long":-123.1572225877299,"time":1461275259095},{"lat":49.265964841516,"long":-123.1572743878915,"time":1461275264086},{"lat":49.26595201720415,"long":-123.1573090889707,"time":1461275265099},{"lat":49.26595448986559,"long":-123.1573365816131,"time":1461275268085},{"lat":49.26597942602752,"long":-123.1573350728705,"time":1461275271089},{"lat":49.26600503274171,"long":-123.1572690234735,"time":1461275277095},{"lat":49.2659711698529,"long":-123.157188389565,"time":1461275280085},{"lat":49.26592917651801,"long":-123.1571572927042,"time":1461275285053},{"lat":49.26587959756075,"long":-123.1571282913193,"time":1461275288090}],
  [{"lat":49.26627497193335,"long":-123.1575628091797,"time":1461279907415},{"lat":49.26632496998577,"long":-123.1575602107897,"time":1461279912581},{"lat":49.26636222754536,"long":-123.1575206482067,"time":1461279915394},{"lat":49.26639910791932,"long":-123.1574544311717,"time":1461279918531},{"lat":49.26643359945087,"long":-123.1574067381426,"time":1461279920496},{"lat":49.26646624696372,"long":-123.1573457178875,"time":1461279923663},{"lat":49.26647584424285,"long":-123.1572769024625,"time":1461279925682},{"lat":49.26648112484185,"long":-123.1571862102702,"time":1461279928407},{"lat":49.26644935742883,"long":-123.1571285427764,"time":1461279934694},{"lat":49.26642136187224,"long":-123.1570220087871,"time":1461279937397},{"lat":49.26640899856506,"long":-123.1569174864545,"time":1461279939662},{"lat":49.26640216731398,"long":-123.156844815354,"time":1461279941671},{"lat":49.26641520117341,"long":-123.1567778439477,"time":1461279952447},{"lat":49.26641943403451,"long":-123.1566966233059,"time":1461279956483},{"lat":49.26642425362883,"long":-123.1565953699156,"time":1461279959517},{"lat":49.26643376708893,"long":-123.1565190107777,"time":1461279961699},{"lat":49.26642542709528,"long":-123.156442986916,"time":1461279963417},{"lat":49.2663966771674,"long":-123.1563704834535,"time":1461279966753},{"lat":49.26637769215672,"long":-123.1563033444091,"time":1461279979460},{"lat":49.2663966771674,"long":-123.1562143285974,"time":1461279983685},{"lat":49.26639491696773,"long":-123.1561082137033,"time":1461279985419},{"lat":49.26639546179144,"long":-123.1559751090809,"time":1461279987399},{"lat":49.26638737325488,"long":-123.1558554155036,"time":1461279989419},{"lat":49.26637886562316,"long":-123.1557549164846,"time":1461279991635},{"lat":49.26637253728627,"long":-123.1556682476058,"time":1461279993431},{"lat":49.2663628561881,"long":-123.1555945706769,"time":1461279995436},{"lat":49.26641025585054,"long":-123.1556229853287,"time":1461280007623},{"lat":49.26642479845254,"long":-123.1555562653794,"time":1461280015636},{"lat":49.26640564580379,"long":-123.1554789004132,"time":1461280018670},{"lat":49.26636478402583,"long":-123.1553151180252,"time":1461280021562},{"lat":49.26635321699946,"long":-123.1552241743758,"time":1461280023656},{"lat":49.26634437409161,"long":-123.1551306323364,"time":1461280025471},{"lat":49.26634315871565,"long":-123.1550585479691,"time":1461280027492},{"lat":49.2663509538856,"long":-123.1549677719578,"time":1461280030481},{"lat":49.26638640933601,"long":-123.1548925024673,"time":1461280033428},{"lat":49.26640971102683,"long":-123.1548317336693,"time":1461280037636},{"lat":49.26643116869895,"long":-123.1547472440853,"time":1461280040488},{"lat":49.26644005351631,"long":-123.1546701305762,"time":1461280043647},{"lat":49.2664284026709,"long":-123.1545911730483,"time":1461280048472},{"lat":49.26643058196573,"long":-123.154516490291,"time":1461280052613},{"lat":49.26643012096105,"long":-123.1544382033154,"time":1461280058697},{"lat":49.26645794887958,"long":-123.1543608383491,"time":1461280061473},{"lat":49.2664701445487,"long":-123.1542855688586,"time":1461280067481},{"lat":49.26645308737574,"long":-123.1542164181575,"time":1461280070608},{"lat":49.26642668438075,"long":-123.1541261450603,"time":1461280072478},{"lat":49.26639919173835,"long":-123.1540547312453,"time":1461280074407},{"lat":49.26636419729261,"long":-123.1539909449622,"time":1461280076677},{"lat":49.26635627639411,"long":-123.1539107301488,"time":1461280079396},{"lat":49.26631302577375,"long":-123.1539319363638,"time":1461280084681},{"lat":49.26631264858811,"long":-123.1538615283772,"time":1461280090685},{"lat":49.26631533079712,"long":-123.153760610263,"time":1461280092494},{"lat":49.26631495361148,"long":-123.1536645536527,"time":1461280094561},{"lat":49.26631776154904,"long":-123.1535578520253,"time":1461280096687},{"lat":49.26632396415739,"long":-123.1534614601388,"time":1461280098629},{"lat":49.26633486063151,"long":-123.1533845980867,"time":1461280102404},{"lat":49.26636277236907,"long":-123.1533009466931,"time":1461280111472},{"lat":49.26637622532366,"long":-123.1532204804226,"time":1461280113705},{"lat":49.26638246984152,"long":-123.153128866221,"time":1461280115676},{"lat":49.26638498441248,"long":-123.1530268584594,"time":1461280117641},{"lat":49.26639370159177,"long":-123.1529416983231,"time":1461280119400},{"lat":49.26640920811264,"long":-123.152872631441,"time":1461280121393},{"lat":49.26635724031298,"long":-123.1528440491512,"time":1461280125680},{"lat":49.26631319341181,"long":-123.1528613996908,"time":1461280127471},{"lat":49.26623733718811,"long":-123.1529400219425,"time":1461280137470},{"lat":49.26618608185021,"long":-123.1529375911906,"time":1461280140667},{"lat":49.26612954591332,"long":-123.1529289578303,"time":1461280142689},{"lat":49.26607544072835,"long":-123.1529666763946,"time":1461280146664},{"lat":49.26598885566859,"long":-123.1530173869088,"time":1461280149675},{"lat":49.26592754204689,"long":-123.1530281157448,"time":1461280151636},{"lat":49.26586358812569,"long":-123.1530095917388,"time":1461280153669},{"lat":49.26579942465691,"long":-123.1529781596019,"time":1461280155622},{"lat":49.26573228561251,"long":-123.1529613957956,"time":1461280157667},{"lat":49.26566334445892,"long":-123.1529536844447,"time":1461280159658},{"lat":49.26560337194173,"long":-123.152949158217,"time":1461280161403},{"lat":49.2655443633434,"long":-123.1529437937989,"time":1461280165472},{"lat":49.26559054762988,"long":-123.1529477332934,"time":1461280168413},{"lat":49.26562533252804,"long":-123.1530033891305,"time":1461280173453},{"lat":49.26564616155742,"long":-123.1530782395258,"time":1461280178480},{"lat":49.26566715822486,"long":-123.1531424449041,"time":1461280181515},{"lat":49.26567658786593,"long":-123.1532169600233,"time":1461280184454},{"lat":49.26567625258981,"long":-123.1533029583498,"time":1461280186613},{"lat":49.26567432475208,"long":-123.1533900463238,"time":1461280189680},{"lat":49.265656932303,"long":-123.1534678303852,"time":1461280197617},{"lat":49.26567558203755,"long":-123.1535890327051,"time":1461280199418},{"lat":49.26569033418713,"long":-123.1536985841795,"time":1461280201468},{"lat":49.26565081351368,"long":-123.153736889477,"time":1461280207407},{"lat":49.26564456899582,"long":-123.1538274978503,"time":1461280211646},{"lat":49.26565336999415,"long":-123.153953394036,"time":1461280213682},{"lat":49.26565093924223,"long":-123.1540346146777,"time":1461280216401},{"lat":49.26566296727328,"long":-123.1541429926857,"time":1461280227437},{"lat":49.26567470193772,"long":-123.154286490868,"time":1461280229735},{"lat":49.26569356121986,"long":-123.1543716510042,"time":1461280231624},{"lat":49.26568731670199,"long":-123.1544419751718,"time":1461280234688},{"lat":49.26569917709498,"long":-123.1545233634516,"time":1461280242570},{"lat":49.2657034518656,"long":-123.1546028238937,"time":1461280244662},{"lat":49.26571845547227,"long":-123.1546680351004,"time":1461280246527},{"lat":49.26573148933171,"long":-123.154749004285,"time":1461280249485},{"lat":49.26572126340984,"long":-123.1548189931765,"time":1461280252607},{"lat":49.26567947962253,"long":-123.1548711286142,"time":1461280256604},{"lat":49.26564771220951,"long":-123.1549210847571,"time":1461280265500},{"lat":49.26565944687395,"long":-123.1550391019538,"time":1461280268613},{"lat":49.2656749114853,"long":-123.1551304646983,"time":1461280270400},{"lat":49.26568429921685,"long":-123.155198190476,"time":1461280272485},{"lat":49.26567943771301,"long":-123.1552794949367,"time":1461280275402},{"lat":49.26565387290834,"long":-123.1553371624305,"time":1461280280639},{"lat":49.26566367973505,"long":-123.1554426067724,"time":1461280283617},{"lat":49.26566908606259,"long":-123.155541848506,"time":1461280285630},{"lat":49.2656704271671,"long":-123.1556227338716,"time":1461280288441},{"lat":49.26569326785324,"long":-123.1557553355798,"time":1461280295508},{"lat":49.26570282322286,"long":-123.1558535714849,"time":1461280297616},{"lat":49.26571707245825,"long":-123.1559324451938,"time":1461280299421},{"lat":49.26574992951868,"long":-123.156004445742,"time":1461280307404},{"lat":49.2657721834716,"long":-123.1560854987457,"time":1461280309470},{"lat":49.2657790566322,"long":-123.1561766100332,"time":1461280311622},{"lat":49.26577993673204,"long":-123.1562479400292,"time":1461280313398},{"lat":49.26577490759014,"long":-123.1563201082155,"time":1461280316670},{"lat":49.26573220179348,"long":-123.1563462597534,"time":1461280320493},{"lat":49.26571610853939,"long":-123.1564281509473,"time":1461280327415},{"lat":49.26570718181251,"long":-123.1565043424472,"time":1461280329396},{"lat":49.26569318403421,"long":-123.1565853116318,"time":1461280332617},{"lat":49.26571066030233,"long":-123.1566709746822,"time":1461280336496},{"lat":49.26572046712904,"long":-123.1567451545253,"time":1461280339473},{"lat":49.2657222273287,"long":-123.1568143052265,"time":1461280341642},{"lat":49.26572528672336,"long":-123.1569138822361,"time":1461280349664},{"lat":49.26571954511969,"long":-123.1569857989654,"time":1461280351629},{"lat":49.26571556371568,"long":-123.1570789219096,"time":1461280353780},{"lat":49.26570475106059,"long":-123.1571476535156,"time":1461280356668},{"lat":49.2657016078469,"long":-123.1572181453213,"time":1461280360743},{"lat":49.26570336804657,"long":-123.1572919060692,"time":1461280363614},{"lat":49.26570693035541,"long":-123.157365331541,"time":1461280366480},{"lat":49.26571149849264,"long":-123.1574407686695,"time":1461280370531},{"lat":49.26570458342253,"long":-123.1575279404625,"time":1461280374433},{"lat":49.26576032307862,"long":-123.157518804188,"time":1461280380409},{"lat":49.2658060044509,"long":-123.1574912277266,"time":1461280384426},{"lat":49.26586706661551,"long":-123.1574709435209,"time":1461280389401},{"lat":49.2659140890923,"long":-123.1574588735804,"time":1461280393498},{"lat":49.26591174215941,"long":-123.1573676784738,"time":1461280397517}]
]

RunnerView.prototype.render = function(){
  if(Framework.isMobile()){
    this.setupMobileBindings()
  }else{
    this.setupBindings()
  }

  this.startWatchGPS({ enableHighAccuracy: true })

  $('#app').html(Framework.loadTemplate('runningViewTemplate'))
  $('#app').append(Framework.loadTemplate('runningViewStatsTemplate'))

  this.getLocation((position) => {
    var styles = [
      {
        "elementType": "labels",
        "stylers": [
          { "weight": 1.3 },
          { "visibility": "off" },
          { "saturation": -100 },
          { "invert_lightness": true }
        ]
      },{
        "elementType": "geometry",
        "stylers": [
          { "lightness": 1 },
          { "invert_lightness": true },
          { "saturation": -100 },
          { "gamma": 1.2 },
          { "visibility": "simplified" },
          { "weight": 1.0 }
        ]
      }
    ]
    this.map = GMaps({
      div: '#map',
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      disableDefaultUI: true
    })
    this.map.addStyle({
      styledMapName:"Styled Map",
      styles: styles,
      mapTypeId: "map_style"
    })

    this.map.setStyle("map_style")
    this.map.hideContextMenu()
    this.playerMarker = this.addMarker(position.coords.latitude, position.coords.longitude)
    this.playerMarker.markerId = 'player'
    $('.gm-style> :nth-child(2)').css('display','none')
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
    icon: 'images/marker_smaller.png'
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
  this.startRunTs = new Date().getTime()
  this.setTimerInterval();
}

RunnerView.prototype.stopRecording = function() {
  clearInterval(this.timerInterval)
  this.dumpRunData()
  this.recording = false
  this.stopSetButtons()
}

RunnerView.prototype.setTimerInterval = function() {
  this.timerInterval = setInterval(()=>{
    var now = new Date().getTime()
    var hours = Math.floor((now - this.startRunTs)/(1000*60*60))
    var minutes = Math.floor((now - this.startRunTs)/(1000*60))%60
    if((minutes + '').length == 1) minutes = '0' + minutes
    var seconds = Math.floor((now - this.startRunTs)/(1000))%60
    if((seconds + '').length == 1) seconds = '0' + seconds
    var formattedTime = minutes + ':' + seconds;
    if(hours > 0) formattedTime = hours + ':' + formattedTime
    $('#time').text(formattedTime)
  },1000)
}

RunnerView.prototype.startSetButtons = function() {
  $('#start_button').addClass('hide').removeClass('block')
  $('#stop_button').removeClass('hide').addClass('block')
}

RunnerView.prototype.stopSetButtons = function() {
  $('#stop_button').addClass('hide').removeClass('block')
  $('#start_button').removeClass('hide').addClass('block')
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
  this.playerMarker.setPosition( new google.maps.LatLng(position.coords.latitude-0.0002, position.coords.longitude) )
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
  this.lastPacePoint = null
  this.lastPaceTs = null
  this.startRunTs = null
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
    strokeColor: 'rgb(29,149,214)',
    strokeOpacity: 1.0,
    strokeWeight: 6
  })
}

RunnerView.prototype.drawPath = function() {
  var path = this.buildPath()
  var last_point = null
  this.map.removePolylines()
  var count = 0
  _.each(path, (point) => {
    if(last_point != null){
      this.currentPath = this.map.drawPolyline({
        path: [last_point, point],
        strokeColor: this.calculateGradient(count, path.length, [29,149,214], [250,243,11]),
        strokeOpacity: 1.0,
        strokeWeight: 6
      })
      last_point = point
    }
    else{
      last_point = point
    }
    count++
  });
}

RunnerView.prototype.calculateGradient = function(count, length, startColor, endColor) {
  var rDelta = endColor[0] - startColor[0]
  var gDelta = endColor[1] - startColor[1]
  var bDelta = endColor[2] - startColor[2]
  return 'rgb(' + Math.round(startColor[0]+((count/length)*rDelta)) + ',' +
                    Math.round(startColor[1]+((count/length)*gDelta)) + ',' +
                    Math.round(startColor[2]+((count/length)*bDelta)) + ')'
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
  localStorage.setItem(this.startRunTs + '_run', JSON.stringify(this.recordedPoints));
  // $('#app').append(Framework.loadTemplate('runResultsTemplate'))
  // $('#results_text_area').val(JSON.stringify(this.recordedPoints))
}

RunnerView.prototype.reportData = function(position, lastPosition){
  $('#dist').text(Math.round(this.runDistance * 10)/10)
  $('#avg_pace').text(Math.round((((position.time - this.startRunTs)/(1000 * 60))/this.runDistance) * 10) / 10)

  if(typeof this.lastPacePoint == 'undefined' || this.lastPacePoint == null){
    this.lastPacePoint = position
    this.lastPaceTs = position.time
    $('#cur_pace').text(Math.round((((position.time - lastPosition[2])/(1000 * 60))/this.getDistance([position.coords.latitude, position.coords.longitude], lastPosition)) * 10) / 10)
  }
  else{
    console.log(position.time - this.lastPaceTs)
    if((position.time - this.lastPaceTs) > 5000){
      $('#cur_pace').text(Math.round((((position.time - this.lastPaceTs)/(1000 * 60))/this.getDistance([position.coords.latitude, position.coords.longitude], [this.lastPacePoint.coords.latitude, this.lastPacePoint.coords.longitude])) * 10) / 10)
      this.lastPacePoint = position
      this.lastPaceTs = position.time
    }
  }
}

RunnerView.prototype.setupBindings = function() {
  this.setupBinding({
    parent:   $(document),
    key:      'click',
    element:  '#start_button',
    callback: (e) => {
      this.startRecording()
      this.prepareFakeData()
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

RunnerView.prototype.prepareFakeData = function(){
  this.startRunTs = fakeRunData[2][0]['time']
  clearInterval(this.timerInterval)
}

RunnerView.prototype.setFakeData = function() {
  var data = fakeRunData[2]
  var count = 0
  this.fakeDataInterval = setInterval(()=>{
    if(typeof data[count] != 'undefined'){
      this.recordPoint({coords:{latitude: data[count]['lat'], longitude: data[count]['long']}, time: data[count]['time']})

      var now = data[count]['time']
      var hours = Math.floor((now - this.startRunTs)/(1000*60*60))
      var minutes = Math.floor((now - this.startRunTs)/(1000*60))%60
      if((minutes + '').length == 1) minutes = '0' + minutes
      var seconds = Math.floor((now - this.startRunTs)/(1000))%60
      if((seconds + '').length == 1) seconds = '0' + seconds
      var formattedTime = minutes + ':' + seconds;
      if(hours > 0) formattedTime = hours + ':' + formattedTime
      $('#time').text(formattedTime)

      count++
    }
  },200)
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