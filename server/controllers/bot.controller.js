import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const botMessage = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);

    if (!text?.trim()) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }

    const user = await User.create({
      sender: "user",
      text,
    });

    const botResponses = {
      hello: "Hello, how can i help you",
      "what is your name": "I am a YourChat.",
      "how are you": "I am functioning properly.",
      date: `${new Date().toLocaleDateString()}`,
      "what is node.js":
        "Node.js is a runtime for executing JavaScript on the server.",
      "what is express": "Express is a web framework for Node.js.",
      "what is mongodb": "MongoDB is a NoSQL database.",
      "what is an api": "An API allows communication between software systems.",
      "what is json":
        "JSON is a lightweight data format for storing and transferring data.",
      "what is http": "HTTP is a protocol used for communication on the web.",
      "what is a server": "A server provides data or services to clients.",
      "what is a database": "A database stores and manages data.",

      "what is javascript":
        "JavaScript is a programming language for web development.",
      "what is react":
        "React is a JavaScript library for building user interfaces.",
      "what is authentication": "Authentication verifies a user's identity.",
      "what is authorization": "Authorization determines user permissions.",
      "what is middleware":
        "Middleware is a function that runs between request and response.",

      "what is rest api":
        "A REST API follows REST principles for communication.",
      "what is crud": "CRUD stands for Create, Read, Update, Delete.",
      "what is git": "Git is a version control system.",
      "what is github":
        "GitHub is a platform to host and manage code repositories.",

      "what is npm": "npm is a package manager for Node.js.",
      "what is dotenv": "dotenv loads environment variables from a file.",
      "what is jwt": "JWT is a token used for authentication.",

      "what is html": "HTML structures web pages.",
      "what is css": "CSS styles web pages.",

      "what is async programming":
        "Async programming allows non-blocking operations.",
      "what is promise": "A promise represents a future value.",

      "what is error handling": "Error handling manages runtime errors.",
      "what is debugging": "Debugging is finding and fixing bugs.",

      "what is cloud computing":
        "Cloud computing delivers services over the internet.",
      "what is deployment": "Deployment is making an application live.",

      "what is docker": "Docker is a tool for containerizing applications.",
      "what is kubernetes": "Kubernetes manages containerized applications.",

      "what is a function": "A function is a reusable block of code.",
      "what is a variable": "A variable stores data.",

      "what is oop": "OOP is a programming paradigm based on objects.",
      "what is api testing": "API testing verifies API functionality.",

      "what is latency": "Latency is the delay in response time.",
      "what is bandwidth": "Bandwidth is data transfer capacity.",

      "what is seo": "SEO improves website visibility in search engines.",

      "what is caching": "Caching stores data for faster access.",
      "what is load balancing":
        "Load balancing distributes traffic across servers.",
    };

    const normalizedText = text.toLowerCase().trim();

    const botResponse =
      botResponses[normalizedText] || "Sorry, I don't understand that!!!";

    const bot = await Bot.create({
      text: botResponse,
    });

    return res.status(200).json({
      userMessage: user.text,
      botMessage: bot.text,
    });
  } catch (error) {
    console.log("Error in message controller", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
