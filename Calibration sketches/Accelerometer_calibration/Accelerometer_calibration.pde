/*
 This sketch gets X/Y/Z values from a Triple Axis Accelerometer Breakout (MMA8452Q), 
 from arduino. It was originally developed by Sara Salsinha and adapted by Ruggero Castagnola
 */

PVector inputValues = new PVector(0, 0);

//move left break point
float moveLeftBreakPoint = -300;
// move right break point
float moveRightBreakPoint = 3500;
// move forward break point
float moveForwardBreakPoint = 500;
// move backward break point
float moveBackwardBreakPoint = 4000;

float moveLeftRightIncrement, moveForwardBackwardIncrement;
float increment = 0.5;
float leftRightPos = 0;
float forwardBackwardPos = 0;

import processing.serial.*;
Serial myPort;

void setup() {
  size(600, 600);
  frameRate(12);
  serialSetup();
}

void draw() {
  inputValues = getInputValues(); 
  drawOutput(inputValues);
}

