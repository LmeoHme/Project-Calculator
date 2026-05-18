# Project-Calculator

 - This is the project to summarize all the things I've learned, fundamentals HTML, CSS, JS.
 - Features:
   + Keyboard supports.
   + Calculations between 2 numbers.
   + Visual feedback with temporary result displaying.
   + Message displayed when divide to 0.
 - At first i decided to build a code base with tons of if-else but with an advice of a friend of mine, I turned it into a state-machine pattern, which really helped alot when I draw flow map follow this pattern. The map described clearly what makes states changed, which lead to a very smooth implementation. But, I don't think I should take this advive 'cause I felt like I using a short-cut that I shouldn't.
 - Beside, although using a good design pattern, my still end up being messy due to the lack of knowledge and exp. I still need to change all the states when there're bugs or when I want to add something.
 - Here are some features I wanted to add but couldn't solve their problems: 
   + Snap to the end of input if it's too long. When calculations become to long and input box couldn't show up all of them, the cursor will automatically snap to the end of current calculation, so user can see what they're inserting.
   + Interaction with calculated results in records. User can use calculated result from the records list to make calculations.
   + Display polish: align operator center vertically. Make the operators in calculations being aligned center vertically for better visual looking.
   + Interaction link: When user type in input using keyboard, the buttons will trigger clicked effect.
