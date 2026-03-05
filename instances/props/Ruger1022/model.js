class Ruger1022 {
    constructor(scale) {
		this.scale = scale;
    }

	display(visuals) {
		push();
            // 在模型最頂層應用縮放
            scale(this.scale);
            
            // 繪製邏輯...
            this.drawModel(visuals.recoil,visuals.slide);
        pop();
		
	}

	drawModel(recoil,slide) {
		noStroke();
		specularMaterial(255);
        shininess(50);
        rotateX(-PI/2);

        // stock
        fill(60, 40, 30);
        translate(0,0,-3);
        push();
            rotateX(-PI/3);
            cylinder(1.5, 12);// handel 
        pop();

        let amount = 10;
        for(let i=0;i<amount;i++){
            push();
                translate(0,i*(7/amount)/2,-(25/amount)*i);
                box(3, 3+7/amount*i, 25/amount);//  butt stock
            pop();
        }
        push();
            translate(0,-3,24);
            box(3,3,40);//front stock
            fill(50);
            translate(0,0,17);
            box(3.5,3,1);
        pop();
       
        fill(50);
        // reciver 
        push();
            translate(0,-3.4,15);
            box(2,4,20);
        pop();

        //barrel
        push();
            translate(0,-4.5,35);
            rotateX(PI/2);
            cylinder(1, 60); 
        pop();

        // bolt : animation
        push();
            let boltZ = (slide * 7);
            fill(220);
            push();
                translate(-0.75,-5,11.5-boltZ/2);
                box(1,1,8-boltZ);//cover
            pop();

            push();
                translate(-2,-5,15-boltZ);
                box(2,1,1);//bolt
            pop();
                
            fill(0);
            push();
                translate(-0.75,-5,15-boltZ/2);
                box(1,1,boltZ);//chamber
            pop();
        pop();

        // trigger
        push();
            translate(0,-0.5,7);
			ModelUtils.trigger(3,3,0.5);
        pop();
	}



}
window.Ruger1022 = Ruger1022;

// muzil flash
// recoil