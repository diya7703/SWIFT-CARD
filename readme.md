1. What is the difference between null and undefined?
Answer :
null এবং undefined এর পার্থক্য : 
a.Undefined মানে একটি ভেরিয়েবল declare করা হয়েছে কিন্তু তাকে কোনো মান দেওয়া হয়নি। Null মানে ইচ্ছাকৃতভাবে একটি ভেরিয়েবলে খালি মান সেট করা হয়েছে।
b. Undefined স্বয়ংক্রিয়ভাবে তৈরি হয়। Null ডেভেলপার নিজে থেকে সেট করে।

2. What is the use of the map() function in JavaScript? How is it different from forEach()?
Answer : 
map() এবং forEach() এর পার্থক্য : 
map() ফাংশন একটি নতুন array তৈরি করে যেখানে প্রতিটি উপাদানের উপর একটি ফাংশন প্রয়োগ করা হয় এবং map() একটি নতুন array রিটার্ন করে।
forEach() প্রতিটি উপাদানের উপর ফাংশন চালায়, কিন্তু নতুন array রিটার্ন করে না।

3. What is the difference between == and ===?
Answer:
 == এবং === এর পার্থক্য :
== মান তুলনা করে।
=== মান এবং ডাটা টাইপ দুটোই  তুলনা করে।

4. What is the significance of async/await in fetching API data?
Answer:
async/await ব্যবহার করলে asynchronous কোড আরও পরিষ্কার ও সহজভাবে লেখা যায়।
এটি promise resolve হওয়া পর্যন্ত execution থামিয়ে রাখে, ফলে API থেকে ডাটা আনা সহজ হয়।

5. Explain the concept of Scope in JavaScript (Global, Function, Block).
Answer:
Scope নির্ধারণ করে একটি ভেরিয়েবল কোথায় ব্যবহার করা যাবে।
Global Scope:যে ভেরিয়েবল কোনো ফাংশনের বাইরে declare করা হয়, সেটি পুরো প্রোগ্রামে ব্যবহার করা যায়।
Function Scope:যে ভেরিয়েবল একটি ফাংশনের ভিতরে declare করা হয়, সেটি শুধুমাত্র সেই ফাংশনের ভিতরে ব্যবহার করা যায়।
Block Scope:যে ভেরিয়েবল let বা const ব্যবহার করে {} ব্লকের ভিতরে declare করা হয়, সেটি শুধুমাত্র সেই ব্লকের ভিতরে ব্যবহার করা যায়।