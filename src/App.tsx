import { useState } from 'react'
import { createRandomNumber } from './utils';
import './App.css'
import VisualHeap from './components/visual-heap/Visual-heap';

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

export interface Heap {
  blocks: MemoryBlock[]; // Array of memory blocks on the heap
}


export const MAX_BIT_WIDTH = 8 as const;
export const MAX_ADDRESS = 20_000 as const;

function createBlock(size: number, status: BlockStatus): MemoryBlock {
  // Here is an example:
  // Ved denne hob er der 32 bit pr. række.
  // 32 bit er 4 bytes. Dvs. der er 4 bytes pr. række.
  // En blok med størrelse 32 byte fylder
  // 32 byte/ 4 bytes/række = 8 rækker
  const bytesPerRow = size / 8;
  const rows = size / bytesPerRow;

  // Create footer and header and make sure they are the same
  const footer = createRandomNumber(0, MAX_ADDRESS)
    .toString(base.hex)
    .padStart(MAX_BIT_WIDTH, '0');

  const header = footer;

  // Create rand address as payload
  const payload: MemoryAddress[] = [];
  // -2 because we don't want to include the header and footer
  for (let index = 0; index < rows -2; index++) {

    let address: MemoryAddress = createRandomNumber(0, MAX_ADDRESS)
      .toString(base.hex)
      .padStart(MAX_BIT_WIDTH, '0');

    while (address === footer) {
      address = createRandomNumber(0, MAX_ADDRESS)
        .toString(base.hex)
        .padStart(MAX_BIT_WIDTH, '0');
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

function createHeap() {
  const block1 = createBlock(32, BlockStatus.Free)
  const block2 = createBlock(16, BlockStatus.Allocated)

  const heap: Heap = {
    blocks: [block1, block2]
  }

  return heap
}


function App() {
  const [heap, setHeap] = useState<Heap>(createHeap())

  return (
    <>
      <VisualHeap
        heap={heap}
      />
    </>
  )
}

export default App
