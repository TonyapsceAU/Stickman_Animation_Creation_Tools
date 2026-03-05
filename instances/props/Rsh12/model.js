class Rsh12 {
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

	drawModel(){
		noStroke();
		specularMaterial(255);
        shininess(50);
		
		fill(50);
		rotateX(-PI/2);
		push();
			rotateX(-PI/8);
			box(4,10,5);//握把
		pop();
		push();
			translate(0, -5, 7);
			box(3,6,10);//機匣
			translate(0, 2, -4);
			box(2.5,2,10);
			translate(0, 2, 2);
			ModelUtils.trigger(3,3,1);
		pop();
		translate(0, -5, 7);

		push();
			// translate(0, 0, -1);
			rotateX(PI/2);
			cylinder(2,6);//輪瓜
		pop();
		

		push();
			translate(0, -0.5, 10);
			box(2.5,5,15);//槍管隔熱罩
		pop();

		push();
			translate(0, 0.5, 10);
			rotateX(PI/2);
			cylinder(0.75,17);//槍管
		pop();
		
	}
		


}
window.Rsh12 = Rsh12;