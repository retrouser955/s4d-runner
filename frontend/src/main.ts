const code = document.getElementById("code")! as HTMLTextAreaElement
const env = document.getElementById("env")! as HTMLTextAreaElement

let genCode = ""
let userEnv = ""

const targetString = ".dependencies['discord.js'].startsWith(\"^13.\")"
const fixString = ".dependencies['discord.js'].startsWith(\"13.\")"

const ltargetString = ".dependencies['discord-logs'].startsWith(\"^2.\")"
const lfixString = ".dependencies['discord-logs'].startsWith(\"2.\")"

code.addEventListener("change", (e) => {
  // @ts-ignore
  const text = e.target.value as string

  genCode = text
})

env.addEventListener("change", (e) => {
  // @ts-ignore
  const text = e.target.value as string

  userEnv = text
})

document.getElementById("run")!.addEventListener("click", async () => {
  if(!genCode) return alert("Cannot start running without code")

  const wrapper = document.querySelector('.wrapper')!

  wrapper.innerHTML = `<div class="terminal"></div>
  <button id="stop">Stop</button>`

  wrapper.classList.add("xterm-added")

  const terminalEl = document.querySelector(".terminal")! as HTMLElement
  const stopEle = document.getElementById("stop")

  const { Terminal } = await import("xterm")
  await import("xterm/css/xterm.css")

  const term = new Terminal({
    convertEol: true
  })

  term.open(terminalEl)

  const { generateJSONFile } = await import('./generateJsonFile')

  const wss = new WebSocket("ws://localhost:5730")

  let isReady = false

  stopEle?.addEventListener("click", () => {
    if(isReady) wss.send("stop")
  })

  const c = genCode.replace(targetString, fixString).replace(ltargetString, lfixString)

  wss.onopen = () => {
    isReady = true
    console.log("Connected!")
    wss.send(JSON.stringify({
      index: `require('dotenv').config();\n${c}`,
      json: generateJSONFile(c),
      env: userEnv
    }))
  }

  wss.addEventListener("message", (msg) => {
    console.log("fired")
    console.log(msg.data.toString())
    term.write(msg.data)
  })
})