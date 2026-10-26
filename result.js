//get the checkbox for groupwork
let groepCheck = localStorage.getItem("groepsprojCheck") == "true";
let grouped = "solo";

document.getElementById("invitationToPlay").textContent = localStorage.getItem("invtoPlay");

if(groepCheck){
    document.getElementById("groepsproject").textContent = "Dit is een groepsproject. Groepen bestaan uit " 
    + localStorage.getItem("groepsgrootte") + " studenten. Samen ben je verantwoordelijk voor een mooi eindproduct." 
    + " Minstens zo belangrijk als het eindproduct is de mate waarin jullie samenwerken.";
}
else{
    document.getElementById("groepsproject").textContent = "Dit is een solo project. Je hebt zelf volledig de regie in handen en bent dus ook volledig zelf verantwoordelijk voor je eindproduct.";
}


if(groepCheck) {
    grouped = "samen";
}
document.getElementById("playerTasks").textContent = "Je gaat " + grouped  + " door het hele game development proces heen. Vanaf het concept tot een speelbaar prototype."

grouped = "";
if(groepCheck) {
    grouped = " (of iemand uit je groep)";
}

let taskText = "Tijdens dit project neem jij" + grouped + " de volgende rollen aan: ";

// The first 4 roles are predefined, for the rest we check if it's checked
let rolData = JSON.parse(localStorage.getItem("rollen"));

for (let rol of rolData) {
    if(rol.id == "rol1" && rol.value == true)
        taskText += "Developer, ";
    else if(rol.id == "rol2" && rol.value == true)
        taskText += "Designer, ";
    else if(rol.id == "rol3" && rol.value == true)
        taskText += "Scrum Master, ";
    else if(rol.id == "rol4" && rol.value == true)
        taskText += "Product Owner, ";
    //If you're checking a textfield, check whether the checkbox is marked before adding it.
    else if (rol.id.startsWith("roltext")) {
        let number = rol.id.replace("roltext", "");
        let matchingCheckbox = rolData.find(
            item => item.id === "rol" + number
        );
        if (matchingCheckbox && matchingCheckbox.value) {
            taskText += rol.value + ", ";
            
        }
    }
}
document.getElementById("rollen").textContent = taskText;

//mijlpalen
let mijlData = JSON.parse(localStorage.getItem("mijlpalen"));
let mijlpaaltext = "Tijdens dit project moet je de volgende ";
if (mijlData.length > 1)
    mijlpaaltext += "mijlpalen";
else
    mijlpaaltext += "mijlpaal";
mijlpaaltext += " behalen:\n";
for(let mijl of mijlData) {
    mijlpaaltext += mijl + "\n";
}
document.getElementById("doelen").textContent = mijlpaaltext;

// Add what is and isn't allowed to their correct category
let wel = "";
let niet = "";

if(localStorage.getItem("der1") == "true")
    wel += "code snippets of code uit tutorials.\n";
else
    niet += "code snippets of code uit tutorials.\n";
if(localStorage.getItem("der2") == "true")
    wel += "AI-gegenereerde code.\n";
else
    niet += "AI-gegenereerde code.\n";
if(localStorage.getItem("der3") == "true")
    wel += "Audio en andere art assets.\n";
else
    niet += "Audio en andere art assets.\n";

//make it clear what each category is or give a special message if either is empty
if(wel.length > 1)
    wel = "Het volgende werk van derden is toegestaan (zolang het niet om je main mechanic gaat) en je het juist gecredit hebt:\n" + wel;
else
    wel = "Het is niet toegestaan om enig werk van derden te gebruiken."
if(niet.length > 1)
    niet = "Het volgende werk van derden is niet toegestaan zelfs niet als het juist gecredit is:\n" + niet;
else
    niet = "Al het werk van derden is toegestaan. Deze module zal minder focussen op het zelfgemaakte werk.";
document.getElementById("magWel").textContent = wel;
document.getElementById("magNiet").textContent = niet;

document.getElementById("lesonderdelen").textContent = "In de lessen zullen we het volgende behandelen:\n" +
localStorage.getItem("lesonderdelen");

