let secret = [];
let current = [];

function generateSecret(){
    secret = [];

    for(let i=0;i<4;i++){
        secret.push(Math.floor(Math.random()*4)+1);
    }

    console.log(secret);
}

generateSecret();

function addColor(color){

    if(current.length >= 4) return;

    current.push(color);

    updateBoard();
}

function updateBoard(){

    let slots = document.querySelectorAll(".slot");

    slots.forEach(slot=>{
        slot.style.background="#222";
    });

    current.forEach((c,i)=>{

        let color = "";

        if(c===1) color="red";
        if(c===2) color="blue";
        if(c===3) color="limegreen";
        if(c===4) color="gold";

        slots[i].style.background=color;
    });
}

function clearGuess(){
    current=[];
    updateBoard();
}

function submitGuess(){

    if(current.length !==4){
        alert("Selecciona 4 colores");
        return;
    }

    let exact = 0;
    let partial = 0;

    let s=[...secret];
    let g=[...current];

    for(let i=0;i<4;i++){

        if(g[i]===s[i]){
            exact++;
            s[i]=null;
            g[i]=null;
        }
    }

    for(let i=0;i<4;i++){

        if(g[i]!==null){

            let pos=s.indexOf(g[i]);

            if(pos!==-1){
                partial++;
                s[pos]=null;
            }
        }
    }

    let line =
    `Intento: ${current.join("")}
     🎯 ${exact}
     🟡 ${partial}`;

    document.getElementById("history").innerHTML =
        line + "<hr>" +
        document.getElementById("history").innerHTML;

    if(exact===4){

        document.getElementById("result").innerHTML =
        "🏆 ¡GANASTE!";

        return;
    }

    current=[];
    updateBoard();
}

function newGame(){

    generateSecret();

    current=[];

    updateBoard();

    document.getElementById("history").innerHTML="";

    document.getElementById("result").innerHTML="";
}