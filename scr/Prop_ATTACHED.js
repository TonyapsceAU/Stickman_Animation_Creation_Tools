class Prop_ATTACHED {
    constructor(config) {
        this.type = config.type;
        this.parentActor = config.parentActor;
        this.parentJoint = config.jointName;
        
        // 編輯器調整出的數值
        this.offset = config.offset || createVector(0, 0, 0);
        this.socketDir = config.socketDir || createVector(0, 0, 0);//change from rotation to direction
        
        // 內部運算用的世界座標
        this.pos = createVector(0, 0, 0);
        this.dir = createVector(0, 1, 0); 
    }

	update() {
		if (!this.parentActor) return;
		let joint = this.parentActor.joints[this.parentJoint];
		if (joint) {
			// 道具位置 = Actor 世界位置 + 關節相對位置
			this.pos = p5.Vector.add(this.parentActor.config.position, joint);
			// 道具方向 = 該關節目前的向量 (vPose)
			this.dir = this.parentActor.vPose[this.parentJoint].copy();
		}
	}

	applyCommand(config) {
		if (!config) return;
		// 僅處理掛載點與數值更新，不處理複雜插值
		if (config.parentJoint) this.parentJoint = config.parentJoint;
		if (config.offset) this.offset = config.offset.copy();
		if (config.socketDir) this.socketDir = config.socketDir.copy();//change from rotation to direction
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