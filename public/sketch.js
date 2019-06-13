var points = [];
var wires = new Array(50);
var depth = new Array(50);
let mpressing,mpress, spress, dpress, wireClicking = false, apress=false;
class Wire {
    constructor(v, r, from, to, id,type,limit) {
        this.ohm = r;
        this.volt = v;
        this.from = from;
        this.to = to;
        this.id = id;
        this.on = false;
        this.clicking = false;
        this.type = type;
        this.limit = limit;
    }

    show() {
        if(this.onMouse()==true||this.clicking==true) this.on=true;
        else this.on = false;
        if(this.type==0) {
            if (this.on ==true) {
                stroke(255, 0, 0);
            } else {
                stroke(0);
            }
            strokeWeight(10*zoom);
            line(points[this.from].location.x, points[this.from].location.y, points[this.to].location.x, points[this.to].location.y);
        }
        else if(this.type==2){
            if (this.on == true) {
                stroke(255,0, 0);
            } else {
                stroke(0);
            }
            strokeWeight(10*zoom);
            line(points[this.from].location.x, points[this.from].location.y, points[this.to].location.x, points[this.to].location.y);
            let power = Math.abs(C[this.id])*this.ohm*this.ohm;
            if(power>25) fill(255,255,0);
            else fill(power*10,power*10,0);
            strokeWeight(2*zoom);
            stroke(0);
            ellipse((points[this.from].location.x + points[this.to].location.x) / 2 , (points[this.from].location.y + points[this.to].location.y) / 2,50*zoom,50*zoom);
        }
        else if(this.type==1){
            if (this.on ==true) {
                stroke(0, 0, 255);
            } else {
                stroke(100);
            }
            strokeWeight(10*zoom);
            line(points[this.from].location.x, points[this.from].location.y, points[this.to].location.x, points[this.to].location.y);
        }
        if(spress==true&&apress==false) {
            fill(255);
            textSize(20*zoom);
            strokeWeight(2*zoom);
            stroke(255);
            if(points[this.from].type==0&&points[this.to].type==0) text("v : " + this.volt + " R : " + this.ohm, (points[this.from].location.x + points[this.to].location.x) / 2 - 50, (points[this.from].location.y + points[this.to].location.y) / 2);
        }
        else if(apress==true){
            fill(255);
            textSize(20*zoom);
            strokeWeight(2*zoom);
            stroke(255);
            if(points[this.from].type==0&&points[this.to].type==0) text("I : " + C[this.id], (points[this.from].location.x + points[this.to].location.x) / 2 - 50, (points[this.from].location.y + points[this.to].location.y) / 2);
        }
    }
    onMouse()
    {
        if(points[this.from].type==1||points[this.to].type==1) return false;
        if(wireClicking==true) return false;
        let mp = createVector(mouseX, mouseY);
        mp.sub(points[this.from].location);
        let dir = points[this.to].location.copy();
        dir.sub(points[this.from].location);
        dir.normalize();
        let nm = p5.Vector.dot(dir,mp);
        if(nm<0) return false;
        dir.mult(nm);
        mp.sub(dir);
        if(mp.mag()<10&&dir.mag()>points[this.from].socSize/2&&dir.mag()<p5.Vector.sub(points[this.to].location,points[this.from].location).mag()-points[this.to].socSize/2) return true;
        return false;
    }
    setId(id) {
        this.id = id;
    }
    setDir(from, to) {
        this.from = from;
        this.to = to;
    }
}
class Point {
    constructor(l, num, type) {
        this.location = l.copy();
        this.id = num;
        this.socSize = 50;
        this.color = color(180);
        this.click = false;
        this.type=type;
    }
    show() {
        stroke(0);
        strokeWeight(5*zoom);
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.socSize*zoom, this.socSize*zoom);
        fill(0);
        strokeWeight(0);
        textSize(30*zoom);
        if (this.type == 0) {
            if(this.id<10) {
                text("" + this.id, this.location.x - 10 * zoom, this.location.y + 10 * zoom);
            }
            else{
                textSize(25 * zoom);
                 text("" + this.id, this.location.x - 15 * zoom, this.location.y + 9 * zoom);
            }
        }
        else text("V̲", this.location.x - 11 * zoom, this.location.y + 10 * zoom);
    }
    setPos(x, y) {
        this.location.x = x;
        this.location.y = y;
    }
    clicked(){
        this.click = true;
        this.color=color(119,255,190);
    }
    unclicked(){
        this.click = false;
        this.color=color(180);
    }
}
class MyBtn{
    constructor(x, y, w, h,id)
    {
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.id=id;
        this.onMouse=false;
        this.clicking = false;
    }
    inside(){
        if(this.x<=mouseX&&mouseX<=this.x+this.w&&this.y<=mouseY&&mouseY<=this.y+this.h) return true;
        return false;
    }

