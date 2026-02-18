/**
 * 處理向量微調 (WASDQE)
 * A/D: X 軸 | Q/E: Y 軸 | W/S: Z 軸
 * 同時按下 ENTER 會輸出代碼
 */
function handleManualVectorTweak(myActor) {
	let activeJoint = jointNames[currentJointIndex];
	let v = myActor.vPose[activeJoint]; // 直接修改 Actor 當前的向量數據
	if (!v) return;
	
	let changed = false;

	// --- 新增：R/F 調整步長 (Step Size) ---
	// 使用 keyIsPressed 確保單次按壓只跳一格，避免按住時數值狂飆
	if (keyIsPressed) {
		if (key === 'g' || key === 'G') {
			tweakStep *= 1.2; // 增加 20% 步長
			key = ''; // 清除按鍵狀態避免重複觸發
		}
		if (key === 'f' || key === 'F') {
			tweakStep *= 0.8; // 減少 20% 步長
			key = '';
		}
	}
	tweakStep = constrain(tweakStep, 0.001, 0.5);
	if(actorPositionedit){
		// A/D 控制 X 軸   
		if (keyIsDown(65)) {myActor.config.position.x += tweakStep; changed = true;}
		if (keyIsDown(68)) {myActor.config.position.x -= tweakStep; changed = true;}
		
		// Q/E 控制 Y 軸
		if (keyIsDown(81)) {myActor.config.position.y -= tweakStep; changed = true;} 
		if (keyIsDown(69)) {myActor.config.position.y += tweakStep; changed = true;}
		
		// W/S 控制 Z 軸
		if (keyIsDown(87)) {myActor.config.position.z += tweakStep; changed = true;}
		if (keyIsDown(83)) {myActor.config.position.z -= tweakStep; changed = true;}

		// R 鍵旋轉 90 度
		if (keyIsDown(82)) {myActor.config.rotation -= tweakStep; changed = true;}
		
	}else if(actorHeightedit){
		// Q/E 控制 Y 軸
		if (keyIsDown(81)) {myActor.config.position.y -= tweakStep; changed = true;} 
		if (keyIsDown(69)) {myActor.config.position.y += tweakStep; changed = true;}
	}else if(referenceImageEnable){
		// A/D 控制 X 軸
		if (keyIsDown(65)) {refPos.x += tweakStep; changed = true;}
		if (keyIsDown(68)) {refPos.x -= tweakStep; changed = true;}
		
		// Q/E 控制 Y 軸
		if (keyIsDown(81)) {refPos.y -= tweakStep; changed = true;} 
		if (keyIsDown(69)) {refPos.y += tweakStep; changed = true;}
		
		// W/S 控制 Z 軸
		if (keyIsDown(87)) {refPos.z += tweakStep; changed = true;}
		if (keyIsDown(83)) {refPos.z -= tweakStep; changed = true;}

		// R 鍵旋轉 90 度
		if (keyIsDown(82)) {refRotY += tweakStep; changed = true;}
	}else{
		// A/D 控制 X 軸
		if (keyIsDown(65)) {v.x += tweakStep; changed = true;}
		if (keyIsDown(68)) {v.x -= tweakStep; changed = true;}
		
		// Q/E 控制 Y 軸
		if (keyIsDown(81)) {v.y -= tweakStep; changed = true;} 
		if (keyIsDown(69)) {v.y += tweakStep; changed = true;}
		
		// W/S 控制 Z 軸
		if (keyIsDown(87)) {v.z += tweakStep; changed = true;}
		if (keyIsDown(83)) {v.z -= tweakStep; changed = true;}
	}
	
	if (changed) {
		v.normalize();// 保持骨骼長度不變
		editedJoints.add(activeJoint); // 標記為已編輯
	}
	
	// 按下 Enter (keyCode 13) 導出整套姿勢參數
	if (keyIsPressed) {
		if (keyCode === ENTER) exportCurrentPose();
		if (key === 'p' || key === 'P') exportPartialPose();
	}
}

/**
 * 遍歷所有關節並生成可貼回 PoseLibrary 的格式
 */
function exportCurrentPose() {
    let output = "\"NEW_POSE\": (val) => ({\n";
	 // 匯出時加入這行
	 output += `    Position: createVector(${myActor.config.position.x.toFixed(2)}, ${myActor.config.position.y.toFixed(2)}, ${myActor.config.position.z.toFixed(2)}),\n`;
    output += `    movement: val,\n`
	 jointNames.forEach(name => {
        let vec = myActor.vPose[name];
        if (vec) {
            let isEdited = editedJoints.has(name);
            let line = `    ${name.padEnd(10)}: createVector(${vec.x.toFixed(2)}, ${vec.y.toFixed(2)}, ${vec.z.toFixed(2)}),`;
            
            // 如果被編輯過，加上註解
            if (isEdited) {
                line += " // [EDITED]";
            }
            
            output += line + "\n";
        }
    });
    
    output += "}),";
    
    console.log("%c --- 新姿勢參數已匯出 --- ");
    console.log(output);
    
    // 匯出後可以選擇是否清空追蹤，或者保留到下次
    // editedJoints.clear(); 
}

function exportPartialPose() {
    let output = "\"PARTIAL_POSE\": (val) => ({\n";
    let count = 0;
	 output += `    Position: createVector(${myActor.config.position.x.toFixed(2)}, ${myActor.config.position.y.toFixed(2)}, ${myActor.config.position.z.toFixed(2)}),\n`;
    output += `    movement: val,\n`
	 editedJoints.forEach(name => {
        let vec = myActor.vPose[name];
        output += `    ${name.padEnd(10)}: createVector(${vec.x.toFixed(2)}, ${vec.y.toFixed(2)}, ${vec.z.toFixed(2)}),\n`;
        count++;
    });

    output += "}),";
    
    if (count > 0) {
        console.log("%c --- 局部姿勢匯出 (僅包含修改項) --- ");
        console.log(output);
    } else {
        console.log("尚未修改任何關節，無法匯出局部姿勢。");
    }
}

// --- 輸入處理重構 ---
function keyPressed() {
	handleJointSelection();   // M 鍵
	handleCameraAngles();    // 1-6 數字鍵
	handleToggleDisplay();    // H, J 鍵
	// print(keyCode)
	if(keyCode == 32){
		replay = true;
		key = ' ';
	}
	if(key === 'k' || key ==='K'){
		editModeEnable = !editModeEnable;
	}
	if (key === 'l' || key === 'L') {
		referenceImageEnable = !referenceImageEnable;
		key = '';
	}
	if(key === 'n' || key ==='N'){
		actorHeightedit = !actorHeightedit;
		key = '';
	}
	if(key === 'b' || key ==='B'){
		actorPositionedit = !actorPositionedit;
		key = '';
	}
}

function handleJointSelection() {
	// M 鍵循環切換關節
	if (key === 'm' || key === 'M') {
		currentJointIndex = (currentJointIndex + 1) % jointNames.length;
		// console.log(`Current Joint: ${jointNames[currentJointIndex]}`);
	}
}

function handleToggleDisplay() {
    if (key === 'h' || key === 'H') {
        showAxes = !showAxes;
        // console.log("Axes Display:", showAxes ? "ON" : "OFF");
    }
	 if (key === 'j' || key === 'J') {
        showActor = !showActor;
        // console.log("showActor Display:", showActor ? "ON" : "OFF");
    }
}

