let jointNames = [];
let myActor;
let replay = false;
let myFont;

function usersetup(){
	myActor = new Actor(createActorConfig(),[255,0,0,255]);
	
	//for displaying privious pose
	// myActor2 = new Actor(createActorConfig(),[255,0,0,200]);
	// myActor2.addCommand("RUNNING_SET");
	// myActor2.addCommand("RUNNING_POSE_1");
	
	// myActor3 = new Actor(createActorConfig(),[255,0,0,150]);
	// myActor3.addCommand("RUNNING_SET");

	
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
	
	
	// print(myActor.poseQueue)
	if(showActor) {
		myActor.update();
		myActor.display(true);
		// myActor2.update();
		// myActor2.display(false);
		// myActor3.update();
		// myActor3.display(false);
	}

	
	// 繪製座標軸
	let activeJoint = jointNames[currentJointIndex];
	if (showAxes) {
		drawJointAxes(myActor, activeJoint, 100);
	}
	if(editModeEnable){
		handleManualVectorTweak(myActor);// 在顯示軸的同時，啟動按鍵監聽
	}
	if(replay){
		Choreography(myActor);
		replay = false;
	}
	

	
	if(referenceImageEnable){
		loadimage();
		referenceImageShow = true;
	}
	if(referenceImageShow){
		ImageDsipaly();
	}


	
	drawHUD(myActor);
}



function drawGround() {
    push();
    // 1. 將平面旋轉 90 度使其水平
    rotateX(HALF_PI); 
    
    // 稍微向下偏移避免閃爍
    translate(0, 0, -0.5); 

    // 2. 繪製主地面與網格
    fill(50, 50, 50, 150); 
    stroke(80);           
    plane(2000, 2000, 20, 20); // 增加細分參數產生網格感
    
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