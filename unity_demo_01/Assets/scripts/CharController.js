#pragma strict

// testmode
var testMode : boolean = true;

// this controller
var myController : CharacterController;

// other objects in the scene
var room : GameObject;
var desk : GameObject;
var modem : GameObject;
var door : GameObject;

// lights and visuals for the computer
var windows95: GameObject;
var windows95Light : GameObject;
var chatRoomText: GameObject;
var monitor : GameObject;
var monitorLight: GameObject;
var modemLed: GameObject;

// sounds
var trafficSound : GameObject;
var tvSound : GameObject;
var windowsXpShutDownSound: GameObject;
var chatRoomPeopleTalkingSound: GameObject;

// frames & textures
var mircFrame: GameObject;
var msnFrame: GameObject;

var msnTexture: Texture2D;
var mircTexture: Texture2D;
var onlineFriend01Texture: Texture2D;
var onlineFriend02Texture: Texture2D;

// pois room
var poisWall01: GameObject;
var poisWall02: GameObject;
var poisWall03: GameObject;
var poisWall0401: GameObject;
var poisWall0402: GameObject;
var poisWall0403: GameObject;
var poisGround: GameObject;

// first person camera
var cameraFP : Camera;

// timers
var chatRoomTimer : float = 4.0;
var activeChatRoomTimer : boolean = false;

var dialUpModemLedTimer : float = 1.0;
var activeDialUpModemLedTimer : boolean = false;
var modemOnOff : boolean = true;

// counter for collisions
var collisionCounter: int = 0;
var resetCollisionFlagMinBoundary : int = 110;
var resetCollisionFlagMaxBoundary : int = 140;

// input value from Arduino via the OSCListener.js script
var moveLeftRightInput : float = 0; 
var moveForwardBackwardInput : float = 0; 
var rotateLeftRightInput : float = 0; 

// speed of movement and rotation
var rotationSpeed : float = 20.0;
var movementSpeed : float = 40.0;

// the left and right rotations will trigger with this acceleration value  
var rotateLeftTrigger : float = -5000; 
var rotateRightTrigger : float = 4000; 

// the boundaries for the accelerometer
/*var moveLeftTrigger : float = 0; 
var moveRightTrigger : float = 3500; 
var moveBackwardTrigger : float = -3000; 
var moveForwardTrigger : float = 1000; */
var moveLeftTrigger : float = -3000; 
var moveRightTrigger : float = 2500; 
var moveBackwardTrigger : float = 6000; 
var moveForwardTrigger : float = 500;

// flags for rotation
var rotateLeft : boolean = false;
var rotateRight : boolean = false;
var rotationIsSleeping : boolean = true; 
var rotationLeftIsSleeping : boolean = false; 
var rotationRightIsSleeping : boolean = false; 
var rotationIsTransition : boolean = false; 

// collision flags
var alreadyCollidedWithDesk: boolean = false;

// background color for the outside of the room
var bgColor : Color = Color.black;

// flag to make windows95 float
var shouldWindows95Float : boolean = false;
var windows95FloatIncrementY : float = 0.2;
var windows95FloatIncrementZ : float = 0.1;

// flag to make the text for the chat room float
var shouldChatRoomTextFloat : boolean = false;
var chatRoomTextFloatIncrementX : float = 0.3;
var chatRoomTextFloatIncrementY : float = 0.2;
var chatRoomTextFloatIncrementZ : float = 0.1;

// flag to shut down the computer
var computerShouldShutDown : boolean = false;

function Start () 
{      
	FindGameObjects();
    SetGameObjects();
    
    // instantiate myController as the CharacterController for this scene
  	myController = GetComponent(CharacterController);

}


function Update () 
{

  	ImportInputValuesFromArduino();
  	testMode = false;

	
  	// movement, rotation, sit down, stand up
  	MovePlayer(testMode); 
  	RotatePlayer(testMode);
  	SitDownStandUp();
  	
  	CheckCollisionFlag();
  	
  	ManuallyResetCollisionCounter();
  	
  	Windows95Floats(shouldWindows95Float);  	
  	StartChatRoom();
  	ChatRoomTextFloats(shouldChatRoomTextFloat);
  	DialUpModemBlinks();
  	ComputerShutDownAndReset();


}  	



