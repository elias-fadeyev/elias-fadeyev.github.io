!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);class s{constructor(t,e,i,s,n,a=0,r=1){this.url=t,this.imageWidth=e,this.imageHeight=i,this.imagePosition=s,this.spritePosition=n,this.imageReverse=!1,this.framesPerSecond=15,this.startWaitingTime=Date.now(),this.delayInterval=0,this.animationDelay=a,this.animationTime=0,this.lastRenderingTime=Date.now(),this.framesAmount=r,this.spriteDirectionReverse=!1,this.spriteDirectionChangeable=!1}renderImage(t,e){const i=new Image;i.src=this.url,this.delayInterval=this.getTimeInterval(this.startWaitingTime,Date.now()),this.isAnimationStarted()&&this.isFramesCycling()&&(this.animationTime=this.getTimeInterval(this.lastRenderingTime+this.animationDelay,Date.now()),this.setSpritePosition()),e.save(),this.imageReverse&&e.scale(-1,1),e.drawImage(i,this.spritePosition[0],this.spritePosition[1],this.state.spriteSize[0],this.state.spriteSize[1],this.getImageXPosition(),this.imagePosition[1],this.imageWidth,this.imageHeight),e.restore()}isAnimationStarted(){return this.delayInterval>this.animationDelay}isImageReverse(t){return 0===t?this.imageReverse:t<0}getImageXPosition(){return this.imageReverse?-this.imagePosition[0]-this.state.imageSize[0]:this.imagePosition[0]}setImagePosition(t,e,i,s){this.imagePosition[0]+=t,this.imagePosition[1]+=e,i&&(this.imagePosition[0]<0?this.imagePosition[0]=0:this.imagePosition[0]+this.imageWidth>i&&(this.imagePosition[0]=i-this.imageWidth),this.imagePosition[1]<0?this.imagePosition[1]=0:this.imagePosition[1]+this.imageHeight>s&&(this.imagePosition[1]=s-this.imageHeight))}setSpritePosition(){this.spriteDirectionReverse?this.spritePosition[0]=this.state.spriteSize[0]*(this.framesAmount-Math.ceil(this.framesPerSecond*this.animationTime/1e3)):this.spritePosition[0]=this.state.spriteSize[0]*Math.floor(this.framesPerSecond*this.animationTime/1e3),this.isFramesCycleEnded()&&(!this.spriteDirectionReverse&&this.spriteDirectionChangeable||this.spriteDirectionReverse&&!this.spriteDirectionChangeable?this.spritePosition[0]=this.state.spriteSize[0]*(this.framesAmount-1):this.spritePosition[0]=0,this.spriteDirectionChangeable&&this.changeSpriteDirection(),this.startWaitingTime=Date.now(),this.lastRenderingTime=Date.now())}isFramesCycling(){return this.framesAmount>1}isFramesCycleEnded(){return this.spritePosition[0]>=this.state.spriteSize[0]*this.framesAmount||this.spritePosition[0]<0}getTimeInterval(t,e){return e-t}changeSpriteDirection(){this.spriteDirectionReverse=!this.spriteDirectionReverse}}class n extends s{constructor(t,e,i,s,n,a,r,o,h,m,d){super(i,r,o,s,m,h,d),this.name=t,this.appearance=e,this.state=n,this.stateAction=a}setState(t){this.stateAction!==t.action&&(this.stateAction=t.action,this.spritePosition=t.firstSpritePosition.slice(),this.framesAmount=t.framesAmount,this.imageWidth=t.imageSize[0],this.imageHeight=t.imageSize[1],this.animationDelay=t.animationDelay)}}const a=new Map([["stay",{action:"stay",imageSize:[65,95],spriteSize:[125,185],firstSpritePosition:[0,0],framesAmount:7,animationDelay:2e3}],["run",{action:"run",imageSize:[75,95],spriteSize:[145,185],firstSpritePosition:[0,185],framesAmount:14,animationDelay:0}],["aim",{action:"aim",imageSize:[65,95],spriteSize:[130,185],firstSpritePosition:[0,370],framesAmount:12,animationDelay:0}],["hit",{action:"hit",imageSize:[95,95],spriteSize:[185,185],firstSpritePosition:[0,555],framesAmount:8,animationDelay:0}]]),r=new Map([["firstName",["Злой","Коварный","Хитрый"]],["surname",["Разбойник","Охотник","Пират"]],["lastName",["Кряк","Шмяк","Рекс","Кекс"]]]),o=new Map([["stay",{action:"stay",imageSize:[75,75],spriteSize:[150,150],animationDelay:1500}]]),h=new Map([["head",[{firstSpritePosition:[0,0],framesAmount:4},{firstSpritePosition:[0,150],framesAmount:2},{firstSpritePosition:[0,300],framesAmount:3},{firstSpritePosition:[0,450],framesAmount:3}]],["body",[{firstSpritePosition:[0,600],framesAmount:1},{firstSpritePosition:[150,600],framesAmount:1},{firstSpritePosition:[300,600],framesAmount:1}]],["legs",[{firstSpritePosition:[0,750],framesAmount:1},{firstSpritePosition:[150,750],framesAmount:1},{firstSpritePosition:[300,750],framesAmount:1}]],["weapon",[{firstSpritePosition:[0,900],framesAmount:1},{firstSpritePosition:[150,900],framesAmount:1},{firstSpritePosition:[300,900],framesAmount:1}]]]);class m extends n{constructor(...t){super(...t),this.speed=6,this.pressedButtons={up:!1,right:!1,down:!1,left:!1,amount:0},this.healthPoints=100}renderImage(t,e){if(this.pressedButtons.amount>0){const e=this.getImageShiftX(),i=this.getImageShiftY();this.imageReverse=this.isImageReverse(e),"run"!==this.stateAction&&this.setState("run");const s=t.width,n=t.height;this.setImagePosition(e,i,s,n)}super.renderImage(t,e)}handleInput(t){const e=t.keyCode,i=this.getButtonDirection(e);37!==e&&38!==e&&39!==e&&40!==e||this.addPressedButtons(i)}getButtonDirection(t){return 37===t?"left":38===t?"up":39===t?"right":40===t?"down":void 0}addPressedButtons(t){this.pressedButtons[t]||(this.pressedButtons[t]=!0,this.pressedButtons.amount+=1)}getImageShiftX(){let t=this.speed;return this.pressedButtons.left&&(t=-t),this.pressedButtons.left||this.pressedButtons.right?this.pressedButtons.up||this.pressedButtons.down?t/Math.sqrt(2):t:0}getImageShiftY(){let t=this.speed;return this.pressedButtons.up&&(t=-t),this.pressedButtons.up||this.pressedButtons.down?this.pressedButtons.left||this.pressedButtons.right?t/Math.sqrt(2):t:0}stopHandleInput(t){const e=t.keyCode,i=this.getButtonDirection(e);37!==e&&38!==e&&39!==e&&40!==e||(this.setState("stay"),this.removePressedButtons(i))}removePressedButtons(t){this.pressedButtons.amount-=1,this.pressedButtons[t]=!1}setState(t){this.state=a.get(t),super.setState(this.state)}}class d extends n{constructor(...t){super(...t),this.imageReverse=!0,this.spriteDirectionChangeable=!0,this.healthPoints=100}getFullName(){return`${this.name.get("firstName")} ${this.name.get("surname")} ${this.name.get("lastName")}`}renderImage(t,e){this.renderBodyParts(t,e,"legs",0,0),this.renderBodyParts(t,e,"body",0,-23),this.renderBodyParts(t,e,"weapon",-35,-33),this.renderBodyParts(t,e,"head",0,-57)}renderBodyParts(t,e,i,s,n){const a=this.appearance.get(i);this.spritePosition=a.firstSpritePosition,this.framesAmount=a.framesAmount,this.setImagePosition(s,n),super.renderImage(t,e),this.setImagePosition(-s,-n)}}function l(t){const e=new Map;var i;return t.forEach((t,s)=>{e.set(s,t[(i=t.length,Math.floor(Math.random()*i))])}),e}class p{constructor(t,e,i){this.canvas=t,this.canvasContext=this.canvas.getContext("2d"),this.player=e,this.monster=i}render(){this.canvasContext.fillStyle="#aaa",this.canvasContext.fillRect(0,0,this.canvas.width,this.canvas.height),this.player.imagePosition[1]+this.player.imageHeight<this.monster.imagePosition[1]+50?(this.player.renderImage(this.canvas,this.canvasContext),this.monster.renderImage(this.canvas,this.canvasContext)):(this.monster.renderImage(this.canvas,this.canvasContext),this.player.renderImage(this.canvas,this.canvasContext))}}class g extends p{render(){this.canvasContext.fillStyle="#aaa",this.canvasContext.fillRect(0,0,this.canvas.width,this.canvas.height);const t=this.canvas.width/2-100;this.renderText(this.player.name,55,50,t-10),this.renderHealthScale(this.player.healthPoints,t,50,70),this.renderText(this.player.healthPoints,55,90,t-10),this.renderText(this.monster.getFullName(),this.canvas.width-55,50,t-10,"#fff","right"),this.renderHealthScale(this.monster.healthPoints,t,this.canvas.width-t-50,70),this.renderText(this.monster.healthPoints,this.canvas.width-55,90,t-10,"#fff","right"),this.isPlayerTurn()&&this.player.setState("aim"),this.player.renderImage(this.canvas,this.canvasContext),this.monster.renderImage(this.canvas,this.canvasContext),window.requestAnimationFrame(this.render.bind(this))}renderText(t,e,i,s,n="#fff",a="left",r="20px serif"){this.canvasContext.font=r,this.canvasContext.fillStyle=n,this.canvasContext.textAlign=a,this.canvasContext.fillText(t,e,i,s)}renderHealthScale(t,e,i,s){this.canvasContext.fillStyle="red",this.canvasContext.fillRect(i,s,e,30),this.canvasContext.fillStyle="green",this.canvasContext.fillRect(i,s,e*t/100,30)}isPlayerTurn(){return!0}}class c extends p{addHandlers(){document.addEventListener("keydown",this.player.handleInput),document.addEventListener("keyup",this.player.stopHandleInput)}bindThis(){this.player.handleInput=this.player.handleInput.bind(this.player),this.player.stopHandleInput=this.player.stopHandleInput.bind(this.player)}isFinished(){const t=this.player.imagePosition[0],e=this.player.imagePosition[0]+this.player.imageWidth,i=this.player.imagePosition[1],s=this.player.imagePosition[1]+this.player.imageHeight,n=this.monster.imagePosition[0],a=this.monster.imagePosition[0]+this.monster.imageWidth,r=this.monster.imagePosition[1],o=this.monster.imagePosition[1]+this.monster.imageHeight;return!(e<n||t>a||i>o-100||s<r+30)}getNext(){return new g(this.canvas,this.player,this.monster)}init(){this.bindThis(),this.addHandlers()}}class u{constructor(t,e){this.canvas=t,this.player=e}render(){this.mode.render(),this.mode.isFinished()&&(this.mode=this.mode.getNext()),window.requestAnimationFrame(this.render.bind(this))}init(){const t=[this.canvas.width-200,this.canvas.height/2+40],e=l(h),i=o.get("stay"),s=i.imageSize[0],n=i.imageSize[1];this.monster=new d(l(r),e,"images/enemy-sprite.png",t,i,i.action,s,n,i.animationDelay),this.mode=new c(this.canvas,this.player,this.monster),this.mode.init(),this.render()}}const f=new Image;f.addEventListener("load",()=>{new class{constructor(t){this.canvas=t,this.canvasContext=t.getContext("2d")}startGame(){const t=[100,this.canvas.height/2],e=a.get("stay");this.player=new m("Hero","Scrooge","images/sprite.png",t,e,e.action,e.imageSize[0],e.imageSize[1],e.animationDelay,e.firstSpritePosition,e.framesAmount,e.animationDelay),this.stage=new u(this.canvas,this.player),this.stage.init()}init(){this.startGame()}}(document.querySelector("#gameCanvas")).init()}),f.src="images/sprite.png"}]);