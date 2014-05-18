
PVector aValues = new PVector(0, 0);

PVector getInputValues() {
  // get the values
  // try-catch to avoid serial & other errors
  try {
    while (myPort.available () > 0) {
      // its > the 0 because its receiving bytes (always more then 0 numbers)
      String myString = myPort.readStringUntil('\n');

      if (myString != null) {
        //println(myString);
        float[] inputValue = float(splitTokens(myString, "\t"));

        // invert order (my accel is rotated 90 deg from standard 0, 0, 0)

        aValues.x = inputValue[2];
        aValues.y = inputValue[0];
        
        println("x: " + aValues.x + "; y: " + aValues.y);
      }
    }
  }
  catch (ArrayIndexOutOfBoundsException e) {
  }
  
  return aValues;
}
