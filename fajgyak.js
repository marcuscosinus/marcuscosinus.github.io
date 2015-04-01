//A karakter objektum tartalmaz minden értéket,
//csoportosítva.
var karakter = {

    primary:{
        str: 0,
        agi: 0,
        ints: 0,
        con: 0,
        wis: 0,
        cha: 0
    },

//A 'mods' alapjáraton üres. A 'primary' értékeiből [str,agi..stb]
//fog kiszámítódni, for-in ciklussal. Úgy sikerült összehozni,
//hogy a 'primary' neveit bemásolja az objektve, az értékeit pedig
//kiszámolja (ld. később)
    mods:{

    },

    secondary:{
        diceOfClass: 0,     //HP dobáshoz a kocka típusa
        hp: 0,
        vo: 0,
        attack: 0,
        kozelharci: 0,
        tavolsagi: 0,
        kitart:0,
        refl: 0,
        akae: 0             //Akaraterő
        //kasztSzorzo: 0
    },

    spec: null,             //faj
    kaszt: null,
    level: 3,               //kezdő karakternek ajánlott a 3. szint


//Future feature
    skills:{

    },

//A karakter főtulajdonságainak kiszámítása. Minden egyes
//tulajdonságnak dob egy 4d6-ot.
    init :  function(){
                for (var stats in karakter.primary){
                        karakter.primary[stats] = rollDice(4,6);
                }
    },

//Itt jön a varázslat. Bemenete a 'karakter.primary' lesz.
//Annak minden elemével feltölti a 'karakter.mods'-ot,
//értéke viszont változni fog az eredetitől függően.
    setMod : function(stats){
                    
                for ( stats in karakter.primary){
                    var cache = karakter.primary[stats];
                            if (cache < 3)
                                {karakter.mods[stats] = -3;}
                                else if (cache<6)
                                {karakter.mods[stats] = -2;}
                                else if (cache<9)
                                {karakter.mods[stats] = -1;}
                                else if (cache<12)
                                {karakter.mods[stats] = 0;}
                                else if (cache<15)
                                {karakter.mods[stats] = 1;}
                                else if (cache<18)
                                {karakter.mods[stats] = 2;}
                                else if (cache<25)
                                {karakter.mods[stats] = 3;}
                                else
                                {karakter.mods[stats] = "hiba";}
                }
    },

//A HP számításához kell a szint, az egészség módosító ['karakter.mods.con']
//és a kaszthoz HP-hoz tartozó kocka oldalszáma.    
    setHP: function (level, conMod, diceOfClass) {  
        total = diceOfClass +
                rollDice(level - 1, diceOfClass) +
                (level * conMod);
        return total;
    },

//A védelmi érték ['karakter.secondary.vo'] 10 + Ügyesség módosító ['karakter.mods.agi']    
    setVO: function (agiMod) {
        total = 10 + agiMod;
        return total;
    },
 
 //Beállítja a kaszttól és szinttől függő alap Támadóerőt   
    setAttackMod: function (level, kasztSzorzo) {
        /*this.level = level;
        this.kasztSzorzo = kasztSzorzo;*/
        return Math.floor(level * kasztSzorzo);
    },
 
 //Beállítja a Közelharci támadóerőt   
    setKozelharc: function () {
        return  karakter.mods.str + 
                karakter.secondary.attack;
    },
 
 //Beállítja a Távolsági támadóerőt       
    setTavolsag: function () {
        return karakter.mods.agi +
                karakter.secondary.attack;
    },
 
 //A mentő módosítók [akaraterő,reflex,kitartás] két táblázatból számolható ki.
 //A 2. oszlopban találtam mintát, ezért tömb helyett függvényt csináltam neki   
    setMM2: function (level) {
      return Math.floor(level/3);  
    },

//FAJBÓL JÖVŐ BÓNUSZOK
//Fajtól függően növekszik/csökken egy-egy Főtulajdonság értéke
    getSpecies: function(specie) {
      switch (specie) {
        case "Ember":
            break;
        case "Amazon":
            break;
        case "Birodalmi":
            karakter.primary.ints += 1;
            karakter.primary.con -= 1;
            break;
        case "Etúniai":
            karakter.primary.con += 1;
            karakter.primary.wis -= 1;
            break;
        case "Északi":
            karakter.primary.str += 1;
            karakter.primary.wis -= 1;
            break;
        case "Ősember":
            karakter.primary.str += 1;
            karakter.primary.con += 1;
            karakter.primary.ints -= 1;
            karakter.primary.wis -= 1;
            break;
        case "Elf":
            karakter.primary.agi += 1;
            karakter.primary.con -= 1;
            break;
        case "Félelf":
            break;
        case "Félork":
            karakter.primary.str += 1;
            karakter.primary.con += 1;
            karakter.primary.cha -= 2;
            break;
        case "Félszerzet":
            karakter.primary.agi +=1;
            karakter.primary.str -=1;
            karakter.secondary.vo += 1;
            break;
        case "Gnóm":
            karakter.primary.ints += 1;
            karakter.primary.str -= 1;
            break;
        case "Törpe":
            karakter.primary.con += 1;
            karakter.primary.cha -= 1;
            break;
        }

    karakter.setMod(karakter.primary);      //A módosítók ['karakter.mods'] kiszámítása
    console.log(karakter.primary);          //  amint ki lett választva a faj
    console.log(karakter.mods);  
    },
 
 //Kaszttól függően értéket kap a 'diceOfClass' és az alap Támadóerő   
    getClass: function(kaszt) {
        switch (kaszt) {
                case "Harcos": 
                case "Íjász": 
                case "Amazon": 
                case "Tengerész/Kalóz":
                case "Barbár":
                    karakter.secondary.diceOfClass = 10;
                    karakter.secondary.attack = 
                    karakter.setAttackMod(karakter.level, 1);
                    
                    karakter.secondary.kitart = 
                    karakter.setMM2(karakter.level);
                    karakter.secondary.akae = 
                    mento1[karakter.level];
                    karakter.secondary.refl =
                    mento1[karakter.level];
                    break;
                case "Pap":
                    karakter.secondary.diceOfClass = 8;
                    karakter.secondary.attack = 
                    karakter.setAttackMod(karakter.level, 0.67);
                    
                    karakter.secondary.kitart =
                    mento1[karakter.level];
                    karakter.secondary.akae = 
                    mento1[karakter.level];
                    karakter.secondary.refl = 
                    karakter.setMM2(karakter.level);
                    break;
                case "Tolvaj":
                    karakter.secondary.diceOfClass = 6;
                    karakter.secondary.attack = 
                    karakter.setAttackMod(karakter.level, 0.67);
                    
                    karakter.secondary.refl =
                    mento1[karakter.level];
                    karakter.secondary.kitart = 
                    karakter.setMM2(karakter.level);
                    karakter.secondary.akae = 
                    karakter.setMM2(karakter.level);
                    break;
                case "Varázsló":
                    karakter.secondary.diceOfClass = 4;
                    karakter.secondary.attack = 
                    karakter.setAttackMod(karakter.level, 0.5);
                
                    karakter.secondary.akae = 
                    mento1[karakter.level];
                    karakter.secondary.kitart =
                    karakter.setMM2(karakter.level);
                    karakter.secondary.refl =
                    karakter.setMM2(karakter.level);
                    break;
        }
    }

}

