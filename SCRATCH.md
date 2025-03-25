dynamic imports fail on first reload of freshly deployed app

[Error] Failed to load resource: the server responded with a status of 404 () (index-CLCEBuS2.js, line 0)
[Error] Failed to load resource: the server responded with a status of 404 () (Graphics-BEbXZ7Hb.js, line 0)
[Error] Failed to load resource: the server responded with a status of 404 () (gameMain-BauKTYys.js, line 0)
[Error] Failed to load resource: the server responded with a status of 404 () (swopCharacters-DzZtghgy.js, line 0)
[Error] Unhandled Promise Rejection: TypeError: Importing a module script failed.
	(anonymous function) (App-Bs1f2N9m.js:641:12765)


looks useful but hasn't been updated in 9 years, probably doesn't work
https://github.com/spite/WebAudioExtension


Sounds and when/where:

* spot:
	- on game start (fanfare)
		- is this the only one?

* pickups
	- on collection

* lift
	- on flying
	- doppler effect?	

* player:
	- walking
	- jumping 
	- falling
	- teleporting in/out

* teleporter:
	- warning siren

* hush puppies
	- vanishing

* items:
	- falling	
	- bumping
	- being pushed

* pickups.
	- reward sound - problem - they are out of the room by the time they're picked up!	
	- solution - make the player play that sound?
	- actually, is it only scheduled for deletion?
	- make the dust cloud that comes after play the sound?