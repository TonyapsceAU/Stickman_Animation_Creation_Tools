class Prop_ATTACHED {
	constructor(config) {
		this.type = config.type;
		this.initPropModel(config.type);
		
		this.parentActor = config.parentActor;
		this.parentJoint = config.jointName;
		
		// 編輯器調整出的數值
		this.offset = config.offset || createVector(0, 0, 0);
		this.socketDir = config.socketDir || createVector(0, 0, 0);//change from rotation to direction
		// 插值目標值 (初始化時與當前值相同)
		this.targetOffset = this.offset.copy();
		this.targetSocketDir = this.socketDir.copy();
		this.lerpSpeed = 0.12; // 與 Actor 保持一致或自定義
		this.isEditing = false; // 新增：標記是否處於手動編輯狀態
		
		// 內部運算用的世界座標
		this.pos = createVector(0, 0, 0);
		this.dir = createVector(0, 1, 0); 
	}

	// 在 Prop_ATTACHED 類中
	initPropModel(type) {
		// 💡 關鍵：直接從 window 全域物件中尋找與 type 同名的類別
		// 假設 type 是 "M1897"，這行等同於 new M1897()
		const ModelClass = window[type];

		if (typeof ModelClass === 'function') {
			this.model = new ModelClass();
			this.model_val = []; // 預設為空陣列
			console.log(`Prop Model [${type}] 透過全域自動實例化成功。`);
		} else {
			console.error(`找不到道具模型類別: [${type}]。請檢查 model.js 內的 Class 名稱是否正確，或腳本是否載入失敗。`);
		}
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
		if (config.model_val) this.model_val = config.model_val;
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
			this.model.display(this.model_val);
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
}