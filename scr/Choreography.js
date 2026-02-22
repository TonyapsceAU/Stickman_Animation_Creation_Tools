// 新增命令的格式 : addCommand(poseName,val=null,speed=null)
// e.g. myActor.addCommand("SPRINT_DYNAMIC",[i,1],myActor.lerpSpeed*5);
// "PROP": (mode,parent,joint,offset,rotation,pos,vel)
// myActor.addCommand("");
function Choreography(myActor){
	myActor.config.position = createVector(0, -77, 0); // reset position
	myActor.config.rotation = radians(0); // reset rotation
	myActor.lerpSpeed = 0.12;
	myActor.addCommand("STAND",createVector(0, 0, 0),myActor.lerpSpeed); 
	// tests:
	// myActor.addCommand("OVER_THE_SHOULDER_REST");         // 先變回站姿
	// myActor.addCommand("EDIT_SLOT",myActor); // 讓 Actor 進入可編輯的狀態
	// myActor.addCommand("STAND");         // 先變回站姿
	// myActor.addCommand("HOLD_WEAPON_L"); // 再把左手舉起來
	// myActor.addCommand("Orthodox_stand",createVector(0, 5, 0)); 
	// combined_STEP_TURN_Orthodox_stand_HOLD_WEAPON_L(myActor);
	// waiting("STAND",1,1);
	
	// in progress:
	// step_turn(myActor,90,1);  // will over turn due to the actor rotation change
	// myActor.addCommand("SPRINT_SET",createVector(0, 77-71.1, 100)); //searching for reference img
	// SIDEHOP:
	// let hop_distance = 100;
	// let jump_height = sqrt(hop_distance) * 2; // 使用平方根讓高度隨距離增長，但不會過高
	// myActor.addCommand("HOP_PRELOAD",createVector(0, 2, 2));
	// myActor.addCommand("HOP_SIDEWAY",createVector(-hop_distance*0.7, -jump_height, 0));
	// myActor.addCommand("HOP_PRELOAD",createVector(-hop_distance*0.3, 2+jump_height, 0));
	// myActor.addCommand("STAND",createVector(0, -4, 0)); 
	
	// finished animation:
	QUICK_DRAW_STRICK(myActor);//拔刀斬
	HOP_BACKWARD(myActor,56);
	// STRIGHT_SHEATHING(myActor);//收刀（上撩後收刀）
	AERIAL_VLEAVE(myActor);//力劈華山
	// CASUAL_SHEATHING(myActor); 收刀（平常收刀）
	// running(myActor);//finished
	// jogging(myActor); //finished
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
function waiting(pose,intensity,duration){//only works with "stand" pose
	for(let i=0;i<duration;i++){
		myActor.addCommand("Breathing",intensity,myActor.lerpSpeed/(duration*2));
		myActor.addCommand(pose);
	}
	myActor.addCommand(pose,null,myActor.lerpSpeed);
}

function HOP_BACKWARD(myActor,hop_distance){
	let jump_height = sqrt(hop_distance) * 2; // 使用平方根讓高度隨距離增長，但不會過高
	myActor.addCommand("HOP_PRELOAD",createVector(0, 2, 2));
	myActor.addCommand("HOP_BACKWARD",createVector(0, -jump_height, -17-hop_distance*0.7));
	myActor.addCommand("BACKHOP_LANDING_BUFFER",createVector(0, jump_height, -hop_distance*0.3)); 
	myActor.addCommand("STAND",createVector(0, -2, -10)); 
}

function CASUAL_SHEATHING(myActor){
	// myActor.addCommand("PROP_CMD",config = {
	// 	prop : blade,
	// 	offset: createVector(20.58, -9.71, 6.99),
	// 	socketDir: createVector(0.84, -0.45, 0.31)
	// });
	
	// myActor.addCommand("PROP_CMD",config = {
	// 	prop : blade,
	// 	offset: createVector(5.00, -1.15, 24.81),
	// 	socketDir: createVector(0.16, -0.08, 0.98)
	// });
	
	// myActor.addCommand("PROP_CMD",config = {
	// 	prop : blade,
	// 	offset: createVector(20.60, 14.43, -10.17),
	// 	socketDir: createVector(0.80, 0.47, -0.37)
	// });
	
	// myActor.addCommand("PROP_CMD",config = {
	// 	prop : blade,
	// 	offset: createVector(19.44, -5.83, -15.61),
	// 	socketDir: createVector(0.70, -0.29, -0.65)
	// });
	
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		offset: createVector(12.04, -8.15, -15.57),
		socketDir: createVector(0.53, -0.41, -0.74),
		lerpSpeed : 0.12
		
	});
	myActor.addCommand("CASUAL_SHEATHING_1");
	
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(5.96, 8.86, -8.28),
		socketDir: createVector(0.63, 0.45, -0.63)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentJoint: "handR",
		offset: createVector(14.82, -11.55, -10.69),
		socketDir: createVector(0.64, -0.63, -0.44),
		lerpSpeed : 0.12
	});
	myActor.addCommand("CASUAL_SHEATHING_2");
	
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		offset: createVector(14.93, -2.65, -17.71),
		socketDir: createVector(0.64, -0.18, -0.74),
		lerpSpeed : 0.12
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(2.02, 2.00, -13.00),
		socketDir: createVector(0.34, 0.10, -0.76)
	});
	myActor.addCommand("CASUAL_SHEATHING_3");
	
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentJoint: "handL",
		offset: createVector(-2.00, -3.98, -10.38),
		socketDir: createVector(0.09, -0.38, -0.92),
		lerpSpeed : 0.12
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(-2.00, -3.98, -10.38),
		socketDir: createVector(0.09, -0.38, -0.92)
	});
	myActor.addCommand("CASUAL_SHEATHING_4");
	myActor.addCommand("CASUAL_SHEATHING_STAND_transition");
	myActor.addCommand("STAND");
}

