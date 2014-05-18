Waiting before the chat room door — installation demo
========

<strong>Waiting Before the Chat Room Door</strong> is both a research project and a first person perspective interactive installation revolving around adolescent users of the medium between the end of the Nineties and the early Two-thousands. It is a Master's thesis work in Interaction Design at Iuav University of Venice (2014).

More info on the project on the <a href = "http://www.interaction-venice.com/projects/iuav-thesis/projects-2014/waiting-before-the-chat-room-door/" target = "_blank">Interaction Venice website</a>.

The installation aims at recreating as a virtual space the room and environment where my old home personal computer was kept. To make it a living museum and an actual place for memories.

This repository collects the code and instructions to rebuild the installation from scratch. If you just want to try the demo out, <a href = "http://www.ruggerocastagnola.com/docs/waiting_before_the_chat_room_door/waiting_before_the_chat_room_door_demo_test_mode.zip" target = "_blank">download it here</a>. Use the arrow keys to move around and the mouse to rotate.

<strong>ARCHITECTURE</strong><br/>
The installation consists of a hardware part, a head mounted controller built with an Arduino plus an Inertial Measurement Unit, and a software part, developed in Unity3d. 
The IMU gathers information from the accelerometer (2 axis) and gyroscope (1 axes) and sends them via I2C to the Arduino, which sends them to the computer via the serial port.

<img src = "http://www.ruggerocastagnola.com/docs/waiting_before_the_chat_room_door/hardware_information_flow_scheme.png">

Since I own a mac and there are unresolved issues with receiving a serial input in Unity, an additional Processing OSC sketch was necessary to bridge the two. The sketch was developed by .. and her thorough post can be read here. 

So the incoming serial port values are read by Processing and turned into OSC messages. These messages are then fed into Unity through Unity's OSC script. 

When the head-mounted controller is connected to the computer through the serial cable, the OSCbridge Processing sketch is up and running and Unity is in play mode, you should be able to move and rotate around the room, and interact with objects.

<strong>INTERACTIONS</strong><br/>
Currently, in the CharacterController.js script (in the Unity bundle) allows for moving left/right and forward/backward by tilting the head.

(img)

It also allows rotating left/right to rotate the view around the room.

(img)

<strong>HARDWARE</strong><br/>
Sparkfun MPU-9150 (link)
Arduino Uno (link)
Level shifter(link): In between the MPU (signal at 3.3V) and the Arduino pins (they output 5V).

Below you can find the schematics to wire it all up.

<img src = "http://ruggerocastagnola.com/docs/waiting_before_the_chat_room_door/electronics_fritzing.png">

To develop, test and run the installation I used a 2013 MacBook Pro 2.4GHZ i5 with OSX 10.9.2 (Mavericks).

<strong>EXTERNAL CASE</strong><br/>
The case was designed and 3d printed by Davide Tuberga. The CAD designs are available here.

<strong>SOFTWARE (aka WHAT GOES WHERE)</strong><br/>
ArduinoMPU: contains the ArduinoMPU sketch to load onto the Arduino. It is an example sketch to extract the raw data from the Sparkfun MPU-9150. The original library can be found here:
https://github.com/sparkfun/MPU-9150_Breakout

Calibration sketches: contains two calibration sketches written in Processing to understand the limit values for tilting and rotating.

OSCbridge: is the sketch that takes the input serial port value and turns it into OSC messages for Unity.

unity_demo_01: contains the whole package to run in Unity. It was developed and tested on a with Unity 4.3.4f1.

<strong>UNITY SCRIPTS</strong><br/>

<strong>HOW TO PUT THE HEAD MOUNTED CONTROLLER ON</strong><br/>
Like in the picture below. Acceleration and rotation values heavily depend on orientation and the way the head moves. If the controller is not worn like that, it won't probably work.

<strong>POSSIBLE FUTURE IMPROVEMENTS</strong><br/>
Originally, the user was supposed to be able to physically walk around in space, but to port and implement such software was too far out my schedule. It exists however, and it's a gait tracking algorythm written by .. during his PhD.

Since the audio component is key for this experience, another nice improvement would be a more precise ambient real time sound rendering. This could be done low cost using VBO.

<strong>MATERIALS</strong><br/>
3d models
audio
pictures&logos

<strong>ACKNOWLEDGMENTS</strong><br/>
Processing
Arduino
Unity3d
Fritzing
people who developed the bridge sketch and the library
online community
