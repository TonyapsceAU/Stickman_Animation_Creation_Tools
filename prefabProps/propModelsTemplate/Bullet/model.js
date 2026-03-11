class Bullet {
    constructor(scale) {
        this.scale = scale;
    }

    display(visuals) {
        if (!visuals) return;
        push();
            scale(this.scale);
            
            // 將 JSON 顏色物件轉換為 p5 顏色格式
            const cMain = color(visuals.colorMain.r, visuals.colorMain.g, visuals.colorMain.b);
            const cSec = color(visuals.colorSec.r, visuals.colorSec.g, visuals.colorSec.b);
            
            // 覆蓋原本物件中的顏色，避免傳遞錯誤格式
            const config = { ...visuals, colorMain: cMain, colorSec: cSec };
            
            this.drawBullet(config);
        pop();
    }

    /**
     * 彈藥幾何生成器配置參數
     * @param {Object} cfg - 子彈視覺定義物件
     * @param {number} cfg.length - 子彈總長度 (單位：像素/單元)
     * @param {number} cfg.radius - 彈體最大半徑 (決定口徑大小)
     * @param {number} cfg.curve - 彈尖曲率 (Spitzer 模式下，數值越小彈尖越銳利，0~1)
     * @param {Object} cfg.colorMain - 彈頭被甲 (Jacket) 顏色，格式: {r, g, b} (例如：黃銅色/紅銅色)
     * "colorMain": {"r": 80, "g": 82, "b": 85}, 
     * "colorMain": {"r": 184, "g": 115, "b": 51}, 
     * @param {Object} cfg.colorSec - 彈尖或彈底次要顏色，格式: {r, g, b} (用於 Hollow Point 或 Tracer)
     * "colorSec": {"r": 60, "g": 62, "b": 65},
     * @param {number} cfg.tip - 彈頭特徵類型 
        * 0: Full (全金屬被甲)
        * 1: Hollow (空尖彈，末端顯示 colorSec)
        * 2: Soft (軟尖彈，露出鉛芯 colorSec)
     * @param {number} cfg.ogiveStyle - 彈尖輪廓造型
        * 0: Round (圓頭彈，如 9mm / .45 ACP)
        * 1: Spitzer (尖頭流線型，如 5.56 / .308)
        * 2: Flat (平頭型，如部分 .40 S&W)
     * @param {number} cfg.base - 底部斜面的深度
     * @param {number} cfg.wadcutterStyle - 切紙彈特徵 (Wadcutter)
        * 0: Non-Wadcutter (標準流線型)
        * 0.5: Semi-Wadcutter (帶肩膀的半切紙彈)
        * 1: Full Wadcutter (完全圓柱體切紙彈)
     */
    drawBullet(cfg) {
        const { 
            length, radius, curve, colorMain, colorSec, 
            tip, ogiveStyle, base, wadcutterStyle 
        } = cfg;

        let headH = length * 0.4;
        let bodyH = length * 0.6;
        let segments = 15;
        noStroke();

        // 1. 繪製底部 (Base/Heel)
        this.drawBase(base, radius, colorMain);

        // 2. 繪製彈體 (Body - Cylinder part)
        // 注意：length 僅定義此圓柱部分
        fill(colorMain);
        push();
            rotateX(PI/2);
            translate(0, length/2, 0);
            cylinder(radius, length);
        pop();

        // 3. 繪製彈頭 (Head / Ogive)
        push();
            translate(0, 0, length); // 移動到彈體頂端
            this.drawHead(radius, curve, tip, ogiveStyle, wadcutterStyle, colorMain, colorSec, segments);
        pop();
    }

    /**
     * @param {number} depth - 底部斜面的深度。0 為平底，>0 則產生 45 度 Boat Tail。
     * @param {number} r - 彈體半徑
     * @param {color} c - 顏色
     */
    drawBase(depth, r, c) {
        fill(c);
        noStroke();
        
        if (depth > 0) { 
            // --- 45° Boat Tail (船尾型) ---
            // 45 度角的幾何特性：對邊 (depth) = 鄰邊 (r - tailR)
            // 所以 tailR = r - depth
            let tailR = r - depth;

            // 安全檢查：確保深度不會大於半徑（否則 tailR 會變成負數）
            if (tailR < 0) tailR = 0;
            
            // polygonTransition(n, r1, r2, h, zOff)
            // 從收縮後的 tailR 變到彈體半徑 r
            this.polygonTransition(24, tailR, r, depth, -depth); 
            
            // 封閉最底部的圓面
            push();
                translate(0, 0, -depth);
                ModelUtils.polygon(24, tailR, 0.1);
            pop();
        } else { 
            // --- Flat Base (平底) ---
            push();
                translate(0, 0, -0.1); 
                rotateX(PI/2);
                cylinder(r, 0.1);
            pop();
        }
    }

    // --- 2. 彈頭複合邏輯 ---
    drawHead(r, curve, tip, ogive, wc, cMain, cSec, seg) {
        let headRadius = r;
        let headLength = r / curve; // 彈頭長度比例

        // A. 處理 Wadcutter 階梯
        if (wc === 1) { // Full Wadcutter
            fill(cMain);
            push();
                rotateX(PI/2);
                translate(0, -r/4, 0);
                cylinder(r, r/2); // 扁平圓柱
            pop();
            return; // WC 直接結束
        } else if (wc === 0.5) { // Semi Wadcutter
            fill(cMain);
            ModelUtils.polygon(seg, r, 1); // 繪製肩膀平面
            headRadius = r * 0.75; // 縮小彈頭半徑
        }

        // B. 根據 Ogive Style 繪製形狀
        // tip: 0:FMJ, 1:Hollow, 2:Soft
        this.renderOgive(headRadius, headLength, tip, ogive, cMain, cSec, seg);
    }

    // --- 3. 彈尖曲線核心 ---
    renderOgive(r, h, tipType, style, cMain, cSec, seg) {
        for (let i = 0; i < seg; i++) {
            let t1 = i / seg;
            let t2 = (i + 1) / seg;
            
            let r1, r2;
            if (style === 1) { // Spitzer (尖頭)
                r1 = r * cos(t1 * PI/2);//this will make pointy head
                r2 = r * cos(t2 * PI/2);
            } else if (style === 2) { // Flat Nose
                r1 = r * cos(t1 * PI/3); // 較平緩的弧度
                r2 = r * cos(t2 * PI/3);
                if (i === seg - 1) r2 = r1 * 0.8; // 頂端強制留平
                push();
                translate(0,0,h-1);
                ModelUtils.polygon(seg, r1*0.5, 0.1);
                pop();
            } else { // 0: Round Nose
                sphere(r);
                continue;
            }

            // 處理 Tip 視覺
            if (tipType === 2) { // Soft Point
                fill(i > seg * 0.7 ? cSec : cMain);
            } else if (tipType === 1 && i > seg *0.7) { // Hollow Point
                // 最後一節不畫，改畫內縮空腔
                fill(cSec);
                push();
                    translate(0, 0,h*1.45);
                    this.polygonTransition(seg, r1, r1 * 0.5, -h/seg, i * (-h/seg));
                pop();
                continue;
            } else {
                fill(cMain);
            }

            this.polygonTransition(seg, r1, r2, h/seg, i * (h/seg));
        }
    }

    polygonTransition(n, r1, r2, h, zOff) {
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
window.Bullet = Bullet;