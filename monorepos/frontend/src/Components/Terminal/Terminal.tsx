import { useEffect, useRef } from "react"
import { Terminal as XTerminal } from "@xterm/xterm"
import "@xterm/xterm/css/xterm.css"
import { generateJSONFile } from "../../helpers/generateJson"
import { AttachAddon } from "@xterm/addon-attach"

interface TermOptions {
    code: string;
    env: string;
    isStarted: boolean;
}

let ws: WebSocket
let term: XTerminal

export default function Terminal({ code, env, isStarted }: TermOptions) {
    const xterm = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!xterm.current) return

        if(!isStarted) return

        if(!ws) ws = new WebSocket("ws://localhost:5730")

        if(!term) term = new XTerminal({
            convertEol: true
        })

        term.open(xterm.current)

        term.loadAddon(new AttachAddon(ws))

        const targetString = ".dependencies['discord.js'].startsWith(\"^13.\")"
        const fixString = ".dependencies['discord.js'].startsWith(\"13.\")"

        const ltargetString = ".dependencies['discord-logs'].startsWith(\"^2.\")"
        const lfixString = ".dependencies['discord-logs'].startsWith(\"2.\")"

        ws.addEventListener("open", () => {
            console.log("[DEBUG] WEBSOCKET CONNECTED!")

            const c = code.replace(targetString, fixString).replace(ltargetString, lfixString)

            ws.send(JSON.stringify({
                index: `require("dotenv").config();\n${c}`,
                env,
                json: generateJSONFile(c)
            }))
        })

        // ws.addEventListener("message", (msg) => {
        //     console.log("GOT DATA: " + msg.data.toString())

        //     term.write(msg.data)
        // })

        // return () => {
        //     ws.close()
        // }
    }, [isStarted])

    return (
        <>
            <div ref={xterm}></div>
            <button onClick={() => {
                if(ws) ws.send("stop")
            }}>Stop</button>
        </>
    )
}
