import React, { useEffect, useRef, useState } from 'react'

const CanvasI = (props: any) => {
  const { scale, maxHeight, maxWidth } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  let scaleL = scale && scale > 0 && scale <= 50 ? scale * 0.01 : 8 * 0.01

  useEffect(() => {
    if (canvasRef.current) {
      let scaledW = canvasRef.current.width * scaleL
      let scaledH = canvasRef.current.height * scaleL
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (context) {
        const image = imageRef.current
        if (image) {
          const tempCanvas = document.createElement('canvas')
          tempCanvas.width = canvasRef.current.width
          tempCanvas.height = canvasRef.current.height
          tempCanvas.style.visibility = 'hidden'
          tempCanvas.style.position = 'fixed'
          tempCanvas.style.top = '0'
          tempCanvas.style.left = '0'

          if (canvasRef.current.width > 800) {
            scaleL *= 0.25
            scaledW = canvasRef.current.width * scaleL
            scaledH = canvasRef.current.height * scaleL
            tempCanvas.width = Math.max(scaledW, scaledH) + 50
            tempCanvas.height = Math.max(scaledW, scaledH) + 50
          }
          const tempContext = tempCanvas.getContext('2d')
          if (tempContext) {
            tempContext.drawImage(imageRef.current, 0, 0, scaledW, scaledH)
            document.body.appendChild(tempCanvas)
            context.imageSmoothingEnabled = false
            context.drawImage(tempCanvas, 0, 0, scaledW, scaledH, 0, 0, imageRef.current.naturalWidth, imageRef.current.naturalHeight)
            tempCanvas.remove()
          }
        }
      }
    }
  },[scale])

  return (
    <>
      <canvas ref={canvasRef} height={500} width={500} />
      <img ref={imageRef} src='https://avatars.githubusercontent.com/u/50396286?v=4' alt='link' hidden />
    </>
  )
}

const Pix = () => {
  const [scale, setScale] = useState(10)
  const [value, setValue] = useState(10)
  useEffect(() => {

  })
  return (
    <>
      <CanvasI scale={scale} />
      <input type='number' value={value} onInput={(event)=>{
        setValue(Number(event.currentTarget.value))
        setScale(Number(event.currentTarget.value))
      }}/>
      <button onClick={()=>{

      }}>
        confirm
      </button>
    </>
  )
}

export default Pix
