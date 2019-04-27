---
layout: post
title: "Unity Best Practices"
emoji: 📝
color: "#C5F0D7"
permalink: /unity-best-practices/
description: "Everyone has their own set of standards when programming. These are the best practices/standards I follow while programming in Unity."
---

Everyone has their own set of standards when programming. These are the best practices/standards I follow while programming in Unity.

> **Note:** I only have 2+ years of experience. These standards could be way off base and something I won't be doing in a few months to a year.

## Code Formatting

### Don’t omit `gameObject` when referencing the current game object.

This makes scanning code easier, especially when referencing components in multiple game objects.

#### Before

```csharp
private void OnCollisionEnter(Collision other)
{
    var rigidBody = GetComponent<Rigidbody>();
    var otherRigidBody = other.gameObject.GetComponent<Rigidbody>();
}
```

#### After

```csharp
private void OnCollisionEnter(Collision other)
{
    var rigidBody = gameObject.GetComponent<Rigidbody>();
    var otherRigidBody = other.gameObject.GetComponent<Rigidbody>();
}
```

### Alway specify `private` if a property or method is not public.

This also makes scanning code easier, especially in large class files.

#### Before

```csharp
public bool isGrounded = false;

Rigidbody _rigidbody;

void Awake()
{
    _rigidbody = gameObject.GetComponent<Rigidbody>();
}

void Start()
{

}

public void Jump()
{

}
```

#### After

```csharp
public bool isGrounded = false;

private Rigidbody _rigidbody;

private void Awake()
{
    _rigidbody = gameObject.GetComponent<Rigidbody>();
}

private void Start()
{

}

public void Jump()
{

}
```

### Setup references in `Awake` and require them with `RequireComponent`

This helps keep maintaining references in all of your components consistent.

```csharp
[RequireComponent(typeof(Rigidbody))]
public class SampleController : MonoBehaviour
{
    private Rigidbody _rigidbody;

    private void Awake()
    {
        _rigidbody = gameObject.GetComponent<Rigidbody>();
    }
}
```

### Setup events in `OnEnable` and remove them in `OnDisable`

```csharp
public class Logger : MonoBehaviour
{

    private void OnEnable()
    {

        Application.logMessageReceived += HandleLog;

    }

    private void OnDisable()
    {

        Application.logMessageReceived -= HandleLog;

    }

    private void HandleLog(string logString, string stackTrace, LogType type)
    {

    }

}
```

## General

### Use a code formatter

## Maintainibility

### Never use singletons

### Follow at least the S in SOLID principles

### Use static methods for complex logic and write tests for them
