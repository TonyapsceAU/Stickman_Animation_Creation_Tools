function drawHUD(myActor) {
    if (!myFont) return;
    
    push();
    // 進入 2D HUD 視角
    camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    
    let padding = 30;
    let boxW = 280; 
    let boxH = 340; // 稍微增加左側高度以容納 Velocity 資訊
    
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
    
    // 3. 渲染右側參考圖面板 (獨立背景)
    let rightX = width - padding * 2 - boxW;
    let rightY = 15; // 從右上方開始
    rightY = hud_ReferenceImage(rightX, rightY, boxW, lineH);

    // 4. 姿勢目錄 (自動接在參考圖下方)
    // rightY = hud_PoseDirectory(rightX, rightY, 18); 
    
    // 5. 快捷鍵說明清單 (固定於右下)
    hud_KeyInstructions(rightX, height - padding * 2, boxW);
    
    pop();
}

// --- 分離的子功能函數 ---

function hud_SystemInfo(x, y, lineH) {
    fill(180);
    text("▼ SYSTEM & GLOBAL MODE", x, y);
    
    // 1. Edit Mode 狀態標籤
    let modeColor = editModeEnable ? "#FFD700" : "#888888"; 
    fill(modeColor);
    rect(x + 10, y + lineH - 12, 100, 20, 4);
    fill(0);
    textAlign(CENTER, CENTER);
    text(editModeEnable ? "EDIT ACTIVE" : "PREVIEW", x + 60, y + lineH - 2);

	// 2. Actor Height Edit 狀態標籤 (按住 N 時亮起)
    if (actorHeightedit) {
        textAlign(LEFT, CENTER);
        fill("#00F0FF"); 
        rect(x + 120, y + lineH - 12, 100, 20, 4);
        fill(0);
        textAlign(CENTER, CENTER);
        text("HEIGHT ADJ", x + 170, y + lineH - 2);
    }else if (actorPositionedit) {
        textAlign(LEFT, CENTER);
        fill("#00F0FF"); 
        rect(x + 120, y + lineH - 12, 100, 20, 4);
        fill(0);
        textAlign(CENTER, CENTER);
        text("POSITION ADJ", x + 170, y + lineH - 2);
    }
	 
    textAlign(LEFT, TOP);
    
    y += lineH * 1.2;
    drawStatusLight(x + 10, y + lineH, showAxes, "Axes");
    drawStatusLight(x + 100, y + lineH, showActor, "Actor");
    
    // 顯示當前步長 (精確到小數點後四位)
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

function hud_JointDetail(myActor,x, y, lineH) {
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
        { k: "P", d: "Export Partial Pose" },
		  { k: "N", d: "Actor Global Height" },
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