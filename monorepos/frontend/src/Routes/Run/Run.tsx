import { useState } from "react"
import "./run.css"
import Terminal from "../../Components/Terminal/Terminal"

export default function Run() {
    const [isStarted, setIsStarted] = useState(false)

    const [code, setCode] = useState("")
    const [env, setEnv] = useState("")

    return (
        <div className="wrapper">
            {
                isStarted ?
                    <Terminal code={code} env={env} isStarted={isStarted} /> :
                    <>
                        <p>Input the required information</p>
                        <div className="info">
                            <div className="code-wrapper">
                                <p style={{
                                    fontSize: "20px"
                                }}>index.js</p>
                                <textarea name="code" id="code" onChange={(e) => setCode(e.target.value)} autoCorrect={"off"}></textarea>
                            </div>
                            <div className="code-wrapper">
                                <p style={{
                                    fontSize: "20px"
                                }}>.env</p>
                                <textarea name="env" id="env" autoCorrect={"off"} onChange={(e) => setEnv(e.target.value)}></textarea>
                            </div>
                        </div>
                        <button onClick={() => {
                            setIsStarted(true)
                        }}>Run</button>
                    </>
            }
        </div>
    )
}
