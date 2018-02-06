var fs = require("fs");
var markdownItAttrs = require('markdown-it-attrs');
const manifestsDir = './manifests/'
const modulesDir = './modules/'
const lessonsDir = './lessons/'
var markdown = require('markdown-it')({
  html: true,
  typographer: true
});
markdown.use(markdownItAttrs);

let lessons = {};
let modules = [];
fs.readdirSync(modulesDir).forEach(file => {
  modules.push(file);
})
fs.readdirSync(manifestsDir).forEach(file => {
  let manifest = JSON.parse(fs.readFileSync(manifestsDir + file));
  lessonNum = file.split('-')[0]
  lessons[lessonNum] = manifest
  lessons[lessonNum].lessonName = file
})
modules.forEach(module => {
  let fileParts = module.split('.')
  let moduleParts = fileParts[0].split('-')
  if(moduleParts.length === 3) {
    let content = fs.readFileSync(modulesDir + module, "utf8")
    let type = null
    let fileExtension = fileParts[1]
    if(fileExtension === 'md') {
      type = 'md'
      content = markdown.render(content)
    }
    else {
      type = 'code'
    }
    let contentPackage = {
      type,
      content
    }
    if (lessons[moduleParts[0]].content) {
      lessons[moduleParts[0]].content.content.push(contentPackage)
    }
    else {
      lessons[moduleParts[0]].content = {
        content: [contentPackage]
      }
    }
  }
})
// transform lesson to true lesson json
Object.keys(lessons).forEach(key => {
  let lessonName = lessons[key].lessonName
  let output = {
    title: lessons[key].title,
    slug: lessons[key].slug,
    layout: {
      type: lessons[key].layout,
      units: lessons[key].content.content
    }
  }
  let outputJson = JSON.stringify(output)
  fs.writeFileSync(lessonsDir + lessonName, outputJson, 'utf8')
})
