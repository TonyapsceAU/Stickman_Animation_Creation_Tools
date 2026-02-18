function Choreography(myActor){
	// 新增命令的格式 : addCommand(poseName,val=null,speed=null)
	// e.g. myActor.addCommand("SPRINT_DYNAMIC",[i,1],myActor.lerpSpeed*5);

	myActor.config.position = createVector(0, -77, 0); // test moving
	myActor.config.rotation += radians(0); // test rotation
	
	// myActor.addCommand("");
		// tests:
		// myActor.addCommand("OVER_THE_SHOULDER_REST");         // 先變回站姿
		// myActor.addCommand("EDIT_SLOT",myActor); // 讓 Actor 進入可編輯的狀態
		// myActor.addCommand("STAND");         // 先變回站姿
		// myActor.addCommand("HOLD_WEAPON_L"); // 再把左手舉起來
		// myActor.addCommand("Orthodox_stand",createVector(0, 5, 0)); 
		// combined_STEP_TURN_Orthodox_stand_HOLD_WEAPON_L(myActor);
		// step_turn(myActor,4);
	
	// aerial cleave
	myActor.addCommand("STAND",createVector(0, 0, 0),myActor.lerpSpeed); 
	waiting("STAND",1,1);
	myActor.addCommand("SQUAT_JUMP_SQUAT",createVector(0, 12, 0));
	myActor.addCommand("SQUAT_JUMP_JUMP",createVector(0, -200, 0));
	myActor.addCommand("AERIAL_CLEAVE_1",createVector(-10.88,-10,0),myActor.lerpSpeed*2);
	myActor.addCommand("AERIAL_CLEAVE_2",createVector(0, 5, 0));
	myActor.addCommand("AERIAL_CLEAVE_3",createVector(0, 5, 0));
	myActor.addCommand("AERIAL_CLEAVE_4",createVector(14, 238, 14));
	myActor.addCommand("AERIAL_CLEAVE_4",createVector(0, 0, 0),myActor.lerpSpeed);
	// jump in place
	// myActor.addCommand("STAND",createVector(0, 0, 0)); 
	// waiting("STAND",1,1);
	// myActor.addCommand("SQUAT_JUMP_SQUAT",createVector(0, 12, 0));
	// myActor.addCommand("SQUAT_JUMP_JUMP",createVector(0, -200, 0));
	// myActor.addCommand("SQUAT_JUMP_JUMP",createVector(0, 190, 0),myActor.lerpSpeed*0.6);
	// myActor.addCommand("SQUAT_JUMP_SQUAT",createVector(0, 20, 0),myActor.lerpSpeed);
	// myActor.addCommand("STAND",createVector(0, -12, 0));
	
	// running(myActor); 
	// myActor.addCommand("RUNNING_SET",createVector(0, 2, 25));
	// myActor.addCommand("RUNNING_POSE_1",createVector(0, 10.47, 70));
	// myActor.addCommand("RUNNING_POSE_2",createVector(0, -5, 50));
	// myActor.addCommand("RUNNING_POSE_3",createVector(0, 0, 25));
	// myActor.addCommand("RUNNING_POSE_4",createVector(0, 0, 50));
	// myActor.addCommand("RUNNING_POSE_5",createVector(0, 0, 50));
	// myActor.addCommand("RUNNING_POSE_6",createVector(0, -1, 50));
	// myActor.addCommand("RUNNING_POSE_1",createVector(0, 5, 70));
	// myActor.addCommand("RUNNING_POSE_2",createVector(0, -5, 50));
	// myActor.addCommand("RUNNING_SET",createVector(0, -5, 25));
	
	// jogging(myActor); 
	// myActor.addCommand("jogging_POSE_1",createVector(0, 1.24, 25));
	// myActor.addCommand("jogging_POSE_2",createVector(0, 3.14, 50));
	// myActor.addCommand("jogging_POSE_3",createVector(0, -1, 50));
	// myActor.addCommand("jogging_POSE_4",createVector(0, 0, 25));
	// myActor.addCommand("jogging_POSE_5",createVector(0, 0, 50));
	// myActor.addCommand("jogging_POSE_6",createVector(0, -3, 50));
	
	
	// myActor.addCommand("SPRINT_SET",createVector(0, 77-71.1, 100));

	
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

function running(myActor){
	myActor.addCommand("STAND");
	let speed = 2;
	waiting("STAND",1,1);
	myActor.addCommand("RUNNING_SET",createVector(0, 2, 25),myActor.lerpSpeed*3);
	myActor.addCommand("RUNNING_POSE_1",createVector(0, 10.47, 70),myActor.lerpSpeed*2);
	myActor.addCommand("RUNNING_POSE_2",createVector(0, -5, 50));
	myActor.addCommand("RUNNING_POSE_3",createVector(0, 0, 25));
	myActor.addCommand("RUNNING_POSE_4",createVector(0, 0, 50));
	myActor.addCommand("RUNNING_POSE_5",createVector(0, 0, 50));
	myActor.addCommand("RUNNING_POSE_6",createVector(0, -1, 50));
	myActor.addCommand("RUNNING_POSE_1",createVector(0, 5, 70));
	myActor.addCommand("RUNNING_POSE_2",createVector(0, -5, 50),myActor.lerpSpeed*3);
	myActor.addCommand("RUNNING_SET",createVector(0, -5, 25));
	myActor.addCommand("STAND",createVector(0, 0, 0),myActor.lerpSpeed);
}

function jogging(myActor){
	myActor.addCommand("jogging_POSE_1",createVector(0, 1.24, 25),myActor.lerpSpeed*1.75);
	myActor.addCommand("jogging_POSE_2",createVector(0, 3.14, 50));
	myActor.addCommand("jogging_POSE_3",createVector(0, -1, 50));
	myActor.addCommand("jogging_POSE_4",createVector(0, 0, 25));
	myActor.addCommand("jogging_POSE_5",createVector(0, 0, 50));
	myActor.addCommand("jogging_POSE_6",createVector(0, -3, 50),myActor.lerpSpeed);
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