import React, {useState} from 'react'
import PixelPic from "./components/pixelpic";

function App() {
    const [amount, setAmount] = useState(0.3)
    const [width, setWidth] = useState(500)
    const [height, setHeight] = useState(500)
    return (
        <>
            <div
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            >
                <PixelPic
                    amount={amount}
                    width={width}
                    height={height}
                    imageSrc='https://avatars.githubusercontent.com/u/50396286?v=4'
                />

            </div>
            <div style={{textAlign: 'center'}}>
                <input
                    type='range'
                    min={0}
                    max={100}
                    value={amount * 100}
                    onInput={(event) => {
                        setAmount(Number(event.currentTarget.value) / 100)
                    }}
                />
            </div>
        </>
    )
}

export default App
