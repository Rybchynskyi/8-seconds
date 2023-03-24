import {useState, useRef} from "react";
import copyIcon from '../images/duplicate.svg';
import styles from "../tailwind_presets";
const env = require("../env.json");

const herokuAppName = process.env.HEROKU_APP_NAME;
console.log("herokuAppName: " + herokuAppName);
let serverUrl;
let clientUrl;
if(herokuAppName === undefined){
  serverUrl = "http://localhost:" + env.LOCAL_SERVER_PORT;
  clientUrl = "http://localhost:" + env.LOCAL_CLIENT_PORT
}
else {
  serverUrl = `https://${herokuAppName}.herokuapp.com`
}

console.log("serverUrl: " + serverUrl)
console.log("clientUrl: " + clientUrl)

function Create() {

  const [url, setUrl] = useState('');
  const [lineClass, setLineClass] = useState('hidden');
  const [formClass, setFormClass] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [timer, setTimer] = useState(5)

  const textAreaRef = useRef();

  const loadDataFromForm = (event) => {
    event.preventDefault();
    let note = event.target.elements.note.value;
    let timer = event.target.elements.timer.value;
    note = note.trim();

    let sendData = (obj) => {
      setFormClass('hidden');
      setLineClass('');

      fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(obj)
      })
        .then(response => response.json())
        .then(response => {
          if(response.result){
            setUrl(clientUrl +'/note/'+response.url)
          }
        })
    }

    if(note === ""){
      return false;
    }
    sendData({"note": note, "timer": timer})
  }

  function copyToClipboard() {
    let text = textAreaRef.current.innerText;
    navigator.clipboard.writeText(text);
    setCopySuccess('Copied!');
  }

  return (
    <div className="grow self-center place-content-center flex flex-col w-3/4 md:w-1/2">
      <form onSubmit={loadDataFromForm} className={formClass}>
        <p className={styles.bigText + ' mb-4'}> Enter the note</p>
        <textarea className="w-full h-16 rounded-lg px-6 py-5 shadow-xl mb-3" name="note" id="note" placeholder="Write some text" required></textarea>
        <p className="text-2xl md:text-3xl dark:text-orange-500 mb-3 mt-4"> Your note will disappear in:</p>
        <div className="flex items-center mb-6">
          <div className="w-3/4 pr-4">
            <input type="range" name="timer" value={timer} min="1" max="9" step="1" className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer dark:bg-orange-200 range-lg" onChange={(e) => setTimer(e.target.value)}/>
          </div>
          <div className="w-1/4 dark:text-orange-500">
            <div className="text-4xl md:text-6xl">{timer} sec.</div>
          </div>
        </div>
        <button className={'float-right ' + styles.button} type="submit">Send</button>
      </form>
      <div className={lineClass + " max-w-sm md:max-w-2xl"}>
        <p className={styles.bigText + ' mb-3'}>
          Here is your link for reading the message:
        </p>
        <div className="text-xl mb-3 flex items-center">
          <p className="mb-2 truncate w-3/4 md:w-full dark:text-white" ref={textAreaRef}>{url}</p>
          <button className="pl-3" onClick={copyToClipboard}>
            <img className="mb-2 pr-2" src={copyIcon} alt="copyIcon"/>
          </button>
          <p className="text-sm mb-2 text-zinc-500">{copySuccess}</p>
        </div>
        <p className="text-md mb-3 text-zinc-500 break-words dark:text-zinc-200">This message will be deleted when it will be read</p>
        <div>
          <button className={styles.button} onClick={function (){window.location.reload()}}>Create new message</button>
        </div>
      </div>
    </div>
  );
}

export default Create;
