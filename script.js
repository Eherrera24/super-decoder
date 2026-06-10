const colors={1:'#ff6666',2:'#ffe04d',3:'#b666ff',4:'#66ffff'};
let secret=[],current=[],rowIndex=0,level=1;
function build(){
let b=document.getElementById('board'),h=document.getElementById('hints');
b.innerHTML='';h.innerHTML='';
for(let r=0;r<8;r++){
let row=document.createElement('div');row.className='row';
for(let c=0;c<4;c++){let d=document.createElement('div');d.className='cell';row.appendChild(d);}
b.appendChild(row);
let hr=document.createElement('div');hr.className='hrow';
for(let i=0;i<4;i++){let x=document.createElement('div');x.className='dot';hr.appendChild(x);}
h.appendChild(hr);
}
newGame();
}
function newGame(){
secret=[];current=[];rowIndex=0;
for(let i=0;i<4;i++) secret.push(Math.floor(Math.random()*4)+1);
document.getElementById('status').textContent='';
document.getElementById('display').textContent=String(level).padStart(3,'0');
buildBoardClear();
}
function buildBoardClear(){
document.querySelectorAll('.cell').forEach(c=>c.style.background='#333');
document.querySelectorAll('.dot').forEach(d=>d.className='dot');
}
function pick(c){
if(current.length<4){current.push(c);renderCurrent();}
}
function renderCurrent(){
let row=document.querySelectorAll('.row')[rowIndex];
if(!row) return;
[...row.children].forEach((x,i)=>x.style.background=current[i]?colors[current[i]]:'#333');
}
function clearGuess(){current=[];renderCurrent();}
function sendGuess(){
if(current.length!==4)return;
let s=[...secret],g=[...current],e=0,p=0;
for(let i=0;i<4;i++){if(g[i]===s[i]){e++;g[i]=null;s[i]=null;}}
for(let i=0;i<4;i++){if(g[i]!=null){let pos=s.indexOf(g[i]);if(pos!=-1){p++;s[pos]=null;}}}
let hr=document.querySelectorAll('.hrow')[rowIndex];
let idx=0;
for(let i=0;i<e;i++)hr.children[idx++].classList.add('green');
for(let i=0;i<p;i++)hr.children[idx++].classList.add('white');
if(e===4){document.getElementById('status').textContent='🏆 ¡Ganaste!';level++;return;}
rowIndex++;current=[];
}
document.getElementById('knob').onclick=()=>newGame();
build();