/*****************************************************/
/* Manual debug console */
function ManuallyResetCollisionCounter() 
{
	if(Input.GetKey ("r")) 
	{
		collisionCounter = 0;
	}
}
  	
  	
/*****************************************************/
/* Counter to check if and how many times has the CharacterController */
/* collided with the pc desk */

/* if the collision flag is on, check whether to make it go off */
function CheckCollisionFlag() 
{
  	if(alreadyCollidedWithDesk) {		
 		CheckWhetherToResetCollisionFlag();
	}
}
  	
  	
function CheckWhetherToResetCollisionFlag() 
{
  	// calculate distance between characterController and the computer desk
  	var dist = Vector3.Distance(myController.transform.position, desk.transform.position);
  		
  	if (dist > resetCollisionFlagMinBoundary && 
  		dist < resetCollisionFlagMaxBoundary &&
  		alreadyCollidedWithDesk == true) 
  	{
  		alreadyCollidedWithDesk = false;
  		collisionCounter++;
  	}
  Debug.Log(collisionCounter);
}
  	
  	
/*****************************************************/
/* Collision events handling */
/* search for collisions between the CharacterController and the objects in the environment */
function OnControllerColliderHit (hit : ControllerColliderHit) 
{
    var justCollidedWith : Rigidbody = hit.collider.attachedRigidbody;
    
    // collision with room 
    if(justCollidedWith == room.rigidbody) 
    {
    }
    
    if(justCollidedWith == desk.rigidbody)
    {
    
      
    	if(alreadyCollidedWithDesk == false) 
    	{
        
      		switch(collisionCounter)
      		{
      			case 0:
       				Debug.Log("0: Start computer");
		        	StartComputer();
		        break;
		        case 1:
		        	Debug.Log("1: Connect to the Internet");
		        	ConnectToTheInternet();
		        break;
		        case 2: 
		        	Debug.Log("2: Shut down and Reset");     
		        	ComputerStartShutDown();
		        break;
			}    
     	}
      
    alreadyCollidedWithDesk = true;
	}
    
}


/*****************************************************/
/* Handle all the output from the 3D model of the pc and modem */
/* (activated when the CharacterController collides with the pc desk) */
function StartComputer() 
{
	// windows startup sound
	if(windows95.audio.isPlaying == false) 
	{
		windows95.audio.Play();
	}
	
	// windows panel outside the window
	windows95.SetActive(true);
	windows95Light.SetActive(true);
	shouldWindows95Float = true;
	
	// computer monitor lights up and goes green
	monitor.renderer.material.color = Color(0, 0.9, 0.9, 1);
	monitorLight.SetActive(true);
	
	// show pois walls
	poisWall01.SetActive(true);
	poisWall02.SetActive(true);
	poisWall03.SetActive(true);
	poisWall0401.SetActive(true);
	poisWall0402.SetActive(true);
	poisWall0403.SetActive(true);
	poisGround.SetActive(true);
}


function ConnectToTheInternet() 
{
	// stop the previous audio fragment
	if(windows95.audio.isPlaying) 
	{
		windows95.audio.Stop();
	}
	
	// windows panel stops
	windows95.SetActive(false);
	windows95Light.SetActive(false);
	shouldWindows95Float = false;
	
	// stop all sounds
	trafficSound.audio.mute = true;
	tvSound.audio.mute = true;
	
	// computer monitor goes black, the light stays on
	monitor.renderer.material.color = Color(1, 1, 1, 1);
	
	// dial up modem connecting to the internet sound starts
	if (modem.audio.isPlaying == false) 
	{
		modem.audio.Play();         
	    // also the character sits (see function sitDownStandUp)
	}
	
	// dialup modem led starts to blink
	activeDialUpModemLedTimer = true;
	
	// a 3 sec timer to start the chat room is activated
	activeChatRoomTimer = true;
	
}


