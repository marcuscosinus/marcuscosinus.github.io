/* ======= Model ======= */

var model = {
	currentSpecie: null,
	currentClas: null,
	mento1: [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10],

	primary: {
		str: 0,
		agi: 0,
		ints: 0,
		con: 0,
		wis: 0,
		cha: 0
	},

	mod: {
		str: 0,
		agi: 0,
		ints: 0,
		con: 0,
		wis: 0,
		cha: 0
	},

	secondary: {
        hp: 0,
        vo: 0,
        attack: 0,
        melee: 0,
        ranged: 0,
        kitart: 0,
        refl: 0,
        akae: 0,
        level: 3
	},

	skill: [
	{
		name: '',
		desc: '',
		level: 0
	}

	],

	classes: [
	{
		name: 'warrior',
		desc: 'A harcosok a fegyverhasználat mesterei. Megállják a helyüket a közelharcban és a távolsági összecsapásokban is, s sokkal jobban viselik a sebesüléseket, mint más osztályok képviselői. Ez az osztály mind közül a leggyakoribb, de egyben a legváltozatosabb is – öt alosztállyal rendelkezik.',
		diceNum: 10,
		attackMod: 1
	},

	{
		name: 'monk',
		desc: 'A papok az istenek militáns varázshasználó szolgái. Hitük parancsait minden körülmények között be kell tartaniuk, s bizonyos rendszerességgel áldozatokat kell bemutatniuk. A papok csak istenükkel azonos vagy attól legfeljebb eggyel különböző jelleműek lehetnek. A papok csak az istenük által kijelölt fegyvereket forgathatják, de szabadon válogathatnak a különféle vértek között. ',
		diceNum: 8,
		attackMod: 0
	}


	],

	species: [
	{
		name: "elf",
		desc: "Az elfek szépségükről, hosszú életükről és fejlett civilizációjukról ismertek, amely ötvözi a városi és természeti élet előnyeit. Termetük nyúlánk, vonásaik az embernél finomabbak, de egyben törékenyebbek. Kiváló íjászok és varázslók. Általában visszahúzódóak, csak ritkán lépnek kapcsolatba a rövidebb életű népekkel – legjobban az emberekkel és a félszerzetekkel jönnek ki. Jellemük általában kaotikus jó.",
		bonus: "<ul><li>Immunisak az altató mágiára, +2 mentődobás bűbáj ellen </li><li>Automatikusan képzettek az íjak és a hoszszúkard használatában akkor is, ha osztályuk ezt nem adná meg nekik</li><li>Nem támaszthatók föl közönséges mágiával</li></ul>",
		agi : 1,
		con : -1

	},

	{
		name: 'dwarf',
		desc: 'A törpék elsősorban hegyek között és dombvidékeken élnek. Termetük kicsi (1-2 m), de testük tömzsi és igen szívós. Bozontos szakállat viselnek, amely a férfiak esetén dús és sörteszerű, a nőknél finomabb és ritkásabb. A törpék kiemelkedőek a mindenféle mesterségekben, különösen a fémmunkákban, de harcban is megállják helyüket. Nagy nemzetségekbe szerveződnek és híresek igazságérzetükről, makacsságukról és kapzsiságukról. A legtöbb törpe törvényes jó vagy törvényes semleges jellemű.',
		bonus: '<ul><li>Lassabban mozognak az embereknél(alapsebességük 20’)</li><li>+2 mentődobást kapnak mérgek és varázslatok hatásai ellen</li><li>+1 Egs, -1 Kar</li></ul>',
		con: 1,
		cha: -1
	},

	{
		name: 'human',
		desc: 'Az emberi népek sokfélesége és szaporasága, valamint a bennük élő felfedezői hajlam és erkölcsi rugalmasság hatására képviselőik majdnem minden földön megtalálhatók. A legtöbb ember a lenti vonásokkal rendelkezik. ',
		bonus: '<ul><li>A játék kezdetén egy extra képzettséggel kezdenek </li> <li>Korlátlanul fejlődhetnek minden osztályban</li> </ul>'

	},

	{
		name: 'amazon',
		desc: 'Bár az amazonok népe igen kis létszámú, harciasságuk miatt mégis félik őket. Az amazonok nyúlánk termetűek, hajuk általában vöröses vagy világosbarna, bőrük világos. Társadalmukban teljes a nőuralom, a férfiakat rabszolgaságban tartják és megtiltják számukra a fegyverviselést. Képzett tengeri rablók, de a szárazföldön is megállják a helyüket. Az amazon nők kivétel nélkül értenek a harchoz és soha, soha nem hagyják megtorlatlanul az őket ért sérelmeket. Technikailag fejletlenek. Kis erejű passzív pszionikus (elmebeli) képességeik vannak. ',
		bonus:'<ul><li>Ha két vagy több amazon együttesen harcol, VO-juk 2-vel nő pszionikus képességeik miatt </li><li>Szintkorlátok: Harcos -, Pap 5, Tolvaj 0, Varázsló 0</li></ul>'
	},

	{
		name: 'empire',
		desc: 'Bár a Birodalom történelemelőtti kora már évezredek óta elmúlt, a nép maradékai még megtalálhatók. Az irántuk érzett gyűlölet miatt sokan rejtőzködni kényszerülnek közülük, pedig hatalmuk már meg sem közelíti a régit – életüket többnyire dekadens élvezetek habzsolásával, kábítószeres mámorban töltik. Bőrük lilás, a tisztavérűek esetén padlizsánszínű, szemük ibolyaszín. A fajtiszta birodalmiak között a beltenyészet és a degeneráció miatt gyakoriak az örökletes betegségek. Városaik számtalan titkot és mesés kincseket rejtenek.',
		bonus: '<ul><li>+1 Int, -1 Egs</li><li>Egyik kezdő képzettségük mindenképpen az Alkímia vagy a Méregkeverés</li><li>Szintkorlátok: Harcos 7, Pap 5, Tolvaj 5, Varázsló -</li></ul>'
	},

	{
		name: 'ethunian',
		desc: 'Az etúniai lovas nomádok kultúrája mindmáig megőrizte primitívségét. Akár földművelésből, akár lovas portyázásból, akár rablásból és kereskedésből élnek, nem fogékonyak a finomságok iránt. Eszközeik is egyszerűek: fegyvereik főleg hosszú lándzsák, és bár kedvelik a kardokat és láncvérteket, nem jeleskednek azok előállításában (a vas megmunkálását kovácsaik féltett titokként őrzik). Többnyire semleges jelleműek – bár azok, akik otthonuktól elszakadva kénytelenek megélni, inkább a gonosz felé hajlanak. Az etúniaiak középtermetűek, bőrük cserzett, hajuk olajos fekete, amit leggyakrabban copfban fognak össze. A férfiak kedvelik a bajusz viseletét.',
		bonus: '<ul><li>+1 Egs, -1 Böl</li> <li>Az egyik kezdő képzettségük mindenképpen a Lovaglás</li><li>Szintkorlátok: Harcos -, Pap 5, Tolvaj -, Varázsló 4</li></ul>'
	}

	]

};

