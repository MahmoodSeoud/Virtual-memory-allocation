import { useEffect, useState } from "react";
import { Heap, MAX_ADDRESS, MAX_BIT_WIDTH } from "../../App";
import './Visual-heap.css'
import { createRandomNumber } from "../../utils";

interface VisualHeapProps {
    heap: Heap;

}

function createAddresses(heapBlocks: string[]): string[] {
    let addresses: string[] = [];

    let address: number = createRandomNumber(0, MAX_ADDRESS);

    for (let index = 0; index < heapBlocks.length - 1; index++) {
        const hexAddress = address.toString(16).padStart(MAX_BIT_WIDTH, '0');
        
        addresses.push(hexAddress)
        address += 4;
    }

    return addresses

}

function VisualHeap({ heap }: VisualHeapProps) {
    const heapBlocks = heap.blocks
        .flatMap(block => block.payload)
        .concat(heap.blocks.map(block => block.footer)
            .concat(heap.blocks.map(block => block.header)));

    const [addresses] = useState<string[]>(createAddresses(heapBlocks))
    debugger

    console.log('addresses', addresses)
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontWeight: 'bold' }}>Address</p>
                    {
                        heap.blocks.map((block, i) => {
                            return (
                                <>
                                    {addresses && addresses.length > 0 && addresses.map((_, j) => {
                                        return (
                                            <p className="address-text">0x{addresses[addresses.length - j - 1]}</p>
                                        )
                                    })}
                                </>
                            )
                        })
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontWeight: 'bold' }}>Original value</p>
                    {
                        heap.blocks.map((block, i) => {
                            return (
                                <>
                                    <div className="row">{block.footer}</div>
                                    {block.payload && block.payload.length > 0 && block.payload.map((address) => {
                                        return (
                                            <p className="row">{address}</p>
                                        )
                                    })}
                                    <div className="row">{block.header}</div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default VisualHeap;