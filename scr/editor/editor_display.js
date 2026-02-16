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
        drawAxialPlanes(v, size, 25);       // 1. 半透明平面
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
// 1. 半透明平面
function drawAxialPlanes(v, size, alpha) {
    noStroke();
    let sx = v.x >= 0 ? size : -size;
    let sy = v.y >= 0 ? size : -size;
    let sz = v.z >= 0 ? size : -size;

    // XY 平面 (黃)
    fill(255, 255, 0, alpha); 
    beginShape();
    vertex(0, 0, 0); vertex(sx, 0, 0); vertex(sx, sy, 0); vertex(0, sy, 0);
    endShape(CLOSE);

    // YZ 平面 (青)
    fill(0, 255, 255, alpha);
    beginShape();
    vertex(0, 0, 0); vertex(0, sy, 0); vertex(0, sy, sz); vertex(0, 0, sz);
    endShape(CLOSE);

    // XZ 平面 (紫)
    fill(255, 0, 255, alpha);
    beginShape();
    vertex(0, 0, 0); vertex(sx, 0, 0); vertex(sx, 0, sz); vertex(0, 0, sz);
    endShape(CLOSE);
}

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