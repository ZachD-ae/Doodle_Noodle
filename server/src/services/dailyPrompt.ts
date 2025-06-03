import Prompt from '../models/prompt.js';
import DailyPrompt from '../models/dailyPrompt.js'; // new model to store daily chosen prompts

// Utility to get today's date string in YYYY-MM-DD format
function getTodayDateString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export async function getDailyPrompt() {
  const todayStr = getTodayDateString();
  console.log('Looking for daily prompt for date:', todayStr);

  let dailyPromptEntry = await DailyPrompt.findOne({ date: todayStr }).populate('prompt');
  if (dailyPromptEntry) {
    console.log('Found existing daily prompt:', dailyPromptEntry);
    return dailyPromptEntry.prompt;
  }

  const allPrompts = await Prompt.find();
  console.log('All prompts found:', allPrompts.length);

  if (!allPrompts.length) {
    console.log('No prompts in DB, returning null');
    return null;
  }

  const usedPromptIds = (await DailyPrompt.find()).map(dp => dp.prompt.toString());
  const unusedPrompts = allPrompts.filter(p => !usedPromptIds.includes(p._id.toString()));

  let chosenPrompt;

  if (unusedPrompts.length === 0) {
    chosenPrompt = allPrompts[Math.floor(Math.random() * allPrompts.length)];
  } else {
    chosenPrompt = unusedPrompts[Math.floor(Math.random() * unusedPrompts.length)];
  }

  dailyPromptEntry = new DailyPrompt({
    date: todayStr,
    prompt: chosenPrompt._id,
  });

  await dailyPromptEntry.save();

  await dailyPromptEntry.populate('prompt');

  console.log('Saved new daily prompt:', dailyPromptEntry);

  return dailyPromptEntry.prompt;
}