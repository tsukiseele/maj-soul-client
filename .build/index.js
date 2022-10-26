const fs = require('fs')
const path = require('path')
const resolve = path.resolve

copyFolderRecursiveSync(resolve(__dirname, '../src/renderer/'), resolve(__dirname, '../build/'))

function copyFolderRecursiveSync(source, target) {
  const targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }
  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source)
    files.forEach((file) => {
      const curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        // copyFileSync(curSource, targetFolder)
        fs.copyFileSync(curSource, path.join(targetFolder, path.basename(curSource)))
      }
    })
  }
}

function copyFileSync(source, target) {
  let targetFile = target
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source))
}
