class rifleChassis {
    constructor(scale) {
		this.scale = scale;
    }

	display(visuals) {
		push();
            // 在模型最頂層應用縮放
            scale(this.scale);
            
            // 繪製邏輯...
			noStroke();
			specularMaterial(255);
			shininess(50);
            ModelUtils.rotations(visuals.rotations);
            this.drawModel();
        pop();
		
	}

	drawModel(){
        fill(52, 55, 58);
        //handel
        push();
            rotateX(-PI/6);
            box(2,10,4);
        pop();
        // body
        ModelUtils.drawBox(0,-4.5,4,3,2.5,10);
        ModelUtils.drawBox(0,-3.5,12,2,3,12);
        //trigergard
        push();
            translate(0,-1.5,4.5);
            ModelUtils.triggerGard(5,3,1);
        pop();

        fill(107, 114, 86);
        //front stock
        ModelUtils.drawBox(0,-4.5,26,3,2.5,34);
        //back stock
        fill(52, 55, 58);
        ModelUtils.drawBox(0,-4,-5,2,2,10);
        fill(107, 114, 86);
        ModelUtils.drawBox(0,-3.5,-11,2.5,4,10);
        ModelUtils.drawBox(0,-1.5,-17,2.5,9,3);
        // padding 
        fill(52, 55, 58);
        ModelUtils.drawBox(0,-1.5,-20,2.5,9,3);
        ModelUtils.drawBox(0,-5,-12,3,2,8);
	}
}
window.rifleChassis = rifleChassis;