class Ruger_Bx {
    constructor(scale) {
		this.scale = scale;
    }

	display(visuals) {
		push();
            // 在模型最頂層應用縮放
            scale(this.scale);
            
            // 繪製邏輯...
            this.drawCurvedMag(visuals.len,visuals.radius,visuals.w,visuals.t,visuals.segments);
        pop();
		
	}
	/**
	 * @param {Number} len - 彈匣沿弧線的總長度
	 * @param {Number} radius - 彎曲半徑 (數值越大越直)
	 * @param {Number} w - 彈匣寬度 (左右)
	 * @param {Number} t - 彈匣厚度 (前後)
	 * @param {Number} segments - 分段數 (越高越平滑，建議 10-20)
	 */
	drawCurvedMag(len, radius, w, t, segments = 15) {
		let segmentLen = len / segments;
		let angleStep = segmentLen / radius; // 弧度計算：s = r * theta
		fill(50);
		noStroke();
		rotateX(-PI/2);



		rotateX(PI/8);
		push();
			// 將起始點偏移到圓弧切線上
			translate(0,0,radius); 
			for (let i = 0; i < segments; i++) {
				// 繪製單個分段
				push();
					// 移動到當前圓弧位置
					rotateX(angleStep * i);
					translate(0,0,-radius);
					
					// 補足分段間隙，稍微加長一點點 (1.1x)
					box(t, segmentLen * 1.1, w); 
				pop();
			}
		pop();
	}
}
window.Ruger_Bx = Ruger_Bx;