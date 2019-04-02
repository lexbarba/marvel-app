"use strict"

import React, {useState, useEffect} from "react"
import logic from "../Logic"
import PaintCharacter from "../PaintCharacter"

export default function CharacterInfoResult ( {id, onComicSelected, moreInfo, seeComics, comics} ) {

    const [character, setCharacter] = useState(null)
    const [feedback, setFeedback] = useState(null)
    const [isFav, setIsFav] = useState(null)

    useEffect(()=>{
        handleCharacterSelected(id)
    },[id])

    const handleCharacterSelected = id => {
        try {
        logic.retrieveCharacter(id)
            .then(character => {setCharacter(character.results[0]); setFeedback(null) })
            .then(() => {
            return logic.retrieveFavourites().then(favs => {
                let result = favs.some( obj => obj.id === character.id)
                if (result) setIsFav(true)
                else setIsFav(false)
                })
            })
            .catch(({ message }) => {setCharacter(null); setFeedback(message)})
        } catch ({ message }) {
            {setCharacter(null); setFeedback(message) }
        }
    }

    const handleFavourite = data => {
        try {
        logic.updateFavourites(data).then(favs => {
            let result = favs.some(obj => obj.id === this.state.character.id)
            if (result) setIsFav(true)
            else setIsFav(false)
            })
        } catch ({ message }) {
            {setCharacter(null); setFeedback(message) }
        }
    }

    return (
      <PaintCharacter results={character} feedback={feedback} onItemClick={onComicSelected} handleFavourite={handleFavourite} isFav={isFav} seeComics={seeComics} moreInfo={moreInfo} comics={comics}/>
    )
}
