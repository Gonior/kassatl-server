require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { ocrSpace } = require('ocr-space-api-wrapper');

const app = express()
const TranslatorController = require('./controller/translator')

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json({limit : '10mb'}))
app.use(express.urlencoded({extended : true}))

app.post('/upload', async (req, res) => {

    let {image, source, target} = req.body
    let respons = await ocrSpace(image, { apiKey: process.env.KEY_OCR_SPACE, language: source === "ja" ? 'jpn' : "eng" });
    if (respons.OCRExitCode === 1 || respons.OCRExitCode === 2) {
        let texts = respons.ParsedResults.length === 1 ? {...respons.ParsedResults[0]} : {}
        
        if (texts) {
            if (texts.ParsedText) {
                let translator = new TranslatorController(texts.ParsedText,source,target) 
                // await translator.init()
                let result = await translator.getTranslate()
                if (result.translate) res.json(result)
                else return res.status(500).json({message : "something went wrong"})
            } else return res.status(500).json({message : "Teks bahasa Jepang Tidak Terdeteksi"})
        } else {
            return res.status(500).json({message : 'Something wrong', error : JSON.stringify(respons)})
        }

    } else {
        console.log(respons)
        return res.status(500).json({message : 'Something wrong', error : JSON.stringify(respons)})
    }
})

app.post('/test', async (req, res) => {
    let text = req.body.text
    let translator = new TranslatorController(text,'ja','id') 
    await translator.init()
    let result = await translator.getTranslate()
    console.log(result)
    if (result.translate) res.json(result)
    else return res.status(500).json({message : "something went wrong"})
})


app.get('/', (req,res) => {
    res.json({success : "true", message : 'Selamat data di API penerjemah bahasa Jepang - Indonesia memanfaatkan teknologi kamera'})
})


module.exports = app
