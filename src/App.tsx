import { useState } from 'react'
import { createRandomNumber } from './utils';
import './App.css'

enum BlockStatus {
  Allocated = 'ALLOCATED',
  Free = 'FREE',
}

enum base {
  hex = 16,
  dec = 10,
  bin = 2,
}

type MemoryAddress = string;

interface MemoryBlock {
  footer: MemoryAddress; // Footer of the block
  payload: MemoryAddress[]; // Array of addresses or references (for allocated blocks)
  size: number; // Size of the block in bits
  status: BlockStatus; // Whether the block is allocated or free
  header: MemoryAddress; // Header of the block
}


interface Heap {
  blocks: MemoryBlock[]; // Array of memory blocks on the heap
}

const heap: Heap = {
  blocks: []
}

const maxBitWidth = 8 as const;

function createBlock(size: number, status: BlockStatus): MemoryBlock {
  // Here is an example:
  // Ved denne hob er der 32 bit pr. række.
  // 32 bit er 4 bytes. Dvs. der er 4 bytes pr. række.
  // En blok med størrelse 32 byte fylder
  // 32 byte/ 4 bytes/række = 8 rækker
  const bytesPerRow = size / 8;
  const rows = size / bytesPerRow;

  // Create footer and header and make sure they are the same
  const footer = createRandomNumber(0, 100)
    .toString(base.hex)
    .padStart(maxBitWidth, '0');

  const header = footer;

  // Create rand address as payload
  const payload: MemoryAddress[] = [];
  for (let index = 0; index < rows; index++) {

    let address: MemoryAddress = createRandomNumber(0, 100)
      .toString(base.hex)
      .padStart(maxBitWidth, '0');

    while (address === footer) {
      address = createRandomNumber(0, 100)
        .toString(base.hex)
        .padStart(maxBitWidth, '0');
    }

    payload.push(address)
  }

  const block: MemoryBlock = {
    footer: footer,
    payload: payload,
    size,
    status,
    header: header
  }

  return block
}

function App() {
  const [heap, setHeap] = useState<Heap>()

  return (
    <>

    </>
  )
}

export default App