// shut down and reset the system
function ComputerStartShutDown() 
{	

	activeDialUpModemLedTimer = false;
	
	// stop the dial up modem sound if it's playing
	if(modem.audio.isPlaying == true)
	{
		modem.audio.Stop();
	}
	
	if(chatRoomPeopleTalkingSound.audio.isPlaying)
	{
		chatRoomPeopleTalkingSound.audio.Stop();
		Debug.Log("people talking: " + chatRoomPeopleTalkingSound.audio.isPlaying);
	}
	
	// just to be sure
	// stop windows audio
	if(windows95.audio.isPlaying) 
	{
		windows95.audio.Stop();
	}
	
	// windows XP shutdown
	windowsXpShutDownSound.audio.Play();
	
	// turn off the monitor
	monitorLight.SetActive(false);
	monitor.renderer.material.color = Color(0, 0, 0, 1);
	
	computerShouldShutDown = true;
}


function ComputerShutDownAndReset() 
{

	if(computerShouldShutDown)
	{
	
		if(windowsXpShutDownSound.audio.isPlaying == false)
		{
	
			// turn of the dial up modem led
			modemLed.SetActive(false);
	
			// shut down the chatroom panel (find it in the StartChatRoom function)
			chatRoomText.renderer.enabled =  false;
			shouldChatRoomTextFloat = false;
	
			// & shut down the windows95 panel
			windows95.SetActive(false);
			windows95Light.SetActive(false);
			shouldWindows95Float = false;
	
			// hide pois walls
			poisWall01.SetActive(false);
			poisWall02.SetActive(false);
			poisWall03.SetActive(false);
			poisWall0401.SetActive(false);
			poisWall0402.SetActive(false);
			poisWall0403.SetActive(false);
			poisGround.SetActive(false);
	
			// restore the original textures in the frames on the walls
			mircFrame.renderer.material.mainTexture = mircTexture;
			msnFrame.renderer.material.mainTexture = msnTexture;
	
			// restart ambient sounds
			trafficSound.audio.mute = false;
			tvSound.audio.mute = false;
			
			Debug.Log(trafficSound.audio.isPlaying);
			
			// the counter goes back to the start
			collisionCounter = -1;
	
			Debug.Log("-1: The system has reset");

		}
	
	}

}


function DialUpModemBlinks()
{

	// the led of the dial up modem blinks
	//modemLed.SetActive(true);
	if(activeDialUpModemLedTimer == true) 
	{
		
		dialUpModemLedTimer -= Time.deltaTime;
					
		if(dialUpModemLedTimer < 0) 
		{ 
			
			dialUpModemLedTimer = (Random.value)/2;
			modemOnOff = !modemOnOff;
			modemLed.SetActive(modemOnOff);
			
			Debug.Log("modemOnOff: " + modemOnOff);
		}
	
	} 
}


// when the Windows95 panel is active it should float
function Windows95Floats(shouldWindows95Float) 
{
	
	if(shouldWindows95Float) 
	{
		
		if(windows95.transform.position.y<125 ||
		   windows95.transform.position.y>145)
		   {
		   
		   	windows95FloatIncrementY *= -1;
		   
		   }
		   
		   
		 if(windows95.transform.position.z<660 ||
		   windows95.transform.position.z>680)
		   {
		   
		   	windows95FloatIncrementZ *= -1;
		   
		   }
		   
		   
		windows95.transform.position.y += windows95FloatIncrementY;
		windows95.transform.position.z += windows95FloatIncrementZ;

	}

}

