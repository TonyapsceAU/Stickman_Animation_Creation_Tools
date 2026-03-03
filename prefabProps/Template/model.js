class Template {
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
		fill("#c3c5c4");
		box(10,10,10);
	}
}