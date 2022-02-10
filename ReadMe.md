# HTML Helicopter Game
----------------------------------------------------------------
### Description

This is an HTML "game" using canvas and JavaScript. It is not interactive and does not handle inputs so it is technically not a game. 

To start, the game spawns 5 helicopters on the canvas at random locations with random velocities. Assuming 60fps, the helicopters shoot one missile every 5 seconds (the first missile is shot 2 seconds after spawning/respawning). Both the helicopters and the missiles bounces of the edge of the canvas. 

If a missile hits something, both the missile and the object hit will be destroyed, plays an explosion animation and sound. 

If a helicopter is hit by a missile, the helicopter will be destroyed, its death count increased by 1, and respawn at a random location with random velocity after 8 seconds. The helicopter that shot the missile will get a point. 

However, if the helicopter is hit by a missile shot by itself, it loses a point instead of gaining one. 

The score and the death count of a helicopter is displayed at the upper left corner of the helicopter.