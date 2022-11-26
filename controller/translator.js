require('dotenv').config()
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");
const Kuroshiro = require("kuroshiro")
const kuroshiro = new Kuroshiro();

class TranslatorController {
    result = {}
    URL=""
    constructor(text,source,target) {
        this.text = text
        this.source = source
        this.target = target
        this.status
        this.replaceParams()
        console.log(this)
        this.URL = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_CREDENTIAL_KEY}&q=${this.text}&source=${this.source}&target=${this.target}`
    }
    async init() {
        await kuroshiro.init(new KuromojiAnalyzer())
    }

    async reqData() {
        try {
            let req = await fetch(this.URL)
            let json = await req.json()
            if (json.data) return json.data.translations[0].translatedText

            
        } catch (error) {
            throw new Error(error)
            
        }
    }

    async getTranslate() {
        this.result.translate = await this.reqData()
        if(this.source === 'ja') {
            this.result.furigana = await kuroshiro.convert(this.text, {to:"romaji", mode:"furigana"})
            this.result.romanji = await kuroshiro.convert(this.text, {to :'romaji', mode:"spaced"})
        }
        this.result.parsedText = this.text
        console.log(this.result)
        return this.result
    }

    replaceParams() {
        this.text = this.text.replace(/\r|\n/g, "")
    }

}

// (async function (){
//     await kuroshiro.init(new KuromojiAnalyzer())
// })()

module.exports = TranslatorController