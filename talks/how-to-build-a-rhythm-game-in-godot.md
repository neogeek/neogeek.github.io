---
title: How to Build a Rhythm Game in Godot
subtitle: The outline of a workshop given at GodotCon 2026 in Boston, MA
date: 07/20/2026
---

<style type="text/css">
a[href*="#"][name] {
  margin: 1rem 0;
  display: block;
  background-color: transparent;
}

a[href*="#"][name] img {
  display: block;
  border-radius: 0.5rem;
}

.instructions {
  margin: 3rem 0;
  text-align: center;
}

.instructions img {
  width: 50px;
  height: auto;
  vertical-align: middle;
}

.instructions p {
  margin: 0 1rem;
  display: inline-block;
}

@media (prefers-color-scheme: light) {
  a[href*="#"][name] img {
    border: 0.35rem solid #4693FF;
  }
}

@media (prefers-color-scheme: dark) {
  a[href*="#"][name] img {
    border: 0.35rem solid #ffda1f;
  }
}

.models {
  display: flex;
  gap: 0.5rem;
  justify-content: space-around;
}

</style>

<div class="instructions">
  <img src="/images/talks/key_left.svg" />
  <p>Use the left and right arrow keys to navigate the slides</p>
  <img src="/images/talks/key_right.svg" />
</div>

<a href="#1" name="1">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-1.jpg" />
</a>

<a href="#2" name="2">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-2.jpg" />
</a>

<a href="#3" name="3">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-3.jpg" />
</a>

<a href="#4" name="4">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-4.jpg" />
</a>

<a href="#5" name="5">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-5.jpg" />
</a>

<a href="#6" name="6">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-6.jpg" />
</a>

1. Rhythm Game Utilities <a href="https://rhythmgameutilities.com/">https://rhythmgameutilities.com/</a>

<a href="#7" name="7">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-7.jpg" />
</a>

<a href="#8" name="8">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-8.jpg" />
</a>

<a href="#9" name="9">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-9.jpg" />
</a>

<a href="#10" name="10">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-10.jpg" />
</a>

<a href="#11" name="11">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-11.jpg" />
</a>

<a href="#12" name="12">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-12.jpg" />
</a>

1. Moonscraper-Chart-Editor <a href="https://github.com/FireFox2000000/Moonscraper-Chart-Editor">https://github.com/FireFox2000000/Moonscraper-Chart-Editor</a>

<a href="#13" name="13">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-13.jpg" />
</a>

1. signal <a href="https://signalmidi.app/">https://signalmidi.app/</a>

<a href="#14" name="14">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-14.jpg" />
</a>

<a href="#15" name="15">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-15.jpg" />
</a>

<a href="#16" name="16">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-16.jpg" />
</a>

<a href="#17" name="17">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-17.jpg" />
</a>

<a href="#18" name="18">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-18.jpg" />
</a>

<a href="#19" name="19">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-19.jpg" />
</a>

<a href="#20" name="20">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-20.jpg" />
</a>

<a href="#21" name="21">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-21.jpg" />
</a>

<a href="#22" name="22">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-22.jpg" />
</a>

## Setup the project

> ⚠️ **Note:** Remember to commit after each major step so you can easily recover if issues occur.

1. Create an empty Godot project.
1. Download the Rhythm Game Utilities Godot plugin <https://github.com/rhythm-game-utilities/godot-plugin>
1. Move the `addons/` folder into your new Godot project.
1. (Optional) Add the `[debug]` flags I've used while setting up this project to the `project.godot` config.

<details>
<summary>Expand see debug flags</summary>

