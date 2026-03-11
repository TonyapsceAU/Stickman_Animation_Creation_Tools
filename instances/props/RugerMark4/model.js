class RugerMark4 {
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
            this.drawModel(values.bolt);
        pop();
		
	}

	drawModel(bolt){
		fill(50);
		rotateX(-PI/2);
		push();
			rotateX(-PI/8);
			box(1.5,8,3);//握把
			box(2,6.5,2);//握把
		pop();

		push();
			translate(0, -4, 4);
			// box(1,1.5,15);//機匣
			push();
				rotateX(PI/2);
				cylinder(1,15);
			pop();
			translate(0, 1, -3);
			box(2,1,8.5);
			push();
				translate(0, 1, -1.5);
				rotateX(PI/4);
				box(1.5,3,1.5);
			pop();
				translate(0, 1, 2);
				push();
				scale(0.1);
				ModelUtils.trigger(30,20,5);
				ModelUtils.triggerGard(30,20,5);
			pop();
		pop();

		push();
			translate(0, -4, -1-bolt*4);
			push();
				rotateX(PI/2);
				cylinder(0.8,4);
			pop();

			push();
				translate(0, 0, -3);
				rotateX(PI/2);
				cylinder(0.5,2);
			pop();

			push();
				translate(0, 0, -4);
				rotateX(PI/2);
				cylinder(1,0.5);
			pop();
		pop();

		// pull handel

	}
}
window.RugerMark4 = RugerMark4;