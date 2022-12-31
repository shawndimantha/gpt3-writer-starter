import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
Generate a due diligence memo for potential startup investments in the following prompt based on the market size, potential growth of that market, products on the market, current competitors, names of the founders, names of the venture capital firms or angel investors that have invested in the startup, caliber of work and educational experience of employees, estimated annaul revenue, and defensibility / network effects, and reasons why this would not be a good investment. Do not include criteria in results.

Prompt:
`
;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;