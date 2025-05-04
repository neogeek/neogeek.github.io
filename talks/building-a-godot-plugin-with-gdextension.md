---
title: Building a Godot Plugin with GDExtension
subtitle: The outline of a workshop given at GodotCon 2025 in Boston, MA
date: 05/05/2025
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
</style>

<div class="instructions">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/key_left.svg" />
  <p>Use the left and right arrow keys to navigate the slides</p>
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/key_right.svg" />
</div>

<a href="#1" name="1">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-1.jpg" />
</a>

<a href="#2" name="2">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-2.jpg" />
</a>

<a href="#3" name="3">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-3.jpg" />
</a>

<a href="#4" name="4">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-4.jpg" />
</a>

<a href="#5" name="5">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-5.jpg" />
</a>

<a href="#6" name="6">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-6.jpg" />
</a>

<a href="#7" name="7">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-7.jpg" />
</a>

1. Install [git](https://git-scm.com/)

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "youremail@yourdomain.com"
   ```

1. Install [brew](https://brew.sh/)

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

1. Install python

   ```bash
   brew install python
   ```

1. Install scons

   ```bash
   python -m pip install scons
   ```

1. Install VSCode (or other text editor)
   1. Install `clangd` Extension

<a href="#8" name="8">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-8.jpg" />
</a>

1. Install [git](https://git-scm.com/)

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "youremail@yourdomain.com"
   ```

1. Install [Visual Studio](https://visualstudio.microsoft.com/vs/community/) (with Desktop development with C++)
1. Install [python](http://python.org/) (and make sure to check off add to env variable)
1. Install scons

   ```bash
   python -m pip install scons
   ```

1. Install VSCode (or other text editor)
   1. Install `clangd` Extension

<a href="#9" name="9">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-9.jpg" />
</a>

1. Install git `sudo apt install git`

   ```bash
   sudo apt install git
   ```

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "youremail@yourdomain.com"
   ```

1. Install python and scons

   ```bash
   sudo apt install python3 scons
   ```

1. Install vim `sudo apt install vim`

   ```bash
   sudo apt install vim
   ```

> Note: If you are running Linux in a VM like me your might need to add this to your `project.godot` file.

```yaml
[rendering]

renderer/rendering_method="gl_compatibility"
renderer/rendering_method.mobile="gl_compatibility"
```

<a href="#10" name="10">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-10.jpg" />
</a>

<a href="#11" name="11">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-11.jpg" />
</a>

1. Add the `godotengine/godot-cpp` repo as a submodule with:

   ```bash
   git submodule add https://github.com/godotengine/godot-cpp.git
   ```

1. Go into the `godot-cpp/` directory.
1. Checkout the Godot `4.3` release with:

   ```bash
   git checkout godot-4.3-stable
   ```

1. Commit changes.

<a href="#12" name="12">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-12.jpg" />
</a>

1. Create `SConstruct` in the root of the project

   ```python
   #!/usr/bin/env python

   SConscript("godot-cpp/SConstruct")

   CacheDir(".scons_cache/")
   ```

1. Create `.gitignore` file

   ```text
   .scons_cache/

   .sconsign.dblite
   ```

1. Run scons in the root of your project:

   ```bash
   scons
   ```

<a href="#13" name="13">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-13.jpg" />
</a>

1. Create `compile_flags.txt` with the following contents:

   ```txt
   -std=c++17
   -Iinclude
   -Igodot-cpp/gdextension
   -Igodot-cpp/gen/include
   -Igodot-cpp/include
   ```

1. Create `GodotCppPlugin.gdextension` with the following contents:

   ```toml
   [configuration]

   entry_symbol = "godot_cpp_plugin_entry"
   compatibility_minimum = 4.3
   reloadable = true

   [libraries]

   macos.debug = "res://addons/GodotCppPlugin/libGodotCppPlugin.macos.template_debug.framework"
   macos.release = "res://addons/GodotCppPlugin/libGodotCppPlugin.macos.template_release.framework"
   linux.debug.x86_64 = "res://addons/GodotCppPlugin/libGodotCppPlugin.linux.template_debug.x86_64.so"
   linux.release.x86_64 = "res://addons/GodotCppPlugin/libGodotCppPlugin.linux.template_release.x86_64.so"
   windows.debug.x86_32 = "res://addons/GodotCppPlugin/libGodotCppPlugin.windows.template_debug.x86_32.dll"
   windows.release.x86_32 = "res://addons/GodotCppPlugin/libGodotCppPlugin.windows.template_release.x86_32.dll"
   windows.debug.x86_64 = "res://addons/GodotCppPlugin/libGodotCppPlugin.windows.template_debug.x86_64.dll"
   windows.release.x86_64 = "res://addons/GodotCppPlugin/libGodotCppPlugin.windows.template_release.x86_64.dll"
   ```

1. Create `include/register_types.hpp` with the following contents:

   ```cpp
   #include <godot_cpp/core/class_db.hpp>

   using namespace godot;

   void initialize_godot_cpp_plugin(ModuleInitializationLevel p_level);
   void uninitialize_godot_cpp_plugin(ModuleInitializationLevel p_level);
   ```

1. Create `include/register_types.cpp` with the following contents:

   ```cpp
   #include "register_types.hpp"

   #include <gdextension_interface.h>
   #include <godot_cpp/core/class_db.hpp>
   #include <godot_cpp/core/defs.hpp>
   #include <godot_cpp/godot.hpp>

   using namespace godot;

   void initialize_godot_cpp_plugin(ModuleInitializationLevel p_level)
   {
       if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE)
       {
           return;
       }
   }

   void uninitialize_godot_cpp_plugin(ModuleInitializationLevel p_level)
   {
       if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE)
       {
           return;
       }
   }

   extern "C"
   {
       auto GDE_EXPORT godot_cpp_plugin_entry(
           GDExtensionInterfaceGetProcAddress p_get_proc_address,
           const GDExtensionClassLibraryPtr p_library,
           GDExtensionInitialization *r_initialization) -> GDExtensionBool
       {
           godot::GDExtensionBinding::InitObject init_obj(
               p_get_proc_address, p_library, r_initialization);

           init_obj.register_initializer(initialize_godot_cpp_plugin);
           init_obj.register_terminator(uninitialize_godot_cpp_plugin);

           init_obj.set_minimum_library_initialization_level(
               MODULE_INITIALIZATION_LEVEL_SCENE);

           return init_obj.init();
       }
   }
   ```

1. Update the `SConstruct` file to the following contents:

   ```python
   #!/usr/bin/env python

   env = SConscript("godot-cpp/SConstruct")

   env.Append(CPPPATH=["include/"])

   sources = Glob("include/*.cpp")

   folder = "build/addons/GodotCppPlugin"

   if env["platform"] == "macos":
       file_name = "libGodotCppPlugin.{}.{}".format(env["platform"], env["target"])

       library = env.SharedLibrary(
           "{}/{}.framework/{}".format(folder, file_name, file_name),
           source=sources
       )
   else:
       library = env.SharedLibrary(
           "{}/libGodotCppPlugin{}{}"
               .format(folder, env["suffix"], env["SHLIBSUFFIX"]),
           source=sources,
       )

   gdextension_copy = env.Command(
       target="{}/GodotCppPlugin.gdextension".format(folder),
       source="GodotCppPlugin.gdextension",
       action=Copy("$TARGET", "$SOURCE")
   )

   env.Depends(gdextension_copy, library)

   CacheDir(".scons_cache/")

   Default(library)

   Default(gdextension_copy)
   ```

1. Update the `.gitignore` file to the following contents:

   ```text
   .scons_cache/

   .sconsign.dblite

   build/

   include/*.os
   ```

1. Run `scons` again to build the project with the new files.

   ```bash
   scons
   ```

<a href="#14" name="14">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-14.jpg" />
</a>

1. Create `include/mathf.hpp` with the following contents:

   ```cpp
   #pragma once

   #include <algorithm>

   namespace Mathf
   {

   auto lerp(float a, float b, float t) -> float { return (a + t) * (b - a); }

   auto inverse_lerp(float a, float b, float v) -> float
   {
       return std::clamp((v - a) / (b - a), 0.0F, 1.0F);
   }

   } // namespace Mathf
   ```

1. Create `include/godot_cpp_plugin.hpp` with the following contents:

   ```cpp
   #pragma once

   #include <godot_cpp/classes/object.hpp>
   #include <godot_cpp/core/class_db.hpp>
   #include <godot_cpp/variant/string.hpp>

   using namespace godot;

   class godot_cpp_plugin : public Object
   {
       GDCLASS(godot_cpp_plugin, Object)

     protected:
       static void _bind_methods();

     public:
       static float lerp(float a, float b, float t);

       static float inverse_lerp(float a, float b, float v);
   };
   ```

1. Create `include/godot_cpp_plugin.cpp` with the following contents:

   ```cpp
   #include "godot_cpp_plugin.hpp"

   #include "mathf.hpp"

   void godot_cpp_plugin::_bind_methods()
   {
       ClassDB::bind_static_method("godot_cpp_plugin",
                                   D_METHOD("lerp", "a", "b", "t"),
                                   &godot_cpp_plugin::lerp);

       ClassDB::bind_static_method("godot_cpp_plugin",
                                   D_METHOD("inverse_lerp", "a", "b", "v"),
                                   &godot_cpp_plugin::inverse_lerp);
   }

   float godot_cpp_plugin::lerp(float a, float b, float t)
   {
       return Mathf::lerp(a, b, t);
   }

   float godot_cpp_plugin::inverse_lerp(float a, float b, float v)
   {
       return Mathf::inverse_lerp(a, b, v);
   }
   ```

1. Update the `initialize_godot_cpp_plugin` method in `include/register_types.cpp` with the following contents:

   ```cpp
   #include "godot_cpp_plugin.hpp"

   void initialize_godot_cpp_plugin(ModuleInitializationLevel p_level)
   {
       if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE)
       {
           return;
       }

       GDREGISTER_VIRTUAL_CLASS(godot_cpp_plugin);
   }
   ```

1. Run `scons` again to rebuild the plugin with the new changes.
1. Create a new Godot project
1. Copy the contents of the build folder into the root of the project
1. Create an empty Node
1. Attach a script with the following contents:

   ```gdscript
   extends Node

   func _ready() -> void:
       var value = godot_cpp_plugin.lerp(0, 10, 0.5)

       print(value) # 5.0
   ```

<a href="#15" name="15">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-15.jpg" />
</a>

1. First, create a GDScript script in Godot extending the Sprite2D node:

   ```gdscript
   extends Sprite2D

   @export var speed: int = 200;

   var screen_size: Vector2
   var sprite_size: Vector2

   var x_direction: int = 1
   var y_direction: int = 1

   func _ready():
     screen_size = get_viewport_rect().size
     sprite_size = get_rect().size

   func _process(delta):
     var min_x = -(screen_size.x / 2) + (sprite_size.x / 2)
     var min_y = -(screen_size.y / 2) + (sprite_size.y / 2)

     var max_x = (screen_size.x / 2) - (sprite_size.x / 2)
     var max_y = (screen_size.y / 2) - (sprite_size.y / 2)

     position.x += speed * x_direction * delta
     position.y += speed * y_direction * delta

     if position.x > max_x || position.x < min_x:
       x_direction = -x_direction

     if position.y > max_y || position.y < min_y:
       y_direction = -y_direction

     position.x = clamp(position.x, min_x, max_x)
     position.y = clamp(position.y, min_y, max_y)
   ```

1. Next, create a matching header file (`include/screensaver.hpp`) and source file (`include/screensaver.cpp`) in your plugin repo:

   ```cpp
   #pragma once

   #include <godot_cpp/classes/sprite2d.hpp>
   #include <godot_cpp/variant/vector2.hpp>

   namespace godot
   {

   class Screensaver : public Sprite2D
   {
       GDCLASS(Screensaver, Sprite2D)

     private:
       int speed = 200;

       Vector2 screen_size;
       Vector2 sprite_size;

       int x_direction = 1;
       int y_direction = 1;

     protected:
       static void _bind_methods();

     public:
       void _ready() override;
       void _process(double delta) override;
   };

   } // namespace godot
   ```

   ```cpp
   #include "screensaver.hpp"

   #include <algorithm>

   #include <godot_cpp/core/class_db.hpp>

   using namespace godot;

   void Screensaver::_bind_methods() {}

   void Screensaver::_ready()
   {
       screen_size = get_viewport_rect().size;
       sprite_size = get_rect().size;
   }

   void Screensaver::_process(double delta)
   {
       auto min_x = -(screen_size.x / 2) + (sprite_size.x / 2);
       auto min_y = -(screen_size.y / 2) + (sprite_size.y / 2);

       auto max_x = (screen_size.x / 2) - (sprite_size.x / 2);
       auto max_y = (screen_size.y / 2) - (sprite_size.y / 2);

       auto position = get_position();

       position.x += speed * x_direction * delta;
       position.y += speed * y_direction * delta;

       if (position.x > max_x || position.x < min_x)
       {
           x_direction = -x_direction;
       }

       if (position.y > max_y || position.y < min_y)
       {
           y_direction = -y_direction;
       }

       position.x = std::clamp(position.x, min_x, max_x);
       position.y = std::clamp(position.y, min_y, max_y);

       set_position(position);
   }
   ```

1. Finally, we let the plugin know that this new node exists by adding it to the `include/register_types.cpp` file:

   ```cpp
   #include "screensaver.hpp"

   void initialize_godot_cpp_plugin(ModuleInitializationLevel p_level)
   {
       if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE)
       {
           return;
       }

       GDREGISTER_VIRTUAL_CLASS(godot_cpp_plugin);
       GDREGISTER_RUNTIME_CLASS(Screensaver);
   }
   ```

<a href="#16" name="16">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-16.jpg" />
</a>

**screensaver.gd**

```gdscript
@export var speed: int = 200;
```

**include/screensaver.hpp**

```cpp
class Screensaver : public Sprite2D
{
    GDCLASS(Screensaver, Sprite2D)

  private:
    int speed = 200;

    void set_speed(const int value);
    int get_speed();
```

**include/screensaver.cpp**

```cpp
void Screensaver::_bind_methods()
{
    ClassDB::bind_method(D_METHOD("set_speed", "speed"),
                         &Screensaver::set_speed);
    ClassDB::bind_method(D_METHOD("get_speed"), &Screensaver::get_speed);

    ADD_PROPERTY(PropertyInfo(Variant::INT, "speed"), "set_speed", "get_speed");
}

void Screensaver::set_speed(const int value) { speed = value; }

int Screensaver::get_speed() { return speed; }
```

<a href="#17" name="17">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-17.jpg" />
</a>

1. Next we a going to add a callback signal to our screensaver for when the Sprite2d bounces off a wall.

   ```cpp
   void Screensaver::_bind_methods()
   {
       // ...

       ADD_SIGNAL(MethodInfo("wall_bounce"));
   }
   ```

   ```cpp
   void Screensaver::_process(double delta)
   {
       // ...

       if (position.x > max_x || position.x < min_x)
       {
           x_direction = -x_direction;

           emit_signal("wall_bounce");
       }

       if (position.y > max_y || position.y < min_y)
       {
           y_direction = -y_direction;

           emit_signal("wall_bounce");
       }

       // ...
   }
   ```

1. Go back to Godot, select the Screensaver, click on Node in the inspector panel, then select `wall_bounce`, right-click and select **Connect...**. Select the first node we created and press the **Connect** button.
1. In the newly created method, add a `print` statement for testing.

<a href="#18" name="18">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-18.jpg" />
</a>

So far we have worked with primatives, but what if we wanted to send an array of values from godot to our plugin and run a calculation.

Lets start with sending an array of integers to a method to add the values together.

1. First start with adding the following to `include/mathf.hpp`:

   ```cpp
   #include <godot_cpp/classes/object.hpp>
   #include <godot_cpp/variant/array.hpp>

   using namespace godot;

   auto sum(Array values) -> int
   {
       auto count = 0;

       for (auto i = 0; i < values.size(); i += 1)
       {
           if (values[i].get_type() == Variant::INT)
           {
               int variant = values[i];

               count += variant;
           }
       }

       return count;
   }
   ```

1. Add the following to `include/godot_cpp_plugin.hpp`

   ```cpp
   static int sum(const Array &values);
   ```

1. And then add the following to `include/godot_cpp_plugin.cpp`

   ```cpp
   void godot_cpp_plugin::_bind_methods()
   {
       ClassDB::bind_static_method("godot_cpp_plugin", D_METHOD("sum", "values"),
                                   &godot_cpp_plugin::sum);
   }

   int godot_cpp_plugin::sum(const Array &values) { return Mathf::sum(values); }
   ```

1. And then use it in Godot with the following:

   ```gdscript
   var sum = godot_cpp_plugin.sum([1, 2, 3, 4, 5])

   print(sum)
   ```

We can also take a dictionary of values and return a subset of the values based on a key.

1. Create a new file `include/convert.hpp`

   ```cpp
   #pragma once

   #include <string>
   #include <vector>

   #include <godot_cpp/classes/object.hpp>
   #include <godot_cpp/variant/array.hpp>

   using namespace godot;

   namespace Convert
   {

   auto get_key_values(Array values, const String &key) -> Array
   {
       std::vector<std::string> urls;

       for (auto i = 0; i < values.size(); i += 1)
       {
           if (values[i].get_type() == Variant::DICTIONARY)
           {
               Dictionary variant = values[i];

               Array keys = variant.keys();

               if (keys.has(key))
               {
                   String url = variant[key];

                   urls.push_back(url.utf8().get_data());
               }
           }
       }

       Array godot_urls;

       for (auto const &url : urls)
       {
           godot_urls.append(url.c_str());
       }

       return godot_urls;
   }

   } // namespace Convert
   ```

1. Add the following to `include/godot_cpp_plugin.hpp`

   ```cpp
   #include <godot_cpp/variant/array.hpp>

   static Array get_key_values(const Array &values, const String &key);
   ```

1. And then add the following to `include/godot_cpp_plugin.cpp`

   ```cpp
   #include "convert.hpp"

   void godot_cpp_plugin::_bind_methods()
   {
       ClassDB::bind_static_method("godot_cpp_plugin",
                                   D_METHOD("get_key_values", "values", "key"),
                                   &godot_cpp_plugin::get_key_values);
   }

   Array godot_cpp_plugin::get_key_values(const Array &values, const String &key)
   {
       return Convert::get_key_values(values, key);
   }
   ```

1. And then use it in Godot with the following:

   ```gdscript
   var urls = godot_cpp_plugin.get_key_values([{"name": "Google", "url":"http://google.com"}], "url")

   print(urls)
   ```

<a href="#19" name="19">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-19.jpg" />
</a>

1. Create `.github/workflows/build.workflow.yml` in your repo and push the changes. Go to the Actions tab and find the `Build Godot Plugin` item in the sidebar. Click **Run Workflow**. This can take up to a half hour the first time, and 3 - 5 minutes on subsequent builds.

   ```yaml
   name: Build Godot Plugin

   on:
     workflow_dispatch:

   concurrency:
     group: ${{ github.workflow }}-${{ github.ref }}
     cancel-in-progress: true

   jobs:
     build-plugin:
       strategy:
         matrix:
           include:
             - os: ubuntu-latest
               platform: linux
               arch: x86_64
             - os: macos-latest
               platform: macos
               arch: universal
             - os: windows-latest
               platform: windows
               arch: x86_64

       runs-on: ${{ matrix.os }}

       steps:
         - name: Check out repository
           uses: actions/checkout@v4.2.2
           with:
             fetch-depth: 0

         - name: Check out submodules
           run: |
             git submodule update --init

         - if: matrix.platform == 'linux'
           name: Install dependencies (Linux)
           run: |
             sudo apt-get update
             sudo apt-get install -y build-essential scons pkg-config libx11-dev \
               libxcursor-dev libxinerama-dev libgl1-mesa-dev libglu1-mesa-dev \
               libasound2-dev libpulse-dev libudev-dev libxi-dev libxrandr-dev \
               libwayland-dev

         - if: matrix.platform == 'macos'
           name: Install dependencies (macOS)
           run: |
             brew install scons

         - if: matrix.platform == 'windows'
           name: Install dependencies (Windows)
           run: |
             python -m pip install scons
             choco install mingw

         - name: Restore SCons Cache
           uses: actions/cache/restore@v4.2.3
           with:
             path: |
               .scons_cache/
               .sconsign.dblite
             key: ${{ matrix.os }}-scons-cache

         - name: Restore Godot C++ Generated Files
           uses: actions/cache/restore@v4.2.3
           with:
             path: |
               godot-cpp/bin/
               godot-cpp/gen/
             key: ${{ matrix.os }}-godot-cpp-cache

         - name: Build Plugin
           shell: bash
           run: |
             scons platform=${{ matrix.platform }} target=template_release arch=${{ matrix.arch }}
             scons platform=${{ matrix.platform }} target=template_debug arch=${{ matrix.arch }}

         - name: Store SCons Cache
           uses: actions/cache/save@v4.2.3
           with:
             path: |
               .scons_cache/
               .sconsign.dblite
             key: ${{ matrix.os }}-scons-cache

         - name: Store Godot C++ Generated Files
           uses: actions/cache/save@v4.2.3
           with:
             path: |
               godot-cpp/bin/
               godot-cpp/gen/
             key: ${{ matrix.os }}-godot-cpp-cache

         - name: Upload build artifacts
           uses: actions/upload-artifact@v4.6.2
           with:
             name: build-${{ matrix.platform }}-${{ matrix.arch }}
             path: build/
             retention-days: 1

     commit-changes:
       needs: build-plugin
       runs-on: ubuntu-latest

       permissions:
         contents: write

       steps:
         - name: Check out repository
           uses: actions/checkout@v4.2.2
           with:
             fetch-depth: 0

         - name: Download all build artifacts
           uses: actions/download-artifact@v4.2.1
           with:
             path: artifacts/

         - name: Move artifacts to build directory
           run: |
             mkdir -p build/
             cp -r artifacts/*/* build/

         - name: Setup git
           run: |
             git config user.name 'github-actions[bot]'
             git config user.email 'github-actions[bot]@users.noreply.github.com'

         - name: Git commit changes
           run: |
             git pull
             git add build/
             git commit -m "Updated build files [skip ci]" || exit 0
             git push
   ```

<a href="#20" name="20">
  <img src="/images/talks/building-a-godot-plugin-with-gdextension/slide-20.jpg" />
</a>

### Additional Links

- [Official Godot GDExtensions Documentation](https://docs.godotengine.org/en/stable/tutorials/scripting/gdextension/what_is_gdextension.html)
- [Official Godot GDExtensions Template Repo](https://github.com/godotengine/godot-cpp-template)
- [Wallpapers used during this talk](/talks/godotcon-boston-2025)

<script>
(() => {
  const parseNumberFromHash = (value) => {
    console.log({ value });
    try {
      return parseInt(value.replace('#', ''));
    } catch {
      return 0;
    }
  };

  const slides = Array.from(document.querySelectorAll('a[href^="#"][name]'));

  const firstSlide = slides[0];
  const lastSlide = slides[slides.length - 1];

  const minSlides = parseNumberFromHash(firstSlide.getAttribute('href'));
  const maxSlides = parseNumberFromHash(lastSlide.getAttribute('href'));

  let currentSlide = location.hash ? parseNumberFromHash(location.hash) : 0;

  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      currentSlide = Math.max(currentSlide - 1, minSlides);
      location.hash = currentSlide;
    } else if (e.key === 'ArrowRight') {
      currentSlide = Math.min(currentSlide + 1, maxSlides);
      location.hash = currentSlide;
    }
  });

  window.addEventListener('hashchange', (e) => {
    currentSlide = parseNumberFromHash(location.hash);
  });

  slides.map((slide) => {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSlide = parseNumberFromHash(
              entry.target.getAttribute('href')
            );

            history.replaceState(
              null,
              '',
              `${window.location.pathname}#${currentSlide}`
            );
          }
        });
      },
      {
        threshold: 1,
      }
    ).observe(slide);
  });
})();
</script>

<!--
magick -density 200 Building\ a\ Godot\ Plugin\ with\ GDExtension.pdf -quality 100 -crop 100%x100%-0-1 +repage -scene 1 slide.jpg
-->
