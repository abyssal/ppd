import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

function getStaticPronounInfo(type) {
    var displayName;
    var exampleSentences = [];
    switch (type) {
        case 'subjective':
            displayName = 'Subjective';
            exampleSentences = ['{subjective} {isAre} going to get dressed.']
            break;
        case 'object':
            displayName = 'Object';
            exampleSentences = ['She\'s going to talk to {object}.']
            break;
        case 'possessiveDeterminer':
            displayName = 'Possessive determiner'
            exampleSentences = ['Matt is {possessiveDeterminer} father.']
            break
        case 'possessivePronoun':
            displayName = 'Possessive pronoun'
            exampleSentences = ['That item is {possessivePronoun}.']
            break
        case 'reflexive':
            displayName = 'Reflexive'
            exampleSentences = ['{subjective} worked on {reflexive}.']
            break
    }
    return {
        displayName: displayName,
        exampleSentences: exampleSentences
    }
}

class PronounSet {
    asArray() {
        return [
            this.subjective,
            this.object,
            this.possessiveDeterminer,
            this.possessivePronoun,
            this.reflexive
        ];
    }
}

class Pronoun {
    constructor(data) {
        if (typeof data === 'string') this.types = [
            {
                value: data
            }
        ]
        else if (Array.isArray(data)) {
            this.types = data
        }
        else {
            this.types = [data]
        }
    }
    toString() {
        return this.types[0].value
    }
}

export default function PronounView() {
    let { pronounId } = useParams()
    let [ data, setData ] = useState({})
    let [ valid, setValidState ] = useState(true)
    let [pronoun, setPronoun] = useState({})
    useEffect(() => {
        fetch('data/db-pronouns.json').then(d => d.json()).then(f => {
            var value = f.data[pronounId];
            if (!value) {setValidState(false); return}
            var set = new PronounSet()
            if (Array.isArray(value)) {
                set.subjective = new Pronoun(value[0])
                set.object = new Pronoun(value[1])
                set.possessiveDeterminer = new Pronoun(value[2])
                set.possessivePronoun = new Pronoun(value[3])
                set.reflexive = new Pronoun(value[4])
            } else {
                set.subjective = new Pronoun(value["subj"])
                set.object = new Pronoun(value["obj"])
                set.possessiveDeterminer = new Pronoun(value["pd"])
                set.possessivePronoun = new Pronoun(value["pp"])
                set.reflexive = new Pronoun(value["rflx"])
            }
            setPronoun(set)
        })
    }, [pronounId])
    if (!valid) {
        return (
            <div>
                I don't know that pronoun.
            </div>
        )
    }
    if (pronoun && pronoun.subjective) {
        return (
            <div>
                <div style={{
                    fontSize: 'x-large'
                }}>Hey! I use <strong>{pronoun.subjective.toString()}/{pronoun.object.toString()}</strong> pronouns.</div>
                <div style={{
                    textAlign: 'left'
                }}>
                    <div style={{fontSize: 'large'}}>Here's how to use them.</div>
                    <ul>
                        {Object.entries(pronoun).map(pronounType => {
                            return <li><PronounItem pronoun={pronounType} allPronouns={pronoun}/></li>
                        })}
                    </ul>
                </div>
        </div>
        )
    }
    return <div>Loading..</div>
}

function formatString(sentence, allPronouns, replacements) {
    var formatData = {}
    for (const arr of Object.entries(allPronouns)) {
        formatData[arr[0]] = '<b>' + arr[1].types[0].value + '</b>'
    }
    console.log(replacements);
    for (const replacementKey of Object.keys(replacements)) {
        formatData[replacementKey] = '<b>' + replacements[replacementKey] + '</b>';
    }
    formatData['isAre'] = allPronouns.subjective.types[0].value === 'they' ? 'are' : 'is';
    return sentence.formatUnicorn(formatData)
}

function PronounItem(props) {
    const type = props.pronoun[0]
    const data = props.pronoun[1]
    const allPronouns = props.allPronouns
    const info = getStaticPronounInfo(type)
    return (
        <span>
                    {info.exampleSentences.map(exampleSentence => {
                        return (
                        <li style={{paddingBottom: '50px'}}><span dangerouslySetInnerHTML={{ __html: formatString(exampleSentence, allPronouns, {}) }} />
                          <span style={{color: 'white', backgroundColor: 'grey', padding: '2px', fontWeight: 'bold', marginLeft: '5px'}}>{info.displayName}</span>
                          <ul>
                          {data.types[0].ipa ? <li style={{padding: '5px'}}>
                            Listen: <a target="_blank" rel="noreferrer" href={"http://ipa-reader.xyz/?text=" + data.types[0].ipa}>IPA</a>
                          </li> : <></>}
                              {/*Alternative pronoun types */}
                                {data.types.length > 1 ? 
                                data.types.slice(1).map(alternativeType => {
                                    var object = {}
                                    Object.defineProperty(object, type, {value: alternativeType.value, enumerable: true})
                                    return <li style={{padding: '5px'}}>
                                        <span style={{
                                            backgroundColor: 'grey',
                                            color: 'white',
                                            padding: '2px'
                                        }}>Alternative:</span> <strong>{alternativeType.value}</strong>
                                        <br /><span style={{marginTop: '10px'}}>{alternativeType.notes}</span>
                                    </li>
                                })
                            : <></>}
                          </ul>
                        </li>);
                    }
                    )}
        </span>
    )
}