// Scrum
let scrumming = localStorage.getItem("scrum");
let scrumText = document.getElementById("scrum").textContent;
if(scrumming == "true") {
    scrumText = "Binnen deze module zal je gebruikmaken van de scrum-methode.";
    if(!grouped)
        scrumText += "Ondanks dat je in dit project alleen werkt is het een goede oefening voor wanneer je in een groep werkt.";
    scrumText += "\nBinnen deze module duren de sprints " + localStorage.getItem("scrumLength") + " weken.";
    if(localStorage.getItem("burndown") == "true") {
        scrumText += "\nOok verwachten we dat je een burndown-chart bijhoudt."
    }
}
else
    scrumText = "Voor deze opdracht hoef je geen gebruik te maken van de scrum-methode."
document.getElementById("scrum").textContent = scrumText;

// Playtests
let playTesting = localStorage.getItem("playtest");
let playText = ""
if(playTesting == "true") {
    playText = "Er wordt verwacht dat je zelf een paytest afneemt. \nDe playtest";
    let playData = JSON.parse(localStorage.getItem("playData"));
    if(playData.length > 1)
        playText += "s zijn";
    else
        playText += " is";
    playText += " gepland voor:\n";
    for(let p of playData) {
        playText += p + "\n";
    }
    document.getElementById("playtest").textContent = playText;
}
else
    document.getElementById("playtest").textContent = "Je hoeft zelf geen playtests te organiseren."

// Begin and end dates.
document.getElementById("begineind").textContent = "De module begint " 
+ localStorage.getItem("begin") + " en eindigd " + localStorage.getItem("eind") + ".";

// Deadlines
let fullDeadlines = JSON.parse(localStorage.getItem("deadlines"));
let deadlines = "Tijdens deze module moet je rekening houden met de volgende deadline";
if(deadlines.length > 4)
    deadlines += "s";
deadlines += ":";
let index = 0;
let temp = "";
for(let d of fullDeadlines){
    if(index % 4 == 0)
        deadlines += "\n" + d;
    else if(index % 4 == 1)
        deadlines += " moet ingeleverd/door de docent gecheckt worden vóór " + d + "\n";
    if(index % 4 == 2)
        temp = d;
    if(index % 4 == 3 && temp)
        deadlines += "Deze deadline herhaalt zich elke " + d + " weken.\n";
    index++;
}
document.getElementById("deadlines").textContent = deadlines;

// Conflict
if(grouped) {
    document.getElementById("conflict").textContent = "Dit is een groepsproject. Dat betekent dat je de plicht aan jezelf en je groepsgenoten hebt om afspraken te maken en na te komen over gedrag en communicatie. Denk hierbij aan het opstellen van een 'definition of fun'. Ook is het belangrijk dat iedereen op 1 lijn zit wat betreft wat jullie gaan maken en hoe. Hierom is het maken van een GDD en een TDD belangrijk."
}
else
    document.getElementById("conflict").textContent = "Ondanks dat dit een solo-project is het belangrijk van te voren voor jezelf duidelijk te hebben wat je gaat maken en hoe. Hierom is het maken van een GDD en een TDD belangrijk."

// Language
let taal = localStorage.getItem("taal");
let taalText = "Alle officiële communicatie naar de klant is in het " + taal 
+ ". Dat betekent dat presentaties en andere deliverables in het " + taal + " worden verwacht.";
if(taal == "Engels")
    taalText += " Je mag nog steeds vragen stellen in het Nederlands als je vast zit."
document.getElementById("taal").textContent = taalText;

// 2D/3D
let dim = localStorage.getItem("2D");
if(dim != "nvt") {
    document.getElementById("2DTitle").textContent = dim;
    if(dim == "2D")
        document.getElementById("2D").textContent = "Het gehele spel moet in 2D gemaakt worden.";
    else if(dim == "3D")
        document.getElementById("2D").textContent = "Het spel zelf moet in 3D gemaakt worden, maar de UI is natuurlijk gewoon 2D.";
    else
        document.getElementById("2D").textContent = "Je mag zelf kiezen of het spel 2D of 3D wordt. Beslis dit wel vroeg in het proces, want later wisselen is niet makkelijk.";
}

// Deliverables
let delData = JSON.parse(localStorage.getItem("deliverables"));
let deltext = "Aan het eind van deze module lever je het volgende op:\n ";
for(let d of delData) {
    deltext += d + "\n";
}
document.getElementById("opleveren").textContent = deltext;