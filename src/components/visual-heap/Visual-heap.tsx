import { useEffect, useState } from "react";
import { Heap, MAX_ADDRESS, MAX_BIT_WIDTH } from "../../App";
import './Visual-heap.css'
import { createRandomNumber } from "../../utils";

interface VisualHeapProps {
    heap: Heap;

}



function createAddresses(heapBlocks: string[]): string[] {
    let generatedNumbers = new Set<number>();
    let randomNumber: number;
    heapBlocks.map(() => {
        do {
            randomNumber = createRandomNumber(0, MAX_ADDRESS);
        } while (generatedNumbers.has(randomNumber))

        generatedNumbers.add(randomNumber);

        randomNumber.toString(16).padStart(MAX_BIT_WIDTH, '0');
    });

    return [...generatedNumbers].map((number) => number.toString(16).padStart(MAX_BIT_WIDTH, '0'))
}

function VisualHeap({ heap }: VisualHeapProps) {
    const heapBlocks = heap.blocks.flatMap(block => block.payload);
    const [addresses] = useState<string[]>(createAddresses(heapBlocks))

    console.log('addresses', addresses)
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <p style={{ fontWeight: 'bold' }}>Address</p>
                <p style={{ fontWeight: 'bold', marginLeft: '80px' }}>Original value</p>
            </div>
            {
                heap.blocks.map((block, i) => {

                    return (
                        block.payload.map((address, j) => {
                            return (
                                <>
                                    <div
                                        key={i}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}
                                    >
                                        <div
                                        >
                                            <p className="address-text">
                                                0x{addresses[j]}
                                            </p>
                                        </div>
                                        <div
                                            className="row"
                                        >
                                            {address}
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    )
                })
            }

        </>
    );
}

export default VisualHeap;