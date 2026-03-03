class M1897 {
    constructor(scale) {
		this.scale = scale;
    }

	display(vals) {
		push();
            // 在模型最頂層應用縮放
            scale(this.scale);
            
            // 繪製邏輯...
            this.drawModel(vals);
        pop();
		
	}
	/**
	* 繪製槍枝實體
	* @param {Number} slide - 上膛滑塊位置 (0.0 為閉鎖, 1.0 為完全拉後)
	* @param {Number} recoil - 後座力強度 (0.0 為靜止, 1.0 為最大震動/槍火)
	*/
	drawModel(val = [0, 0]) {
		let slide = 0, recoil = 0;
		rotateX(-PI/2);
		push();
			// --- 後座力表現 (Recoil System) ---
			// 後座力會導致槍身微幅向後平移與向上旋轉
			let recoilOffset = recoil * -15;
			let recoilRotation = recoil * -0.15; // 弧度
			translate(recoilOffset, 0, 0);
			rotateZ(recoilRotation);
			noStroke();
			
			// --- 1. stock ---
			push();
				fill(60, 40, 30);
				rotateX(-PI/3);
				cylinder(1.5, 12);// handel 
			pop();

			push();
				fill(60, 40, 30);
				let amount = 10;
				for(let i=0;i<amount;i++){
					push();
						translate(0,i*(7/amount)/2,-(25/amount)*i);
						box(3, 3+7/amount*i, 25/amount);//  stock
					pop();
				}
			pop();
				
		
			// --- 2. 繪製槍身主體 (Main Body) ---
			translate(0, -2, 11);
			fill(this.color);
			// 主機匣
			push();
				translate(0, -1, 0);
				rotateX(PI/2);
				cylinder(1.25,12);
			pop();
			push();
				translate(0, 1, -1);
				rotateX(PI/2);
				cylinder(1.25,14);
			pop();
			box(2.5, 2.5, 12); 
			
			translate(0, 0, 12/2);
			push();
				translate(0, -1, 40/2);
				rotateX(PI/2);
				cylinder(1,40);// 槍管
			pop();
	
			
			push();
				translate(0, 1, 30/2);
				rotateX(PI/2);
				cylinder(1,30);// magazin
			pop();
			
			// // --- 3. 泵動滑塊邏輯 (Slide / Pump Action) ---
			push();
				let slideX = 18 - (slide * 10); // 計算滑塊在 10-18 像素間移動
				translate(0, 1, 10/2+slideX);
				rotateX(PI/2);
				fill(60, 40, 30); // 木質或深色護木
				cylinder(1.5,10);// 滑塊位置隨 slide 參數在槍管下放移動
			pop();

			// --- 4. 槍口閃光 (Muzzle Flash) ---
			// 僅在後座力極大時觸發（模擬開火瞬間）
			if (recoil > 0.8) {
				this.drawMuzzleFlash(95, -2, recoil);
			}
		
		pop();
	}

	drawMuzzleFlash(x, y, intensity) {
		push();
			translate(x, y, 0);
			noStroke();
			fill(255, 200, 50, 200 * intensity); // 橙黃色透明度
			sphere(8 * intensity); // 核心火球
			
			// 放射狀火光
			for(let i = 0; i < 5; i++) {
				rotateX(PI/3);
				ellipse(0, 0, 20 * intensity, 5 * intensity);
			}
		pop();
	}
}