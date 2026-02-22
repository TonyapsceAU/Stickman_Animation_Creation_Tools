class Actor {
	constructor(config,colors) {
		this.config = config;
		this.colors = colors;
		this.vPose = {}; // 儲存當前的方向向量 [p5.Vector]
		this.joints = {};
		this.poseQueue = [];
		this.currentTask = null;
		this.lerpSpeed = 0.12;
		this.onPoseComplete = null;
		
		this.addCommand("STAND");
	}

	addCommand(poseName,val=null,speed=null) {
		if (PoseLibrary[poseName]) {
		// 獲取角度組目標
		let targetPose = PoseLibrary[poseName](val);
		this.poseQueue.push({ 
			pose: targetPose, 
			speed: speed // 如果有傳入特定速度，就存起來
		});
		}
	}

	// 核心工具：直接使用傳入的方向向量延伸骨骼
	calcNext(start, dirVector, len) {
		// 確保 dirVector 是向量且已歸一化
		let d = dirVector.copy().normalize();
		return p5.Vector.add(start, d.mult(len));
	}

	solveSkeleton(vPose) {
		let j = {};
		let c = this.config;
		
		// 1. 起點：頭部設為局部原點 (0, 0, 0)
		// 這樣 calculate 時就不會受外接 position 影響，單純計算骨架形狀
		j.head = createVector(0, 0, 0);
		
		// 2. 軀幹鏈 (由頭向下)
		j.neck    = this.calcNext(j.head, vPose.neck, c.neck + c.head/2);
		j.chest   = this.calcNext(j.neck, vPose.chest, c.chest);
		j.pelvis   = this.calcNext(j.chest, vPose.pelvis, c.pelvis);
		// j.pelvis  = this.calcNext(j.waist, vPose.pelvis, 0); 
		
		// 3. 手臂鏈 (肩膀 -> 肘部 -> 手部)
		j.shoulderL = this.calcNext(j.neck, vPose.shoulderL, c.shoulderW);
		j.elbowL    = this.calcNext(j.shoulderL, vPose.elbowL, c.armUpperL);
		j.handL     = this.calcNext(j.elbowL, vPose.handL, c.armLowerL);
		
		j.shoulderR = this.calcNext(j.neck, vPose.shoulderR, c.shoulderW);
		j.elbowR    = this.calcNext(j.shoulderR, vPose.elbowR, c.armUpperR);
		j.handR     = this.calcNext(j.elbowR, vPose.handR, c.armLowerR);
		
		// 4. 腿部鏈
		j.kneeL = this.calcNext(j.pelvis, vPose.kneeL, c.legUpperL);
		j.footL = this.calcNext(j.kneeL, vPose.footL, c.legLowerL);
		j.toeL  = this.calcNext(j.footL, vPose.toeL, c.feetL);
		
		j.kneeR = this.calcNext(j.pelvis, vPose.kneeR, c.legUpperR);
		j.footR = this.calcNext(j.kneeR, vPose.footR, c.legLowerR);
		j.toeR  = this.calcNext(j.footR, vPose.toeR, c.feetR);
		
		return j;
	}

	update() {
		// 1. 任務管理
		if (!this.currentTask && this.poseQueue.length > 0) {
			let taskWrapper = this.poseQueue.shift();
			this.currentTask = taskWrapper.pose;
			if (taskWrapper.speed) this.lerpSpeed = taskWrapper.speed;
			
			// 重置位移追蹤器
			this.moveProgress = 0; 
		}

		if (this.currentTask) {
			let finished = true;
			
			// 計算這一幀的進度增量 (從 0 到 1)
			// 我們用一個簡單的線性趨近來模擬，或者維持你原有的 lerp 風格
			let lastProgress = this.moveProgress;
			this.moveProgress = lerp(this.moveProgress, 1, this.lerpSpeed);
			let deltaProgress = this.moveProgress - lastProgress;
			
			for (let part in this.currentTask) {
				// --- A. 處理增量位移 (Movement Delta) ---
				if (part === "movement") {
					// 每一幀移動：總位移向量 * 這一幀增加的比例
					let moveDelta = p5.Vector.mult(this.currentTask.movement, deltaProgress);
					this.config.position.add(moveDelta);
					
					if (1 - this.moveProgress > 0.1) finished = false;
					continue;
				}

				// --- B. 處理旋轉 (依然是絕對值) ---
				if (part === "rotation") {
					let diffR = this.currentTask.rotation - this.config.rotation;
					this.config.rotation += diffR * this.lerpSpeed;
					if (Math.abs(diffR) > 0.01) finished = false;
					continue;
				}

				// --- C. 道具指令 ---
				if (part === "PROP_CMD") {
					// 轉發給目前與此道具
					let prop = this.currentTask.PROP_CMD.prop;
					let prop_config = {
						parentActor : this.currentTask.PROP_CMD.parentActor,
						parentJoint : this.currentTask.PROP_CMD.parentJoint,
						offset : this.currentTask.PROP_CMD.offset,
						socketDir : this.currentTask.PROP_CMD.socketDir,
						lerpSpeed : this.currentTask.PROP_CMD.lerpSpeed
					};
					prop.applyCommand(prop_config);
					continue;
				}

				// --- D. 關節插值 ---
				// if (!this.angles[part]) this.angles[part] = [0, 0, 0];
				if (!this.vPose[part]) this.vPose[part] = createVector(0, 1, 0);
				if (this.vPose[part]) {
					this.vPose[part] = p5.Vector.lerp(this.vPose[part], this.currentTask[part], this.lerpSpeed);
					if (p5.Vector.dist(this.vPose[part], this.currentTask[part]) > 0.1) {
						finished = false;
					}
				}else{
					this.vPose[part] = createVector(0, 1, 0);
				}
			
			}

			if (finished) {
				this.currentTask = null;
				this.moveProgress = 0; // 清空進度
				if (this.onPoseComplete) this.onPoseComplete();
			}
		}
		
		this.joints = this.solveSkeleton(this.vPose);
	}
	
	display(SeeBond) {
		push();
			// 將整個角色移動到世界座標
			translate(this.config.position.x, this.config.position.y, this.config.position.z);
			
			// 執行世界旋轉 (處理轉身後的新面向)
			// 確保 config.rotation 是一個弧度值或角度值
			rotateY(this.config.rotation);
		
			const bones = [
				['head', 'neck'], ['neck', 'chest'], ['chest', 'pelvis'],
				['neck', 'shoulderL'], ['shoulderL', 'elbowL'], ['elbowL', 'handL'], // 加入肩膀連接
				['neck', 'shoulderR'], ['shoulderR', 'elbowR'], ['elbowR', 'handR'],
				['pelvis', 'kneeL'], ['kneeL', 'footL'], ['footL', 'toeL'],
				['pelvis', 'kneeR'], ['kneeR', 'footR'], ['footR', 'toeR']
			];
			
			
			// 繪製骨骼 (這裡的座標現在是相對於角色中心的)
			if(!SeeBond){
				stroke(this.colors);
				strokeWeight(this.config.head / 2);
				for (let [a, b] of bones) {
					let pA = this.joints[a]; let pB = this.joints[b];
					if(pA && pB) line(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
				}
			} else {
				for (let [a, b] of bones) {
					let pA = this.joints[a]; let pB = this.joints[b];
					if(pA && pB) {
						strokeWeight(this.config.head / 2); stroke(this.colors);
						line(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
						strokeWeight(1); stroke(255);
						line(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
					}
				}
			}
			
			
			// Draw Head
			push();
				fill(this.colors);
				translate(this.joints.head.x, this.joints.head.y, this.joints.head.z);
				noStroke();
				sphere(this.config.head / 2);
			pop();
		pop();
	}

	// 在 Actor 類別內
	getJointNames() {
		// 這裡手動列出所有在 solveSkeleton 中定義的關節，確保順序固定
		return [
			'pelvis', 'chest', 'neck',
			'shoulderL', 'elbowL', 'handL',
			'shoulderR', 'elbowR', 'handR',
			'kneeL', 'footL', 'toeL',
			'kneeR', 'footR', 'toeR'
		];
	}
}