class PlatinumTangSwordSheath {
    constructor(scale) {
		this.scale = scale;
    }

	display() {
		push();
            // 在模型最頂層應用縮放
            scale(this.scale);
            
            // 繪製邏輯...
            this.drawModel();
        pop();
		
	}

	drawModel() {
		noStroke();
		specularMaterial(255);
        shininess(50);

		fill("#ebebe2");
		translate(0, 6, 0);
		box(1.3, 50, 2.3); // 劍鞘

		fill("#dddcc2");
		translate(0, -22, 0);
		box(1.5, 6, 2.5); // 
		
		translate(0, 16, 0);
		box(1.5, 4, 2.5); // 劍鞘 
		
		translate(0, 13, 0);
		box(1.5, 4, 2.5); // 劍鞘 
		
		translate(0, 16, 0);
		box(1.5, 6, 2.5); // 劍鞘
	}
}
window.PlatinumTangSwordSheath = PlatinumTangSwordSheath;