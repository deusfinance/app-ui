import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector = ({ name = "language" }) => {
    const { i18n } = useTranslation()

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value)
    }

    return (
        <div onChange={changeLanguage}>
            <input type="radio" value="en" name={name} defaultChecked={i18n.language === "en"} /> EN /
            <input type="radio" value="cn" name={name} defaultChecked={i18n.language === "cn"} /> CN
        </div>
    )
}

export default LanguageSelector