```yaml
[debug]

gdscript/warnings/unassigned_variable=2
gdscript/warnings/unassigned_variable_op_assign=2
gdscript/warnings/unused_variable=2
gdscript/warnings/unused_local_constant=2
gdscript/warnings/unused_private_class_variable=2
gdscript/warnings/unused_parameter=2
gdscript/warnings/unused_signal=2
gdscript/warnings/shadowed_variable=2
gdscript/warnings/shadowed_variable_base_class=2
gdscript/warnings/shadowed_global_identifier=2
gdscript/warnings/unreachable_code=2
gdscript/warnings/unreachable_pattern=2
gdscript/warnings/standalone_expression=2
gdscript/warnings/standalone_ternary=2
gdscript/warnings/incompatible_ternary=2
gdscript/warnings/untyped_declaration=2
gdscript/warnings/inferred_declaration=0
gdscript/warnings/unsafe_property_access=2
gdscript/warnings/unsafe_method_access=2
gdscript/warnings/unsafe_cast=2
gdscript/warnings/unsafe_call_argument=2
gdscript/warnings/unsafe_void_return=2
gdscript/warnings/return_value_discarded=1
gdscript/warnings/static_called_on_instance=2
gdscript/warnings/missing_tool=2
gdscript/warnings/redundant_static_unload=2
gdscript/warnings/redundant_await=2
gdscript/warnings/missing_await=2
gdscript/warnings/assert_always_true=2
gdscript/warnings/assert_always_false=2
gdscript/warnings/integer_division=2
gdscript/warnings/narrowing_conversion=2
gdscript/warnings/int_as_enum_without_cast=2
gdscript/warnings/int_as_enum_without_match=2
gdscript/warnings/enum_variable_without_default=2
gdscript/warnings/empty_file=2
gdscript/warnings/deprecated_keyword=2
gdscript/warnings/confusable_identifier=2
gdscript/warnings/confusable_local_declaration=2
gdscript/warnings/confusable_local_usage=2
gdscript/warnings/confusable_capture_reassignment=2
```

</details>

## Setup the base scene

1. Create a new 3D scene.
1. Switch to the 3D view
1. Add the sun and the environment to the scene
1. Add a `Camera3D` node to the scene
1. Move the camera to `0.0, 10.0, 3.5`
1. Rotate the camera to `-45.0, 0.0, 0.0`
1. Add an `AudioStreamPlayer` node to the scene
1. Save the scene

## Import the models

1. Download the following models and add them to your project. <a href="models.zip" download>models.zip</a>

<div class="models">
    <model-viewer src="models/Note (Green).glb" camera-controls auto-rotate></model-viewer>
    <model-viewer src="models/Note (Red).glb" camera-controls auto-rotate></model-viewer>
    <model-viewer src="models/Note (Yellow).glb" camera-controls auto-rotate></model-viewer>
</div>
<div class="models">
    <model-viewer src="models/Hit Note (Green).glb" camera-controls auto-rotate></model-viewer>
    <model-viewer src="models/Hit Note (Red).glb" camera-controls auto-rotate></model-viewer>
    <model-viewer src="models/Hit Note (Yellow).glb" camera-controls auto-rotate></model-viewer>
</div>
<div class="models">
    <model-viewer src="models/Track.glb" camera-controls auto-rotate></model-viewer>
    <model-viewer src="models/Track Beat Bar.glb" camera-controls auto-rotate></model-viewer>
</div>

2. Select the following models, switch the inspector to the `Import` tab, select **Import As:** `Single Mesh`, then press **Reimport**.
   - `Note (green).glb`
   - `Note (red).glb`
   - `Note (yellow).glb`
   - `Track Beat Bar.glb`

3. Drag `Track.glb` to the main scene and position it at `0.0, 0.0, 1.0`.
4. Drag `Hit Note (Green).glb` to the main scene and position it at `-2.0, 0.0, 0.0`.
5. Drag `Hit Note (Red).glb` to the main scene and position it at `0.0, 0.0, 0.0`.
6. Drag `Hit Note (Yellow).glb` to the main scene and position it at `2.0, 0.0, 0.0`.

## Import the song

1. Download the song files (`.mid` and `.mp3`) and add them to your project. <a href="song.zip" download>song.zip</a>

## Create the song resource script

This file will handle loading the notes (`.mid` or `.chart`) as well as taking the length of the song and calculating the beat bars.

```gdscript
class_name SongResource

extends Resource

@export var audio_stream: AudioStream
@export var notes_path: String

var _song_data: Song

var song_data: Song:
	get:
		if _song_data == null:
			_load_song()
		return _song_data

func _load_song() -> void:
	_song_data = Song.new()

	if not FileAccess.file_exists(notes_path):
		printerr("Missing notes file!")
		return

	if notes_path.ends_with(".mid"):
		var data := FileAccess.get_file_as_bytes(notes_path)
		_song_data.load_song_from_midi(data)

	elif notes_path.ends_with(".chart"):
		var data := FileAccess.get_file_as_string(notes_path)
		_song_data.load_song_from_chart(data, rhythm_game_utilities.Difficulty.Easy)

	if audio_stream:
		_song_data.recalculate_beat_bars_with_song_length(audio_stream.get_length(), true)
	else:
		printerr("Missing audio file!")
```

