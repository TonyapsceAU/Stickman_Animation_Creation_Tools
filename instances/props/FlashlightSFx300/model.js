class SFx300 {
    constructor(scale) {
		this.scale = scale;
    }

	display(values) {
		push();
            // 在模型最頂層應用縮放
            scale(this.scale);
            
            // 繪製邏輯...
			noStroke();
			specularMaterial(255);
			shininess(50);
            this.drawModel(values.lighup);
        pop();
		
	}

	drawModel(lighup){
		fill(50);
		ModelUtils.drawBox(0,0,0,1,3,1);
		push();
			rotateX(PI/2);
			ModelUtils.drawCylinderPart(1,4,0,-1,-1.5)
		pop();
		push();
			rotateX(PI/2);
			ModelUtils.drawCylinderPart(1.25,2.5,0,-1,-3.5)
		pop();
	}


}
window.SFx300 = SFx300;