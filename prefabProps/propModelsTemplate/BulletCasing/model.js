class BulletCasing {
    constructor(scale) {
        this.scale = scale;
    }

    display(visuals) {
        if (!visuals) return;
        push();
            scale(this.scale);
            const cBrass = color(225, 190, 100); // 標準黃銅色
            this.drawCasing(visuals, cBrass);
        pop();
    }

    /**
     * @param {Object} cfg - 包含 length, radius, shape, rim
     */
    drawCasing(cfg, col) {
        const { length, radius, shape, rim } = cfg;
        const segments = 24;
        
        fill(col);
        noStroke();

        // --- 1. Body & Neck (殼身與瓶頸) ---
        let rimRadius = rim === 1 ? radius * 1.15 : radius;
        let rimThickness = rim === 1 ? length * 0.05 : length * 0.1;

        let currentZ = 0;
        let remainingLength = length - currentZ;

        if (shape === 0) { // Bottleneck (瓶狀彈殼，如 5.56)
            let bodyH = remainingLength * 0.7;    // 殼身佔 70%
            let shoulderH = remainingLength * 0.1; // 斜肩佔 10%
            let neckH = remainingLength * 0.2;     // 頸部佔 20%
            let neckRadius = radius * 0.75;        // 頸部縮減半徑

            // Body
            ModelUtils.drawCylinderPart(radius, bodyH, currentZ);
            currentZ += bodyH;
            
            // Shoulder (斜肩 - 這裡使用 45 度或自適應斜率)
            ModelUtils.polygonTransition(segments, radius, neckRadius, shoulderH, currentZ);
            currentZ += shoulderH;
            
            // Neck
            ModelUtils.drawCylinderPart(neckRadius, neckH, currentZ);
            
        } else { // Straight-wall (直筒彈殼，如 9mm, .45)
            ModelUtils.drawCylinderPart(radius, length, currentZ);
        }

        // --- 2. Rim (底緣) ---
        push();
            rotateX(PI/2);
            
            // Rimmed (1) : 凸緣半徑大於彈殼； Rimless (0): 凸緣半徑等於彈殼且帶有退殼溝 (Extractor Groove)
            // 如果是 Rimless，通常會畫出一個凹槽 (簡化版：縮小一段圓柱)
            if (rim === 0) {
                cylinder(radius * 0.85, rimThickness/2); // 退殼溝
                translate(0, -rimThickness/2, 0);
                // 繪製底板
                cylinder(rimRadius, rimThickness/2);
            } else {
                translate(0, -rimThickness/2, 0);
                // 繪製底板
                cylinder(rimRadius, rimThickness);
            }
            
        pop();

        
    }

    

    
}
window.BulletCasing = BulletCasing;