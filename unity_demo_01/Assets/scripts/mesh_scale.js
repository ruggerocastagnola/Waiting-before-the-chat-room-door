/*

#pragma strict

var mainTextureScale : Vector2;
var tex : Texture2D; 
var monitor : GameObject;

function Start () {
	monitor = GameObject.Find("monitor");
	tex = Resources.Load("chat_room_ui_01");
}

function Update () {
	monitor.renderer.materials[2].SetTexture("_MainTex", tex);
	monitor.renderer.materials[2].mainTextureScale = Vector2 (3, 4);
	monitor.renderer.materials[2].mainTextureOffset = Vector2(0.43, 0.3);

}

*/

/*
function OnGUI () {
	GUI.Label (Rect (0,0,100,50), "This is the text string for a Label Control");

}
*/
