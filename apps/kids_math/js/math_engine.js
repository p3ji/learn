/**
 * OCDSB Kids Math Problem Generator & Answer Verification Engine
 */

(function(exports) {

  // Helper random functions
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function round2(val) {
    return Math.round(val * 100) / 100;
  }

  // Answer Verifier
  function verifyAnswer(userAns, correctAns) {
    if (userAns === undefined || userAns === null) return false;
    
    // Clean string
    let uStr = String(userAns).trim().toLowerCase()
      .replace(/[\$%,°]|sq\s*cm|cm²|cm³|cm|m²|m|g|kg|l|ml/g, '')
      .replace(/\s+/g, '');
    let cStr = String(correctAns).trim().toLowerCase()
      .replace(/[\$%,°]|sq\s*cm|cm²|cm³|cm|m²|m|g|kg|l|ml/g, '')
      .replace(/\s+/g, '');

    if (uStr === cStr) return true;

    // Try parsing as fractions (e.g. 3/4)
    if (uStr.includes('/') || cStr.includes('/')) {
      const parseFrac = (str) => {
        if (str.includes('/')) {
          const parts = str.split('/');
          return parseFloat(parts[0]) / parseFloat(parts[1]);
        }
        return parseFloat(str);
      };
      const uVal = parseFrac(uStr);
      const cVal = parseFrac(cStr);
      if (!isNaN(uVal) && !isNaN(cVal)) {
        return Math.abs(uVal - cVal) < 0.02;
      }
    }

    // Try parsing float
    const uNum = parseFloat(uStr);
    const cNum = parseFloat(cStr);

    if (!isNaN(uNum) && !isNaN(cNum)) {
      return Math.abs(uNum - cNum) <= 0.05;
    }

    return false;
  }

  // Question Generators by Topic ID
  const generators = {
    // ---- GRADE 3 TOPICS ----
    "gr3_b1": function(diff) {
      const num = randInt(105, 995);
      const h = Math.floor(num / 100);
      const t = Math.floor((num % 100) / 10);
      const o = num % 10;
      const type = randInt(1, 3);

      if (type === 1) {
        return {
          question: `In the number ${num}, what digit is in the tens place?`,
          answer: t,
          hints: [
            "Remember place value order from right to left: Ones, Tens, Hundreds.",
            `In ${num}, ${h} is Hundreds, ${t} is Tens, and ${o} is Ones.`,
            `The digit in the tens place is ${t}.`
          ],
          solution: `${num} has ${h} hundreds (${h*100}), ${t} tens (${t*10}), and ${o} ones (${o}). Digit in tens place = ${t}.`
        };
      } else if (type === 2) {
        return {
          question: `What is the expanded form value of ${h} hundreds + ${t} tens + ${o} ones?`,
          answer: num,
          hints: [
            `${h} hundreds = ${h * 100}`,
            `${t} tens = ${t * 10}, and ${o} ones = ${o}`,
            `Add them together: ${h*100} + ${t*10} + ${o} = ${num}.`
          ],
          solution: `${h} hundreds (${h*100}) + ${t} tens (${t*10}) + ${o} ones (${o}) = ${num}.`
        };
      } else {
        const val = h * 100;
        return {
          question: `In the number ${num}, what is the total value of the hundreds digit (${h})?`,
          answer: val,
          hints: [
            "The digit is in the Hundreds column.",
            `Multiply the digit ${h} by 100.`,
            `${h} × 100 = ${val}.`
          ],
          solution: `The digit ${h} represents ${h} hundreds, which equals ${val}.`
        };
      }
    },

    "gr3_b2": function(diff) {
      const isAdd = Math.random() > 0.4;
      if (isAdd) {
        const a = randInt(125, 450);
        const b = randInt(125, 450);
        const ans = a + b;
        return {
          question: `Calculate: ${a} + ${b}`,
          answer: ans,
          hints: [
            "Add the ones first, then tens, then hundreds.",
            `Ones: ${a%10} + ${b%10} = ${a%10 + b%10}.`,
            `Total sum is ${ans}.`
          ],
          solution: `${a} + ${b} = ${ans}.`
        };
      } else {
        const a = randInt(350, 950);
        const b = randInt(120, a - 50);
        const ans = a - b;
        return {
          question: `Calculate: ${a} - ${b}`,
          answer: ans,
          hints: [
            "Subtract ones column first, borrowing 1 ten if top number is smaller.",
            `Check your answer by adding: ${ans} + ${b} = ${a}.`,
            `The difference is ${ans}.`
          ],
          solution: `${a} - ${b} = ${ans}.`
        };
      }
    },

    "gr3_b3": function(diff) {
      const isMult = Math.random() > 0.4;
      const x = randInt(2, 9);
      const y = randInt(3, 9);
      if (isMult) {
        const ans = x * y;
        return {
          question: `What is ${x} × ${y}?`,
          answer: ans,
          hints: [
            `Think of ${x} groups of ${y}.`,
            `Skip count by ${x} ${y} times!`,
            `${x} × ${y} = ${ans}.`
          ],
          solution: `${x} × ${y} = ${ans}.`
        };
      } else {
        const prod = x * y;
        return {
          question: `Divide: ${prod} ÷ ${x}`,
          answer: y,
          hints: [
            `How many groups of ${x} fit into ${prod}?`,
            `What number times ${x} equals ${prod}?`,
            `${prod} ÷ ${x} = ${y}.`
          ],
          solution: `${prod} ÷ ${x} = ${y}.`
        };
      }
    },

    "gr3_b4": function(diff) {
      const den = pickRandom([3, 4, 5, 8, 10]);
      const num = randInt(1, den - 1);
      return {
        question: `A pizza is sliced into ${den} equal parts. You eat ${num} slices. What fraction of the pizza did you eat? (Format as a/b)`,
        answer: `${num}/${den}`,
        hints: [
          "Fractions are written as (Numerator / Denominator).",
          "Numerator = number of eaten slices. Denominator = total slices.",
          `Answer is ${num}/${den}.`
        ],
        solution: `You ate ${num} out of ${den} equal slices = ${num}/${den}.`
      };
    },

    "gr3_c1": function(diff) {
      const start = randInt(2, 10);
      const step = randInt(3, 7);
      const seq = [start, start + step, start + step * 2, start + step * 3];
      const ans = start + step * 4;
      return {
        question: `Find the next number in this increasing pattern: ${seq.join(', ')}, __`,
        answer: ans,
        hints: [
          `Find the difference between consecutive terms (${seq[1]} - ${seq[0]} = ?).`,
          `The rule is: Add ${step} to the previous term.`,
          `Add ${step} to ${seq[3]}: ${seq[3]} + ${step} = ${ans}.`
        ],
        solution: `Pattern rule: Start at ${start}, add ${step} each time. Next term: ${seq[3]} + ${step} = ${ans}.`
      };
    },

    "gr3_c2": function(diff) {
      const a = randInt(6, 25);
      const ans = randInt(8, 30);
      const total = a + ans;
      return {
        question: `Solve for the missing number: ${a} + ? = ${total}`,
        answer: ans,
        hints: [
          "Use subtraction to find the unknown missing value.",
          `Subtract ${a} from ${total}: ${total} - ${a}.`,
          `Missing value = ${ans}.`
        ],
        solution: `${total} - ${a} = ${ans}.`
      };
    },

    "gr3_c3": function(diff) {
      const step1 = randInt(5, 15);
      const step2 = randInt(2, 6);
      const ans = step1 * step2;
      return {
        question: `Follow the algorithm:\nStep 1: Start with ${step1}.\nStep 2: Multiply by ${step2}.\nWhat is the final result?`,
        answer: ans,
        hints: [
          `Step 1 gives ${step1}.`,
          `Multiply ${step1} by ${step2}.`,
          `${step1} × ${step2} = ${ans}.`
        ],
        solution: `Algorithm result: ${step1} × ${step2} = ${ans}.`
      };
    },

    "gr3_d1": function(diff) {
      const cats = ["Apples", "Bananas", "Oranges"];
      const valA = randInt(2, 6) * 2;
      const valB = randInt(2, 6) * 2;
      const ans = valA + valB;
      return {
        question: `In a fruit survey: Ben counted ${valA} Apples and ${valB} Bananas. How many total Apples and Bananas were counted?`,
        answer: ans,
        hints: [
          "Add the counts for Apples and Bananas together.",
          `${valA} + ${valB}`,
          `Total = ${ans}.`
        ],
        solution: `${valA} + ${valB} = ${ans}.`
      };
    },

    "gr3_d2": function(diff) {
      const type = randInt(1, 2);
      if (type === 1) {
        return {
          question: `You roll a standard 6-sided die. What is the likelihood of rolling a number 8? (Choose: Impossible, Certain, Likely)`,
          answer: "impossible",
          hints: [
            "A standard die has numbers 1, 2, 3, 4, 5, and 6.",
            "Can a die roll an 8?",
            "It is impossible!"
          ],
          solution: "Since a 6-sided die only has numbers 1 to 6, rolling an 8 is impossible."
        };
      } else {
        return {
          question: `A bag contains 9 blue marbles and 1 red marble. If you pick 1 marble without looking, picking a blue marble is: (Choose: Likely, Unlikely, Impossible)`,
          answer: "likely",
          hints: [
            "Compare the number of blue marbles (9) to red marbles (1).",
            "Almost all marbles in the bag are blue.",
            "Picking a blue marble is likely."
          ],
          solution: "9 out of 10 marbles are blue, making it highly likely to pick a blue marble."
        };
      }
    },

    "gr3_e1": function(diff) {
      const shapes = [
        { name: "Cube", vert: 8, faces: 6, edges: 12 },
        { name: "Square Pyramid", vert: 5, faces: 5, edges: 8 },
        { name: "Triangle", sides: 3, vert: 3 }
      ];
      const s = pickRandom(shapes);
      if (s.faces) {
        return {
          question: `How many vertices (corners) does a 3D ${s.name} have?`,
          answer: s.vert,
          hints: [
            `A vertex is a point where edges meet on a 3D object.`,
            `Count the top and bottom corner points of a ${s.name}.`,
            `A ${s.name} has ${s.vert} vertices.`
          ],
          solution: `A ${s.name} has ${s.vert} vertices, ${s.faces} faces, and ${s.edges} edges.`
        };
      } else {
        return {
          question: `How many sides does a 2D ${s.name} have?`,
          answer: s.sides,
          hints: [
            `A 2D polygon has straight line segments called sides.`,
            `A ${s.name} has 3 angles and 3 sides.`,
            `Answer is ${s.sides}.`
          ],
          solution: `A ${s.name} has ${s.sides} sides.`
        };
      }
    },

    "gr3_e2": function(diff) {
      const len = randInt(4, 12);
      const wid = randInt(3, 8);
      const isPerim = Math.random() > 0.5;
      if (isPerim) {
        const perim = 2 * (len + wid);
        return {
          question: `Find the perimeter of a rectangle with length ${len} cm and width ${wid} cm. (in cm)`,
          answer: perim,
          hints: [
            "Perimeter is the total distance around all 4 sides.",
            `Formula: Perimeter = Length + Width + Length + Width`,
            `${len} + ${wid} + ${len} + ${wid} = ${perim} cm.`
          ],
          solution: `Perimeter = 2 × (${len} + ${wid}) = ${perim} cm.`
        };
      } else {
        const area = len * wid;
        return {
          question: `Find the area of a rectangle with length ${len} cm and width ${wid} cm. (in sq cm)`,
          answer: area,
          hints: [
            "Area is the space inside a shape.",
            `Formula: Area = Length × Width`,
            `${len} × ${wid} = ${area} sq cm.`
          ],
          solution: `Area = ${len} × ${wid} = ${area} sq cm.`
        };
      }
    },

    "gr3_f1": function(diff) {
      const itemCost = randInt(2, 8) + 0.5; // e.g. 4.50
      const paid = 10.0;
      const change = round2(paid - itemCost);
      return {
        question: `You buy a storybook for $${itemCost.toFixed(2)} and pay with a $10.00 bill. How much change should you get back?`,
        answer: change,
        hints: [
          "Subtract the book price from $10.00.",
          `$10.00 - $${itemCost.toFixed(2)}`,
          `Change = $${change.toFixed(2)}.`
        ],
        solution: `$10.00 - $${itemCost.toFixed(2)} = $${change.toFixed(2)}.`
      };
    },

    // ---- GRADE 8 TOPICS ----
    "gr8_b1": function(diff) {
      const a = randInt(-12, 12);
      const b = randInt(-12, 12);
      const op = pickRandom(['+', '-', '×']);
      let ans, qStr;
      if (op === '+') {
        ans = a + b;
        qStr = `Calculate: (${a}) + (${b})`;
      } else if (op === '-') {
        ans = a - b;
        qStr = `Calculate: (${a}) - (${b})`;
      } else {
        ans = a * b;
        qStr = `Calculate: (${a}) × (${b})`;
      }
      return {
        question: qStr,
        answer: ans,
        hints: [
          "Remember integer sign rules!",
          op === '×' ? "Same signs = Positive. Different signs = Negative." : "Subtracting a negative is adding a positive!",
          `Answer is ${ans}.`
        ],
        solution: `${qStr} = ${ans}.`
      };
    },

    "gr8_b2": function(diff) {
      const a = randInt(2, 6);
      const b = randInt(2, 5);
      const c = randInt(3, 8);
      // a + b * (c - 1)
      const ans = a + b * (c - 1);
      return {
        question: `Evaluate using BEDMAS: ${a} + ${b} × (${c} - 1)`,
        answer: ans,
        hints: [
          `Brackets first: (${c} - 1) = ${c - 1}.`,
          `Next, multiply: ${b} × ${c - 1} = ${b * (c - 1)}.`,
          `Finally, add: ${a} + ${b * (c - 1)} = ${ans}.`
        ],
        solution: `${a} + ${b} × (${c} - 1) = ${a} + ${b} × ${c - 1} = ${a} + ${b * (c - 1)} = ${ans}.`
      };
    },

    "gr8_b3": function(diff) {
      const type = randInt(1, 2);
      if (type === 1) {
        const base = randInt(2, 8);
        const exp = randInt(2, 3);
        const ans = Math.pow(base, exp);
        return {
          question: `Evaluate the power: ${base}^${exp}`,
          answer: ans,
          hints: [
            `${base}^${exp} means multiplying ${base} by itself ${exp} times.`,
            exp === 2 ? `${base} × ${base}` : `${base} × ${base} × ${base}`,
            `${base}^${exp} = ${ans}.`
          ],
          solution: `${base}^${exp} = ${ans}.`
        };
      } else {
        const sq = pickRandom([16, 25, 36, 49, 64, 81, 100, 121, 144]);
        const ans = Math.sqrt(sq);
        return {
          question: `Evaluate the square root: √${sq}`,
          answer: ans,
          hints: [
            `What positive number multiplied by itself equals ${sq}?`,
            `Check numbers: 5×5=25, 6×6=36, etc.`,
            `√${sq} = ${ans}.`
          ],
          solution: `√${sq} = ${ans} because ${ans} × ${ans} = ${sq}.`
        };
      }
    },

    "gr8_b4": function(diff) {
      const count1 = randInt(2, 5);
      const unitCost = randInt(3, 9) + 0.5; // e.g. 4.5
      const total1 = round2(count1 * unitCost);
      const count2 = randInt(6, 12);
      const ans = round2(count2 * unitCost);
      return {
        question: `If ${count1} notebooks cost $${total1.toFixed(2)}, how much will ${count2} notebooks cost at the same unit rate?`,
        answer: ans,
        hints: [
          `Find the unit price for 1 notebook first: $${total1.toFixed(2)} ÷ ${count1} = $${unitCost.toFixed(2)}.`,
          `Multiply the unit price by ${count2}: $${unitCost.toFixed(2)} × ${count2}.`,
          `Total cost = $${ans.toFixed(2)}.`
        ],
        solution: `Unit cost = $${total1.toFixed(2)} / ${count1} = $${unitCost.toFixed(2)} per notebook. For ${count2} notebooks: ${count2} × $${unitCost.toFixed(2)} = $${ans.toFixed(2)}.`
      };
    },

    "gr8_c1": function(diff) {
      const a = randInt(2, 6);
      const b = randInt(2, 7);
      const c = randInt(1, 5);
      // a(x + b) - c*x = (a-c)x + a*b
      const coeff = a - c;
      const constVal = a * b;
      const ansStr = `${coeff}x + ${constVal}`;
      return {
        question: `Simplify the algebraic expression: ${a}(x + ${b}) - ${c}x`,
        answer: ansStr,
        hints: [
          `Expand the bracket first: ${a} × x + ${a} × ${b} = ${a}x + ${a * b}.`,
          `Combine like terms (${a}x - ${c}x): (${a} - ${c})x = ${coeff}x.`,
          `Simplified expression: ${coeff}x + ${constVal}.`
        ],
        solution: `${a}(x + ${b}) - ${c}x = ${a}x + ${constVal} - ${c}x = ${coeff}x + ${constVal}.`
      };
    },

    "gr8_c2": function(diff) {
      const m = randInt(2, 7);
      const x = randInt(2, 9);
      const b = randInt(3, 15);
      const total = m * x + b;
      return {
        question: `Solve for x: ${m}x + ${b} = ${total}`,
        answer: x,
        hints: [
          `Subtract ${b} from both sides: ${m}x = ${total} - ${b} = ${total - b}.`,
          `Divide both sides by ${m}: x = ${total - b} ÷ ${m}.`,
          `x = ${x}.`
        ],
        solution: `${m}x + ${b} = ${total} ➔ ${m}x = ${total - b} ➔ x = ${x}.`
      };
    },

    "gr8_c3": function(diff) {
      const m = randInt(3, 8);
      const b = randInt(5, 20);
      return {
        question: `A phone plan charges a $${b} initial monthly fee plus $${m} per GB of data (y = ${m}x + ${b}). What is the rate of change (slope m)?`,
        answer: m,
        hints: [
          "In the linear equation y = mx + b, 'm' represents the rate of change per unit.",
          `Look at the coefficient in front of x in y = ${m}x + ${b}.`,
          `Rate of change = ${m}.`
        ],
        solution: `In y = mx + b, m is the rate of change. For y = ${m}x + ${b}, rate of change = ${m}.`
      };
    },

    "gr8_d1": function(diff) {
      const set = [randInt(2, 6), randInt(4, 8), randInt(6, 10), randInt(8, 12), randInt(10, 14)];
      set.sort((a,b)=>a-b);
      const sum = set.reduce((a,b)=>a+b, 0);
      const mean = round2(sum / set.length);
      const median = set[2];
      return {
        question: `For the dataset [${set.join(', ')}], calculate the Mean (average).`,
        answer: mean,
        hints: [
          `Mean = Sum of all numbers ÷ Total count of numbers (${set.length}).`,
          `Sum = ${set.join(' + ')} = ${sum}.`,
          `Mean = ${sum} ÷ ${set.length} = ${mean}.`
        ],
        solution: `Sum = ${sum}. Count = 5. Mean = ${sum} / 5 = ${mean}.`
      };
    },

    "gr8_d2": function(diff) {
      return {
        question: `In a study comparing hours of math practice (x) to exam scores (y), as hours increase, exam scores increase. What type of correlation is this? (Choose: Positive, Negative, No Correlation)`,
        answer: "positive",
        hints: [
          "When both variables increase together, the trend line slopes upward.",
          "An upward slope indicates a positive relationship.",
          "Correlation = Positive."
        ],
        solution: "Both variables increase together, creating a Positive correlation."
      };
    },

    "gr8_d3": function(diff) {
      return {
        question: `You roll a fair 6-sided die twice. What is the probability of rolling a '6' on the first roll AND a '6' on the second roll? (Format as fraction 1/b)`,
        answer: "1/36",
        hints: [
          "The rolls are independent events.",
          "P(6 on roll 1) = 1/6. P(6 on roll 2) = 1/6.",
          "Multiply probabilities: (1/6) × (1/6) = 1/36."
        ],
        solution: `P(6 and 6) = (1/6) × (1/6) = 1/36.`
      };
    },

    "gr8_e1": function(diff) {
      const triples = [
        {a: 3, b: 4, c: 5},
        {a: 5, b: 12, c: 13},
        {a: 6, b: 8, c: 10},
        {a: 8, b: 15, c: 17},
        {a: 9, b: 12, c: 15}
      ];
      const t = pickRandom(triples);
      return {
        question: `In a right triangle with leg a = ${t.a} cm and leg b = ${t.b} cm, find the hypotenuse c using a² + b² = c². (in cm)`,
        answer: t.c,
        hints: [
          `Pythagorean Theorem: c² = a² + b²`,
          `c² = ${t.a}² + ${t.b}² = ${t.a*t.a} + ${t.b*t.b} = ${t.c*t.c}`,
          `c = √${t.c*t.c} = ${t.c} cm.`
        ],
        solution: `c² = ${t.a}² + ${t.b}² = ${t.c*t.c} ➔ c = ${t.c} cm.`
      };
    },

    "gr8_e2": function(diff) {
      const a = randInt(35, 75);
      const b = randInt(40, 70);
      const c = 180 - (a + b);
      return {
        question: `In a triangle, two of the interior angles measure ${a}° and ${b}°. What is the measure of the third angle? (in degrees)`,
        answer: c,
        hints: [
          "The interior angles of any triangle always add up to 180°.",
          `Add known angles: ${a} + ${b} = ${a + b}°.`,
          `Third angle = 180° - ${a + b}° = ${c}°.`
        ],
        solution: `180° - (${a}° + ${b}°) = ${c}°.`
      };
    },

    "gr8_e3": function(diff) {
      const r = randInt(2, 5);
      const h = randInt(6, 12);
      // Volume = pi * r^2 * h (pi ~ 3.14)
      const vol = round2(3.14 * r * r * h);
      return {
        question: `Calculate the volume of a cylinder with radius r = ${r} cm and height h = ${h} cm (use π ≈ 3.14). (in cm³)`,
        answer: vol,
        hints: [
          `Cylinder Volume formula: V = π × r² × h`,
          `r² = ${r}² = ${r*r}. Base area = 3.14 × ${r*r} = ${(3.14*r*r).toFixed(2)}.`,
          `V = ${(3.14*r*r).toFixed(2)} × ${h} = ${vol} cm³.`
        ],
        solution: `V = 3.14 × ${r}² × ${h} = ${vol} cm³.`
      };
    },

    "gr8_f1": function(diff) {
      const price = randInt(40, 150);
      const hst = round2(price * 0.13);
      const total = round2(price * 1.13);
      return {
        question: `A pair of shoes costs $${price}.00 in Ottawa. With Ontario's 13% Harmonized Sales Tax (HST), what is the total price?`,
        answer: total,
        hints: [
          `Calculate 13% tax: $${price} × 0.13 = $${hst.toFixed(2)}.`,
          `Add tax to original price: $${price} + $${hst.toFixed(2)}.`,
          `Total price = $${total.toFixed(2)}.`
        ],
        solution: `$${price} × 1.13 = $${total.toFixed(2)}.`
      };
    },

    "gr8_f2": function(diff) {
      const p1 = 4.80; // 600g -> 4.80 / 6 = 0.80 per 100g
      const p2 = 7.50; // 1000g -> 7.50 / 10 = 0.75 per 100g
      return {
        question: `Brand A sells 600g of cereal for $4.80 ($0.80 per 100g). Brand B sells 1000g of the same cereal for $7.50 ($0.75 per 100g). Which brand is the best buy? (Choose: Brand A, Brand B)`,
        answer: "brand b",
        hints: [
          "The best buy is the product with the lower unit price per 100g.",
          "Brand A unit price = $0.80 / 100g. Brand B unit price = $0.75 / 100g.",
          "Brand B is cheaper per 100g!"
        ],
        solution: "Brand B has a lower unit price ($0.75/100g vs $0.80/100g) and is therefore the Best Buy."
      };
    },

    "gr3_b5": function(diff) {
      const num = randInt(12, 98);
      const nearest10 = Math.round(num / 10) * 10;
      return {
        question: `Round the number ${num} to the nearest ten.`,
        answer: nearest10,
        hints: [
          `Look at the ones digit of ${num} (${num % 10}).`,
          num % 10 >= 5 ? "Ones digit is 5 or greater, so round UP!" : "Ones digit is 4 or less, so round DOWN!",
          `${num} rounded to nearest 10 is ${nearest10}.`
        ],
        solution: `${num} rounded to nearest ten = ${nearest10}.`
      };
    },

    "gr3_e3": function(diff) {
      const m = randInt(2, 9);
      const cm = m * 100;
      return {
        question: `Convert ${m} metres into centimetres. (1 m = 100 cm)`,
        answer: cm,
        hints: [
          "There are 100 centimetres in 1 metre.",
          `Multiply ${m} by 100: ${m} × 100.`,
          `Answer = ${cm} cm.`
        ],
        solution: `${m} m × 100 = ${cm} cm.`
      };
    },

    "gr3_e4": function(diff) {
      const startHour = randInt(1, 4);
      const durMins = randInt(2, 5) * 10; // e.g. 30
      const endMins = 15 + durMins;
      return {
        question: `A soccer match starts at ${startHour}:15 PM and runs for ${durMins} minutes. At what time does it finish? (Format H:MM PM)`,
        answer: `${startHour}:${endMins} PM`,
        hints: [
          `Add ${durMins} minutes to the start minute (15 + ${durMins} = ${endMins}).`,
          `Hour remains ${startHour}.`,
          `Finish time is ${startHour}:${endMins} PM.`
        ],
        solution: `${startHour}:15 PM + ${durMins} mins = ${startHour}:${endMins} PM.`
      };
    },

    "gr3_f2": function(diff) {
      const item1 = randInt(3, 7) + 0.5;
      const item2 = randInt(2, 5);
      const total = item1 + item2;
      const paid = 20.0;
      const change = round2(paid - total);
      return {
        question: `You buy a puzzle for $${item1.toFixed(2)} and markers for $${item2.toFixed(2)}. You pay with a $20.00 bill. How much change do you receive?`,
        answer: change,
        hints: [
          `Find total cost first: $${item1.toFixed(2)} + $${item2.toFixed(2)} = $${total.toFixed(2)}.`,
          `Subtract total cost from $20.00: $20.00 - $${total.toFixed(2)}.`,
          `Change = $${change.toFixed(2)}.`
        ],
        solution: `Total = $${total.toFixed(2)}. Change = $20.00 - $${total.toFixed(2)} = $${change.toFixed(2)}.`
      };
    },

    "gr8_b5": function(diff) {
      const num = 3;
      const den = 4;
      const pct = 75;
      return {
        question: `Convert the fraction 3/4 into a percentage (%).`,
        answer: 75,
        hints: [
          "Divide numerator by denominator: 3 ÷ 4 = 0.75.",
          "Multiply by 100 to convert decimal to percentage: 0.75 × 100.",
          "Answer = 75%."
        ],
        solution: `3/4 = 0.75 = 75%.`
      };
    },

    "gr8_c4": function(diff) {
      const deposit = 40;
      const monthly = 15;
      const months = randInt(3, 8);
      const total = deposit + monthly * months;
      return {
        question: `A music streaming membership charges a $${deposit} flat fee plus $${monthly} per month (40 + 15m = ${total}). How many months (m) was the membership active?`,
        answer: months,
        hints: [
          `Subtract flat fee $${deposit} from total $${total}: ${total} - ${deposit} = ${total - deposit}.`,
          `Divide by monthly rate $${monthly}: ${total - deposit} ÷ ${monthly}.`,
          `m = ${months} months.`
        ],
        solution: `40 + 15m = ${total} ➔ 15m = ${total - deposit} ➔ m = ${months} months.`
      };
    },

    "gr8_e4": function(diff) {
      const angle = randInt(45, 85);
      return {
        question: `Two parallel lines are cut by a transversal. If angle A is ${angle}°, what is the measure of its Alternate Interior (Z-angle) B? (in degrees)`,
        answer: angle,
        hints: [
          "Alternate interior angles (Z-angles) are ALWAYS equal when lines are parallel.",
          `Angle A = ${angle}°.`,
          `Therefore, Angle B = ${angle}°.`
        ],
        solution: `Alternate interior angles are equal ➔ Angle B = ${angle}°.`
      };
    },

    "gr8_f3": function(diff) {
      const p = 500;
      const rate = 0.05; // 5%
      const t = randInt(2, 4);
      const interest = round2(p * rate * t);
      return {
        question: `Calculate the simple interest earned on a principal deposit of $${p} at an annual interest rate of 5% for ${t} years (I = P × r × t).`,
        answer: interest,
        hints: [
          "Simple interest formula: I = P × r × t",
          `P = $${p}, r = 0.05, t = ${t}`,
          `I = ${p} × 0.05 × ${t} = $${interest}.`
        ],
        solution: `I = 500 × 0.05 × ${t} = $${interest}.`
      };
    },

    "gr3_b6": function(diff) {
      const a = randInt(2, 5);
      const b = randInt(2, 4);
      const c = randInt(1, 5);
      const startMoney = randInt(10, 20);
      const totalCost = (a * b) + c;
      const change = startMoney - totalCost;
      return {
        question: `You buy ${a} apples for $${b} each, and a juice for $${c}. If you pay with a $${startMoney} bill, how much change do you get?`,
        answer: change,
        hints: [
          `First, find the cost of apples: ${a} × $${b}.`,
          `Next, add the juice: $${a * b} + $${c}.`,
          `Finally, subtract from $${startMoney}: $${startMoney} - $${totalCost}.`
        ],
        solution: `Apples: ${a} × ${b} = ${a * b}. Total: ${a * b} + ${c} = ${totalCost}. Change: ${startMoney} - ${totalCost} = ${change}.`
      };
    },

    "gr3_d3": function(diff) {
      const total = randInt(20, 40);
      const barA = randInt(5, 12);
      const barB = randInt(5, 12);
      const missing = total - barA - barB;
      return {
        question: `A class read ${total} books in total. Ben read ${barA}, Ali read ${barB}, and Sam read the rest. How many did Sam read?`,
        answer: missing,
        hints: [
          `Find how many Ben and Ali read together: ${barA} + ${barB}.`,
          `Subtract that from the total ${total}.`,
          `Sam read ${total} - ${barA + barB} = ${missing}.`
        ],
        solution: `Ben + Ali = ${barA + barB}. Sam = ${total} - ${barA + barB} = ${missing}.`
      };
    },

    "gr3_e5": function(diff) {
      const startX = randInt(1, 4);
      const startY = randInt(1, 4);
      const moveRight = randInt(1, 3);
      const moveUp = randInt(1, 3);
      return {
        question: `Start at grid point (${startX}, ${startY}). If you move ${moveRight} units RIGHT and ${moveUp} units UP, what is your new point? (Format: x,y)`,
        answer: `${startX + moveRight},${startY + moveUp}`,
        hints: [
          `RIGHT means adding to the first number (x): ${startX} + ${moveRight}.`,
          `UP means adding to the second number (y): ${startY} + ${moveUp}.`,
          `New point is (${startX + moveRight}, ${startY + moveUp}).`
        ],
        solution: `X: ${startX} + ${moveRight} = ${startX + moveRight}. Y: ${startY} + ${moveUp} = ${startY + moveUp}. Point: (${startX + moveRight},${startY + moveUp}).`
      };
    },

    "gr8_c5": function(diff) {
      const x = randInt(1, 5);
      const m1 = randInt(2, 5);
      const b1 = randInt(2, 10);
      const y = m1 * x + b1;
      const m2 = m1 + randInt(1, 3);
      const b2 = y - (m2 * x); // so they intersect at (x, y)
      
      return {
        question: `Find the x-coordinate where y = ${m1}x + ${b1} and y = ${m2}x + ${b2} intersect.`,
        answer: x,
        hints: [
          `Set equations equal: ${m1}x + ${b1} = ${m2}x + ${b2}.`,
          `Move x terms to one side and numbers to the other.`,
          `Solve for x.`
        ],
        solution: `${m1}x + ${b1} = ${m2}x + ${b2} ➔ ${m2 - m1}x = ${b1 - b2} ➔ x = ${x}.`
      };
    },

    "gr8_c6": function(diff) {
      const a = 1; 
      const b = randInt(1, 3);
      const c = randInt(1, 5);
      const seq = [];
      for (let i = 1; i <= 4; i++) {
        seq.push(a*i*i + b*i + c);
      }
      const ans = a*25 + b*5 + c; // next term
      return {
        question: `Find the 5th term of the non-linear pattern: ${seq.join(', ')}, __`,
        answer: ans,
        hints: [
          `Find the first differences between terms.`,
          `If they aren't equal, find the second differences (difference of the differences).`,
          `Apply the constant second difference to find the next first difference, then the next term.`
        ],
        solution: `This is a quadratic pattern (n²). The 5th term is ${ans}.`
      };
    },

    "gr8_d4": function(diff) {
      const red = randInt(2, 5);
      const blue = randInt(2, 5);
      const total = red + blue;
      const num = red * blue;
      const den = total * (total - 1);
      
      return {
        question: `A bag has ${red} red and ${blue} blue marbles. You draw 2 marbles without replacement. What is the probability of Red then Blue? (Format as a/b)`,
        answer: `${num}/${den}`,
        hints: [
          `First draw Red: ${red}/${total}.`,
          `Second draw Blue (one less marble in bag): ${blue}/${total - 1}.`,
          `Multiply them: (${red}/${total}) × (${blue}/${total - 1}).`
        ],
        solution: `P(Red then Blue) = (${red}/${total}) × (${blue}/${total - 1}) = ${num}/${den}.`
      };
    },

    "gr8_e5": function(diff) {
      const s = randInt(2, 5);
      const sa = 10 * s * s;
      return {
        question: `Two identical cubes with side length ${s} cm are glued together face-to-face. What is the total surface area? (in cm²)`,
        answer: sa,
        hints: [
          `One cube has 6 faces. Each face has area ${s} × ${s} = ${s*s}.`,
          `Two separate cubes have 12 faces total.`,
          `When glued together, 2 faces are hidden inside. So you only count 10 faces.`
        ],
        solution: `Each face is ${s*s} cm². 10 exposed faces = 10 × ${s*s} = ${sa} cm².`
      };
    }
  };

  function generateQuestion(topicId, difficulty = "builder") {
    if (generators[topicId]) {
      return generators[topicId](difficulty);
    }
    // Fallback simple addition
    const a = randInt(5, 20);
    const b = randInt(5, 20);
    return {
      question: `Calculate: ${a} + ${b}`,
      answer: a + b,
      hints: ["Add the two numbers together.", `${a} + ${b} = ${a+b}`],
      solution: `${a} + ${b} = ${a+b}`
    };
  }

  function generateQuiz(grade = "grade3", questionCount = 5) {
    const curriculum = exports.KIDS_MATH_CURRICULUM ? exports.KIDS_MATH_CURRICULUM[grade] : null;
    if (!curriculum) return [];

    const allTopics = [];
    curriculum.strands.forEach(strand => {
      strand.topics.forEach(t => allTopics.push(t));
    });

    const quiz = [];
    for (let i = 0; i < questionCount; i++) {
      const topic = pickRandom(allTopics);
      const q = generateQuestion(topic.id);
      quiz.push({
        topicId: topic.id,
        topicTitle: topic.title,
        strandCode: topic.code,
        ...q
      });
    }
    return quiz;
  }

  // Export engine
  exports.MathEngine = {
    verifyAnswer: verifyAnswer,
    generateQuestion: generateQuestion,
    generateQuiz: generateQuiz
  };

})(typeof window !== 'undefined' ? window : global);
