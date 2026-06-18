# Inventory Update (JavaScript)

## Overview

This project solves the Inventory Update challenge from FreeCodeCamp's Coding Interview Prep section. The goal is to compare an existing inventory with a new shipment and update the quantities accordingly.

## Rules:

+ Update quantity if the item already exists
+ Add new items if they do not exist
+ Return the final inventory sorted alphabetically

## Technologies
+ JavaScript (ES6)
+ Map
+ Array methods (map, sort)
+ Data transformation
  
##  Problem Example

Current Inventory:
```plaintext
[
  [21, "Bowling Ball"],
  [2, "Dirty Sock"],
  [1, "Hair Pin"],
  [5, "Microphone"]
]
```
Incoming Shipment:
```plaintext
[
  [2, "Hair Pin"],
  [3, "Half-Eaten Apple"],
  [67, "Bowling Ball"],
  [7, "Toothpaste"]
]
```
Expected Result:
```plaintext
[
  [88, "Bowling Ball"],
  [2, "Dirty Sock"],
  [3, "Hair Pin"],
  [3, "Half-Eaten Apple"],
  [5, "Microphone"],
  [7, "Toothpaste"]
]
```
## Solution Approach
1. Convert inventory arrays into Map
2. Use item names as keys
3. Update existing quantities
4. Add new inventory items
5. Convert back to array and sort alphabetically

## Concepts Practiced
+ Working with 2D arrays
+ Efficient lookups with Map
+ Iteration and updates
+ Sorting and data formatting
  
## Learning Outcome

This challenge helped strengthen problem-solving skills and reinforced when using `Map` is more efficient than nested loops.
