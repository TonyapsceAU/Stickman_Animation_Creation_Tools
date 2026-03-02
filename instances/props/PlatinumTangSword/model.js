class PlatinumTangSword {
    constructor() {
    }

	display() {
		noStroke();
		fill("#c3c5c4");
		box(1, 60, 2); // 劍身
		
		translate(0, -20, 0);
		fill("#dddcc2");
		box(1.2, 2, 4);  // 護手

		translate(0, -10, 0);
		box(1.2, 2, 2.2);  // kashira

		fill("#362d2c");
		translate(0, 5, 0);
		box(1.1, 8, 2.1);  // 手柄

		fill("#dec699");
		translate(0, 7, 0);
		box(1.1, 1.5, 2,1);  // habaki
	}
}
window.PlatinumTangSword = PlatinumTangSword;