    show(){
        if(this.inside()==true||this.clicking==true) this.onMouse = true;
        else this.onMouse = false;

        if(this.onMouse==true) fill(50);
        else fill(150);
        strokeWeight(0);
        rect(this.x,this.y,this.w,this.h);

        if(this.id==0)
        {
            strokeWeight(6);
            if(this.onMouse==true) {
                stroke(150);
                fill(255);
            }
            else {
                fill(180);
                stroke(0);
            }
            ellipse(this.x+this.w/2, this.y+this.h/2, this.w*2/3,this.h*2/3);
        }
        else if(this.id==1){
            if(this.onMouse==true){
                fill(200);
                push();
                translate(this.x+15, this.y+40);
                quad(0,0,40,0,30,30,0,30);
                quad(50,0,80,0,80,30,40,30);
                pop();
            }
            else{
                fill(50);
                push();
                translate(this.x+15, this.y+40);
                rect(0,0,80,30);
                pop();
            }
        }
        else if(this.id==2){
            if(this.onMouse==true) fill(200);
            else fill(100);
            rect(this.x+45,this.y+50,20,50);
            if(this.onMouse==true){
                strokeWeight(0);
                fill(255,255,0);
            }
            else{
                strokeWeight(2);
                stroke(0);
                fill(230);
            }
            ellipse(this.x+this.w/2,this.y+this.h/2-10,this.w/2,this.w/2);
        }
        else if(this.id==3) {
            if (this.onMouse == true) {
                stroke(255);
                fill(50);
            } else {
                stroke(0);
                fill(150);
            }
            strokeWeight(3);
            ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w * 2 / 3, this.w * 2 / 3);
            if (this.onMouse == true) fill(255);
            else fill(0);
            textSize(50);
            strokeWeight(0);
            text("V̲", this.x + 36, this.y + 69);
        }
    }
}
let Btns = [];
let A = [], B = [], X = [], C = [], die = [];
let CC = [];
let pv, path, cnt = 0;
let lastClick=-1;
let curVolt = 1.0, curOhm = 1.0;
let voltSlider,ohmSlider,connectBtn,disconnectBtn,deleteBtn,wireOhmSlider,wireVoltSlider,wireLimitSlider,limitSlider;
let befPoint = [],befWire=-1,btnChoice=-1;
let zoom=1.0;
function setup() {
    createCanvas(1500, 700);
    points.push(new Point(createVector(100, 100), 0,0));
    points.push(new Point(createVector(300, 100), 1,0));
    points.push(new Point(createVector(100, 300), 2,0));
    points.push(new Point(createVector(300, 300), 3,0));
    clicking = [];
    for(let i=0;i<points.length;i++) clicking.push(0);
    for (var i = 0; i < 100; i++) {
        wires[i] = new Array(100);
    }
    mpress = false;
    spress = false;
    dpress = false;
    mpressing = false;
    zoom=1.0;
    wires[0][1] = new Wire(0, 1, 0, 1, 0,0,0);
    wires[0][2] = new Wire(2, 0, 0, 2, 1,0,0);
    wires[1][2] = new Wire(0, 1, 1, 2, 2,0,0);
    wires[2][3] = new Wire(0, 0, 2, 3, 3,0,0);
    depth[0] = 1;
    voltSlider = createSlider(-10,10,0, 0.1);
    ohmSlider = createSlider(0,10,0,0.1);
    wireOhmSlider = createSlider(0,10,0,0.1);
    wireVoltSlider = createSlider(-10,10,0,0.1);
    wireLimitSlider = createSlider(0,50,0,0.1);
    limitSlider = createSlider(0,50,0,0.1);
    connectBtn = createButton('Connect');
    connectBtn.size(100,40);
    connectBtn.style('font-size', '17px');
    connectBtn.mousePressed(connect);
    disconnectBtn = createButton('Disconnect');
    disconnectBtn.size(100,40);
    disconnectBtn.style('font-size', '17px');
    disconnectBtn.mousePressed(disconnect);
    deleteBtn = createButton('Delete');
    deleteBtn.size(100,40);
    deleteBtn.style('font-size', '17px');
    deleteBtn.mousePressed(deletePoints);

    voltSlider.position(1290,50);
    ohmSlider.position(1290,120);
    connectBtn.position(1253,190);
    disconnectBtn.position(1373,190);
    deleteBtn.position(1310,550);
    limitSlider.position(1290,50);
    wireVoltSlider.position(1290,610);
    wireLimitSlider.position(1290,610);
    wireOhmSlider.position(1290,640);

    Btns.push(new MyBtn(1240,250,110,110,0));
    Btns.push(new MyBtn(1360,250,110,110,1));
    Btns.push(new MyBtn(1240,370,110,110,2));
    Btns.push(new MyBtn(1360,370,110,110,3));
    recalc();
}
function recalc(){
    cnt=0;
    let newName = new Array(points.length);
    let newPoints = [];
    for (let i = 0; i < points.length; i++){
        if(points[i]!=null) newPoints.push(points[i]);
    }
    points=newPoints;
    for(let i=0;i<points.length;i++){
        newName[points[i].id]=i;
        points[i].id=i;
    }
    for(let i=0;i<points.length;i++){
        for(let j=i;j<points.length;j++){
            if(wires[i][j]!=null){
                let tmp = wires[i][j];
                wires[i][j]=null;
                wires[newName[i]][newName[j]]=tmp;
            }
        }
    }
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            if (wires[i][j] == null) continue;
            wires[i][j].setId(cnt);
            cnt++;
        }
    }
    pv = [];
    A = [];
    B = [];
    for(let i=0;i<points.length;i++) {
        if(pv[i]==0||pv[i]==null) {
            path = [];
            pv[i] = 1;
            path.push(i);
            dfs(i, -1);
        }
    }
    for(let i=0;i<points.length;i++)
    {
        let tmp = [],flag=0;
        for(let j=0;j<cnt;j++) tmp.push(0);
        for(let j=0;j<points.length;j++)
        {
            if(j<i){
                if(wires[j][i]==null) continue;
                tmp[wires[j][i].id]=1;
                flag++;
            }
            else if(i<j)
            {
                if(wires[i][j]==null) continue;
                tmp[wires[i][j].id]=-1;
                flag++;
            }
        }
        if(flag>=2){
            A.push(tmp);
            B.push(0);
        }
    }
    X = new Array(cnt);
    for (let i = 0; i < cnt; i++) {
        X[i] = new Array(cnt);
        for(let j=0;j<cnt;j++) X[i][j]=0;
        X[i][i] = 1;
    }
    C = [];
    for(let i=0;i<cnt;i++) C.push(0);
    solve();
}
function draw() {
    background(0, 200, 100);
    for (let i = 0; i < 100; i++) {
        for (let j = i + 1; j < 100; j++) {
            if (wires[i][j] == null) continue;
            if(wires[i][j].type==1&&Math.abs(C[wires[i][j].id])>wires[i][j].limit) {
                wires[i][j]=null;
                continue;
            }
            wires[i][j].show();
        }
    }
    for (let i = 0; i < points.length; i++) {
        points[i].show();
    }
    CC = C;
    showSetting();
}
function showSetting()
{
    fill(100);
    rect(1200,0,300,700);
    fill(200);
    rect(1200,510,300,200);
    btnChoice=-1;
    for(let i=0;i<Btns.length;i++){
        if(Btns[i].clicking==true) btnChoice = i;
    }
    let pind=-1,clickcnt=0;
    for(let i=0;i<points.length;i++)
    {
        if(points[i].click==true) {
            clickcnt++;
            pind=i;
        }
    }
    if(btnChoice==0){

        voltSlider.hide();
        ohmSlider.hide();
        limitSlider.hide();
    }
    else if(btnChoice==-1||btnChoice==3){
        voltSlider.show();
        ohmSlider.show();
        limitSlider.hide();
        fill(0);
        textSize(30);
        text("V",1230,64);
        text("R",1230,134);
        text(voltSlider.value().toString(),1440,64);
        text(ohmSlider.value().toString(),1440,134);
    }
    else if(btnChoice==1){
        voltSlider.hide();
        ohmSlider.show();
        limitSlider.show();
        fill(0);
        textSize(30);
        text("Max",1220,64);
        text("R",1230,134);
        text(limitSlider.value().toString(),1440,64);
        text(ohmSlider.value().toString(),1440,134);
    }
    else if(btnChoice==2){
        voltSlider.hide();
        ohmSlider.show();
        limitSlider.hide();
        fill(0);
        textSize(30);
        text("R",1230,134);
        text(ohmSlider.value().toString(),1440,134);
    }
    wireOhmSlider.hide();
    wireVoltSlider.hide();
    wireLimitSlider.hide();
    if(clickcnt>0) {
        deleteBtn.position(1310,550);
        deleteBtn.show();
        if(clickcnt==1&&points[pind].type==1) {
            let a = -1, b = -1;
            for (let i = 0; i < points.length; i++) {
                if (i < pind && wires[i][pind] != null) {
                    if (a == -1) a = i;
                    else b = i;
                }
                if (i > pind && wires[pind][i] != null) {
                    if (a == -1) a = i;
                    else b = i;
                }
            }
            if (a != -1 && b != -1) {
                deleteBtn.position(1230, 550);
                let sum=0;
                if (a < pind) sum = (-2) * C[wires[a][pind].id] * wires[a][pind].ohm;
                else sum = 2 * C[wires[pind][a].id] * wires[pind][a].ohm;
                fill(0);
                textSize(25);
                text("ΔV : ", 1345, 570);
                text(sum.toFixed(5), 1400, 570);
            }
        }
    }
    else deleteBtn.hide();
    let flag=false,ii,jj;
    for(let i=0;i<points.length;i++){
        for(let j=i+1;j<points.length;j++){
            if(wires[i][j]==null) continue;
            if(wires[i][j].clicking==true||wires[i][j].on==true){
                flag=true;
                ii=i;
                jj=j;
            }
        }
    }
    for(let i=0;i<Btns.length;i++) Btns[i].show();
    if(flag==true){
        if(befWire != wires[ii][jj].id) {
            wireVoltSlider.value(wires[ii][jj].volt);
            wireOhmSlider.value(wires[ii][jj].ohm);
            wireLimitSlider.value(wires[ii][jj].limit);
        }
        befWire = wires[ii][jj].id;
        fill(0);
        textSize(25);
        if(wires[ii][jj].type==0) {
            wireVoltSlider.show();
            wireLimitSlider.hide();
            text("V : ",1230,622);
            text(wireVoltSlider.value().toString(),1440,622);
            if(Math.abs(wires[ii][jj].volt-wireVoltSlider.value())>0.01) {
                wires[ii][jj].volt = wireVoltSlider.value();
                recalc();
            }
        }
        else if(wires[ii][jj].type==1) {
            wireVoltSlider.hide();
            wireVoltSlider.value(0);
            wireLimitSlider.show();
            text("Max : ",1220,622);
            text(wireLimitSlider.value().toString(),1440,622);
            wires[ii][jj].limit = wireLimitSlider.value();
        }
        else if(wires[ii][jj].type==2){
            wireVoltSlider.hide();
            wireLimitSlider.hide();
            wireVoltSlider.value(0);
        }
        wireOhmSlider.show();
        if(Math.abs(wires[ii][jj].ohm-wireOhmSlider.value())>0.01) {
            wires[ii][jj].ohm = wireOhmSlider.value();
            recalc();
        }
        text("R : ",1230,656);
        text(wireOhmSlider.value().toString(),1440,656);
        text("I : "+C[wires[ii][jj].id].toFixed(5),1233,690);
    }
    else befWire = -1;
}
function check() {
    console.log("current============");
    console.log(CC);
}
function dfs(cur,bac) {
    for (let i = 0; i < points.length; i++) {
        if(i==cur || i==bac) continue;
        if (i < cur && wires[i][cur] == null) continue;
        if (cur < i && wires[cur][i] == null) continue;
        if (pv[i] == 1) {
            path.push(i);
            cycle(i);
            path.pop(i);
            continue;
        }
        path.push(i);
        pv[i] = 1;
        dfs(i,cur);
        path.pop();
        pv[i] = 0;
    }
}
function cycle(e) {
    let s, tot = 0;
    tmp = [];
    for(let i=0;i<cnt;i++) tmp.push(0);
    for (let i = 0; i < path.length; i++) {
        if (path[i] == e) {
            s = i;
            break;
        }
    }
    for (let i = s; i < path.length- 1; i++) {
        let a = path[i];
        let b = path[i + 1];
        if (a < b) {
            tmp[wires[a][b].id] = wires[a][b].ohm;
            tot += wires[a][b].volt;
        } else {
            tmp[wires[b][a].id] = -wires[b][a].ohm;
            tot -= wires[b][a].volt;
        }
    }
    A.push(tmp);
    B.push(tot);
}
function connect(){
    console.log("size : "+points.length);
    for(let i=0;i<points.length;i++)
    {
        for(let j=i+1;j<points.length;j++)
        {
            if(points[i].click==true&&points[j].click==true)
            {
                if(points[i].type==1&&points[j].type==1) continue;
                if(points[i].type==1){
                    if(getadj(i)<2) wires[i][j]=new Wire(0,10000,i,j,cnt,0,0);
                    continue;
                }
                else if(points[j].type==1){
                    if(getadj(j)<2) wires[i][j]=new Wire(0,10000,i,j,cnt,0,0);
                    continue;
                }
                if(Btns[1].clicking==true){
                    wires[i][j]=new Wire(0,ohmSlider.value(),i,j,cnt,1,limitSlider.value());
                }
                else if(Btns[2].clicking==true){
                    wires[i][j]=new Wire(0,ohmSlider.value(),i,j,cnt,2,0);
                }
                else wires[i][j]=new Wire(voltSlider.value(),ohmSlider.value(),i,j,cnt,0,0);
            }
        }
    }
    for(let i=0;i<points.length;i++)
    {
        points[i].unclicked();
    }
    recalc();
}
function getadj(x){
    let cnt=0;
    for(let i=0;i<points.length;i++){
        if(i<x&&wires[i][x]!=null) cnt++;
        if(x<i&&wires[x][i]!=null) cnt++;
    }
    return cnt;
}
function disconnect(){
    for(let i=0;i<points.length;i++)
    {
        for(let j=i+1;j<points.length;j++)
        {
            if(wires[i][j]==null) continue;
            if(wires[i][j].clicking==true){
                wires[i][j]=null;
                wireClicking=false;
            }
        }
    }
    for(let i=0;i<points.length;i++)
    {
        for(let j=i+1;j<points.length;j++)
        {
            if(points[i].click==true&&points[j].click==true)
            {
                wires[i][j]=null;
            }
        }
    }
    for(let i=0;i<points.length;i++)
    {
        points[i].unclicked();
    }
    recalc();
}
function deletePoints() {
    let beflen = points.length;
    for(let i=0;i<points.length;i++)
    {
        if(befPoint[i]==true) points[i]=null;
    }
    let newPoints = [];
    let newName = new Array(points.length);
    for (let i = 0; i < points.length; i++){
        if(points[i]!=null) newPoints.push(points[i]);
        else{
            for(let j=0;j<points.length;j++)
            {
                if(j<i) wires[j][i]=null;
                else wires[i][j]=null;
            }
        }
    }
    points=newPoints;
    for(let i=0;i<points.length;i++){
        newName[points[i].id]=i;
        points[i].id=i;
    }
    for(let i=0;i<beflen;i++){
        for(let j=i;j<beflen;j++){
            if(wires[i][j]!=null){
                let tmp = wires[i][j];
                wires[i][j]=null;
                wires[newName[i]][newName[j]]=tmp;
                wires[newName[i]][newName[j]].setDir(newName[i],newName[j]);
            }
        }
    }
    recalc();
}
function keyPressed() {
    if (key == 's') spress = true;
    if (key == 'd') {
        disconnect();
    }
    if (key == 'c'){
        connect();
    }
    if(key=='a') apress=true;
}
function keyReleased() {
    if (key == 's') spress = false;
    if (key == 'd') dpress = false;
    if (key == 'a') apress=false;
}
function mousePressed() {
    mpress = true;
    mpressing = true;
    let purpose = true;
    let pbtn=-1;
    for(let i=0;i<Btns.length;i++)
    {
        if(Btns[i].inside(mouseX, mouseY)==true)
        {
            pbtn = i;
            Btns[i].clicking=!Btns[i].clicking;
            purpose = false;
        }
    }
    if(pbtn!=-1)
    {
        for(let i=0;i<Btns.length;i++)
        {
            if(i!=pbtn) Btns[i].clicking = false;
        }
    }
    let min = 10000, ind = -1;
    for (let i = 0; i < points.length; i++) {
        let dist = (mouseX - points[i].location.x) * (mouseX - points[i].location.x) + (mouseY - points[i].location.y) * (mouseY - points[i].location.y);
        if (dist <= points[i].socSize * points[i].socSize && dist < min) {
            min = dist;
            ind = i;
            purpose = false;
        }
    }
    if(ind==-1){
        if(mouseX<=1200) {
            for (let i = 0; i < points.length; i++) {
                points[i].unclicked();
            }
        }
    }
    else {
        if(points[ind].click == true){
            points[ind].unclicked();
            return ;
        }
        lastClick = ind;
        points[lastClick].clicked();
    }
    let ii=-1,jj=-1;
    for(let i=0;i<points.length;i++){
        for(let j=i+1;j<points.length;j++){
            if(wires[i][j]==null) continue;
            if(wires[i][j].onMouse()==true){
                if(wires[i][j].clicking==true) wireClicking=false;
                else wireClicking=true;
                wires[i][j].clicking = !wires[i][j].clicking;
                ii=i;
                jj=j;
                purpose = false;
            }
        }
    }
    if(ii!=-1||mouseX<=1200){
        for(let i=0;i<points.length;i++){
            for(let j=i+1;j<points.length;j++){
                if(wires[i][j]==null) continue;
                if(i!=ii||j!=jj){
                    if(wires[i][j].clicking==true) wireClicking=false;
                    wires[i][j].clicking=false;
                }
            }
        }
    }
    if(purpose==true){
        if(Btns[0].clicking ==true){
            points.push(new Point(createVector(mouseX, mouseY),points.length,0));
        }
        else if(Btns[3].clicking==true){
            points.push(new Point(createVector(mouseX, mouseY),points.length,1));
            Btns[3].clicking=false;
        }
    }
    befPoint = [];
    for(let i=0;i<points.length;i++) befPoint.push(points[i].click);
}
function mouseDragged() {
    mpressing = true;
    if(lastClick!=-1) points[lastClick].setPos(mouseX, mouseY);
}
function mouseReleased() {
    mpress = false;
    mpressing = false;
    lastClick = -1;
}
function mouseWheel(event) {
    if(event.delta>0)zoom*=0.95;
    else zoom*=1.05;
}
function solve() {
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[i].length; j++) {
            if (A[i][j] == 0) continue;
            die[j] = 1;
            for (let k = 0; k < A[i].length; k++) {
                for (let l = 0; l < X[k].length; l++) {
                    X[j][l] -= A[i][k] / A[i][j] * X[k][l];
                }
                C[j] -= A[i][k] / A[i][j] * C[k];
            }
            C[j] += B[i] / A[i][j];
            for (let k = 0; k < X.length; k++) {
                if (k == i) continue;
                let tmp = X[k][j];
                X[k][j] = 0;
                for (let l = 0; l < X[k].length; l++) {
                    X[k][l] += tmp * X[j][l];
                }
                C[k] += tmp * C[j];
            }
            for (let k = 0; k < A.length; k++) {
                let tmp = A[k][j];
                A[k][j] = 0;
                for (let l = 0; l < A[k].length; l++) {
                    if (l == j) continue;
                    A[k][l] += tmp * X[j][l];
                }
                B[k] -= C[j] * tmp;
            }
            break;
        }
    }
    // console.log("answer = ======");
    // console.log(C);
}
function myprint(A, name) {
    console.log("======" + name + "=======");
    for (let i = 0; i < A.length; i++) {
        console.log(A[i]);
    }
    console.log("=============");
}