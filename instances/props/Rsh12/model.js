class Rsh12 {
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
		rotateX(-PI/2);
		
		//握把
		push();
			rotateX(-PI/8);
			box(4,10,5);//握把
		pop();

		//機匣
		push();
			translate(0, -5, 7);
			box(2,6,10);

			translate(0, 2, -4);
			box(1.5,2,10);

			translate(0, 2, 2);
			ModelUtils.trigger(3,3,1);
			ModelUtils.triggerGard(3,3,1);
		pop();

		translate(0, -5, 7);

		//輪瓜
		push();
			translate(0, 0, -1);
			rotateX(PI);
			ModelUtils.polygon(5,3,5);
		pop();
		
		//槍管隔熱罩
		ModelUtils.drawBox(0,-2.5,10,2,1,15);
		ModelUtils.drawBox(0,0.5,10,2,3,15);
		ModelUtils.drawBox(0, 0.5, 12,3,2.5,11);
		for(let i=0;i<4;i++){
			ModelUtils.drawBox(0,-1.5,7.25+i*3.25,2,2,1);
		}
		// iron sight
		ModelUtils.drawBox(0.5,-3,-4,0.5,1,2);
		ModelUtils.drawBox(-0.5,-3,-4,0.5,1,2);
		ModelUtils.drawBox(0,-3,16.5,0.5,1,2);

		// hammer
		push();
			translate(0, -1, -6);
			rotateX(PI/3);
			box(1,4,2)
		pop();
		
		//槍管
		push();
			translate(0, 0.5, 10);
			rotateX(PI/2);
			cylinder(0.75,17);
		pop();
		
	}
		


}
window.Rsh12 = Rsh12;