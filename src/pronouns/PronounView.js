import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
        else this.types = data
    }
    toString() {
        return this.types[0].value
    }
}

export default function PronounView() {
    let { pronounId } = useParams()
    let [ data, setData ] = useState({})
    let [pronoun, setPronoun] = useState({})
    useEffect(() => {
        fetch('data/db-pronouns.json').then(d => d.json()).then(f => {
            var value = f.data[pronounId];
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
    }, [])
    if (pronoun && pronoun.subjective) {
        return (
            <div>
                <div style={{
                    fontSize: 'x-large'
                }}>Hey! I use <strong>{pronoun.subjective.toString()}/{pronoun.object.toString()}</strong> pronouns, and here's how to use them.</div>
                <div>
                    <ul>
                        {Object.entries(pronoun).map(pronounType => {
                            return <div>{pronounType[0]}: {pronounType[1].toString()}</div>
                        })}
                    </ul>
                </div>
        </div>
        )
    }
    return <div>Loading..</div>
}