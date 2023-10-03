const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

class BitSet {
  constructor(size) {
    this.size = size
    this.bits = new Array(size).fill(false)
  }

  add(num) {
    if (num < 0 || num >= this.size) {
      throw new Error("Element out of range")
    }
    this.bits[num] = true
  }

  remove(num) {
    if (num < 0 || num >= this.size) {
      throw new Error("Element out of range")
    }
    this.bits[num] = false
  }

  contains(num) {
    if (num < 0 || num >= this.size) {
      throw new Error("Element out of range")
    }
    return this.bits[num]
  }

  union(otherSet) {
    if (this.size !== otherSet.size) {
      throw new Error("Sets must have the same size for union operation")
    }
    const result = new BitSet(this.size)
    for (let i = 0; i < this.size; i++) {
      result.bits[i] = this.bits[i] || otherSet.bits[i]
    }
    return result
  }

  intersection(otherSet) {
    if (this.size !== otherSet.size) {
      throw new Error("Sets must have the same size for intersection operation")
    }
    const result = new BitSet(this.size)
    for (let i = 0; i < this.size; i++) {
      result.bits[i] = this.bits[i] && otherSet.bits[i]
    }
    return result
  }

  difference(otherSet) {
    if (this.size !== otherSet.size) {
      throw new Error("Sets must have the same size for difference operation")
    }
    const result = new BitSet(this.size)
    for (let i = 0; i < this.size; i++) {
      result.bits[i] = this.bits[i] && !otherSet.bits[i]
    }
    return result
  }

  toString() {
    const elements = []
    for (let i = 0; i < this.size; i++) {
      if (this.bits[i]) {
        elements.push(i)
      }
    }
    return "{" + elements.join(", ") + "}"
  }
}

function menu() {
  console.log("1. Add an element")
  console.log("2. Remove an element")
  console.log("3. Check if an element exists")
  console.log("4. Print the set")
  console.log("5. Exit")
}

const bitSet = new BitSet(10)
let shouldExit = false

function getUserInput(promptText) {
  return new Promise((resolve) => {
    rl.question(promptText, (input) => {
      resolve(input)
    })
  })
}

async function main() {
  while (!shouldExit) {
    menu()
    const choice = await getUserInput("Enter your choice (1-5): ")

    switch (choice) {
      case "1":
        const addElement = parseInt(await getUserInput("Enter the element to add: "))
        bitSet.add(addElement)
        break
      case "2":
        const removeElement = parseInt(await getUserInput("Enter the element to remove: "))
        bitSet.remove(removeElement)
        break
      case "3":
        const checkElement = parseInt(await getUserInput("Enter the element to check: "))
        const exists = bitSet.contains(checkElement)
        console.log(`Element ${checkElement} exists: ${exists}`)
        break
      case "4":
        console.log(bitSet.toString())
        break
      case "5":
        shouldExit = true
        break
      default:
        console.log("Invalid choice. Please enter a valid option (1-5).")
    }
  }

  rl.close()
}

main()
