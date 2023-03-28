function About() {
  return (
    <div className="grow self-center place-content-center flex flex-col w-3/4 md:w-1/2 dark:text-white">
      <p className="text-2xl md:text-4xl pb-4">This application will secure your messages to someone.</p>
      <p className="pb-4">✅ After creating the message - it will be encoded, and you will receive the link for showing your message. This link can be opened just once. You can share this link whoever what you want.</p>
      <p className="pb-4">✅ When someone will open your link - the message will be encoded and show on the screen for few seconds. After that - the message will be deleted forever. No one will ever be able to read it again.</p>
      <p className="pb-4">✅ We guarantee the safe storage and deletion of your message after it is opened via the generated link.</p>
    </div>
  );
}

export default About;
