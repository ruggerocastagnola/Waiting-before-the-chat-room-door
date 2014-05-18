void readFromSerial() {
  try {
      while (myPort.available () > 0) {
        String myString = myPort.readStringUntil('\n');
  
        if (myString != null) {
          mpuValues = float(splitTokens(myString, "\t"));
  
          // add new data to the end
          axValue = mpuValues[0];
          ayValue = mpuValues[1];
          azValue = mpuValues[2];
          gxValue = mpuValues[3];
          gyValue = mpuValues[4];
          gzValue = mpuValues[5];
          mxValue = mpuValues[6];
          myValue = mpuValues[7];
          mzValue = mpuValues[8];
          
          for(int i = 0; i < mpuValues.length; i++) {
          print(mpuValues[i] + ", ");
          }
          println("");
          //println(mpuValues[4]);
        }
      }
    }
    catch (ArrayIndexOutOfBoundsException e) {
    }
}
