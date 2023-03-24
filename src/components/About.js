function About() {
  return (
    <div className="grow self-center place-content-center flex flex-col w-3/4 md:w-1/2 dark:text-white">
      <p className="text-4xl pb-4">This service will secure your messages to someone.</p>
      <p className="pb-4">✅ After creating the message - your message will be decoded and you will recive tne link for showing your message. This link can be opened just once. You can share this link whoever what you want.</p>
      <p className="pb-4">✅ When someone will open your link - the message will be encoded and show on the screen for few seconds. After that - the message will be deleted forever</p>
      <p className="pb-4">✅ We guarantee the safe storage and deletion of your message after it is opened via the generated link.</p>
    </div>
  );
}

export default About;
