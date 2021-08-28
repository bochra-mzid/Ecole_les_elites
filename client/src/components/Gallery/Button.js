import React from 'react'

export default function Button({ name, handleSetEvent }) {
    return (
        <span className="item" onClick={() => handleSetEvent(name)}>{name}</span>
    )
}