// a 3 second timer: at the end, it activates the display 
// of the chat room panel outside the window
function StartChatRoom()
{
	if(activeChatRoomTimer == true) {
		
		chatRoomTimer -= Time.deltaTime;
			
		if(chatRoomTimer < 0) 
		{ 	
			// activate the chat room 3d text	
			chatRoomText.renderer.enabled =  true;
			// start the floating of the panel
			shouldChatRoomTextFloat = true;
			// reset the flag
			activeChatRoomTimer = false;
			// play people talking
			chatRoomPeopleTalkingSound.audio.Play();
			
			// change textures in the frames on the walls
			mircFrame.renderer.material.mainTexture = onlineFriend01Texture;
			msnFrame.renderer.material.mainTexture = onlineFriend02Texture;

		}		
	
	} 
	
}  	

// when the Chat room panel is active it should float
function ChatRoomTextFloats(shouldChatRoomTextFloat) 
{
	if(shouldChatRoomTextFloat) 
	{	
		
		if(chatRoomText.transform.position.x<1770 ||
		   chatRoomText.transform.position.x>1790)
		   {
		   
		   	chatRoomTextFloatIncrementX *= -1;
		   
		   }
	
		if(chatRoomText.transform.position.y<125 ||
		   chatRoomText.transform.position.y>145)
		   {
		   
		   	chatRoomTextFloatIncrementY *= -1;
		   
		   }
		   
		   
		if(chatRoomText.transform.position.z<660 ||
		   chatRoomText.transform.position.z>680)
		   {
		   
		   	chatRoomTextFloatIncrementZ *= -1;
		   
		   }
		   
		chatRoomText.transform.position.x += chatRoomTextFloatIncrementX;
		chatRoomText.transform.position.y += chatRoomTextFloatIncrementY;
		chatRoomText.transform.position.z += chatRoomTextFloatIncrementZ;
	
	}

}


/*****************************************************/
/* Read the incoming values from Arduino */
function ImportInputValuesFromArduino()
{
  	var getVal : OSCListener = gameObject.GetComponent(OSCListener);
  	
  	// get movement values via the OSCListener.js script
  	moveLeftRightInput = getVal.accel.z;
  	moveForwardBackwardInput = getVal.accel.x;
  
  	// get rotation values via the OSCListener.js script
  	rotateLeftRightInput = getVal.gyro.y;

}


/*****************************************************/
/* Find and set the objects in the scene */
function SetGameObjects()
{
	windows95.SetActive(false);
	windows95Light.SetActive(false);
	monitorLight.SetActive(false);
	chatRoomText.renderer.enabled = false;
	modemLed.SetActive(false);
	
	cameraFP.backgroundColor = bgColor;
	
	// textures in frames
	mircFrame.renderer.material.mainTexture = mircTexture;
	msnFrame.renderer.material.mainTexture = msnTexture;
	
	// pois walls
	poisWall01.SetActive(false);
	poisWall02.SetActive(false);
	poisWall03.SetActive(false);
	poisWall0401.SetActive(false);
	poisWall0402.SetActive(false);
	poisWall0403.SetActive(false);
	poisGround.SetActive(false);
}


function FindGameObjects()
{
	// find all the objects
  	room = GameObject.Find("room");
  	desk = GameObject.Find("computer_desk");
  	modem = GameObject.Find("dialup_modem");
  	door = GameObject.Find("door");
  	
  	// find graphics and lights
  	windows95 = GameObject.Find("windows95_in_the_sky");
  	windows95Light = GameObject.Find("windows95_light");
  	monitor = GameObject.Find("computer_monitor_screen");
  	monitorLight = GameObject.Find("computer_monitor_light");
  	modemLed = GameObject.Find("dialup_modem_led");
  	chatRoomText = GameObject.Find("computer_chatroom_3dtext");
  	  	
  	// find first person controller camera
  	cameraFP = GameObject.Find("fp MainCamera").camera;
  	
  	// frames & textures
  	mircFrame = GameObject.Find("frame_mirc");
  	msnFrame = GameObject.Find("frame_msn");
  	mircTexture = Resources.Load("mirc", Texture2D);
  	msnTexture = Resources.Load("msn_messenger", Texture2D);
  	onlineFriend01Texture = Resources.Load("online_friend01", Texture2D);
  	onlineFriend02Texture = Resources.Load("online_friend02", Texture2D);
  	
  	// sounds
  	trafficSound = GameObject.Find("traffic_sound");
  	tvSound = GameObject.Find("tv_sound");
  	windowsXpShutDownSound = GameObject.Find("windows_shutdown_sound");
  	chatRoomPeopleTalkingSound = GameObject.Find("chatroom_people_talking_sound");
  	
  	// pois walls
  	poisWall01 = GameObject.Find("room_wall-01");
  	poisWall02 = GameObject.Find("room_wall-02");
  	poisWall03 = GameObject.Find("room_wall-03");
  	poisWall0401 = GameObject.Find("room_wall-04-01");
  	poisWall0402 = GameObject.Find("room_wall-04-02");
  	poisWall0403 = GameObject.Find("room_wall-04-03");
  	poisGround = GameObject.Find("room_ground");
}


