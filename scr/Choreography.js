function Choreography(myActor){
	// 新增命令的格式 : addCommand(poseName,val=null,speed=null)
	// e.g. myActor.addCommand("SPRINT_DYNAMIC",[i,1],myActor.lerpSpeed*5);
	// myActor.addCommand("");
		// tests:
		// myActor.config.position = {x:100,y:0,z:0}; // test moving
		// myActor.config.rotation += radians(90); // test rotation
		// myActor.addCommand("OVER_THE_SHOULDER_REST");         // 先變回站姿
		// myActor.addCommand("EDIT_SLOT",myActor); // 讓 Actor 進入可編輯的狀態
		// myActor.addCommand("STAND");         // 先變回站姿
		// myActor.addCommand("HOLD_WEAPON_L"); // 再把左手舉起來
		// myActor.addCommand("Orthodox_stand"); 
		// combined_STEP_TURN_Orthodox_stand_HOLD_WEAPON_L(myActor);
		// step_turn(myActor,4);

	myActor.addCommand("STAND");
	waiting("STAND",1,1);
	myActor.addCommand("SPRINT_SET");
	myActor.addCommand("jogging_POSE_1");
	myActor.addCommand("jogging_POSE_2");
	myActor.addCommand("jogging_POSE_3");

	
	// let loopcount = 0, i=0, step = 0.1;
	// while (loopcount<5){
	// 	myActor.addCommand("SPRINT_DYNAMIC",[i,1],myActor.lerpSpeed);
	// 	i+=step
	// 	if (i >= 1 || i<= -1) {
	// 		step*=-1; 
	// 		loopcount++;
	// 	}
	// 	// print(i)
	// }

	
	// myActor.addCommand("HOLD_WEAPON_L"); // 再把左手舉起來
	// myActor.addCommand("STEP_TURN",90);
	
}

/**
 * 組合任意數量的姿勢，後面的會覆蓋前面的
 * @param {...Object} poses - 多個從 PoseLibrary 產生的姿勢物件
 */
function combinePoses(...poses) {
    return poses.reduce((acc, current) => {
        for (let key in current) {
            // 如果是 p5.Vector，複製它以確保獨立性
            if (current[key] instanceof p5.Vector) {
                acc[key] = current[key].copy();
            } else {
                // 如果是 rotation (數值)，直接複製
                acc[key] = current[key];
            }
        }
        return acc;
    }, {});
}

// intensity : 0.1~0.5
function waiting(pose,intensity,duration){
	for(let i=0;i<duration;i++){
		myActor.addCommand("Breathing",intensity,myActor.lerpSpeed/(duration*2));
		myActor.addCommand(pose);
	}
	myActor.addCommand(pose,null,myActor.lerpSpeed);
}

// Choreography sets:
function combined_STEP_TURN_Orthodox_stand_HOLD_WEAPON_L (myActor){
	// 準備合成姿勢
	let turnPose = PoseLibrary["STEP_TURN"](90);        // 基礎：轉向 90 度的邁步
	let guardPose = PoseLibrary["Orthodox_stand"]();   // 疊加：上半身的防禦架勢
	let weaponPose = PoseLibrary["HOLD_WEAPON_L"]();    // 疊加：左手握持武器的特定姿態
	// 融合：
	// 1. 先拿轉身的地盤與下半身
	// 2. 用 Orthodox 的上半身覆蓋
	// 3. 最後用 HOLD_WEAPON_L 覆蓋左手
	let finalPose = combinePoses(turnPose, guardPose, weaponPose);
	myActor.addCommand("Combine_Poses", finalPose);
}

function step_turn(myActor,tempSpeed){
	// currently only turn left
	myActor.addCommand("STAND",null,myActor.lerpSpeed *tempSpeed); 
	myActor.addCommand("STEP_TURN",60,myActor.lerpSpeed *tempSpeed);
	myActor.addCommand("STEP_TURN",90,myActor.lerpSpeed *tempSpeed);
	myActor.addCommand("STEP_TURN",120,myActor.lerpSpeed *tempSpeed);
	myActor.addCommand("STAND",90,myActor.lerpSpeed *tempSpeed);
}