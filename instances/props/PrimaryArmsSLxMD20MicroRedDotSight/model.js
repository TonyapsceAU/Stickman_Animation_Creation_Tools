class PrimaryArmsSLxMD20MicroRedDotSight {
    constructor(scale) {
		this.scale = scale;
    }

	display() {
		push();
            // 在模型最頂層應用縮放
            scale(this.scale);
            
            // 繪製邏輯...
			noStroke();
			specularMaterial(255);
			shininess(50);
            this.drawModel();
        pop();
		
	}

	drawModel(){
		fill(50);
		push();
			translate(0,0,-3.5/2);
			ModelUtils.drawCylinderPart(1.5, 3.5, 0);
		pop();
		push();
			translate(0,0,0);
			push();
				scale(0.1);
				ModelUtils.drawTubeBox(10, 3, 40, 30);
			pop();
		pop();
		push();
			box(2,3,3.5);
		pop();
		push();
			translate(1,0,1);
			rotateY(PI/2);
			ModelUtils.drawCylinderPart(0.5, 1, 0);
		pop();
		push();
			translate(1,0,-0.5);
			rotateY(PI/2);
			ModelUtils.drawCylinderPart(1, 1, 0);
		pop();
		push();
			translate(0,1.75,0);
			box(2.5,0.5,3);
		pop();
	}
}
window.PrimaryArmsSLxMD20MicroRedDotSight = PrimaryArmsSLxMD20MicroRedDotSight;