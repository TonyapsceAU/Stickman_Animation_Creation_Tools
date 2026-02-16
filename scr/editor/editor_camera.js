function handleCameraAngles() {
    switch (key) {
        case '1': // 前 <-> 後 循環
            viewState.frontBack = (viewState.frontBack + 1) % 2;
            if (viewState.frontBack === 0) {
                camera(0, 0, camDist, 0, 0, 0, 0, 1, 0);
                // console.log("View: Front (前)");
            } else {
                camera(0, 0, -camDist, 0, 0, 0, 0, 1, 0);
                // console.log("View: Back (後)");
            }
            break;

        case '2': // 左 <-> 右 循環
            viewState.leftRight = (viewState.leftRight + 1) % 2;
            if (viewState.leftRight === 0) {
                camera(-camDist, 0, 0, 0, 0, 0, 0, 1, 0);
                // console.log("View: Left (左)");
            } else {
                camera(camDist, 0, 0, 0, 0, 0, 0, 1, 0);
                // console.log("View: Right (右)");
            }
            break;

        case '3': // 上 <-> 下 循環
            viewState.upDown = (viewState.upDown + 1) % 2;
            if (viewState.upDown === 0) {
                camera(0, -camDist, 0, 0, 0, 0, 0, 0, -1); // Top
                // console.log("View: Top (上)");
            } else {
                camera(0, camDist, 0, 0, 0, 0, 0, 0, 1); // Bottom
                // console.log("View: Bottom (下)");
            }
            break;

        case '4': // 八個對角線方向循環
				// let quadrant_name = ["後右下","後左下","後右上","後左上","前右下","前左下","前右上","前左上"];
            viewState.diagonal = (viewState.diagonal + 1) % 8;
            let d = camDist * 0.7; // 對角線距離縮放
            // 透過簡單的二進位邏輯切換 8 個象限
            let tx = (viewState.diagonal & 1) ? d : -d;
            let ty = (viewState.diagonal & 2) ? -d : d;
            let tz = (viewState.diagonal & 4) ? d : -d;
            camera(tx, ty, tz, 0, 0, 0, 0, 1, 0);
            // console.log(`View: Diagonal Quadrant ${ quadrant_name[viewState.diagonal]}`);
            break;
    }
}