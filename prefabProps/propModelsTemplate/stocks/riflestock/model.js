class RifleStock {
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
	}
}
window.RifleStock = RifleStock;