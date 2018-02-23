<!--Restful Routes-->
===================================================================================================
name        url                                 verb            desc
===================================================================================================
INDEX       /dogs                               GET             Display a lost of all dogs
NEW         /dogs/new                           GET             Displays form to amke a new dog
CREATE      /dogs                               POST            Add new dog to DB
SHOW        /dogs/:id                           GET             Shows info about one dog
====================================================================================================

INDEX       /campground
NEW         /campgrounds/new
CREATE      /campgrounds
SHOW        /camgrounds/:id

NEW         /campgrounds/:id/comments/new       Get
CREATE      /campgrounds/:id/comments           Post