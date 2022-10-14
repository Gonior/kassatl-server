
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { ocrSpace } = require('ocr-space-api-wrapper');
const { GoogleTranslator } = require('@translate-tools/core/translators/GoogleTranslator');

const translator = new GoogleTranslator();

const app = express()
const translator = require('./controller/translator')

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json({limit : '10mb'}))
app.use(express.urlencoded({extended : true}))

app.post('/upload', async (req, res) => {
    
    let result
    let {image} = req.body
    let respons = await ocrSpace(image, { apiKey: process.env.KEY_OCR_SPACE, language: 'jpn' });
    console.log(respons.OCRExitCode)
    if (respons.OCRExitCode === 1 || respons.OCRExitCode === 2) {
        let texts = respons.ParsedResults.length === 1 ? {...respons.ParsedResults[0]} : {}
        
        if (texts) {
            if (texts.ParsedText) {
                result = await translator(texts.ParsedText)
                res.json(result)
            } else return res.status(400).json({message : "Teks bahasa Jepang Tidak Terdeteksi"})
        } else {
            return res.status(500).json({message : 'Something wrong', error : JSON.stringify(respons)})
        }

    } else {
        console.log(respons)
        return res.status(500).json({message : 'Something wrong', error : JSON.stringify(respons)})
    }
})

app.post('/translate', async (req, res) => {
    let text = req.body.text
    let result = await translator(text)
    if (result) res.json(result)
    else return res.status(400).json({message : "Teks bahasa Jepang Tidak Terdeteksi"})
})


app.get('/', (req,res) => {
    res.json({success : "true", message : 'Selamat data di API penerjemah bahasa Jepang - Indonesia memanfaatkan teknologi kamera'})
})


module.exports = app
