<div align="center">
    <a href="https://connect.novu.co" target="_blank"><img src="https://user-images.githubusercontent.com/100117126/235352632-e3e22d9e-2c8b-43d3-a297-dd8fbd90fc56.png" /></a>
</div>

<h1 align="center">The open-source notification infrastructure for developers</h1>

<div align="center">
The ultimate service for managing multi-channel notifications with a single API.
</div>

<h3>Topic: Creating a notification-based mental health app that provides mindfulness exercises and reminders for self-care</h3>
<p>Website that sends daily self care reminders (via emails) to signed up users</p>

<h3>Technologies being used</h3>
<p>MERN stack: MongoDB, Expresss, ReactJS, Node </p>

<!-- <h3>App Link</h3>
<p>If there is</p> -->

<h3>Screenshots and description</h3>
![Picture1](https://github.com/LunarMarathon/connect-readme/assets/113847439/04b1d9fc-e2f5-4b42-95ac-7a6c0b9e35e1)

<p> The user can enter their username and email in the interface shown in fig2 </p>
<p>fig2: </p>
![Picture2](https://github.com/LunarMarathon/connect-readme/assets/113847439/98790894-36e2-4598-a1e6-7b52028c91ba)

<p>The details get saved in the emailsubscribers collection (fig3) </p>
<p>fig3:</p> 
![mongoSubs](https://github.com/LunarMarathon/connect-readme/assets/113847439/8d83c953-4406-4b62-9688-a3750e136bbc)

<p>A cron is set up such that an email is sent to all the users daily at 9 am (fig4) The data is fetched and an api is called to get a random self care activity which is then passed as payload to Novu (fig5)</p>
<p>fig4: </p>
![Picture5](https://github.com/LunarMarathon/connect-readme/assets/113847439/281df8bb-4b23-4ca0-9b61-1315a8349684)
<p>fig5: </p>
![Picture6](https://github.com/LunarMarathon/connect-readme/assets/113847439/cbf1dca2-d5e5-43ab-8173-62e22e388a4a)

<p>Here is an email that was sent: </p>
![Picture7](https://github.com/LunarMarathon/connect-readme/assets/113847439/985e99bf-ffa5-48da-adec-7268c0f93e12)

<p>The site has another section where users can add posts anonymously. This is to let them share their thoughts and vents freely.</p>
![Picture3](https://github.com/LunarMarathon/connect-readme/assets/113847439/17106d18-2d6f-4142-908f-df4c7a00851d)
![Picture4](https://github.com/LunarMarathon/connect-readme/assets/113847439/3a6cd328-aeba-4821-af6f-aeec9c11b466)

<!-- <h3>Description</h3>
<p>Explain what you have build in the most detailed way</p> -->

<h3>How to run?</h3>
<p>Fill the variables in .env file (in server folder)</p>
<h4>Frontend</h4>
    `cd client` <br>
    `npm install` <br>
    `npm run dev`   
<h4>Backend</h4>
    `cd server` <br>
    `npm install` <br>
    `npm start` 
    
<!-- <h3>Who are you?</h3>
<p>Give us your best description who are you, and why you have decided to build this project</p>

<h3>Additional Resources/Info</h3>
<p>If you have</p> -->
