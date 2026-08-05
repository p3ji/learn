/**
 * OCDSB / Ontario Curriculum Dataset for Kids Math App (Grades 3 & 8)
 * Expanded Edition: High Variety & Deep Problem Coverage
 */

window.KIDS_MATH_CURRICULUM = {
  grade3: {
    title: "Grade 3 Math (OCDSB Primary)",
    description: "Build strong foundations in numbers, operations, geometry, patterns, data, time, metric units, and Canadian currency.",
    strands: [
      {
        id: "strand_b",
        code: "Strand B",
        name: "Number & Operations",
        icon: "🔢",
        color: "#4F46E5",
        topics: [
          {
            id: "gr3_b1",
            code: "B1.1, B1.2",
            title: "Place Value & Numbers to 1,000",
            summary: "Understand hundreds, tens, and ones in numbers up to 1000.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-place-value-and-rounding",
            cheatSheet: {
              rule: "Every digit has a place value: Hundreds (100s), Tens (10s), Ones (1s).",
              example: "In 458: 4 hundreds (400), 5 tens (50), 8 ones (8). 400 + 50 + 8 = 458.",
              tip: "Compare largest place values first! 512 is greater than 499."
            }
          },
          {
            id: "gr3_b2",
            code: "B2.1, B2.2",
            title: "Addition & Subtraction with Regrouping",
            summary: "Add and subtract 2-digit and 3-digit numbers using column methods.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-addition-subtraction-and-estimation",
            cheatSheet: {
              rule: "When ones add to 10 or more, carry 1 ten over. When subtracting, borrow 1 ten if needed.",
              example: "37 + 28 ➔ 7+8=15 (write 5, carry 1), 3+2+1=6 ➔ Total: 65.",
              tip: "Align digits by place value."
            }
          },
          {
            id: "gr3_b3",
            code: "B2.4",
            title: "Multiplication & Division Fundamentals",
            summary: "Understand equal groups, arrays, and multiplication facts (1-10).",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-multiplication-and-division",
            cheatSheet: {
              rule: "Multiplication is repeated addition. Division is sharing into equal groups.",
              example: "4 × 3 = 12 (4 groups of 3). 12 ÷ 4 = 3.",
              tip: "Think of arrays: 3 rows of 5 dots = 15 dots!"
            }
          },
          {
            id: "gr3_b4",
            code: "B1.6, B1.7",
            title: "Fractions of a Whole & Set",
            summary: "Recognize halves, thirds, fourths, fifths, and tenths.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-fractions",
            cheatSheet: {
              rule: "Numerator = parts counted, Denominator = total equal parts.",
              example: "1 out of 4 equal pizza slices = 1/4.",
              tip: "Bigger denominator = smaller individual slices!"
            }
          },
          {
            id: "gr3_b5",
            code: "B1.4",
            title: "Rounding to Nearest 10 and 100",
            summary: "Estimate numbers by rounding to the nearest ten or hundred.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-place-value-and-rounding",
            cheatSheet: {
              rule: "Look at the digit to the right. If it's 5 or more, round UP. If 4 or less, round DOWN.",
              example: "Round 47 to nearest 10 ➔ Ones digit is 7 (≥ 5), so round up to 50.",
              tip: "Rounding makes mental math estimation much faster!"
            }
          },
          {
            id: "gr3_b6",
            code: "B2.3",
            title: "Multi-Step EQAO Word Problems",
            summary: "Solve real-world problems requiring two or more operations.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-addition-subtraction-and-estimation",
            cheatSheet: {
              rule: "Read carefully to find all steps. Do one step at a time.",
              example: "Buy 3 apples for $2 each, then find change from $10. Step 1: 3 x 2 = 6. Step 2: 10 - 6 = 4.",
              tip: "Look for keywords like 'total', 'leftover', 'each', and 'shared'."
            }
          }
        ]
      },
      {
        id: "strand_c",
        code: "Strand C",
        name: "Algebra & Patterns",
        icon: "🧩",
        color: "#06B6D4",
        topics: [
          {
            id: "gr3_c1",
            code: "C1.1, C1.2",
            title: "Repeating & Increasing Patterns",
            summary: "Identify pattern rules and predict future terms.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-patterns-in-arithmetic",
            cheatSheet: {
              rule: "Subtract adjacent terms to find the rule.",
              example: "4, 8, 12, 16... Rule: Add 4 each time. Next term = 20.",
              tip: "Check if numbers are increasing or decreasing."
            }
          },
          {
            id: "gr3_c2",
            code: "C2.2",
            title: "Unknown Values & Balance Equations",
            summary: "Solve equations with missing numbers (e.g., 9 + ? = 23).",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-addition-subtraction-and-estimation",
            cheatSheet: {
              rule: "The '=' sign means both sides weigh equal amounts.",
              example: "15 + ? = 22 ➔ 22 - 15 = 7.",
              tip: "Addition undoes subtraction!"
            }
          },
          {
            id: "gr3_c3",
            code: "C3.1",
            title: "Algorithms & Sequential Logic",
            summary: "Follow step-by-step instructions to solve multi-step problems.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math",
            cheatSheet: {
              rule: "Execute instructions in exact numerical sequence.",
              example: "Step 1: Start at 10. Step 2: Multiply by 3 (30). Step 3: Subtract 5 (25).",
              tip: "Work through steps one at a time."
            }
          },
          {
            id: "gr3_c4",
            code: "C2.3",
            title: "Emoji Balance Scale Logic Puzzles",
            summary: "Find missing values using balance scale equations and substitution.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-addition-subtraction-and-estimation",
            cheatSheet: {
              rule: "Use known item values to solve for unknown items step-by-step.",
              example: "🍎 + 🍎 = 10 ➔ 🍎 = 5. 🍎 + 🍌 = 9 ➔ 5 + 🍌 = 9 ➔ 🍌 = 4.",
              tip: "Find the symbol that repeats on its own first!"
            }
          },
          {
            id: "gr3_c5",
            code: "C2.4",
            title: "Number Riddles & Secret Code Logic",
            summary: "Deduce secret 2-digit and 3-digit numbers using logical clue deduction.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-place-value-and-rounding",
            cheatSheet: {
              rule: "Combine digit place value clues (hundreds, tens, ones, sum, even/odd).",
              example: "Between 400 and 500, Tens = 3, Digits sum to 12 ➔ 4 + 3 + ? = 12 ➔ Ones = 5 ➔ Secret #: 435.",
              tip: "Test each clue one by one to narrow down possibilities."
            }
          },
          {
            id: "gr3_c6",
            code: "C1.3",
            title: "Visual Pattern Grids & Shape Logic",
            summary: "Solve matrix grid rules, shape transformations, and visual word logic.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-patterns-in-arithmetic",
            cheatSheet: {
              rule: "Look for relationships across rows and down columns in pattern grids.",
              example: "Row 1: (2, 4, 6), Row 2: (3, 6, 9), Row 3: (4, 8, ?) ➔ Rule: Multiply column by row number ➔ ? = 12.",
              tip: "Compare shapes and numbers horizontally and vertically!"
            }
          },
          {
            id: "gr3_c7",
            code: "C3.2",
            title: "Seating Arrangements & Positional Word Logic",
            summary: "Deduce seating positions, line-up orders, and pet/item pairings using positional clues.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-addition-subtraction-and-estimation",
            cheatSheet: {
              rule: "Start with fixed anchor clues (e.g. 'Seat 1'), then use 'beside' or 'between' clues to place the remaining friends.",
              example: "4 friends in Seats 1 to 4: Tom sits in Seat 1. Sally sits next to Tom (Seat 2). Maya is in Seat 4. ➔ Leo must be in Seat 3!",
              tip: "Draw a row of 4 boxes on paper to fill in each friend's name!"
            }
          }
        ]
      },
      {
        id: "strand_d",
        code: "Strand D",
        name: "Data & Probability",
        icon: "📊",
        color: "#10B981",
        topics: [
          {
            id: "gr3_d1",
            code: "D1.3, D1.4",
            title: "Bar Graphs & Pictographs",
            summary: "Read, interpret, and compare data in visual charts.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-represent-and-interpret-data",
            cheatSheet: {
              rule: "Always check the key! 1 symbol might equal 2 or 5 items.",
              example: "If 1 🍎 = 4 apples, then 3 symbols = 12 apples.",
              tip: "Read bar height against the vertical scale."
            }
          },
          {
            id: "gr3_d2",
            code: "D2.1",
            title: "Likelihood & Probability Terms",
            summary: "Describe events as Impossible, Unlikely, Equal Chance, Likely, or Certain.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math",
            cheatSheet: {
              rule: "Impossible = 0% chance. Certain = 100% chance.",
              example: "Rolling an 8 on a 6-sided die = Impossible.",
              tip: "Compare favorable outcomes vs total possible."
            }
          },
          {
            id: "gr3_d3",
            code: "D1.5",
            title: "Interpreting Incomplete Data",
            summary: "Find missing values in graphs when given the total or relationships.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-represent-and-interpret-data",
            cheatSheet: {
              rule: "Use what you know to find what you don't know.",
              example: "Total is 20. Bar A is 10, Bar B is 6. Bar C must be 20 - 10 - 6 = 4.",
              tip: "Subtract the known parts from the whole."
            }
          }
        ]
      },
      {
        id: "strand_e",
        code: "Strand E",
        name: "Spatial Sense & Measurement",
        icon: "📐",
        color: "#F59E0B",
        topics: [
          {
            id: "gr3_e1",
            code: "E1.1, E1.2",
            title: "2D Shapes & 3D Geometry",
            summary: "Count sides, vertices, faces, and edges of geometric shapes.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-geometry",
            cheatSheet: {
              rule: "2D shapes have side lengths and vertices. 3D objects have faces, edges, and vertices.",
              example: "Cube: 6 faces, 12 edges, 8 vertices.",
              tip: "A vertex is a corner where edges meet."
            }
          },
          {
            id: "gr3_e2",
            code: "E2.2, E2.5",
            title: "Perimeter & Area Basics",
            summary: "Calculate distance around a shape and count square units inside.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math/imp-perimeter-and-area",
            cheatSheet: {
              rule: "Perimeter = Add all side lengths. Area = Length × Width.",
              example: "Rectangle (4cm by 6cm) ➔ Perimeter = 20cm, Area = 24 sq cm.",
              tip: "Perimeter is in cm. Area is in square cm (cm²)."
            }
          },
          {
            id: "gr3_e3",
            code: "E2.1",
            title: "Metric Measurement Conversions",
            summary: "Convert between centimetres and metres, grams and kilograms, or millilitres and litres.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math",
            cheatSheet: {
              rule: "1 m = 100 cm | 1 kg = 1,000 g | 1 L = 1,000 mL.",
              example: "3 metres = 300 centimetres. 2,000 grams = 2 kilograms.",
              tip: "To go from big unit to small unit (m ➔ cm), multiply by 100!"
            }
          },
          {
            id: "gr3_e4",
            code: "E2.4",
            title: "Elapsed Time (Hours & Minutes)",
            summary: "Calculate start time, end time, and duration of activities.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math",
            cheatSheet: {
              rule: "60 minutes = 1 hour.",
              example: "Movie starts at 2:15 PM and lasts 1 hour and 30 minutes ➔ Ends at 3:45 PM.",
              tip: "Add hours first, then add minutes!"
            }
          },
          {
            id: "gr3_e5",
            code: "E1.3",
            title: "Map Grids & Coordinate Paths",
            summary: "Follow directions (up, down, left, right) on a grid to find locations.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math",
            cheatSheet: {
              rule: "Always start at the given point and move step by step.",
              example: "Start at (2,2). Go UP 2 and RIGHT 1. End at (3,4).",
              tip: "Check your 'lefts' and 'rights' carefully!"
            }
          }
        ]
      },
      {
        id: "strand_f",
        code: "Strand F",
        name: "Financial Literacy",
        icon: "💰",
        color: "#EC4899",
        topics: [
          {
            id: "gr3_f1",
            code: "F1.1, F1.2",
            title: "Canadian Money & Making Change to $10",
            summary: "Count money combinations and calculate change up to $10.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math",
            cheatSheet: {
              rule: "Coins: $0.05, $0.10, $0.25, $1.00, $2.00. Bills: $5, $10, $20.",
              example: "Item costs $3.50. You give $5.00 bill ➔ Change = $1.50.",
              tip: "Count up from item price to total given."
            }
          },
          {
            id: "gr3_f2",
            code: "F1.2",
            title: "Money Combinations & Change to $20",
            summary: "Solve multi-item shopping word problems with change up to $20.00.",
            khanUrl: "https://www.khanacademy.org/math/cc-third-grade-math",
            cheatSheet: {
              rule: "Total Cost = Item 1 + Item 2. Change = Cash Given - Total Cost.",
              example: "Buy toy ($6.50) + book ($4.00) = $10.50. Pay with $20 bill ➔ Change = $9.50.",
              tip: "Calculate total bill first before finding change!"
            }
          }
        ]
      }
    ]
  },

  grade8: {
    title: "Grade 8 Math (OCDSB Intermediate)",
    description: "Prepare for high school math with integers, BEDMAS, linear equations, Pythagorean theorem, geometry, and financial modeling.",
    strands: [
      {
        id: "strand_b",
        code: "Strand B",
        name: "Number & Rational Expressions",
        icon: "🔢",
        color: "#4F46E5",
        topics: [
          {
            id: "gr8_b1",
            code: "B2.1",
            title: "Operations with Integers (+, -, ×, ÷)",
            summary: "Master positive and negative integer rules.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-negative-numbers-add-sub",
            cheatSheet: {
              rule: "Multiplying/Dividing: Same signs = POSITIVE (+), Different signs = NEGATIVE (-). Subtracting negative = Adding positive.",
              example: "(-6) × (-4) = +24 | (-15) ÷ (+3) = -5 | (-8) - (-12) = +4",
              tip: "Two minuses next to each other become a plus!"
            }
          },
          {
            id: "gr8_b2",
            code: "B2.2",
            title: "Order of Operations (BEDMAS)",
            summary: "Evaluate complex expressions containing brackets, exponents, multiplication, division, addition, and subtraction.",
            khanUrl: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-arithmetic-operations",
            cheatSheet: {
              rule: "Brackets ➔ Exponents ➔ Division & Multiplication (Left to Right) ➔ Addition & Subtraction (Left to Right).",
              example: "3 + 4 × (2³ - 3) = 3 + 4 × (8-3) = 3 + 4 × 5 = 23",
              tip: "Do Division & Multiplication in left-to-right order as they appear."
            }
          },
          {
            id: "gr8_b3",
            code: "B1.1, B1.2",
            title: "Exponents, Powers & Square Roots",
            summary: "Evaluate powers and calculate perfect and non-perfect square roots.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-numbers-and-operations",
            cheatSheet: {
              rule: "a^b = multiply 'a' by itself 'b' times. √x is the positive number where n × n = x.",
              example: "5³ = 125. √64 = 8.",
              tip: "(-4)² = +16, but -4² = -16!"
            }
          },
          {
            id: "gr8_b4",
            code: "B2.3",
            title: "Ratios, Rates & Proportional Reasoning",
            summary: "Solve multi-step ratio, rate, and scale proportion problems.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion",
            cheatSheet: {
              rule: "Set up equal ratio fractions a/b = c/d and solve.",
              example: "3 notebooks cost $4.50 ➔ 1 notebook = $1.50 ➔ 10 notebooks = $15.00.",
              tip: "Always find unit rate (cost for 1) first."
            }
          },
          {
            id: "gr8_b5",
            code: "B1.3",
            title: "Converting Fractions, Decimals & Percentages",
            summary: "Convert fluidly between fraction, decimal, and percentage representations.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-fractions-decimals",
            cheatSheet: {
              rule: "Fraction to Decimal: Divide numerator by denominator. Decimal to Percent: Multiply by 100.",
              example: "3/4 = 0.75 = 75%.",
              tip: "To convert % to decimal, move decimal point 2 places left!"
            }
          },
          {
            id: "gr8_b6",
            code: "B1.1, B1.2",
            title: "Scientific Notation & Real Number System",
            summary: "Represent very large and small numbers (a × 10ⁿ) and classify rational vs irrational numbers.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-numbers-and-operations",
            cheatSheet: {
              rule: "Scientific notation: 1 ≤ a < 10. Large numbers have positive exponents (3.5 × 10⁶), small numbers negative (4.2 × 10⁻⁴).",
              example: "350,000 = 3.5 × 10⁵. 0.00072 = 7.2 × 10⁻⁴. Rational numbers can be written as a fraction a/b; Irrationals (√2, π) cannot.",
              tip: "Count decimal jumps to find the exponent n!"
            }
          },
          {
            id: "gr8_b7",
            code: "B2.3",
            title: "Mental Math: Powers of 10 Operations",
            summary: "Multiply and divide whole numbers and decimals up to thousandths by powers of 10.",
            khanUrl: "https://www.khanacademy.org/math/cc-fifth-grade-math/imp-place-value-and-decimals",
            cheatSheet: {
              rule: "Multiplying by 10ⁿ moves decimal point n places RIGHT. Dividing by 10ⁿ moves decimal point n places LEFT.",
              example: "4.58 × 1,000 = 4,580. 83.2 ÷ 100 = 0.832.",
              tip: "Count the zeros in the power of 10!"
            }
          },
          {
            id: "gr8_b8",
            code: "B2.5, B2.6",
            title: "Fraction Operations (+, -, ×, ÷)",
            summary: "Perform addition, subtraction, multiplication, and division with fractions and mixed numbers.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-fractions-decimals",
            cheatSheet: {
              rule: "Add/Sub: Common denominator required. Mult: (a/b) × (c/d) = (ac)/(bd). Div: Multiply by reciprocal (a/b) ÷ (c/d) = (a/b) × (d/c).",
              example: "(3/4) + (2/3) = (9/12) + (8/12) = 17/12 = 1 5/12. (3/4) ÷ (1/2) = (3/4) × (2/1) = 6/4 = 3/2 = 1 1/2.",
              tip: "Always convert mixed numbers to improper fractions before multiplying or dividing!"
            }
          }
        ]
      },
      {
        id: "strand_c",
        code: "Strand C",
        name: "Algebra & Linear Equations",
        icon: "🧩",
        color: "#06B6D4",
        topics: [
          {
            id: "gr8_c1",
            code: "C1.1",
            title: "Algebraic Expressions & Like Terms",
            summary: "Simplify expressions by combining like terms and applying distributive law.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-variables-expressions",
            cheatSheet: {
              rule: "Like terms have exact same variables & exponents. Distributive property: a(b+c) = ab+ac.",
              example: "3(2x + 4) - 5x = 6x + 12 - 5x = x + 12.",
              tip: "Combine x terms together and constant numbers together."
            }
          },
          {
            id: "gr8_c2",
            code: "C2.1",
            title: "Solving 1-Step & 2-Step Linear Equations",
            summary: "Isolate variables using inverse operations.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-linear-equations",
            cheatSheet: {
              rule: "Whatever you do to one side of '=', you must do to the other.",
              example: "4x - 7 = 21 ➔ 4x = 28 ➔ x = 7.",
              tip: "Undo addition/subtraction first, then multiplication/division."
            }
          },
          {
            id: "gr8_c3",
            code: "C1.3, C2.3",
            title: "Linear Relations & Table of Values (y = mx + b)",
            summary: "Graph linear patterns and identify rate of change (m) and initial value (b).",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-linear-equations",
            cheatSheet: {
              rule: "y = mx + b ➔ m = slope/rate of change, b = initial y-intercept.",
              example: "Taxi: $3 flat fee + $2/km ➔ y = 2x + 3.",
              tip: "Slope m = Rise / Run."
            }
          },
          {
            id: "gr8_c4",
            code: "C2.2",
            title: "Multi-Step Equation Modeling",
            summary: "Set up and solve linear equations from real-world story scenarios.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-linear-equations",
            cheatSheet: {
              rule: "Define unknown variable x. Translate words into math equation. Solve for x.",
              example: "A gym charges $40 deposit plus $15/month. Total paid = $145. 40 + 15m = 145 ➔ 15m = 105 ➔ m = 7 months.",
              tip: "Identify what stays constant (b) and what changes with x (m)."
            }
          },
          {
            id: "gr8_c5",
            code: "C2.4",
            title: "Systems of Linear Equations",
            summary: "Find the intersection point of two lines to solve advanced modeling problems.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-systems-of-equations",
            cheatSheet: {
              rule: "Set the equations equal to each other. If y = 2x+4 and y = 3x+1, then 2x+4 = 3x+1.",
              example: "Solve 2x+4 = 3x+1 ➔ 4 = x+1 ➔ x = 3. Find y: y = 2(3)+4 = 10. Point: (3,10).",
              tip: "The intersection is the break-even point where two plans cost the same."
            }
          },
          {
            id: "gr8_c6",
            code: "C1.4",
            title: "Non-Linear & Quadratic Sequences",
            summary: "Identify patterns where the change itself is changing.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math",
            cheatSheet: {
              rule: "If the first differences are not equal, check the second differences (difference between differences).",
              example: "1, 4, 9, 16... First differences: 3, 5, 7. Second differences: 2, 2. This is quadratic (n²).",
              tip: "Constant second differences mean it's a quadratic pattern."
            }
          },
          {
            id: "gr8_c7",
            code: "C2.4",
            title: "Linear Inequalities & Solution Sets",
            summary: "Solve and graph 1-step and 2-step linear inequalities involving integers.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-variables-expressions",
            cheatSheet: {
              rule: "Solve like an equation, but FLIP the inequality sign (< ➔ >) when multiplying or dividing by a negative number!",
              example: "-2x + 4 < 10 ➔ -2x < 6 ➔ x > -3.",
              tip: "Open circle for < or >, solid circle for ≤ or ≥."
            }
          },
          {
            id: "gr8_c8",
            code: "C3.1, C3.2",
            title: "Algorithmic Logic & Data Pseudocode Analysis",
            summary: "Trace conditional statements, loops, and data analysis code logic.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math",
            cheatSheet: {
              rule: "Follow variable assignments and IF-ELSE branch conditions in step-by-step order.",
              example: "x = 5; IF x > 3 THEN y = x * 2 ELSE y = x + 1 ➔ y = 10.",
              tip: "Test branch conditions carefully!"
            }
          }
        ]
      },
      {
        id: "strand_d",
        code: "Strand D",
        name: "Data, Statistics & Probability",
        icon: "📊",
        color: "#10B981",
        topics: [
          {
            id: "gr8_d1",
            code: "D1.2",
            title: "Central Tendency (Mean, Median, Mode, Range)",
            summary: "Analyze datasets and examine how outliers affect averages.",
            khanUrl: "https://www.khanacademy.org/math/cc-sixth-grade-math/cc-6th-data-statistics",
            cheatSheet: {
              rule: "Mean = Sum ÷ Count. Median = Middle value when ordered. Mode = Most frequent. Range = Max - Min.",
              example: "[4, 7, 7, 10, 12] ➔ Sum=40, Mean=8. Median=7, Mode=7, Range=8.",
              tip: "Extreme outliers pull the Mean away, but rarely affect Median."
            }
          },
          {
            id: "gr8_d2",
            code: "D1.3, D1.4",
            title: "Scatter Plots & Data Trends",
            summary: "Identify positive, negative, or no correlation in bivariate data.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-data-modeling",
            cheatSheet: {
              rule: "Positive correlation: x up, y up. Negative correlation: x up, y down.",
              example: "Study time vs Exam score = Positive correlation.",
              tip: "Draw a Line of Best Fit through the points."
            }
          },
          {
            id: "gr8_d3",
            code: "D2.1, D2.2",
            title: "Theoretical vs Experimental Probability",
            summary: "Calculate multi-event probabilities using tree diagrams and fractions.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-probability-statistics",
            cheatSheet: {
              rule: "Theoretical P = Favorable / Total. Independent: P(A and B) = P(A) × P(B).",
              example: "Rolling two 6s on 2 dice = (1/6) × (1/6) = 1/36.",
              tip: "More trials make experimental probability approach theoretical."
            }
          },
          {
            id: "gr8_d4",
            code: "D2.3",
            title: "Compound & Conditional Probability",
            summary: "Calculate probability of multiple events, including drawing without replacement.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-probability-statistics",
            cheatSheet: {
              rule: "Without replacement: The total number of items decreases for the second draw.",
              example: "3 red, 2 blue marbles. P(red then blue without replacement) = (3/5) × (2/4) = 6/20 = 3/10.",
              tip: "Always check if the first item was put back or kept!"
            }
          },
          {
            id: "gr8_d5",
            code: "D2.1",
            title: "Venn & Tree Diagram Probability",
            summary: "Model overlapping data sets and sample spaces using Venn diagrams and outcome tree diagrams.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-probability-statistics",
            cheatSheet: {
              rule: "Venn Diagram: P(A or B) = P(A) + P(B) - P(A and B). Tree Diagram: Multiply probabilities along branches.",
              example: "Group of 30 students: 18 play Soccer, 12 play Basketball, 5 play both. P(neither) = 30 - (18+12-5) = 5 ➔ 5/30 = 1/6.",
              tip: "Subtract the overlapping middle intersection first!"
            }
          }
        ]
      },
      {
        id: "strand_e",
        code: "Strand E",
        name: "Spatial Sense & Geometry",
        icon: "📐",
        color: "#F59E0B",
        topics: [
          {
            id: "gr8_e1",
            code: "E1.2",
            title: "Pythagorean Theorem (a² + b² = c²)",
            summary: "Calculate missing side lengths in right-angled triangles.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-pythagorean-theorem",
            cheatSheet: {
              rule: "a² + b² = c², where c is the hypotenuse opposite 90° angle.",
              example: "a=3, b=4 ➔ c² = 9 + 16 = 25 ➔ c = 5.",
              tip: "Hypotenuse c is ALWAYS the longest side."
            }
          },
          {
            id: "gr8_e2",
            code: "E1.1",
            title: "Angle Relationships & Triangles",
            summary: "Calculate missing angles using complementary, supplementary, and triangle sum rules.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-geometry",
            cheatSheet: {
              rule: "Complementary = 90°. Supplementary = 180°. Triangle interior sum = 180°.",
              example: "Triangle with 50° and 60° ➔ 3rd angle = 180° - 110° = 70°.",
              tip: "Opposite angles formed by X-intersection are equal!"
            }
          },
          {
            id: "gr8_e3",
            code: "E2.1, E2.2",
            title: "Volume & Surface Area of Cylinders",
            summary: "Calculate 3D capacity and exterior surface area of cylinders.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry",
            cheatSheet: {
              rule: "Volume = π × r² × h. Surface Area = 2πr² + 2πrh.",
              example: "r=3, h=10 (π≈3.14) ➔ Volume = 3.14 × 9 × 10 = 282.6 cm³.",
              tip: "Volume is cubic units (cm³), Surface Area is square units (cm²)."
            }
          },
          {
            id: "gr8_e4",
            code: "E1.1",
            title: "Transversals & Parallel Line Angles",
            summary: "Identify Alternate Interior (Z-angles), Corresponding (F-angles), and Co-interior (C-angles).",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-geometry",
            cheatSheet: {
              rule: "Alternate Interior (Z-angles) are EQUAL. Corresponding (F-angles) are EQUAL. Co-interior (C-angles) sum to 180°.",
              example: "If angle A is 65°, its Z-alternate interior angle is also 65°.",
              tip: "Look for Z, F, and C shapes formed by parallel lines!"
            }
          },
          {
            id: "gr8_e5",
            code: "E2.3",
            title: "Composite 3D Surface Area & Volume",
            summary: "Calculate properties of complex shapes made from cylinders, prisms, and cubes.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry",
            cheatSheet: {
              rule: "Volume: Add volumes together. Surface Area: Add areas but SUBTRACT faces where shapes touch.",
              example: "Cube on top of cylinder: Find both SAs, subtract 2x the contact circle area.",
              tip: "Always remember hidden overlapping faces in surface area!"
            }
          },
          {
            id: "gr8_e6",
            code: "E1.1",
            title: "Tessellations & Polygon Symmetry",
            summary: "Identify geometric properties of regular and semi-regular tessellating shapes.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-geometry",
            cheatSheet: {
              rule: "Tessellation rule: Interior angles meeting at any vertex must sum to exactly 360° without gaps or overlaps.",
              example: "Regular Hexagon interior angle = 120° ➔ 120° × 3 = 360° (tessellates!). Regular Pentagon = 108° (does not tessellate alone).",
              tip: "Only Equilateral Triangles, Squares, and Regular Hexagons tessellate regularly!"
            }
          },
          {
            id: "gr8_e7",
            code: "E1.2, E1.3",
            title: "Scale Drawings, Enlargements & 3D Projections",
            summary: "Calculate actual lengths/areas from scale factor drawings and interpret Top/Front/Side orthographic views.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry",
            cheatSheet: {
              rule: "Scale Factor k: Actual Length = Scale Length × k. Actual Area = Scale Area × k².",
              example: "1 cm : 5 m scale drawing. Drawing length 4 cm ➔ Actual length = 4 × 5 = 20 m. Drawing area 6 cm² ➔ Actual area = 6 × 5² = 150 m².",
              tip: "Remember that Area scales by the SQUARE of scale factor (k²)!"
            }
          },
          {
            id: "gr8_e8",
            code: "E1.4",
            title: "Cartesian Transformations & Dilations",
            summary: "Perform translations, reflections, rotations, and dilations on the 2D coordinate plane.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-geometry",
            cheatSheet: {
              rule: "Translation (x+a, y+b). Reflection over x-axis (x, -y). Reflection over y-axis (-x, y). Dilation by factor k (kx, ky).",
              example: "Point (3, 4) dilated by factor 2 ➔ (6, 8). Reflected across y-axis ➔ (-6, 8).",
              tip: "Dilations change shape size; translations, reflections, and rotations keep size congruent!"
            }
          },
          {
            id: "gr8_e9",
            code: "E2.1",
            title: "Metric Scientific Prefixes & Exponential Units",
            summary: "Convert and express very large (mega, giga, tera) and small (micro, nano, pico) metric measurements.",
            khanUrl: "https://www.khanacademy.org/math/cc-eighth-grade-math/cc-8th-numbers-and-operations",
            cheatSheet: {
              rule: "Tera (10¹²), Giga (10⁹), Mega (10⁶), Kilo (10³). Micro (10⁻⁶), Nano (10⁻⁹), Pico (10⁻¹²).",
              example: "5 Gigabytes = 5 × 10⁹ bytes = 5,000,000,000 bytes. 4 Nanometers = 4 × 10⁻⁹ meters.",
              tip: "Each major metric prefix step is a factor of 1,000 (10³)!"
            }
          }
        ]
      },
      {
        id: "strand_f",
        code: "Strand F",
        name: "Financial Literacy & Economy",
        icon: "💰",
        color: "#EC4899",
        topics: [
          {
            id: "gr8_f1",
            code: "F1.1",
            title: "Sales Tax (Ontario 13% HST) & Discounts",
            summary: "Calculate discount sale prices, 13% HST, and final totals.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion",
            cheatSheet: {
              rule: "Sale price = Original × (1 - discount rate). Ontario Total = Sale price × 1.13.",
              example: "$100 item at 20% off = $80. With 13% HST: $80 × 1.13 = $90.40.",
              tip: "Multiply sale price by 0.13 to get tax amount alone."
            }
          },
          {
            id: "gr8_f2",
            code: "F1.2",
            title: "Unit Rates & Best Buy Comparisons",
            summary: "Compare prices of different package sizes to find the best value.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion",
            cheatSheet: {
              rule: "Unit price = Total cost ÷ Quantity. Lower unit price = Best Buy.",
              example: "Brand A: 600g for $4.80 ($0.80/100g). Brand B: 1000g for $7.50 ($0.75/100g). Brand B is best buy!",
              tip: "Convert quantities to the same unit before comparing."
            }
          },
          {
            id: "gr8_f3",
            code: "F1.3, F1.4",
            title: "Simple Interest (I = P × r × t) & Budgeting",
            summary: "Calculate simple interest earned or owed and model financial savings goals.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion",
            cheatSheet: {
              rule: "I = P × r × t (Principal × Rate as decimal × Time in years).",
              example: "$500 deposit at 5% rate for 3 years ➔ I = 500 × 0.05 × 3 = $75. Total = $575.",
              tip: "Convert percentage rate to decimal (5% = 0.05)."
            }
          },
          {
            id: "gr8_f4",
            code: "F1.5",
            title: "The Magic of Compounding Interest: The Island Game",
            summary: "Discover how small differences in interest rates compound exponentially over time (A = P(1 + r)^t).",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion",
            cheatSheet: {
              rule: "Compound interest calculates interest on initial principal plus all accumulated interest: A = P(1 + r/n)^(nt).",
              example: "$24 invested for 401 years at 8% compound interest = $914 Trillion!",
              tip: "Use the Rule of 72 to estimate doubling time: 72 ÷ interest rate = years to double."
            }
          },
          {
            id: "gr8_f5",
            code: "F1.1",
            title: "Foreign Exchange Rates & Multi-Currency Calculations",
            summary: "Convert amounts between Canadian Dollars (CAD) and foreign currencies (USD, EUR, GBP).",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion",
            cheatSheet: {
              rule: "Target Amount = Base Amount × Exchange Rate. To convert back: Base Amount = Target Amount ÷ Exchange Rate.",
              example: "1 CAD = 0.75 USD ➔ $200 CAD = 200 × 0.75 = $150 USD.",
              tip: "Watch out for conversion fees added by payment methods!"
            }
          },
          {
            id: "gr8_f6",
            code: "F1.5, F1.6",
            title: "Credit Cards, APR Interest & Rewards",
            summary: "Compare high-interest credit card debt, annual fees, and cashback loyalty rewards.",
            khanUrl: "https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-ratio-proportion",
            cheatSheet: {
              rule: "Carrying a credit card balance incurs high monthly interest (e.g., 20% APR = ~1.67% monthly). Net value = Rewards earned - Annual fee - Interest paid.",
              example: "Card A: $0 fee, 1% cashback. Card B: $99 fee, 2% cashback. Spending $15,000/yr: Card A yields $150; Card B yields $300 - $99 = $201 net!",
              tip: "Paying full statement balance every month avoids interest completely!"
            }
          }
        ]
      }
    ]
  }
};
