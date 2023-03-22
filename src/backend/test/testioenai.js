const { Configuration, OpenAIApi } = require("openai");

async function openaitest() {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "use js generate user Button" }],
  });
  console.log(completion.data.choices[0].message);
}
openaitest();
