let refImage = null;
let refPos = null; // p5.Vector
let refRotY = 0;   // 圖片的 Y 軸旋轉
let referenceImageEnable = false;
let referenceImageShow = true;

function loadimage(){
	if(!refImage){
		refImage = loadImage("assets/images/jogging_pose_3.png");
		refPos = createVector(0, 0, 0);
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
        // 指定顯示寬高，例如 200x200，避免縮小到看不見
        image(refImage, 0, 0, 100, 100); 
    pop();
}