//      KOCKA
function rollDie(sides){
    return 1 + Math.floor(Math.random()* sides);
 }

 function rollDice(number, sides){
    var total = 0;
    while(number-- > 0) total += rollDie(sides);
    return total;
 }


//Mentőmódosító 1. oszlop
//Itt nem találtam használható mintát, sima tömbbe került.
var mento1 = [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10];


//Bolondbiztosítás alapfokon
var statcheck = false;
var kasztcheck = false;
var fajcheck = false;

//Karakter incializálás, kiszámolja a fő statokat.
//A setMod paramétere a fő statokat tartalmazó object,
//azokból kiszámolja a módosítókat.
//
jQuery(document).ready(function() {
    
    $('#level').click(function(event) {
        karakter.level = Number($('#level').val());
    });
    
    $('#statroll').click(function(event) {
        karakter.init();                        //Főtulajdonságok
        karakter.setMod(karakter.primary);      //Módosítók
        statcheck = true;
        console.log(karakter.primary);
        console.log(karakter.mods);
        $('#str').text(karakter.primary.str);   //HTML-be írás
        $('#agi').text(karakter.primary.agi);
        $('#ints').text(karakter.primary.ints);
        $('#con').text(karakter.primary.con);
        $('#wis').text(karakter.primary.wis);
        $('#cha').text(karakter.primary.cha);
        $('#strMod').text(karakter.mods.str);
        $('#agiMod').text(karakter.mods.agi);
        $('#intsMod').text(karakter.mods.ints);
        $('#conMod').text(karakter.mods.con);
        $('#wisMod').text(karakter.mods.wis);
        $('#chaMod').text(karakter.mods.cha);
        $('#statroll').hide();

    });

    $('#fajGomb').click(function(event) {
        
        if (fajValaszto.value != "null") {           //ha választott fajt
            karakter.spec = fajValaszto.value;      //faj tárolódik
            fajcheck = true;
            $('#fajGomb').hide();
        };
        
    });

    $('#reset').click(function(event) {
        location.reload(true);                  //újratölti az oldalt
    });
    
    $('#kasztGomb').click(function(event) {
        
        if (kasztValaszto.value != "null") {         //ha választott kasztot
            karakter.kaszt = kasztValaszto.value;   //kaszt tárolódik
            kasztcheck = true;
            $('#kasztGomb').hide();
        };
       
        
    });

    $('#generator').click(function(event) {
        if (statcheck && fajcheck && kasztcheck) {   //ha van stat, kaszt, faj választva
            karakter.getSpecies(karakter.spec);     //fajtól függő értékek kiszámolódnak
            karakter.getClass(karakter.kaszt);      //kaszttól függő értékek kiszámolódnak
            karakter.secondary.hp = 
            karakter.setHP(karakter.level, karakter.mods.con, karakter.secondary.diceOfClass);
            karakter.secondary.vo = karakter.setVO(karakter.mods.agi);
            karakter.secondary.kozelharci = karakter.setKozelharc();
            karakter.secondary.tavolsagi = karakter.setTavolsag();
            console.log("HP:", karakter.secondary.hp);
            console.log("VO:", karakter.secondary.vo);
            console.log("Közelharci:", karakter.secondary.kozelharci);
            console.log("Távolsági:", karakter.secondary.tavolsagi);
            $('#hp').text(karakter.secondary.hp);   //minden másodlagos érték HTML-be írása
            $('#vo').text(karakter.secondary.vo);
            $('#kozelharci').text(karakter.secondary.kozelharci);
            $('#tavolsagi').text(karakter.secondary.tavolsagi);
            $('#kitartas').text(karakter.secondary.kitart);
            $('#reflex').text(karakter.secondary.refl);
            $('#akaratero').text(karakter.secondary.akae);
        };

        
    })

 });

//A csíny letudva