class ModelUtils {
    /**
     * 通用板機組件
     * @param {number} w - 護弓長度
     * @param {number} h - 護弓高度
     * @param {number} t - 厚度
     */
    static trigger(w, h, t) {
        push();
            // 後柱
            push();
                translate(0, 0, -w / 2);
                box(t, h + 1, t);
            pop();
            // 底座
            push();
                translate(0, h / 2, 0);
                box(t, t, w + 1);
            pop();
            // 前柱
            push();
                translate(0, 0, w / 2);
                box(t, h + 1, t);
            pop();
            // 板機本體
            push();
                translate(0, -h / 4, 0);
                rotateX(PI / 4);
                box(t, h, t);
            pop();
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