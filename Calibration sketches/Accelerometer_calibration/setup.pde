

void serialSetup() {
  //println(Serial.list());
  String portName = "/dev/tty.usbmodem1411";
  myPort = new Serial(this, portName, 38400);
}
