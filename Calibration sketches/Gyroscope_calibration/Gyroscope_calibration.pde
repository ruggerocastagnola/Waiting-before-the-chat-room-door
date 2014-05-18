/*
 This sketch gets X/Y/Z values from a Triple Axis Accelerometer Breakout (MMA8452Q), 
 from arduino. It was originally developed by Sara Salsinha and adapted by Ruggero Castagnola
 */

import processing.serial.*;
Serial myPort;

// gyro rotation value around the Y axis
float inputValue = 0;
float yIncrement = 1.0;
float yPos;

// the left and right rotations will trigger with this acceleration value
float leftTrigger = -3000;
float rightTrigger = 3000;

boolean rotateLeft = false;
boolean rotateRight = false;
boolean isSleeping = true;
boolean isSleepingLeft = false;
boolean isSleepingRight = false;
boolean isTransition = false;

void setup() 
{
  size(600, 600);
  frameRate(12);
  serialSetup();
}

void draw() {
  getInputValues();
  drawOutput();
}