/*****************************************************/
/* Movement, rotation, stand up, sit down */
function MovePlayer(isTestMode) 
{  
	
  	if(isTestMode) 
	{
		
		if(Input.GetAxis("Vertical") > 0)
		{
			MovePlayerBackwards();
		}
		else if(Input.GetAxis("Vertical") < 0)
		{
			MovePlayerForward();
		}
		else if(Input.GetAxis("Vertical") == 0)
		{
			KeepPlayerStill();
		}
		
		if(Input.GetAxis("Horizontal") < 0)
		{
			MovePlayerLeft();
		}
		else if(Input.GetAxis("Horizontal") > 0) 
		{
			MovePlayerRight();
		}
		else if(Input.GetAxis("Horizontal") == 0)
		{
			KeepPlayerStill();	
		}
	
	} 
	else
	{
			
		if(moveForwardBackwardInput <= moveForwardTrigger)
		{
			MovePlayerForward();
		}
		else if(moveForwardBackwardInput >= moveBackwardTrigger)
		{
			MovePlayerBackwards();
		}
		else if(moveForwardTrigger < moveForwardBackwardInput &&
				moveForwardBackwardInput > moveBackwardTrigger)
		{
			KeepPlayerStill();
		}
	
		if(moveLeftRightInput <= moveLeftTrigger && moveForwardBackwardInput <= 3000)
		{
			MovePlayerLeft();	
		}
		else if(moveLeftRightInput >= moveRightTrigger)
		{
			MovePlayerRight();
		}
		else if(moveLeftTrigger < moveLeftRightInput && 
				moveLeftRightInput < moveRightTrigger)
		{
			KeepPlayerStill();
		}

	}
	
}


function MovePlayerBackwards()
{
	var bck : Vector3 = transform.TransformDirection(Vector3.back);
	myController.Move(bck*Time.deltaTime*movementSpeed);
}


function MovePlayerForward()
{
	var fwd : Vector3 = transform.TransformDirection(Vector3.forward);
	myController.Move(fwd*Time.deltaTime*movementSpeed);
}
	 
	  	 	
function MovePlayerLeft()
{
	var lft : Vector3 = transform.TransformDirection(Vector3.left);
	myController.Move(lft*Time.deltaTime*movementSpeed);
}


function MovePlayerRight()
{
	var rht : Vector3 = transform.TransformDirection(Vector3.right);
	myController.Move(rht*Time.deltaTime*movementSpeed);
}	  


function KeepPlayerStill()
{
	var nll : Vector3 = transform.TransformDirection(Vector3.zero);
	myController.Move(nll*Time.deltaTime*movementSpeed);
}
	  

function RotatePlayer(isTestMode) 
{
   	HandleRotationCaveats();
   	
   	if(isTestMode)
   	{
   		if(Input.GetAxis("Mouse X") > 0)
   		{
   			RotatePlayerLeft();
   		}
   		else if(Input.GetAxis("Mouse X") < 0)
   		{
   			RotatePlayerRight();
   		}
   	}
   	else 
   	{
   		if(rotateLeft)
   		{
   			RotatePlayerLeft();
   		}
   		else if(rotateRight)
   		{
   			RotatePlayerRight();
   		}
   	}
   	
}


