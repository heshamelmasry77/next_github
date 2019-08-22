import React, { cloneElement } from 'react'
const containerStyle = {
    width: '100vw',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight:20
}
export default ({ children, style, comp = <div /> }) => {
    return (
        cloneElement(comp, {
            style:{...style,...containerStyle},
            children
        })
    )
}