function drawHUD(myActor) {
	if (!myFont) return;
	
	push();
		// 進入 2D HUD 視角
		camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
		
		let padding = 25;
		let boxW = 310; 
		let boxH = 365; // 稍微增加左側高度以容納 Velocity 資訊
		
		// 將座標移至左上角
		translate(-width / 2 + padding, -height / 2 + padding, 0);
		
		textFont(myFont);
		textSize(14);
		noStroke();
		
		// 1. 繪製左側面板背景
		drawGlassBox(0, 0, boxW, boxH);
		
		// 2. 渲染左側內容
		let x = 25;
		let y = 25;
		let lineH = 22;
		
		y = hud_SystemInfo(x, y, lineH);
		// 傳入 myActor 以取得最新物理狀態
		y = hud_ActorConfig(myActor, x, y, lineH); 
		y = hud_JointDetail(myActor, x, y, lineH);
		y = hud_PropDetail(Props[currentPropIndex], x, y, lineH)//new info
		
		// 3. 渲染右側參考圖面板 (獨立背景)
		let rightX = width - padding * 2 - boxW;
		let rightY = 15; // 從右上方開始
		rightY = hud_ReferenceImage(rightX+30, rightY, boxW-30, lineH);
		
		// 4. 姿勢目錄 (自動接在參考圖下方)
		// prioble: too long, will overlap with "control schema"
		// rightY = hud_PoseDirectory(rightX, rightY, 18); 
		
		// 5. 快捷鍵說明清單 (固定於右下)
		hud_KeyInstructions(rightX, height - padding * 2-15, boxW);

		
	
	pop();
}

// --- 分離的子功能函數 ---
function hud_SystemInfo(x, y, lineH) {
	fill(180);
	text("▼ SYSTEM & GLOBAL MODE", x, y);
	
	// 1. Edit Mode 總開關狀態
	let modeColor = editModeEnable ? "#FFD700" : "#888888"; 
	fill(modeColor);
	rect(x + 10, y + lineH - 12, 100, 20, 4);
	fill(0);
	textAlign(CENTER, CENTER);
	text(editModeEnable ? "EDIT ACTIVE" : "PREVIEW", x + 60, y + lineH - 2);

	// 2. 當前編輯子模式標籤 (根據 EDIT_MODES 顯示)
	if (editModeEnable) {
		let subModeColor = "#00F0FF";
		let modeLabel = currentEditMode; // 取得 "JOINT", "ACTOR_POS", "REF_IMAGE" 等
		
		textAlign(LEFT, CENTER);
		fill(subModeColor); 
		rect(x + 120, y + lineH - 12, 110, 20, 4);
		fill(0);
		textAlign(CENTER, CENTER);
		text(modeLabel, x + 175, y + lineH - 2);
	}
	 
	textAlign(LEFT, TOP);
	y += lineH * 1.2;
	drawStatusLight(x + 10, y + lineH, showAxes, "Axes");
	drawStatusLight(x + 100, y + lineH, showActor, "Actor");
	
	// 顯示當前步長
	fill(255, 150, 0); 
	text(`Step Size: ${tweakStep.toFixed(4)} (F/G adj.)`, x + 10, y + lineH * 2.5);
    
	return y + lineH * 3.8;
}

function hud_ActorConfig(myActor, x, y, lineH) {
	fill(180);
	text("▼ ACTOR WORLD STATE", x, y);
	fill(255);
	
	// 顯示當前位置 (config.position)
	text(`Pos: ${myActor.config.position.x.toFixed(1)}, ${myActor.config.position.y.toFixed(1)}, ${myActor.config.position.z.toFixed(1)}`, x + 10, y + lineH);
	
	// 顯示當前物理速度 (currentVelocity) - 這是你新加入的慣性功能
	let vel = myActor.currentVelocity || createVector(0,0,0);
	fill(100, 255, 100); // 綠色代表動力
	text(`Vel: ${vel.x.toFixed(2)}, ${vel.z.toFixed(2)} (Speed: ${vel.mag().toFixed(2)})`, x + 10, y + lineH * 2);
	
	fill(255);
	text(`Rot: ${myActor.config.rotation.toFixed(1)}°`, x + 10, y + lineH * 3);
	
	return y + lineH * 4.5;
}

function hud_JointDetail(myActor, x, y, lineH) {
	let activeJoint = jointNames[currentJointIndex];
	let v = myActor.vPose[activeJoint];
	let isActive = (currentEditMode === EDIT_MODES.JOINT && editModeEnable);
	
	// 如果是當前模式則用金黃色，否則用灰色
	fill(isActive ? "#FFCC00" : "#666666"); 
	text(`${isActive ? "●" : "○"} EDITING: ${activeJoint}`, x, y);
	
	if (v) {
		fill(isActive ? 230 : 100);
		text(`DIR < ${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)} >`, x + 15, y + lineH);
		text(`MAG [ ${v.mag().toFixed(2)} ]`, x + 15, y + lineH * 2);
	}
	return y + lineH * 3;
}

