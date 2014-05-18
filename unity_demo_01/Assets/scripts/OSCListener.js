private var UDPHost : String = "127.0.0.1";
private var listenerPort : int = 8000;
private var broadcastPort : int = 57131;
private var oscHandler : Osc;

public var accel : Vector3;
public var gyro : Vector3;
public var magn : Vector3;

var mpuValues = new Array();

public function Start ()
{	
	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(UDPHost, broadcastPort, listenerPort);
	oscHandler = GetComponent("Osc");
	oscHandler.init(udp);
			
	oscHandler.SetAddressHandler("/mpuValues", readMpuValues);	
}

Debug.Log("Running");

function Update () 
{

} 

public function readMpuValues(oscMessage : OscMessage) : void
{	
	Osc.OscMessageToString(oscMessage);
	
	accel = Vector3(oscMessage.Values[0], oscMessage.Values[1], oscMessage.Values[2]);
	gyro = Vector3(oscMessage.Values[3], oscMessage.Values[4], oscMessage.Values[5]);
	magn = Vector3(oscMessage.Values[6], oscMessage.Values[7], oscMessage.Values[8]);
	
	//Debug.Log("Accel: " + accel + "; Gyro: " + gyro + "; Magn: " + magn);
	} 

