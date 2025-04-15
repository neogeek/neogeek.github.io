---
title: Building a Godot Plugin with GDExtension
subtitle: This is a rough outline of a workshop given at GodotCon 2025 in Boston, MA
date: 04/15/2025
draft: true
---

# Building a Godot Plugin with GDExtension

## Setup Repo

> 📝 **Info:** We start with a repo containing at least one file as I've typically run into strange issues adding a submodule to a repo that isn't properly initialized in the past.

1. Create an empty folder, init as a git repo, create a README.md and commit the changes.

## Setup `godot-cpp` Submodule

> 📝 **Info:** We are using `https` instead of `ssh` here to make it easier to build the plugin using GitHub Actions.

> ⚠️ **Notice:** We are building the GDExtension using Godot 4.4 as it's the latest major release. If you want to support older versions of Godot, make sure to use a tag referencing the minimum version of Godot you'd like to support.

1. Run `git submodule add https://github.com/godotengine/godot-cpp.git` in the root of the repo.
1. Go into the `godot-cpp/` directory.
1. Checkout the Godot 4.4 release with `git checkout godot-4.4-stable`.
1. Commit changes.

## Install scons

1. Return to the root of the repo.
1. Install `scons`:
   1. macOS: `brew install scons`
   1. Windows: `python -m pip install --user scons`
1. Create a `SConstruct` file with the following contents:

   ```python
   #!/usr/bin/env python

   SConscript("godot-cpp/SConstruct")

   CacheDir(".scons_cache/")
   ```

1. Create a `.gitignore` file with the following contents:

   ```
   .scons_cache/

   .sconsign.dblite
   ```

1. Run `scons` (this will take a while the first time)

## Setup C++ (Optional)

1. Setup C++ by creating `.clangd` with the following contents:

   ```yaml
   CompileFlags:
     Add:
       - '-std=c++17'
       - '-Iinclude'
       - '-Igodot-cpp/gdextension'
       - '-Igodot-cpp/gen/include'
       - '-Igodot-cpp/include'
   Diagnostics:
     UnusedIncludes: Strict
     ClangTidy:
       Add: [performance-*, modernize-*, readability-*]
       Remove: [readability-identifier-length]
   ```

1. Create an empty `compile_flags.txt` so that the relative paths work in the `.clangd` file
1. Create `.clang-format` with the following contents:

   ```yaml
   AllowShortBlocksOnASingleLine: Never
   BreakBeforeBraces: Allman
   IndentWidth: 4
   PointerAlignment: Right
   TabWidth: 4
   UseTab: Never
   ```

1. Create `.clang-tidy` with the following contents:

   ```yaml
   Checks: 'performance-*,modernize-*,readability-*,-readability-identifier-length'
   CheckOptions:
     UnusedIncludes: Strict
   ```

## Setup Empty Plugin

1. Create `GodotCppPlugin.gdextension` with the following contents:

   ```toml
   [configuration]

   entry_symbol = "godot_cpp_plugin_entry"
   compatibility_minimum = 4.4

   [libraries]

   macos.debug = "res://addons/GodotCppPlugin/libGodotCppPlugin.macos.template_debug.framework"
   macos.release = "res://addons/GodotCppPlugin/libGodotCppPlugin.macos.template_release.framework"
   windows.debug.x86_32 = "res://addons/GodotCppPlugin/libGodotCppPlugin.windows.template_debug.x86_32.dll"
   windows.release.x86_32 = "res://addons/GodotCppPlugin/libGodotCppPlugin.windows.template_release.x86_32.dll"
   windows.debug.x86_64 = "res://addons/GodotCppPlugin/libGodotCppPlugin.windows.template_debug.x86_64.dll"
   windows.release.x86_64 = "res://addons/GodotCppPlugin/libGodotCppPlugin.windows.template_release.x86_64.dll"
   ```

1. Create `include/register_types.hpp` with the following contents:

   ```cpp
   #pragma once

   void initialize_godot_cpp_plugin();
   void uninitialize_godot_cpp_plugin();
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

1. Update the `Scons` file to the following contents:

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

   ```
   .scons_cache/

   .sconsign.dblite

   build/

   include/*.os
   ```

1. Run `scons` again to build the project with the new files.

## Start Building out the Plugin

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

## Test in Godot

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
