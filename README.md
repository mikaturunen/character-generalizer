# Cthulhu Character Generator

A super simple module that creates a valid character for Cthulhu the roleplaying game. This allows for quick generation of characters for a randomg group of people. You do not have to go through the hassle of setting everyone up. Just tell the module how many you want and it'll roll till it'll drop and create the set of characters for you. The project was built on top of a joke that we wanted to generate our characters faster from the materials we had at hand and this came about. We drafted it together in few sittings. Nothing too fancy.

Only thing left for you to do as the Game Master is to lead the players through the world of Cthulhu.

Enjoy!

## Working with the source code

The sources can be found from the `lib` directory and are written in TypeScript. To compile the sources you need to run

* `npm install`
* `npm install -g gulp`
* `gulp`

and the sources are then compiled.

## Running the Cthulhu character generator

This is mainly a module for generating general Cthulhu compatible characters but can also be used from the command line with the following commands.

    npm install cthulhu-character-generator
    node cthulhu-character.js

## Anything else?

It was put together based on the information we generally used for manually doing our characters. There are few blind parsers that are used to parse the information we commonly use into a more machine edible format.

## Future improvements?

Yes, quite few. This will act as the general character generation module for Cthulhu based application we are working on. The application can be found [here](https://github.com/mikaturunen/cthulhu-generator-application).
