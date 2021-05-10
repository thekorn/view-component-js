# view-component-js

This is a work in progress implementation of the [view components](https://viewcomponent.org) idea in Ruby on Rails world maintained and supported by the [github team](https://github.com/github/view_component)
The idea is to have a components based system which can be used server-.side and provide components which are rnedered to pure strings.

## example

please see `examples/helloWorldServer` for a set of sample components with express integration.

## current state

This is in the proof of concept phasis, see TODO below for further things which needs to be evaluated.

## TODO

* components in-memory caching: to prevent reading from filesystem over and over again
* storybook integration
* go through the [api of the rubvy implementation](https://viewcomponent.org/api.html) and check for missing features
* templates:
  * conditional rendering
  * loops
* templates are pure html, and look like vue templates, can those be shared?
* tailwind integration (classes as attributes)