/* ======= Controller ======= */

var controller = {

	init: function() {
		mainStatView.init();
		speciesListView.init();
		specieDescView.init();
		secondaryStatView.init();
		classesListView.init();
		classDescView.init();
		secondaryStatView.init();
	},


	rollDie: function(sides){
		return 1 + Math.floor(Math.random()* sides);
	},

	rollDice: function(number, sides) {
		var total = 0;
    	while(number-- > 0) total += controller.rollDie(sides);
    	return total;
	},

	setStat: function(primary) {
		for (var stats in primary) {
			primary[stats] = controller.rollDice(4,6);
		}
		
	},

	setMod: function(stat) {
		
		for (var item in stat) {
			
			if (stat[item] < 3)
				{model.mod[item] = -3;}

			else if (stat[item] < 6)
				{model.mod[item] = -2;}

			else if (stat[item] < 9)
				{model.mod[item] = -1;}

			else if (stat[item] < 12)
				{model.mod[item] = 0;}

			else if (stat[item] < 15)
				{model.mod[item] = 1;}

			else if (stat[item] < 18)
				{model.mod[item] = 2;}
			
			else if (stat[item] < 25)
				{model.mod[item] = 3;}
			else
				{model.mod[item] = 42;}
		}
		console.log(model.mod);
	},

	setHP: function() {
		if (model.currentClas === null) {
			return;
		}else {model.secondary.hp = model.currentClas.diceNum + controller.rollDice(model.secondary.level - 1, model.currentClas.diceNum) + (model.secondary.level * model.mod.con);
}
	},

	setVO: function () {
		if (model.currentClas === null) {
			return;
		}else {model.secondary.vo = 10 + model.mod.agi;}
	},

	setAttackMod: function() {
		model.secondary.attack = Math.floor(model.secondary.level * model.currentClas.attackMod);
	},

	setMelee: function() {
		if (model.currentClas === null) {
			return;
		}else {model.secondary.melee = model.mod.str + model.currentClas.attackMod;}
	},

	setRanged: function() {
		if (model.currentClas === null) {
			return;
		}else {model.secondary.ranged = model.mod.agi + model.currentClas.attackMod;}
	},

	setCurrentSpecie: function(specie) {
		model.currentSpecie = specie;
	},

	setCurrentClass: function(clas) {
		model.currentClas = clas;
	},

	getCurrentSpecie: function() {
		return model.currentSpecie;
	},

	getCurrentClass: function() {
		return model.currentClas;
	},

	getSpecies: function() {
		return model.species;
	},

	getClasses: function() {
		return model.classes;
	},

	getStats: function() {
		return model.primary;
	},

	getMods: function() {
		return model.mod;
	},

	getHP: function() {
		if (model.currentClas === null) {
			return "Válassz kasztot!";
		} else {return model.secondary.hp.toString();}
		
	},

	getVO: function() {
		if (model.currentClas === null) {
			return "Válassz kasztot!";
		} else {return model.secondary.vo.toString();}
	},

	getMelee: function() {
		if (model.currentClas === null) {
			return "Válassz kasztot!";
		} else {return model.secondary.melee.toString();}
	},

	getRanged: function() {
		if (model.currentClas === null) {
			return "Válassz kasztot!";
		} else {return model.secondary.ranged.toString();}
	}

};

