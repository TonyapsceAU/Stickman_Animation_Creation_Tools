let refImage = null;
let refPos = null; // p5.Vector
let refRotY = 0;   // 圖片的 Y 軸旋轉
let referenceImageEnable = false;
let referenceImageShow = true;
let refresize = 0.1;
let reflist = [];
let refindex = 0;

function loadimagesname(){
	// I want this to load all image name and file type  as a list then load the first image, and editor_control can use m key to cycle image 
	reflist = [];
	loadimage()
}

function loadimage(){
	if(!refImage){
		// scorct = reflist[refindex];//read assets/image/ and get all the image path
		scorct = "are-we-gonna-see-some-survival-rifles-like-these-22lr-on-v0-cbe5nmkrrsub1.jpg.webp";
		refImage = loadImage("assets/image/"+scorct); // load the first image
		refPos = createVector(0, 0, 0);
		refRotY = 0;
	}
}


function ImageDsipaly(){
	if (!refImage) return; // 安全檢查
	push();
		// 如果是在 WEBGL 模式，注意座標單位與 2D 不同
		translate(refPos.x * 100, refPos.y * 100, refPos.z * 100); 
		rotateY(refRotY);
		imageMode(CENTER);
		tint(255, 150); 
		image(refImage, 0, 0, refImage.width * refresize, refImage.height * refresize);
	pop();
}
