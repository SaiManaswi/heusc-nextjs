import profile from '../styles/Profile.module.css'
export default function Home(props) {
  return (
    <div className={profile.container}>
      <p>Hi! My name is <b>Sai Manaswi.</b></p><br/>
      <p>I am a student in KL University, Hyderabad. Currently studying <b>3rd year, Computer Scinence</b></p><br/>
      <p>My Hobbies are solving codes, designing websites.</p><br/>
      <p>This webite was designed in react using next.js framework.</p><br/>
      <p>This project consists of do-list, made in progress version of monopoly game and a song in menu bar using async-fetch. </p>
    </div>
  )
}