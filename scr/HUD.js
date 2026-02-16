function drawHUD() {
	if (!myFont) return;
	
	push();
	// 進入 2D HUD 視角
	camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
	
	let padding = 30;
	let boxW = 280; // 依照你的要求加寬
	let boxH = 300; // 依照你的要求加長
	
	// 將座標移至左上角
	translate(-width / 2 + padding, -height / 2 + padding, 0);
	
	textFont(myFont);
	textSize(14);
	noStroke();
	
	// 1. 繪製左側面板背景
	drawGlassBox(0, 0, boxW, boxH);
	
	// 2. 渲染左側內容
	let x = 15;
	let y = 15;
	let lineH = 22;
	
	y = hud_SystemInfo(x, y, lineH);
	y = hud_ActorConfig(x, y, lineH);
	y = hud_JointDetail(x, y, lineH);
	
	// 3. 渲染右側參考圖面板 (獨立背景)
	let rightX = width - padding * 2 - boxW;
	hud_ReferenceImage(rightX, 0, boxW, lineH);
	
	// 4. 快捷鍵說明清單
	hud_KeyInstructions(rightX, height - padding * 2, boxW);
	
	
	pop();
}

// --- 分離的子功能函數 ---

 function hud_SystemInfo(x, y, lineH) {
    fill(180);
    text("▼ SYSTEM & GLOBAL MODE", x, y);
    
    // 1. 顯示 Edit Mode 開關 (全域手動微調開關)
    let modeColor = editModeEnable ? "#FFD700" : "#888888"; // 金黃色代表啟動，灰色代表關閉
    fill(modeColor);
    rect(x + 10, y + lineH - 12, 100, 20, 4); // 畫一個小標籤背景
    
    fill(0); // 標籤內的文字用黑色
    textAlign(CENTER, CENTER);
    text(editModeEnable ? "EDIT ACTIVE" : "PREVIEW", x + 60, y + lineH - 2);
    
    // 恢復文字設定
    textAlign(LEFT, TOP);
    
    // 2. 顯示輔助開關 (Axes / Actor)
    y += lineH * 1.2;
    drawStatusLight(x + 10, y + lineH, showAxes, "Axes");
    drawStatusLight(x + 100, y + lineH, showActor, "Actor");
    
    // 3. 象限資訊
    fill(100, 200, 255);
    let quadrant_name = ["Back-Right-Bottom", "Back-Left-Bottom", "Back-Right-Top", "Back-Left-Top", "Front-Right-Bottom", "Front-Left-Bottom", "Front-Right-Top", "Front-Left-Top"];
    let currentQuad = (typeof viewState !== 'undefined') ? quadrant_name[viewState.diagonal] : "N/A";
    text(`[ ${currentQuad} ]`, x + 10, y + lineH * 2.2);

	 // 顯示當前步長
    fill(255, 150, 0); // 橘色提醒
    text(`Step Size: ${tweakStep.toFixed(4)} (F/G adj.)`, x + 10, y + lineH * 3.2);
    
    return y + lineH * 4.5;
}

function hud_ActorConfig(x, y, lineH) {
    fill(180);
    text("▼ ACTOR CONFIG", x, y);
    fill(255);
    text(`Pos: ${config.position.x.toFixed(1)}, ${config.position.y.toFixed(1)}, ${config.position.z.toFixed(1)}`, x + 10, y + lineH);
    text(`Rot: ${config.rotation.toFixed(1)}°`, x + 10, y + lineH * 2);
    
    return y + lineH * 3.5;
}

function hud_JointDetail(x, y, lineH) {
    let activeJoint = jointNames[currentJointIndex];
    let v = myActor.vPose[activeJoint];
    
    fill(255, 204, 0); 
    text(`● JOINT: ${activeJoint}`, x, y);
    if (v) {
        fill(230);
        text(`DIR < ${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)} >`, x + 15, y + lineH);
        text(`MAG [ ${v.mag().toFixed(2)} ]`, x + 15, y + lineH * 2);
    }
    return y + lineH * 3;
}

function hud_ReferenceImage(rightX, rightY, boxW, lineH) {
    drawGlassBox(rightX, rightY, boxW, 180);
    
    let rx = rightX + 15;
    let ry = rightY + 15;

    fill(180);
    text("▼ REFERENCE IMAGE", rx, ry);
    
    if (referenceImageEnable) {
        fill(255, 50, 50);
        text("⚠️ MODE: EDITING (WASD/QE)", rx + 10, ry + lineH);
    } else {
        fill(100, 255, 100);
        text(`STATUS: ${referenceImageShow ? "VISIBLE" : "HIDDEN"}`, rx + 10, ry + lineH);
    }

    if (refPos) {
        fill(255);
        let infoY = ry + lineH * 2.5;
        text(`X: ${refPos.x.toFixed(2)}`, rx + 15, infoY);
        text(`Y: ${refPos.y.toFixed(2)}`, rx + 15, infoY + lineH);
        text(`Z: ${refPos.z.toFixed(2)}`, rx + 15, infoY + lineH * 2);
        fill(100, 200, 255);
        text(`ROT-Y: ${degrees(refRotY).toFixed(0)}°`, rx + 15, infoY + lineH * 3.2);
    }
}

// --- 視覺輔助組件 ---

function drawGlassBox(x, y, w, h) {
    fill(0, 0, 0, 150); // 稍微加深背景
    rect(x, y, w, h, 10); 
    noFill();
    stroke(255, 255, 255, 40);
    strokeWeight(1);
    rect(x, y, w, h, 10);
    noStroke();
}

function drawStatusLight(x, y, state, label) {
    fill(state ? "#00FF00" : "#FF4444");
    ellipse(x, y + 6, 8, 8);
    fill(255);
    text(label, x + 15, y);
}

function hud_KeyInstructions(rightX, bottomY, boxW) {
    let padding = 15;
    let lineH = 18;
    let keys = [
        { k: "W/S", d: "Z-Axis + / - " },
        { k: "A/D", d: "X-Axis + / - " },
        { k: "Q / E", d: "Y-Axis + / - " },
        { k: "F / G", d: "Step Size Dec / Inc " },
        { k: "R", d: "Rotate Image (90°)" },
        { k: "L", d: "Toggle Image Mode" },
        { k: "K", d: "Toggle Edit Mode" },
        { k: "H", d: "Toggle Show Index" },
        { k: "J", d: "Toggle Show Actor" },
        { k: "M", d: "Switch Joint Index" },
        { k: "ENTER", d: "Export Full Pose" },
        { k: "P", d: "Export Partial Pose" }
    ];

    let boxH = (keys.length * lineH) + 40;
    let yPos = bottomY - boxH; // 從底部往上推

    // 繪製背景
    drawGlassBox(rightX, yPos, boxW, boxH);

    let x = rightX + padding;
    let y = yPos + padding;

    fill(180);
    text("▼ KEYBOARD SHORTCUTS", x, y);
    y += lineH + 5;

    textSize(12); // 指令可以用小一點的字
    for (let item of keys) {
        fill(255, 204, 0); // 按鍵顏色
        text(item.k, x, y);
        fill(200); // 功能描述顏色
        text(item.d, x + 80, y);
        y += lineH;
    }
}