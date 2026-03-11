class Suppressor {
    constructor(scale) {
		this.scale = scale;
    }

	display(values) {
		push();
            // 在模型最頂層應用縮放
            scale(this.scale);
            
            // 繪製邏輯...
			specularMaterial(255);
			shininess(50);
			noStroke();
			fill(50);
			rotateX(PI/2);
            ModelUtils.drawCylinderPart(values.r,values.h, 0,0,0);
        pop();
		
	}
}
window.Suppressor = Suppressor;