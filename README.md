# Cthulhu Character Generator

A super simple module that creates a valid character for Cthulhu the roleplaying game. This allows for quick generation of characters for a randomg group of people. You do not have to go through the hassle of setting everyone up. Just tell the module how many you want and it'll roll till it'll drop and create the set of characters for you. The project was built on top of a joke that we wanted to generate our characters faster from the materials we had at hand and this came about. We drafted it together in few sittings. Nothing too fancy.

Only thing left for you to do as the Game Master is to lead the players through the world of Cthulhu.

Enjoy!

## Running the Cthulhu character generator

    npm install cthulhu-character-generator
    node --harmony node_modules/cthulhu-character-generator

## Anything else?

The whole thing is built on top of EcmaScript 6 features and requires --harmony flag to run on Node.js. Module internally relies heavily on promises.

It was put together based on the information we generally used for manually doing our characters. There are few blind parsers that are used to parse the information we commonly use into a more machine edible format.

## Future improvements?
Yes, quite few - to name a few:

* Write a simple script that puts everything into a mongo database
* Allow easy setup into heroku (database wise)
* Build a proper UI for the project (that'll probably be a separate project and this just generates the characters for the UI)
