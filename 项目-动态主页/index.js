window.onload = function(){
	var arrowEl = document.querySelector("#head .headMain > .arrow");
	var liNodes = document.querySelectorAll("#head .headMain > .nav > .list > li");
	var upNodes = document.querySelectorAll("#head .headMain > .nav > .list > li .up");
	var firstLiNode  = liNodes[0];
	var firstUpNode  = firstLiNode.querySelector(".up");
	 
	var head = document.querySelector("#head") ;
	var content = document.querySelector("#content") ;
	var cLiNodes = document.querySelectorAll("#content .list > li");
	var cList =  document.querySelector("#content .list");
	
	var home2LiNodes = document.querySelectorAll("#content > .list > .home .home2 > li");
	var home1LiNodes = document.querySelectorAll("#content > .list > .home .home1 > li");
	var home1 = document.querySelector("#content > .list > .home .home1");
	
	var aboutUls = document.querySelectorAll("#content > .list > .about .about3 > .item  ul");
	
	var dotLis = document.querySelectorAll("#content > .dot > li");
	
	var team3 = document.querySelector("#content > .list > .team  .team3");
	var team3Ul = document.querySelector("#content > .list > .team .team3 ul");
	var team3Lis = document.querySelectorAll("#content > .list > .team .team3 ul>li");
	
	var music = document.querySelector("#head > .headMain .music");
	var audio = document.querySelector("#head > .headMain .music audio");
	
	var mask = document.querySelector("#mask");
	var line = document.querySelector("#mask .line");
	var mians = document.querySelectorAll("#mask div");
	
	
	var now =0;
	var timer = 0;
	var preIndex =0;
	
	//开机动画
	loadingAn();
	function loadingAn(){
		var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
		var flag =0;
		for(var i=0;i<arr.length;i++){
			var img = new Image();
			img.src="img/"+arr[i];
			img.onload=function(){
				flag++;
				line.style.width = flag/arr.length*100+"%";
			}
		}
		
		line.addEventListener("transitionend",function(){
			if(flag === arr.length){
				for(var i=0;i<mians.length;i++){
					mians[i].style.height=0+"px";
				}
				this.style.display="none";
			}
		})
		
		mians[0].addEventListener("transitionend",function(){
			mask.remove();
			audio.play();
			home3D();
		})
	}
	
	
	//出入场
	var anArr=[
		{
			inAn:function(){
				var home1 = document.querySelector("#content > .list > .home .home1");
				var home2 = document.querySelector("#content > .list > .home .home2");
				
				home1.style.transform="translateY(0px)";
				home2.style.transform="translateY(0px)";
				home1.style.opacity=1;
				home2.style.opacity=1;
			},
			outAn:function(){
				var home1 = document.querySelector("#content > .list > .home .home1");
				var home2 = document.querySelector("#content > .list > .home .home2");
				
				home1.style.transform="translateY(-400px)";
				home2.style.transform="translateY(100px)";
				home1.style.opacity=0;
				home2.style.opacity=0;
			}
		},
		
		
		{
			inAn:function(){
				var plane1 = document.querySelector("#content  .course .plane1");
				var plane2 = document.querySelector("#content  .course .plane2");
				var plane3 = document.querySelector("#content  .course .plane3");
				
				plane1.style.transform = "translate(0px,0px)";
				plane2.style.transform = "translate(0px,0px)";
				plane3.style.transform = "translate(0px,0px)";
			},
			outAn:function(){
				var plane1 = document.querySelector("#content  .course .plane1");
				var plane2 = document.querySelector("#content  .course .plane2");
				var plane3 = document.querySelector("#content  .course .plane3");
				
				plane1.style.transform = "translate(-200px,-200px)";
				plane2.style.transform = "translate(-200px,200px)";
				plane3.style.transform = "translate(200px,-200px)";
			}
		},
		
		
		{
			inAn:function(){
				var pencel1 = document.querySelector("#content  .works .pencel1");
				var pencel2 = document.querySelector("#content  .works .pencel2");
				var pencel3 = document.querySelector("#content  .works .pencel3");
				
				pencel1.style.transform = "translateY(0px)";
				pencel2.style.transform = "translateY(0px)";
				pencel3.style.transform = "translateY(0px)";
			},
			outAn:function(){
				var pencel1 = document.querySelector("#content  .works .pencel1");
				var pencel2 = document.querySelector("#content  .works .pencel2");
				var pencel3 = document.querySelector("#content  .works .pencel3");
				
				pencel1.style.transform = "translateY(-100px)";
				pencel2.style.transform = "translateY(100px)";
				pencel3.style.transform = "translateY(100px)";
			}
		},
		
		
		{
			inAn:function(){
				var Rect1 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(1)");
				var Rect2 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(2)");
				
				Rect1.style.transform = "rotate(0deg)";
				Rect2.style.transform = "rotate(0deg)";
			},
			outAn:function(){
				var Rect1 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(1)");
				var Rect2 = document.querySelector("#content > .list > .about .about3 > .item:nth-child(2)");
				
				Rect1.style.transform = "rotate(45deg)";
				Rect2.style.transform = "rotate(-45deg)";
			}
		},
		
		
		{
			inAn:function(){
				var Rect1 = document.querySelector("#content > .list > .team .team1");
				var Rect2 = document.querySelector("#content > .list > .team .team2");
				
				Rect1.style.transform = "translateX(0px)";
				Rect2.style.transform = "translateX(0px)";
			},
			outAn:function(){
				var Rect1 = document.querySelector("#content > .list > .team .team1");
				var Rect2 = document.querySelector("#content > .list > .team .team2");
				
				Rect1.style.transform = "translateX(-200px)";
				Rect2.style.transform = "translateX(200px)";
			}
		}
	]
	
	for(var i=0;i<anArr.length;i++){
		anArr[i]["outAn"]();
	}
	setTimeout(function(){
		anArr[0].inAn();
	},2000)

	//音频
	music.onclick=function(){
		if(audio.paused){
			audio.play();
			music.style.background ="url(img/musicon.gif)";
		}else{
			audio.pause();
			music.style.background ="url(img/musicoff.gif)";
		}
	}
	//第五屏气泡效果
	biubiu();
	function biubiu(){
		var oc =null;
		var time1=0;
		var time2=0;
		for(var i=0;i<team3Lis.length;i++){
			team3Lis[i].onmouseenter=function(){
				for(var i=0;i<team3Lis.length;i++){
					team3Lis[i].style.opacity=.2;
				}
				this.style.opacity=1;
				addCanvas();
				oc.style.left = this.offsetLeft+"px";
			}
		}
		
		function addCanvas(){
			if(!oc){
				oc = document.createElement("canvas");
				oc.width = team3Lis[0].offsetWidth;
				oc.height = team3Lis[0].offsetHeight*2/3;
				
				oc.onmouseleave=function(){
					for(var i=0;i<team3Lis.length;i++){
						team3Lis[i].style.opacity=1;
					}
					
					removeCanvas();
				}
				
				
				team3.appendChild(oc);
				QiPao()
			}
		}
		
		function QiPao(){
			if(oc.getContext){
				var ctx = oc.getContext("2d");
				var arr=[];
				time1=setInterval(function(){
					ctx.clearRect(0,0,oc.width,oc.height);
					//动画
					for(var i=0;i<arr.length;i++){
						arr[i].deg+=10;
						arr[i].x = arr[i].startX +  Math.sin( arr[i].deg*Math.PI/180 )*arr[i].step*2;
						arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step ;
						
						if(arr[i].y <=50){
							arr.splice(i,1)
						}
					}
					//绘制
					for(var i=0;i<arr.length;i++){
						ctx.save();
						ctx.fillStyle="rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].alp+")";
						ctx.beginPath();
						ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
						ctx.fill();
						ctx.restore();
					}
				},1000/60)
				
				//往arr中注入随机圆的信息
				time2=setInterval(function(){
					var r =Math.random()*6+2;
					var x = Math.random()*oc.width;
					var y = oc.height - r;
					var red =   Math.round(Math.random()*255);
					var green = Math.round(Math.random()*255);
					var blue =  Math.round(Math.random()*255);
					var alp = 1;
					var deg =0;
					var startX = x;
					var startY = y;
					var step =Math.random()*20+10;
					arr.push({
						x:x,
						y:y,
						r:r,
						red:red,
						green:green,
						blue:blue,
						alp:alp,
						deg:deg,
						startX:startX,
						startY:startY,
						step:step
					})
				},50)
			}
		}
		
		function removeCanvas(){
			oc.remove();
			oc=null;
			clearInterval(time1);
			clearInterval(time2);
		}
	}
	
	
	
	//第四屏图片炸裂效果
	picBoom();
		function picBoom(){
			for(var i=0;i<aboutUls.length;i++){
				 change(aboutUls[i]);
			}
		function change(UL){
			var src = UL.dataset.src;
			var w = UL.offsetWidth/2;
			var h = UL.offsetHeight/2;
			for(var i = 0;i<4;i++){
				var liNode = document.createElement("li");
				liNode.style.width = w+"px";
				liNode.style.height = h+"px";
				var imgNode = document.createElement("img");
						/*
						1. left:0    top:0
						2. left:-w   top:0
						3. left:0    top:-h
						4. left:-w   top:-h
						*/
					   /*
						1. left:0    top:h
						2. left:-2w   top:0
						3. left:w    top:-h
						4. left:-w   top:-2h
						
						var arrLeft=[0,-2,1,-1];
						var arrTop=[1,0,-1,-2];
						*/
				imgNode.style.left= -(i%2)*w+"px";
				imgNode.style.top=  -Math.floor(i/2)*h+"px";
				imgNode.src = src;
				
				liNode.appendChild(imgNode)
				UL.appendChild(liNode);

			}
			UL.onmouseenter=function(){
				var imgNodes = this.querySelectorAll("li>img");
				imgNodes[0].style.top = h+"px";
				imgNodes[1].style.left = -2*w+"px";
				imgNodes[2].style.left = w+"px";
				imgNodes[3].style.top = -2*h+"px";
			}
			UL.onmouseleave=function(){
				var imgNodes = this.querySelectorAll("li>img");
				imgNodes[0].style.top = 0+"px";
				imgNodes[1].style.left = -w+"px";
				imgNodes[2].style.left = 0+"px";
				imgNodes[3].style.top = -h+"px";
			}
		}
	}
	
	
	//第一屏3D效果
	var oldIndex = 0;
	var timer3D = "lzy";
	var autoIndex = 0;
	function home3D(){
		for(var i = 0;i<home2LiNodes.length;i++){
			home2LiNodes[i].index = i;
			home2LiNodes[i].onclick = function(){
				clearInterval(timer3D);
				for (var i = 0;i<home2LiNodes.length;i++) {
					home2LiNodes[i].classList.remove("active");
				}
				this.classList.add("active")
				if(this.index>oldIndex){
					home1LiNodes[this.index].classList.remove("leftShow");
					home1LiNodes[this.index].classList.remove("leftHide");
					home1LiNodes[this.index].classList.remove("rightHide");
					home1LiNodes[this.index].classList.add("rightShow");
					
					home1LiNodes[oldIndex].classList.remove("leftShow");
					home1LiNodes[oldIndex].classList.remove("rightShow");
					home1LiNodes[oldIndex].classList.remove("rightHide");
					home1LiNodes[oldIndex].classList.add("leftHide");
				}
				
				if(this.index<oldIndex){
					home1LiNodes[this.index].classList.remove("rightShow");
					home1LiNodes[this.index].classList.remove("leftHide");
					home1LiNodes[this.index].classList.remove("rightHide");
					home1LiNodes[this.index].classList.add("leftShow");
					
					
					home1LiNodes[oldIndex].classList.remove("leftShow");
					home1LiNodes[oldIndex].classList.remove("rightShow");
					home1LiNodes[oldIndex].classList.remove("leftHide");
					home1LiNodes[oldIndex].classList.add("rightHide");
					
				}
				oldIndex = this.index;
				autoIndex = this.index;
				//重新开启自动轮播
				//move();
			}
		}
		
		move();
		function move(){
			clearInterval(timer3D);
			timer3D = setInterval(function(){
				autoIndex++;
				if(autoIndex == home1LiNodes.length){
					autoIndex = 0;
				}
				for(var i = 0;i<home2LiNodes.length;i++){
					home2LiNodes[i].classList.remove("active");
				}
				home2LiNodes[autoIndex].classList.add("avtive");
				
				home1LiNodes[autoIndex].classList.remove("leftShow");
				home1LiNodes[autoIndex].classList.remove("leftHide");
				home1LiNodes[autoIndex].classList.remove("rightHide");
				home1LiNodes[autoIndex].classList.add("rightShow");
				
				
				home1LiNodes[oldIndex].classList.remove("leftShow");
				home1LiNodes[oldIndex].classList.remove("rightShow");
				home1LiNodes[oldIndex].classList.remove("rightHide");
				home1LiNodes[oldIndex].classList.add("leftHide");
				
				oldIndex = autoIndex;
				
			},2000)
		}
		
		
		home1.onmouseenter=function(){
			clearInterval(timer3D);
		}
		
		home1.onmouseleave=function(){
			move();
		}
		
		
	}
	//内容区
		/*
		 调整分辨率
			1.没有点击的时候视口只能出现一屏  contentBind();
			2.点击后视口只能出现一屏  在1的基础上对每一屏的偏移量进行重新调整
			3.小箭头的位置也需要头部
		*/
	window.onresize = function(){
		contentBind();
		cList.style.top = -now*(document.documentElement.clientHeight - head.offsetHeight)+"px";
		arrowEl.style.left = liNodes[now].offsetLeft + liNodes[now].offsetWidth/2 - arrowEl.offsetWidth/2+"px";
	}
	
	//滚轮
	if(content.addEventListener){
		content.addEventListener("DOMMouseScroll",function(ev){
			ev = ev||event;
			clearTimeout(timer);
			timer = setTimeout(function(){
				fn(ev)
			},200)
		})
	}
	
	content.onmousewheel = function(ev){
		ev = ev||event;
		clearTimeout(timer);
		timer = setTimeout(function(){
			fn(ev)
		},200)
	}
	
	function fn(ev){
		ev = ev||event;
		var dir = "";
		if(ev.wheelDelta){
			dir = ev.wheelDelta>0?"up":"down";
		}else if(ev.deltail){
			dir = ev.deltail<0?"up":"down";
		}
		preIndex = now;
		switch (dir){
			case "up":if(now>0){
				now--;
				move(now);
			}
				break;
			case "down":if(now<cLiNodes.length-1){
				now++;
				move(now);
			}
				break;
			
		}
	}
	
	contentBind();
	function contentBind(){
		content.style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
		for(var i=0;i<cLiNodes.length;i++){
			cLiNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight + "px";
		}
	}
	//头部交互
		headBind();
		function headBind(){
			firstUpNode.style.width = "100%";
			arrowEl.style.left = firstLiNode.offsetLeft + firstLiNode.offsetWidth/2 - arrowEl.offsetWidth/2+"px";
			for(var i=0;i<liNodes.length;i++){
				liNodes[i].index = i;
				liNodes[i].onclick=function(){
					preIndex =now;
					move(this.index);
					now = this.index;
				}
			}
			for(var i=0;i<dotLis.length;i++){
				dotLis[i].index = i;
				dotLis[i].onclick=function(){
					preIndex =now;
					move(this.index);
					now = this.index;
				}
			}
			
		}
	
	//动画的核心函数
	function move(index){
		for(var i=0;i<upNodes.length;i++){
			upNodes[i].style.width = "";
		}
		upNodes[index].style.width = "100%";
		arrowEl.style.left = liNodes[index].offsetLeft + liNodes[index].offsetWidth/2 - arrowEl.offsetWidth/2+"px";
		cList.style.top = -index*(document.documentElement.clientHeight - head.offsetHeight)+"px";
		for(var i=0;i<dotLis.length;i++){
			dotLis[i].className="";
		}
		dotLis[index].className="active";
		//出入场
		if(anArr[index]&&typeof anArr[index]["inAn"] === "function"){
			anArr[index]["inAn"]();
		}
		if(anArr[preIndex]&&typeof anArr[preIndex]["inAn"] === "function"){
			anArr[preIndex]["outAn"]();
		}
	
	}
	
	
	
	
}