function hud_ReferenceImage(rightX, rightY, boxW, lineH) {
	let boxH = 180;
	drawGlassBox(rightX, rightY, boxW, boxH);
	
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
	return rightY + boxH + 15; // 回傳下一個面板的起點
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
	
	// 定義按鍵清單與功能描述
	let keys = [
		// --- 視角控制 ---
		{ k: "1",     d: "CAM: Front <-> Back" },
		{ k: "2",     d: "CAM: Left <-> Right" },
		{ k: "3",     d: "CAM: Top <-> Bottom" },
		{ k: "4",     d: "CAM: 8 Diagonal Views" },
		
		// --- 顯示開關 ---
		{ k: "H",     d: "Toggle Axes Display" },
		{ k: "J",     d: "Toggle Actor Display" },
		
		// --- 編輯控制 ---
		{ k: "K",     d: "MASTER EDIT TOGGLE" },
		{ k: "V",     d: "SWITCH MODE (Joint/Pos/Ref/Prop)" },
		{ k: "M",     d: "Next (Joint Mode/Prop Mode)" },
		{ k: "N",     d: "Toggle Prop Mode (offset/dir)" },
		{ k: "F / G", d: "Step Size Dec / Inc" },
		{ k: "W/A/S/D", d: "X / Z Axis Tweak" },
		{ k: "Q / E", d: "Y Axis (Height) Tweak" },
		{ k: "R", d: "Y Axis Rotation" },
		
		// --- 輸出與序列 ---
		{ k: "ENTER", d: "Export Full Pose" },
		{ k: "P",     d: "Export Partial Pose" },
		{ k: "SPACE", d: "Play/Pause/Replay Animation" },
		{ k: "TAB",	  d: "Toggle This Menu" }, // 提示使用者如何切換
		{ k: "↑ / ↓", d: "play speed control" }
	];

	// let boxH = (keys.length * lineH) + 45;
	let boxH = showControlSchema ? (keys.length * lineH) + 45 : 35;
	let yPos = bottomY - boxH;
	
	drawGlassBox(rightX, yPos, boxW, boxH);
	
	let x = rightX + padding;
	let y = yPos + padding;
	
	// 渲染標題
	fill(showControlSchema ? 180 : "#FFD700"); // 收起時標題變色提醒
	textSize(14);
	// 根據狀態顯示箭頭
	text(`${showControlSchema ? "▼" : "▲"} CONTROL SCHEMA (TAB)`, x, y);
	
	if (!showControlSchema) return; // 如果收起，直接結束函數

	y += lineH;			
	// 渲染按鍵表
	textSize(11);
	for (let i = 0; i < keys.length; i++) {
		let item = keys[i];
		
		// 針對不同功能的按鍵給予微小的顏色區分
		if (i < 4) fill(100, 200, 255);        // 視角鍵：淡藍色
		else if (i < 6) fill(150, 255, 150);  // 顯示鍵：淡綠色
		else if (i < 13) fill(255, 204, 0);   // 編輯鍵：金黃色
		else fill(255, 100, 100);             // 系統鍵：淡紅色
		
		text(item.k, x, y);
		fill(220);
		text(item.d, x + 75, y);
		y += lineH;
	}
}

function hud_PoseDirectory(x, y, lineH) {
	let names = Object.keys(PoseLibrary);
	let boxW = 280; // 與其他右側面板一致
	let boxH = (names.length * lineH * 0.9) + 40;
	
	// 繪製背景
	drawGlassBox(x, y, boxW, boxH);
	
	let padding = 15;
	let curX = x + padding;
	let curY = y + padding;
	
	fill(180);
	textSize(14);
	text("▼ POSE LIBRARY INDEX", curX, curY);
	curY += lineH;
	
	textSize(12);
	names.forEach((name) => {
		// 檢查是否為當前選中的姿勢 (需要你在主程式定義 currentPoseName)
		if (typeof currentPoseName !== 'undefined' && name === currentPoseName) {
			fill("#00F0FF"); // 使用亮藍色標示當前姿勢
			text(`> ${name}`, curX + 5, curY);
		} else {
			fill(150);
			text(`  ${name}`, curX + 5, curY);
		}
		curY += lineH * 0.9;
	});
    
	return y + boxH + 10; // 回傳下一個元件可以開始的高度
}

function hud_PropDetail(currentProp, x, y, lineH) {
	if (!currentProp) return y;
	let isActive = (currentEditMode === EDIT_MODES.PROP);
	
	fill(isActive ? "#FF00FF" : "#666666"); // 道具用紫色標示
	text(`${isActive ? "●" : "○"} PROP: ${currentProp.type}`, x, y);
	
	let off = currentProp.offset;
	fill(isActive ? (editPropDir ? color(100, 255, 100) : color(230)) : color(100));//if editing offset turn green
	text(`OFFSET < ${off.x.toFixed(2)}, ${off.y.toFixed(2)}, ${off.z.toFixed(2)} >`, x + 15, y + lineH);
	
	let dir = currentProp.socketDir;
	fill(isActive ? (editPropDir ? color(230) : color(100, 255, 100)) : color(100));//if editing direction turn green
	text(`DIRECTION < ${dir.x.toFixed(2)}, ${dir.y.toFixed(2)}, ${dir.z.toFixed(2)} >`, x + 15, y + lineH * 2);
	
	return y + lineH * 2.5;
}