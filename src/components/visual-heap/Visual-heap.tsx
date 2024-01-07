import { useEffect } from "react";
import { Heap, maxBitWidth } from "../../App";
import './Visual-heap.css'
import { createRandomNumber } from "../../utils";

interface VisualHeapProps {
    heap: Heap;

}


let arr: string[] = []
function VisualHeap({ heap }: VisualHeapProps) {
    const heapSize = heap.blocks.length;
    const heapBlocks = heap.blocks;

    useEffect(() => {

        for (let index = 0; index < heapSize; index++) {
            let address = createRandomNumber(0, 100).toString(16).padStart(maxBitWidth, '0');
            arr.push(address)
        }
        console.log(arr)
    }, [heap])

    debugger


    return (
        <>
            {
                heapBlocks.map(block => {
                    return (
                        block.payload.map((address, index) => {
                            return (

                                <div style={{ display: 'flex' }}>
                                    <div
                                        style={{ border: '1px solid white' }}
                                        key={index}
                                    >
                                        hello
                                        {arr[index]}
                                    </div>

                                    <div
                                        key={index}
                                        className="row"
                                    >
                                        hell
                                        {address}
                                    </div>
                                </div>
                            )
                        })
                    )
                })
            }

        </>
    );
}

export default VisualHeap;