/* ======= View ======= */

var mainStatView = {
	init: function() {
		this.mainStatElem = document.getElementById("attributes");
	},

	render: function() {
		this.mainStatElem.innerHTML = "";
		var mainStat;
		controller.setStat(model.primary);
		controller.setMod(model.primary);
		var mainStats = controller.getStats();
		var mods = controller.getMods();
		
		for (mainStat in mainStats) {
			this.mainStatElem.innerHTML += mainStat + ": " + mainStats[mainStat].toString() + 
			" mod: " + mods[mainStat].toString() + "<br />";
		}
		secondaryStatView.render();

	}
};

var secondaryStatView = {
	init: function() {
		this.secondaryStatElem = document.getElementById("secondary");

	},

	render: function() {
		this.secondaryStatElem.innerHTML = "";
		controller.setHP();
		controller.setVO();
		controller.setMelee();
		controller.setRanged();
		var currentHP = controller.getHP();
		var currentVO = controller.getVO();
		var currentMelee = controller.getMelee();
		var currentRanged = controller.getRanged();
		this.secondaryStatElem.innerHTML = "HP: " + currentHP + "<br/> VO: " + 
		currentVO + "<br/> Melee: " + currentMelee + "<br/> Ranged: " + currentRanged;

	}
};


var speciesListView = {
	init: function() {
		this.speciesListElem = document.getElementById("specie-list");
		
		this.render();
	},

	render: function() {
		var specie, elem, i;
		var species = controller.getSpecies();

		this.speciesListElem.innerHTML = "";

		for (i = 0; i < species.length; i++) {
			specie = species[i];

			elem = document.createElement("li");
			elem.textContent = specie.name;
			//elem.title = specie.desc;

			elem.addEventListener('click', (function(specieCopy) {
				return function() {
					controller.setCurrentSpecie(specieCopy);
					specieDescView.render();
				};
			})(specie));
			this.speciesListElem.appendChild(elem);
		}
	}
};

var specieDescView = {
	init: function() {
		this.specieDescElem = document.getElementById("specie-desc");
		
	},

	render: function() {
		var currentSpecie = controller.getCurrentSpecie();
		this.specieDescElem.innerHTML = currentSpecie.desc + currentSpecie.bonus;
	}
};

var classesListView = {
	init: function() {
		this.classesListElem = document.getElementById("class-list");
		this.render();
	},

	render: function() {
		var clas, elem, i;
		var classes = controller.getClasses();

		this.classesListElem.innerHTML = "";

		for (i = 0; i < classes.length; i++) {
			clas = classes[i];

			elem = document.createElement("li");
			elem.textContent = clas.name;

			elem.addEventListener('click', (function(clasCopy) {
				return function() {
					controller.setCurrentClass(clasCopy);
					classDescView.render();
					secondaryStatView.render();
				};
			})(clas));
			this.classesListElem.appendChild(elem);

		}

	}
};

var classDescView = {
	init: function() {
		this.classDescElem = document.getElementById("class-desc");

	},

	render: function() {
		var currentClass = controller.getCurrentClass();
		this.classDescElem.innerHTML = currentClass.desc;
	}
};




controller.init();