// This is the script to edit to allow TRANSFORM through the gyroscope (Arduino)
// ----------------------------------------------------------------------------

private var motor : CharacterMotor;

var firstPersonControllerObject : GameObject;
var moveCharacter;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
	
	// connect to the First Person Controller object on startup
	// and to its resources such as scripts, etc
	firstPersonControllerObject = GameObject.Find("First Person Controller");
}

// Update is called once per frame
function Update () {
	// Get the input vector from SerialRead (Arduino)
	// Horizontal is for moving around, the one I'm interested in
	// Vertical is for jumping and falling, and I don't care 
	var multiplier = 50;
	var directionVector = new Vector3(Input.GetAxis("Horizontal")*multiplier, 0, multiplier*Input.GetAxis("Vertical"));

	
	// to avoid NullReferenceException the first time
	// try catch does not work - find out why
	/*try{
		moveCharacter = firstPersonControllerObject.GetComponent("OSCListener").moveChar;
	} 
	catch(var ex: NullReferenceException) {
	}*/
	
	// uncomment this to use the accelerometer — Arduino
	/*moveCharacter = firstPersonControllerObject.GetComponent("OSCListener").moveChar;
	
	if(moveCharacter == null) {
	moveCharacter = 0;
	}
	
	// be still
	if(moveCharacter > -15 && moveCharacter < 15) {
	moveCharacter = 0;
	} 
	
	moveCharacter = -1 * moveCharacter;
				
	var directionVector = new Vector3(moveCharacter, 0, 0);
	Debug.Log(moveCharacter);*/
	
	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		
		// Make sure the length is no bigger than maxLength
		var maxLength = 50;
		directionLength = Mathf.Min(maxLength, directionLength);
		
		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
		// This makes it easier to control slow speeds when using analog sticks
		directionLength = directionLength * directionLength;
		
		// Multiply the normalized direction vector by the modified length
		directionVector = directionVector * directionLength;
	}
	
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = transform.rotation * directionVector;
	motor.inputJump = Input.GetButton("Jump");
}


// from <http://answers.unity3d.com/questions/200876/oncharactercontrollerhit-doesnt-work-as-documented.html>
function OnControllerColliderHit(hit: ControllerColliderHit){
  if (hit.normal.y < 0.9){ // accept only normals < 64 degrees (sin(64)~ 0.9)
    // collision wasn't vertical  
    //Debug.Log("OnControllerColliderHit");
  }
}

/*function OnCollisionEnter(){
    Debug.Log("OnCollsion");
}

function OnCollisionStay(){
    Debug.Log("OnCollsionStay");
}

function OnTriggerEnter(){
    Debug.Log("OnTriggerEnter");
}*/


// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/FPS Input Controller")
