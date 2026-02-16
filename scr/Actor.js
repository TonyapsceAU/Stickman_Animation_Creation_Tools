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
		// if (!this.currentTask && this.poseQueue.length > 0) {
		// 	this.currentTask = this.poseQueue.shift();
		// }
		if (!this.currentTask && this.poseQueue.length > 0) {
	        let taskWrapper = this.poseQueue.shift();
	        this.currentTask = taskWrapper.pose;
	        
	        // 如果這個任務有指定速度，就更新當前的 lerpSpeed
	        if (taskWrapper.speed) {
	            this.lerpSpeed = taskWrapper.speed;
	        }
	    }
		
		if (this.currentTask) {
			let finished = true;

			for (let part in this.currentTask) {
				// --- 處理特殊的「世界旋轉」屬性 ---
				if (part === "rotation") {
					// 對角度進行插值 (lerp)
					let diff = this.currentTask.rotation - this.config.rotation;
					this.config.rotation += diff * this.lerpSpeed;
					
					if (Math.abs(diff) > 0.01) finished = false;
					continue; // 處理完旋轉，跳過後續的向量計算
				}

				// --- 處理常規的「關節向量」 ---
				if (!this.vPose[part]) this.vPose[part] = createVector(0, 1, 0);
				
				this.vPose[part] = p5.Vector.lerp(this.vPose[part], this.currentTask[part], this.lerpSpeed);
				
				if (p5.Vector.dist(this.vPose[part], this.currentTask[part]) > 0.1) {
					finished = false;
				}
			}

			if (finished) {
				this.currentTask = null;
				if(this.onPoseComplete) this.onPoseComplete();
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