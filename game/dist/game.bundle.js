!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);const s=new Map([["firstName",["Злой","Коварный","Хитрый"]],["surname",["Разбойник","Охотник","Пират"]],["lastName",["Джек","Макс","Рекс","Кекс"]]]),n=new Map([["head",["head1","head2","head3"]],["body",["body1","body2","body3"]],["legs",["legs1","legs2","legs3"]],["weapon",["axe","sword","stick"]]]),o=new Map([["stay",{action:"stay",imageSize:[65,95],spriteSize:[125,185],firstSpritePosition:[0,0],imageAmount:7}],["run",{action:"run",imageSize:[75,95],spriteSize:[145,185],firstSpritePosition:[0,185],imageAmount:14}]]);class a{constructor(t,e,i,s,n,o,a,r,h){this.name=t,this.appearance=e,this.url=i,this.imagePosition=s,this.state=n,this.stateAction=o,this.imageWidth=a,this.imageHeight=r,this.spritePosition=h,this.imageLastPosition=[],this.speed=5,this.imageReverse=!1,this.startRenderindtime=Date.now(),this.timeInterval=0,this.firstAnimationDelay=1e3}renderImage(t,e){const i=new Image;i.src=this.url,this.timeInterval=this.getTimeInterval(),this.isAnimationStarted()&&this.setSpritePosition(),e.save(),this.imageReverse&&e.scale(-1,1),e.drawImage(i,this.spritePosition[0],this.spritePosition[1],this.state.spriteSize[0],this.state.spriteSize[1],this.getImageXPosition(),this.imagePosition[1],this.imageWidth,this.imageHeight),e.restore()}isAnimationStarted(){return"stay"===this.stateAction?this.timeInterval>=this.firstAnimationDelay:this.timeInterval>0}getImageXPosition(){return this.imageReverse?-this.imagePosition[0]-this.state.imageSize[0]:this.imagePosition[0]}setImagePosition(t,e,i,s){this.imagePosition[0]+=t,this.imagePosition[1]+=e,this.imagePosition[0]<0?this.imagePosition[0]=0:this.imagePosition[0]+this.imageWidth>i&&(this.imagePosition[0]=i-this.imageWidth),this.imagePosition[1]<0?this.imagePosition[1]=0:this.imagePosition[1]+this.imageHeight>s&&(this.imagePosition[1]=s-this.imageHeight)}setSpritePosition(){this.spritePosition[0]+=this.state.spriteSize[0],this.spritePosition[0]>=this.state.spriteSize[0]*this.state.imageAmount&&(this.spritePosition[0]=0,this.startRenderingTime=Date.now())}setState(t){this.state=o.get(t),this.stateAction!==this.state.action&&(this.stateAction=this.state.action,this.spritePosition=this.state.firstSpritePosition.slice())}isImageReverse(t){return 0===t?this.imageReverse:t<0}getTimeInterval(){return Date.now()-this.startRenderingTime}}class r extends a{constructor(...t){super(...t),this.pressedButtons={up:!1,right:!1,down:!1,left:!1,amount:0}}renderImage(t,e){if(this.pressedButtons.amount>0){const e=this.getImageShiftX(),i=this.getImageShiftY();this.imageReverse=this.isImageReverse(e),"run"!==this.stateAction&&this.setState("run");const s=t.width,n=t.height;this.setImagePosition(e,i,s,n)}super.renderImage(t,e)}move(t){const e=t.keyCode,i=this.getButtonDirection(e);37!==e&&38!==e&&39!==e&&40!==e||this.addPressedButtons(i)}getButtonDirection(t){return 37===t?"left":38===t?"up":39===t?"right":40===t?"down":void 0}addPressedButtons(t){this.pressedButtons[t]||(this.pressedButtons[t]=!0,this.pressedButtons.amount+=1)}getImageShiftX(){let t=this.speed;return this.pressedButtons.left&&(t=-t),this.pressedButtons.left||this.pressedButtons.right?this.pressedButtons.up||this.pressedButtons.down?t/2:t:0}getImageShiftY(){let t=this.speed;return this.pressedButtons.up&&(t=-t),this.pressedButtons.up||this.pressedButtons.down?this.pressedButtons.left||this.pressedButtons.right?t/2:t:0}stop(t){const e=t.keyCode,i=this.getButtonDirection(e);37!==e&&38!==e&&39!==e&&40!==e||(this.setState("stay"),this.removePressedButtons(i))}removePressedButtons(t){this.pressedButtons.amount-=1,this.pressedButtons[t]=!1}}class h extends a{getFullName(){return`${this.name.get("firstName")} ${this.name.get("surname")} ${this.name.get("lastName")}`}}const m=new Image;m.addEventListener("load",()=>{new class{constructor(t){this.canvas=t,this.canvasContext=t.getContext("2d")}getRandomNumber(t){return Math.floor(Math.random()*t)}getRandomData(t){const e=new Map;return t.forEach((t,i)=>{e.set(i,t[this.getRandomNumber(t.length)])}),e}render(){this.canvasContext.fillRect(0,0,this.canvas.width,this.canvas.height),this.player.renderImage(this.canvas,this.canvasContext),window.requestAnimationFrame(this.render.bind(this))}init(){const t=[100,this.canvas.height/2-50],e=o.get("stay");this.player=new r("Hero","Scrooge","images/sprite.png",t,e,e.action,e.imageSize[0],e.imageSize[1],e.firstSpritePosition),document.addEventListener("keydown",this.player.move.bind(this.player)),document.addEventListener("keyup",this.player.stop.bind(this.player)),this.monster1=new h(this.getRandomData(s),this.getRandomData(n)),this.monster2=new h(this.getRandomData(s),this.getRandomData(n)),this.render()}}(document.querySelector("#gameCanvas")).init()}),m.src="images/sprite.png"}]);