## Create the song resource asset

1. Right click in the **FileSystem** panel and select **Create New > Resource**.
1. Find `SongResource` and hit **Create**
1. Give it a name and save it next to your song assets
1. Select the newly created resource assets and drag the `.mp3` file into the **Audio Stream** property.
1. Enter the path of the `.mid` file to the **Notes Path** property. Example: `res://songs/notes.mid`

## Load the song resource into the scene

1. Create a script for loading the newly created resource asset and attach it to a new basic node in the scene.

```gdscript
extends Node

@export var audio_stream_player: AudioStreamPlayer

@export var song: SongResource

func _ready() -> void:
	if song.audio_stream:
		audio_stream_player.stream = song.audio_stream
		audio_stream_player.call_deferred("play")
```

2. Assign the `AudioStreamPlayer` to the **Audio Stream Player** property.
3. Assign the song resource to the **Song** property.

## Render notes

1. Create a script for rendering notes using the Godot `RenderingServer`.

```gdscript
extends Node

@export var note_green_mesh: Mesh
@export var note_red_mesh: Mesh
@export var note_yellow_mesh: Mesh

@export var audio_stream_player: AudioStreamPlayer

@export var song: SongResource

@export var _tick_scale := 5

@export var _distance := 50

var _scenario: RID
var _note_instances: Dictionary[int, RID]

@onready var _hand_position_mapping := {
	0: {"mesh": note_green_mesh, "x": - 2.0},
	1: {"mesh": note_red_mesh, "x": 0.0},
	2: {"mesh": note_yellow_mesh, "x": 2.0}
}

func _ready() -> void:
	_scenario = get_viewport().find_world_3d().scenario

	for note: Variant in song.song_data.notes:
		var id: int = note["id"]
		var hand_position: int = note["hand_position"]

		var instance := RenderingServer.instance_create()

		var mesh: Mesh = _hand_position_mapping[hand_position]["mesh"]

		RenderingServer.instance_set_scenario(instance, _scenario)
		RenderingServer.instance_set_base(instance, mesh)
		RenderingServer.instance_set_visible(instance, false)

		_note_instances[id] = instance

func _process(_delta: float) -> void:
	var tick_offset := rhythm_game_utilities.convert_seconds_to_ticks(
		audio_stream_player.get_playback_position(), song.song_data.resolution,
		song.song_data.tempo_changes
	)

	for note: Variant in song.song_data.notes:
		var id: int = note["id"]
		var position: int = note["position"]
		var hand_position: int = note["hand_position"]

		if not _note_instances.has(id) or not _note_instances[id].is_valid():
			continue

		var current_position := rhythm_game_utilities.convert_tick_to_position(
			position - tick_offset, song.song_data.resolution
		) * _tick_scale

		RenderingServer.instance_set_visible(_note_instances[id],
			current_position > -10 && current_position < _distance
		)

		var x: float = _hand_position_mapping[hand_position]["x"]

		RenderingServer.instance_set_transform(_note_instances[id],
			Transform3D(Basis.IDENTITY, Vector3(x, 0, -current_position))
		)

func _exit_tree() -> void:
	for note_instance: RID in _note_instances.values():
		if note_instance.is_valid():
			RenderingServer.free_rid(note_instance)
	_note_instances.clear()
```

2. Assign the `Note (green).glb` model to the **Note Green Mesh** property.
3. Assign the `Note (red).glb` model to the **Note Red Mesh** property.
4. Assign the `Note (yellow).glb` model to the **Note Yellow Mesh** property.
5. Assign the `AudioStreamPlayer` to the **Audio Stream Player** property.
6. Assign the song resource to the **Song** property.

## Fix the hand position error

