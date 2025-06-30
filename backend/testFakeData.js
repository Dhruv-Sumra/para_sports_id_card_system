import { getRandomPlayer, getAllFakePlayers, getFakePlayer, generateCustomPlayer } from './generateFakeData.js';

console.log('=== Para Sports Fake Data Test ===\n');

// Test 1: Get a random player
console.log('1. Random Player:');
const randomPlayer = getRandomPlayer();
console.log(JSON.stringify(randomPlayer, null, 2));
console.log('\n' + '='.repeat(50) + '\n');

// Test 2: Get a specific player
console.log('2. Specific Player (index 2):');
const specificPlayer = getFakePlayer(2);
console.log(JSON.stringify(specificPlayer, null, 2));
console.log('\n' + '='.repeat(50) + '\n');

// Test 3: Generate custom player
console.log('3. Custom Player with overrides:');
const customPlayer = generateCustomPlayer({
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@test.com",
  primarySport: "Wheelchair Rugby"
});
console.log(JSON.stringify(customPlayer, null, 2));
console.log('\n' + '='.repeat(50) + '\n');

// Test 4: Show all available players
console.log('4. All Available Players:');
const allPlayers = getAllFakePlayers();
allPlayers.forEach((player, index) => {
  console.log(`${index + 1}. ${player.firstName} ${player.lastName} - ${player.primarySport}`);
});

console.log('\n=== Test Complete ===');
console.log('\nYou can use these functions in your frontend or API testing:');
console.log('- getRandomPlayer() - Get a random player');
console.log('- getFakePlayer(index) - Get a specific player by index (0-9)');
console.log('- generateCustomPlayer(overrides) - Create a custom player');
console.log('- getAllFakePlayers() - Get all 10 fake players'); 