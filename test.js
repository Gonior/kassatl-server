const { GoogleTranslator } = require('@translate-tools/core/translators/GoogleTranslator');

const translator = new GoogleTranslator();



translate('泣くな、絶望するな', 'ja', 'id', true).then(res => {
  console.log(res);
}).catch(err => {
  console.error(err);
});

translator.translate("泣くな、絶望するな", "ja", "id")
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err))