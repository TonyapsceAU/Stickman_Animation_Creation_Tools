/**
 * 核心進入點：繪製選中關節的調試視覺輔助
 */
function drawJointAxes(actor, jointName, size = 50) {
	let targetPos = actor.joints[jointName]; // 終點
	let v = actor.vPose[jointName];          // 方向向量
	if (!targetPos || !v) return;
	
	// 關鍵修正：將座標原點移至父節點 (起始點)
	let parentName = getParentJoint(jointName);
	let startPos = parentName ? actor.joints[parentName] : targetPos;
	
	push();
		// --- 關鍵修正：同步世界位移與旋轉 ---
		// 1. 移動到角色在世界中的位置
		translate(actor.config.position.x, actor.config.position.y, actor.config.position.z);
		
		// 2. 執行世界旋轉 (確保輔助線方向與角色面向一致)
		rotateY(actor.config.rotation || 0);
		
		// 3. 移動到關節相對於角色的位置
		translate(startPos.x, startPos.y, startPos.z);
		
		// 接下來繪製輔助 UI
		// drawAxialPlanes(v, size, 25);       // 1. 半透明平面, removed because its blocking view
		drawAxesLines(v, size);             // 2. 座標軸線
		drawStrengthMarkers(v, size);    // 3. 強度球體
		drawDirectionPreview(v, size);   // 4. 方向預覽線
		
		// 中心發光點
		noStroke();
		fill(255,0,0,100);
		sphere(1); 
	pop();
}

// --- 繪圖子函式 ---
// 1. 半透明平面, removed because its blocking view

// 2. 座標軸線
function drawAxesLines(v, size) {
	strokeWeight(0.5);
	// X - 紅：連向當前 X 分量的位置
	stroke(255, 0, 0, 180); line(0, 0, 0, (v.x >= 0 ? 1 : -1) * size, 0, 0);
	// Y - 綠：連向當前 Y 分量的位置
	stroke(0, 255, 0, 180); line(0, 0, 0, 0, (v.y >= 0 ? 1 : -1)  * size, 0); 
	// Z - 藍：連向當前 Z 分量的位置
	stroke(0, 0, 255, 180); line(0, 0, 0, 0, 0, (v.z >= 0 ? 1 : -1)  * size); 
}

// 3. 強度球體
function drawStrengthMarkers(v, size) {
	noStroke();
	const markerSize = 2;
	// X 球 (紅)
	push(); translate(v.x * size, 0, 0); fill(255, 0, 0); sphere(markerSize/2); pop();
	// Y 球 (綠)
	push(); translate(0, v.y * size, 0); fill(0, 255, 0); sphere(markerSize/2); pop();
	// Z 球 (藍)
	push(); translate(0, 0, v.z * size); fill(0, 0, 255); sphere(markerSize/2); pop();
}

/**
 * 4. 方向預覽線與平面投影
 * 繪製主向量方向，以及其在各平面上的分量投影
 */
function drawDirectionPreview(v, size) {
	// 取得向量在軸向上的縮放座標
	let vx = v.x * size;
	let vy = v.y * size;
	let vz = v.z * size;
	
	// --- 繪製平面投影線 (虛線感，使用較淡的顏色) ---
	strokeWeight(1);
	
	// XY 平面投影 (紅+綠)
	stroke(255, 255, 0, 100); 
	line(vx, vy, 0, 0, 0, 0);
	
	// YZ 平面投影 (綠+藍)
	stroke(0, 255, 255, 100);
	line(0, vy, vz, 0, 0, 0);
	
	// XZ 平面投影 (紅+藍)
	stroke(255, 0, 255, 100);
	line(vx, 0, vz, 0, 0, 0);
	
	// --- 繪製主方向向量線 ---
	stroke(255);
	strokeWeight(1.5);
	line(0, 0, 0, vx, vy, vz);
}

/**
 * 繪製道具的除錯輔助線 (Gizmo)
 * 放在 editor_display.js
 */
function drawPropAxes(prop) {
	if (!prop || !editModeEnable) return;
	let size = 40;
	
	push();
		// 1. 移動到關節世界位置
		let joint = prop.parentActor.joints[prop.parentJoint];
		let jointPos = p5.Vector.add(prop.parentActor.config.position, joint);
		translate(jointPos.x, jointPos.y, jointPos.z);
		
		// --- 繪製骨骼方向 (Bone Direction) ---
		let v = prop.dir;
		let rho = v.mag();
		if (rho > 0) {
			rotateY(atan2(v.x, v.z));
			rotateX(acos(v.y / rho));
		}
		strokeWeight(1);
		stroke(100, 100, 100, 150);
		line(0, 0, 0, prop.dir.x * size, prop.dir.y * size, prop.dir.z * size);
		
		// --- 繪製道具偏移與局部方向 (Offset & SocketDir) ---
		translate(prop.offset.x, prop.offset.y, prop.offset.z);
		
		// 道具的最終指向 (SocketDir) - 
		strokeWeight(0.5);
		// X - 紅：連向當前 X 分量的位置 
		stroke(255, 0, 0, 180); line(0, 0, 0, (prop.socketDir.x >= 0 ? 1 : -1) * size, 0, 0);
		push(); translate(prop.socketDir.x * size, 0, 0); fill(255, 0, 0); sphere(1); pop();//value marker
		
		// Y - 綠：連向當前 Y 分量的位置
		stroke(0, 255, 0, 180); line(0, 0, 0, 0, (prop.socketDir.y >= 0 ? 1 : -1)  * size, 0); 
		push(); translate(0, prop.socketDir.y * size, 0); fill(0, 255, 0); sphere(1); pop();//value marker
		
		// Z - 藍：連向當前 Z 分量的位置
		stroke(0, 0, 255, 180); line(0, 0, 0, 0, 0, (prop.socketDir.z >= 0 ? 1 : -1)  * size); 
		push(); translate(0, 0, prop.socketDir.z * size); fill(0, 0, 255); sphere(1); pop();//value marker
	pop();
}