function STRIGHT_SHEATHING(myActor){
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(7.32, 8.48, 14.62),
		socketDir: createVector(0.25, 0.42, 0.87)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentJoint : "handR",
		offset: createVector(15.04, -9.38, -11.20),
		socketDir: createVector(0.69, -0.52, -0.50)
	});
	myActor.addCommand("STRIGHT_SHEATHING",createVector(-5,-22,-10));

	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentActor : myActor, 
		parentJoint : "handR",
		offset: createVector(16.24, 15.52, 0.00),
		socketDir: createVector(0.77, 0.63, 0.09),
		lerpSpeed : 0.12
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		parentActor : myActor, 
		parentJoint : "handL",
		offset: createVector(3.08, -2.52, -13.04),
		socketDir: createVector(0.20, -0.41, -0.89),
	});
	myActor.addCommand("QUICK_DRAW_STRICK_1",createVector(-5,10,-10));
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentActor : myActor, 
		parentJoint : "handL",
		offset: createVector(3.08, -2.52, -13.04),
		socketDir: createVector(0.20, -0.41, -0.89),
		lerpSpeed : 1
	});
	myActor.addCommand("STAND",createVector(-5, -29, 0)); 
}

function QUICK_DRAW_STRICK(myActor){
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentActor : myActor, 
		parentJoint : "handL",
		offset: createVector(3.08, -2.52, -13.04),
		socketDir: createVector(0.20, -0.41, -0.89)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		parentActor : myActor, 
		parentJoint : "handL",
		offset: createVector(3.08, -2.52, -13.04),
		socketDir: createVector(0.20, -0.41, -0.89)
	});
	myActor.addCommand("QUICK_DRAW_STRICK_1",createVector(20,29,0));

	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(12.74, 2.10, -5.84),
		socketDir: createVector(0.92, -0.04, -0.40)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentJoint : "handR",
		offset: createVector(17.36, -10.78, -11.32),
		socketDir: createVector(0.77, -0.45, -0.45)
	});
	myActor.addCommand("QUICK_DRAW_STRICK_2",createVector(5,0,5),myActor.lerpSpeed*6);
	
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentJoint : "handR",
		offset: createVector(4.12, 22.94, -8.80),
		socketDir: createVector(0.18, 0.93, -0.31)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(7.32, 8.48, 14.62),
		socketDir: createVector(0.25, 0.42, 0.87)
	});
	myActor.addCommand("QUICK_DRAW_STRICK_3",createVector(-10,11,25+60));
	
	
	myActor.addCommand("QUICK_DRAW_STRICK_4",createVector(0,1,10));
	myActor.addCommand("QUICK_DRAW_STRICK_4",createVector(0,0,0),myActor.lerpSpeed);
	STRIGHT_SHEATHING(myActor); 
}

