// ── codebreaker.data.js ──────────────────────────────────────
// Word database and feedback logic for CodeBreaker.jsx.
// Add new words here — the game picks randomly from this list.
// ─────────────────────────────────────────────────────────────

export const WORD_DATABASE = [
  { word: 'REACT',  clue: 'The UI library powering this very toolkit.'        },
  { word: 'CLOUD',  clue: 'Where data lives when it is not on the ground.'    },
  { word: 'LOGIC',  clue: 'The fundamental rules of reasoning.'               },
  { word: 'DEBUG',  clue: 'The process of finding and fixing code errors.'    },
  { word: 'CACHE',  clue: 'A secret stash used for fast data retrieval.'      },
  { word: 'ADMIN',  clue: 'The user with the highest system privileges.'      },
  { word: 'MOUSE',  clue: 'I help you point, but I am not a finger.'          },
  { word: 'PROXY',  clue: 'An intermediary server between client and internet.'},
  { word: 'TASKS',  clue: 'Items on your list that need completion.'          },
  { word: 'PYTHON', clue: 'A snake that is also a coding language.'           },
  { word: 'FETCH',  clue: 'What you call to get data from an API.'            },
  { word: 'TOKEN',  clue: 'A secret string used for authentication.'          },
  { word: 'STACK',  clue: 'A data structure that follows LIFO order.'         },
  { word: 'QUEUE',  clue: 'A data structure that follows FIFO order.'         },
  { word: 'CLASS',  clue: 'A blueprint for creating objects in OOP.'          },
  { word: 'ARRAY',  clue: 'A list of items stored at contiguous memory.'      },
  { word: 'STATE',  clue: 'What a React component remembers between renders.' },
  { word: 'HOOKS',  clue: 'React functions that let you use state in functional components.' },
  { word: 'ROUTE',  clue: 'A URL path that maps to a component in React Router.' },
  { word: 'CLONE',  clue: 'What git does when you copy a remote repository.'  },
  { word: 'MERGE',  clue: 'Combining two git branches into one.'              },
  { word: 'VIRUS',  clue: 'Malicious software that replicates itself.'        },
  { word: 'SHELL',  clue: 'The command-line interface to interact with the OS.'},
  { word: 'PIXEL',  clue: 'The smallest unit of a digital image.'             },
  { word: 'MODAL',  clue: 'A popup overlay dialog box in UI design.'          },
  { word: 'QUERY',  clue: 'A request sent to a database to retrieve data.'    },
  { word: 'PARSE',  clue: 'Converting a string or file into usable data.'     },
  { word: 'SCOPE',  clue: 'The context in which a variable is accessible.'    },
  { word: 'ASYNC',  clue: 'Code that does not block while waiting for a result.'},
  { word: 'AWAIT',  clue: 'Pauses execution until a Promise resolves.'        },
  { word: 'EVENT',  clue: 'A user action like a click or keypress.'           },
  { word: 'PATCH',  clue: 'An HTTP method used to partially update a resource.'},
  { word: 'VITE',   clue: 'A blazing-fast build tool for modern web apps.'    },
  { word: 'REGEX',  clue: 'A pattern used to match and validate strings.'     },
  { word: 'NODES',  clue: 'Elements in a linked list or DOM tree.'            },
  { word: 'HASH',   clue: 'A fixed-length fingerprint of any piece of data.'  },
  { word: 'BYTES',  clue: 'The basic unit of digital information, made of 8 bits.' },
];

export const MAX_ATTEMPTS = 10;

/** Generate a random 4-digit code string */
export function generateNumericCode() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
}

/** Pick a random word entry */
export function getRandomWord() {
  return WORD_DATABASE[Math.floor(Math.random() * WORD_DATABASE.length)];
}

/**
 * Compare guess against target and return per-character feedback.
 * Returns array of 'green' | 'yellow' | 'red'
 */
export function getFeedback(guess, target) {
  const len      = target.length;
  const feedback = new Array(len).fill('red');
  const tUsed    = new Array(len).fill(false);
  const gUsed    = new Array(len).fill(false);

  // First pass — exact matches (green)
  for (let i = 0; i < len; i++) {
    if (guess[i] === target[i]) {
      feedback[i] = 'green'; tUsed[i] = true; gUsed[i] = true;
    }
  }
  // Second pass — wrong position (yellow)
  for (let i = 0; i < len; i++) {
    if (gUsed[i]) continue;
    for (let j = 0; j < len; j++) {
      if (!tUsed[j] && guess[i] === target[j]) {
        feedback[i] = 'yellow'; tUsed[j] = true; break;
      }
    }
  }
  return feedback;
}
