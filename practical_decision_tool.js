const inquirer = require('inquirer');

function checkWeatherConditions() {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'isSunny',
      message: 'Is it sunny outside? (Yes/No)',
    },
    {
      type: 'confirm',
      name: 'isRaining',
      message: 'Is it raining? (Yes/No)',
      when: (answers) => !answers.isSunny,
    },
    {
      type: 'confirm',
      name: 'isWindy',
      message: 'Is it windy outside? (Yes/No)',
    },
  ]);
}

function checkAdditionalFactors() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'numPeople',
      message: 'How many people will be attending the picnic?',
      validate: (value) => {
        const num = parseInt(value);
        return num > 0 ? true : 'Please enter a valid number greater than 0.';
      },
    },
    {
      type: 'input',
      name: 'availableTime',
      message: 'How much time (in hours) do you have for the picnic?',
      validate: (value) => {
        const num = parseFloat(value);
        return num > 0 ? true : 'Please enter a valid number greater than 0.';
      },
    },
    {
      type: 'input',
      name: 'budget',
      message: 'What is your budget (in USD) for the picnic?',
      validate: (value) => {
        const num = parseFloat(value);
        return num >= 0 ? true : 'Please enter a valid number greater than or equal to 0.';
      },
    },
  ]);
}

function makePicnicDecision(conditions, factors) {
  const weatherDecision = conditions.isSunny && !conditions.isWindy
    ? "It's a perfect day for a picnic!"
    : conditions.isRaining
    ? "Sorry, it's raining. You might want to reconsider the picnic."
    : "It might be okay, but be prepared for some wind.";

  const numPeople = parseInt(factors.numPeople);
  const availableTime = parseFloat(factors.availableTime);
  const budget = parseFloat(factors.budget);

  if (numPeople <= 0 || availableTime <= 0 || budget < 0) {
    return "Invalid input. Please provide valid information for all factors.";
  }

  const sizeDecision = numPeople > 5 ? "The group is large, so plan accordingly." : "The group size is manageable.";

  const timeDecision = availableTime < 2 ? "You might not have enough time for a proper picnic." : "You have a reasonable amount of time for a picnic.";

  let budgetDecision;
  if (budget < 50) {
    budgetDecision = "Consider low-cost picnic options.";
  } else if (budget >= 100) {
    budgetDecision = "You have a good budget for a nice picnic experience.";
  } else {
    budgetDecision = "You can plan a moderate picnic with this budget.";
  }

  return `${weatherDecision}\n${sizeDecision}\n${timeDecision}\n${budgetDecision}`;
}

console.log("Decision Making Tool - Picnic Edition");
console.log("=====================================");

checkWeatherConditions()
  .then(checkAdditionalFactors)
  .then((answers) => {
    const decisionResult = makePicnicDecision(answers.weatherConditions, answers.additionalFactors);
    console.log("\nDecision Result:");
    console.log(decisionResult);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
