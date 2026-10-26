let rollenCount = 5;
let mijlpalenCount = 1;
let playtestCount = 1;
let deadlineCount = 1;
let opleverCount = 1;


// Dynamically add rollen
function addRol() {
  rollenCount++;

  const check = document.createElement("input");
  const input = document.createElement("input");

  check.type = "checkbox";
  check.checked = true;
  check.id = "rol" + rollenCount;

  input.type = "text";
  input.placeholder = "Anders, namelijk";
  input.id = "roltext" + rollenCount;

  document.getElementById("rollen").appendChild(check);
  document.getElementById("rollen").appendChild(document.createTextNode(" "));
  document.getElementById("rollen").appendChild(input);
  document.getElementById("rollen").appendChild(document.createElement("br"));
}

// Dynamically add mijlpalen
function addMijlpaal() {
  
  mijlpalenCount++;
  const input = document.createElement("input");

  input.type = "text";
  input.placeholder = "Mijlpaal " + mijlpalenCount;
  input.id = "mijlpaal" + mijlpalenCount;

  document.getElementById("mijlpalen").appendChild(input);
  document.getElementById("mijlpalen").appendChild(document.createElement("br"));
}

// Dynamically add playtests
function addPlaytest() {
  playtestCount++;
  const input = document.createElement("input");

  input.type = "text";
  input.placeholder = "1 jan 1900, 1-1-1900 of week 1";
  input.id = "playtest" + playtestCount;
  input.style = "width:200px";

  document.getElementById("playtestData").appendChild(input);
  document.getElementById("playtestData").appendChild(document.createElement("br"));
}

// Dynamically add deadlines
function addDeadline() {
  deadlineCount++;
  const input = document.createElement("input");
  const input2 = document.createElement("input");
  const checkbox = document.createElement("input");
  const div = document.createElement("div");
  const repeats = document.createElement("input");

  input.type = "text";
  input2.type = "text";
  checkbox.type = "checkbox";
  repeats.type = "number";

  input.placeholder = "Naam deadline";
  input2.placeholder = "1 jan 1900, 1-1-1900 of week 1";

  input.id = "deadline" + deadlineCount;
  input2.id = "deadline" + deadlineCount + "tijd";
  checkbox.id = "deadlineCheck" + deadlineCount;
  div.id = "deadlineText" + deadlineCount;
  checkbox.className = "deadlineText";
  repeats.id = "deadline" + deadlineCount + "herhaling";

  input.style = "width:200px";
  input2.style = "width: 200px";
  repeats.style = "width: 50px";

  div.append("Deze deadline herhaalt zich elke ");
  div.appendChild(repeats);
  div.append(" weken.");
  div.style.display = "none";

  checkbox.addEventListener("change", () => {
        div.style.display = checkbox.checked ? "block" : "none";
});

  document.getElementById("deadlines").appendChild(input);
  document.getElementById("deadlines").appendChild(input2);
  document.getElementById("deadlines").appendChild(document.createElement("br"));
  document.getElementById("deadlines").appendChild(checkbox);
  document.getElementById("deadlines").append("Deze deadline herhaalt zich");
  document.getElementById("deadlines").appendChild(div);
}
// Dynamically add opleverdocumenten
function addOplever() {
  
  opleverCount++;
  const input = document.createElement("input");

  input.type = "text";
  input.placeholder = "GDD";
  input.id = "oplever" + opleverCount;

  document.getElementById("opleverText").appendChild(input);
  document.getElementById("opleverText").appendChild(document.createElement("br"));
}

// Sla alle ingevulde informatie op in localStorage en ga naar result.html
function create8FE() {

    localStorage.setItem("invtoPlay", document.getElementById("opdrachtbeschrijving").value);

    let groep = document.getElementById("groepsproj").checked;
    localStorage.setItem("groepsprojCheck", groep);
    if(groep){
      localStorage.setItem("groepsgrootte", document.getElementById("groepsgrootte").value);
    }

    //get all rolls and save them with their id, type and value
    let rollen = document.getElementById("rollen").children;
    let rolData = [];

    for (let rol of rollen) {

      if (rol.type === "checkbox") {
        rolData.push({
            id: rol.id,
            type: "checkbox",
            value: rol.checked
        });

      } else if (rol.type === "text") {
        rolData.push({
            id: rol.id,
            type: "text",
            value: rol.value
        });
      }
    }
    localStorage.setItem("rollen", JSON.stringify(rolData));

    let mijlpalen = document.getElementById("mijlpalen").children;

    let mijlData = [];

    for (let mijlpaal of mijlpalen) {
      if (mijlpaal.tagName === "BR") //don't save the breaks
        continue;
      mijlData.push(mijlpaal.value);
}
localStorage.setItem("mijlpalen", JSON.stringify(mijlData));

localStorage.setItem("der1", document.getElementById("der1").checked);
localStorage.setItem("der2", document.getElementById("der2").checked);
localStorage.setItem("der3", document.getElementById("der3").checked);


localStorage.setItem("lesonderdelen", document.getElementById("lesonderdelen").value);

// Scrum
localStorage.setItem("scrum", document.getElementById("scrum").checked);
localStorage.setItem("scrumLength", document.getElementById("sprintLength").value);
localStorage.setItem("burndown", document.getElementById("burndown").checked);

// Playtests
localStorage.setItem("playtest", document.getElementById("playtest").checked);

let playtestData = document.getElementById("playtestData").children;
let playData = [];
for (let play of playtestData) {
      if (play.tagName === "BR") // don't save the breaks
        continue;
      playData.push(play.value);
}
localStorage.setItem("playData", JSON.stringify(playData));

localStorage.setItem("begin", document.getElementById("begindatum").value);
localStorage.setItem("eind", document.getElementById("einddatum").value);

// Deadlines
let deadlinesAll = document.querySelectorAll("#deadlines input");;
let deadlines = [];
for (let d of deadlinesAll) {
      if (d.tagName === "BR") // don't save the breaks
        continue;
      if (d.type === "checkbox")
        deadlines.push(d.checked);
      else
        deadlines.push(d.value);
}
localStorage.setItem("deadlines", JSON.stringify(deadlines));

// Boundaries
localStorage.setItem("taal", document.querySelector('input[name="language"]:checked').value);
localStorage.setItem("2D", document.querySelector('input[name="2D"]:checked').value);

// Deliverables
let deliverables = document.getElementById("opleverText").children;

    let delData = [];

    for (let d of deliverables) {
      if (d.tagName === "BR") //don't save the breaks
        continue;
      delData.push(d.value);
}
localStorage.setItem("deliverables", JSON.stringify(delData));

// Go to the result page
window.location.href = "result.html";
}