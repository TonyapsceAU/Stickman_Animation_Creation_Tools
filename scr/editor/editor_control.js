function keyPressed() {
	handleCameraAngles();   // 1-6 數字鍵保留
	handleToggleDisplay();  // H, J 鍵保留

	// --- 模式切換邏輯 ---
	if (key === 'k' || key === 'K') editModeEnable = !editModeEnable;

	
	if (editModeEnable) {
		if (key === 'm' || key === 'M') {
			if(currentEditMode == "PROP"){
				// handlePropSelection(); // 切換
				currentPropIndex = (currentPropIndex + 1) % Props.length;
			}else if(currentEditMode == "JOINT"){
				currentJointIndex = (currentJointIndex + 1) % jointNames.length; // 切換關節
			}
			key = ' ';
		}
		
		
		// 使用一個V鍵循環切換編輯對象
		if (key === 'v' || key === 'V') {
			const modes = Object.values(EDIT_MODES);
			let idx = (modes.indexOf(currentEditMode) + 1) % modes.length;
			currentEditMode = modes[idx];
			if(currentEditMode == "REF_IMAGE"){//emabel reference image
				referenceImageEnable = true;
			}else{
				referenceImageEnable = false;
			}
		}
	
	}

    // 播放/暫停/重播
    if (keyCode === 32) {
		Play = true;
	}
}

function handleManualVectorTweak(myActor) {
	if (!editModeEnable) return;
	
	// 1. 步長調整 (G/F)
	if (keyIsPressed) {
		if (key === 'g' || key === 'G') { tweakStep = min(tweakStep * 1.1, 0.5); key = ''; }
		if (key === 'f' || key === 'F') { tweakStep = max(tweakStep * 0.9, 0.001); key = ''; }
	}

	// 2. 獲取當前操作目標
	let targetVec = null;
	let needsNormalize = false;

	switch (currentEditMode) {
		case EDIT_MODES.JOINT:
			let activeJoint = jointNames[currentJointIndex];
			targetVec = myActor.vPose[activeJoint];
			needsNormalize = true; 
			break;
            
		case EDIT_MODES.ACTOR_POS:
			targetVec = myActor.config.position;
			// 處理旋轉 (R 鍵)
			if (keyIsDown(82)) myActor.config.rotation -= tweakStep; 
			break;
		
		case EDIT_MODES.REF_IMAGE:
			targetVec = refPos;
			if (keyIsDown(82)) refRotY += tweakStep;
			break;

		case EDIT_MODES.PROP:
			// 假設 blade 是你當前實例化的 Prop 物件
			let currentProp = Props[currentPropIndex];
			if (currentProp) {
				if(key=="n"){
					editPropDir = !editPropDir;
					key = ' ';
				}
				if(editPropDir){
					targetVec = currentProp.offset; // WASDQE 現在控制局部偏移
					needsNormalize = false; // Offset 不需要歸一化
				}else{
					targetVec = currentProp.socketDir; // WASDQE 現在控制局部方向
					needsNormalize = true;  // 方向向量需要歸一化
				}
			}
			break;
    }

	// 3. 執行 WASDQE 統一位移
	if (targetVec) {
		let changed = false;
		// A/D: X 軸
		if (keyIsDown(65)) { targetVec.x += tweakStep; changed = true; }
		if (keyIsDown(68)) { targetVec.x -= tweakStep; changed = true; }
		// Q/E: Y 軸
		if (keyIsDown(81)) { targetVec.y -= tweakStep; changed = true; }
		if (keyIsDown(69)) { targetVec.y += tweakStep; changed = true; }
		// W/S: Z 軸
		if (keyIsDown(87)) { targetVec.z += tweakStep; changed = true; }
		if (keyIsDown(83)) { targetVec.z -= tweakStep; changed = true; }
		
		if (changed && needsNormalize) {
			targetVec.normalize();
			editedJoints.add(jointNames[currentJointIndex]);
		}
	}

	// 4. 匯出處理
	if (keyIsPressed) {
		if (canExport) {
			if (keyCode === ENTER) exportCurrentPose();
			if (key === 'p' || key === 'P') exportPartialPose();
			canExport = false; // 執行後立即鎖定，防止 draw 循環再次觸發
		}
	} else {
		canExport = true; // 當放開所有按鍵時，重設開關
	}
}

function exportCurrentPose() {
	let output = `"NEW_POSE": (val) => ({\n`;
	// 輸出當前的位置作為參考，或者是轉化為 movement 增量建議值
	output += `    // Actor World Position: ${myActor.config.position.x.toFixed(2)}, ${myActor.config.position.y.toFixed(2)}, ${myActor.config.position.z.toFixed(2)}\n`;
	output += `    movement: (val instanceof p5.Vector) ? val : createVector(0, 0, 0),\n`;
	
	jointNames.forEach(name => {
		let vec = myActor.vPose[name];
		if (vec) {
			let line = `    ${name.padEnd(10)}: createVector(${vec.x.toFixed(2)}, ${vec.y.toFixed(2)}, ${vec.z.toFixed(2)}),`;
			if (editedJoints.has(name)) line += " // [EDITED]";
			output += line + "\n";
		}
	});
	output += "}),\n\n\n";
	
	// 2. 導出道具數據
	if (typeof blade !== 'undefined') {
		output += PropExportData(Props[currentPropIndex]);
	}
	
	console.log(output);
}

function exportPartialPose() {
	let currentProp = Props[currentPropIndex];
	let output = "\"PARTIAL_POSE\": (val) => ({\n";
	let count = 0;
	output += `    Position: createVector(${myActor.config.position.x.toFixed(2)}, ${myActor.config.position.y.toFixed(2)}, ${myActor.config.position.z.toFixed(2)}),\n`;
	output += `    movement: val,\n`
	if(editedJoints){
		editedJoints.forEach(name => {
			let vec = myActor.vPose[name];
			if(vec){
			output += `    ${name.padEnd(10)}: createVector(${vec.x.toFixed(2)}, ${vec.y.toFixed(2)}, ${vec.z.toFixed(2)}),\n`;
			count++;
			}
		});
	}
	output += "}),\n";

	// 2. 導出道具數據
	if (typeof currentProp !== 'undefined') {
		output += PropExportData(Props[currentPropIndex]);
	}

	if (count > 0 && typeof currentProp !== 'undefined') {
		console.log("%c --- 局部姿勢匯出 (僅包含修改項) --- ");
		console.log(output);
	} else {
		console.log("尚未修改任何關節，無法匯出局部姿勢。");
	}
}

function PropExportData(prop) {
	if (!prop) return "";
	let output = `\n    // --- Prop Config [${prop.type}] ---\n`;
	output += `    prop_config: {\n`;
	output += `        Type: "${prop.type}",\n`;
	output += `        Parent: "${prop.parentActor}",\n`;
	output += `        jointName: "${prop.parentJoint}",\n`;
	output += `        offset: createVector(${prop.offset.x.toFixed(2)}, ${prop.offset.y.toFixed(2)}, ${prop.offset.z.toFixed(2)}),\n`;
	output += `        socketDir: createVector(${prop.socketDir.x.toFixed(2)}, ${prop.socketDir.y.toFixed(2)}, ${prop.socketDir.z.toFixed(2)})\n`;
	output += `    },\n`;
	
	return output;
}

function handleToggleDisplay() {
    if (key === 'h' || key === 'H') {
        showAxes = !showAxes;
    }
	 if (key === 'j' || key === 'J') {
        showActor = !showActor;
    }
}
