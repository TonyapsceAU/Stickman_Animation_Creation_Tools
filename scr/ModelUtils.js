class ModelUtils {
    /**
     * 通用板機組件
     * @param {number} w - 護弓長度
     * @param {number} h - 護弓高度
     * @param {number} t - 厚度
     */
    static trigger(w, h, t) {
        push();
            translate(0, -h / 4, 0);
            rotateX(PI / 4);
            box(t, h, t);
        pop();
    }

    static rotations(ratations){
        rotateX(ratations.x);
        rotateY(ratations.y);
        rotateZ(ratations.z);
    }
    
    static triggerGard(w, h, t) {
        push();
            // 後柱
            push();
                translate(0, 0, -w / 2+t/2);
                box(t, h, t);
            pop();
            // 底座
            push();
                translate(0, h / 2-t/2, 0);
                box(t, t, w);
            pop();
            // 前柱
            push();
                translate(0, 0, w / 2-t/2);
                box(t, h, t);
            pop();
        pop();

    }


    static drawBox(x,y,z,w,h,t){
		push();
			translate(x,y,z);
			box(w,h,t);
		pop();
	}
    

	static drawMuzzleFlash(x, y, intensity) {
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

    // 輔助：繪製直立圓柱 (因為 p5 cylinder 是橫向的)
    static drawCylinderPart(r, h, xoff,yoff,zOff) {
        push();
            translate( xoff,yoff, zOff + h/2);
            rotateX(PI/2);
            cylinder(r, h);
        pop();
    }

    /**
     * 使用 box 堆疊法繪製管狀體 (適合機械零件與厚管)
     * @param {number} r - 中心半徑 (中心點到 box 中心的距離)
     * @param {number} t - 管壁厚度 (Wall Thickness)
     * @param {number} h - 管子高度
     * @param {number} n - 分段數 (邊數，建議 12-24)
     */
    static drawTubeBox(r, t, h, n = 12) {
        let angle = TWO_PI / n;
        
        // 計算每個 box 的寬度，使其邊緣剛好接觸
        // 弧長公式近似：w = 2 * r * tan(PI/n)
        // let w = 2 * r * tan(PI / n) * 1.05; // 稍微乘以 1.05 避免接縫縫隙

        push();
        for (let i = 0; i < n; i++) {
            push();
                rotateZ(i * angle);
                translate(r, 0, 0); // 移至半徑處
                box(t, t, h);       // t 為厚度，w 為寬度，h 為長度
            pop();
        }
        pop();
    }

    /**
     * 繪製帶有厚度的正規多邊形
     * @param {number} r - 半徑
     * @param {number} t - 厚度 (Thickness)
     * @param {number} n - 邊數
     */
    static polygon(n, r, t) {
        let angle = TWO_PI / n;
        let startAngle = radians(-17); // 保留你設定的起始旋轉偏移

        // 1. 繪製「前面」 (Z = t/2)
        push();
        normal(0, 0, 1); // 法向量朝前
        beginShape();
        for (let a = startAngle; a < TWO_PI + startAngle; a += angle) {
            vertex(cos(a) * r, sin(a) * r, t / 2);
        }
        endShape(CLOSE);
        pop();

        // 2. 繪製「後面」 (Z = -t/2)
        push();
        normal(0, 0, -1); // 法向量朝後
        beginShape();
        for (let a = startAngle; a < TWO_PI + startAngle; a += angle) {
            vertex(cos(a) * r, sin(a) * r, -t / 2);
        }
        endShape(CLOSE);
        pop();

        // 3. 繪製「連接側邊」 (側邊的光影最重要)
        beginShape(TRIANGLE_STRIP);
        for (let a = startAngle; a <= TWO_PI + startAngle + 0.01; a += angle) {
            // 計算當前點的法向量（從中心指向頂點的方向）
            let nx = cos(a);
            let ny = sin(a);
            normal(nx, ny, 0); 
            
            vertex(cos(a) * r, sin(a) * r, -t / 2);
            vertex(cos(a) * r, sin(a) * r, t / 2);
        }
        endShape();
    }

    static polygonTransition(n, r1, r2, h, zOff) {
        let angle = TWO_PI / n;
        push();
        translate(0, 0, zOff);
        beginShape(TRIANGLE_STRIP);
        for (let a = 0; a <= TWO_PI + 0.01; a += angle) {
            normal(cos(a), sin(a), 0.5); 
            vertex(cos(a) * r1, sin(a) * r1, 0);
            vertex(cos(a) * r2, sin(a) * r2, h);
        }
        endShape();
        pop();
    }
}