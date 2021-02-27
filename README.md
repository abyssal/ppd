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
"he": ["he", "him", "his", "his", "himself", {/*other data, see format option 2*/}]
```
**format option 2 - named**
```js
"she": {
  "subj": "she", // Subject
  "obj": "her", // Object
  "pd": "her", // Possessive-determiner
  "pp": "hers", // Possessive-pronoun
  "rflx": "herself" // Reflexive,
  "meta": { // any extra notes
    "etymology": "Entered English in the mid-12th century, probably evolving from Old English seo, sio. Attested from the 1530s.",
    "etymologySource": "https://www.etymonline.com/word/she"
  }
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
  ],
  "meta": {/*see format option 2 */}
}
```
### pronoun policy
(to be developed further)   
ppd is the **progressive** pronoun database, so neopronouns and other such topics are allowed. pull requests are welcomed and encouraged! please share your pronouns with us.   
**please tag pronoun database update issues/PRs with `pronouns-update`**!  
as for etymology with neopronouns, any source (internet or print) will do, and an approximate year for the first attestation or usage in a text.

### license
copyright &copy; 2021-present [abyssal](https://github.com/abyssal) and PPD contributors under the MIT License.
