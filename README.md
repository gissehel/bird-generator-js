Bird Avatar Generator
=====================

(javascript version - All credits for idea and resources to [David Revoy](http://www.peppercarrot.com) and its [Bird Avatar Generator](https://www.peppercarrot.com/extras/html/2019_bird-generator/)).

A generator of bird pictures optimized to generate either random avatars, 
or defined avatar from a "seed". 
A derivation, from another derivation by [David Revoy](http://www.peppercarrot.com) 
from the original [MonsterID by Andreas Gohr's](https://www.splitbrain.org/blog/2007-01/20_monsterid_as_gravatar_fallback).

The goal of this implementation is to have a server-less implementation of the generator, because you just don't need one.

## To use it

  * Just use the avatar.js script and img folder
  * Call `avatarGenerator(avatar, name)` with `avatar` being either a canvas that will be drawn into, or anything and a canvas will be dropped into it (`appendChild`). `name` beeing a string to seed the avatar. If you want random, you can something like `${Math.random()}`.

## License

**Artworks:**
PNG and ORA files licensed under: [CC-By 4.0](https://creativecommons.org/licenses/by/4.0/) 
attribution: David Revoy with the following exception: Generated pictures used as Avatar 
(for blog,forum,social-network) don't need direct attribution and so, can be used as regular
avatars without pasting David Revoy's name all over the place. (thank you)

**Code**
The javascript is licensed under the short and simple permissive:
[MIT License](https://en.wikipedia.org/wiki/MIT_License)

md5 code is based on https://github.com/blueimp/JavaScript-MD5 under [MIT License](https://en.wikipedia.org/wiki/MIT_License)
 
## How to edit artworks

  1. Download source on [Bird Avatar Generator](https://www.peppercarrot.com/extras/html/2019_bird-generator/)
  2. Follow README.txt

## References

  * Github repository for this project : https://github.com/gissehel/bird-generator-js/
  * Github pages for this project : https://gissehel.github.io/bird-generator-js/
  * David Revoy's blog post : https://www.davidrevoy.com/article720/bird-avatar-generator
  * PHP original Bird Generator : https://www.peppercarrot.com/extras/html/2019_bird-generator/