function RotatePlayerLeft()
{
	transform.Rotate(0, -rotationSpeed*Time.deltaTime, 0);
}


function RotatePlayerRight()
{
	transform.Rotate(0, rotationSpeed*Time.deltaTime, 0);
}


function HandleRotationCaveats() 
{

	// if inputValue is a negative acceleration & the system was in standby 
  	// stop sleeping and turn left
  	if (rotateLeftRightInput <= rotateLeftTrigger && rotationIsSleeping == true) 
  	{
      	rotationIsSleeping = false;
      	rotateLeft = true;
  	}  
  
  	// if you are rotating and the inputValue is down as if there was no acceleration
  	// the head is rotated left; activate a standby state on the left side and keep rotating
  	if(rotateLeft && rotateLeftRightInput > rotateLeftTrigger)
  	{
   		rotationLeftIsSleeping = true;
  	}
  
  	// if the system is in standby on the left, and rotating left, and there is 
  	// a positive acceleration, stop standby on the left, stop rotating and enter a state of transition
  	if(rotationLeftIsSleeping && rotateLeftRightInput >= rotateRightTrigger)
  	{
    	rotationLeftIsSleeping = false;
    	rotateLeft = false;
    	rotationIsTransition = true;
  	}
  
  	// ***
  	// if there is a state of transition and the values drop as if there was no acceleration
  	// reenter original standby state
  	if(rotateLeftRightInput > rotateLeftTrigger && rotateLeftRightInput < rotateRightTrigger && rotationIsTransition)
  	{
    	rotationIsTransition = false;
    	rotationIsSleeping = true;
  	}
    
  	// copy the same thing for the right, except the *** part, which happens only once
  
  	// if inputValue is a positive acceleration & the system was in standby 
  	// stop sleeping and turn right
  	if (rotateLeftRightInput > rotateRightTrigger && rotationIsSleeping == true) 
  	{
    	 rotationIsSleeping = false;
     	 rotateRight = true;
  	}  
  
  	// if you are rotating and the inputValue is down as if there was no acceleration
  	// the head is rotated right; activate a standby state on the right side and keep rotating
  	if(rotateRight && rotateLeftRightInput <= rotateRightTrigger)
  	{
    	rotationRightIsSleeping = true;
  	}

   
   // if rotateLeft is true, decrement position
  if (Input.GetAxis("Mouse X") > 0 /*|| rotateLeft*/) 
  { // var rotateLeft = - rotationSpeed*Time.deltaTime;
  	// put rotateLeft in the next line
    transform.Rotate(0, -rotationSpeed*Time.deltaTime, 0);
  }
  
  // if rotateRight is true, increment position
  if(Input.GetAxis("Mouse X") < 0 /*|| rotateRight*/)
  {
    transform.Rotate(0, rotationSpeed*Time.deltaTime, 0);
  } 
  
  	// if the system is in standby on the right, and rotating right, and there is 
  	// a negative acceleration, stop standby on the right, stop rotating and enter a state of transition
  	if(rotationRightIsSleeping && rotateLeftRightInput <= rotateLeftTrigger)
  	{
    	rotationRightIsSleeping = false;
    	rotateRight = false;
    	rotationIsTransition = true;
  	}

}


function SitDownStandUp() 
{

	if(myController.transform.position.x < 1080 && 
	   myController.transform.position.x > 980 &&
	   myController.transform.position.z < 615 &&
	   
	   /* original value was 605 */
	   myController.transform.position.z > 545)
	{
		cameraFP.transform.position.y = 90;
		movementSpeed = 50;
		rotationSpeed = 25;
		//Debug.Log("inside");
		
	} else 
	{
		cameraFP.transform.position.y = 120;
		movementSpeed = 100;
		rotationSpeed = 50;
		//Debug.Log("outside!");
	}	

}
