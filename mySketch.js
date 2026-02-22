// globle config
let jointNames = [];
let myActor;
let Play = false, Pause = false;
let myFont;
let Props = [];//chabnge from using currentProp to lsit of prop

function usersetup(){
	myActor = new Actor(createActorConfig(),[255,0,0,255]);
	let prop_config = {
		type: "sword",
		parentActor : myActor, 
		jointName : "handL",
		offset: createVector(-2.64, 2.32, -14.62),
		socketDir: createVector(0.00, 0.00, -0.64)//change to use direction instead of drgree
	};
	blade = new Prop_ATTACHED(prop_config);
	append(Props,blade);
	
	prop_config = {
		type: "sheath",
		parentActor : myActor, 
		jointName : "handL",
		offset: createVector(-2.64, 2.32, -14.62),
		socketDir: createVector(0.00, 0.00, -0.64)
	};
	sheath = new Prop_ATTACHED(prop_config);
	append(Props,sheath);
	
	//for displaying privious pose : 
	myActor2 = new Actor(createActorConfig(),[0,255,0,150]);//green
	// myActor2.addCommand("QUICK_DRAW_STRICK_1",createVector(20,29,0));
	// myActor2.addCommand("QUICK_DRAW_STRICK_2",createVector(5,0,5));
	
	myActor3 = new Actor(createActorConfig(),[0,0,255,150]);//blue
	// myActor3.addCommand("QUICK_DRAW_STRICK_1",createVector(20,29,0));
	// myActor3.addCommand("QUICK_DRAW_STRICK_2",createVector(5,0,5));
	// myActor3.addCommand("QUICK_DRAW_STRICK_3",createVector(-10,11,25+60));
	// myActor3.addCommand("QUICK_DRAW_STRICK_4",createVector(0,0,10));
	
	
	Choreography(myActor);
}


function preload() {
	myFont = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	usersetup();
	// 直接呼叫 Actor 的方法取得清單
	jointNames = myActor.getJointNames();
	// frameRate(10)
}



function draw() {
	background(30);
	orbitControl();
	// Floor Grid for perspective
	drawGround();
	
	if(playspeed!=1){
		myActor.lerpSpeed *= playspeed;
		playspeed = 1;
	}
	if(showActor) {
		if(!Pause){//change: can pause during animation
			myActor.update();
			for(let i=0;i<Props.length;i++){
				Props[i].update();
			}
			myActor2.update();
			myActor3.update();
		}
		myActor.display(true);
		for(let i=0;i<Props.length;i++){
			Props[i].display();
		}
		// myActor2.display(false);
		// myActor3.display(false);
	}

	
	// 繪製座標軸
	let activeJoint = jointNames[currentJointIndex];
	if (showAxes) {
		if(currentEditMode == "PROP"){//no need to show actor's axis when editing props
			drawPropAxes(Props[currentPropIndex]);//new features:helps to edit prop's offset and direction/rotation
		}else{
			drawJointAxes(myActor, activeJoint, 100);
		}
	}
	if(editModeEnable){
		handleManualVectorTweak(myActor);// 在顯示軸的同時，啟動按鍵監聽
	}
	if(Play){//true when "space" key was pressed
		if(myActor.poseQueue.length==0){//when animation ended
			Choreography(myActor);//replay
			Play = false;
		}else{
			Pause = !Pause;//togle pause and play
			Play = false;
		}
	}
	
	
	if(referenceImageEnable){
		loadimage();
		referenceImageShow = true;
	}else{
		// referenceImageShow = false;
	}
	
	if(referenceImageShow){
		ImageDsipaly();
	}


	
	drawHUD(myActor);
}



function drawGround() {//warning(not urgin):Cannot draw stroke on plane objects with more than 1 detailX or 1 detailY
    push();
	    // 1. 將平面旋轉 90 度使其水平
	    rotateX(HALF_PI); 
	    
	    // 稍微向下偏移避免閃爍
	    translate(0, 0, -0.5); 
	
	    // 2. 繪製主地面與網格
	    fill(255, 100); 
	    stroke(80);           
	    plane(2000, 2000); // 增加細分參數產生網格感
	    
	    // 3. 繪製中心點參考 (Origin Marker)
	    push();
		    translate(0, 0, 0.1); // 再往上浮動一點點，確保在地面上方
		    
		    // 中心圓圈
		    noFill();
		    stroke(255, 200);      // 較亮的白色
		    strokeWeight(2);
		    ellipse(0, 0, 50, 50); 
		    
		    // 中心實心點
		    fill(255, 255, 0);     // 黃色原點
		    noStroke();
		    ellipse(0, 0, 5, 5);
		    
		    // 十字準心 (Crosshair)
		    stroke(255, 150);
		    strokeWeight(1);
		    line(-60, 0, 60, 0);   // X 軸向線
		    line(0, -60, 0, 60);   // Z 軸向線 (旋轉後 Y 變 Z)
	    pop();
    
    pop();
}

function createActorConfig() {
	return {
		position: createVector(0, -77, 0), // 每次都建立新的 Vector
		rotation: 0,
		head: 10, neck: 2, chest: 10, pelvis: 15,
		shoulderW: 3,
		armUpperL: 15, armLowerL: 12, 
		armUpperR: 15, armLowerR: 12,
		legUpperL: 22, legLowerL: 22, 
		legUpperR: 22, legLowerR: 22,
		feetL: 2, feetR: 2
	};
}