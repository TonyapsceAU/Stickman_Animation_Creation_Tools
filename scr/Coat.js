class Coat {
	constructor(bodyRadius, length = 80) {
		this.bodyRadius = bodyRadius;
		this.length = length;
		this.segments = 8; // 分段越多，裙擺越圓潤
		this.trimColor = color(255, 215, 0); // 戰術金色鑲邊
		this.mainColor = color(245, 245, 235); // 象牙白主色
		this.metalColor = color(119,119,119);
	}

	display(wJ, currentRotation){
		this.drawBody(wJ, currentRotation);
		// this.drawSkirt(wJ, currentRotation);
		// this.drwaBelt(wJ, currentRotation);
		// this.drawSleeves(wJ);
		// this.drawAceceries(wJ,currentRotation);
	}

	drawBody(wJ, currentRotation) {
		let numChains = this.segments + 1;
		let torsoJoints = ["neck", "chest", "pelvis"];
		let openAngle = 50; // 前開襟角度
    
		noStroke();
		fill(0); // 黑色主色
		// fill(this.mainColor);
		
		for (let y = 0; y < 2; y++) {
			beginShape(TRIANGLE_STRIP);
			for (let x = 0; x <= this.segments; x++) {
				let a = radians(openAngle / 2 + ((360 - openAngle) / this.segments) * x) + currentRotation;
				
				// --- 動態參數調整 ---
				let rUpper = this.bodyRadius * 1.1;
				let rLower = this.bodyRadius * 1.1;
				let yUpperOff = 0;
				let yLowerOff = 0;

            if (y === 0) { 
					// 第一層：Neck -> Chest
					rUpper = this.bodyRadius * 0.9; // 領口收窄
					rLower = this.bodyRadius * 0.7; // 胸部縮窄，做出倒三角感
					yUpperOff = -15; // --- 關鍵：將領口座標往上推，製造「立領」---
            } else {
					// 第二層：Chest -> Pelvis
					rUpper = this.bodyRadius * 0.7; // 胸部維持窄度
					rLower = this.bodyRadius * 1.1; // 腰部稍微放寬接續裙擺
				}
					
					// 繪製上方關節點
				vertex(
					wJ[torsoJoints[y]].x + rUpper * sin(a), 
					wJ[torsoJoints[y]].y + yUpperOff, 
					wJ[torsoJoints[y]].z + rUpper * cos(a)
				);
					
					// 繪製下方關節點
				vertex(
					wJ[torsoJoints[y + 1]].x + rLower * sin(a), 
					wJ[torsoJoints[y + 1]].y + yLowerOff, 
					wJ[torsoJoints[y + 1]].z + rLower * cos(a)
				);
			}
			endShape();
		}

		
		// 2. 繪製金色鑲邊 (開襟處與底邊)
		this.drawBodyDetails(wJ, currentRotation, numChains, r);
	}

  // 繪製裙擺 (腰部以下)
	drawSkirt(wJ, currentRotation, BeltRadius) {//from plevis to foot
		let r = this.bodyRadius * 1.1; 
		let numChains = this.segments + 1;
		let coatbodyjoint = ["neck","chest","pelvis"]
		
		noStroke();
		fill(this.mainColor);
		
		// 1. 繪製大衣布面 (使用你的極座標邏輯)
		for (let i = 0; i < numChains - 1; i++) {
			let a1 = radians(45 + (270 / this.segments) * i) + currentRotation;
			let a2 = radians(45 + (270 / this.segments) * (i + 1)) + currentRotation;
			
			beginShape(TRIANGLE_STRIP);
				for (let j = 0; j <= 2; j++) {
					let yShift = j ? 0 : r/4;
					r = r * (1+0.1*pow(2,j));
					vertex(wJ[coatbodyjoint[j]].x + r * sin(a1), wJ[coatbodyjoint[j]].y - yShift, wJ[coatbodyjoint[j]].z + r * cos(a1));
					vertex(wJ[coatbodyjoint[j]].x + r * sin(a2), wJ[coatbodyjoint[j]].y - yShift, wJ[coatbodyjoint[j]].z + r * cos(a2));
				}
			endShape();
		}
	
		// 2. 繪製金色鑲邊 (開襟處與底邊)
		this.drawSkirtDetails(wJ, currentRotation, numChains, r);
	}

	drwaBelt(wJ, currentRotation,BeltRadius){
		noStroke();
		fill(this.mainColor);
		//cilinder: simple(minimal comuting requre), try this first , if look bad try vertex plane
		// or
		//vertex plane:

		//belt bucel
		fill(this.metalColor);
		push();
			translate(wJ.pelvis.x, wJ.pelvis.y, wJ.pelvis.z + BeltRadius);
			rotateY(currentRotation);
			box(5,3,1)
		pop();
	}
	
	drawSkirtDetails(wJ, rot, num, r) {
		stroke(this.trimColor);
		strokeWeight(1.5);
		noFill();

		
		
		// A. 繪製左右開襟的垂直金邊
		for (let i of [0, num - 1]) {
			let a = radians(45 + (270 / this.segments) * i) + rot;
			beginShape();
			for (let j = 0; j <= 2; j++) {
				vertex(wJ.pelvis.x + r * sin(a), wJ.pelvis.y + j * (this.length / 2), wJ.pelvis.z + r * cos(a));
			}
			endShape();
		}
		
		// B. 繪製底部的橫向金邊
		beginShape();
			for (let i = 0; i < num; i++) {
				let a = radians(45 + (270 / this.segments) * i) + rot;
				vertex(wJ.pelvis.x + r * sin(a), wJ.pelvis.y + this.length, wJ.pelvis.z + r * cos(a));
			}
		endShape();
	}

	drawBodyDetails(){
		
	}
	// 繪製袖子 (跟隨手臂骨架)
	drawSleeves(wJ) {
		const arms = [
			{s: wJ.shoulderL, e: wJ.elbowL, h: wJ.handL},
			{s: wJ.shoulderR, e: wJ.elbowR, h: wJ.handR}
		];
		// shoulder armor
		// box - simple(lesser comuting requre then vertex plane), try this first , if look bad try vertex plane
		// or
		// vetex plane

		// sheave - may simplify if doent look good
		for (let arm of arms) {
			// 1. 袖子主體 (比手臂粗)
			stroke(this.mainColor);
			strokeWeight(this.bodyRadius * 0.7);
			line(arm.s.x, arm.s.y, arm.s.z, arm.e.x, arm.e.y, arm.e.z);
			line(arm.e.x, arm.e.y, arm.e.z, arm.h.x, arm.h.y, arm.h.z);
			
			// 2. 袖口裝飾 (金邊)
			stroke(this.trimColor);
			strokeWeight(2);
			// 在手腕處畫一個環 (這裡簡化為線段)
			line(arm.h.x - 2, arm.h.y, arm.h.z, arm.h.x + 2, arm.h.y, arm.h.z);
		}

		// froamr armor 
		for (let arm of arms) {
			stroke(this.metalColor);
			strokeWeight(this.bodyRadius * 0.7);
			line(arm.e.x, arm.e.y, arm.e.z, arm.h.x, arm.h.y, arm.h.z);
		}
	}

	drawAceceries(wJ,currentRotation){
		// 頸巾 : most like ly to use vertex plane
		// beltes : 
				// drwaBelt();
		//		chest belt
		//		weast belts
		// 	theigh belt : considering to put on left , for conection with weapon
		//		boots belt
		//	knee pad/armorre : same method with shoulder armor
		// shoes lases : black line zigzag
		
	}

	
}

class Particle {
  constructor(x, y, z) {
    this.pos = createVector(x, y, z);
    this.oldPos = createVector(x, y, z);
    this.locked = false;
  }

  applyForce(f) {
    if (!this.locked) this.pos.add(f);
  }

  update(drag) {
    if (this.locked) return;
    let vel = p5.Vector.sub(this.pos, this.oldPos);
    vel.mult(drag);
    this.oldPos.set(this.pos);
    this.pos.add(vel);
  }

  addPos(v) {
    if (!this.locked) this.pos.add(v);
  }
}