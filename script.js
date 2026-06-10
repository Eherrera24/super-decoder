const COLORS = {
    1:"#ff5555",
    2:"#ffe24d",
    3:"#b455ff",
    4:"#57ffff"
};

let secret = [];
let current = [];
let attempts = [];

function generateSecret(){
    secret = [];

    for(let i=0;i<4;i++){
        secret.push(Math.floor(Math.random()*4)+1);
    }
}

function createBoard(){

    const rows = document.getElementById("rows");
    const hints = document.getElementById("hints");

    rows.innerHTML = "";
    hints.innerHTML = "";

    for(let r=0;r<8;r++){

        const row = document.createElement("div");
        row.className = "row";

        for(let c=0;c<4;c++){

            const cell = document.createElement("div");
            cell.className = "cell";

            row.appendChild(cell);
        }

        rows.appendChild(row);

        const hint = document.createElement("div");
        hint.className = "hintRow";

        for(let i=0;i<4;i++){

            const dot = document.createElement("div");
            dot.className = "dot";

            hint.appendChild(dot);
        }

        hints.appendChild(hint);
    }
}

function addColor(color){

    if(current.length >=4) return;

    current.push(color);

    render();
}

function clearGuess(){

    current = [];

    render();
}

function render(){

    const row = document.querySelectorAll(".row")[attempts.length];

    if(!row) return;

    const cells = row.children;

    for(let i=0;i<4;i++){

        cells[i].style.background =
            current[i]
            ? COLORS[current[i]]
            : "#333";
    }
}

function submitGuess(){

    if(current.length !==4) return;

    let exact = 0;
    let partial = 0;

    let s = [...secret];
    let g = [...current];

    for(let i=0;i<4;i++){

        if(g[i] === s[i]){

            exact++;

            s[i]=null;
            g[i]=null;
        }
    }

    for(let i=0;i<4;i++){

        if(g[i]!==null){

            const pos = s.indexOf(g[i]);

            if(pos!==-1){

                partial++;

                s[pos]=null;
            }
        }
    }

    attempts.push([...current]);

    const hintRow =
        document.querySelectorAll(".hintRow")[attempts.length-1];

    let index = 0;

    for(let i=0;i<exact;i++){

        hintRow.children[index++]
            .classList.add("green");
    }

    for(let i=0;i<partial;i++){

        hintRow.children[index++]
            .classList.add("white");
    }

    if(exact===4){

        document.getElementById("status")
            .innerHTML="🏆 GANASTE";

        return;
    }

    current=[];

    render();
}

function newGame(){

    current=[];
    attempts=[];

    generateSecret();
    createBoard();

    document.getElementById("status").innerHTML="";
}

newGame();
