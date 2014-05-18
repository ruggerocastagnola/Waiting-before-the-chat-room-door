

void getInputValues() 
{
  // get the values
  // try-catch to avoid serial & other errors
  try {
    while (myPort.available () > 0) {
      // its > the 0 because its receiving bytes (always more then 0 numbers)
      String myString = myPort.readStringUntil('\n');

      if (myString != null) {
        float[] numberValue = float(splitTokens(myString, "\t"));

        // get value of angular speed around Y axis
        inputValue = numberValue[4];
      }
    }
  }
  catch (ArrayIndexOutOfBoundsException e) {
  }
}
