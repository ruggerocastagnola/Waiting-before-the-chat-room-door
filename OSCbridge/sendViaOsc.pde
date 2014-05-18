void sendViaOsc() {
  OscMessage myOscMessage = new OscMessage("/mpuValues");  

  for (int i = 0; i< mpuValues.length; i++) {
    float mpuValue = mpuValues[i];
    myOscMessage.add(mpuValue);
  }

  oscP5.send(myOscMessage, myBroadcastLocation);
}

