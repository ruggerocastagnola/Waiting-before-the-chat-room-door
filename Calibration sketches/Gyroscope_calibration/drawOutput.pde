

void drawOutput() 
{
  drawGrid();
  displayNumberFeedback();
  drawEllipse();
}

void drawEllipse()
{
  evaluateInput();
  applyIncrement();
  
  // draw ellipse
  fill(255, 255, 255);
  ellipse(yPos, 0, 30, 30);
}

void displayNumberFeedback()
{
  // put the values on the screen
  textSize(30);

  text("Y:", 0 - width/2 + 10, height/2 - 25);
  text(int(inputValue), 0 - width/2 + 40, height/2 - 25);
}

void drawGrid()
{
  // back
  background(0, 0, 0);
  smooth();
  // line grid
  translate(width/2, height/2);
  line(0, height - height/2 - 10, 0, 0 - height/2 + 10);
  line(width - width/2 - 10, 0, 0 - width/2 + 10, 0);
  stroke(255);
}

void evaluateInput() 
{
  // if inputValue is a negative acceleration & the system was in standby 
  // stop sleeping and turn left
  if (inputValue <= leftTrigger && isSleeping == true) 
  {
      isSleeping = false;
      rotateLeft = true;
  }  
  
  // if you are rotating and the inputValue is down as if there was no acceleration
  // the head is rotated left; activate a standby state on the left side and keep rotating
  if(rotateLeft && inputValue > leftTrigger)
  {
    isSleepingLeft = true;
  }
  
  // if the system is in standby on the left, and rotating left, and there is 
  // a positive acceleration, stop standby on the left, stop rotating and enter a state of transition
  if(isSleepingLeft && inputValue >= rightTrigger)
  {
    isSleepingLeft = false;
    rotateLeft = false;
    isTransition = true;
  }
  
  // ***
  // if there is a state of transition and the values drop as if there was no acceleration
  // reenter original standby state
  if(inputValue > leftTrigger && inputValue < rightTrigger && isTransition)
  {
    isTransition = false;
    isSleeping = true;
  }
  
  /*println("inputValue: " + inputValue + "; isSleeping: " + isSleeping + 
          "; isSleepingLeft: " + isSleepingLeft + "; rotateLeft: " + rotateLeft + 
          "; isTransition: " + isTransition + "; yPos: " + yPos);*/
  
  // copy the same thing for the right, except the *** part, which happens only once
  
  // if inputValue is a positive acceleration & the system was in standby 
  // stop sleeping and turn right
  if (inputValue > rightTrigger && isSleeping == true) 
  {
      isSleeping = false;
      rotateRight = true;
  }  
  
  // if you are rotating and the inputValue is down as if there was no acceleration
  // the head is rotated right; activate a standby state on the right side and keep rotating
  if(rotateRight && inputValue <= rightTrigger)
  {
    isSleepingRight = true;
  }
  
  // if the system is in standby on the right, and rotating right, and there is 
  // a negative acceleration, stop standby on the right, stop rotating and enter a state of transition
  if(isSleepingRight && inputValue <= leftTrigger)
  {
    isSleepingRight = false;
    rotateRight = false;
    isTransition = true;
  }
  
  println("inputValue: " + inputValue + "; isSleeping: " + isSleeping + 
          "; isSleepingLeft: " + isSleepingLeft + "; isSleepingRight: " + isSleepingRight + 
          "; rotateLeft: " + rotateLeft + ";rotateRight: " + rotateRight +
          "; isTransition: " + isTransition + "; yPos: " + yPos);
}

void applyIncrement()
{
  // if rotateLeft is true, decrement position
  if (rotateLeft) 
  {
    yPos -= yIncrement;
  }
  
  // if rotateRight is true, increment position
  if(rotateRight)
  {
    yPos += yIncrement;
  } 
}
