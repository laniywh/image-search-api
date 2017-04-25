# API: Image Search Abstraction Layer

This is an image search API built for [a freeCodeCamp project](https://www.freecodecamp.com/challenges/image-search-abstraction-layer).

### User stories:

1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
3. I can get a list of the most recently submitted search strings.

## Usage:

Search without offset:

http://enigmatic-depths-58144.herokuapp.com/api/imagesearch/grumpy%20cat

Search with offset:

http://enigmatic-depths-58144.herokuapp.com/api/imagesearch/grumpy%20cat?offset=5

Fetch latest search history (10 records):

http://enigmatic-depths-58144.herokuapp.com/api/latest/imagesearch/
