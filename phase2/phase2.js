const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up and in front of you is a large cave as well as a pile of gold. ',
    options: [
      {
        text: 'Take the gold and enter',
        setState: { haveMoney: true }, //setstate sets the "state" of the person or user to have money and gives them a choice later on that involves spending that money. 
        nextText: 2 //if you choose this option then you would have money and would enter the cave. 
      },
      {
        text: 'Leave the gold',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Your curiousity is piqued by the potential for unfathomable wealth, so you venture forward into the cave and come across a man groaning on the floor. He asks for some money, this is strange to you but you both end up talking. The man has some offers for you.',
    options: [
      {
        text: 'buy a small swiss pocket knife',
        requiredState: (currentState) => currentState.haveMoney,
        setState: { haveMoney: false, sword: true },
        nextText: 3
        
      },
      {
        text: 'Run towards the man and throw yourself at him, in an attempt to rob him for what he has',
        nextText: 14

      },
      {
        text: 'Ignore the man',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the man and wandering you begin to feel tired, you stumble around and find yourself upon a faint light that is followed by some terrible scratching noises.',
    options: [
      {
        text: 'Explore the light',
        nextText: 4
      },
      {
        text: 'Go back to sleep',
        nextText: 5
      },
      
    ]
  },
  {
    id: 4,
    text: 'You happened upon the lair of a giant spider! It stalks you and murders you the same night.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You are well rested and decide to continue exploring the light, there seems to be something or someone there',
    options: [
      {
        text: 'continue along and look for whatever or whoever is there',
        nextText: 13
      },
      {
        text: 'avoid whatever is near the light and go towards another direction',
        nextText: 6
      }
    ]
  },
  {
    id: 13,
    text: 'There was a giant spider, it shoots a giant web and feeds you to its children',
    options: [
      {
        text: 'restart',
        nextText: -1
      }
      
    ]
  }, // You die ! to a giant spider 
  {
    id: 6,
    text: 'You find a lot of skeletons with armor and bags of golden coins.',
    options: [
      {
        text: 'take the gold and continue along the path',
        nextText: 7,
        setState: { haveMoney: true },
        
      },
      {
        text: 'don`t take the gold and just go home',
        nextText: 12
      }
    ]
  },
  
  {
    id: 7,
    text: 'further along the cave you come across a horrible monster in your path. It looks like a man with a moose head',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Flee without your heavy money',
        requiredState: (currentState) => currentState.haveMoney,
        nextText: 9
      },
      
      
      {
        text: 'Throw your swiss army knife at his head',
        requiredState: (currentState) => currentState.sword,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'You really thought you could outrun a monster... (You die, obviously.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Honestly, it was worth a try, you almost got away...',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 14,
    text: 'Honestly you are an evil person..(Why would you try that?) *the man stabs you with his knife and you bleed out*',
    options: [
      {
        text: 'Restart (This time without murdering a random dude maybe?)',
        nextText: -1
      },
    
    ]
  },
  {
    id: 11,
    text: 'You hit the eye of the monster and it groans in pain. It cries out and shrieks for a minute... Then it dies and you escape with your life.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'You head home to live out the rest of your days in peace.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()