import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from "../tailwind_presets";
const env = require("../env.json");

const herokuAppName = process.env.HEROKU_APP_NAME;
let serverUrl;
if(herokuAppName === undefined){
  serverUrl = "http://localhost:" + env.LOCAL_SERVER_PORT
}
else {
  serverUrl = `https://${herokuAppName}.herokuapp.com`
}

console.log("serverUrl: " + serverUrl)

function Note() {

  const [noteText, setNoteText] = useState('')
  const [noteUrl, setNoteUrl] = useState('')
  const [noteTimer, setNoteTimer] = useState('')
  const [lineClass, setLineClass] = useState('hidden')
  const [wasDeleteClass, setWasDeleteClass] = useState('hidden')
  const [formClass, setFormClass] = useState('hidden')
  const [errorClass, setErrorClass] = useState('hidden')

  let {noteURL} = useParams();

  function deleteNote(seconds) {
    let timer = setInterval(() => {
      setNoteTimer(seconds - 1);
      seconds--;
      if (seconds < 0) {
        clearInterval(timer);
        setLineClass('hidden')
        setWasDeleteClass('')
      }
    }, 1000);
  }

  useEffect(()=>{
    if(noteURL !== undefined){
      fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({"url": noteURL})
      })
        .then(response => response.json())
        .then(response => {
          if(response.result){
            setNoteText(response.note)
            setNoteUrl(response.url)
            setNoteTimer(response.timer)
            setLineClass('');
            setFormClass('hidden');
            setErrorClass('hidden');
            deleteNote(response.timer);
          }
          else if (!response.result){
            setLineClass('hidden');
            setFormClass('hidden');
            setErrorClass('');
          }
        })
    }
    else {
      setLineClass('hidden');
      setFormClass('');
      setErrorClass('hidden');
    }
  }, [noteURL]);

  function getNote(event){
    event.preventDefault();
    let url = event.target.elements.url.value;
    url = url.trim();
    if(url === ""){
      return false;
    }
    window.location.href = env.fetch_urlBackend + '/note/' + url;
  }

  function searchNote(){
    window.location.href = env.fetch_urlBackend + '/note/';
  }

  return (
    <div className="grow self-center place-content-center flex flex-col w-3/4 md:w-1/2">
      {/*Show note if it exist*/}
      <div className={lineClass}>
        <p className={styles.bigText + ' mb-3'}>Your note will disappear after: {noteTimer}</p>
        <div className="text-xl border-2 border-indigo-600 rounded p-3 mb-3 dark:bg-white">{noteText}</div>
        <p className="text-md text-zinc-500 dark:text-zinc-200 mb-4">HASH of this note: <span className="text-red-500 dark:text-orange-500">{noteUrl}</span></p>
        <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 place-content-around">
          <button className={styles.button} onClick={searchNote}>Show one more note</button>
          <button className={styles.button}><a href='/create'>Create a message</a></button>
        </div>
      </div>
      {/*Show message that note was deleted*/}
      <div className={wasDeleteClass}>
        <p className={styles.bigText + ' mb-6'}>Your note was deleted forever</p>
        <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 place-content-around">
          <button className={styles.button} onClick={searchNote}>Show one more note</button>
          <button className={styles.button}><a href='/create'>Create a message</a></button>
        </div>
      </div>
      {/*Show message if HASH is not exist*/}
      <div className={errorClass}>
        <div className="text-center mb-5">
          <p className={styles.bigText}>Oops!</p>
          <p className="text-4xl md:text-6xl text-red-500 dark:text-white">This url was not found</p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 place-content-around">
          <button className={styles.button} onClick={searchNote}>Show one more note</button>
          <button className={styles.button}><a href='/create'>Create a message</a></button>
        </div>
      </div>
      {/*Form for input HASH*/}
      <div className={formClass}>
        <form action="" onSubmit={getNote}>
          <p className={styles.bigText + ' mb-3'}>Enter HASH</p>
          <p className="text-md text-zinc-500 dark:text-zinc-200">HASH its a short code of your message</p>
          <div className="text-md mb-3 text-zinc-500 dark:text-zinc-200">
            For example: https://antifobia.com/note/<span className="text-red-500 dark:text-orange-500">y8sr42bi4swms1o2yt2xtnrw - its a HASH</span>
          </div>
          <input type="text" name="url" id="url" className="w-full h-16 rounded-lg px-6 py-5 shadow-xl mb-3" required/>
          <button type='submit' className={'float-right ' + styles.button}>Search note</button>
        </form>
      </div>
    </div>
  );
}

export default Note;
