#pragma strict


private var rotationSpeed : float = 20.0;

function Start () {

}

function Update () 
{

	//RotateUpDown();
	
}

function RotateUpDown() 
{
	if(Input.GetAxis("Mouse Y") > 0)
	{
		transform.Rotate(-rotationSpeed*Time.deltaTime, 0, 0);
	}
	else if(Input.GetAxis("Mouse Y") < 0) 
	{
		transform.Rotate(rotationSpeed*Time.deltaTime, 0, 0);
	} 
	else if(Input.GetAxis("Mouse Y") == 0)
	{
		transform.Rotate(0, 0, 0);
	}
}