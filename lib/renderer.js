// TODO: you will implement this!
const electron = require('electron')
const ipc = electron.ipcRenderer
const $ = require('jquery')
const $markdownView = $('.raw-markdown')
const $htmlView = $('.rendered-html')
const $openFileButton = $('#open-file')
const $saveFileButton = $('#save-file')
const $copyHtmlButton = $('#copy-html')
const marked = require('marked')
const remote = electron.remote
const mainProcess = remote.require('./main')


function renderMarkdownToHtml(markdown) {
  const html = marked(markdown)
  $htmlView.html(html)
}

ipc.on('file-opened', (event, file, content) => {
  $markdownView.val(content)
  renderMarkdownToHtml(content)
})

$markdownView.on('keyup', (event) => {
  const content = $(event.target).val()
  // const content = $markdownView.val() alternative solution
  renderMarkdownToHtml(content)
})

$openFileButton.on('click', () => {
  mainProcess.openFile()
})
