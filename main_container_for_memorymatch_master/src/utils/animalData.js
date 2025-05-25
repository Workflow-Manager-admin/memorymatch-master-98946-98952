// PUBLIC_INTERFACE
/**
 * Data for real-world animals to be used in the MemoryMatch game.
 * Each animal object contains its name, a placeholder path for its image,
 * and interesting facts (habitat, diet, unique features, fun fact).
 *
 * Image paths assume images will be placed in `public/assets/images/animals/`.
 */
export const animalData = [
  {
    name: "Lion",
    image: "/assets/images/animals/lion.png",
    facts: {
      habitat: "Grasslands, savannas, and open woodlands of Africa and India.",
      diet: "Carnivore - primarily eats large animals like zebras, wildebeest, and buffalo.",
      uniqueFeatures: "Known as the 'king of the jungle,' male lions have a distinctive mane. They live in groups called prides.",
      funFact: "A lion's roar can be heard up to 5 miles (8 kilometers) away!"
    }
  },
  {
    name: "Panda",
    image: "/assets/images/animals/panda.png",
    facts: {
      habitat: "Temperate forests in the mountains of southwest China.",
      diet: "Herbivore - almost exclusively eats bamboo (around 20-40 pounds a day!).",
      uniqueFeatures: "Distinctive black and white fur pattern. They have an extra 'thumb' (a modified wrist bone) to help grip bamboo.",
      funFact: "Pandas spend 10-16 hours a day eating bamboo!"
    }
  },
  {
    name: "Elephant",
    image: "/assets/images/animals/elephant.png",
    facts: {
      habitat: "Savannas, grasslands, and forests in Africa and Asia.",
      diet: "Herbivore - eats roots, grasses, fruit, and bark.",
      uniqueFeatures: "Largest land animals, known for their long trunks, large ears, and tusks (in some species).",
      funFact: "Elephants can communicate using sounds too low for humans to hear, called infrasound."
    }
  },
  {
    name: "Tiger",
    image: "/assets/images/animals/tiger.png",
    facts: {
      habitat: "Tropical rainforests, evergreen forests, and mangrove swamps across Asia.",
      diet: "Carnivore - preys on animals like deer, wild boar, and buffalo.",
      uniqueFeatures: "Largest cat species, with distinctive orange fur and dark vertical stripes.",
      funFact: "Every tiger has a unique pattern of stripes, like a human fingerprint!"
    }
  },
  {
    name: "Penguin",
    image: "/assets/images/animals/penguin.png",
    facts: {
      habitat: "Mostly in the Southern Hemisphere, from Antarctica to warmer coastal areas.",
      diet: "Carnivore - eats fish, squid, and krill.",
      uniqueFeatures: "Flightless birds adapted for swimming and diving, with black and white plumage for camouflage.",
      funFact: "Penguins 'propose' to their mates by presenting them with a pebble!"
    }
  },
  {
    name: "Zebra",
    image: "/assets/images/animals/zebra.png",
    facts: {
      habitat: "Grasslands, savannas, and woodlands of eastern and southern Africa.",
      diet: "Herbivore - primarily eats grasses, but also leaves and stems.",
      uniqueFeatures: "Famous for their black and white striped coats. Each zebra's stripe pattern is unique.",
      funFact: "A group of zebras is called a 'dazzle'!"
    }
  },
  {
    name: "Dolphin",
    image: "/assets/images/animals/dolphin.png",
    facts: {
      habitat: "Oceans worldwide, from coastal waters to the open sea.",
      diet: "Carnivore - eats fish and squid.",
      uniqueFeatures: "Highly intelligent marine mammals known for their playful behavior and use of echolocation.",
      funFact: "Dolphins sleep with one eye open and half their brain awake to watch for predators!"
    }
  },
  {
    name: "Koala",
    image: "/assets/images/animals/koala.png",
    facts: {
      habitat: "Eucalyptus forests in eastern Australia.",
      diet: "Herbivore - almost exclusively eats eucalyptus leaves.",
      uniqueFeatures: "Marsupials with grey fur, a large, round head, and fluffy ears. They sleep up to 20 hours a day!",
      funFact: "Koalas have fingerprints that are very similar to human fingerprints."
    }
  },
  {
    name: "Fox",
    image: "/assets/images/animals/fox.png",
    facts: {
      habitat: "Diverse habitats worldwide, including forests, grasslands, mountains, and deserts.",
      diet: "Omnivore - eats rodents, rabbits, birds, insects, fruit, and berries.",
      uniqueFeatures: "Known for their cunning behavior, bushy tails, and pointed ears.",
      funFact: "Foxes use the Earth's magnetic field to hunt!"
    }
  },
  {
    name: "Owl",
    image: "/assets/images/animals/owl.png",
    facts: {
      habitat: "Found in various habitats across the globe, except Antarctica.",
      diet: "Carnivore - primarily eats small mammals, insects, and other birds.",
      uniqueFeatures: "Nocturnal birds of prey with large, forward-facing eyes, excellent hearing, and the ability to turn their heads almost 270 degrees.",
      funFact: "A group of owls is called a parliament!"
    }
  },
  {
    name: "Turtle",
    image: "/assets/images/animals/turtle.png",
    facts: {
      habitat: "Oceans, freshwater ponds, rivers, and some on land.",
      diet: "Varies by species; can be carnivorous, herbivorous, or omnivorous.",
      uniqueFeatures: "Reptiles characterized by a special bony or cartilaginous shell developed from their ribs.",
      funFact: "Some turtles can live for over 100 years!"
    }
  },
  {
    name: "Monkey",
    image: "/assets/images/animals/monkey.png",
    facts: {
      habitat: "Tropical forests, savannas, and mountainous regions in Africa, Asia, and Central/South America.",
      diet: "Omnivore - eats fruits, leaves, insects, eggs, and small animals.",
      uniqueFeatures: "Intelligent primates, often social, with grasping hands and feet. Many have prehensile tails.",
      funFact: "There are over 260 different species of monkeys!"
    }
  }
];

// PUBLIC_INTERFACE
/**
 * Selects a subset of animal data for the game.
 * @param {number} count - The number of unique animals needed (for pairs).
 * @returns {Array} - An array of animal objects.
 */
export const getAnimalSet = (count) => {
  if (count > animalData.length) {
    console.warn(`Requested ${count} animals, but only ${animalData.length} are available. Using all available.`);
    return [...animalData]; // Return a copy
  }
  // Shuffle animalData to get a random subset if needed, or just take the first 'count'
  const shuffledAnimals = [...animalData].sort(() => 0.5 - Math.random());
  return shuffledAnimals.slice(0, count);
};