When running the game an error will appear: `_ready: Out of bounds get index '65' (on base: 'Dictionary')`. This is because the notes from a MIDI file are loaded in with the hand positions mapped to the channels the notes appear on. To correct this we need to modify the song resource to remap those hand positions.

> ⚠️ **Note:** These channels will vary per MIDI file. Some may even appear in reverse order depending on how the chart was made.

```gdscript
class_name SongResource

extends Resource

@export var audio_stream: AudioStream
@export var notes_path: String

var _song_data: Song

var song_data: Song:
	get:
		if _song_data == null:
			_load_song()
		return _song_data

func _load_song() -> void:
	_song_data = Song.new()

	if not FileAccess.file_exists(notes_path):
		printerr("Missing notes file!")
		return

	if notes_path.ends_with(".mid"):
		var data := FileAccess.get_file_as_bytes(notes_path)
		_song_data.load_song_from_midi(data)

    # Add the following to the `song_resource.gd` resource script

		for note: Variant in _song_data.notes:
			if note["hand_position"] == 65:
				note["hand_position"] = 0
			elif note["hand_position"] == 69:
				note["hand_position"] = 1
			elif note["hand_position"] == 72:
				note["hand_position"] = 2

	elif notes_path.ends_with(".chart"):
		var data := FileAccess.get_file_as_string(notes_path)
		_song_data.load_song_from_chart(data, rhythm_game_utilities.Difficulty.Easy)

	if audio_stream:
		_song_data.recalculate_beat_bars_with_song_length(audio_stream.get_length(), true)
	else:
		printerr("Missing audio file!")
```

## Rendering beat bars

1. Create a script for rendering the beat bars using the Godot `RenderingServer`.

```gdscript
extends Node

@export var beat_bar_mesh: Mesh

@export var audio_stream_player: AudioStreamPlayer

@export var song: SongResource

@export var _tick_scale := 5

@export var _distance := 50

var _scenario: RID
var _beat_bar_instances: Array[RID]

func _ready() -> void:
	_scenario = get_viewport().find_world_3d().scenario

	for i in song.song_data.beat_bars.size():
		var instance := RenderingServer.instance_create()

		var mesh: Mesh = beat_bar_mesh

		RenderingServer.instance_set_scenario(instance, _scenario)
		RenderingServer.instance_set_base(instance, mesh)
		RenderingServer.instance_set_visible(instance, false)

		_beat_bar_instances.append(instance)

func _process(_delta: float) -> void:
	var tick_offset := rhythm_game_utilities.convert_seconds_to_ticks(
		audio_stream_player.get_playback_position(), song.song_data.resolution,
        song.song_data.tempo_changes
	)

	for i in song.song_data.beat_bars.size():
		var position: int = song.song_data.beat_bars[i]["position"]

		if not _beat_bar_instances[i].is_valid():
			continue

		var current_position := rhythm_game_utilities.convert_tick_to_position(
			position - tick_offset, song.song_data.resolution
		) * _tick_scale

		RenderingServer.instance_set_visible(_beat_bar_instances[i],
			current_position > -1 && current_position < _distance
		)

		RenderingServer.instance_set_transform(_beat_bar_instances[i],
			Transform3D(Basis.IDENTITY, Vector3(0, 0, -current_position))
		)

func _exit_tree() -> void:
	for beat_bar_instance in _beat_bar_instances:
		if beat_bar_instance.is_valid():
			RenderingServer.free_rid(beat_bar_instance)
	_beat_bar_instances.clear()
```

2. Assign the `Track Beat Bar.glb` model to the **Beat Bar Mesh** property.
3. Assign the `AudioStreamPlayer` to the **Audio Stream Player** property.
4. Assign the song resource to the **Song** property.

## Handle user input

1. Open **Project > Project Settings** and navigate to the **Input Map** tab.
1. Create a new action named `lane1` and assign `a` and `left arrow` to the action.
1. Create a new action named `lane2` and assign `s` and `up arrow` to the action.
1. Create a new action named `lane3` and assign `d` and `right arrow` to the action.

1. Create a new script for handling user input. This will show the result of the input via the console for now.

