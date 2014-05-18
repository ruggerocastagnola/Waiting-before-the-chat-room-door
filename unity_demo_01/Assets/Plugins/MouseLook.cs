/*
using UnityEngine;
using System.Collections;

/// This is the script to edit to allow ROTATION through the gyroscope (Arduino)
/// ----------------------------------------------------------------------------

/// - Create a camera. Make the camera a child of the capsule. Reset it's transform.
/// - Add a MouseLook script to the camera.
///   -> Set the mouse look to use LookY. (You want the camera to tilt up and down like a head. The character already turns.)
[AddComponentMenu("Camera-Control/Mouse Look")]
public class MouseLook : MonoBehaviour {

	public enum RotationAxes { MouseXAndY = 0, MouseX = 1, MouseY = 2 }
	public RotationAxes axes = RotationAxes.MouseXAndY;
	public float sensitivityX = 15F;
	public float sensitivityY = 15F;

	/// rotate left - right
	public float minimumX = -360F;
	public float maximumX = 360F;
	/// rotate up - down (nod)
	public float minimumY = -60F;
	public float maximumY = 60F;

	float rotationY = 0F;

	public Vector3 rotationDeg;

	void Update ()
	{
		if (axes == RotationAxes.MouseXAndY)
		{	/// instead of Input.GetAxis put the input value from SerialRead (X)
			float rotationX = transform.localEulerAngles.y + Input.GetAxis("Mouse X") * sensitivityX;
			/// instead of Input.GetAxis put the input value from SerialRead (Y)
			rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);

			rotationDeg = new Vector3(-rotationY, rotationX, 0);
			transform.localEulerAngles = rotationDeg;
			//transform.Rotate (rotationDeg);
			//Debug.Log ("C#: " + rotationDeg);

		}
		else if (axes == RotationAxes.MouseX)
		{
			Vector3 direct = new Vector3(0, Input.GetAxis("Mouse X") * sensitivityX, 0);
			transform.Rotate(direct);
		}
		else
		{
			rotationY += Input.GetAxis("Mouse Y") * sensitivityY;
			rotationY = Mathf.Clamp (rotationY, minimumY, maximumY);
			
			transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
		}
	}
	
	void Start ()
	{
		// Make the rigid body not change rotation
		if (rigidbody)
			rigidbody.freezeRotation = true;
	}
}
*/