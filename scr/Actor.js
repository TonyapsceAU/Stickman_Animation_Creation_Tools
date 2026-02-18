class Actor {
	constructor(config,colors) {
		this.config = config;
		this.colors = colors;
		this.vPose = {}; // �脣��嗅���䲮�穃��� [p5.Vector]
		this.joints = {};
		this.poseQueue = [];
		this.currentTask = null;
		this.lerpSpeed = 0.12;
		this.onPoseComplete = null;
		
		this.addCommand("STAND");
		
	}

	addCommand(poseName,val=null,speed=null) {
		if (PoseLibrary[poseName]) {
			// �脣�閫鍦漲蝯�𤌍璅�
			let targetPose = PoseLibrary[poseName](val);
			this.poseQueue.push({ 
			pose: targetPose, 
			speed: speed // 憒���匧��亦鸌摰𡁻�笔漲嚗�停摮䁅絲靘�
			});
		}
	}

	// �詨�撌亙�嚗𡁶凒�乩蝙�典��亦��孵��煾�撱嗡撓撉券盲
	calcNext(start, dirVector, len) {
		// 蝣箔� dirVector �臬��譍�撌脫飛銝���
		let d = dirVector.copy().normalize();
		return p5.Vector.add(start, d.mult(len));
	}

	solveSkeleton(vPose) {
		let j = {};
		let c = this.config;
		
		// 1. 韏琿�嚗𡁻��刻身�箏��典�暺� (0, 0, 0)
		// �蹱見 calculate ��停銝齿��堒��� position 敶梢𣳽嚗�鱓蝝磰�蝞烾爸�嗅耦��
		j.head = createVector(0, 0, 0);
		
		// 2. 頠�撟寥� (�梢��睲�)
		j.neck    = this.calcNext(j.head, vPose.neck, c.neck + c.head/2);
		j.chest   = this.calcNext(j.neck, vPose.chest, c.chest);
		j.pelvis   = this.calcNext(j.chest, vPose.pelvis, c.pelvis);
		// j.pelvis  = this.calcNext(j.waist, vPose.pelvis, 0); 
		
		// 3. �贝��� (�抵� -> �㗛� -> �钅�)
		j.shoulderL = this.calcNext(j.neck, vPose.shoulderL, c.shoulderW);
		j.elbowL    = this.calcNext(j.shoulderL, vPose.elbowL, c.armUpperL);
		j.handL     = this.calcNext(j.elbowL, vPose.handL, c.armLowerL);
		
		j.shoulderR = this.calcNext(j.neck, vPose.shoulderR, c.shoulderW);
		j.elbowR    = this.calcNext(j.shoulderR, vPose.elbowR, c.armUpperR);
		j.handR     = this.calcNext(j.elbowR, vPose.handR, c.armLowerR);
		
		// 4. �輸���
		j.kneeL = this.calcNext(j.pelvis, vPose.kneeL, c.legUpperL);
		j.footL = this.calcNext(j.kneeL, vPose.footL, c.legLowerL);
		j.toeL  = this.calcNext(j.footL, vPose.toeL, c.feetL);
		
		j.kneeR = this.calcNext(j.pelvis, vPose.kneeR, c.legUpperR);
		j.footR = this.calcNext(j.kneeR, vPose.footR, c.legLowerR);
		j.toeR  = this.calcNext(j.footR, vPose.toeR, c.feetR);
		
		return j;
	}

update() {
    // 1. 隞餃�蝞∠�
    if (!this.currentTask && this.poseQueue.length > 0) {
        let taskWrapper = this.poseQueue.shift();
        this.currentTask = taskWrapper.pose;
        if (taskWrapper.speed) this.lerpSpeed = taskWrapper.speed;
        
        // �滨蔭雿滨宏餈質馱��
        this.moveProgress = 0; 
    }

    if (this.currentTask) {
        let finished = true;
        
        // 閮���嗘�撟����脣漲憓鮋� (敺� 0 �� 1)
        // �穃�𤑳鍂銝��讠陛�桃�蝺𡁏�扯隅餈睲�璅⊥挱嚗峕���雁�������� lerp 憸冽聢
        let lastProgress = this.moveProgress;
        this.moveProgress = lerp(this.moveProgress, 1, this.lerpSpeed);
        let deltaProgress = this.moveProgress - lastProgress;

        for (let part in this.currentTask) {
            
            // --- A. �閧�憓鮋�雿滨宏 (Movement Delta) ---
            if (part === "movement") {
                // 瘥譍�撟�蝘餃�嚗𡁶蜇雿滨宏�煾� * �嗘�撟�憓𧼮����靘�
                let moveDelta = p5.Vector.mult(this.currentTask.movement, deltaProgress);
                this.config.position.add(moveDelta);
                
                if (1 - this.moveProgress > 0.1) finished = false;
                continue;
            }

            // --- B. �閧��贝� (靘萘��舐�撠滚��) ---
            if (part === "rotation") {
                let diffR = this.currentTask.rotation - this.config.rotation;
                this.config.rotation += diffR * this.lerpSpeed;
                if (Math.abs(diffR) > 0.01) finished = false;
                continue;
            }
            // --- C. �𦦵��鍦�� ---
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
            this.moveProgress = 0; // 皜�征�脣漲
            if (this.onPoseComplete) this.onPoseComplete();
        }
    }
	 // print(this.vPose)
    this.joints = this.solveSkeleton(this.vPose);
}
	
	display(SeeBond) {
		push();
			// 撠�㟲�贝��脩宏�訫�銝𣇉�摨扳�
			translate(this.config.position.x, this.config.position.y, this.config.position.z);
			
			// �瑁�銝𣇉��贝� (�閧�頧㕑澈敺𣬚��圈𢒰��)
			// 蝣箔� config.rotation �臭��见憫摨血�潭�閫鍦漲��
			rotateY(this.config.rotation);
		
			const bones = [
				['head', 'neck'], ['neck', 'chest'], ['chest', 'pelvis'],
				['neck', 'shoulderL'], ['shoulderL', 'elbowL'], ['elbowL', 'handL'], // �惩��抵���𦻖
				['neck', 'shoulderR'], ['shoulderR', 'elbowR'], ['elbowR', 'handR'],
				['pelvis', 'kneeL'], ['kneeL', 'footL'], ['footL', 'toeL'],
				['pelvis', 'kneeR'], ['kneeR', 'footR'], ['footR', 'toeR']
			];
			
			
			// 蝜芾ˊ撉券盲 (�躰ㄐ��漣璅嗵𣶹�冽糓�詨��潸��脖葉敹��)
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

	// �� Actor 憿𧼮ê̌��
	getJointNames() {
		// �躰ㄐ�见��堒枂���匧銁 solveSkeleton 銝剖�蝢拍��𦦵�嚗𣬚Ⅱ靽嗪�摨誩𤐄摰�
		return [
			'pelvis', 'chest', 'neck',
			'shoulderL', 'elbowL', 'handL',
			'shoulderR', 'elbowR', 'handR',
			'kneeL', 'footL', 'toeL',
			'kneeR', 'footR', 'toeR'
		];
	}
}