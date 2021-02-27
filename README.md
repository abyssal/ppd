# ppd
`the progressive pronoun directory`
  
A React, MIT-licensed alternative to [Pronoun Island](https://pronoun.is/).

### goals
- React, or at least client-side generation, instead of server load (easy CDN deployments)
- modern web technology
- MIT license, for the good of all
- adding some stuff pronoun island won't implement
  - pronunciation guides
  - comments/tags for pronouns
  - pluralization support
  - customizable example sentence sets
  - history or etymology of pronouns 

### data structure
pronouns are stored at [public/data/db-pronouns.json](public/data/db-pronouns.json), in the following format:  
**format option 1 - implied**
```js
"he": ["he", "him", "his", "his", "himself"]
```
**format option 2 - named**
```js
"she": {
  "subj": "she", // Subject
  "obj": "her", // Object
  "pd": "her", // Possessive-determiner
  "pp": "hers", // Possessive-pronoun
  "rflx": "herself" // Reflexive
}
```
**format option 3 - options**
```js
"they": {
  "subj": "they",
  "obj": "them",
  "pd": "their",
  "pp": "theirs",
  "rflx": [ // if a value has multiple options, break into an array
    {
      "value": "themself",
      "notes": "This is typically used when referring to one person who uses they/them."
    },
    {
      "value": "themselves",
      "notes": "This is typically used when referring to a group, but is also valid for one person."
    }
  ]
}
```

### license
copyright &copy; 2021-present [abyssal](https://github.com/abyssal) and PPD contributors under the MIT License.
