class Prop_ATTACHED {
	constructor(config) {
		this.type = config.type;
		this.parentActor = config.parentActor;
		this.parentJoint = config.jointName;
		
		// 編輯器調整出的數值
		this.offset = config.offset || createVector(0, 0, 0);
		this.socketDir = config.socketDir || createVector(0, 0, 0);//change from rotation to direction
		// 插值目標值 (初始化時與當前值相同)
		this.targetOffset = this.offset.copy();
		this.targetSocketDir = this.socketDir.copy();
		this.lerpSpeed = 1; // 與 Actor 保持一致或自定義
		this.isEditing = false; // 新增：標記是否處於手動編輯狀態
		
		// 內部運算用的世界座標
		this.pos = createVector(0, 0, 0);
		this.dir = createVector(0, 1, 0); 
	}

	update() {
		if (!this.parentActor) return;
		
		// 如果不在手動編輯模式，才執行插值
		if (!this.isEditing) {
			this.offset = p5.Vector.lerp(this.offset, this.targetOffset, this.lerpSpeed);
			this.socketDir = p5.Vector.lerp(this.socketDir, this.targetSocketDir, this.lerpSpeed);
		} else {
			// 在編輯模式下，強制讓 target 等於當前值
			// 這樣當你結束編輯時，它不會彈回舊位置
			this.targetOffset = this.offset.copy();
			this.targetSocketDir = this.socketDir.copy();
		}
		
		let joint = this.parentActor.joints[this.parentJoint];
		if (joint) {
			this.pos = p5.Vector.add(this.parentActor.config.position, joint);
			this.dir = this.parentActor.vPose[this.parentJoint].copy();
		}
	}

	applyCommand(config) {
		if (!config) return;
		
		// 掛載點通常是瞬間切換 (Parent switching)
		if (config.parentActor) this.parentActor = config.parentActor;
		if (config.parentJoint) this.parentJoint = config.parentJoint;
		
		// 數值更新改為更新「目標」，而非直接覆蓋當前值
		if (config.offset) this.targetOffset = config.offset.copy();
		if (config.socketDir) this.targetSocketDir = config.socketDir.copy();
		if (config.lerpSpeed) this.lerpSpeed = config.lerpSpeed;
	}

	display() {
		push();
			// 1. 基礎世界位置
			translate(this.pos.x, this.pos.y, this.pos.z);
			
			// 2. 應用骨骼旋轉 (這決定了道具的基準座標系)
			this.applyJointRotation();
			
			// 3. 應用偏移
			translate(this.offset.x, this.offset.y, this.offset.z);
			
			// 4. 根據 socketDir 進行最後的指向旋轉
			// 我們將 socketDir 視為一個在骨骼局部空間的方向
			let v = this.socketDir;
			let rho = v.mag();
			if (rho > 0) {
				rotateY(atan2(v.x, v.z));
				rotateX(acos(v.y / rho));
			}
			
			this.drawShape();
		pop();
	}

    applyJointRotation() {
        let v = this.dir;
        let rho = v.mag();
        if (rho > 0) {
            rotateY(atan2(v.x, v.z));
            rotateX(acos(v.y / rho));
        }
    }

    drawShape() {
        fill(currentEditMode === EDIT_MODES.PROP ? "#FF00FF" : 200);
        stroke(255);
        if (this.type === "sword") {
            this.drawSword(); // 劍身
        } else if(this.type === "sheath") {
            this.drawSheath(); //劍鞘
        } else {
            this.drawBall(); // 預設方塊
        }
    }
	
	drawSword() {
		noStroke();
		// 畫一把簡單的劍
		fill("#dddbcd");
		box(1, 60, 2); // 劍身
		
		translate(0, -20, 0);
		box(1, 2, 4);  // 護手

		fill("#362d2c");
		translate(0, -5, 0);
		box(1.1, 7, 2.1);  // 手柄

		fill("#dec699");
		translate(0, 7, 0);
		box(1.1, 1.5, 2,1);  // habaki
	}

	drawSheath() {
		noStroke();
		fill("#dddbcd");
		translate(0, 6, 0);
		box(1.5, 50, 2.5); // 劍鞘
	}
	
	drawBall() {
		// 球類通常不需要跟隨旋轉，直接畫即可
		fill(currentEditMode === EDIT_MODES.PROP ? "#FF3232" : 200);
		noStroke();
		sphere(10);
	}
}