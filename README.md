# EDK's Pokédex

## Overview

To build an app that calls on an external API to display a list of Pokédex. This app also opens a modal to view an individual pokémon's picture and stats.

## Key Features

- Load Data from an external source (API)
- View a list of Items
- on user action (e.g., by clicking on a list item), view details for that item

## Built With:

JavaScript

---

## Reflections

This is the beginning of my Pokédex project. I anticipate that I will be able to learn how to adapt this for various different projects as it is about creating the JavaScript and calling an API. Building the API will be an enjoyable activity as well I do now know a lot about Pokémon, so I wouldn't be able to adapt the API for myself. But I already have ideas on how to adapt this for D&D 5e.

### Lesson 1.2

In this assignment, they wanted me to start my `README.md` so that I can start to document my progress. In this assignment, we looked at some of the different variable types, both **primitive** and **complex**.

### Lesson 1.3

I worked on presenting the pokémon I added to my list. I also added a header, picking the pokémon yellow as the banner color, and a common black color for the lettering.
I will be working on ideas for making the project look nicer.

### Lesson 1.5

In this lesson, I worked on adding an IIFE for the pokémon list and some functions in the IIFE for adding a pokémon (`add`) and calling the items from the list (`getAll`).

While working on building a filter for the `add` function, I discovered that I could specify looking for key elements in the `Object.keys` of the given array by using the keyword `in`.

### Lesson 1.6

Going through the assignment, before getting to the task at the bottom, the module asked that we build a list of buttons using the JavaScript code for `appendChild` and `createElement` in our `forEach` loop. It took me a while, but with some good searching and refreshing my knowledge, I was able to sync it correctly. I'm trying to stay in the color scheme of the Pokémon show, but the red from the Pokéball is a sharp color for the background of the list. I will likely change this. I'm considering making the background color the black of the pokéball and the lettering the "white" of the pokéball. I'll come back to this in the next time I work on this list.

As I continued to work on it, I went ahead and formatted the background of the buttons to have a background that matches the black portion of the pokéball and the lettering be the white portion of the pokéball.

Finally, I struggled with the last portion of the assignment, which was to create a function that read details from the process of clicking the buttons for the pokédex. I initially set up the `.addEventListener('click', showDetails(pokemon))` instead of calling the showDetails function within the event listener.

### Lesson 1.11

Drawing a conclusion to the project, I included all the Pokémon from the API (1118). In my coding, I included a `next` and `previous` button to help move between pokémon in that list. Finally, I added a search function.
