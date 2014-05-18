
void drawOutput(PVector inputValues) {
  displayBackgroundGrid();
  displayValuesAsText(inputValues);
  displayEllipse(inputValues);
}

void displayEllipse(PVector inputValues) {
  
  calculateAmountOfMovement(inputValues);
  avoidEllipseLeavingTheCanvas();
  drawEllipse();
}

void calculateAmountOfMovement(PVector inputValues) {
  // X axis - move left/right
  if(inputValues.x <= moveLeftBreakPoint && inputValues.y <= 3000) 
  {
    moveLeftRightIncrement -= increment;
  } 
  else if(inputValues.x >= moveRightBreakPoint) 
  {
    moveLeftRightIncrement += increment; 
  } 
  else
  {
    moveLeftRightIncrement = 0;
  }
  
  // Y axis - move forward/backward
  if(inputValues.y <= moveForwardBreakPoint)
  {
    moveForwardBackwardIncrement -= increment;
  } 
  else if (inputValues.y >= moveBackwardBreakPoint)
  {
    moveForwardBackwardIncrement += increment; 
  } 
  else 
  {
    moveForwardBackwardIncrement = 0;
  }
}

void drawEllipse() {
  // draw ellipse
  fill(255, 255, 255);
  ellipse(leftRightPos, forwardBackwardPos, 30, 30);
}

void avoidEllipseLeavingTheCanvas() {
  // X axis
  if(leftRightPos >= width/2) 
  {
     leftRightPos = (width/2)-1; 
  } 
  else if(leftRightPos <= -width/2) 
  {
     leftRightPos = (-width/2)+1; 
  } 
  else 
  {
     leftRightPos += moveLeftRightIncrement;
  }
  
  // Y axis
  if(forwardBackwardPos >= height/2) 
  {
     forwardBackwardPos = (height/2)-1; 
  } 
  else if(forwardBackwardPos <= -height/2) 
  {
     forwardBackwardPos = (-height/2)+1; 
  } 
  else
  {
     forwardBackwardPos += moveForwardBackwardIncrement; 
  }
  
}

void displayValuesAsText(PVector valToOutput) {
    // put the values on the screen
  textSize(20);

  text("X:", 0 - width/2 + 10, height/2 - 50); 
  text(int(valToOutput.x), 0 - width/2 + 30, height/2 - 50);

  text("Y:", 0 - width/2 + 10, height/2 - 25);
  text(int(valToOutput.y), 0 - width/2 + 30, height/2 - 25);
}

void displayBackgroundGrid() {
  // back
  background(0, 0, 0);
  smooth();
  // line grid
  translate(width/2, height/2);
  line(0, height - height/2 - 10, 0, 0 - height/2 + 10);
  line(width - width/2 - 10, 0, 0 - width/2 + 10, 0);
  stroke(255);
}
