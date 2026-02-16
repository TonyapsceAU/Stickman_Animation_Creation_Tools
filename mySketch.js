let jointNames = [];
let myActor;
let replay = false;
let config = {
	position: null,
	rotation: 0,
	head: 10, 
	neck: 2,
	chest: 10,
	pelvis: 15, 
	shoulderW: 3,
	// 手臂參數
	armUpperL: 15, armLowerL: 12,
	armUpperR: 15, armLowerR: 12,
	// 腿部參數
	legUpperL: 22, legLowerL: 22,
	legUpperR: 22, legLowerR: 22,
	// 腳掌長度
	feetL: 2, feetR: 2
};
let myFont;

function usersetup(){
	config.position = createVector(0,0,0);
	let colors = [255,0,0];
	myActor = new Actor(config,colors);
	Choreography(myActor);

	//for displaying privious pose
	myActor2 = new Actor(config,[100,100,100,100]);
	myActor2.addCommand("jogging_POSE_2");
}


function preload() {
    myFont = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	usersetup();
	// 直接呼叫 Actor 的方法取得清單
	jointNames = myActor.getJointNames();
}



function draw() {
	background(30);
	orbitControl();
	// Floor Grid for perspective
	// drawFloor();
	
	
	myActor.update();
	if(showActor) {
		myActor.display(true);
		myActor2.update();
		myActor2.display(false);
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



function drawFloor() {
	push();
	rotateX(HALF_PI);
	stroke(100);
	noFill();
	grid(10, 10, 500, 500); // Helper or manual loops
	pop();
}