```gdscript
extends Node

@export var audio_stream_player: AudioStreamPlayer

@export var song: SongResource

@export var _delta := 50

var _input_mapping := {
	"lane1": 0,
	"lane2": 1,
	"lane3": 2,
}

func _input(_event: InputEvent) -> void:
	if song.song_data.notes.is_empty():
		return

	var tick_offset := rhythm_game_utilities.convert_seconds_to_ticks(
		audio_stream_player.get_playback_position(), song.song_data.resolution,
		song.song_data.tempo_changes
	)

	var found_notes := rhythm_game_utilities.find_notes_near_given_tick(
		song.song_data.notes, tick_offset, _delta
	)

	if found_notes.is_empty():
		return

	for found_note: Variant in found_notes:
		var hand_position: int = found_note["hand_position"]

		var hit := false

		for action: String in _input_mapping:
			if _event.is_action_pressed(action) and hand_position == _input_mapping[action]:
				hit = true
				break

		if not hit:
			print("Miss")
			continue

		print("Hit")
```

## Removing hit notes

To remove notes from being rendered we need to mark them as hit in the array of notes on the song resource.

1. Add the following function to the `song_resource.gd` file:

```gdscript
func mark_note_as_hit(id: int) -> void:
	for note: Variant in _song_data.notes:
		if note["id"] == id:
			note["hit"] = true
			break
```

2. In the `render_notes.gd` file modify the render loop to check for if notes have been hit and hide them if they were:

```gdscript
func _process(_delta: float) -> void:
	var tick_offset := rhythm_game_utilities.convert_seconds_to_ticks(
		audio_stream_player.get_playback_position(), song.song_data.resolution,
		song.song_data.tempo_changes
	)

	for note: Variant in song.song_data.notes:
		var id: int = note["id"]
		var position: int = note["position"]
		var hand_position: int = note["hand_position"]
		# Store a flag showing if the note has been hit
		var hit: bool = "hit" in note

		if not _note_instances.has(id) or not _note_instances[id].is_valid():
			continue

		var current_position := rhythm_game_utilities.convert_tick_to_position(
			position - tick_offset, song.song_data.resolution
		) * _tick_scale

		# Hide note if it's been hit
		RenderingServer.instance_set_visible(_note_instances[id],
			current_position > -10 && current_position < _distance && !hit
		)

		var x: float = _hand_position_mapping[hand_position]["x"]

		RenderingServer.instance_set_transform(_note_instances[id],
			Transform3D(Basis.IDENTITY, Vector3(x, 0, -current_position))
		)
```

3. Then in the `handle_input.gd` file modify the loop to call the `mark_note_as_hit` if the note was hit.

```gdscript
extends Node

@export var audio_stream_player: AudioStreamPlayer

@export var song: SongResource

@export var _delta := 50

var _input_mapping := {
	"lane1": 0,
	"lane2": 1,
	"lane3": 2,
}

func _input(_event: InputEvent) -> void:
	if song.song_data.notes.is_empty():
		return

	var tick_offset := rhythm_game_utilities.convert_seconds_to_ticks(
		audio_stream_player.get_playback_position(), song.song_data.resolution,
		song.song_data.tempo_changes
	)

	var found_notes := rhythm_game_utilities.find_notes_near_given_tick(
		song.song_data.notes, tick_offset, _delta
	)

	if found_notes.is_empty():
		return

	for found_note: Variant in found_notes:
		# Store the note as an int
		var id: int = found_note["id"]
		var hand_position: int = found_note["hand_position"]

		var hit := false

		for action: String in _input_mapping:
			if _event.is_action_pressed(action) and hand_position == _input_mapping[action]:
				hit = true
				break

		if not hit:
			print("Miss")
			continue

		print("Hit")

		# Call the new method to mark the note as hit
		song.mark_note_as_hit(id)
```

## Showing score

1. Add two signals to the `handle_input.gd` file for when a note is hit or missed:

```gdscript
signal note_hit(accuracy: int, accuracy_ratio: float)

signal note_missed
```

2. And then connect them in the input detection logic:

