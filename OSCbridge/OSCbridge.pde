import oscP5.*;
import netP5.*;
import processing.serial.*;

Serial myPort;
// MPU values in from Serial
float axValue, ayValue, azValue, gxValue, gyValue, gzValue, mxValue, myValue, mzValue;

OscP5 oscP5;
NetAddress myBroadcastLocation; 

float[] mpuValues;
  
void setup() {
  size(400,140);
  frameRate(25);
  
  oscP5 = new OscP5(this,12000);
  myBroadcastLocation = new NetAddress("127.0.0.1",8000);
  
  String portName = "/dev/tty.usbmodem1411";
  myPort = new Serial(this, portName, 38400);
 } 

void draw() {
  background(0);
  
  readFromSerial();
  sendViaOsc();
}
