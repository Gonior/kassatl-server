require('dotenv').config()
const KuromojiAnalyzer = require("kuroshiro-analyzer-kuromoji");
const Kuroshiro = require("kuroshiro")
const { translate } = require('bing-translate-api');
const kuroshiro = new Kuroshiro();
jj

(async function (){
    await kuroshiro.init(new KuromojiAnalyzer())
})()

// let params = {
//     "TextOverlay":{
//         "Lines":[
//             {
//                 "LineText": "消えたいだけ",
//                 "Words":[
//                     {
//                         "WordText":"消",
//                         "Left":934,
//                         "Top":629,
//                         "Height":143,
//                         "Width":144
//                     },
//                     {
//                         "WordText":"え",
//                         "Left":1113,
//                         "Top":635,
//                         "Height":131,
//                         "Width":130
//                     },{
//                         "WordText":"た",
//                         "Left":1277,
//                         "Top":630,
//                         "Height":135,
//                         "Width":136
//                     },{
//                         "WordText":"い",
//                         "Left":1452,
//                         "Top":642,
//                         "Height":115,
//                         "Width":136
//                     },
//                     {
//                         "WordText":"だ",
//                         "Left":1614,
//                         "Top":624,
//                         "Height":137,
//                         "Width":141
//                     },{
//                         "WordText":"け",
//                         "Left":1793,
//                         "Top":627,
//                         "Height":135,
//                         "Width":131
//                     }
//                 ],
//                 "MaxHeight":143,
//                 "MinTop":624
//             },
//             {
//                 "LineText":"ただ一人になりたい",
//                 "Words": [
//                     { 
//                         "WordText":"た",
//                         "Left":933,
//                         "Top":973,
//                         "Height":96,
//                         "Width":95
//                     },{
//                         "WordText":"だ",
//                         "Left":1046,
//                         "Top":970,
//                         "Height":99,
//                         "Width":95
//                     },{
//                         "WordText":"一",
//                         "Left":1158,
//                         "Top":1012,
//                         "Height":13,
//                         "Width":95
//                     },{
//                         "WordText":"人",
//                         "Left":1273,
//                         "Top":972,
//                         "Height":97,
//                         "Width":96
//                     },{
//                         "WordText":"に",
//                         "Left":1389,
//                         "Top":976,
//                         "Height":88,
//                         "Width":90
//                     },{
//                         "WordText":"な",
//                         "Left":1500,
//                         "Top":967,
//                         "Height":101,
//                         "Width":92
//                     },{
//                         "WordText":"り",
//                         "Left":1630,
//                         "Top":968,
//                         "Height":100,
//                         "Width":58
//                     },{
//                         "WordText":"た",
//                         "Left":1724,
//                         "Top":966,
//                         "Height":97,
//                         "Width":93
//                     },{
//                         "WordText":"い",
//                         "Left":1843,
//                         "Top":974,
//                         "Height":83,
//                         "Width":92
//                     }
//                 ],
//                 "MaxHeight":101,
//                 "MinTop":966
//             },{
//                 "LineText":"邪魔しないでください",
//                 "Words":[
//                     {
//                         "WordText":"邪",
//                         "Left":936,
//                         "Top":1324,
//                         "Height":72,
//                         "Width":76
//                     },{
//                         "WordText":"魔",
//                         "Left":1020,
//                         "Top":1320,"Height":77,
//                         "Width":79
//                     },{
//                         "WordText":"し","Left":1122,"Top":1325,"Height":67,"Width":54
//                     },{
//                         "WordText":"な","Left":1194,"Top":1320,"Height":74,"Width":69
//                     },{
//                         "WordText":"い","Left":1281,"Top":1327,"Height":62,"Width":68
//                     },{
//                         "WordText":"で","Left":1362,"Top":1327,"Height":63,"Width":69
//                     },{
//                         "WordText":"く","Left":1457,"Top":1319,"Height":71,"Width":41
//                     },{"WordText":"だ","Left":1528,"Top":1317,"Height":72,"Width":71},{"WordText":"さ","Left":1619,"Top":1317,"Height":73,"Width":56},{"WordText":"い","Left":1699,"Top":1324,"Height":60,"Width":68}],"MaxHeight":77,"MinTop":1317},{"LineText":"もういい","Words":[{"WordText":"も","Left":941,"Top":1592,"Height":76,"Width":60},{"WordText":"う","Left":1032,"Top":1593,"Height":75,"Width":50},{"WordText":"い","Left":1112,"Top":1600,"Height":61,"Width":69},{"WordText":"い","Left":1197,"Top":1599,"Height":60,"Width":69}],"MaxHeight":76,"MinTop":1592},{"LineText":"この心が痛い","Words":[{"WordText":"こ","Left":949,"Top":1874,"Height":58,"Width":57},{"WordText":"の","Left":1025,"Top":1871,"Height":64,"Width":71},{"WordText":"心","Left":1109,"Top":1863,"Height":73,"Width":75},{"WordText":"が","Left":1194,"Top":1859,"Height":74,"Width":77},{"WordText":"痛","Left":1277,"Top":1860,"Height":78,"Width":75},{"WordText":"い","Left":1369,"Top":1869,"Height":61,"Width":68}],"MaxHeight":78,"MinTop":1859
//             }
//         ],
//         "HasOverlay":true,
//         "Message":"Total lines: 5"
//     },
//     "TextOrientation":"0",
//     "FileParseExitCode":1,
//     "ParsedText":"消えたいだけ\r\nただ一人になりたい\r\n邪魔しないでください\r\nもういい\r\nこの心が痛い\r\n",
//     "ErrorMessage":"","ErrorDetails":""
// }

module.exports = async (params) => {
    params = params.replace(/\r|\n/g, "")
    let result = {
        parsedText : "",
        indo : "",
        furigana : "",  
        romanji : "",
        eng : "",
    }

    result.indo = await translate(params, 'ja', 'id', true)
    result.eng = await translate(params, 'ja', 'id', true)
    result.furigana = await kuroshiro.convert(params, {to:"romaji", mode:"furigana"})
    result.romanji = await kuroshiro.convert(params, {to :'romaji', mode:"spaced"})
    result.parsedText = params
    
    return result
}