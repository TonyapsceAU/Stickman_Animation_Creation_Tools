class PlatinumTangSwordSheath {
    constructor() {
    }

	display() {
		noStroke();
		fill("#e8e7dd");
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