
//ELSŐDLEGES TULAJDONSÁGOK DEKLARÁLÁSA
var attrStr = document.getElementById('str');
var attrStrSpan = attrStr.getElementsByTagName('span')[0];
var attrAgi = document.getElementById('agi');
var attrAgiSpan = attrAgi.getElementsByTagName('span')[0];
var attrInts = document.getElementById('ints');
var attrIntsSpan = attrInts.getElementsByTagName('span')[0];
var attrCon = document.getElementById('con');
var attrConSpan = attrCon.getElementsByTagName('span')[0];
var attrWis = document.getElementById('wis');
var attrWisSpan = attrWis.getElementsByTagName('span')[0];
var attrCha = document.getElementById('cha');
var attrChaSpan = attrCha.getElementsByTagName('span')[0];

// //TULAJDONSÁGMÓDOSÍTÓK DEKLARÁLÁSA
var attrStrMod = document.getElementById('strMod');
var attrStrModSpan = attrStrMod.getElementsByTagName('span')[0];
var attrAgiMod = document.getElementById('agiMod');
var attrAgiModSpan = attrAgiMod.getElementsByTagName('span')[0];
var attrIntsMod = document.getElementById('intsMod');
var attrIntsModSpan = attrIntsMod.getElementsByTagName('span')[0];
var attrConMod = document.getElementById('conMod');
var attrConModSpan = attrConMod.getElementsByTagName('span')[0];
var attrWisMod = document.getElementById('wisMod');
var attrWisModSpan = attrWisMod.getElementsByTagName('span')[0];
var attrChaMod = document.getElementById('chaMod');
var attrChaModSpan = attrChaMod.getElementsByTagName('span')[0];



//INI
var stats = [
	attrStrSpan,
	attrAgiSpan,
	attrIntsSpan,
	attrConSpan,
	attrWisSpan,
	attrChaSpan
];

var mods = [
	attrStrModSpan,
	attrAgiModSpan,
	attrIntsModSpan,
	attrConModSpan,
	attrWisModSpan,
	attrChaModSpan
];

var birodalmi = {
		intBonus: 1,
		conBonus: -1
};

//DOBÓKOCKA

function rollDie(sides){
    return 1 + Math.floor(Math.random()* sides);
 }

 function rollDice(number, sides){
    var total = 0;
    while(number-- > 0) total += rollDie(sides);
    return total;
 }


//GENERÁLÁS

function statok(){

for (var j = 0; j < stats.length;j++){	
		stats[j].innerHTML = rollDice(4,6);
			if (stats[j].innerHTML < 3) 
				{mods[j].innerHTML = -3;} 
				else if (stats[j].innerHTML<6) 
				{mods[j].innerHTML = -2;} 
				else if (stats[j].innerHTML<9) 
				{mods[j].innerHTML = -1;} 
				else if (stats[j].innerHTML<12)
				{mods[j].innerHTML = 0;} 
				else if (stats[j].innerHTML<15) 
				{mods[j].innerHTML = 1;} 
				else if (stats[j].innerHTML<18) 
				{mods[j].innerHTML = 2;} 
				else if (stats[j].innerHTML<24) 
				{mods[j].innerHTML = 3;}
				else
				{mods[j].innerHTML = "hiba";} 
		}
}

var fajGomb = document.getElementById('fajGomb');

var fajValaszto = document.getElementById('fajValaszto');

fajGomb.addEventListener('click', function(e){
	fajGomb.value = fajValaszto.value;
	stats[2].innerHTML = parseInt(stats[2].innerHTML)+parseInt(birodalmi.intBonus);
});