```gdscript
func _input(_event: InputEvent) -> void:
	if song.song_data.notes.is_empty():
		return

	var tick_offset := rhythm_game_utilities.convert_seconds_to_ticks(
		audio_stream_player.get_playback_position(), song.song_data.resolution,
		song.song_data.tempo_changes
	)

	var found_notes := rhythm_game_utilities.find_notes_near_given_tick(
		song.song_data.notes, tick_offset, _delta
	)

	if found_notes.is_empty():
		return

	for found_note: Variant in found_notes:
		var id: int = found_note["id"]
		var hand_position: int = found_note["hand_position"]

		# Store the position as an int for accuracy calculation
		var position: int = found_note["position"]

		var hit := false

		for action: String in _input_mapping:
			if _event.is_action_pressed(action) and hand_position == _input_mapping[action]:
				hit = true
				break

		if not hit:
			# Emit note missed signal
			note_missed.emit()
			continue

		song.mark_note_as_hit(id)

		# Using the position calculate the accuracy and the accuracy ratio to send to the signal
		var accuracy := rhythm_game_utilities.calculate_accuracy(position, tick_offset, _delta)
		var accuracy_ratio := rhythm_game_utilities.calculate_accuracy_ratio(position, tick_offset, _delta)

		# Emit note hit signal
		note_hit.emit(accuracy, accuracy_ratio)
```

3. Create a new script for handling the rendering and updating of the score UI:

```gdscript
extends Node

@export var score_label: Label
@export var multiplier_label: Label
@export var accuracy_label: Label

@export var _score_min_increment := 10
@export var _score_max_increment := 100
@export var _multiplier_increment := 0.25

var _score := 0
var _multiplier := 1.0

var _accuracy_labels := ["Invalid", "Poor", "Fair", "Good", "Great", "Perfect"]

func update_ui(score: int, multiplier: float, accuracy: String) -> void:
	score_label.text = "Score: %d" % score
	multiplier_label.text = "Multiplier: %.2fx" % multiplier
	accuracy_label.text = accuracy
	accuracy_label.visible = not accuracy.is_empty()

func _on_handle_input_note_hit(accuracy: int, accuracy_ratio: float) -> void:
	_score += lerp(_score_min_increment, _score_max_increment, abs(accuracy_ratio)) * floor(_multiplier)
	_multiplier += _multiplier_increment

	var accuracy_label_value: String = _accuracy_labels[accuracy - 1]

	update_ui(_score, _multiplier, accuracy_label_value)

func _on_handle_input_note_missed() -> void:
	_multiplier = max(_multiplier - 1, 1)
	update_ui(_score, _multiplier, "Miss")
```

4. Select the node with the input handling script attached to it and switch to the **Signals** tab in the inspector.
5. Connect `note_hit(accuracy: int, accuracy_ratio: float)` to `_on_handle_input_note_hit(accuracy: int, accuracy_ratio: float)` on the UI update script.
6. Connect `note_missed()` to `_on_handle_input_note_missed()` on the UI update script.
7. Create a new node and attach that UI update script to it.
8. Add UI to the scene with this structure (or similar):
   - Control
     - MarginContainer
       - PanelContainer
         - MarginContainer
           - VBoxContainer
             - Label (Score)
             - Label (Multiplier)
             - Label (Accuracy)
9. Then connect the labels to the UI update script.

<a href="#23" name="23">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-23.jpg" />
</a>

<a href="#24" name="24">
  <img src="/images/talks/how-to-build-a-rhythm-game-in-godot/slide-24.jpg" />
</a>

<script src="/js/slides.js"></script>

### Additional Links

- [Rhythm Game Utilities Godot Example](https://github.com/rhythm-game-utilities/godot-example)
- [Slides from this talk (PDF)](/images/talks/how-to-build-a-rhythm-game-in-godot/How%20to%20Build%20a%20Rhythm%20Game%20in%20Godot.pdf)
- [Rendering Objects in Godot That Don't Exist](/rendering-objects-in-godot-that-dont-exist/) - Blog Post
- [BGW MiniCon 2026 - How to Build a Rhythm Game in (Almost) Every Game Engine](https://www.youtube.com/watch?v=q1GLGHx4TFs) - Video

<script type="module" src="https://cdnjs.cloudflare.com/ajax/libs/model-viewer/4.3.1/model-viewer.min.js"></script>

<!--
magick -density 200 How\ to\ Build\ a\ Rhythm\ Game\ in\ Godot.pdf -quality 100 -crop 100%x100%-0-1 +repage -scene 1 slide.jpg
-->