function AERIAL_VLEAVE(myActor){
	myActor.addCommand("STAND",createVector(0, 0, 0),myActor.lerpSpeed); 
	
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentActor : myActor, 
		parentJoint : "handL",
		offset: createVector(-3.02, -1.28, -12.86),
		socketDir: createVector(0.00, 0.00, -0.3)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		parentActor : myActor, 
		parentJoint : "handL",
		offset: createVector(-3.02, -1.28, -12.86),
		socketDir: createVector(0.00, 0.00, -0.3)
	});
	myActor.addCommand("SQUAT_JUMP_SQUAT",createVector(0, 12, 0));
	
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		offset: createVector(8.16, -0.80, 10.90),
		socketDir: createVector(0.60, -0.34, 0.90)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(8.16, -0.80, 10.90),
		socketDir: createVector(0.60, -0.34, 0.90)
	});
	myActor.addCommand("SQUAT_JUMP_JUMP",createVector(0, -200, 0));
	 
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		offset: createVector(-0.83, 1.36, -15.35),
		socketDir: createVector(0.00, 0.00, -0.28)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(-0.83, 1.36, -15.35),
		socketDir: createVector(0.00, 0.00, -0.28)
	});
	myActor.addCommand("AERIAL_CLEAVE_1",createVector(0,-10,0),myActor.lerpSpeed*2.5);
	
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		offset: createVector(-0.83, 1.36, -15.35),
		socketDir: createVector(0.00, 0.00, -0.28)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(-0.83, 1.36, -15.35),
		socketDir: createVector(0.00, 0.00, -0.28)
	});
	myActor.addCommand("AERIAL_CLEAVE_2",createVector(0,-10,0));
	
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		parentJoint:"handR",
		offset: createVector(-1.92, 20.74, -4.64),
		socketDir: createVector(-0.02, 0.36, -0.08)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		parentJoint:"handL",
		offset: createVector(8.44, -12.12, 13.24),
		socketDir: createVector(0.28, -0.60, 0.44)
	});
	myActor.addCommand("AERIAL_CLEAVE_3",createVector(0,10,0),myActor.lerpSpeed*1.5);
	
	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		offset: createVector(0.00, 24.44, -2.06),
		socketDir: createVector(0, 1.44, 0)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(7.60, 10.54, 11.62),
		socketDir: createVector(0.26, 0.40, 0.64)
	});
	myActor.addCommand("AERIAL_CLEAVE_4",createVector(0,250,0));

	myActor.addCommand("PROP_CMD",config = {
		prop : blade,
		offset: createVector(0.64, 23.48, 8.18),
		socketDir: createVector(0.00, 1.60, 0.62)
	});
	myActor.addCommand("PROP_CMD",config = {
		prop : sheath,
		offset: createVector(5.40, 2.04, -14.44),
		socketDir: createVector(0.14, 0.00, -0.26)
	});
	myActor.addCommand("STAND",createVector(0, -52, 0),myActor.lerpSpeed); 
	CASUAL_SHEATHING(myActor)
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

function step_turn(myActor,degree,tempSpeed){
	// currently only turn left
	myActor.addCommand("STAND",null,myActor.lerpSpeed *tempSpeed); 
	myActor.addCommand("STEP_TURN",degree);
	myActor.addCommand("GLOBAL_TURN",[myActor.config.rotation,degree]);  
	myActor.addCommand("STAND",null,myActor.lerpSpeed);
	// myActor.addCommand("GLOBAL_TURN",[myActor.config.rotation,degree/2]); 
}