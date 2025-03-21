let storedArr = [];  // Array to store all persons' data
let previousRoom = [];  // Array to store block and room given to each person

// Hostel class to manage blocks and assigned rooms
class Hostel {
    constructor(name) {
        this.name = name;
        this.blocks = {};  // Dynamically store blocks and their room assignments
    }

    // Add a block with a custom room range
    addBlock(blockId, blockName, roomMin, roomMax) {
        this.blocks[blockId] = {
            name: blockName,
            rooms: { min: roomMin, max: roomMax },
            assignedRooms: []  // Track rooms already assigned in this block
        };
    }

    // Generate room within a block
    generateRoom(blockId) {
        let room;
        const blockRooms = this.blocks[blockId].rooms;
        const assignedRooms = this.blocks[blockId].assignedRooms;

        if (assignedRooms.length >= (blockRooms.max - blockRooms.min + 1)) {
            return null;  // No rooms left in this block
        }

        do {
            room = Math.floor(Math.random() * (blockRooms.max - blockRooms.min + 1)) + blockRooms.min;  // Generate room within the dynamic range
        } while (assignedRooms.includes(room));  // Keep generating if the room is already assigned

        assignedRooms.push(room);  // Assign the room
        return room;
    }

    // Check if a block is full
    isBlockFull(blockId) {
        const blockRooms = this.blocks[blockId].rooms;
        return this.blocks[blockId].assignedRooms.length >= (blockRooms.max - blockRooms.min + 1);
    }
}

// Person class that can choose a hostel and be assigned a block and room
function Person(name, hostel) {
    this.name = name;
    this.hostel = hostel;

    let block, room;
    const blockIds = Object.keys(hostel.blocks);
    let availableBlocks = blockIds.filter(blockId => !hostel.isBlockFull(blockId));

    // Randomly assign block while checking availability
    if (availableBlocks.length === 0) {
        return noRoom(name);  // If no available blocks, trigger noRoom
    }

    block = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];  // Randomly choose a block
    room = hostel.generateRoom(block);

    if (room === null) {
        return noRoom(name);  // If no room available in the selected block, trigger noRoom
    }

    this.block = block;
    this.room = room;
    storedArr.push(this);  // Store person data in storedArr
    previousRoom.push({ block: this.block, room: this.room, hostel: this.hostel.name });  // Store block and room in previousRoom
    console.log(`${this.name} assigned to Room: ${this.room}, Block: ${hostel.blocks[this.block].name}, Hostel: ${this.hostel.name}`);
}

// Function to handle when no room is available
function noRoom(name) {
    console.log(`There is no more available room for ${name}. Looks like I need to create a new hostel!`);
}

// Admin class to input hostels, blocks, and room ranges
class Admin {
    constructor() {
        this.hostels = [];
    }

    // Create a new hostel
    createHostel(hostelName) {
        const newHostel = new Hostel(hostelName);
        this.hostels.push(newHostel);
        console.log(`Hostel ${hostelName} created.`);
        return newHostel;  // Return the created hostel to add blocks to it
    }

    // Add blocks and room ranges to the hostel
    addBlockToHostel(hostel, blockId, blockName, roomMin, roomMax) {
        hostel.addBlock(blockId, blockName, roomMin, roomMax);
        console.log(`Block ${blockName} added to ${hostel.name} with room range ${roomMin}-${roomMax}.`);
    }

    // List all hostels
    listHostels() {
        console.log("Available Hostels:");
        this.hostels.forEach(hostel => {
            console.log(`Hostel: ${hostel.name}`);
        });
    }
}

// Shuffle function for person names
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // Random index
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}

// Create an Admin
const admin = new Admin();

// Admin creates hostels
const hostel1 = admin.createHostel("Green Hostel");
const hostel2 = admin.createHostel("Blue Hostel");

// Admin adds blocks and rooms to hostels
admin.addBlockToHostel(hostel1, 1, 'A', 101, 105);  // Block A with room range 101-105 in Green Hostel
admin.addBlockToHostel(hostel1, 2, 'B', 201, 205);  // Block B with room range 201-205 in Green Hostel
admin.addBlockToHostel(hostel2, 1, 'A', 101, 105);  // Block A with room range 101-105 in Blue Hostel
admin.addBlockToHostel(hostel2, 2, 'B', 201, 205);  // Block B with room range 201-205 in Blue Hostel

// List all hostels
admin.listHostels();

// List of people names
let personNames = ["Jeo", "Doe", "Faith", "Toe", "Erie", "Ang", "David", "Ify", "Oke", "Joy", "Chi"];

// Shuffle the names before assigning rooms
personNames = shuffleArray(personNames);

// Dynamically create multiple persons with randomized name and block order, choosing a random hostel
personNames.forEach(name => {
    const chosenHostel = admin.hostels[Math.floor(Math.random() * admin.hostels.length)];  // Randomly choose a hostel
    new Person(name, chosenHostel);
});

// Output the stored data
console.log("All stored data: ", storedArr);
console.log("Previous room assignments: ", previousRoom);

// Function to display room occupancy status
function noRepeat(person) {
    console.log(`Room occupied by ${person.name}: Block ${person.hostel.blocks[person.block].name}, Room ${person.room}, Hostel: ${person.hostel.name}`);
}

// Display room occupancy for each person
storedArr.forEach(person => noRepeat(person));


