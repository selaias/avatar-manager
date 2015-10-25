avatar-manager
----------------
Manage your own avatar. Select your avatar from the available list (linked accounts). 


Installation
------------
In your Meteor project directory, run:
```shell
$ meteor add selaias:avatar-manager
```

Dependencies
------------

This package is using the following packages

```
utilities:avatar
particle4dev:upload-avatar
```

and utilizes the `customImageProperty` of the `avatar` package. In combination of the `upload-avatar` package
we don't need to expose any fields from the `services` object when having more than one account linked.

So far this is tested with `splendido:accounts-meld` package.
